# Add your model here
import functools

from django.db import models

from accounts.models import CustomUser
from product.models import Product


class Cart(models.Model):
    session_key = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.CASCADE)

    def number_of_items(self):
        items = CartItem.objects.filter(cart=self)
        count = (
            functools.reduce(lambda a, b: a + b, [x.count for x in items])
            if items.count() > 0
            else 0
        )
        return count

    def total(self):
        items = CartItem.objects.filter(cart=self)
        total = (
            functools.reduce(
                lambda a, b: a + b, [x.count * x.product.price for x in items]
            )
            if items.count() > 0
            else 0
        )
        return total


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, null=False, on_delete=models.CASCADE)
    count = models.IntegerField(default=1, null=False)

    def subtotal(self):
        return self.count * self.product.price
