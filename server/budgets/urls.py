from django.urls import include, path
from rest_framework import routers

from budgets import views


router = routers.DefaultRouter()
router.register('tags', views.TagViewSet, basename='tags')
router.register('expenses', views.ExpenseViewSet, basename='expenses')

urlpatterns = [
    path('', include(router.urls))
]
