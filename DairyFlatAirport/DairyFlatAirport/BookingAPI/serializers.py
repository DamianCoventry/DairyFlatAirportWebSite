from django.contrib.auth.models import Group

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
        fields = ['id', 'tail_number', 'make_model', 'num_seats']


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ['id', 'code', 'name', 'city', 'country', 'timezone_hours', 'timezone_minutes']


class FlightLegSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightLeg
        fields = ['id', 'number', 'aeroplane', 'departure_airport', 'arrival_airport', 'cost_dollars',
                  'departure_time_of_day', 'flight_time_minutes', 'departs_sun', 'departs_mon', 'departs_tue',
                  'departs_wed', 'departs_thu', 'departs_fri', 'departs_sat']


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


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'number', 'created_by', 'travelInsurance', 'rentalCar', 'flightLegs', 'passengers']
