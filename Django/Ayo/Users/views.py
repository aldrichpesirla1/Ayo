from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import exceptions 

from .serializers import UserSerializer
from .models import User
from .authentication import generate_access_token

# Create your views here.
@api_view(['POST'])
def register(request):
      data = request.data

      if(data['password'] != data['password_confirm']):
            raise exceptions.APIException('Passwords do not match')

      serializer = UserSerializer(data=data)
      serializer.is_valid(raise_exception=True)
      serializer.save()

      return Response(serializer.data)

@api_view(['POST'])
def login(request):
      number = request.data.get('contact_number')
      password = request.data.get('password')

      # used filter as to check if user exists
      user = User.objects.filter(contact_number=number).first()

      if user is None:
            raise exceptions.AuthenticationFailed("User not found")

      if not user.check_password(password):
            raise exceptions.AuthenticationFailed("Password is incorrect")
      
      response = Response()
      token = generate_access_token(user)
      response.set_cookie(key='jwt', value=token, httponly=True)
      response.data = {
            'jwt': token
      }
      return response 

@api_view(['GET'])
def users(request):
      print("In get")
      serializer = UserSerializer(User.objects.all(), many=True) 
      return Response(serializer.data)