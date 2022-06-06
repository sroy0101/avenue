from django.test import TestCase

from .models import Product, ProductImage


class productTest(TestCase):
    def test_create_product(self):
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
        self.assertEqual(product.sku, "12345")
        self.assertEqual(product.price, 125.99)
        self.assertEqual(product.name, "Nike Air")
        self.assertEqual(product.description, "Nike Air")
        self.assertEqual(product.shipment_time, "1/3/2023")
        self.assertEqual(product.inventory, 21)
        self.assertEqual(product.active, True)

    def test_create_productImage(self):
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
        product_image = ProductImage.objects.create(
            name="Nike Air", product=product, image="imagefile.jpg", default=False
        )
        self.assertEqual(product_image.name, "Nike Air")
        self.assertEqual(product_image.product.name, "Nike Air")
        self.assertEqual(product_image.image.name, "imagefile.jpg")
        self.assertEqual(product_image.default, False)

    def test_get_file_path_has_uuid(self):
        product_image = ProductImage()
        file_path = product_image.get_file_path("imagefile.jpg")
        # check the uuid was added
        self.assertEqual(len(file_path.split("/")[1].split(".")[0].split("_")[1]), 36)
