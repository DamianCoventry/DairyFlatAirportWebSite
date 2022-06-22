# Generated by Django 4.0.4 on 2022-05-28 07:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('BookingAPI', '0017_alter_flightleg_aeroplane'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_fri',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_mon',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_sat',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_sun',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_thu',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_tue',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departs_wed',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='departure_time_of_day',
        ),
        migrations.RemoveField(
            model_name='flightleg',
            name='flight_time_minutes',
        ),
        migrations.AddField(
            model_name='flightleg',
            name='arrival_date_time_utc',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='flightleg',
            name='departure_date_time_utc',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]