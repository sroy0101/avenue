# avenue

### A sample e-commerce application

This application consists of two projects - `backend` and `fronend`.
The backend is built on [django](https://docs.djangoproject.com/en/4.0/) and the frontend is built using [React](https://create-react-app.dev/).

## Try avenue
**avenue** is packaged as a docker app. To run it locally, please clone the repository and run docker-compose.
```
git clone git@github.com:sroy0101/avenue.git
cd avenue
docker compose up
```
Then add some pre-created users and products to start testing immediately as follows:
```
sudo docker run -it avenue_web bash
Then in the bash terminal run:
./bin/seed_

```



## Project Details

## `backend`
The `backend` consists of three django apps:
- `product` - an app to allow merhandizers to crate products and upload product images. It provides the REST api ensdpoint used by the `frontend`.
- `store` - an app to allow store customers to view the products and add selected products to a cart. The frontend for this app uses django templates for better SEO.
- `accounts` - an app to create and administer users in django.

## `frontend`
The `frontend` react app consists of three components, bound together the by the App.js module:
- `LoginModal` - for displaying the login form, collecting the username and password.
- `EditModal` - for displaying the product form to create or edit products.
- `EditImageModal` - for displaying the form adding product images.

The `App.js`
- Renders the prodcut list along with the product image.
- Contains all the other supporing functions such as making api calls to the backend for login and adding products or images.



## Development Setup

### backend
1. Clone the `avenue` git repo from Github in your project folder.
```
git clone git@github.com:sroy0101/avenue.git
```

2. Create and activate python virtual env
```
cd avenue
python -m venv venv
source venv/bin/activate
```

3. Add this to your .bashrc or .profile file and open a new terminal (For Mac or Linux)
```
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/shims:$PATH"
if command -v pyenv 1>/dev/null 2>&1; then
                eval "$(pyenv init -)"
fi
```

5. Install python packages
```
cd backend
pip install -r requirements.txt
```

4. Run tests
```
./bin/runtests
```

5. Run backend manually
```
./manage.py runserver
```

The application should be running.

Open web browser on `localhost:8000/api/schema/swagger-ui` to see the product and product image api schema. Since trying the API from `swagger-ui` requires user authentication, see below for creating  users.

### Create Users

1. Add a superuser (make sure application is running)
```
cd backend
python manage.py createsuperuser
... then follow the prompts.
Username: <superuser name>
Email address: XXX@example.com
Password:
Password (again):
Superuser created successfully.
```
2. Open `localhost:8000/admin` on your browser and login as superuser.
3. Create new users using admin UI.

TODO - Add More Details


### frontend

1. Install node packages
```
cd frontend
npm install
```
2.


