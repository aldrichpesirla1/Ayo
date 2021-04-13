from django.urls import path

from .views import users, register, login, unverifiedcustomers, approve_customer, reject_customer, AuthenticatedOwner

urlpatterns = [
      path('users', users),
      path('register', register),
      path('login', login),
      path('unverifiedcustomers', unverifiedcustomers),
      path('approve', approve_customer),
      path('reject', reject_customer),
      path('user', AuthenticatedOwner.as_view())
]