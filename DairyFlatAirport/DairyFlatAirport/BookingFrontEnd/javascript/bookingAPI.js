class BookingAPI {
    listAeroplanes(okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/");
        xhr.setRequestHeader("Authorization", "Bearer J3tkkyvk1u4QwW9LwfU7SYx90rcoAV");
        xhr.send();
    }

    getAeroplane(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer J3tkkyvk1u4QwW9LwfU7SYx90rcoAV");
        xhr.send();
    }

    listFlights(okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/");
        xhr.setRequestHeader("Authorization", "Bearer J3tkkyvk1u4QwW9LwfU7SYx90rcoAV");
        xhr.send();
    }

    getFlight(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer J3tkkyvk1u4QwW9LwfU7SYx90rcoAV");
        xhr.send();
    }

    listBookings(okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/");
        xhr.setRequestHeader("Authorization", "Bearer J3tkkyvk1u4QwW9LwfU7SYx90rcoAV");
        xhr.send();
    }

    getBooking(id, okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(xhr.status, JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/booking/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer J3tkkyvk1u4QwW9LwfU7SYx90rcoAV");
        xhr.send();
    }
};
