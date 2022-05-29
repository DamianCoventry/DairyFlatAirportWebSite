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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
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
        xhr.setRequestHeader("Authorization", "Bearer aX3tRTHCwmB25k5H67VtfRAVsPkQUo");
        xhr.send();
    }
};
