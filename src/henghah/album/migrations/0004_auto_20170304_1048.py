# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-04 10:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('album', '0003_audio_series'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audio',
            name='series',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='album.Series'),
        ),
    ]
