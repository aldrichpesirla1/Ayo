from django.urls import path

from .views import users, register, login, unverifiedcustomers

urlpatterns = [
      path('users', users),
      path('register', register),
      path('login', login),
      path('unverifiedcustomers', unverifiedcustomers),
]