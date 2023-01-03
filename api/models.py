from django.db import models
from datetime import date
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth import get_user_model


today = date.today()
d1 = today.strftime("%d/%m/%Y")


class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name,
                    username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name,
                         username, email, password=None):
        user = self.create_user(
            first_name,
            last_name,
            username,
            email,
            password=password)

        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    username = models.CharField(unique=True, max_length=25)
    email = models.EmailField(unique=True, max_length=50)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    def __str__(self):
        return self.username


class Blog(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(get_user_model(),
                               on_delete=models.CASCADE, blank=True)
    date = models.CharField(max_length=30, default=d1)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=25)
    title = models.CharField(max_length=50, default="Post")
    excerpt = models.CharField(max_length=250)
    post = models.TextField()
    author_name = models.CharField(blank=True, max_length=50)
    image = models.ImageField(upload_to='images/',
                              default='cute_puppy_pic.png')


class Comment(models.Model):
    post = models.ForeignKey(Blog, on_delete=models.CASCADE)
    username = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
