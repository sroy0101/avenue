from django.views.generic import DetailView, ListView

from product.models import Product


class StoreView(ListView):
    model = Product
    context_object_name = "product_list"
    template_name = "store.html"


class StoreDetailView(DetailView):
    model = Product
    context_object_name = "product"
    template_name: str = "store_detail.html"
