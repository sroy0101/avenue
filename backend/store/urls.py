from django.urls import path

from .views import AddToCartView, CartView, CheckoutView, StoreDetailView, StoreView

urlpatterns = [
    path("cart", CartView.as_view(), name="cart"),
    path("cart/add/<int:product_id>", AddToCartView.as_view(), name="add_to_cart"),
    path("checkout", CheckoutView.as_view(), name="checkout"),
    path("", StoreView.as_view(), name="store"),
    path("<int:pk>", StoreDetailView.as_view(), name="store_detail"),
]
