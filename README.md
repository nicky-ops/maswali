<img src="/logo.png" style="width:100%;">

# Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Running the Application](#running-the-application)
    - [Interacting with the App](#interacting-with-the-app)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Quizzes](#quizzes)
- [Development](#development)
  - [Running Tests](#running-tests)
- [Contributing](#contributing)

# Introduction
Maswali is a dynamic web application that allows users to take quizzes on various programming topics. The project is built with a full-stack approach using React for the frontend and Django Rest (Python) for the backend.

# Features
- User authentication and authorization
- Creation, management, and deletion of quizzes
- Interactive quiz taking experience
- Tracking of user responses and scores
- Leaderboard and user progress tracking
- Responsive and mobile-friendly design

# Technology Stack

## Frontend
- **React**: A JavaScript library for building user interfaces
- **React Router**: Declarative routing for React
- **Axios**: Promise-based HTTP client for the browser and Node.js

## Backend
- **Django**: A high-level Python web framework
- **Django REST Framework**: Toolkit for building web APIs
- **SQLite**: A powerful, lightweight, open-source object-relational database system
- **Django Migrations**: Database schema management for Django

# Getting Started

## Prerequisites
- Python (version 3.x)
- Node.js (version 14.x or higher)
- Yarn or npm (package managers)

## Installation

Clone the repository:
```
git clone https://github.com/your-username/maswali.git
```
# Usage
## Set up the backend
Navigate to the project directory:
```
cd maswali/backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt # install project requirements
python manage.py migrate
python manage.py createsuperuser

```
## Set up the frontend
Navigate to the project directory:
```
cd ../frontend
npm install
```

## Running the Application
Start the backend server:
```
cd backend
python manage.py runserver
```
Start the frontend server:
```
cd frontend
npm start
```
Open your browser and navigate to: [http://localhost:3000/]

## Interacting with the App
- Users can sign up/register and log in to the application.
- Authenticated users can create, view, and take quizzes.
- Users can track their progress and scores on the leaderboard.
- Administrators can manage the quizzes and user accounts.


# API Endpoints
## Authentication
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
## Quizzes

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

13. `GET api/quiz/leaderboard/` - show leaderboard
Auth:
- Bearer token ( pass access token)

14. `GET api/quiz/attempts/` - show quiz attempts
Auth:
- Bearer token ( pass access token)

15. `GET api/quiz/attempts/<quiz_id>/` - retrive attempt by question id
Auth:
- Bearer token ( pass access token)


# Development
## Running Tests
```
cd backend
pytest
```

# Contributing
We welcome contributions to the Maswali project! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your branch to your forked repository.
Submit a pull request to the main repository.