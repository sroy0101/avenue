from typing import Any, Dict

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import DetailView, ListView, TemplateView, View

from product.models import Product
from store.models import CartItem


class StoreView(ListView):
    model = Product
    context_object_name = "product_list"
    template_name = "store.html"


class StoreDetailView(DetailView):
    model = Product
    context_object_name = "product"
    template_name: str = "store_detail.html"


class CartView(TemplateView):
    template_name: str = "cart.html"

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["cart"] = self.request.cart
        context["cart_items"] = CartItem.objects.filter(cart=self.request.cart)
        return context


class AddToCartView(View):
    def get(self, request, product_id):
        product = Product.objects.filter(id=product_id).first()
        if product:
            cart = request.cart
            cart_items = CartItem.objects.filter(cart=cart)
            already_there = next(
                (x for x in cart_items if x.product.id == product.id), None
            )
            if already_there:
                already_there.count = already_there.count + 1
                already_there.save()
            else:
                CartItem.objects.create(cart=cart, product=product)
        return HttpResponseRedirect(reverse("cart"))


class CheckoutView(LoginRequiredMixin, View):
    def get(self, request):
        if (
            request.user.is_authenticated
            and request.user.billingAddress
            and len(request.user.billingAddress.strip()) > 0
            and request.user.shippingAddress
            and len(request.user.shippingAddress) > 0
            and request.user.ccDetails
            and len(request.user.ccDetails) > 0
        ):
            # TODO -- actually create a purchase order
            request.cart.delete()
            return render(request, "checkout_success.html")
            pass
        else:
            # Show checkout error
            return render(request, "checkout_failure.html")
