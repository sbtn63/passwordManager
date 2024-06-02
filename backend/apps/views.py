from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404

from .models import App
from .serializers import AppCreateSerializer, AppSerializer, AppUpdateSerializer
from accounts.utils import encrypt_password_for_user, key, decrypt_password_for_user


class CreateAppView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = AppCreateSerializer(data=request.data)
    
        if serializer.is_valid():
            app = serializer.save(user=request.user)
            
            encryption_key = key(request.user.encrypted_key)
            app.password = encrypt_password_for_user(app.password, encryption_key)
            
            app.save()
        
            return Response({"app": AppSerializer(app).data}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        apps = App.objects.filter(user=request.user)
        serializer = AppSerializer(apps, many=True)
    
        return Response(serializer.data, status=status.HTTP_200_OK)

class AppUpdateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk, *args, **kwargs):
        app = get_object_or_404(App, pk=pk, user=request.user)
        
        serializer = AppUpdateSerializer(app, data=request.data)
        if serializer.is_valid():
            app = serializer.save(user=request.user)
            
            encryption_key = key(request.user.encrypted_key)
            app.password = encrypt_password_for_user(app.password, encryption_key)
            
            app.save()
            return Response({"app": AppSerializer(app).data}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DescryptAppView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, *args, **kwargs):
        encryption_key = key(request.user.encrypted_key)
    
        app = get_object_or_404(App, pk=pk, user=request.user)
        descrypt_password = decrypt_password_for_user(app.password, encryption_key)
        app.password = descrypt_password
        
        return Response({'app' : AppSerializer(app).data}, status=status.HTTP_200_OK)

class AppDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk, *args, **kwargs):
        app = get_object_or_404(App, pk=pk, user=request.user)
        app.delete()
        
        return Response({"message": "App deleted"}, status=status.HTTP_204_NO_CONTENT)