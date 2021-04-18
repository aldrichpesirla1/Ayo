"""
TODO:
Recheck if needed valid ids per user
- update django roles
- if there are special roles for pharmacist
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# nullable for now

# AbstractUser so that we can use Django Authorization functions

class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=15)
    address = models.CharField(max_length=200)
    registration = models.DateTimeField(auto_now_add=True, blank=True)
    password = models.CharField(max_length=200, blank=True)
    role = models.CharField(max_length=10, null=True, blank=True)
    username = models.CharField(max_length=15, unique=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name


class Owner(User):
    business_permit = models.FileField(
        upload_to='business_permit', blank=True, null=True)

    class Meta:
        verbose_name = "Pharmacy Owner"

    def save(self, *args, **kwargs):
        self.validate_unique()
        self.role = "Owner"
        super(Owner, self).save(*args, **kwargs)


class Customer(User):
    valid_id1 = models.FileField(
        upload_to='customer_ids', blank=True, null=True)
    # valid_id2 = models.FileField()
    medical_record = models.FileField(
        upload_to='customer_medical_records', null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Customer"

    def approve(self):
        self.is_verified = True
        self.save()

    def reject(self):
        self.is_rejected = True
        self.save()

    def save(self, *args, **kwargs):
        self.validate_unique()
        self.role = "Customer"
        super(Customer, self).save(*args, **kwargs)


class PharmacyWorker(User):
    medical_license = models.FileField(
        upload_to='medical_licences', blank=True, null=True)
    is_available = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Pharmacy Worker"

    def save(self, *args, **kwargs):
        self.validate_unique()
        if self.medical_license is None and self.role is None:
            self.role = "Assistant"
        else:
            self.role = "Pharmacist"
        super(PharmacyWorker, self).save(*args, **kwargs)
