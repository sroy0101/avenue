from django.contrib import admin

from .models import Product, ProductImage


class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "sku",
        "price",
    )


admin.site.register(Product, ProductAdmin)


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("name", "product", "image", "default")


admin.site.register(ProductImage, ProductImageAdmin)
