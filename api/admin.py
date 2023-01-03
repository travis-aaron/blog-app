from django.contrib import admin

from api.forms import EntryForm
from .models import Blog, UserAccount, Comment


class CommentAdmin(admin.ModelAdmin):
    model = Comment
    fields = ('comment',)
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(active=True)


class UserAccountAdmin(admin.ModelAdmin):
    model = UserAccount
    fields = ('first_name', 'last_name', 'username',
              'email', 'is_active', 'is_staff', 'is_admin')


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    form = EntryForm
    fields = ('title', 'category', 'slug', 'excerpt', 'post', 'image')
    prepopulated_fields = {'slug': ('title',)}

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        obj.author_name = str(obj.author)
        obj.save()


admin.site.register(UserAccount)
admin.site.register(Comment)
