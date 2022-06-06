from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser

# Register your models here.


class CustomUserAdmin(UserAdmin):
    # add_form = CustomUserCreationForm
    # form = CustomUserChangeForm
    # model = CustomUser

    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (  # new fieldset added on to the bottom
            "Custom Field Heading",
            {
                "fields": ("shippingAddress", "billingAddress", "ccDetails"),
            },
        ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
