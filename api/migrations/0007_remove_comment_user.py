# Generated by Django 4.1 on 2022-10-04 00:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_comment_user_alter_comment_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
    ]
