from django.urls import include, path
from rest_framework import routers
from DairyFlatAirport.BookingAPI import views
from django.contrib import admin

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'group', views.GroupViewSet)
router.register(r'aeroplane', views.AeroplaneViewSet)
router.register(r'airport', views.AirportViewSet)
router.register(r'flightLeg', views.FlightLegViewSet)
router.register(r'passenger', views.PassengerViewSet)
router.register(r'extraBag', views.ExtraBagViewSet)
router.register(r'seat', views.SeatViewSet)
router.register(r'bookedSeat', views.BookedSeatViewSet)
router.register(r'travelInsurance', views.TravelInsuranceViewSet)
router.register(r'rentalCar', views.RentalCarViewSet)
router.register(r'bookingCompact', views.BookingCompactViewSet)
router.register(r'booking', views.BookingViewSet)

# need the 3rd parameter because the internal 'queryset' member is built at run-time
router.register(r'searchFlights', views.SearchFlightsViewSet, 'searchFlights')
router.register(r'flightCounts', views.FlightCountsViewSet, 'flightCounts')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
