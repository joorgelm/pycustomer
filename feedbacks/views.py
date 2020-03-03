from rest_framework import viewsets

from django.contrib.auth.models import User

from .models import Feedback
from .serializers import FeedbackSerializer, UserSerializer


class FeedbackViewSet(viewsets.ModelViewSet):

    # permission_classes = (
    #     permissions.DjangoModelPermissions,
    # )

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
