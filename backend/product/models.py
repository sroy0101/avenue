"""All models related to product."""
import os
import uuid

from django.db import models


class Gender(models.TextChoices):
    MALE = "M"
    FEMALE = "F"
    UNISEX = "U"


class Product(models.Model):
    sku = models.CharField(max_length=12)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    name = models.CharField(max_length=255)
    description = models.TextField()
    active = models.BooleanField(default=False)
    shipment_time = models.CharField(max_length=255)
    inventory = models.IntegerField(default=0)
    gender = models.CharField(
        max_length=1, choices=Gender.choices, default=Gender.UNISEX
    )

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    def get_file_path(self, filename):
        name = filename.split(".")[0]
        ext = filename.split(".")[-1]
        filename = f"{name}_{uuid.uuid4()}.{ext}"
        return os.path.join("images", filename)

    name = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_file_path, null=False)
    default = models.BooleanField(default=False)
