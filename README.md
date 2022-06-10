# avenue

### A sample e-commerce application

This application consists of two projects - `backend` and `fronend`.
The backend is built on [django](https://docs.djangoproject.com/en/4.0/) and the frontend is built using [React](https://create-react-app.dev/).

## Try avenue
**avenue** is packaged as a docker container. To run it locally, please clone the repository and run docker-compose as follows:
```
git clone git@github.com:sroy0101/avenue.git
cd avenue
docker compose up
```
Then add some pre-created users, products and images to start testing immediately as follows:
```
sudo docker exec -it avenue_web bash
Then in the bash terminal run:
./bin/seed_db
```
Open `localhost:8000` to see the store with products and images.

[store image]

<img src="" alt="avanue store">

[Product and product images]

<br/><br/>
# Project Details

### Backend
The `backend` consists of three django apps:
- `product` - an app to allow merhandizers to crate products and upload product images. It provides the REST api ensdpoint used by the `frontend`.
- `store` - an app to allow store customers to view the products and add selected products to a cart. The frontend for this app uses django templates for better SEO.
- `accounts` - an app to create and administer users in django.

### Frontend
The `frontend` react app consists of three components, bound together the by the App.js module:
- `LoginModal` - for displaying the login form, collecting the username and password.
- `EditModal` - for displaying the product form to create or edit products.
- `EditImageModal` - for displaying the form adding product images.

The `App.js`
- Renders the prodcut list along with the product image.
- Contains all the other supporing functions such as making api calls to the backend for login and adding products or images.


<br/><br/>
# Development Setup

### Backend
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

4. Install python packages
```
cd backend
pip install -r requirements.txt
```
5. Install ImageMagic
```
apt-get install libmagickwand-dev
```
6. Run tests
```
./bin/runtests
```
7. Run migration to create the sqlite database (db.sqlite3):
```
python manage.py migrate
```
8. Run backend
```
./manage.py runserver
```

**The backend should now be running**.

Open web browser on `localhost:8000/api/schema/swagger-ui` to see the product and product image api schema. Since trying the API from `swagger-ui` requires user authentication, see below for creating  users.

### Jump start user and product configuration
1. Load the seed data.
```
cd backend
./bin/seed_data
```
2. Login as super-admin on `localhost:8000/admin` to chek the othe user and the list of products.
```
Username: `superadmin` / Password: `sup@@@123`
```
3. Open `localhost:8000` in web browser to see the users, product list and images.
4. Login via `localhost:3000` in web browser to see product list and images.

### Create users and products manually
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
2. Open `localhost:8000/admin` on the web browser and login as superuser.
3. Create new users using admin UI.
   - Add a user and assign the user to a group called `Merchandiser`.
   - Add another user as a customer who will make purchases at the store.
4. Open `localhost:8000/api/schema/swagger-ui` to see the list of API's.
5. Open `localhost:8000` to see available products.

### Frontend

1. Install node packages
```
cd frontend
npm install
```
2. Run the app
```
npm start
```
3. Open `localhost:3000` on the web browser and login as product manager to add products and images.

