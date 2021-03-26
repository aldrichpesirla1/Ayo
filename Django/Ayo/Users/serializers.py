from rest_framework import serializers

from .models import User, PharmacyWorker
import urllib

class UserSerializer(serializers.ModelSerializer):
      class Meta:
            model=User
            fields= ['name', 'contact_number', 'address', 'password']

            extra_kwargs = {
                  # does not show password on read operations
                  'password': {'write_only': True}
            } 
      
      def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                  instance.set_password(password)
            instance.save()
            return instance


class PharmacyWorkerSerializer(serializers.ModelSerializer):
      class Meta:
            model=PharmacyWorker
            fields= ['name', 'contact_number', 'address', 'password', 'medical_license']

            extra_kwargs = {
                  # does not show password on read operations
                  'password': {'write_only': True}
            } 
      
      def create(self, validated_data):
            print("IN VALIDATED DATA")
            print(type(validated_data['medical_license']))
            # photo = urllib.parse.quote(validated_data.pop('medical_license'))
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                  instance.set_password(password)
            instance.save()
            return instance