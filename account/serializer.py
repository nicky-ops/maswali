from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from .models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source='public_id', read_only=True, format='hex')
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'bio', 'email', 'is_active', 'created', 'updated', 'website_url', 'twitter_url', 'github_url', 'linkedin_url','avatar']
        read_only_field = ['is_active']


class RegisterSerializer(UserSerializer):
    '''
    Serializer for registering a new user.
    '''
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def send_password_reset_email(self, user):
        token = default_token_generator.make_token(user)
        reset_url = f"http://localhost:5173/reset-password?token={token}&email={user.email}"
        send_mail(
            'Password Reset Request',
            f'Click the link to reset your password: {reset_url}',
            'from@example.com',
            [user.email],
        )


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8, max_length=128)

    def validate(self, data):
        email = data.get('email')
        token = data.get('token')
        new_password = data.get('new_password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")

        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError("Invalid token.")

        return data

    def save(self, **kwargs):
        email = self.validated_data.get('email')
        new_password = self.validated_data.get('new_password')
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return user
