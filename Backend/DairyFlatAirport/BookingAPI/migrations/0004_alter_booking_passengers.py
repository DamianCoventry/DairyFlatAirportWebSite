# Generated by Django 4.0.4 on 2022-06-23 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookingAPI', '0003_remove_bookedseat_unique_booking_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='passengers',
            field=models.ManyToManyField(related_name='passengersBooking', to='BookingAPI.passenger'),
        ),
    ]
