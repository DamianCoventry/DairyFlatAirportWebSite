#!/bin/bash

set -e

python manage.py makemigrations

python manage.py migrate --noinput

python /usr/src/app/insertStaticDbData.py

python /usr/src/app/generateFlightData.py

python manage.py runserver 0.0.0.0:8000
