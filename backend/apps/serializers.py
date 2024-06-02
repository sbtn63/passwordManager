from rest_framework import serializers

from .models import App

class AppSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    class Meta:
        model = App
        fields = ('id', 'name', 'email', 'username', 'password', 'user_id')

class AppCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = ('id', 'name', 'email', 'username', 'password')


class AppUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = ('id', 'name', 'email', 'username', 'password')

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            if value is not None:
                if field in instance.__dict__:
                    setattr(instance, field, value)
        instance.save()
        return instance
