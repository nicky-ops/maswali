from rest_framework import serializers
from .models import User

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
        fields = ['id', 'username', 'first_name', 'last_name', 'bio', 'email', 'website_url', 'twitter_url', 'github_url', 'linkedin_url','avatar', 'password']

    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)