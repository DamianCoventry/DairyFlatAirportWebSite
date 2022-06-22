# Generated by Django 4.0.4 on 2022-05-03 03:02

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BookingAPI', '0003_rename_timezone_offset_airport_timezone_offset_hours_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='extrabag',
            name='weight',
        ),
        migrations.AddField(
            model_name='extrabag',
            name='weight_kg',
            field=models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)]),
        ),
        migrations.AlterField(
            model_name='aeroplane',
            name='num_seats',
            field=models.IntegerField(default=5, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(8)]),
        ),
        migrations.AlterField(
            model_name='airport',
            name='code',
            field=models.CharField(max_length=4),
        ),
        migrations.AlterField(
            model_name='airport',
            name='timezone_hours',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(-12), django.core.validators.MaxValueValidator(14)]),
        ),
        migrations.AlterField(
            model_name='airport',
            name='timezone_minutes',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(59)]),
        ),
        migrations.AlterField(
            model_name='booking',
            name='flightLegs',
            field=models.ManyToManyField(null=True, to='BookingAPI.flightleg'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='rentalCar',
            field=models.ManyToManyField(null=True, to='BookingAPI.rentalcar'),
        ),
        migrations.AlterField(
            model_name='booking',
            name='travelInsurance',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BookingAPI.travelinsurance'),
        ),
        migrations.AlterField(
            model_name='extrabag',
            name='flightLegs',
            field=models.ManyToManyField(null=True, to='BookingAPI.flightleg'),
        ),
        migrations.AlterField(
            model_name='flightleg',
            name='cost_dollars',
            field=models.IntegerField(default=100, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100000)]),
        ),
        migrations.AlterField(
            model_name='flightleg',
            name='flight_time_minutes',
            field=models.BigIntegerField(default=60, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(720)]),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='email_address',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='flightLegs',
            field=models.ManyToManyField(null=True, to='BookingAPI.flightleg'),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='special_assistance',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='title',
            field=models.CharField(max_length=4, null=True),
        ),
        migrations.AlterField(
            model_name='rentalcar',
            name='cost_per_day',
            field=models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10000)]),
        ),
        migrations.AlterField(
            model_name='rentalcar',
            name='image_link',
            field=models.CharField(max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='rentalcar',
            name='web_link',
            field=models.CharField(max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='seat',
            name='passengers',
            field=models.ManyToManyField(null=True, to='BookingAPI.passenger'),
        ),
        migrations.AlterField(
            model_name='travelinsurance',
            name='cost_per_person',
            field=models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10000)]),
        ),
        migrations.AlterField(
            model_name='travelinsurance',
            name='image_link',
            field=models.CharField(max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='travelinsurance',
            name='web_link',
            field=models.CharField(max_length=512, null=True),
        ),
    ]