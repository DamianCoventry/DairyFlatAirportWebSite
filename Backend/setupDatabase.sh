python manage.py makemigrations
python manage.py migrate --noinput
python /usr/app/insertStaticDbData.py
python /usr/app/generateFlightData.py
