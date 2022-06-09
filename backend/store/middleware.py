from .models import Cart

"""
Create a cart for the user.


"""


class CartMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        session_key = request.session._get_or_create_session_key()

        # Is there already a cart for this user?
        user = request.user
        cart = None
        if user and user.is_authenticated:
            search = Cart.objects.filter(user=user)
            if search.count() > 0:
                cart = search.first()
            print("User is authenticated")
        else:
            search = Cart.objects.filter(session_key=session_key)
            if search.count() > 0:
                cart = search.first()
            print(f"No User. Session: {session_key}")
            print(cart)

        # If no existing cart, create it
        if not cart:
            print(f"Creating a new cart for session_key {session_key}")
            user_to_register = user if user.is_authenticated else None
            cart = Cart.objects.create(user=user_to_register, session_key=session_key)

        # Set cart ID and cart on session
        request.session["cart"] = cart.id
        print(f"Cart ID: {cart.id}")
        request.cart = cart

        response = self.get_response(request)
        return response