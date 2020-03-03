from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

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

    def create(self, request, *args, **kwargs):

        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        token = Token.objects.create(user=user)
        data = {
            'username': user.username,
            'token': token.key
        }

        return Response(data=data, status=status.HTTP_201_CREATED)
