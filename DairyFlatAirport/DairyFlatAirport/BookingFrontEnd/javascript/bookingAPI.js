class BookingAPI {
    accessToken = '';
    refreshToken = '';
    tokenType = 'Bearer';
    signedInUserId = 0;
    signedInUserDisplayName = '';

    constructor() {
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
        this.signedInUserId = localStorage.getItem('user_id');
        this.signedInUserDisplayName = localStorage.getItem('user_display_name');
    }

    signIn(userData) {
        let code_verifier = this.generateRandomString(50);

        this.makeOauth2CodeChallenge(code_verifier)
            .then(code_challenge => {
                sessionStorage.clear();
                sessionStorage.setItem('code_verifier', code_verifier);
                window.location.href =
                            'http://localhost:8000/o/authorize/' +
                            '?client_id=Z8VUqShJQnkfa5f8fzUAVzlBxYNxU2tuqaN8Gvh9' +
                            '&response_type=code' +
                            '&redirect_uri=http://localhost:8080/user/receiveAuthCode.html' +
                            '&scope=read+write+groups' +
                            '&state=' + userData +
                            '&code_challenge=' + code_challenge +
                            '&code_challenge_method=S256';
            });
    }

    signOut() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8000/api-auth/logout/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();

        this.accessToken = '';
        this.refreshToken = '';
        this.tokenType = 'Bearer';
        this.signedInUserDisplayName = '';
        this.signedInUserId = 0;

        localStorage.clear();
        sessionStorage.clear();
    }

    isSignedIn() {
        return this.accessToken != null && this.accessToken.length > 0 &&
                this.refreshToken != null && this.refreshToken.length > 0 &&
                this.signedInUserId != null && this.signedInUserId.length > 0;
    }

    makeUserDisplayName(json) {
        let displayName = '';
        if (json.first_name != null && json.first_name.length > 0) {
            displayName += json.first_name;
        }
        if (json.last_name != null && json.last_name.length > 0) {
            if (displayName.length > 0) displayName += ' ';
            displayName += json.last_name;
        }
        if (json.username != null && json.username.length > 0) {
            if (displayName.length > 0) displayName += ' (' + json.username + ')';
            else displayName += json.username;
        }
        return displayName;
    }

    getSignedInUser(okFn, errorFn) {
        const booking = this;

        this.getSignedInUserId(
            function (userId) {
                booking.getUser(userId,
                    function (json) {
                        booking.signedInUserDisplayName = booking.makeUserDisplayName(json);
                        localStorage.setItem('user_display_name', booking.signedInUserDisplayName);
                        okFn(json);
                    }
                    , errorFn);
            },
            errorFn);
    }

    getSignedInUserId(okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(this.responseText);
                    if (response.count > 0) {
                        booking.signedInUserId = response.results[0].user_id;
                        localStorage.setItem('user_id', booking.signedInUserId);

                        console.log('signedInUserId = ' + booking.signedInUserId);

                        okFn(response.results[0].user_id);
                    }
                    else {
                        booking.signedInUserId = 0;
                        localStorage.setItem('user_id', 0);
                        console.log('No user exists with the token ' + booking.accessToken);
                        okFn(0);
                    }
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getUserDetails(okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/userId/?accessToken=" + this.accessToken);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getUser(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getAeroplane(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/user/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    generateRandomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      
        return text;
    }
    
    async makeOauth2CodeChallenge(codeVerifier) {
        var digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
            .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    }

    listAeroplanes(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listAeroplanes(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getAeroplane(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getAeroplane(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listFlights(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listFlights(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getFlight(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getFlight(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listBookings(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listBookings(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listCompactBookings(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listCompactBookings(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/bookingCompact/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getBooking(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getBooking(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getCompactBooking(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getCompactBooking(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/bookingCompact/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    addBooking(number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.addBooking(number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("POST", "http://localhost:8000/bookingCompact/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "number": number,
            "travelInsurance": travelInsuranceId,
            "rentalCar": rentalCarId,
            "flightLegs": flightLegIdsArray,
            "passengers": passengerIdsArray,
            "created_by": this.signedInUserId
        }));
    }

    modifyBooking(id, number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.modifyBooking(id, number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("PUT", "http://localhost:8000/bookingCompact/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "number": number,
            "travelInsurance": travelInsuranceId,
            "rentalCar": rentalCarId,
            "flightLegs": flightLegIdsArray,
            "passengers": passengerIdsArray,
            "created_by": this.signedInUserId
        }));
    }

    deleteBooking(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.deleteBooking(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("DELETE", "http://localhost:8000/booking/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listPassengers(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listPassengers(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/passenger/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getPassenger(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getPassenger(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/passenger/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    addPassenger(title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.addPassenger(title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("POST", "http://localhost:8000/passenger/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "title": title != null && title.length > 0 ? title : null,
            "first_name": firstName,
            "second_name": lastName,
            "email_address": emailAddress != null && emailAddress.length > 0 ? emailAddress : null,
            "phone_number": phoneNumber,
            "special_assistance": specialAssistance != null && specialAssistance.length > 0 ? specialAssistance : null,
            "created_by": this.signedInUserId
        }));
    }

    modifyPassenger(id, title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.modifyPassenger(id, title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("PUT", "http://localhost:8000/passenger/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "title": title != null && title.length > 0 ? title : null,
            "first_name": firstName,
            "second_name": lastName,
            "email_address": emailAddress != null && emailAddress.length > 0 ? emailAddress : null,
            "phone_number": phoneNumber,
            "special_assistance": specialAssistance != null && specialAssistance.length > 0 ? specialAssistance : null,
            "created_by": this.signedInUserId
        }));
    }

    deletePassenger(id, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.deletePassenger(id, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("DELETE", "http://localhost:8000/passenger/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listTravelInsurances(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listTravelInsurances(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/travelInsurance/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listRentalCars(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listRentalCars(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/rentalCar/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    searchFlights(options, currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.searchFlights(options, currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }

        var queryParams =
            '?page=' + currentPage +
            '&departureCity=' + options.departureCity +
            '&arrivalCity=' + options.arrivalCity +
            '&departureDate=' + this.toYYYYMMDD(options.departureDate) +
            '&timezone=' + options.timezone

        xhr.open("GET", "http://localhost:8000/searchFlights/" + queryParams);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    toYYYYMMDD(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    flightsExistBetweenXAndY(departureCityId, arrivalCityId, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText).count > 0);
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.flightsExistBetweenXAndY(departureCityId, arrivalCityId, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }

        var queryParams =
            '?page=1' +
            '&departureCity=' + departureCityId +
            '&arrivalCity=' + arrivalCityId;

        xhr.open("GET", "http://localhost:8000/searchFlights/" + queryParams);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getFlightCounts(page, fromAirport, toAirport, beginDate, endDate, timezone, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getFlightCounts(page, fromAirport, toAirport, beginDate, endDate, timezone, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }

        var queryParams =
            '?page=' + page +
            '&fromAirport=' + fromAirport +
            '&toAirport=' + toAirport +
            '&beginDate=' + beginDate +
            '&endDate=' + endDate +
            '&timezone=' + timezone;

        xhr.open("GET", "http://localhost:8000/flightCounts/" + queryParams);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listAirports(currentPage, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listAirports(currentPage, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/airport/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listSeatsForAeroplane(aeroplaneId, okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.listSeatsForAeroplane(aeroplaneId, okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/seat/?aeroplaneId=" + aeroplaneId);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getNextBookingNumber(okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let data = JSON.parse(this.responseText);
                    okFn('DFA' + data.counter);
                }
                else if (xhr.status == 401) {
                    booking.useRefreshToken(booking,
                        function () {
                            booking.getNextBookingNumber(okFn, errorFn);
                        },
                        errorFn
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/bookingNumber/1/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    useRefreshToken(booking, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(this.responseText);
                    
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    localStorage.setItem('token_type', response.token_type);

                    console.log('The refresh succeeded');
                    okFn();
                }
                else {
                    console.log('The refresh failed: ' + this.responseText);
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }

        console.log('Requesting a refresh of the access token (' + booking.refreshToken + ')');

        xhr.open("POST", "http://localhost:8000/o/token/");
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "grant_type": "refresh_token",
            "client_id": "Z8VUqShJQnkfa5f8fzUAVzlBxYNxU2tuqaN8Gvh9",
            "client_secret": "JER87JI9A289n66yHGX2D2ZFCdEYCusMIJEcc0eXaNBpP9vB3pfoAzXNufGaxhQ7VhvadXzEC55wKbaYumzynmLQNOqaJE5NdrON7dywt0OTAjANavOZtrJgZc9f5LRP",
            "refresh_token": booking.refreshToken
        }));
    }
};
