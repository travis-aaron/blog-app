from django.contrib.auth import get_user_model
from django.forms import ModelForm

from api.models import Blog


class EntryForm(ModelForm):
    class Meta:
        model = Blog
        fields = '__all__'

    def clean_author(self):
        if not self.cleaned_data['author']:
            return get_user_model
        return self.cleaned_data['author']
