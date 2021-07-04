from allauth import account
from allauth.account.views import ConfirmEmailView
from django.urls import include, path
from django.views import defaults

from .views import UserDeleteView, UserVerifiedView

confirm_email_view = ConfirmEmailView
confirm_email_view.template_name = defaults.ERROR_404_TEMPLATE_NAME


# for adding functionality look in path('account/', include('allauth.urls')),
urlpatterns = [
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    path('confirm-email/', account.views.email_verification_sent,
         name="account_email_verification_sent"),
    path('accounts-rest/registration/account-confirm-email/<str:key>/',
         confirm_email_view.as_view(), name='account_confirm_email'),
    path('user/delete/', UserDeleteView.as_view()),
    path('verified/', UserVerifiedView.as_view())
]
