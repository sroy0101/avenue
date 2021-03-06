# avenue

**A sample e-commerce application**

This application consists of two projects - `backend` and `fronend`.
The backend is built on [Django](https://docs.djangoproject.com/en/4.0/) and the frontend is built using [React](https://create-react-app.dev/).

<br/>

# Quickstart
**avenue** can be run locally with `docker` and `docker compose`.

The instructions below are for Ubuntu 20.04+ hosts (standalone or running under Windows WSL2). Please clone the repository and run `docker compose` as follows:


```
git clone git@github.com:sroy0101/avenue.git
cd avenue
docker compose up
```

Next, add some seed data -- pre-created users, products and images -- to start testing immediately:

```
# Start bash in the avenue backend container
docker exec -it web bash

# Run the data importer
./bin/seed_db
```

Finally, open `localhost:8000` to see the store with available products.

If the docker compose was run previously, try:
```
#stop the running docker compose
cntrl-c
# remove all prebuilt images
docker compose down --rmi all
# start again with --build
docker compose up --build

# When it is up and running, seed the database as mentioned above.
```

**See all seed data user login credentials at the end of this document.**

<br/>

# Screenshots

<br/>

## Store home page
<img src="./readme_media/avenue_store.png" alt="avenue store">

## Product Listing
<img src="./readme_media/avenue_store_details.png" alt="avenue store details">

## Product Editing
<img src="./readme_media/avenue_product_edit.png" alt="avenue product edit">


# Project Details

## Backend

The `backend` consists of three Django apps:
- `product` - an app to allow merhandizers to crate products and upload product images. It provides the REST api endpoint used by the `frontend`.
- `store` - an app to allow store customers to view the products and add selected products to a cart. The frontend for this app uses Django templates for better SEO.
- `accounts` - an app to create and administer users in Django.

## Frontend

The `frontend` React app consists of three components, bound together the by the App.js module:
- `LoginModal` - for displaying the login form, collecting the username and password.
- `EditModal` - for displaying the product form to create or edit products.
- `EditImageModal` - for displaying the form adding product images.

`App.js`
- Renders the product list along with the product images.
- Contains all the other supporing functions such as making api calls to the backend for login and adding or deleting products or images.


<br/><br/>

# Development Setup
<br/>

## Backend

1. Clone the `avenue` git repo from Github in your project folder.

```
git clone git@github.com:sroy0101/avenue.git
```

2. Create and activate python virtual env.
(Requires [Python 3.7+](https://www.python.org/downloads/) to be already installed on your system.)

```
cd avenue
python -m venv venv
source venv/bin/activate
```

3. Install python packages

```
cd backend
pip install -r requirements.txt

```

4. Install ImageMagic

```
apt-get install libmagickwand-dev
```

5. Run tests

```
./bin/runtests
```

6. Run migration to create the sqlite database (db.sqlite3):

```
python manage.py migrate
```

7. Run backend

```
python manage.py runserver
```

**The backend Django server should now be running**.

Go to `localhost:8000/api/schema/swagger-ui` to see the `Product` and `ProductImage` API schema.

Note: Trying the API from the `swagger-ui` interface requires user authentication (see below for how to create users).

<br/>

## Seed data for a quick start

1. Load the seed data.
```
cd backend
./bin/seed_data
```
2. Login as super-admin on `localhost:8000/admin` to chek the othe user and the list of products.
3. Open `localhost:8000` in web browser to see the users, product list and images.
4. Login via `localhost:3000` in web browser to see product list and images.

**See all seed data user login credentials below. **

<br/>

## Create users and products manually

1. Add a superuser (make sure application is running)
```
cd backend
python manage.py createsuperuser
```

You'll then be prompted to create your username and password
```
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

<br/>

## Frontend

1. Install node packages
```
cd frontend
npm install
```
2. Run the app
```
npm start
```
3. Open `localhost:3000` on the web browser and login as the merchandiser user to add products and images.
<br/>
<br/>

## E2E Testing with Cypress
End-to-end tests are available using [Cypress](https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn).

All the cypress tests are in the cypress folder.

Two types of tests are available - with and without UI.

### Without UI
```
cd frontend
npm run e2e
```

### With UI
Use - `cd frontend; npm run e2e-ui` and then from the opened UI:
1. Select testing type `E2E tests`.
2. Select the web browser, example Chrome or Electron.
3. Select `Specs`from the menus on the left.
4. Select the test to run. To rerun use `r`.
5. The test will login as product manager, add a product, and then add a image to the product.

### Sample screenshot for test with UI
<img src="./readme_media/cypress_e2e_ui.png" alt="E2E Tests">
<br/>
<br/>

### Notes
Detail notes for running cypress in Windows WSL2 environment is provided in the README file in the cypress folder.

## Featre flag and A/B Testing
Use of feature flag using Optimizely Full Stack feature flagging and A/B testing service is added as an example.
The code may be used as a template for controlling other features.

### Feature flag Implementation Steps using Optimizely
- Create Optimizely account and get the SDK key.
- Install the Optimizely python SDK.
```
# From the project root select virtual env
source venv/bin/activate
# Install the optimizely SDk
pip install optimizely-sdk
```
- Select the feature that needs to be controlled in your application.
- Add a feature flag to control the selected feature in Optimizely and setup the Targeted Delivery rule. For example, you can configure the flag to be True for 50% of the users and false for the rest.
In the code here, the feature to change the color of the `Add to Bag` button to green in the `storeDetails` page is controlled by a feature flag `add_to_bag` configured in Optimizely.

- Add the Default Variable for the flag in Optimizely. See Default Variables menu in Optimizely.
- Add the code to the view class for the page where the feature is needed to be controlled.
```
user_context = optimizely_client.create_user_context(user_id)
decision = user_context.decide('Name of the feature flag created in Optimizely')
```
- Use the `decision.enabled` to enable or disable the feature.
In the code here, it is added to the data context to be used by the `store_details.html` template.

#### Note:
In the code here, the session id is used as the `user_id`, because the user is not required to be logged in (hence the no user id) to view the `Add to Bag` button.

#### Development Tip:
To test that the feature flag setting is working as expected, you can use a randomly generated user id to simulate different users and let Optimizely return flag decision to be both enabled and disabled at random.

### A/B Tests using Optimizely
After the feature flag is created to control users' access features, we collect the users' actions in order to analyze the feature efficacy in Optimizely.
In the code here, a tracking event is sent to Optimizely when the `Add to Bucket` button is cliceked.

<br/>
<br/>


## Seed Data Login Details

* Superuser -  `superuser / su@@1234`
* Merchandiser - `product_manager / pypy!1234`
* customer - `customer / pypy!1234`
* customer (with no cc data) - `customer_no_cc / pypy!1234`
<br/>
<br/>

## Future Functionaility

- Moving media files to S3/Cloudfront with the use of Localstack for testing.
- Continuous integration and deployment (CI/CD) pipelines.
- Deployment to K8s.
-