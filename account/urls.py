from django.urls import path

from account.controllers.profile import Profile



urlpatterns = [
    path('asd/', Profile, name='home_url_name'),
]