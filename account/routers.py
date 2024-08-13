from rest_framework import routers
from .viewsets import LoginViewSet, UserViewSet, RegisterViewSet, RefreshViewSet, LogoutViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
router.register(r"auth/logout", LogoutViewSet, basename="auth-logout")

urlpatterns = [
    *router.urls
]