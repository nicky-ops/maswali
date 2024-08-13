# maswali

## API Endpoints
1. `GET /api/user/` - list all users
2. `GET /api/users/user_pk/` - retrive a specific user
3. `PATCH /api/users/user_pk/` - modify a user
4. `POST /api/auth/register/`
body:
```
    {
    "username": "mouse21", "first_name": "Mickey", "last_name": "Mouse", "password": "12345678", "email": "mouse@yopmail.com"
    }
```
5. `POST /api/auth/login/`
body:
```
    {
    "password": "12345678", "email": "mouse@yopmail.com"
    }
```
6. `POST /api/auth/refresh/` - getting a new access token to maintain a session.
body:
```
    {
        "refresh": refresh_token
    }
```
7. `POST /api/auth/logout/` - logout and delete refresh token
body:
```
    {
        "refresh": refresh_token
    }
```