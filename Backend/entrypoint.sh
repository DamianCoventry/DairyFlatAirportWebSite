#!/bin/bash

set -e

python manage.py makemigrations

python manage.py migrate --noinput

python /usr/app/insertStaticDbData.py

python /usr/app/generateFlightData.py

python manage.py runserver 0.0.0.0:8000
