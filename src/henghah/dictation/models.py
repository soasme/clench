from __future__ import unicode_literals

from django.conf import settings
from django.db import models

class Dictation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    audio = models.ForeignKey('album.Audio')
    content = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u"%s's dictation on %s" % (
                self.user.username, self.audio.title)
