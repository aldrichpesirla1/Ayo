from django.contrib import admin

from .models import PrescriptionRequest, OrderRequest, PrescriptionItem, OrderItem, PaymentSlip
# Register your models here.

admin.site.register(PrescriptionRequest)
admin.site.register(OrderRequest)
admin.site.register(PrescriptionItem)
admin.site.register(OrderItem)
admin.site.register(PaymentSlip)