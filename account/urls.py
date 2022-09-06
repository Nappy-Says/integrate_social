from django.urls import path

from account.controllers.profile import profile



urlpatterns = [
    path('asd/', profile, name='home_url_name'),
]