from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = (
            'id',
            'message',
            'sender',
            'receiver',
            'created'
        )


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        extra_kwargs = {
            'password': {'write_only': True}
        }
        model = User
        fields = (
            'id',
            'username',
            'password',
            'is_active'
        )
