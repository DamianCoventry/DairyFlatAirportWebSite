class BookingAPI {
    CREATED_BY_ADMIN = 1;

    listAeroplanes(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    getAeroplane(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    listFlights(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    getFlight(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    listBookings(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    listCompactBookings(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/bookingCompact/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    getBooking(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    getCompactBooking(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/bookingCompact/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    addBooking(number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("POST", "http://localhost:8000/bookingCompact/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "number": number,
            "travelInsurance": travelInsuranceId,
            "rentalCar": rentalCarId,
            "flightLegs": flightLegIdsArray,
            "passengers": passengerIdsArray,
            "created_by": this.CREATED_BY_ADMIN
        }));
    }

    modifyBooking(id, number, travelInsuranceId, rentalCarId, flightLegIdsArray, passengerIdsArray, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("PUT", "http://localhost:8000/bookingCompact/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "number": number,
            "travelInsurance": travelInsuranceId,
            "rentalCar": rentalCarId,
            "flightLegs": flightLegIdsArray,
            "passengers": passengerIdsArray,
            "created_by": this.CREATED_BY_ADMIN
        }));
    }

    deleteBooking(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("DELETE", "http://localhost:8000/booking/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    listPassengers(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/passenger/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    getPassenger(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/passenger/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    addPassenger(title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("POST", "http://localhost:8000/passenger/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "title": title != null && title.length > 0 ? title : null,
            "first_name": firstName,
            "second_name": lastName,
            "email_address": emailAddress != null && emailAddress.length > 0 ? emailAddress : null,
            "phone_number": phoneNumber,
            "special_assistance": specialAssistance != null && specialAssistance.length > 0 ? specialAssistance : null,
            "created_by": this.CREATED_BY_ADMIN
        }));
    }

    modifyPassenger(id, title, firstName, lastName, emailAddress, phoneNumber, specialAssistance, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("PUT", "http://localhost:8000/passenger/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            "title": title != null && title.length > 0 ? title : null,
            "first_name": firstName,
            "second_name": lastName,
            "email_address": emailAddress != null && emailAddress.length > 0 ? emailAddress : null,
            "phone_number": phoneNumber,
            "special_assistance": specialAssistance != null && specialAssistance.length > 0 ? specialAssistance : null,
            "created_by": this.CREATED_BY_ADMIN
        }));
    }

    deletePassenger(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn();
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("DELETE", "http://localhost:8000/passenger/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    listTravelInsurances(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/travelInsurance/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    listRentalCars(currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/rentalCar/?page=" + currentPage);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    searchFlights(options, currentPage, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }

        if (!this.isValidDateTime(options.departureDateTimeValueBeg)) {
            options.departureDateTimeAction = 'ignore';
        }
        else if (options.departureDateTimeAction == "between" && !this.isValidDateTime(options.departureDateTimeValueEnd)) {
            options.departureDateTimeAction = 'ignore';
        }

        if (!this.isValidDateTime(options.arrivalDateTimeValueBeg)) {
            options.arrivalDateTimeAction = 'ignore';
        }
        else if (options.arrivalDateTimeAction == "between" && !this.isValidDateTime(options.arrivalDateTimeValueEnd)) {
            options.arrivalDateTimeAction = 'ignore';
        }

        var queryParams =
            '?page=' + currentPage +
            '&dCityAct=' + (options.departureCityAction == null ? "" : options.departureCityAction) +
            '&dCityVal=' + (options.departureCityValue == null ? "" : options.departureCityValue) +
            '&aCityAct=' + (options.arrivalCityAction == null ? "" : options.arrivalCityAction) +
            '&aCityVal=' + (options.arrivalCityValue == null ? "" : options.arrivalCityValue) +
            '&dDateTimeAct=' + (options.departureDateTimeAction == null ? "" : options.departureDateTimeAction) +
            '&dDateTimeBegVal=' + this.makeSerialisableDateTimeTime(options.departureDateTimeValueBeg) +
            '&dDateTimeEndVal=' + this.makeSerialisableDateTimeTime(options.departureDateTimeValueEnd) +
            '&aDateTimeAct=' + (options.arrivalDateTimeAction == null ? "" : options.arrivalDateTimeAction) +
            '&aDateTimeBegVal=' + this.makeSerialisableDateTimeTime(options.arrivalDateTimeValueBeg) +
            '&aDateTimeEndVal=' + this.makeSerialisableDateTimeTime(options.arrivalDateTimeValueEnd) +
            '&flightTimeAct=' + (options.flightTimeAction == null ? "" : options.flightTimeAction) +
            '&flightTimeMins=' + (options.flightTimeValue == null ? "" : options.flightTimeValue);

        xhr.open("GET", "http://localhost:8000/searchFlights/" + queryParams);
        xhr.setRequestHeader("Authorization", "Bearer CDS3xlLE18lt3cf9N43uuWKx6zrbP5");
        xhr.send();
    }

    isValidDateTime(potentialDateTime) {
        if (potentialDateTime == null || potentialDateTime.length == 0) {
            return false;
        }
        try {
            new Date(potentialDateTime);
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return true;
    }

    makeSerialisableDateTimeTime(potentialDateTime) {
        if (potentialDateTime == null || potentialDateTime.length == 0) {
            return "1970-01-01T00:00:00.000Z";
        }
        try {
            var d = new Date(potentialDateTime);
            return d.toUTCString();
        }
        catch (error) {
            console.error(error);
            return "1970-01-01T00:00:00.000Z";
        }
    }
};
