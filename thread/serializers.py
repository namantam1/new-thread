from .models import Chat, Thread
from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime

class ChatSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    time = serializers.SerializerMethodField('get_time')
    class Meta:
        model = Chat
        fields = ['text', 'id', 'time', 'user', 'username', 'parent', 'thread']

    def get_username(self, obj):
        print(obj.user)
        return obj.user.username
    
    def get_time(self, obj):
        time = naturaltime(obj.timestamp)
        print(time)
        return time


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'