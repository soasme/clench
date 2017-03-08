# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import routers, serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from henghah.album.models import Series, Audio, Transcript

class SeriesSerializer(serializers.HyperlinkedModelSerializer):

    audios = serializers.HyperlinkedIdentityField('series-audios')

    class Meta:
        model = Series
        fields = ('slug', 'title', 'cover', 'description', 'created_at', 'updated_at', 'audios', )

class SeriesViewSet(viewsets.ModelViewSet):

    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

    @detail_route(methods=['GET'])
    def audios(self, request, pk):
        series = get_object_or_404(self.queryset, pk=pk)
        series_audios = Audio.objects.filter(series=series)
        serializer = AudioSerializer(series_audios, many=True, context={'request': request})
        return Response(serializer.data)


class TranscriptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transcript
        fields = ('start', 'end', 'content', 'created_at', 'updated_at', )


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
