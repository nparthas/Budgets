# Generated by Django 3.2.4 on 2021-07-02 02:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userauth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='userauth.user')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='budgets.userprofile')),
            ],
            options={
                'unique_together': {('user', 'name')},
            },
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('period', models.IntegerField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=11, null=True)),
                ('notes', models.TextField(blank=True)),
                ('tags', models.ManyToManyField(blank=True, to='budgets.Tag')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='budgets.userprofile')),
            ],
        ),
    ]