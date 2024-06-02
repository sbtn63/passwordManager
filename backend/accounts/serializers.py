from rest_framework import serializers

from .models import User 
from .utils import create_user_with_encryption_key

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'encrypted_key')

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'confirm_password')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        validated_data.pop('confirm_password', None)
        
        user = create_user_with_encryption_key(email, password)

        return user

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("password not match.")
        return data