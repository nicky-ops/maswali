from rest_framework import serializers
from .models import Category, Quiz, Question, Choice, QuizAttempt
from django.contrib.auth import get_user_model

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'option', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'choices']

class QuizSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'category', 'time_limit', 'questions', 'created_by', 'created_at', 'updated_at']

class QuizAttemptSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    quiz = serializers.StringRelatedField()

    class Meta:
        model = QuizAttempt
        fields = ['id', 'user', 'quiz', 'score', 'start_time', 'end_time']

class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = QuizAttempt
        fields = ['username', 'score']