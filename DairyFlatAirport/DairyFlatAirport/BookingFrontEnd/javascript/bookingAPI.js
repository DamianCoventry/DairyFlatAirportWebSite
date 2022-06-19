class BookingAPI {
    accessToken = '';
    refreshToken = '';
    tokenType = 'Bearer';

    constructor() {
        // localStorage.setItem('access_token', 'DIqX1kZr1TuHrLSaiDVEjMtNp0DkCv');
        // localStorage.setItem('refresh_token', 'Ef4VnhJIPYQtprbUGVGJUNv8iZPHh4');
        // localStorage.setItem('token_type', 'Bearer');
        localStorage.setItem('user_id', 7);
    }

    listAeroplanes(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listAeroplanes(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getAeroplane(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listFlights(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getFlight(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listBookings(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listCompactBookings(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getBooking(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getCompactBooking(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            addBooking(number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn);
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
        this.loggedInUserId = localStorage.getItem("user_id");
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            modifyBooking(id, number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn);
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
        this.loggedInUserId = localStorage.getItem("user_id");
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            deleteBooking(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listPassengers(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getPassenger(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            addPassenger(title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn);
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
        this.loggedInUserId = localStorage.getItem("user_id");
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            modifyPassenger(id, title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn);
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
        this.loggedInUserId = localStorage.getItem("user_id");
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            deletePassenger(id, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listTravelInsurances(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listRentalCars(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            searchFlights(options, currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText).count > 0);
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            flightsExistBetweenXAndY(departureCityId, arrivalCityId, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getFlightCounts(page, fromAirport, toAirport, beginDate, endDate, timezone, okFn, errorFn);
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
                            listAirports(currentPage, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            listSeatsForAeroplane(aeroplaneId, okFn, errorFn);
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
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let data = JSON.parse(this.responseText);
                    okFn('DFA' + data.counter);
                }
                else if (xhr.status == 401) {
                    this.useRefreshToken(
                        function () {
                            getNextBookingNumber(okFn, errorFn);
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
                    let data = JSON.parse(this.responseText);

                    booking.accessToken = data.access_token;
                    booking.refreshToken = data.refresh_token;
                    booking.tokenType = data.token_type;
                    localStorage.setItem("access_token", booking.accessToken);
                    localStorage.setItem("refresh_token", booking.refreshToken);
                    localStorage.setItem("token_type", booking.tokenType);
            
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
