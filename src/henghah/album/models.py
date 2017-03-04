from __future__ import unicode_literals

from django.db import models

class Series(models.Model):
    slug = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    cover_cdn_key = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'%s' % self.title

class Audio(models.Model):
    title = models.CharField(max_length=255)
    audio_cdn_key = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'%s' % self.title

class Transcript(models.Model):
    audio = models.ForeignKey('Audio', on_delete=models.CASCADE)
    start = models.IntegerField()
    end = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'%s (%s - %s)' % (self.audio.title, self.start, self.end)
