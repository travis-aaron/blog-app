# Generated by Django 4.1 on 2022-10-05 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_comment_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='image',
            field=models.ImageField(default='cute_puppy_pic.png', upload_to='images/'),
        ),
    ]
