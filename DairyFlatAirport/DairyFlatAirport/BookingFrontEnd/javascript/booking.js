class Booking {
    getDisplayName1() {
        return (this.hasTitle1() ? (this.getTitle1() + ' ') : '') + this.getFirstName1() + ' ' + this.getLastName1();
    }
    getDisplayName2() {
        return (this.hasTitle2() ? (this.getTitle2() + ' ') : '') + this.getFirstName2() + ' ' + this.getLastName2();
    }
    getDisplayName3() {
        return (this.hasTitle3() ? (this.getTitle3() + ' ') : '') + this.getFirstName3() + ' ' + this.getLastName3();
    }
    getDisplayName4() {
        return (this.hasTitle4() ? (this.getTitle4() + ' ') : '') + this.getFirstName4() + ' ' + this.getLastName4();
    }
    getDisplayName5() {
        return (this.hasTitle5() ? (this.getTitle5() + ' ') : '') + this.getFirstName5() + ' ' + this.getLastName5();
    }
    getDisplayName6() {
        return (this.hasTitle6() ? (this.getTitle6() + ' ') : '') + this.getFirstName6() + ' ' + this.getLastName6();
    }

    // values captured from the bookAFlight page
    setFromCityId(value) {
        sessionStorage.setItem('fromCityId', value);
    }
    getFromCityId() {
        return sessionStorage.getItem('fromCityId');
    }
    hasFromCityId() {
        return this.getFromCityId().length > 0;
    }

    setFromCityName(value) {
        sessionStorage.setItem('fromCityName', value);
    }
    getFromCityName() {
        return sessionStorage.getItem('fromCityName');
    }
    hasFromCityName() {
        return this.getFromCityName().length > 0;
    }

    setToCityId(value) {
        sessionStorage.setItem('toCityId', value);
    }
    getToCityId() {
        return sessionStorage.getItem('toCityId');
    }
    hasToCityId() {
        return this.getToCityId().length > 0;
    }

    setToCityName(value) {
        sessionStorage.setItem('toCityName', value);
    }
    getToCityName() {
        return sessionStorage.getItem('toCityName');
    }
    hasToCityName() {
        return this.getToCityName().length > 0;
    }

    setTripType(value) {
        sessionStorage.setItem('tripType', value);
    }
    getTripType() {
        return sessionStorage.getItem('tripType');
    }
    hasTripType() {
        return this.getTripType().length > 0;
    }
    isReturnTrip() {
        return this.getTripType() == 'return';
    }

    setLeaveDate(value) {
        sessionStorage.setItem('leaveDate', value);
    }
    getLeaveDate() {
        return sessionStorage.getItem('leaveDate');
    }
    hasLeaveDate() {
        return this.getLeaveDate().length > 0;
    }

    setReturnDate(value) {
        sessionStorage.setItem('returnDate', value);
    }
    getReturnDate() {
        return sessionStorage.getItem('returnDate');
    }
    hasReturnDate() {
        return this.getReturnDate().length > 0;
    }

    setTimezone(value) {
        sessionStorage.setItem('timezone', value);
    }
    getTimezone() {
        return sessionStorage.getItem('timezone');
    }
    hasTimezone() {
        return this.getTimezone().length > 0;
    }

    setNumPassengers(value) {
        sessionStorage.setItem('numPassengers', value);
    }
    getNumPassengers() {
        return sessionStorage.getItem('numPassengers');
    }
    hasNumPassengers() {
        return this.getNumPassengers().length > 0;
    }

    // values captured from the selectFlights page
    setOutboundFlightId(value) {
        sessionStorage.setItem('outboundFlightId', value);
    }
    getOutboundFlightId() {
        return sessionStorage.getItem('outboundFlightId');
    }
    hasOutboundFlightId() {
        return this.getOutboundFlightId().length > 0;
    }

    setOutboundAeroplaneId(value) {
        sessionStorage.setItem('outboundAeroplaneId', value);
    }
    getOutboundAeroplaneId() {
        return sessionStorage.getItem('outboundAeroplaneId');
    }
    hasOutboundAeroplaneId() {
        return this.getOutboundAeroplaneId().length > 0;
    }

    setOutboundFlightCost(value) {
        sessionStorage.setItem('outboundFlightCost', value);
    }
    getOutboundFlightCost() {
        return sessionStorage.getItem('outboundFlightCost');
    }
    hasOutboundFlightCost() {
        return this.getOutboundFlightCost().length > 0;
    }

    setInboundFlightId(value) {
        sessionStorage.setItem('inboundFlightId', value);
    }
    getInboundFlightId() {
        return sessionStorage.getItem('inboundFlightId');
    }
    hasInboundFlightId() {
        return this.getInboundFlightId().length > 0;
    }

    setInboundAeroplaneId(value) {
        sessionStorage.setItem('inboundAeroplaneId', value);
    }
    getInboundAeroplaneId() {
        return sessionStorage.getItem('inboundAeroplaneId');
    }
    hasInboundAeroplaneId() {
        return this.getInboundAeroplaneId().length > 0;
    }

    setInboundFlightCost(value) {
        sessionStorage.setItem('inboundFlightCost', value);
    }
    getInboundFlightCost() {
        return sessionStorage.getItem('inboundFlightCost');
    }
    hasInboundFlightCost() {
        return this.getInboundFlightCost().length > 0;
    }

    setTotalCost(value) {
        sessionStorage.setItem('totalCost', value);
    }
    getTotalCost() {
        return sessionStorage.getItem('totalCost');
    }
    hasTotalCost() {
        return this.getTotalCost().length > 0;
    }

    setLeaveTime(value) {
        sessionStorage.setItem('leaveTime', value);
    }
    getLeaveTime() {
        return sessionStorage.getItem('leaveTime');
    }
    hasLeaveTime() {
        return this.getLeaveTime().length > 0;
    }

    setReturnTime(value) {
        sessionStorage.setItem('returnTime', value);
    }
    getReturnTime() {
        return sessionStorage.getItem('returnTime');
    }
    hasReturnTime() {
        return this.getReturnTime().length > 0;
    }

    // values captured from the passengerDetails page
    setTitle1(value) {
        sessionStorage.setItem('title1', value);
    }
    getTitle1() {
        return sessionStorage.getItem('title1');
    }
    hasTitle1() {
        return this.getTitle1().length > 0;
    }

    setFirstName1(value) {
        sessionStorage.setItem('firstName1', value);
    }
    getFirstName1() {
        return sessionStorage.getItem('firstName1');
    }
    hasFirstName1() {
        return this.getFirstName1().length > 0;
    }

    setLastName1(value) {
        sessionStorage.setItem('lastName1', value);
    }
    getLastName1() {
        return sessionStorage.getItem('lastName1');
    }
    hasLastName1() {
        return this.getLastName1().length > 0;
    }

    setEmailAddress1(value) {
        sessionStorage.setItem('emailAddress1', value);
    }
    getEmailAddress1() {
        return sessionStorage.getItem('emailAddress1');
    }
    hasEmailAddress1() {
        return this.getEmailAddress1().length > 0;
    }

    setPhoneNumber1(value) {
        sessionStorage.setItem('phoneNumber1', value);
    }
    getPhoneNumber1() {
        return sessionStorage.getItem('phoneNumber1');
    }
    hasPhoneNumber1() {
        return this.getPhoneNumber1().length > 0;
    }

    setSpecialAssistance1(value) {
        sessionStorage.setItem('specialAssistance1', value);
    }
    getSpecialAssistance1() {
        return sessionStorage.getItem('specialAssistance1');
    }
    hasSpecialAssistance1() {
        return this.getSpecialAssistance1().length > 0;
    }

    setTitle2(value) {
        sessionStorage.setItem('title2', value);
    }
    getTitle2() {
        return sessionStorage.getItem('title2');
    }
    hasTitle2() {
        return this.getTitle2().length > 0;
    }

    setFirstName2(value) {
        sessionStorage.setItem('firstName2', value);
    }
    getFirstName2() {
        return sessionStorage.getItem('firstName2');
    }
    hasFirstName2() {
        return this.getFirstName2().length > 0;
    }

    setLastName2(value) {
        sessionStorage.setItem('lastName2', value);
    }
    getLastName2() {
        return sessionStorage.getItem('lastName2');
    }
    hasLastName2() {
        return this.getLastName2().length > 0;
    }

    setEmailAddress2(value) {
        sessionStorage.setItem('emailAddress2', value);
    }
    getEmailAddress2() {
        return sessionStorage.getItem('emailAddress2');
    }
    hasEmailAddress2() {
        return this.getEmailAddress2().length > 0;
    }

    setPhoneNumber2(value) {
        sessionStorage.setItem('phoneNumber2', value);
    }
    getPhoneNumber2() {
        return sessionStorage.getItem('phoneNumber2');
    }
    hasPhoneNumber2() {
        return this.getPhoneNumber2().length > 0;
    }

    setSpecialAssistance2(value) {
        sessionStorage.setItem('specialAssistance2', value);
    }
    getSpecialAssistance2() {
        return sessionStorage.getItem('specialAssistance2');
    }
    hasSpecialAssistance2() {
        return this.getSpecialAssistance2().length > 0;
    }

    setTitle3(value) {
        sessionStorage.setItem('title3', value);
    }
    getTitle3() {
        return sessionStorage.getItem('title3');
    }
    hasTitle3() {
        return this.getTitle3().length > 0;
    }

    setFirstName3(value) {
        sessionStorage.setItem('firstName3', value);
    }
    getFirstName3() {
        return sessionStorage.getItem('firstName3');
    }
    hasFirstName3() {
        return this.getFirstName3().length > 0;
    }

    setLastName3(value) {
        sessionStorage.setItem('lastName3', value);
    }
    getLastName3() {
        return sessionStorage.getItem('lastName3');
    }
    hasLastName3() {
        return this.getLastName3().length > 0;
    }

    setEmailAddress3(value) {
        sessionStorage.setItem('emailAddress3', value);
    }
    getEmailAddress3() {
        return sessionStorage.getItem('emailAddress3');
    }
    hasEmailAddress3() {
        return this.getEmailAddress3().length > 0;
    }

    setPhoneNumber3(value) {
        sessionStorage.setItem('phoneNumber3', value);
    }
    getPhoneNumber3() {
        return sessionStorage.getItem('phoneNumber3');
    }
    hasPhoneNumber3() {
        return this.getPhoneNumber3().length > 0;
    }

    setSpecialAssistance3(value) {
        sessionStorage.setItem('specialAssistance3', value);
    }
    getSpecialAssistance3() {
        return sessionStorage.getItem('specialAssistance3');
    }
    hasSpecialAssistance3() {
        return this.getSpecialAssistance3().length > 0;
    }

    setTitle4(value) {
        sessionStorage.setItem('title4', value);
    }
    getTitle4() {
        return sessionStorage.getItem('title4');
    }
    hasTitle4() {
        return this.getTitle4().length > 0;
    }

    setFirstName4(value) {
        sessionStorage.setItem('firstName4', value);
    }
    getFirstName4() {
        return sessionStorage.getItem('firstName4');
    }
    hasFirstName4() {
        return this.getFirstName4().length > 0;
    }

    setLastName4(value) {
        sessionStorage.setItem('lastName4', value);
    }
    getLastName4() {
        return sessionStorage.getItem('lastName4');
    }
    hasLastName4() {
        return this.getLastName4().length > 0;
    }

    setEmailAddress4(value) {
        sessionStorage.setItem('emailAddress4', value);
    }
    getEmailAddress4() {
        return sessionStorage.getItem('emailAddress4');
    }
    hasEmailAddress4() {
        return this.getEmailAddress4().length > 0;
    }

    setPhoneNumber4(value) {
        sessionStorage.setItem('phoneNumber4', value);
    }
    getPhoneNumber4() {
        return sessionStorage.getItem('phoneNumber4');
    }
    hasPhoneNumber4() {
        return this.getPhoneNumber4().length > 0;
    }

    setSpecialAssistance4(value) {
        sessionStorage.setItem('specialAssistance4', value);
    }
    getSpecialAssistance4() {
        return sessionStorage.getItem('specialAssistance4');
    }
    hasSpecialAssistance4() {
        return this.getSpecialAssistance4().length > 0;
    }

    setTitle5(value) {
        sessionStorage.setItem('title5', value);
    }
    getTitle5() {
        return sessionStorage.getItem('title5');
    }
    hasTitle5() {
        return this.getTitle5().length > 0;
    }

    setFirstName5(value) {
        sessionStorage.setItem('firstName5', value);
    }
    getFirstName5() {
        return sessionStorage.getItem('firstName5');
    }
    hasFirstName5() {
        return this.getFirstName5().length > 0;
    }

    setLastName5(value) {
        sessionStorage.setItem('lastName5', value);
    }
    getLastName5() {
        return sessionStorage.getItem('lastName5');
    }
    hasLastName5() {
        return this.getLastName5().length > 0;
    }

    setEmailAddress5(value) {
        sessionStorage.setItem('emailAddress5', value);
    }
    getEmailAddress5() {
        return sessionStorage.getItem('emailAddress5');
    }
    hasEmailAddress5() {
        return this.getEmailAddress5().length > 0;
    }

    setPhoneNumber5(value) {
        sessionStorage.setItem('phoneNumber5', value);
    }
    getPhoneNumber5() {
        return sessionStorage.getItem('phoneNumber5');
    }
    hasPhoneNumber5() {
        return this.getPhoneNumber5().length > 0;
    }

    setSpecialAssistance5(value) {
        sessionStorage.setItem('specialAssistance5', value);
    }
    getSpecialAssistance5() {
        return sessionStorage.getItem('specialAssistance5');
    }
    hasSpecialAssistance5() {
        return this.getSpecialAssistance5().length > 0;
    }

    setTitle6(value) {
        sessionStorage.setItem('title6', value);
    }
    getTitle6() {
        return sessionStorage.getItem('title6');
    }
    hasTitle6() {
        return this.getTitle6().length > 0;
    }

    setFirstName6(value) {
        sessionStorage.setItem('firstName6', value);
    }
    getFirstName6() {
        return sessionStorage.getItem('firstName6');
    }
    hasFirstName6() {
        return this.getFirstName6().length > 0;
    }

    setLastName6(value) {
        sessionStorage.setItem('lastName6', value);
    }
    getLastName6() {
        return sessionStorage.getItem('lastName6');
    }
    hasLastName6() {
        return this.getLastName6().length > 0;
    }

    setEmailAddress6(value) {
        sessionStorage.setItem('emailAddress6', value);
    }
    getEmailAddress6() {
        return sessionStorage.getItem('emailAddress6');
    }
    hasEmailAddress6() {
        return this.getEmailAddress6().length > 0;
    }

    setPhoneNumber6(value) {
        sessionStorage.setItem('phoneNumber6', value);
    }
    getPhoneNumber6() {
        return sessionStorage.getItem('phoneNumber6');
    }
    hasPhoneNumber6() {
        return this.getPhoneNumber6().length > 0;
    }

    setSpecialAssistance6(value) {
        sessionStorage.setItem('specialAssistance6', value);
    }
    getSpecialAssistance6() {
        return sessionStorage.getItem('specialAssistance6');
    }
    hasSpecialAssistance6() {
        return this.getSpecialAssistance6().length > 0;
    }

    // values captured from the extras page
    setTravelInsuranceId(value) {
        sessionStorage.setItem('travelInsuranceId', value);
    }
    getTravelInsuranceId() {
        return sessionStorage.getItem('travelInsuranceId');
    }
    hasTravelInsuranceId() {
        return this.getTravelInsuranceId().length > 0;
    }

    setTravelInsuranceName(value) {
        sessionStorage.setItem('travelInsuranceName', value);
    }
    getTravelInsuranceName() {
        return sessionStorage.getItem('travelInsuranceName');
    }
    hasTravelInsuranceName() {
        return this.getTravelInsuranceName().length > 0;
    }

    setTravelInsuranceCost(value) {
        sessionStorage.setItem('travelInsuranceCost', value);
    }
    getTravelInsuranceCost() {
        return sessionStorage.getItem('travelInsuranceCost');
    }
    hasTravelInsuranceCost() {
        return this.getTravelInsuranceCost().length > 0;
    }

    setRentalCarId(value) {
        sessionStorage.setItem('rentalCarId', value);
    }
    getRentalCarId() {
        return sessionStorage.getItem('rentalCarId');
    }
    hasRentalCarId() {
        return this.getRentalCarId().length > 0;
    }

    setRentalCarName(value) {
        sessionStorage.setItem('rentalCarName', value);
    }
    getRentalCarName() {
        return sessionStorage.getItem('rentalCarName');
    }
    hasRentalCarName() {
        return this.getRentalCarName().length > 0;
    }

    setRentalCarType(value) {
        sessionStorage.setItem('rentalCarType', value);
    }
    getRentalCarType() {
        return sessionStorage.getItem('rentalCarType');
    }
    hasRentalCarType() {
        return this.getRentalCarType().length > 0;
    }

    setRentalCarCost(value) {
        sessionStorage.setItem('rentalCarCost', value);
    }
    getRentalCarCost() {
        return sessionStorage.getItem('rentalCarCost');
    }
    hasRentalCarCost() {
        return this.getRentalCarCost().length > 0;
    }

    // values captured from the selectSeats page
    setOutboundSeatId1(value) {
        sessionStorage.setItem('outboundSeatId1', value);
    }
    getOutboundSeatId1() {
        return sessionStorage.getItem('outboundSeatId1');
    }
    hasOutboundSeatId1() {
        return this.getOutboundSeatId1().length > 0;
    }

    setOutboundSeatName1(value) {
        sessionStorage.setItem('outboundSeatName1', value);
    }
    getOutboundSeatName1() {
        return sessionStorage.getItem('outboundSeatName1');
    }
    hasOutboundSeatName1() {
        return this.getOutboundSeatName1().length > 0;
    }

    setOutboundSeatId2(value) {
        sessionStorage.setItem('outboundSeatId2', value);
    }
    getOutboundSeatId2() {
        return sessionStorage.getItem('outboundSeatId2');
    }
    hasOutboundSeatId2() {
        return this.getOutboundSeatId2().length > 0;
    }

    setOutboundSeatName2(value) {
        sessionStorage.setItem('outboundSeatName2', value);
    }
    getOutboundSeatName2() {
        return sessionStorage.getItem('outboundSeatName2');
    }
    hasOutboundSeatName2() {
        return this.getOutboundSeatName2().length > 0;
    }

    setOutboundSeatId3(value) {
        sessionStorage.setItem('outboundSeatId3', value);
    }
    getOutboundSeatId3() {
        return sessionStorage.getItem('outboundSeatId3');
    }
    hasOutboundSeatId3() {
        return this.getOutboundSeatId3().length > 0;
    }

    setOutboundSeatName3(value) {
        sessionStorage.setItem('outboundSeatName3', value);
    }
    getOutboundSeatName3() {
        return sessionStorage.getItem('outboundSeatName3');
    }
    hasOutboundSeatName3() {
        return this.getOutboundSeatName3().length > 0;
    }

    setOutboundSeatId4(value) {
        sessionStorage.setItem('outboundSeatId4', value);
    }
    getOutboundSeatId4() {
        return sessionStorage.getItem('outboundSeatId4');
    }
    hasOutboundSeatId4() {
        return this.getOutboundSeatId4().length > 0;
    }

    setOutboundSeatName4(value) {
        sessionStorage.setItem('outboundSeatName4', value);
    }
    getOutboundSeatName4() {
        return sessionStorage.getItem('outboundSeatName4');
    }
    hasOutboundSeatName4() {
        return this.getOutboundSeatName4().length > 0;
    }

    setOutboundSeatId5(value) {
        sessionStorage.setItem('outboundSeatId5', value);
    }
    getOutboundSeatId5() {
        return sessionStorage.getItem('outboundSeatId5');
    }
    hasOutboundSeatId5() {
        return this.getOutboundSeatId5().length > 0;
    }

    setOutboundSeatName5(value) {
        sessionStorage.setItem('outboundSeatName5', value);
    }
    getOutboundSeatName5() {
        return sessionStorage.getItem('outboundSeatName5');
    }
    hasOutboundSeatName5() {
        return this.getOutboundSeatName5().length > 0;
    }

    setOutboundSeatId6(value) {
        sessionStorage.setItem('outboundSeatId6', value);
    }
    getOutboundSeatId6() {
        return sessionStorage.getItem('outboundSeatId6');
    }
    hasOutboundSeatId6() {
        return this.getOutboundSeatId6().length > 0;
    }

    setOutboundSeatName6(value) {
        sessionStorage.setItem('outboundSeatName6', value);
    }
    getOutboundSeatName6() {
        return sessionStorage.getItem('outboundSeatName6');
    }
    hasOutboundSeatName6() {
        return this.getOutboundSeatName6().length > 0;
    }

    setInboundSeatId1(value) {
        sessionStorage.setItem('inboundSeatId1', value);
    }
    getInboundSeatId1() {
        return sessionStorage.getItem('inboundSeatId1');
    }
    hasInboundSeatId1() {
        return this.getInboundSeatId1().length > 0;
    }

    setInboundSeatName1(value) {
        sessionStorage.setItem('inboundSeatName1', value);
    }
    getInboundSeatName1() {
        return sessionStorage.getItem('inboundSeatName1');
    }
    hasInboundSeatName1() {
        return this.getInboundSeatName1().length > 0;
    }

    setInboundSeatId2(value) {
        sessionStorage.setItem('inboundSeatId2', value);
    }
    getInboundSeatId2() {
        return sessionStorage.getItem('inboundSeatId2');
    }
    hasInboundSeatId2() {
        return this.getInboundSeatId2().length > 0;
    }

    setInboundSeatName2(value) {
        sessionStorage.setItem('inboundSeatName2', value);
    }
    getInboundSeatName2() {
        return sessionStorage.getItem('inboundSeatName2');
    }
    hasInboundSeatName2() {
        return this.getInboundSeatName2().length > 0;
    }

    setInboundSeatId3(value) {
        sessionStorage.setItem('inboundSeatId3', value);
    }
    getInboundSeatId3() {
        return sessionStorage.getItem('inboundSeatId3');
    }
    hasInboundSeatId3() {
        return this.getInboundSeatId3().length > 0;
    }

    setInboundSeatName3(value) {
        sessionStorage.setItem('inboundSeatName3', value);
    }
    getInboundSeatName3() {
        return sessionStorage.getItem('inboundSeatName3');
    }
    hasInboundSeatName3() {
        return this.getInboundSeatName3().length > 0;
    }

    setInboundSeatId4(value) {
        sessionStorage.setItem('inboundSeatId4', value);
    }
    getInboundSeatId4() {
        return sessionStorage.getItem('inboundSeatId4');
    }
    hasInboundSeatId4() {
        return this.getInboundSeatId4().length > 0;
    }

    setInboundSeatName4(value) {
        sessionStorage.setItem('inboundSeatName4', value);
    }
    getInboundSeatName4() {
        return sessionStorage.getItem('inboundSeatName4');
    }
    hasInboundSeatName4() {
        return this.getInboundSeatName4().length > 0;
    }

    setInboundSeatId5(value) {
        sessionStorage.setItem('inboundSeatId5', value);
    }
    getInboundSeatId5() {
        return sessionStorage.getItem('inboundSeatId5');
    }
    hasInboundSeatId5() {
        return this.getInboundSeatId5().length > 0;
    }

    setInboundSeatName5(value) {
        sessionStorage.setItem('inboundSeatName5', value);
    }
    getInboundSeatName5() {
        return sessionStorage.getItem('inboundSeatName5');
    }
    hasInboundSeatName5() {
        return this.getInboundSeatName5().length > 0;
    }

    setInboundSeatId6(value) {
        sessionStorage.setItem('inboundSeatId6', value);
    }
    getInboundSeatId6() {
        return sessionStorage.getItem('inboundSeatId6');
    }
    hasInboundSeatId6() {
        return this.getInboundSeatId6().length > 0;
    }

    setInboundSeatName6(value) {
        sessionStorage.setItem('inboundSeatName6', value);
    }
    getInboundSeatName6() {
        return sessionStorage.getItem('inboundSeatName6');
    }
    hasInboundSeatName6() {
        return this.getInboundSeatName6().length > 0;
    }

    setBookingNumber(value) {
        sessionStorage.setItem('bookingNumber', value);
    }
    getBookingNumber() {
        return sessionStorage.getItem('bookingNumber');
    }
    hasBookingNumber() {
        return this.getBookingNumber().length > 0;
    }

    clear() {
        sessionStorage.clear();

        // values captured from the bookAFlight page
        sessionStorage.setItem('fromCityId', '');
        sessionStorage.setItem('fromCityName', '');
        sessionStorage.setItem('toCityId', '');
        sessionStorage.setItem('toCityName', '');
        sessionStorage.setItem('tripType', '');
        sessionStorage.setItem('leaveDate', '');
        sessionStorage.setItem('returnDate', '');
        sessionStorage.setItem('timezone', '');
        sessionStorage.setItem('numPassengers', '');

        // values captured from the selectFlights page
        sessionStorage.setItem('outboundFlightId', '');
        sessionStorage.setItem('outboundAeroplaneId', '');
        sessionStorage.setItem('outboundFlightCost', '');
        sessionStorage.setItem('inboundFlightId', '');
        sessionStorage.setItem('inboundAeroplaneId', '');
        sessionStorage.setItem('inboundFlightCost', '');
        sessionStorage.setItem('totalCost', '');
        sessionStorage.setItem('leaveTime', '');
        sessionStorage.setItem('returnTime', '');

        // values captured from the passengerDetails page
        sessionStorage.setItem('title1', '');
        sessionStorage.setItem('firstName1', '');
        sessionStorage.setItem('lastName1', '');
        sessionStorage.setItem('emailAddress1', '');
        sessionStorage.setItem('phoneNumber1', '');
        sessionStorage.setItem('specialAssistance1', '');
        sessionStorage.setItem('title2', '');
        sessionStorage.setItem('firstName2', '');
        sessionStorage.setItem('lastName2', '');
        sessionStorage.setItem('emailAddress2', '');
        sessionStorage.setItem('phoneNumber2', '');
        sessionStorage.setItem('specialAssistance2', '');
        sessionStorage.setItem('title3', '');
        sessionStorage.setItem('firstName3', '');
        sessionStorage.setItem('lastName3', '');
        sessionStorage.setItem('emailAddress3', '');
        sessionStorage.setItem('phoneNumber3', '');
        sessionStorage.setItem('specialAssistance3', '');
        sessionStorage.setItem('title4', '');
        sessionStorage.setItem('firstName4', '');
        sessionStorage.setItem('lastName4', '');
        sessionStorage.setItem('emailAddress4', '');
        sessionStorage.setItem('phoneNumber4', '');
        sessionStorage.setItem('specialAssistance4', '');
        sessionStorage.setItem('title5', '');
        sessionStorage.setItem('firstName5', '');
        sessionStorage.setItem('lastName5', '');
        sessionStorage.setItem('emailAddress5', '');
        sessionStorage.setItem('phoneNumber5', '');
        sessionStorage.setItem('specialAssistance5', '');
        sessionStorage.setItem('title6', '');
        sessionStorage.setItem('firstName6', '');
        sessionStorage.setItem('lastName6', '');
        sessionStorage.setItem('emailAddress6', '');
        sessionStorage.setItem('phoneNumber6', '');
        sessionStorage.setItem('specialAssistance6', '');

        // values captured from the extras page
        sessionStorage.setItem('travelInsuranceId', '');
        sessionStorage.setItem('travelInsuranceName', '');
        sessionStorage.setItem('travelInsuranceCost', '');
        sessionStorage.setItem('rentalCarId', '');
        sessionStorage.setItem('rentalCarName', '');
        sessionStorage.setItem('rentalCarType', '');
        sessionStorage.setItem('rentalCarCost', '');

        // values captured from the selectSeats page
        sessionStorage.setItem('outboundSeatId1', '');
        sessionStorage.setItem('outboundSeatName1', '');
        sessionStorage.setItem('outboundSeatId2', '');
        sessionStorage.setItem('outboundSeatName2', '');
        sessionStorage.setItem('outboundSeatId3', '');
        sessionStorage.setItem('outboundSeatName3', '');
        sessionStorage.setItem('outboundSeatId4', '');
        sessionStorage.setItem('outboundSeatName4', '');
        sessionStorage.setItem('outboundSeatId5', '');
        sessionStorage.setItem('outboundSeatName5', '');
        sessionStorage.setItem('outboundSeatId6', '');
        sessionStorage.setItem('outboundSeatName6', '');
        sessionStorage.setItem('inboundSeatId1', '');
        sessionStorage.setItem('inboundSeatName1', '');
        sessionStorage.setItem('inboundSeatId2', '');
        sessionStorage.setItem('inboundSeatName2', '');
        sessionStorage.setItem('inboundSeatId3', '');
        sessionStorage.setItem('inboundSeatName3', '');
        sessionStorage.setItem('inboundSeatId4', '');
        sessionStorage.setItem('inboundSeatName4', '');
        sessionStorage.setItem('inboundSeatId5', '');
        sessionStorage.setItem('inboundSeatName5', '');
        sessionStorage.setItem('inboundSeatId6', '');
        sessionStorage.setItem('inboundSeatName6', '');

        // values captured from the confirm page
        sessionStorage.setItem('bookingNumber', '')
    }
}
