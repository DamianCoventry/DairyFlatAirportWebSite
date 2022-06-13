from datetime import datetime, timedelta
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import permissions, mixins, viewsets
from DairyFlatAirport.BookingAPI.serializers import *
import pytz


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

    def get_queryset(self):
        qs = Seat.objects.all()
        aeroplaneId = self.request.query_params.get('aeroplaneId', 0)
        if int(aeroplaneId) > 0:
            qs = qs.filter(aeroplane_id=aeroplaneId)
        return qs.order_by('number')


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
        departureCityId = self.request.query_params.get('departureCity', 0)
        arrivalCityId = self.request.query_params.get('arrivalCity', 0)

        qs = FlightLeg.objects.all()
        qs = qs.filter(departure_airport__id=departureCityId)
        qs = qs.filter(arrival_airport__id=arrivalCityId)

        departureDate = self.request.query_params.get('departureDate', '')  # expecting YYYY-MM-DD
        timezone = self.request.query_params.get('timezone', '')  # expecting an IANA name

        if departureDate is not None and len(departureDate) > 0 and timezone is not None and len(timezone) > 0:
            departureDate_naive = datetime.strptime(departureDate, "%Y-%m-%d")

            startOfDay = pytz.timezone(timezone).localize(departureDate_naive, is_dst=None)
            endOfDay = startOfDay + timedelta(hours=23, minutes=59, seconds=59)

            qs = qs.filter(departure_date_time_utc__gte=startOfDay)
            qs = qs.filter(departure_date_time_utc__lte=endOfDay)

        return qs.order_by('id')
