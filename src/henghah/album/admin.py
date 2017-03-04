from django.contrib import admin

from henghah.album.models import Series, Audio, Transcript

for cls in (Series, Audio, Transcript):
    admin.site.register(cls)

