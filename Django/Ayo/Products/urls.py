from django.urls import path

from .views import *

urlpatterns = [
      path('users', users),
      path('register', register),
      path('login', login),
      path('unverifiedcustomers', unverifiedcustomers),
      path('approve', approve_customer),
      path('reject', reject_customer),
      path('user', AuthenticatedOwner.as_view()),
      path('edituser', ChangedUser.as_view())
]