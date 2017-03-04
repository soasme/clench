from django.contrib import admin
from django_extensions.admin import ForeignKeyAutocompleteAdmin

from henghah.dictation.models import Dictation

class DictationAdmin(ForeignKeyAutocompleteAdmin):
    related_search_fields = {
        'user': ('username', 'email', ),
        'audio': ('title', ),
    }
    fields = ('user', 'audio', 'content', )

admin.site.register(Dictation, DictationAdmin)
