from optimizely import optimizely

from .models import Cart


class CartMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        """Create a cart for the user if one doesn't exist and add to the request

        The request is used by the CartView to create the context for the template.
        """
        session_key = request.session._get_or_create_session_key()

        # Is there already a cart for this user?
        user = request.user
        cart = None
        if user and user.is_authenticated:
            search = Cart.objects.filter(user=user)
            if search.count() > 0:
                cart = search.first()
        else:
            search = Cart.objects.filter(session_key=session_key)
            if search.count() > 0:
                cart = search.first()

        # If no existing cart, create it
        if not cart:
            user_to_register = user if user.is_authenticated else None
            cart = Cart.objects.create(user=user_to_register, session_key=session_key)

        # Set cart ID and cart on session
        request.session["cart"] = cart.id
        request.cart = cart

        response = self.get_response(request)
        return response


class OptimizelyMiddleware:
    """Create the optimizely client"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = request.user
        request.optimizely_client = None
        # Add your SDK key here
        optimizely_sdk_key = ""
        try:
            if optimizely_sdk_key:
                request.optimizely_client = optimizely.Optimizely(
                    sdk_key=optimizely_sdk_key
                )
        except:
            print("source app - optimizely sdk not initialized.")

        response = self.get_response(request)

        return response
