import pytest
from .models import Quiz, Category
from account.fixtures.user import user

# Create your tests here.

@pytest.mark.django_db
def test_create_quiz(user):
    category = Category.objects.create(name="Python")
    quiz = Quiz.objects.create(created_by=user, title="Quiz title", time_limit=3600, category_id=category.id)
    assert quiz.title == "Quiz title"
    assert quiz.time_limit == 3600
    assert quiz.created_by == user
    assert quiz.category_id == category.id