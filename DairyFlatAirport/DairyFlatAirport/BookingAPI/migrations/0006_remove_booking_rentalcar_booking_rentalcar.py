# Generated by Django 4.0.4 on 2022-05-03 04:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BookingAPI', '0005_alter_booking_flightlegs_alter_booking_rentalcar_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='rentalCar',
        ),
        migrations.AddField(
            model_name='booking',
            name='rentalCar',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BookingAPI.rentalcar'),
        ),
    ]
