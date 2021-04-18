from django.urls import path

from .views import *

urlpatterns = [
    path('products', products),
    path('addproduct', NewProduct.as_view()),
    path('deleteproduct', DeletedProduct.as_view()),
    path('editproduct', ChangedProduct.as_view())
    path('deleteproductlist', DeletedProductList.as_view())
]
