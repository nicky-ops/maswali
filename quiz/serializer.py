from rest_framework import serializers
from .models import Category, Quiz, Question, Choice, QuizAttempt, UserAnswer

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
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'time_limit', 'questions']

class CategorySerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(many=True, read_only=True, source='quiz_set')

    class Meta:
        model = Category
        fields = ['id', 'name', 'quizzes']

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ['question', 'selected_choice']

class QuizAttemptSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    quiz = serializers.StringRelatedField()
    user_answers = UserAnswerSerializer(many=True)

    class Meta:
        model = QuizAttempt
        fields = ['id', 'user', 'quiz', 'score', 'start_time', 'end_time', 'user_answers']

class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = QuizAttempt
        fields = ['username', 'score']