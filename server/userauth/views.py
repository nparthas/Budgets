from allauth.account.views import LogoutFunctionalityMixin
from rest_framework import generics, permissions, response, status

from .models import User


# Create your views here.
class UserDeleteView(LogoutFunctionalityMixin, generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    queryset = User.objects.all()

    def delete(self, request, *args, **kwargs):
        user = request.user
        self.logout()
        user.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class UserVerifiedView(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        return response.Response(data={"message": "verification successful"},
                                 status=status.HTTP_200_OK)
