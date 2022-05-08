class BookingAPI {

    listAeroplanes(okFn, errorFn) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    okFn(JSON.parse(this.responseText));
                }
                else {
                    errorFn(JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/");
        xhr.setRequestHeader("Authorization", "Bearer fdnWETxWBE5gC43XuFPJTDNJVvVwXt");
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
                    errorFn(JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/aeroplane/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer fdnWETxWBE5gC43XuFPJTDNJVvVwXt");
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
                    errorFn(JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/");
        xhr.setRequestHeader("Authorization", "Bearer fdnWETxWBE5gC43XuFPJTDNJVvVwXt");
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
                    errorFn(JSON.parse(this.responseText));
                }
            }
        }
        xhr.open("GET", "http://localhost:8000/flightLeg/" + id + "/");
        xhr.setRequestHeader("Authorization", "Bearer fdnWETxWBE5gC43XuFPJTDNJVvVwXt");
        xhr.send();
    }

};
