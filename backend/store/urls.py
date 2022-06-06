from django.urls import path

from .views import StoreDetailView, StoreView

urlpatterns = [
    path("", StoreView.as_view(), name="store"),
    path("<int:pk>", StoreDetailView.as_view(), name="store_detail"),
]
