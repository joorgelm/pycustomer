from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from .models import Feedback
from .serializers import FeedbackSerializer, UserSerializer


class FeedbackViewSet(viewsets.ModelViewSet):

    # todo: remover listar todos os feedbacks

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    @action(detail=False, methods=['post'])
    def user(self, request):

        self.pagination_class.page_size = 5
        user = User.objects.get(auth_token=request.auth.key)
        feedbacks = Feedback.objects.filter(receiver_id=user.id)

        page = self.paginate_queryset(feedbacks)

        if page is not None:
            serializer = FeedbackSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = FeedbackSerializer(feedbacks, many=True)

        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    # cadastro usuario
    def create(self, request, *args, **kwargs):

        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        token = Token.objects.create(user=user)
        data = {
            'username': user.username,
            'token': token.key
        }

        return Response(data=data, status=status.HTTP_201_CREATED)
