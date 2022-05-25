from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import viewsets
from DairyFlatAirport.BookingAPI.serializers import *
from rest_framework import permissions


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
