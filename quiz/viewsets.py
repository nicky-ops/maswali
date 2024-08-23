from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Max
from .models import Category, Quiz, QuizAttempt, UserAnswer, Choice
from .serializer import CategorySerializer, QuizSerializer, QuizAttemptSerializer, UserAnswerSerializer, LeaderboardSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.prefetch_related('quiz_set__questions__choices').all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quiz.objects.prefetch_related('questions__choices').all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        quiz = self.get_object()
        user = request.user
        
        # Create a new attempt with start time
        attempt = QuizAttempt.objects.create(user=user, quiz=quiz, start_time=timezone.now())

        answers_data = request.data.get('user_answers', [])
        score = 0

        correct_choices = Choice.objects.filter(question__quiz=quiz, is_correct=True)

        for answer_data in answers_data:
            question_id = answer_data.get('question_id')
            selected_choice_id = answer_data.get('selected_choice_id')

            question = quiz.questions.get(pk=question_id)
            selected_choice = question.choices.get(pk=selected_choice_id)

            UserAnswer.objects.create(
                attempt=attempt,
                question=question,
                selected_choice=selected_choice
            )

            if selected_choice in correct_choices:
                score += 1

        attempt.score = score
        attempt.end_time = timezone.now()  # Record end time
        attempt.save()

        serializer = QuizAttemptSerializer(attempt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = LeaderboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QuizAttempt.objects.values('user__username').annotate(max_score=Max('score')).order_by('-max_score')[:3]

class QuizAttemptViewSet(viewsets.ModelViewSet):
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post']

    def get_queryset(self):
        return QuizAttempt.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)