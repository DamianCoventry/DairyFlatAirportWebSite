from rest_framework import viewsets, generics
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated

from DairyFlatAirport.BookingAPI.serializers import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


# class ChangePasswordView(generics.UpdateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (IsAuthenticated,)
#     serializer_class = ChangePasswordSerializer


class AeroplaneViewSet(viewsets.ModelViewSet):
    queryset = Aeroplane.objects.all().order_by('tail_number')
    serializer_class = AeroplaneSerializer
    permission_classes = [permissions.IsAuthenticated]


class AirportViewSet(viewsets.ModelViewSet):
    queryset = Airport.objects.all().order_by('code')
    serializer_class = AirportSerializer
    permission_classes = [permissions.IsAuthenticated]


class FlightLegViewSet(viewsets.ModelViewSet):
    queryset = FlightLeg.objects.all().order_by('number')
    serializer_class = FlightLegSerializer
    permission_classes = [permissions.IsAuthenticated]


class PassengerViewSet(viewsets.ModelViewSet):
    queryset = Passenger.objects.all().order_by('id')
    serializer_class = PassengerSerializer
    permission_classes = [permissions.IsAuthenticated]


class ExtraBagViewSet(viewsets.ModelViewSet):
    queryset = ExtraBag.objects.all().order_by('id')
    serializer_class = ExtraBagSerializer
    permission_classes = [permissions.IsAuthenticated]


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by('number')
    serializer_class = SeatSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookedSeatViewSet(viewsets.ModelViewSet):
    queryset = BookedSeat.objects.all().order_by('seat')
    serializer_class = BookedSeatSerializer
    permission_classes = [permissions.IsAuthenticated]


class TravelInsuranceViewSet(viewsets.ModelViewSet):
    queryset = TravelInsurance.objects.all().order_by('title')
    serializer_class = TravelInsuranceSerializer
    permission_classes = [permissions.IsAuthenticated]


class RentalCarViewSet(viewsets.ModelViewSet):
    queryset = RentalCar.objects.all().order_by('type')
    serializer_class = RentalCarSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('number')
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
