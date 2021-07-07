from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from userauth.models import User


class Tag(models.Model):
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    class Meta:
        unique_together = ('user', 'name')


class Expense(models.Model):
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    date = models.DateField()
    tags = models.ManyToManyField(to=Tag, blank=True)
    period = models.IntegerField()
    amount = models.DecimalField(decimal_places=2, max_digits=11, null=True)
    notes = models.TextField(blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(
        to=User, on_delete=models.CASCADE, primary_key=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # pylint: disable=maybe-no-member
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
