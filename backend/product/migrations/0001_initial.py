# Generated by Django 4.0.5 on 2022-06-05 20:30

import django.db.models.deletion
import product.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("sku", models.CharField(max_length=12)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("active", models.BooleanField(default=False)),
                ("shipment_time", models.CharField(max_length=255)),
                ("inventory", models.IntegerField(default=0)),
                (
                    "gender",
                    models.CharField(
                        choices=[("M", "Male"), ("F", "Female"), ("U", "Unisex")],
                        default="U",
                        max_length=1,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProductImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                (
                    "image",
                    models.ImageField(
                        upload_to=product.models.ProductImage.get_file_path
                    ),
                ),
                ("default", models.BooleanField(default=False)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="product.product",
                    ),
                ),
            ],
        ),
    ]
