from rest_framework import serializers

from .models import User

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