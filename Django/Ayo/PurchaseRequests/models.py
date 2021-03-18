"""
TODO
continue this
"""

from django.db import models
import uuid

from Users.models import User

# Create your models here.
class PurchaseRequest(models.Model):
      id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
      requester = models.ForeignKey(User, on_delete=models.CASCADE)