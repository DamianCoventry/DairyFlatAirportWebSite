from django.core.validators import *
from django.db import models
from django.contrib.auth.models import User


class Aeroplane(models.Model):
    def __str__(self):
        return f'{self.make_model} ({self.tail_number})'

    tail_number = models.CharField(max_length=8, unique=True, null=False)    # ZK-Z001, ZK-Z763, G-NZ23, G-NZ01, etc
    make_model = models.CharField(max_length=64, null=False)
    num_seats = models.IntegerField(default=5, null=False, validators=[MinValueValidator(1), MaxValueValidator(8)])


class Airport(models.Model):
    def __str__(self):
        return f'{self.name} ({self.code})'

    code = models.CharField(max_length=4, unique=True, null=False)   # AKL, WLG, ZQN, SYD, etc
    name = models.CharField(max_length=256, unique=True, null=False)
    city = models.CharField(max_length=128, null=False)
    country = models.CharField(max_length=128, null=False)
    timezone_hours = models.IntegerField(default=0, null=False,
                                         validators=[MinValueValidator(-12), MaxValueValidator(14)])
    timezone_minutes = models.IntegerField(default=0, null=False,
                                           validators=[MinValueValidator(0), MaxValueValidator(59)])


class FlightLeg(models.Model):
    def __str__(self):
        return f'Flight {self.number}, \'{self.departure_airport.name}\' -> \'{self.arrival_airport.name}\''

    number = models.CharField(max_length=8, unique=True, null=False)
    aeroplane = models.ForeignKey(Aeroplane, null=False, on_delete=models.CASCADE)
    departure_airport = models.ForeignKey(Airport, null=False, on_delete=models.CASCADE, related_name='departure')
    arrival_airport = models.ForeignKey(Airport, null=False, on_delete=models.CASCADE, related_name='arrival')
    cost_dollars = models.IntegerField(default=100, null=False,
                                       validators=[MinValueValidator(1), MaxValueValidator(100000)])
    departure_time_of_day = models.TimeField(null=False)
    flight_time_minutes = models.BigIntegerField(default=60, null=False,
                                                 validators=[MinValueValidator(1), MaxValueValidator(720)])
    departs_sun = models.BooleanField(default=False, null=False)
    departs_mon = models.BooleanField(default=False, null=False)
    departs_tue = models.BooleanField(default=False, null=False)
    departs_wed = models.BooleanField(default=False, null=False)
    departs_thu = models.BooleanField(default=False, null=False)
    departs_fri = models.BooleanField(default=False, null=False)
    departs_sat = models.BooleanField(default=False, null=False)


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
    aeroplane = models.ForeignKey(Aeroplane, null=False, on_delete=models.CASCADE)


class BookedSeat(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['seat', 'passenger', 'flightLeg'], name='unique_booking')
        ]

    def __str__(self):
        return f'Seat {self.seat.name}, {self.flightLeg.name}, {self.passenger.name})'

    seat = models.ForeignKey(Seat, null=False, on_delete=models.CASCADE)
    passenger = models.ForeignKey(Passenger, null=False, on_delete=models.CASCADE)
    flightLeg = models.ForeignKey(FlightLeg, null=False, on_delete=models.CASCADE)


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
    travelInsurance = models.ForeignKey(TravelInsurance, null=True, on_delete=models.CASCADE)
    rentalCar = models.ForeignKey(RentalCar, null=True, on_delete=models.CASCADE)
    flightLegs = models.ManyToManyField(FlightLeg)
    passengers = models.ManyToManyField(Passenger)
