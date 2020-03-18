from rest_framework.routers import SimpleRouter
from .views import FeedbackViewSet, UserViewSet

router = SimpleRouter()
router.register('feedback', FeedbackViewSet)
router.register('user', UserViewSet)

