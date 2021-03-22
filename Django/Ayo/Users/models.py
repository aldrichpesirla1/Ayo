"""
TODO:
Recheck if needed valid ids per user
- if there are special roles for pharmacist
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# nullable for now

# AbstractUser so that we can use Django Authorization functions
class User(AbstractUser):
      id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
      name = models.CharField(max_length=200)
      contact_number = models.CharField(max_length=15, unique=True)
      address = models.CharField(max_length=200)
      registration = models.DateTimeField(auto_now_add=True, blank=True)
      password = models.CharField(max_length=200, blank=True)
      # valid_id1 = models.ImageField()
      # valid_id2 = models.ImageField()
      role = models.CharField(max_length=10, null=True, blank=True)
      username = None

      USERNAME_FIELD = 'contact_number'
      REQUIRED_FIELDS = []

class Owner(User):
      # business_permit = models.ImageField(blank=True, null=True)

      def save(self, *args, **kwargs):
            self.role = "Owner"
            super(Owner, self).save(*args, **kwargs)

class Customer(User):
      medical_record = models.TextField(max_length=200, null=True, blank=True)
      is_verified = models.BooleanField(default=False)

      def save(self, *args, **kwargs):
            self.role = "Customer"
            super(Owner, self).save(*args, **kwargs)

class PharmacyWorker(User):
      # medical_license = models.ImageField(blank=True, null=True)
      is_available = models.BooleanField(default=True)

      def save(self, *args, **kwargs):
            if self.medical_license is None and self.role is None:
                  self.role = "Assistant"
            else:
                  self.role = "Pharmacist"