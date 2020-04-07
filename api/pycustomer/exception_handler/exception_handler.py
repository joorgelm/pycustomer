from rest_framework.views import exception_handler
from rest_framework import status
from rest_framework.response import Response
from rest_framework import exceptions as exp
from django.db.utils import IntegrityError


def base_exception_handler(exc, context):

    if isinstance(exc, exp.ValidationError):
        return Response(data={'message': 'Usuário e/ou senha inválidos'}, status=status.HTTP_401_UNAUTHORIZED)

    if isinstance(exc, IntegrityError):
        return Response(data={'message': 'Usuário já cadastrado'}, status=status.HTTP_409_CONFLICT)

    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code

    return response
