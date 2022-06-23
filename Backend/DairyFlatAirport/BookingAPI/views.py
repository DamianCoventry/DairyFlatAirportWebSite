from datetime import datetime, timedelta

import pytz
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Count
from django.db.models.functions import TruncDate
from django.urls import reverse_lazy
from django.views import generic
from django.views.generic import TemplateView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import permissions, mixins, viewsets
from rest_framework.response import Response

from DairyFlatAirport.BookingAPI.serializers import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("signup_done")
    template_name = "registration/sign_up.html"


class SignUpDoneView(TemplateView):
    template_name = "registration/signup_done.html"
    title = "Sign Up successful"


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
    serializer_class = PassengerSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        signedInUserId = self.request.query_params.get('signedInUserId', 0)
        return Passenger.objects.all().filter(created_by_id=signedInUserId).order_by('id')


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


class UnbookedSeatViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Seat.objects.all().order_by('id')
    serializer_class = SeatSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        flightId = self.request.query_params.get('flightId', 0)

        bookedSeats = BookedSeat.objects.filter(flightLeg_id=flightId).values('seat_id').order_by()

        aeroplaneId = FlightLeg.objects.get(id=flightId).aeroplane_id
        maxSeatCapacity = Aeroplane.objects.get(id=aeroplaneId).num_seats
        if len(bookedSeats) >= maxSeatCapacity:
            return Seat.objects.none()

        return Seat.objects.filter(aeroplane=aeroplaneId).exclude(id__in=bookedSeats).order_by('number')


class BookedSeatViewSet(viewsets.ModelViewSet):
    queryset = BookedSeat.objects.all().order_by('id')
    serializer_class = BookedSeatSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        flightId = self.request.query_params.get('flightId', 0)
        return BookedSeat.objects.filter(flightLeg_id=flightId).order_by('id')


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


class BookingViewSet(viewsets.ModelViewSet, viewsets.GenericViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        signedInUserId = self.request.query_params.get('signedInUserId', 0)
        return Booking.objects.all().filter(created_by_id=signedInUserId).order_by('number')


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


class FlightCountsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = FlightCountsSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        fromAirport = self.request.query_params.get('fromAirport', 0)
        toAirport = self.request.query_params.get('toAirport', 0)
        beginDate = self.request.query_params.get('beginDate', '')  # expecting YYYY-MM-DD
        endDate = self.request.query_params.get('endDate', '')  # expecting YYYY-MM-DD
        timezone = self.request.query_params.get('timezone', '')  # expecting an IANA name

        tzInfo = pytz.timezone(timezone)

        beginDate_naive = datetime.strptime(beginDate, "%Y-%m-%d")
        beginDate_startOfDay = tzInfo.localize(beginDate_naive, is_dst=None)

        endDate_naive = datetime.strptime(endDate, "%Y-%m-%d")
        endDate_startOfDay = tzInfo.localize(endDate_naive, is_dst=None)
        endDate_endOfDay = endDate_startOfDay + timedelta(hours=23, minutes=59, seconds=59)

        # SELECT
        #   ("BookingAPI_flightleg"."departure_date_time_utc" AT TIME ZONE 'Pacific/Auckland')::date AS "departureDate",
        #   COUNT("BookingAPI_flightleg"."id") AS "numFlights"
        # FROM "BookingAPI_flightleg"
        # WHERE ("BookingAPI_flightleg"."departure_airport_id" = 1
        # AND "BookingAPI_flightleg"."arrival_airport_id" = 2
        # AND "BookingAPI_flightleg"."departure_date_time_utc" >= '2022-06-12 00:00:00+12:00'
        # AND "BookingAPI_flightleg"."departure_date_time_utc" <= '2022-07-16 23:59:59+12:00')
        # GROUP BY ("BookingAPI_flightleg"."departure_date_time_utc" AT TIME ZONE 'Pacific/Auckland')::date
        # ORDER BY "departureDate" ASC

        qs = FlightLeg.objects \
                .filter(departure_airport_id=fromAirport) \
                .filter(arrival_airport_id=toAirport) \
                .filter(departure_date_time_utc__gte=beginDate_startOfDay) \
                .filter(departure_date_time_utc__lte=endDate_endOfDay) \
                .annotate(departureDate=TruncDate('departure_date_time_utc', tzinfo=tzInfo)) \
                .values('departureDate') \
                .annotate(numFlights=Count('id')) \
                .order_by('departureDate')
        # print(qs.query)
        return qs


class BookingNumberViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = BookingNumber.objects.all().order_by('id')
    serializer_class = BookingNumberSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        s = self.get_serializer(instance)
        resp = Response(s.data)

        update = self.get_serializer(instance, data={'id': 1, 'counter': s.data['counter'] + 1}, partial=False)
        update.is_valid(raise_exception=True)
        update.save()

        return resp


class UserIdViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = UserIdSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]

    def get_queryset(self):
        accessToken = self.request.query_params.get('accessToken', '')
        return AccessToken.objects.filter(token=accessToken).order_by('id')
