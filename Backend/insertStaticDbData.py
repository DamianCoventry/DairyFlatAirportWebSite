import psycopg2


def insertBookingNumber(cursor):
    cursor.execute('INSERT INTO public."BookingAPI_bookingnumber"(id, counter) VALUES (1, 10000)')
    print("Inserted booking number static data")


def deleteExistingData(cursor):
    cursor.execute('DELETE FROM public."BookingAPI_bookingnumber"')
    cursor.execute('DELETE FROM public."BookingAPI_booking_passengers"')
    cursor.execute('DELETE FROM public."BookingAPI_booking_flightLegs"')
    cursor.execute('DELETE FROM public."BookingAPI_bookedseat"')
    cursor.execute('DELETE FROM public."BookingAPI_extrabag"')
    cursor.execute('DELETE FROM public."BookingAPI_passenger"')
    cursor.execute('DELETE FROM public."BookingAPI_booking"')
    cursor.execute('DELETE FROM public."BookingAPI_flightleg"')
    cursor.execute('DELETE FROM public."BookingAPI_seat"')
    cursor.execute('DELETE FROM public."BookingAPI_aeroplane"')
    cursor.execute('DELETE FROM public."BookingAPI_airport"')
    cursor.execute('DELETE FROM public."BookingAPI_rentalcar"')
    cursor.execute('DELETE FROM public."BookingAPI_travelinsurance"')
    cursor.execute('DELETE FROM public.oauth2_provider_refreshtoken')
    cursor.execute('DELETE FROM public.oauth2_provider_accesstoken')
    cursor.execute('DELETE FROM public.oauth2_provider_grant')
    cursor.execute('DELETE FROM public.oauth2_provider_application')
    cursor.execute('DELETE FROM public.auth_user WHERE id > 1')

    print("Deleted existing data")


def insertAeroplanes(cursor):
    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(tail_number, make_model, num_seats, image_link, ' +
                    'floor_plan_link) VALUES (\'ZK-Z556\', \'SyberJet SJ30i\', 6, \'/images/SyberJetSJ30i.jpg\', ' +
                   '\'/images/FloorPlan6.png\')')
    
    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(tail_number, make_model, num_seats, image_link, ' +
                    'floor_plan_link) VALUES (\'ZK-Z763\', \'HondaJet Elite\', 5, \'/images/HondaJetElite.png\', ' +
                   '\'/images/FloorPlan5.png\')')

    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(tail_number, make_model, num_seats, image_link, ' +
                    'floor_plan_link) VALUES (\'ZK-Z764\', \'HondaJet Elite\', 5, \'/images/HondaJetElite.png\', ' +
                   '\'/images/FloorPlan5.png\')')

    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(tail_number, make_model, num_seats, image_link, ' +
                    'floor_plan_link) VALUES (\'G-NZ23\', \'Cirrus SF50\', 4, \'/images/CirrusSF50.png\', ' +
                   '\'/images/FloorPlan4.png\')')

    cursor.execute('INSERT INTO public."BookingAPI_aeroplane"(tail_number, make_model, num_seats, image_link, ' +
                    'floor_plan_link) VALUES (\'G-NZ24\', \'Cirrus SF50\', 4, \'/images/CirrusSF50.png\', ' +
                   '\'/images/FloorPlan4.png\')')

    print("Inserted aeroplane static data")


def selectColumn(cursor, returnColumnName, tableName, whereColumnName, whereStringValue):
    cursor.execute(f'SELECT {returnColumnName} FROM {tableName} WHERE {whereColumnName} = \'{whereStringValue}\'')
    recordSet = cursor.fetchone()
    return recordSet[0]


def insertSeat(cursor):
    PK = selectColumn(cursor, 'id', 'public."BookingAPI_aeroplane"', 'tail_number', 'ZK-Z556')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A2\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B2\', true, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'C1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'C2\', false, {PK})')

    PK = selectColumn(cursor, 'id', 'public."BookingAPI_aeroplane"', 'tail_number', 'ZK-Z763')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A2\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B2\', true, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'C1\', false, {PK})')

    PK = selectColumn(cursor, 'id', 'public."BookingAPI_aeroplane"', 'tail_number', 'ZK-Z764')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A2\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B2\', true, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'C1\', false, {PK})')

    PK = selectColumn(cursor, 'id', 'public."BookingAPI_aeroplane"', 'tail_number', 'G-NZ23')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A2\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B2\', true, {PK})')

    PK = selectColumn(cursor, 'id', 'public."BookingAPI_aeroplane"', 'tail_number', 'G-NZ24')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'A2\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B1\', false, {PK})')
    cursor.execute(f'INSERT INTO public."BookingAPI_seat"("number", emergency_exit, aeroplane_id) ' +
                   f'VALUES (\'B2\', true, {PK})')

    print("Inserted seat static data")


def insertAirports(cursor):
    cursor.execute('INSERT INTO public."BookingAPI_airport"(code, name, city, country, timezone)' +
                   'VALUES (\'NZNE\', \'North Shore Aerodrome\', \'North Shore\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(code, name, city, country, timezone)' +
                   'VALUES (\'ROT\', \'Rotorua Airport\', \'Rotorua\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(code, name, city, country, timezone)' +
                   'VALUES (\'NZTL\', \'Lake Tekapo Airport\', \'Tekapo\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(code, name, city, country, timezone)' +
                   'VALUES (\'SYD\', \'Sydney Airport\', \'Sydney\', \'Australia\', ' +
                   '\'Australia/Sydney\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(code, name, city, country, timezone)' +
                   'VALUES (\'GBZ\', \'Claris Airport\', \'Great Barrier Island\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')
    cursor.execute('INSERT INTO public."BookingAPI_airport"(code, name, city, country, timezone)' +
                   'VALUES (\'CHT\', \'Tuuta Airport\', \'Chatham Islands\', \'New Zealand\', ' +
                   '\'Pacific/Auckland\')')

    print("Inserted airport static data")


def insertRentalCars(cursor):
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Economy\', \'Suzuki\', \'Swift\', \'/images/suzuki-swift.png\', ' +
                   '\'https://www.suzuki.co.nz/\', 55)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Economy\', \'Honda\', \'Jazz\', \'/images/honda-jazz.png\', ' +
                   '\'https://www.honda.co.nz/\', 55)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'EV Sedan\', \'Toyota\', \'Prius\', \'/images/toyota-prius.png\', ' +
                   '\'https://www.toyota.co.nz/\', 70)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'EV Sedan\', \'BMW\', \'i4 M50\', \'/images/bmw-i4-m50.png\', ' +
                   '\'https://www.bmw.co.nz/\', 80)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Compact Hatch\', \'Toyota\', \'Corolla\', ' +
                   '\'/images/toyota-corrolla.png\', \'https://www.toyota.co.nz/\', 65)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Compact Hatch\', \'Volkswagen\', \'Golf GTI\', ' +
                   '\'/images/volkswagen-golf-gti.png\', \'https://www.volkswagen.co.nz/\', 65)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Hybrid Hatch\', \'Toyota\', \'Corolla\', ' +
                   '\'/images/toyota-corrolla-hybrid-hatch.png\', \'https://www.toyota.co.nz/\', 70)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Hybrid Hatch\', \'Toyota\', \'Camry\', ' +
                   '\'/images/toyota-camry-hybrid-hatch.png\', \'https://www.toyota.co.nz/\', 70)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Intermediate Sedan\', \'Hyundai\', \'Elantra\', ' +
                   '\'/images/hyundai-elantra.png\', \'https://www.hyundai.co.nz/\', 80)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Intermediate Sedan\', \'Nissan\', \'Sentra\', ' +
                   '\'/images/nissan-sentra.png\', \'https://www.nissan.co.nz/\', 80)')

    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Compact SUV\', \'Hyundai\', \'Tucson\', ' +
                   '\'/images/hyundai-tucson.png\', \'https://www.hyundai.co.nz/\', 85)')
    cursor.execute('INSERT INTO public."BookingAPI_rentalcar"(type, make, model, image_link, web_link, ' +
                   'cost_per_day) VALUES (\'Compact SUV\', \'Mazda\', \'CX-5\', \'/images/mazda-cx5.png\', ' +
                   '\'https://www.mazda.co.nz/\', 85)')

    print("Inserted rental cars static data")


def insertTravelInsurance(cursor):
    cursor.execute('INSERT INTO public."BookingAPI_travelinsurance"(title, description, image_link, ' +
                   'web_link, cost_per_person) VALUES (\'TINZ\', \'Get cover for the things you love. Whether ' +
                   'you\'\'re travelling in New Zealand or overseas, you\'\'re an avid skier, an adrenalin junkie, a ' +
                   'gadget freak or a high-end holidaymaker, TINZ has the extra cover you’re looking for.\', ' +
                   '\'/images/tinz-travel-insurance.jpg\', \'https://www.travelinsurance.co.nz/\', 140)')
    cursor.execute('INSERT INTO public."BookingAPI_travelinsurance"(title, description, image_link, ' +
                   'web_link, cost_per_person) VALUES (\'1-Cover\', \'We are proud to say that we\'\'ve provided ' +
                   'award-winning travel cover to more than 1.5 million travellers around the world. You\'\'re sure ' +
                   'to find a policy to suit you.\', ' +
                   '\'/images/1cover-travel-insurance-au.jpg\', \'https://www.1cover.co.nz/\', 152)')
    cursor.execute('INSERT INTO public."BookingAPI_travelinsurance"(title, description, image_link, ' +
                   'web_link, cost_per_person) VALUES (\'Cover More\', \'Travel, medical and luggage cover, ' +
                   '24-hour global emergency assistance, medical and dental expenses, 15 working days cooling off ' +
                   'period\', ' +
                   '\'/images/cover-more-travel-insurance.jpg\', \'https://www.covermore.co.nz/\', 163)')

    print("Inserted travel insurance static data")


# def insertUsers(cursor):
#     # USERNAME          PASSWORD ...shh don't tell anyone
#     # collin            5xdkvlaQXeJqZ92DJf2D
#     # marcelo           DusBV6WfsX1vaGtWjzzA
#     # elle              4XhLh0K7XqnbnD6Wc9OL
#     # terrance          zGCX3I2s67r7Uv6KCEPZ
#
#     cursor.execute('INSERT INTO public.auth_user(password, is_superuser, username, first_name, ' +
#                    'last_name, email, is_staff, is_active, date_joined) ' +
#                    'VALUES (' +
#                    '\'pbkdf2_sha256$320000$UNwgaXcJB3qDtdtNYs3z6A$pSvDdcYWqmZqyJgVejbmzqwJGwdjsKxikLz6mhXlgBM=\',' +
#                    'false, \'collin\', \'Collin\', \'Ochoa\',' +
#                    '\'ochoa.collin@email.net\', false, true, now())')
#
#     cursor.execute('INSERT INTO public.auth_user(password, is_superuser, username, first_name, ' +
#                    'last_name, email, is_staff, is_active, date_joined) ' +
#                    'VALUES (' +
#                    '\'pbkdf2_sha256$320000$yOZg120iFktY2ZEVTdVyiS$wofJSR2kxiMaymPceytx576Y0NXON2nX1ekHNKMrnnk=\',' +
#                    'false, \'marcelo\', \'Marcelo\', \'Taylor\',' +
#                    '\'m.taylor@email.net\', false, true, now())')
#
#     cursor.execute('INSERT INTO public.auth_user(password, is_superuser, username, first_name, ' +
#                    'last_name, email, is_staff, is_active, date_joined) ' +
#                    'VALUES (' +
#                    '\'pbkdf2_sha256$320000$0tUrKjIh00BzDnuqBdPFy0$QEoUyMivJyuiX24oXitvPFw48ZslXNONf94g3hULoXY=\',' +
#                    'false, \'elle\', \'Elle\', \'Archer\',' +
#                    '\'elle.archer@gmail.com\', false, true, now())')
#
#     cursor.execute('INSERT INTO public.auth_user(password, is_superuser, username, first_name, ' +
#                    'last_name, email, is_staff, is_active, date_joined) ' +
#                    'VALUES (' +
#                    '\'pbkdf2_sha256$320000$5psQbXSiDr4lVpnjyKUqwQ$5hHTWPcwtHKRSkWPOPIHItqvBxtKri5UWpwtNE4uOjM=\',' +
#                    'false, \'terrance\', \'Terrance\', \'Christian\',' +
#                    '\'terrance.christian@email.net\', false, true, now())')
#
#     print("Inserted user static data")


# INSERT INTO public.oauth2_provider_application(
#     client_id, redirect_uris, client_type, authorization_grant_type, client_secret,
#     name, user_id, skip_authorization, created, updated, algorithm)
# VALUES (
#     'Z8VUqShJQnkfa5f8fzUAVzlBxYNxU2tuqaN8Gvh9',
#     'http://127.0.0.1:8080/user/receiveAuthCode.html',
#     'confidential',
#     'authorization-code',
#     'pbkdf2_sha256$320000$k9i3HjKFIGpnurpVQORJsk$tvsi5mGAs+mhMZ3zGD+Ukh+C0/2iPBP9TLSuSpoZWpw=',
#     'BookingFrontEnd',
#     1,
#     false,
#     now(), now(), '')


# def insertOauth2Data(cursor):
#     cursor.execute('INSERT INTO public.oauth2_provider_application(' +
#                    'client_id, redirect_uris, client_type, authorization_grant_type, client_secret, ' +
#                    'name, user_id, skip_authorization, created, updated, algorithm)' +
#                    'VALUES (' +
#                    '\'Z8VUqShJQnkfa5f8fzUAVzlBxYNxU2tuqaN8Gvh9\', ' +               # client_id
#                    '\'http://127.0.0.1:8080/user/receiveAuthCode.html\', ' +        # redirect_uris
#                    '\'confidential\', ' +
#                    '\'authorization-code\', ' +
#                                                                                     # client_secret
#                    '\'pbkdf2_sha256$320000$k9i3HjKFIGpnurpVQORJsk$tvsi5mGAs+mhMZ3zGD+Ukh+C0/2iPBP9TLSuSpoZWpw=\', ' +
#                    '\'BookingFrontEnd\', ' +
#                    '1, ' +                                                          # user_id
#                    'false, ' +
#                    'now(), now(), \'\')')
#
#     print("Inserted Oauth2 static data")


try:
    conn = psycopg2.connect(database="postgres", user="postgres",
                            password="hUUqDyhEKXSmwTU7i2xk", host="db", port="5432")
    print("Opened database successfully")

    cur = conn.cursor()

    deleteExistingData(cur)
    conn.commit()

    insertBookingNumber(cur)
    insertAeroplanes(cur)
    insertAirports(cur)
    insertRentalCars(cur)
    insertTravelInsurance(cur)
#    insertUsers(cur)
#    insertOauth2Data(cur)
    conn.commit()

    insertSeat(cur)
    conn.commit()

    print('Inserted data successfully.')

    conn.close()

except Exception as e:
    print(f'Caught an exception: {e}')
