from allauth.account.views import LogoutFunctionalityMixin
from django.conf import settings
from rest_framework import generics, permissions, response, serializers, status
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenRefreshView

from .models import User


class TokenRefreshCookieSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        if 'refresh' not in attrs:
            attrs['refresh'] = self.context['request'].COOKIES[settings.JWT_AUTH_REFRESH_COOKIE]  # noqa: E501
        return super(TokenRefreshCookieSerializer, self).validate(attrs)


# pylint: disable=maybe-no-member
TokenRefreshCookieSerializer._declared_fields['refresh'] = serializers.CharField(  # noqa: E501
    required=False, allow_null=True)
TokenRefreshView.serializer_class = TokenRefreshCookieSerializer


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
