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
        # TODO: departure datetime: action, value
        # TODO: departure dow bitflags
        # TODO: arrival datetime: action, value
        # TODO: arrival dow bitflags

        qs = FlightLeg.objects.all()

        departureCityAction = self.request.query_params.get('dCityAct', '')
        departureCity = self.request.query_params.get('dCityVal', '')
        if departureCityAction == 'contains':
            qs = qs.filter(departure_airport__city__icontains=departureCity)
        elif departureCityAction == 'startswith':
            qs = qs.filter(departure_airport__city__istartswith=departureCity)
        elif departureCityAction == 'endswith':
            qs = qs.filter(departure_airport__city__iendswith=departureCity)
        elif departureCityAction == 'exact':
            qs = qs.filter(departure_airport__city__iexact=departureCity)

        arrivalCityAction = self.request.query_params.get('aCityAct', '')
        arrivalCity = self.request.query_params.get('aCityVal', '')
        if arrivalCityAction == 'contains':
            qs = qs.filter(arrival_airport__city__icontains=arrivalCity)
        elif arrivalCityAction == 'startswith':
            qs = qs.filter(arrival_airport__city__istartswith=arrivalCity)
        elif arrivalCityAction == 'endswith':
            qs = qs.filter(arrival_airport__city__iendswith=arrivalCity)
        elif arrivalCityAction == 'exact':
            qs = qs.filter(arrival_airport__city__iexact=arrivalCity)

        flightTimeAction = self.request.query_params.get('flightTimeAct', '')
        flightTimeMins = self.request.query_params.get('flightTimeMins', '')
        if flightTimeAction == 'fewer':
            qs = qs.filter(flight_time_minutes__lt=flightTimeMins)
        elif flightTimeAction == 'exact':
            qs = qs.filter(flight_time_minutes=flightTimeMins)
        elif flightTimeAction == 'greater':
            qs = qs.filter(flight_time_minutes__gt=flightTimeMins)

        return qs.order_by('id')
