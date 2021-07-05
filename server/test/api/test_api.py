from datetime import date

from allauth.account.models import EmailAddress, EmailConfirmationHMAC
from budgets.models import Expense, Tag  # pylint: disable=import-error
from django.conf import settings
from django.urls import reverse
from id_encoder import encode_id  # pylint: disable=import-error
from rest_framework import status, test
from userauth.models import User  # pylint: disable=import-error


class AccountMixin:

    @property
    def email(self):
        return 'test@test.com'

    @property
    def password(self):
        return 'test!@#$'

    @property
    def user(self):
        return User.objects.get(email=self.email)

    def create_user(self, email=None):
        url = reverse('rest_register')
        data = {
            'email': self.email if email is None else email,
            'password1': self.password,
            'password2': self.password
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return response

    def create_verified_user(self):
        self.create_user()

        email = EmailAddress.objects.get(email=self.email)
        email.verified = True
        email.save()

    def create_log_in_user(self):
        self.create_verified_user()
        self.client.login(email=self.email, password=self.password)


class AccountTests(test.APITestCase, AccountMixin):

    def test_create_account(self):
        response = self.create_user()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, self.email)

    def test_verification(self):
        self.create_user()

        email = EmailConfirmationHMAC(EmailAddress.objects.get())
        key = email.key

        url = reverse('account_confirm_email', args=(key,))

        response = self.client.get(url, format='json')
        self.assertRedirects(
            response,
            settings.ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL,
            fetch_redirect_response=False)

    def test_login(self):
        self.create_verified_user()

        url = reverse('rest_login')
        data = {
            'email': self.email,
            'password': self.password
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('key' in response.json())

    def test_userinfo(self):
        self.create_verified_user()

        url = reverse('rest_user_details')

        self.client.login(email=self.email, password=self.password)

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('userprofile' in response.json().keys())

    def test_user_delete(self):
        self.create_log_in_user()

        url = reverse('user-delete')

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)


class TagTests(test.APITestCase, AccountMixin):

    @property
    def list_api(self):
        return 'tags-list'

    @property
    def detail_api(self):
        return 'tags-detail'

    def setUp(self):
        self.create_log_in_user()

    def test_create_tag(self):
        url = reverse(self.list_api)
        data = {
            'name': 'dummytag'
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tag.objects.count(), 1)
        self.assertEqual(Tag.objects.get().name, 'dummytag')

    def test_create_tags(self):
        url = reverse(self.list_api)
        data = {
            'name': 'dummytag'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('already exists' in response.json()['name'][0])

    def test_get_tags(self):
        url = reverse(self.list_api)

        num_tags = 4

        for i in range(num_tags):
            Tag.objects.create(name=f'dummytag{i}', user=User.objects.get(
                email=self.email).userprofile)

        self.create_user('dummyuser@test.com')
        Tag.objects.create(name='notyourtag', user=User.objects.get(
            email='dummyuser@test.com').userprofile)

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()

        self.assertEqual(data['count'], num_tags)

        for i in range(num_tags):
            self.assertTrue('dummytag' in data['results'][i]['name'])

    def test_must_be_logged_in(self):
        url = reverse(self.list_api)

        self.client.logout()

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_tag_detail(self):
        Tag.objects.create(
            name='dummytag', user=User.objects.get().userprofile)

        url = reverse(self.detail_api, args=(encode_id(Tag.objects.get().id),))

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'dummytag')

    def test_tag_delete(self):
        Tag.objects.create(
            name='dummytag', user=User.objects.get().userprofile)

        url = reverse(self.detail_api, args=(encode_id(Tag.objects.get().id),))

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Tag.objects.count(), 0)


class ExpenseTests(test.APITestCase, AccountMixin):

    @property
    def list_api(self):
        return 'expenses-list'

    @property
    def detail_api(self):
        return 'expenses-detail'

    def setUp(self):
        self.create_log_in_user()

    def test_create_expense(self):
        url = reverse(self.list_api)

        tag1 = Tag.objects.create(name='dummytag1', user=self.user.userprofile)
        tag2 = Tag.objects.create(name='dummytag2', user=self.user.userprofile)

        data = {
            'tags': [tag1.name, tag2.name],
            'date': date.today(),
            'period': 0,
            'amount': 500,
            'notes': ""
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Expense.objects.count(), 1)
        self.assertEqual(Expense.objects.get().amount, data['amount'])
        self.assertEqual(response.json()['tags'], data['tags'])

    def test_get_expenses(self):
        url = reverse(self.list_api)

        num_expenses = 4

        for i in range(num_expenses):
            Expense.objects.create(
                date=date.today(),
                period=i,
                amount=i,
                notes=f'testnote{i}',
                user=self.user.userprofile)

        self.create_user('dummyuser@test.com')
        Expense.objects.create(
            date=date.today(),
            period=0,
            amount=None,
            notes='not your expense',
            user=User.objects.get(email='dummyuser@test.com').userprofile)

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()

        self.assertEqual(data['count'], num_expenses)

        for i in range(num_expenses):
            self.assertAlmostEqual(num_expenses - i - 1,
                                   float(data['results'][i]['amount']))

    def test_must_be_logged_in(self):
        url = reverse(self.list_api)

        self.client.logout()

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_tag_detail(self):
        expense = Expense.objects.create(
            date=date.today(),
            period=10,
            amount=None,
            notes='random expense',
            user=self.user.userprofile)

        tag1 = Tag.objects.create(name='dummytag1', user=self.user.userprofile)
        tag2 = Tag.objects.create(name='dummytag2', user=self.user.userprofile)
        expense.tags.add(tag1, tag2)

        url = reverse(self.detail_api, args=(
            encode_id(Expense.objects.get().id),))

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['period'], 10)

        tag1.delete()

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['tags'], [tag2.name])

    def test_tag_delete(self):
        Expense.objects.create(
            date=date.today(),
            period=10,
            amount=None,
            notes='random expense',
            user=self.user.userprofile)

        url = reverse(self.detail_api, args=(
            encode_id(Expense.objects.get().id),))

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Tag.objects.count(), 0)
