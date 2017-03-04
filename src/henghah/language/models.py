from __future__ import unicode_literals

from django.db import models

class Language(models.Model):
    slug = models.CharField(max_length=30)
    title = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return u'%s' % self.title

    def __unicode__(self):
        return u'%s' % self.title
