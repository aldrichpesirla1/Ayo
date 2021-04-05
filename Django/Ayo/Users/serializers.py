from rest_framework import serializers

from .models import User, PharmacyWorker, Owner, Customer
from django.conf import settings
import urllib


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'contact_number', 'address', 'password']

        extra_kwargs = {
            # does not show password on read operations
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        try:
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
            instance.save()
            return instance
        except e:
            print(e)


class PharmacyWorkerSerializer(UserSerializer):
    class Meta:
        model = PharmacyWorker
        fields = ['name', 'contact_number', 'username',
                  'address', 'password', 'medical_license']

class CustomerSerializer(UserSerializer):
    class Meta:
        model = Customer 
        fields = ['name', 'contact_number', 'username',
                  'address', 'password', 'valid_id1']

class OwnerSerializer(UserSerializer):
    class Meta:
        model = Owner 
        fields = ['name', 'contact_number', 'username',
                  'address', 'password', 'business_permit']

class CustomerViewSerializer(UserSerializer):
    valid_id1= serializers.SerializerMethodField('get_valid_id1_url')
    
    def get_valid_id1_url(self, obj):
        preurl = settings.MEDIA_URL + obj['valid_id1']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Customer 
        fields = ['name', 'contact_number', 'username',
                  'address', 'valid_id1']

class PharmacyWorkerViewSerializer(UserSerializer):
    medical_license = serializers.SerializerMethodField('get_valid_id1_url')
    
    def get_valid_id1_url(self, obj):
        preurl = settings.MEDIA_URL + obj['valid_id1']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = PharmacyWorker 
        fields = ['name', 'contact_number', 'username',
                  'address', 'password', 'medical_license']

class OwnerViewSerializer(UserSerializer):
    business_permit = serializers.SerializerMethodField('get_valid_id1_url')
    
    def get_valid_id1_url(self, obj):
        preurl = settings.MEDIA_URL + obj['valid_id1']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Owner 
        fields = ['name', 'contact_number', 'username',
                  'address', 'password', 'business_permit']