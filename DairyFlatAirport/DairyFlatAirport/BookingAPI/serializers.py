from django.contrib.auth.models import Group
# from django.contrib.auth.password_validation import validate_password

from DairyFlatAirport.BookingAPI.models import *
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


# class ChangePasswordSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)
#     old_password = serializers.CharField(write_only=True, required=True)
#
#     class Meta:
#         model = User
#         fields = ('old_password', 'password', 'password2')
#
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"password": "Password fields didn't match."})
#         return attrs
#
#     def validate_old_password(self, value):
#         user = self.context['request'].user
#         if not user.check_password(value):
#             raise serializers.ValidationError({"old_password": "Old password is not correct"})
#         return value
#
#     def update(self, instance, validated_data):
#         instance.set_password(validated_data['password'])
#         instance.save()
#         return instance


class AeroplaneSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aeroplane
        fields = ['tail_number', 'make_model', 'num_seats']


class AirportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Airport
        fields = ['code', 'name', 'city', 'country', 'timezone_hours', 'timezone_minutes']


class FlightLegSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FlightLeg
        fields = ['number', 'aeroplane', 'departure_airport', 'arrival_airport', 'cost_dollars',
                  'departure_time_of_day', 'flight_time_minutes', 'departs_sun', 'departs_mon', 'departs_tue',
                  'departs_wed', 'departs_thu', 'departs_fri', 'departs_sat']


class PassengerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Passenger
        fields = ['title', 'first_name', 'second_name', 'email_address', 'phone_number', 'special_assistance',
                  'created_by']


class ExtraBagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ExtraBag
        fields = ['weight_kg', 'passenger', 'flightLeg']


class SeatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Seat
        fields = ['number', 'emergency_exit', 'aeroplane']


class BookedSeatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BookedSeat
        fields = ['seat', 'passenger', 'flightLeg']


class TravelInsuranceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TravelInsurance
        fields = ['title', 'description', 'image_link', 'web_link', 'cost_per_person']


class RentalCarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RentalCar
        fields = ['type', 'make', 'model', 'image_link', 'web_link', 'cost_per_day']


class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ['number', 'created_by', 'travelInsurance', 'rentalCar', 'flightLegs', 'passengers']
