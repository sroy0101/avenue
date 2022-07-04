import random
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
    template_name: str = "store_detail.html"
    context_object_name = "product"

    def get_context_data(self, **kwargs):
        context = super(StoreDetailView, self).get_context_data(**kwargs)
        optimizely_client = self.request.optimizely_client
        # user_session_id = self.request.session._get_or_create_session_key()
        # ** FOR TESTING ** Use random number to simulate different user-session_id to see if it randomply enabling and disabling the feature.
        user_session_id = str(random.randint(1000, 5000))
        feature_enabled = False
        if optimizely_client and optimizely_client.is_valid:
            user_context = optimizely_client.create_user_context(
                user_session_id, attributes=None
            )
            feature_enabled = user_context.decide("button_color_green").enabled

        context["button_color_green_enabled"] = feature_enabled
        return context


class CartView(TemplateView):
    """Override the base get_data_context() to add the cart and cart items to the context.

    A templateview renders a given template with the context containing the
    parameters captured in the url (i.e the request).
    """

    template_name: str = "cart.html"

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context["cart"] = self.request.cart
        context["cart_items"] = CartItem.objects.filter(cart=self.request.cart)
        return context


class AddToCartView(View):
    """Add user selected product to cart.

    If the product is already in the cart increments the count.
    Returns the Http redirect response to the cart.
    """

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
    """Return rendering of checkout success or failure page.

    Return success page if user is authenticated, and the shipping address,
    billing address and the credit card information is available. Otherwise,
    returns the checkout failure page.

    If the user is not authenticated, the LoginRequiredMixin displays the
    login page and returns here after successful login.

    """

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
            # Show checkout error. -- Future: show a form to collect the missing customer data.
            return render(request, "checkout_failure.html")
