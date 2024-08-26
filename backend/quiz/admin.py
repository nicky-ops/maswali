from django.contrib import admin
from .models import Category, Quiz, Question, Choice, QuizAttempt, UserAnswer

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4
    max_num = 4

class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1

class QuizInline(admin.StackedInline):
    model = Quiz
    extra = 1
    show_change_link = True
    fields = ('title', 'time_limit')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "created_by":
            kwargs["initial"] = request.user.id
            return db_field.formfield(**kwargs)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class CategoryAdmin(admin.ModelAdmin):
    inlines = [QuizInline]
    list_display = ('name',)
    search_fields = ('name',)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        for instance in instances:
            if isinstance(instance, Quiz) and not instance.pk:
                instance.created_by = request.user
            instance.save()
        formset.save_m2m()

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ('title', 'category', 'time_limit', 'created_by', 'created_at')
    list_filter = ('category', 'created_by')
    search_fields = ('title', 'category__name', 'created_by__username')
    fields = ('title', 'category', 'time_limit')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ('text', 'quiz')
    list_filter = ('quiz__category', 'quiz')
    search_fields = ('text', 'quiz__title')

class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'start_time', 'end_time')
    list_filter = ('quiz__category', 'quiz', 'user')
    search_fields = ('user__username', 'quiz__title')

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('attempt', 'question', 'selected_choice')
    list_filter = ('attempt__quiz__category', 'attempt__quiz', 'question')
    search_fields = ('attempt__user__username', 'question__text')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(QuizAttempt, QuizAttemptAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)