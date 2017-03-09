# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import routers, serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from henghah.album.models import Series, Audio, Transcript

class SeriesSerializer(serializers.HyperlinkedModelSerializer):

    series_api = serializers.HyperlinkedIdentityField('series-detail')
    audios_api = serializers.HyperlinkedIdentityField('series-audios')

    class Meta:
        model = Series
        fields = ('slug', 'title', 'cover', 'description', 'created_at', 'updated_at', 'audios_api', 'series_api')

class SeriesViewSet(viewsets.ModelViewSet):

    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

    def get_queryset(self):
        queryset = Series.objects.all()
        slug = self.request.query_params.get('slug')
        if slug:
            queryset = queryset.filter(slug=slug)
        return queryset

    @detail_route(methods=['GET'])
    def audios(self, request, pk):
        series = get_object_or_404(self.queryset, pk=pk)
        series_audios = Audio.objects.filter(series=series)
        page = self.paginate_queryset(series_audios)
        serializer = TrimAudioSerializer(page, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)


class TranscriptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transcript
        fields = ('start', 'end', 'content', 'created_at', 'updated_at', )


class TrimAudioSerializer(serializers.HyperlinkedModelSerializer):

    audio_api = serializers.HyperlinkedIdentityField('audio-detail')

    class Meta:
        model = Audio
        fields = ('title', 'audio', 'created_at', 'updated_at', 'audio_api', )



class AudioSerializer(serializers.HyperlinkedModelSerializer):

    transcripts = TranscriptSerializer(many=True, read_only=True)

    class Meta:
        model = Audio
        fields = ('title', 'audio', 'created_at', 'updated_at', 'series', 'transcripts', )


class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer






router = routers.DefaultRouter()
router.register(r'series', SeriesViewSet)
router.register(r'audios', AudioViewSet)
