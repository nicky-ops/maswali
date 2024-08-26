from rest_framework import routers
from .viewsets import (
    CategoryViewSet,
    QuizViewSet,
    LeaderboardViewSet,
    QuizAttemptViewSet
)

router = routers.SimpleRouter()

router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'attempts', QuizAttemptViewSet, basename='quiz-attempt')

urlpatterns = [
    *router.urls
]