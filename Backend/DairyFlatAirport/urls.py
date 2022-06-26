from django.contrib import admin
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView
from django.urls import include, path
from rest_framework import routers

from DairyFlatAirport.BookingAPI import views
from DairyFlatAirport.BookingAPI.views import SignUpView, SignUpDoneView

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet)
router.register(r'group', views.GroupViewSet)
router.register(r'aeroplane', views.AeroplaneViewSet)
router.register(r'airport', views.AirportViewSet)
router.register(r'flightLeg', views.FlightLegViewSet)
router.register(r'flightLegStopover', views.FlightLegViewSet)
router.register(r'passenger', views.PassengerViewSet, 'passenger')
router.register(r'extraBag', views.ExtraBagViewSet)
router.register(r'seat', views.SeatViewSet)
router.register(r'bookedSeat', views.BookedSeatViewSet)
router.register(r'unbookedSeat', views.UnbookedSeatViewSet, 'unbookedSeat')
router.register(r'travelInsurance', views.TravelInsuranceViewSet)
router.register(r'rentalCar', views.RentalCarViewSet)
router.register(r'bookingCompact', views.BookingCompactViewSet)
router.register(r'booking', views.BookingViewSet, 'booking')
router.register(r'bookingNumber', views.BookingNumberViewSet)
router.register(r'searchFlights', views.SearchFlightsViewSet, 'searchFlights')
router.register(r'flightCounts', views.FlightCountsViewSet, 'flightCounts')
router.register(r'userId', views.UserIdViewSet, 'userId')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('password-change/', PasswordChangeView.as_view(), name='password_change'),
    path('password-change-done/', PasswordChangeDoneView.as_view(), name='password_change_done'),
    path('sign-up/', SignUpView.as_view(), name='signup'),
    path('sign-up-done/', SignUpDoneView.as_view(), name='signup_done'),
]
