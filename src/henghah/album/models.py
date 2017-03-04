from __future__ import unicode_literals

from django.db import models

from henghah.album.utils import upload_to

def upload_to_images(instance, filename):
    return upload_to('images', filename)

def upload_to_audios(instance, filename):
    return upload_to('audios', filename)

class Series(models.Model):
    slug = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    cover = models.FileField(upload_to=upload_to_images, default='')
    description = models.CharField(max_length=1024)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'%s' % self.title

class Audio(models.Model):
    series = models.ForeignKey('Series', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    audio = models.FileField(upload_to=upload_to_audios, default='')
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
