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
        this.accessToken = '';
        this.refreshToken = '';
        this.tokenType = 'Bearer';
        this.signedInUserDisplayName = '';
        this.signedInUserId = 0;

        localStorage.clear();

        window.location.href = 'http://localhost:8000/api-auth/logout/';
    }

    isSignedIn() {
        return this.accessToken != null && this.accessToken.length > 0 &&
               this.refreshToken != null && this.refreshToken.length > 0 &&
               this.tokenType != null && this.tokenType.length > 0;
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
        const api = this;

        this.getSignedInUserId(
            function (userId) {
                api.getUser(userId,
                    function (json) {
                        api.signedInUserDisplayName = api.makeUserDisplayName(json);
                        localStorage.setItem('user_display_name', api.signedInUserDisplayName);
                        okFn(json);
                    }
                    , errorFn);
            },
            errorFn);
    }

    deleteSignedInUser(errorFn) {
        const api = this;

        this.getSignedInUserId(
            function (userId) {
                if (userId > 0) {
                    api.deleteUser(userId, function () {
                        api.signOut();
                    }, errorFn);
                }
            },
            errorFn);
    }

    getSignedInUserId(okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(this.responseText);
                    if (response.count > 0) {
                        api.signedInUserId = response.results[0].user_id;
                        localStorage.setItem('user_id', api.signedInUserId);
                        okFn(response.results[0].user_id);
                    }
                    else {
                        api.signedInUserId = 0;
                        localStorage.setItem('user_id', 0);
                        console.log('No user exists with the token ' + api.accessToken);
                        okFn(0);
                    }
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getSignedInUserId(okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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

    addUser(userName, emailAddress, firstName, lastName, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.addUser(userName, emailAddress, firstName, lastName, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("POST", "http://localhost:8000/user/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "username": userName,
            "email": emailAddress,
            "first_name": firstName,
            "last_name": lastName
        }));
    }

    modifyUser(id, userName, emailAddress, firstName, lastName, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.modifyUser(id, userName, emailAddress, firstName, lastName, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("PUT", "http://localhost:8000/user/" + id + "/");
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "username": userName,
            "email": emailAddress,
            "first_name": firstName,
            "last_name": lastName
        }));
    }

    getUser(id, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getAeroplane(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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

    deleteUser(id, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.deleteUser(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("DELETE", "http://localhost:8000/user/" + id + "/");
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listAeroplanes(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getAeroplane(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listFlights(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getFlight(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listBookings(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/?page=" + currentPage + '&signedInUserId=' + this.signedInUserId);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    listCompactBookings(currentPage, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listCompactBookings(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getBooking(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/" + id + "/?signedInUserId=" + this.signedInUserId);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getCompactBooking(id, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getCompactBooking(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.addBooking(number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.modifyBooking(id, number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.deleteBooking(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listPassengers(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/passenger/?page=" + currentPage + "&signedInUserId=" + this.signedInUserId);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    getPassenger(id, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getPassenger(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
                    );
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/passenger/" + id + "/?signedInUserId=" + this.signedInUserId);
        xhr.setRequestHeader("Authorization", this.tokenType + " " + this.accessToken);
        xhr.send();
    }

    addPassenger(title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn) {
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.addPassenger(title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.modifyPassenger(id, title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.deletePassenger(id, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listTravelInsurances(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listRentalCars(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.searchFlights(options, currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText).count > 0);
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.flightsExistBetweenXAndY(departureCityId, arrivalCityId, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getFlightCounts(page, fromAirport, toAirport, beginDate, endDate, timezone, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listAirports(currentPage, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.listSeatsForAeroplane(aeroplaneId, okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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
        const api = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let data = JSON.parse(this.responseText);
                    okFn('DFA' + data.counter);
                }
                else if (xhr.status == 401) {
                    api.useRefreshToken(api.refreshToken,
                        function () {
                            api.getNextBookingNumber(okFn, errorFn);
                        },
                        function (code, json) {
                            api.signIn(window.location.href);
                        }
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

    useRefreshToken(refreshToken, okFn, errorFn) {
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

        console.log('Requesting a refresh of the access token (' + refreshToken + ')');

        xhr.open("POST", "http://localhost:8000/o/token/");
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "grant_type": "refresh_token",
            "client_id": "Z8VUqShJQnkfa5f8fzUAVzlBxYNxU2tuqaN8Gvh9",
            "client_secret": "JER87JI9A289n66yHGX2D2ZFCdEYCusMIJEcc0eXaNBpP9vB3pfoAzXNufGaxhQ7VhvadXzEC55wKbaYumzynmLQNOqaJE5NdrON7dywt0OTAjANavOZtrJgZc9f5LRP",
            "refresh_token": refreshToken
        }));
    }
};
