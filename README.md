# avenue

### A sample e-commerce application

This application consists of two projects - `backend` and `fronend`.
The backend is built on django and frontend is built using React.

## `backend`
The `backend` consists of three django apps:
- `product` - an app to provide MVC (Model - View - Control) functinality related to products and product images. It also provides the REST api ensdpoint used by the `frontend` to configure products. The product app is used by the product merchandizers.
- `store` - an app to provide MVC functionality related to the store and is for use by the store customers. In order to support SEO functionality for the store web site, the pages are served directly from the app, and therefore it does not provide a REST api.
- `accounts` - an app to create and administer users in django.

## `frontend`
To Be Added.