from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField(max_length=64)
    email = models.EmailField()
    billingAddress = models.TextField(null=True, blank=True)
    ccDetails = models.CharField(max_length=64, null=True, blank=True)
    shippingAddress = models.TextField(null=True, blank=True)