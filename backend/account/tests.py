import pytest
from .models import User

# Create your tests here.
user_data = {
    'username': 'test_user',
    'email': 'test_user@example.com',
    'password': 'password123',
    'first_name': "Test",
    'last_name': "User"
}

@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(**user_data)
    assert user.username == user_data['username']
    assert user.email == user_data['email']
    assert user.first_name == user_data['first_name']
    assert user.last_name == user_data['last_name']

@pytest.mark.django_db
def test_create_super_user():
    user = User.objects.create_superuser(**user_data)
    assert user.is_staff == True
    assert user.is_superuser == True
    assert user.is_active == True
    assert user.email == user_data['email']
    assert user.username == user_data['username']