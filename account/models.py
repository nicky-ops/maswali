from django.db import models
from django.conf import settings

# Create your models here.
class Profile(models.Model):
    '''
    This class extends the user model to provide additional fields. It has a one-to-one relationship with the django user model
    '''
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    github_url = models.URLField(blank=True, max_length=2000)
    linkedin_url = models.URLField(blank=True, max_length=2000)
    twitter_url = models.URLField(blank=True, max_length=2000)
    website_url = models.URLField(blank=True, max_length=2000)
    photo = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)

    def __str__(self):
        return f'Profile of {self.user.username}'