import pytest
from ..models import Category

@pytest.fixture
def category(db):
    return Category.objects.create(name="Python")