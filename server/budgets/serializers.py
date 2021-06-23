from rest_framework import serializers
from userauth.models import User

from budgets.models import Expense, Tag, UserProfile


class ExpenseSerializer(serializers.ModelSerializer):

    class TagField(serializers.StringRelatedField):
        def to_representation(self, tag):
            return tag.name

        def to_internal_value(self, data):
            if data == "":
                raise serializers.ValidationError(
                    "Invalid name - object cannot be blank")
            try:
                # pylint: disable=maybe-no-member
                tag = Tag.objects.get(name=data)
            # pylint: disable=maybe-no-member
            except Tag.DoesNotExist:
                raise serializers.ValidationError(
                    f"Invalid name - object with name \"{data}\" does not exist.")  # noqa: E501

            return tag.id

    tags = TagField(many=True)

    class Meta:
        model = Expense
        exclude = ['user']
        ordering = ['-id']


class TagSerializer(serializers.ModelSerializer):

    def validate_name(self, name):
        user = self.context['request'].user.userprofile

        if Tag.objects.filter(name=name, user=user):
            raise serializers.ValidationError(
                f"tag with name \"{name}\" already exists.")

        return name

    class Meta:
        model = Tag
        exclude = ['user']


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()
    userprofile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['email', 'userprofile', ]
