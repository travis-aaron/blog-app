# Generated by Django 4.1 on 2022-09-27 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_comments'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Comments',
            new_name='Comment',
        ),
    ]
