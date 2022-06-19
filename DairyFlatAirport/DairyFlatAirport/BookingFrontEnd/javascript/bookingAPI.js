class BookingAPI {
    accessToken = '';
    refreshToken = '';
    tokenType = 'Bearer';
    userId = 0;

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
        this.accessToken = localStorage.getItem("access_token");
        this.tokenType = localStorage.getItem("token_type");

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8000/api-auth/logout/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();

        this.accessToken = '';
        this.refreshToken = '';
        this.tokenType = 'Bearer';
        this.userId = 0;

        localStorage.clear();
        sessionStorage.clear();
    }

    isSignedIn() {
        let a = localStorage.getItem("access_token");
        let b = localStorage.getItem("refresh_token");
        let c = localStorage.getItem("token_type");
        return a != null && a.length > 0 &&
               b != null && b.length > 0 &&
               c != null && c.length > 0;
    }

    getLoggedInUser(okFn, errorFn) {
        const booking = this;

        this.getLoggedInUserId(
            function (userId) {
                booking.getUser(userId, okFn, errorFn);
            },
            errorFn);
    }

    getLoggedInUserId(okFn, errorFn) {
        const booking = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(this.responseText);
                    if (response.count > 0) {
                        okFn(response.results[0].user_id);
                    }
                    else {
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
        this.loggedInUserId = sessionStorage.getItem("user_id");
        xhr.open("POST", "http://localhost:8000/bookingCompact/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "number": number,
            "travelInsurance": travelInsuranceId,
            "rentalCar": rentalCarId,
            "flightLegs": flightLegIdsArray,
            "passengers": passengerIdsArray,
            "created_by": this.loggedInUserId
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
        this.loggedInUserId = sessionStorage.getItem("user_id");
        xhr.open("PUT", "http://localhost:8000/bookingCompact/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "number": number,
            "travelInsurance": travelInsuranceId,
            "rentalCar": rentalCarId,
            "flightLegs": flightLegIdsArray,
            "passengers": passengerIdsArray,
            "created_by": this.loggedInUserId
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
        this.loggedInUserId = sessionStorage.getItem("user_id");
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
            "created_by": this.loggedInUserId
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
        this.loggedInUserId = sessionStorage.getItem("user_id");
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
            "created_by": this.loggedInUserId
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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

        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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

        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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

        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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
        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");
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

        this.accessToken = localStorage.getItem("access_token");
        this.refreshToken = localStorage.getItem("refresh_token");
        this.tokenType = localStorage.getItem("token_type");

        console.log('Requesting a refresh of the access token ('+booking.refreshToken+')');

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
