from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, parsers, viewsets

from .models import Product, ProductImage
from .serializers import ProductImageSerializer, ProductSerializer


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductImageView(viewsets.ModelViewSet):
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.all()
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["id", "product"]
    search_fields = ["=name", "product"]
    ordering_fields = ["name", "id"]
    ordering = ["id"]
