import psycopg2


def insertBookingNumber(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_bookingnumber"')
    cursor.execute('INSERT INTO public."BookingAPI_bookingnumber"(id, counter) VALUES (1, 10000)')

    print("Inserted booking number static data")


def deleteExistingBookingAndFlightData(cursor):
    cursor.execute('TRUNCATE public."BookingAPI_booking_passengers"')
    cursor.execute('TRUNCATE public."BookingAPI_booking_flightLegs"')
    cursor.execute('TRUNCATE public."BookingAPI_bookedseat"')

    # these tables are referenced by a FK join, can't truncate
    cursor.execute('DELETE FROM public."BookingAPI_extrabag"')
    cursor.execute('DELETE FROM public."BookingAPI_passenger"')
    cursor.execute('DELETE FROM public."BookingAPI_booking"')
    cursor.execute('DELETE FROM public."BookingAPI_flightleg"')

    print("Deleted existing booking and flight data")


def insertAeroplanes(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_aeroplane"')

    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(id, tail_number, make_model, num_seats)' +
                   'VALUES (1, \'ZK-Z556\', \'SyberJet SJ30i\', 6)')
    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(id, tail_number, make_model, num_seats)' +
                   'VALUES (2, \'ZK-Z763\', \'HondaJet Elite\', 5)')
    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(id, tail_number, make_model, num_seats)' +
                   'VALUES (3, \'ZK-Z764\', \'HondaJet Elite\', 5)')
    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(id, tail_number, make_model, num_seats)' +
                   'VALUES (4, \'G-NZ23\', \'Cirrus SF50\', 4)')
    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(id, tail_number, make_model, num_seats)' +
                   'VALUES (5, \'G-NZ24\', \'Cirrus SF50\', 4)')

    print("Inserted aeroplane static data")


def insertAirports(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_airport"')

    cursor.execute('INSERT INTO public."BookingAPI_airport"(id, code, name, city, country, timezone)' +
                   'VALUES (1, \'NZNE\', \'North Shore Aerodrome\', \'North Shore\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(id, code, name, city, country, timezone)' +
                   'VALUES (2, \'ROT\', \'Rotorua Airport\', \'Rotorua\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(id, code, name, city, country, timezone)' +
                   'VALUES (3, \'NZTL\', \'Lake Tekapo Airport\', \'Tekapo\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(id, code, name, city, country, timezone)' +
                   'VALUES (4, \'SYD\', \'Sydney Airport\', \'Sydney\', \'Australia\', ' +
                   '\'Australia/Sydney\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(id, code, name, city, country, timezone)' +
                   'VALUES (5, \'GBZ\', \'Claris Airport\', \'Great Barrier Island\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(id, code, name, city, country, timezone)' +
                   'VALUES (6, \'CHT\', \'Tuuta Airport\', \'Chatham Islands\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')

    print("Inserted airport static data")


def insertRentalCars(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_rentalcar"')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (1, \'Economy\', \'Suzuki\', \'Swift\', \'/images/suzuki-swift.png\', ' +
                   '\'https://www.suzuki.co.nz/\', 55)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (2, \'Economy\', \'Honda\', \'Jazz\', \'/images/honda-jazz.png\', ' +
                   '\'https://www.honda.co.nz/\', 55)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (3, \'EV Sedan\', \'Toyota\', \'Prius\', \'/images/toyota-prius.png\', ' +
                   '\'https://www.toyota.co.nz/\', 70)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (4, \'EV Sedan\', \'BMW\', \'i4 M50\', \'/images/bmw-i4-m50.png\', ' +
                   '\'https://www.bmw.co.nz/\', 80)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (5, \'Compact Hatch\', \'Toyota\', \'Corolla\', ' +
                   '\'/images/toyota-corrolla.png\', \'https://www.toyota.co.nz/\', 65)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (6, \'Compact Hatch\', \'Volkswagen\', \'Golf GTI\', ' +
                   '\'/images/volkswagen-golf-gti.png\', \'https://www.volkswagen.co.nz/\', 65)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (7, \'Hybrid Hatch\', \'Toyota\', \'Corolla\', ' +
                   '\'/images/toyota-corrolla-hybrid-hatch.png\', \'https://www.toyota.co.nz/\', 70)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (8, \'Hybrid Hatch\', \'Toyota\', \'Camry\', ' +
                   '\'/images/toyota-camry-hybrid-hatch.png\', \'https://www.toyota.co.nz/\', 70)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (9, \'Intermediate Sedan\', \'Hyundai\', \'Elantra\', ' +
                   '\'/images/hyundai-elantra.png\', \'https://www.hyundai.co.nz/\', 80)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (10, \'Intermediate Sedan\', \'Nissan\', \'Sentra\', ' +
                   '\'/images/nissan-sentra.png\', \'https://www.nissan.co.nz/\', 80)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (11, \'Compact SUV\', \'Hyundai\', \'Tucson\', ' +
                   '\'/images/hyundai-tucson.png\', \'https://www.hyundai.co.nz/\', 85)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(id, type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (12, \'Compact SUV\', \'Mazda\', \'CX-5\', \'/images/mazda-cx5.png\', ' +
                   '\'https://www.mazda.co.nz/\', 85)')

    print("Inserted rental cars static data")


def insertSeat(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_seat"')

    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (1, \'A1\', false, 1)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (2, \'A2\', false, 1)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (3, \'B1\', false, 1)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (4, \'B2\', true, 1)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (5, \'C1\', false, 1)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (6, \'C2\', false, 1)')

    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (7, \'A1\', false, 2)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (8, \'A2\', false, 2)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (9, \'B1\', false, 2)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (10, \'B2\', true, 2)')

    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (11, \'A1\', false, 3)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (12, \'A2\', false, 3)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (13, \'B1\', false, 3)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (14, \'B2\', true, 3)')

    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (15, \'A1\', false, 4)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (16, \'A2\', false, 4)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (17, \'B1\', false, 4)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (18, \'B2\', true, 4)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (19, \'C1\', false, 4)')

    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (20, \'A1\', false, 5)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (21, \'A2\', false, 5)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (22, \'B1\', false, 5)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (23, \'B2\', true, 5)')
    cursor.execute('INSERT INTO public."BookingAPI_seat"(id, "number", emergency_exit, aeroplane_id) ' +
                   'VALUES (24, \'C1\', false, 5)')

    print("Inserted seat static data")


def insertTravelInsurance(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_travelinsurance"')

    cursor.execute('INSERT INTO public."BookingAPI_travelinsurance"(id, title, description, image_link, ' +
                   'web_link, cost_per_person) VALUES (1, \'TINZ\', \'Get cover for the things you love. Whether ' +
                   'you\'\'re travelling in New Zealand or overseas, you\'\'re an avid skier, an adrenalin junkie, a ' +
                   'gadget freak or a high-end holidaymaker, TINZ has the extra cover you’re looking for.\', ' +
                   '\'/images/tinz-travel-insurance.jpg\', \'https://www.travelinsurance.co.nz/\', 140)')
    cursor.execute('INSERT INTO public."BookingAPI_travelinsurance"(id, title, description, image_link, ' +
                   'web_link, cost_per_person) VALUES (2, \'1-Cover\', \'We are proud to say that we\'\'ve provided ' +
                   'award-winning travel cover to more than 1.5 million travellers around the world. You\'\'re sure ' +
                   'to find a policy to suit you.\', ' +
                   '\'/images/1cover-travel-insurance-au.jpg\', \'https://www.1cover.co.nz/\', 152)')
    cursor.execute('INSERT INTO public."BookingAPI_travelinsurance"(id, title, description, image_link, ' +
                   'web_link, cost_per_person) VALUES (3, \'Cover More\', \'Travel, medical and luggage cover, ' +
                   '24-hour global emergency assistance, medical and dental expenses, 15 working days cooling off ' +
                   'period\', ' +
                   '\'/images/cover-more-travel-insurance.jpg\', \'https://www.covermore.co.nz/\', 163)')

    print("Inserted travel insurance static data")


def insertUsers(cursor):
    cursor.execute('DELETE FROM public.auth_user')

    # USERNAME          PASSWORD ...shh don't tell anyone
    # admin             hUUqDyhEKXSmwTU7i2xk
    # collin            5xdkvlaQXeJqZ92DJf2D
    # marcelo           DusBV6WfsX1vaGtWjzzA
    # elle              4XhLh0K7XqnbnD6Wc9OL
    # terrance          zGCX3I2s67r7Uv6KCEPZ

    cursor.execute('INSERT INTO public.auth_user(id, password, is_superuser, username, first_name, ' +
                   'last_name, email, is_staff, is_active, date_joined) ' +
                   'VALUES (1, ' +
                   '\'pbkdf2_sha256$320000$HDRjRmyM7dSdJGrGU7SOZr$huM2HxjGq9YEynxdr0daqvcKuk0Pfc2Gz0jmh3ITGec=\',' +
                   'true, \'admin\', \'Captain\', \'Administrator\',' +
                   '\'captain@administrator.com\', false, true, now())')

    cursor.execute('INSERT INTO public.auth_user(id, password, is_superuser, username, first_name, ' +
                   'last_name, email, is_staff, is_active, date_joined) ' +
                   'VALUES (2, ' +
                   '\'pbkdf2_sha256$320000$UNwgaXcJB3qDtdtNYs3z6A$pSvDdcYWqmZqyJgVejbmzqwJGwdjsKxikLz6mhXlgBM=\',' +
                   'false, \'collin\', \'Collin\', \'Ochoa\',' +
                   '\'ochoa.collin@email.net\', false, true, now())')

    cursor.execute('INSERT INTO public.auth_user(id, password, is_superuser, username, first_name, ' +
                   'last_name, email, is_staff, is_active, date_joined) ' +
                   'VALUES (3, ' +
                   '\'pbkdf2_sha256$320000$yOZg120iFktY2ZEVTdVyiS$wofJSR2kxiMaymPceytx576Y0NXON2nX1ekHNKMrnnk=\',' +
                   'false, \'marcelo\', \'Marcelo\', \'Taylor\',' +
                   '\'m.taylor@email.net\', false, true, now())')

    cursor.execute('INSERT INTO public.auth_user(id, password, is_superuser, username, first_name, ' +
                   'last_name, email, is_staff, is_active, date_joined) ' +
                   'VALUES (4, ' +
                   '\'pbkdf2_sha256$320000$0tUrKjIh00BzDnuqBdPFy0$QEoUyMivJyuiX24oXitvPFw48ZslXNONf94g3hULoXY=\',' +
                   'false, \'elle\', \'Elle\', \'Archer\',' +
                   '\'elle.archer@gmail.com\', false, true, now())')

    cursor.execute('INSERT INTO public.auth_user(id, password, is_superuser, username, first_name, ' +
                   'last_name, email, is_staff, is_active, date_joined) ' +
                   'VALUES (5, ' +
                   '\'pbkdf2_sha256$320000$5psQbXSiDr4lVpnjyKUqwQ$5hHTWPcwtHKRSkWPOPIHItqvBxtKri5UWpwtNE4uOjM=\',' +
                   'false, \'terrance\', \'Terrance\', \'Christian\',' +
                   '\'terrance.christian@email.net\', false, true, now())')

    print("Inserted user static data")


def insertOauth2Data(cursor):
    cursor.execute('DELETE FROM public.oauth2_provider_application')

    cursor.execute('INSERT INTO public.oauth2_provider_application(' +
                   'id, client_id, redirect_uris, client_type, authorization_grant_type, client_secret, ' +
                   'name, user_id, skip_authorization, created, updated, algorithm)' +
                   'VALUES (1, ' +
                   '\'Z8VUqShJQnkfa5f8fzUAVzlBxYNxU2tuqaN8Gvh9\', ' +               # client_id
                   '\'http://127.0.0.1:8080/user/receiveAuthCode.html\', ' +        # redirect_uris
                   '\'confidential\', ' +
                   '\'authorization-code\', ' +
                                                                                    # client_secret
                   '\'pbkdf2_sha256$320000$k9i3HjKFIGpnurpVQORJsk$tvsi5mGAs+mhMZ3zGD+Ukh+C0/2iPBP9TLSuSpoZWpw=\', ' +
                   '\'BookingFrontEnd\', ' +
                   '1, ' +                                                          # user_id
                   'false, ' +
                   'now(), now(), \'\')')

    print("Inserted Oauth2 static data")


try:
    conn = psycopg2.connect(database="postgres", user="postgres",
                            password="hUUqDyhEKXSmwTU7i2xk", host="db", port="5432")
    print("Opened database successfully")

    cur = conn.cursor()

    deleteExistingBookingAndFlightData(cur)
    conn.commit()

    insertBookingNumber(cur)
    insertAeroplanes(cur)
    insertAirports(cur)
    insertRentalCars(cur)
    insertSeat(cur)
    insertTravelInsurance(cur)
    insertUsers(cur)
    insertOauth2Data(cur)
    conn.commit()

    print('Inserted data successfully.')

    conn.close()

except Exception as e:
    print(f'Caught an exception: {e}')
