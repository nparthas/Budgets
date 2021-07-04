from django.http.response import Http404
from id_encoder import decode_id
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from budgets.models import Expense, Tag
from budgets.serializers import ExpenseSerializer, TagSerializer


class EncodedIdViewSetMixin(viewsets.GenericViewSet):
    def get_object(self):
        try:
            self.kwargs['pk'] = decode_id(self.kwargs['pk'])
        except ValueError:
            Http404
        return super().get_object()


class ExpenseViewSet(viewsets.ModelViewSet, EncodedIdViewSetMixin):
    serializer_class = ExpenseSerializer

    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user

        # pylint: disable=maybe-no-member
        queryset = Expense.objects.filter(
            user=user.userprofile).order_by('-id')

        tags = self.request.query_params.getlist('tag')
        if tags:
            print(tags)
            for tag in tags:
                queryset = queryset.filter(tags__name=tag)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.userprofile)


class TagViewSet(viewsets.ModelViewSet, EncodedIdViewSetMixin):
    serializer_class = TagSerializer

    permission_classes = [IsAuthenticated, ]

    http_method_names = ['get', 'post', 'head', 'delete']

    def get_queryset(self):
        user = self.request.user

        # pylint: disable=maybe-no-member
        queryset = Tag.objects.filter(user=user.userprofile).order_by('id')

        name = self.request.query_params.get('name')
        if name is not None:
            queryset = queryset.filter(name=name)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.userprofile)
