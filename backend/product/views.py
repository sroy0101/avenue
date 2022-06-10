from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, parsers, permissions, viewsets

from .models import Product, ProductImage
from .serializers import ProductImageSerializer, ProductSerializer


class IsMerchandiser(permissions.BasePermission):
    """
    Only allow access to users who belong to the `Merchandiser` group
    """

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_active
            and request.user.groups.filter(name="Merchandiser").exists()
        )


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = (IsMerchandiser,)


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
    permission_classes = (IsMerchandiser,)
