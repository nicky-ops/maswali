![Alt Text](/unnamed.png)
# maswali

## API Endpoints
1. `GET /api/users/` - list all users
2. `GET /api/users/user_pk/` - retrive a specific user by id
3. `PATCH /api/users/user_pk/` - modify a user
body:
```
    {
        "username": "John Doe"
    }
```

4. `POST /api/auth/register/` - user registration
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

8. `GET /api/quiz/categories/` - retrive all quiz categories
Auth:
- Bearer token ( pass access token)

9. `GET /api/quiz/categories/<category_id>/` - retrive category by id
Auth:
- Bearer token ( pass access token)

10. `GET /api/quiz/quizzes/` - retrive all questions
body:
Auth:
- Bearer token ( pass access token)

11. `GET /api/quiz/quizzes/<quiz_id>/` - retrive question by its id
Auth:
- Bearer token ( pass access token)

12. `POST /api/quiz/quizzes/<quiz_id>/submit/` - submit quiz
body:
```
    {
	"id": quiz_id,
	"user": "user_email",
	"quiz": "quiz_title",
	"score": quiz_score,
	"start_time": "2024-08-24T10:55:25.602927Z",
	"end_time": "2024-08-24T10:55:25.606976Z",
	"user_answers": []
}
```
Auth:
- Bearer token ( pass access token)

13. `api/quiz/leaderboard/` - show leaderboard
Auth:
- Bearer token ( pass access token)

14. `api/quiz/attempts/` - show quiz attempts
Auth:
- Bearer token ( pass access token)

15. `api/quiz/attempts/<quiz_id>/` - retrive attempt by question id
Auth:
- Bearer token ( pass access token)


