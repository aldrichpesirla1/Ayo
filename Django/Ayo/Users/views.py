from django.shortcuts import render
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

from .serializers import PharmacyWorkerSerializer, UserSerializer
from .models import User, PharmacyWorker
from .authentication import generate_access_token

# Create your views here.


@api_view(['POST'])
def register(request):
    data = request.data
    new_data = data.copy()

    if(data['password'] != data['password_confirm']):
        raise exceptions.APIException('Passwords do not match')

    if data['role'] == 'Pharmacy Worker':
        opened_img = urlretrieve(data['medical_license'])
        img = Image.open(opened_img[0])
        img_io = BytesIO()
        img.save(img_io, format='PNG')
        img_file = InMemoryUploadedFile(
            img_io, None, data['username']+'license.png', 'images/png', sys.getsizeof(img_io), None)
        new_data['medical_license'] = img_file

        serializer = PharmacyWorkerSerializer(data=new_data)

    elif data['role'] == 'Owner':
        opened_img = urlretrieve(data['valid_id1'])
        img = Image.open(opened_img[0])
        img_io = BytesIO()
        img.save(img_io, format='PNG')
        img_file = InMemoryUploadedFile(
            img_io, None, data['username']+'id1.png', 'images/png', sys.getsizeof(img_io), None)
        new_data['medical_license'] = img_file

        serializer = UserSerializer(data=new_data)
    elif data['role'] == 'Customer':
        opened_img = urlretrieve(data['business_permit'])
        img = Image.open(opened_img[0])
        img_io = BytesIO()
        img.save(img_io, format='PNG')
        img_file = InMemoryUploadedFile(
            img_io, None, data['username']+'permit.png', 'images/png', sys.getsizeof(img_io), None)
        new_data['medical_license'] = img_file

        serializer = UserSerializer(data=new_data)

    serializer.is_valid(raise_exception=True)
    serializer.save()
    print("finished")

    return Response(serializer.data)


@ api_view(['POST'])
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


@ api_view(['GET'])
def users(request):
    print("In get")
    serializer = UserSerializer(User.objects.all(), many=True)
    return Response(serializer.data)
