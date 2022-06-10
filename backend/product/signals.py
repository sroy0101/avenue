from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from wand.image import Image as WandImage

from config.settings import IMAGE_SIZES

from .models import ProductImage


@receiver(post_save, sender=ProductImage)
def image_uploaded(sender, instance, *args, **kwargs):
    loc = instance.image.path
    extension = loc.split(".")[-1]
    with WandImage(filename=loc) as img:
        for name, (width, height) in IMAGE_SIZES.items():
            new_image = resize_image(img, width, height)
            dest = f"{loc.split('.')[0]}_{name}.{extension}"
            new_image.save(filename=dest)


def resize_image(image: WandImage, width: int, height: int) -> WandImage:
    # Get the scaling ratios
    current_width, current_height = image.size
    width_scale = width / current_width
    height_scale = height / current_height

    # Scale the image by the bigger ratio
    img = image.clone()
    bigger_scale = width_scale if width_scale >= height_scale else height_scale
    resize_width = int(current_width * bigger_scale)
    resize_height = int(current_height * bigger_scale)
    img.resize(resize_width, resize_height)

    # Crop the image
    img.crop(width=width, height=height, gravity="center")

    return img


@receiver(post_delete, sender=ProductImage)
def image_deleted(sender, instance, *args, **kwargs):
    # ToDo Delete the Image files from the media store
    pass
