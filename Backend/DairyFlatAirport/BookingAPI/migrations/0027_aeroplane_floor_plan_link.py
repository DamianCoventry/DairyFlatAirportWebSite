# Generated by Django 4.0.4 on 2022-06-23 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookingAPI', '0026_aeroplane_image_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='aeroplane',
            name='floor_plan_link',
            field=models.CharField(max_length=512, null=True),
        ),
    ]
