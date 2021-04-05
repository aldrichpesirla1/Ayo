"""
TODO:
- reconfigure api for possible roles
"""


from django.shortcuts import render
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

from .serializers import PharmacyWorkerSerializer, UserSerializer, OwnerSerializer, CustomerSerializer, CustomerViewSerializer, PharmacyWorkerViewSerializer, OwnerViewSerializer
from .models import User, PharmacyWorker, Customer
from .authentication import generate_access_token, JWTAuthentication


# Create your views here.

# helper function to convert uri from RN to django-file for storage

def uri_to_img(role, uri, username):
    opened_img = urlretrieve(uri)
    img = Image.open(opened_img[0])
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    imgtype = "id1" if role == "Customer" else "permit" if role == "Owner" else "license"
    img_file = InMemoryUploadedFile(
        img_io, None, username + imgtype + '.png', 'images/png', sys.getsizeof(img_io), None)
    return img_file


@api_view(['POST'])
def register(request):
    data = request.data
    new_data = data.copy()

    if(data['password'] != data['password_confirm']):
        raise exceptions.APIException('Passwords do not match')

    if data['role'] == 'Pharmacy Worker':
        new_data['medical_license'] = uri_to_img(data['role'],
                                                 data['medical_license'], data['username'])
        serializer = PharmacyWorkerSerializer(data=new_data)

    elif data['role'] == 'Owner':
        new_data['business_permit'] = uri_to_img(data['role'],
                                                 data['business_permit'], data['username'])
        serializer = OwnerSerializer(data=new_data)

    elif data['role'] == 'Customer':
        new_data['valid_id1'] = uri_to_img(data['role'],
                                           data['valid_id1'], data['username'])
        print("CUSTOMER VRO")
        serializer = CustomerSerializer(data=new_data)

    serializer.is_valid(raise_exception=True)
    serializer.save()

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

class AuthenticatedOwner(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = None
        if isinstance(request.user, Customer):
            val = Customer.objects.filter(id=request.user.id).values()[0]
            serializer = CustomerViewSerializer(val, context={'request' : request})
        elif isinstance(request.user, Owner):
            val = PharmacyWorker.objects.filter(id=request.user.id).values()[0]
            serializer = PharmacyWorkerViewSerializer(val, context={'request' : request})
        elif isinstance(request.user, PharmacyWorker):
            val = Owner.objects.filter(id=request.user.id).values()[0]
            serializer = OwnerViewSerializer(request.user, context={'request' : request})

        return Response({
            'data': serializer.data
        })

@ api_view(['GET'])
def users(request):
    print("In get")
    serializer = UserSerializer(User.objects.all(), many=True)
    return Response(serializer.data)

@ api_view(['GET'])
def unverifiedcustomers(request):
    unverified = Customer.objects.filter(is_verified=False).values();
    serializer = CustomerViewSerializer(unverified, many=True, context={'request': request})
    return Response(serializer.data)

@ api_view(['PATCH'])
def approve_customer(request):
    customer = Customer.objects.get(username=request.data['username']);
    customer.approve()
    return Response("Successful")

@ api_view(['PATCH'])
def reject_customer(request):
    customer = Customer.objects.get(username=request.data['username']);
    customer.reject()
    return Response("Successful")