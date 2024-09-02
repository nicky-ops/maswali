from rest_framework import serializers
from .models import Category, Quiz, Question, Choice, QuizAttempt, UserAnswer

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'option', 'text', 'is_correct']

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
    user_answers = UserAnswerSerializer(many=True, read_only=True)
    
    class Meta:
        model = QuizAttempt
        fields = ['id', 'user', 'quiz', 'score', 'start_time', 'end_time', 'user_answers']

class LeaderboardSerializer(serializers.Serializer):
    username = serializers.CharField(source='user__username')
    max_score = serializers.IntegerField()
    
    class Meta:
        fields = ['username', 'max_score']

class QuizResultSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    
    class Meta:
        model = QuizAttempt
        fields = ['id', 'score', 'questions']

    def get_questions(self, obj):
        questions = []
        for question in obj.quiz.questions.all():
            user_answer = obj.user_answers.filter(question=question).first()
            correct_choice = question.choices.filter(is_correct=True).first()
            
            question_data = {
                'id': question.id,
                'text': question.text,
                'user_answer': {
                    'id': user_answer.selected_choice.id,
                    'text': user_answer.selected_choice.text,
                    'is_correct': user_answer.selected_choice.is_correct
                } if user_answer else None,
                'correct_answer': {
                    'id': correct_choice.id,
                    'text': correct_choice.text
                } if correct_choice else None
            }
            questions.append(question_data)
        return questions