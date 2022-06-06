# avenue

### A sample e-commerce application

This application consists of two projects - `backend` and `fronend`.
The backend is built on django and the frontend is built using React.

## `backend`
The `backend` consists of three django apps:
- `product` - an app to allow merhandizers to crate products and upload product images. It provides the REST api ensdpoint used by the `frontend`.
- `store` - an app to allow store customers to view the products and add selected products to a cart. The frontend for this app uses django templates for better SEO.
- `accounts` - an app to create and administer users in django.

## `frontend`
To Be Added.


## Development setup
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

3. Add this to your .bashrc or .profile file and open a new terminal
```
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/shims:$PATH"
if command -v pyenv 1>/dev/null 2>&1; then
                eval "$(pyenv init -)"
fi
```

4. Run tests
```
cd backend
./bin/runtests
```

5. Run docker
```
docker compose up
```

The application should be running.
Open web browser on `localhost:8000/api/schema/swagger-ui` to see the product and product image api schema. Since trying the API from `swagger-ui` requires user authentication, see below for creating  users.

## Create Users

1. Add a superuser (make sure application is running)
```
cd backend
python manage.py createsuperuser

... then follow the prompts.
```
2. Open `localhost:8000/admin` on your browser and login as superuser.
3. Create new users using admin UI.

TODO - Add More Details




