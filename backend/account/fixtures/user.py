import pytest
from ..models import User

user_data = {
    'username': 'test_user',
    'email': 'test_user@example.com',
    'password': 'test_password',
    'first_name': "Test",
    'last_name': "User"
}

@pytest.fixture
def user():
    return User.objects.create_user(**user_data)