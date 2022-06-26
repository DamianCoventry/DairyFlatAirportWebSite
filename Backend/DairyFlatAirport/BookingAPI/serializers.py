from django.contrib.auth.models import Group
from oauth2_provider.models import AccessToken

from DairyFlatAirport.BookingAPI.models import *
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class AeroplaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aeroplane
        fields = ['id', 'tail_number', 'make_model', 'num_seats', 'image_link', 'floor_plan_link']


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ['id', 'code', 'name', 'city', 'country', 'timezone']


class FlightLegSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightLeg
        fields = ['id', 'number', 'aeroplane', 'departure_airport', 'arrival_airport', 'cost_dollars',
                  'arrival_date_time_utc', 'departure_date_time_utc', 'flight_time_mins']
        depth = 1


class FlightLegStopoverSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightLegStopover
        fields = ['id', 'flightLegA', 'flightLegB', 'stopoverAirport']
        depth = 1


class FlightCountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightLeg
        fields = ['departureDate', 'numFlights']

    departureDate = serializers.SerializerMethodField('get_departureDate')
    numFlights = serializers.SerializerMethodField('get_numFlights')

    def get_departureDate(self, obj):
        return obj['departureDate']

    def get_numFlights(self, obj):
        return obj['numFlights']


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['id', 'title', 'first_name', 'second_name', 'email_address', 'phone_number', 'special_assistance',
                  'created_by']


class ExtraBagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraBag
        fields = ['id', 'weight_kg', 'passenger', 'flightLeg']


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'number', 'emergency_exit', 'aeroplane']


class BookedSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookedSeat
        fields = ['id', 'seat', 'passenger', 'flightLeg']


class TravelInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelInsurance
        fields = ['id', 'title', 'description', 'image_link', 'web_link', 'cost_per_person']


class RentalCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalCar
        fields = ['id', 'type', 'make', 'model', 'image_link', 'web_link', 'cost_per_day']


class BookingCompactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'number', 'created_by', 'travelInsurance', 'rentalCar', 'flightLegs', 'passengers']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'number', 'created_by', 'travelInsurance', 'rentalCar', 'flightLegs', 'passengers']
        depth = 2


class BookingNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingNumber
        fields = ['id', 'counter']


class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessToken
        fields = ['user_id']
