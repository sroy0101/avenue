from django.test import TestCase
from django.urls import reverse
from product.models import Product


class StorePageTests(TestCase):
    def setUp(self):
        url = reverse("store")
        self.response = self.client.get(url)

    def test_store_template(self):
        self.assertEqual(self.response.status_code, 200)
        self.assertTemplateUsed(self.response, "store.html")
        self.assertContains(self.response, "Product List")


class StoreDetailPageTests(TestCase):
    def setUp(self):
        product = Product.objects.create(
            sku="12345",
            price=125.99,
            name="Nike Air",
            description="Nike Air",
            shipment_time="1/3/2023",
            inventory=21,
            gender="M",
            active=True,
        )
        url = product.get_absolute_url()
        self.response = self.client.get(url)

    def test_store_detail_template(self):
        self.assertEqual(self.response.status_code, 200)
        self.assertTemplateUsed(self.response, "store_detail.html")
        self.assertContains(self.response, "Nike Air")
