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