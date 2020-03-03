from django.db import models
from django.contrib.auth.models import User


class Base(models.Model):

    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Feedback(Base):

    message = models.TextField(max_length=240)
    sender = models.CharField(max_length=120, null=True)
    receiver = models.ForeignKey(User, related_name='feedbacks', on_delete=models.CASCADE)
