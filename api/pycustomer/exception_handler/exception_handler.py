from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException


def base_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = 300

    return response


class CustomAPIException(APIException):
    status_code = 400
    default_detail = "Unable to read file."
    default_code = "unreadable_csv_file"
