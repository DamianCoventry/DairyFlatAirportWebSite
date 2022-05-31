from datetime import datetime

from django.utils.dateparse import parse_datetime
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from DairyFlatAirport.BookingAPI.serializers import *
from rest_framework import permissions, mixins, viewsets


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class AeroplaneViewSet(viewsets.ModelViewSet):
    queryset = Aeroplane.objects.all().order_by('tail_number')
    serializer_class = AeroplaneSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class AirportViewSet(viewsets.ModelViewSet):
    queryset = Airport.objects.all().order_by('code')
    serializer_class = AirportSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class FlightLegViewSet(viewsets.ModelViewSet):
    queryset = FlightLeg.objects.all().order_by('number')
    serializer_class = FlightLegSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class PassengerViewSet(viewsets.ModelViewSet):
    queryset = Passenger.objects.all().order_by('id')
    serializer_class = PassengerSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class ExtraBagViewSet(viewsets.ModelViewSet):
    queryset = ExtraBag.objects.all().order_by('id')
    serializer_class = ExtraBagSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by('number')
    serializer_class = SeatSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class BookedSeatViewSet(viewsets.ModelViewSet):
    queryset = BookedSeat.objects.all().order_by('seat')
    serializer_class = BookedSeatSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class TravelInsuranceViewSet(viewsets.ModelViewSet):
    queryset = TravelInsurance.objects.all().order_by('title')
    serializer_class = TravelInsuranceSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class RentalCarViewSet(viewsets.ModelViewSet):
    queryset = RentalCar.objects.all().order_by('type')
    serializer_class = RentalCarSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class BookingCompactViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('number')
    serializer_class = BookingCompactSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('number')
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class SearchFlightsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = FlightLegSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        qs = FlightLeg.objects.all()

        departureCityAction = self.request.query_params.get('dCityAct', '').lower()
        departureCity = self.request.query_params.get('dCityVal', '')
        if departureCity is not None and len(departureCity) > 0:
            if departureCityAction == 'contains':
                qs = qs.filter(departure_airport__city__icontains=departureCity)
            elif departureCityAction == 'starts with':
                qs = qs.filter(departure_airport__city__istartswith=departureCity)
            elif departureCityAction == 'ends with':
                qs = qs.filter(departure_airport__city__iendswith=departureCity)
            elif departureCityAction == 'is exactly':
                qs = qs.filter(departure_airport__city__iexact=departureCity)

        arrivalCityAction = self.request.query_params.get('aCityAct', '').lower()
        arrivalCity = self.request.query_params.get('aCityVal', '')
        if arrivalCity is not None and len(arrivalCity) > 0:
            if arrivalCityAction == 'contains':
                qs = qs.filter(arrival_airport__city__icontains=arrivalCity)
            elif arrivalCityAction == 'starts with':
                qs = qs.filter(arrival_airport__city__istartswith=arrivalCity)
            elif arrivalCityAction == 'ends with':
                qs = qs.filter(arrival_airport__city__iendswith=arrivalCity)
            elif arrivalCityAction == 'is exactly':
                qs = qs.filter(arrival_airport__city__iexact=arrivalCity)

        departureDateTimeAction = self.request.query_params.get('dDateTimeAct', '').lower()
        departureDateTimeBeg = self.request.query_params.get('dDateTimeBegVal', '')  # TODO: convert to utc
        departureDateTimeEnd = self.request.query_params.get('dDateTimeEndVal', '')  # TODO: convert to utc
        if departureDateTimeBeg is not None and len(departureDateTimeBeg) > 0:
            if departureDateTimeAction == 'before':
                qs = qs.filter(departure_date_time_utc__lt=departureDateTimeBeg)
            elif departureDateTimeAction == 'after':
                qs = qs.filter(departure_date_time_utc__gt=departureDateTimeBeg)
            elif departureDateTimeAction == 'between':
                if departureDateTimeEnd is not None and len(departureDateTimeEnd) > 0:
                    qs = qs.filter(departure_date_time_utc__gte=departureDateTimeBeg)
                    qs = qs.filter(departure_date_time_utc__lte=departureDateTimeEnd)

        arrivalDateTimeAction = self.request.query_params.get('aDateTimeAct', '').lower()
        arrivalDateTimeBeg = self.request.query_params.get('aDateTimeBegVal', '')  # TODO: convert to utc
        arrivalDateTimeEnd = self.request.query_params.get('aDateTimeEndVal', '')  # TODO: convert to utc
        if arrivalDateTimeBeg is not None and len(arrivalDateTimeBeg) > 0:
            if arrivalDateTimeAction == 'before':
                qs = qs.filter(arrival_date_time_utc__lt=arrivalDateTimeBeg)
            elif arrivalDateTimeAction == 'after':
                qs = qs.filter(arrival_date_time_utc__gt=arrivalDateTimeBeg)
            elif arrivalDateTimeAction == 'between':
                if arrivalDateTimeEnd is not None and len(arrivalDateTimeEnd) > 0:
                    qs = qs.filter(arrival_date_time_utc__gte=arrivalDateTimeBeg)
                    qs = qs.filter(arrival_date_time_utc__lte=arrivalDateTimeEnd)

        flightTimeAction = self.request.query_params.get('flightTimeAct', '').lower()
        flightTimeMins = self.request.query_params.get('flightTimeMins', '')
        if flightTimeMins is not None and len(flightTimeMins) > 0:
            if flightTimeAction == 'fewer than':
                qs = qs.filter(flight_time_mins__lt=flightTimeMins)
            elif flightTimeAction == 'is exactly':
                qs = qs.filter(flight_time_mins=flightTimeMins)
            elif flightTimeAction == 'greater than':
                qs = qs.filter(flight_time_mins__gt=flightTimeMins)

        return qs.order_by('id')
