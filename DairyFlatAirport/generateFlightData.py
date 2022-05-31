from datetime import datetime, tzinfo, timedelta
from typing import Final

import psycopg2

# • A weekly “prestige” service to Sydney using the SyberJet aircraft. The outbound flight
#   departs Dairy Flat on Friday early morning with the return inbound flight departing
#   Sydney on Sunday mid-afternoon (their time). Note: the outbound flight first stops
#   at Rotorua to pick up passengers before continuing on to Sydney. The inbound flight
#   comes straight back to Dairy Flat without stopping.
#
# • A twice daily shuttle service to Rotorua using one of the Cirrus jets. These operate
#   every weekday Monday–Friday. The first flight departs Dairy Flat early morning with
#   the return flight departing from Rotorua at noon. After turnaround, the next flight
#   departs Dairy Flat late afternoon, with the return flight departing Rotorua in the
#   evening.
#
# • A three times weekly service to Claris airport in Great Barrier Island using the other
#   Cirrus. The outbound flight departs Dairy Flat in the morning every Monday, Wednesday,
#   and Friday. The return flight departs Great Barrier Island in the morning every
#   Tuesday, Friday, and Saturday.
#
# • A twice-weekly service to Tuuta Airport in the Chatham Islands using one of the
#   HondaJets. The outbound flights depart Dairy Flat on Tuesday and Friday, with the
#   return flights departing Tuuta on Wednesday and Saturday.
#
# • A weekly service to Lake Tekapo in the South Island using the other HondaJet. Departs
#   Dairy Flat on Monday with the return flight departing Tekapo on Friday.


# these numbers are the PKs within my database
import pytz

SYBERJET_SJ30I: Final = 1
CIRRUS_SF50_A: Final = 2
CIRRUS_SF50_B: Final = 2
HONDAJET_ELITE_A: Final = 4
HONDAJET_ELITE_B: Final = 5

# these numbers are the PKs within my database
NORTH_SHORE_AERODROME: Final = {'pk': 1, 'code': 'NZNE'}
ROTORUA_AIRPORT: Final = {'pk': 2, 'code': 'ROT'}
SYDNEY_AIRPORT: Final = {'pk': 4, 'code': 'SYD'}
CLARIS_AIRPORT: Final = {'pk': 5, 'code': 'GBZ'}
TUUTA_AIRPORT: Final = {'pk': 6, 'code': 'CHT'}
LAKE_TEKAPO_AIRPORT: Final = {'pk': 3, 'code': 'NZTL'}

# data from Google Maps, Google Flights, Air Chathams
FLIGHT_TIMES: Final = {
    'nsh->rot': 40,
    'rot->nsh': 45,
    'rot->syd': 230,    # 3 hours 50 minutes
    'syd->nsh': 185,    # 3 hours 5 minutes
    'nsh->gbi': 40,
    'gbi->nsh': 35,
    'nsh->chi': 135,    # 2 hours 15 minutes
    'chi->nsh': 165,    # 2 hours 45 minutes
    'nsh->lkt': 80,     # 1 hour 20 minutes
    'lkt->nsh': 90      # 1 hour 30 minutes
}

# data from Google
FLIGHT_COSTS: Final = {
    'nsh->rot': 148,
    'rot->nsh': 125,
    'rot->syd': 905,
    'syd->nsh': 820,
    'nsh->gbi': 140,
    'gbi->nsh': 140,
    'nsh->chi': 425,
    'chi->nsh': 670,
    'nsh->lkt': 110,
    'lkt->nsh': 120
}

NUM_OF_WEEKS: Final = 20

# https://docs.python.org/3/library/datetime.html#aware-and-naive-objects
sunday1May2022_naive: Final = datetime(2022, 5, 1)


def makeFlightNumber(prefix, number):
    return prefix + str(number)


def deleteExistingFlightData(cursor):
    cursor.execute('TRUNCATE public."BookingAPI_booking_passengers"')
    cursor.execute('TRUNCATE public."BookingAPI_booking_flightLegs"')

    # these tables are referenced by a FK join, can't truncate
    cursor.execute('DELETE FROM public."BookingAPI_extrabag"')
    cursor.execute('DELETE FROM public."BookingAPI_passenger"')
    cursor.execute('DELETE FROM public."BookingAPI_booking"')
    cursor.execute('DELETE FROM public."BookingAPI_flightleg"')

    print("Deleted existing flight legs")


def quote(s):
    return '\'' + s + '\''


def toRdbmsDateTime(dt):
    return quote(dt.astimezone(pytz.UTC).isoformat())


def insertIntoFlightLeg(values):
    return 'INSERT INTO public."BookingAPI_flightleg"(' + \
           '"number", cost_dollars, aeroplane_id, departure_airport_id, arrival_airport_id,' + \
           'departure_date_time_utc, arrival_date_time_utc, flight_time_mins) VALUES (' + values + ")"


def insertFlightLeg(cursor, flightNumber, flightCost, aeroplane, departureAirport, arrivalAirport,
                    departureDateTime, arrivalDateTime, flightTime):
    cursor.execute(
        insertIntoFlightLeg(
            quote(flightNumber) + ', ' +
            str(flightCost) + ', ' +
            str(aeroplane) + ', ' +
            str(departureAirport) + ', ' +
            str(arrivalAirport) + ', ' +
            toRdbmsDateTime(departureDateTime) + ', ' +
            toRdbmsDateTime(arrivalDateTime) + ', ' +
            str(flightTime)))


def makeFlight(cursor, route, flightNumber, aeroplane,
               departureAirport, departureDateTime,
               arrivalAirport, arrivalAirportTZ=None):
    flightTime = FLIGHT_TIMES[route]
    departs = departureDateTime
    arrives = departs + timedelta(minutes=flightTime)
    if arrivalAirportTZ is not None:
        arrives = arrives.astimezone(arrivalAirportTZ)

    insertFlightLeg(cursor,
                    makeFlightNumber(arrivalAirport['code'], flightNumber),
                    FLIGHT_COSTS[route],
                    aeroplane,
                    departureAirport['pk'],
                    arrivalAirport['pk'],
                    departs, arrives, flightTime)


def insertSydneyFlightLegs(cursor, aeroplanePK):
    # north shore -> rotorua, Friday early AM, NZST
    # rotorua -> sydney, Friday early AM, NZST
    # sydney -> north shore, Sunday mid-afternoon PM, AEST

    nzst = pytz.timezone('Pacific/Auckland')
    aest = pytz.timezone('Australia/Sydney')

    sunday1May2022_NZST = nzst.localize(sunday1May2022_naive, is_dst=None)
    sunday1May2022_AEST = aest.localize(sunday1May2022_naive, is_dst=None)

    friEarlyMorningNZST = sunday1May2022_NZST + timedelta(days=5, hours=6)
    friMidMorningNZST = sunday1May2022_NZST + timedelta(days=5, hours=9)
    sunMidAfternoonAEST = sunday1May2022_AEST + timedelta(days=7, hours=15)

    for i in range(NUM_OF_WEEKS):
        makeFlight(cursor, 'nsh->rot', 40, aeroplanePK,
                   NORTH_SHORE_AERODROME, friEarlyMorningNZST, ROTORUA_AIRPORT)  # same tz

        makeFlight(cursor, 'rot->syd', 41, aeroplanePK,
                   ROTORUA_AIRPORT, friMidMorningNZST, SYDNEY_AIRPORT, aest)  # different tz

        makeFlight(cursor, 'syd->nsh', 42, aeroplanePK,
                   SYDNEY_AIRPORT, sunMidAfternoonAEST, NORTH_SHORE_AERODROME, nzst)  # different tz

        friEarlyMorningNZST += timedelta(weeks=1)
        friMidMorningNZST += timedelta(weeks=1)
        sunMidAfternoonAEST += timedelta(weeks=1)

    print("Inserted Sydney flight legs")


def insertRotoruaFlightLegs(cursor, aeroplanePK):
    # north shore -> rotorua, Mon-Fri early AM, NZST
    # rotorua -> north shore, Mon-Fri noon, NZST
    # north shore -> rotorua, Mon-Fri late afternoon PM, NZST
    # rotorua -> north shore, Mon-Fri evening PM, NZST

    sunday1May2022_NZST = pytz.timezone('Pacific/Auckland').localize(sunday1May2022_naive, is_dst=None)

    monEarlyMorningNZST = sunday1May2022_NZST + timedelta(days=1, hours=6)
    monNoonNZST = sunday1May2022_NZST + timedelta(days=1, hours=12)
    monLateAfternoonNZST = sunday1May2022_NZST + timedelta(days=1, hours=16, minutes=30)
    monEveningNZST = sunday1May2022_NZST + timedelta(days=1, hours=19)

    for i in range(NUM_OF_WEEKS):
        for m2f in range(5):
            makeFlight(cursor, 'nsh->rot', 20, aeroplanePK,
                       NORTH_SHORE_AERODROME, monEarlyMorningNZST + timedelta(days=m2f), ROTORUA_AIRPORT)

            makeFlight(cursor, 'rot->nsh', 21, aeroplanePK,
                       ROTORUA_AIRPORT, monNoonNZST + timedelta(days=m2f), NORTH_SHORE_AERODROME)

        for m2f in range(5):
            makeFlight(cursor, 'nsh->rot', 30, aeroplanePK,
                       NORTH_SHORE_AERODROME, monLateAfternoonNZST + timedelta(days=m2f), ROTORUA_AIRPORT)

            makeFlight(cursor, 'rot->nsh', 31, aeroplanePK,
                       ROTORUA_AIRPORT, monEveningNZST + timedelta(days=m2f), NORTH_SHORE_AERODROME)

        monEarlyMorningNZST += timedelta(weeks=1)
        monNoonNZST += timedelta(weeks=1)
        monLateAfternoonNZST += timedelta(weeks=1)
        monEveningNZST += timedelta(weeks=1)

    print("Inserted Rotorua flight legs")


def insertGreatBarrierIslandFlightLegs(cursor, aeroplanePK):
    # north shore -> gbi, Mon+Wed+Fri AM, NZST
    # gbi -> north shore, Tue+Fri+Sat AM, NZST

    sunday1May2022_NZST = pytz.timezone('Pacific/Auckland').localize(sunday1May2022_naive, is_dst=None)

    monMorningNZST = sunday1May2022_NZST + timedelta(days=1, hours=7, minutes=30)
    tueMorningNZST = sunday1May2022_NZST + timedelta(days=2, hours=10, minutes=15)

    for i in range(NUM_OF_WEEKS):
        makeFlight(cursor, 'nsh->gbi', 70, aeroplanePK,
                   NORTH_SHORE_AERODROME, monMorningNZST, CLARIS_AIRPORT)

        makeFlight(cursor, 'nsh->gbi', 70, aeroplanePK,
                   NORTH_SHORE_AERODROME, monMorningNZST + timedelta(days=2), CLARIS_AIRPORT)

        makeFlight(cursor, 'nsh->gbi', 70, aeroplanePK,
                   NORTH_SHORE_AERODROME, monMorningNZST + timedelta(days=4), CLARIS_AIRPORT)

        makeFlight(cursor, 'gbi->nsh', 75, aeroplanePK,
                   CLARIS_AIRPORT, tueMorningNZST, NORTH_SHORE_AERODROME)

        makeFlight(cursor, 'gbi->nsh', 75, aeroplanePK,
                   CLARIS_AIRPORT, tueMorningNZST + timedelta(days=3), NORTH_SHORE_AERODROME)

        makeFlight(cursor, 'gbi->nsh', 75, aeroplanePK,
                   CLARIS_AIRPORT, tueMorningNZST + timedelta(days=1), NORTH_SHORE_AERODROME)

        monMorningNZST += timedelta(weeks=1)
        tueMorningNZST += timedelta(weeks=1)

    print("Inserted Great Barrier Island flight legs")


def insertChathamIslandsFlightLegs(cursor, aeroplanePK):
    # north shore -> ci, Tue+Fri, NZST
    # ci -> north shore, Wed+Sat, CHAST

    nzst = pytz.timezone('Pacific/Auckland')
    chast = pytz.timezone('Pacific/Chatham')

    sunday1May2022_NZST = nzst.localize(sunday1May2022_naive, is_dst=None)
    sunday1May2022_CHAST = chast.localize(sunday1May2022_naive, is_dst=None)

    tueMidMorningNZST = sunday1May2022_NZST + timedelta(days=2, hours=9, minutes=45)
    wedMidMorningCHAST = sunday1May2022_CHAST + timedelta(days=3, hours=10, minutes=30)

    for i in range(NUM_OF_WEEKS):
        makeFlight(cursor, 'nsh->chi', 65, aeroplanePK,
                   ROTORUA_AIRPORT, tueMidMorningNZST, TUUTA_AIRPORT, chast)  # different tz

        makeFlight(cursor, 'nsh->chi', 66, aeroplanePK,
                   ROTORUA_AIRPORT, tueMidMorningNZST + timedelta(days=3), TUUTA_AIRPORT, chast)  # different tz

        makeFlight(cursor, 'chi->nsh', 67, aeroplanePK,
                   TUUTA_AIRPORT, wedMidMorningCHAST, NORTH_SHORE_AERODROME, nzst)  # different tz

        makeFlight(cursor, 'chi->nsh', 68, aeroplanePK,
                   TUUTA_AIRPORT, wedMidMorningCHAST + timedelta(days=3), NORTH_SHORE_AERODROME, nzst)  # different tz

        tueMidMorningNZST += timedelta(weeks=1)
        wedMidMorningCHAST += timedelta(weeks=1)

    print("Inserted Chatham Islands flight legs")


def insertLakeTekapoFlightLegs(cursor, aeroplanePK):
    # north shore -> lt, Mon, NZST
    # lt -> north shore, Fri, NZST

    sunday1May2022_NZST = pytz.timezone('Pacific/Auckland').localize(sunday1May2022_naive, is_dst=None)

    monMorningNZST = sunday1May2022_NZST + timedelta(days=1, hours=13)
    friMorningNZST = sunday1May2022_NZST + timedelta(days=5, hours=11)

    for i in range(NUM_OF_WEEKS):
        makeFlight(cursor, 'nsh->lkt', 50, aeroplanePK,
                   NORTH_SHORE_AERODROME, monMorningNZST, LAKE_TEKAPO_AIRPORT)

        makeFlight(cursor, 'lkt->nsh', 51, aeroplanePK,
                   LAKE_TEKAPO_AIRPORT, friMorningNZST, NORTH_SHORE_AERODROME)

        monMorningNZST += timedelta(weeks=1)
        friMorningNZST += timedelta(weeks=1)

    print("Inserted Lake Tekapo flight legs")


try:
    conn = psycopg2.connect(database="postgres", user="postgres",
                            password="hUUqDyhEKXSmwTU7i2xk", host="127.0.0.1", port="5432")
    print("Opened database successfully")

    cur = conn.cursor()

    deleteExistingFlightData(cur)
    conn.commit()

    insertSydneyFlightLegs(cur, SYBERJET_SJ30I)
    insertRotoruaFlightLegs(cur, CIRRUS_SF50_A)
    insertGreatBarrierIslandFlightLegs(cur, CIRRUS_SF50_B)
    insertChathamIslandsFlightLegs(cur, HONDAJET_ELITE_A)
    insertLakeTekapoFlightLegs(cur, HONDAJET_ELITE_B)
    conn.commit()

    print('Inserted data successfully.')

    conn.close()

except Exception as e:
    print(f'Caught an exception: {e}')