from rest_framework import serializers

from .models import *
from django.conf import settings
import urllib


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'in_stock', 'product_img']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.in_stock = validated_data.get(
            'in_stock', instance.in_stock)
        instance.product_img = validated_data.get(
            'product_img', instance.product_img)
        instance.save()
        return instance


class ProductViewSerializer(ProductSerializer):
    product_img = serializers.SerializerMethodField('get_url')

    def get_url(self, obj):
        preurl = settings.MEDIA_URL + obj['product_img']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Product
        fields = ['name', 'description', 'price',
                  'in_stock', 'product_img', 'id']
