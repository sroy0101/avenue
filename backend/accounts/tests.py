from django.contrib.auth import get_user_model
from django.test import TestCase

class customUserTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="white",
            email="white.walkers@email.com",
            password="justpass",
            shippingAddress="50 Main Road, New City, AL 22334",
            billingAddress="5678 Back Road, Twin City, AL 22334",
            ccDetails="1234567890;John Armstrong;11/30;1122"
        )
        self.assertEqual(user.username, "white")
        self.assertEqual(user.email, "white.walkers@email.com")
        self.assertEqual(user.shippingAddress, "50 Main Road, New City, AL 22334")
        self.assertEqual(user.billingAddress, "5678 Back Road, Twin City, AL 22334")
        self.assertEqual(user.ccDetails, "1234567890;John Armstrong;11/30;1122")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)


    def test_create_superuser(self):
        User = get_user_model()
        user = User.objects.create_superuser(
            username="white",
            email="white.walkers@email.com",
            password="justpass"
        )
        self.assertEqual(user.username, "white")
        self.assertEqual(user.email, "white.walkers@email.com")
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

