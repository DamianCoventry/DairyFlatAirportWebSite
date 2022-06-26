from django.contrib.auth.models import User
from django.core.validators import *
from django.db import models


class Aeroplane(models.Model):
    def __str__(self):
        return f'{self.make_model} ({self.tail_number})'

    tail_number = models.CharField(max_length=8, unique=True, null=False)    # ZK-Z001, ZK-Z763, G-NZ23, G-NZ01, etc
    make_model = models.CharField(max_length=64, null=False)
    num_seats = models.IntegerField(default=5, null=False, validators=[MinValueValidator(1), MaxValueValidator(8)])
    image_link = models.CharField(max_length=512, null=True)
    floor_plan_link = models.CharField(max_length=512, null=True)


class Airport(models.Model):
    def __str__(self):
        return f'{self.name} ({self.code})'

    code = models.CharField(max_length=4, unique=True, null=False)   # AKL, WLG, ZQN, SYD, etc
    name = models.CharField(max_length=256, unique=True, null=False)
    city = models.CharField(max_length=128, null=False)
    country = models.CharField(max_length=128, null=False)
    timezone = models.CharField(max_length=128, null=False, default='Pacific/Auckland')


class FlightLeg(models.Model):
    def __str__(self):
        return f'Flight {self.number}, \'{self.departure_airport.name}\' -> \'{self.arrival_airport.name}\''

    number = models.CharField(max_length=8, null=False)
    aeroplane = models.ForeignKey(Aeroplane, null=False, related_name='aeroplaneFlight', on_delete=models.CASCADE)
    departure_airport = models.ForeignKey(Airport, null=False, on_delete=models.CASCADE, related_name='departure')
    arrival_airport = models.ForeignKey(Airport, null=False, on_delete=models.CASCADE, related_name='arrival')
    cost_dollars = models.IntegerField(default=100, null=False,
                                       validators=[MinValueValidator(1), MaxValueValidator(100000)])
    departure_date_time_utc = models.DateTimeField(auto_now_add=True, null=False)
    arrival_date_time_utc = models.DateTimeField(auto_now_add=True, null=False)
    flight_time_mins = models.IntegerField(default=30, null=False,
                                           validators=[MinValueValidator(1), MaxValueValidator(1000)])


class FlightLegStopover(models.Model):
    def __str__(self):
        return f'Flight (stopover)'

    flightLegA = models.ForeignKey(FlightLeg, null=False, on_delete=models.CASCADE, related_name='flightLegA')
    flightLegB = models.ForeignKey(FlightLeg, null=False, on_delete=models.CASCADE, related_name='flightLegB')
    stopoverAirport = models.ForeignKey(Airport, null=False, on_delete=models.CASCADE, related_name='stopover')


class Passenger(models.Model):
    def __str__(self):
        if self.title is not None:
            return f'{self.title} {self.first_name} {self.second_name}'
        return f'{self.first_name} {self.second_name}'

    title = models.CharField(max_length=4, null=True)  # Mr, Ms, Mrs, Dr
    first_name = models.CharField(max_length=128, null=False)
    second_name = models.CharField(max_length=128, null=False)
    email_address = models.EmailField(null=True)
    phone_number = models.CharField(max_length=32, null=False)
    special_assistance = models.CharField(max_length=128, null=True)
    created_by = models.ForeignKey(User, null=False, on_delete=models.CASCADE)


class ExtraBag(models.Model):
    def __str__(self):
        return f'Extra bag ({self.weight_kg}kg)'

    weight_kg = models.IntegerField(default=10, null=False,
                                    validators=[MinValueValidator(1), MaxValueValidator(100)])
    passenger = models.ForeignKey(Passenger, null=False, on_delete=models.CASCADE)
    flightLeg = models.ForeignKey(FlightLeg, null=False, on_delete=models.CASCADE)


class Seat(models.Model):
    def __str__(self):
        return f'Seat {self.number}, {self.aeroplane.tail_number} ({self.aeroplane.make_model})'

    number = models.CharField(max_length=64, null=False)    # A1, A2, B1, B2, etc
    emergency_exit = models.BooleanField(default=False, null=False)
    aeroplane = models.ForeignKey(Aeroplane, null=False, on_delete=models.CASCADE, related_name='aeroplaneSeat')


class TravelInsurance(models.Model):
    def __str__(self):
        return self.title

    title = models.CharField(max_length=128, unique=True, null=False)
    description = models.CharField(max_length=1024, null=False)
    image_link = models.CharField(max_length=512, null=True)
    web_link = models.CharField(max_length=512, null=True)
    cost_per_person = models.IntegerField(default=10, null=False,
                                          validators=[MinValueValidator(1), MaxValueValidator(10000)])


class RentalCar(models.Model):
    def __str__(self):
        return f'{self.make} {self.model} ({self.type})'

    type = models.CharField(max_length=128, null=False)     # compact auto, intermediate auto, mid size SUV, etc
    make = models.CharField(max_length=128, null=False)
    model = models.CharField(max_length=128, null=False)
    image_link = models.CharField(max_length=512, null=True)
    web_link = models.CharField(max_length=512, null=True)
    cost_per_day = models.IntegerField(default=10, null=False,
                                       validators=[MinValueValidator(1), MaxValueValidator(10000)])


class Booking(models.Model):
    def __str__(self):
        return f'Booking {self.number} ({self.user.name})'

    number = models.CharField(max_length=8, unique=True, null=False)
    created_by = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    travelInsurance = models.ForeignKey(TravelInsurance, null=True, on_delete=models.CASCADE,
                                        related_name='travelInsurance')
    rentalCar = models.ForeignKey(RentalCar, null=True, on_delete=models.CASCADE, related_name='rentalCar')
    flightLegs = models.ManyToManyField(FlightLeg)
    passengers = models.ManyToManyField(Passenger, related_name='passengersBooking')


class BookedSeat(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['seat', 'passenger', 'flightLeg'], name='unique_booking')
        ]

    def __str__(self):
        return f'Seat {self.seat.name}, {self.flightLeg.name}, {self.passenger.name})'

    seat = models.ForeignKey(Seat, null=False, on_delete=models.CASCADE, related_name='seat')
    passenger = models.ForeignKey(Passenger, null=False, on_delete=models.CASCADE, related_name='passenger')
    flightLeg = models.ForeignKey(FlightLeg, null=False, on_delete=models.CASCADE, related_name='flightLeg')


class BookingNumber(models.Model):
    counter = models.IntegerField(default=12345, null=False,
                                  validators=[MinValueValidator(10000), MaxValueValidator(99999)])
