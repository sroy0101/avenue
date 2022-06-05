from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('name', 'email', 'shippingAddress', 'billingAddress', 'ccDetails')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model= CustomUser
        fields = UserChangeForm.Meta.fields

