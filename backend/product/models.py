"""All models related to product."""
import os
import uuid

from django.db import models
from django.urls import reverse


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

    def get_absolute_url(self):
        return reverse("store_detail", args=[str(self.id)])

    def images(self):
        return ProductImage.objects.filter(product=self)

    def cover(self):
        images = self.images().all()
        cover = next((x for x in images if x.default), None)
        if not cover and len(images) > 0:
            cover = images[0]
        return cover

    def pretty_gender(self):
        gender_map = {"M": "Men", "F": "Women", "U": "Everyone"}
        return gender_map[self.gender]


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

    def __get_image_url__(self, size: str):
        og = self.image.url
        parts = og.split(".")
        extension = parts[-1]
        first = ".".join(parts[0 : len(parts) - 1])
        return first + f"_{size}." + extension

    def get_small_image_url(self):
        return self.__get_image_url__("small")

    def get_medium_image_url(self):
        return self.__get_image_url__("medium")

    def get_large_image_url(self):
        return self.__get_image_url__("large")
