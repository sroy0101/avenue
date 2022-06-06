from rest_framework import serializers

from .models import Product, ProductImage


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "sku",
            "price",
            "name",
            "description",
            "active",
            "shipment_time",
            "inventory",
            "gender",
        )


class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=True)

    class Meta:
        model = ProductImage
        fields = ("id", "name", "product", "image", "default")
