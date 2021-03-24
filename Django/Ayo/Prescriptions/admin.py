from django.contrib import admin
from .models import Prescription, MedicineRecord 
# Register your models here.

admin.site.register(Prescription)
admin.site.register(MedicineRecord)
