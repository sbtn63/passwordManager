from django.db import models

from accounts.models import User

# Create your models here.

class App(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    password = models.CharField(max_length=300)
    user = models.ForeignKey(User, verbose_name="apps_user", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
