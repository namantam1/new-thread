from django.contrib.auth.models import User
from .serializers import ChatSerializer, ThreadSerializer
from rest_framework import generics,status, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from .models import Thread, Chat

class ChatList(generics.ListCreateAPIView):
    
    serializer_class = ChatSerializer
    # permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        data = request.data
        thread = data.get("thread")
        user = data.get("user")
        text = data.get("text")
        parent = data.get("parent")
        if not thread:
            raise serializers.ValidationErro("thread is required")
        if not user:
            raise serializers.ValidationErro("user is required")
        if not text:
            raise serializers.ValidationErro("text is required")
        thread,created = Thread.objects.get_or_create(thread=thread)
        ch = Chat.objects.create(
            user_id=user,
            thread=thread,
            text=text,
            parent_id=parent
        )
        data = self.serializer_class(ch)
        return Response(data.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        queryset = Chat.objects.all()
        parent_id = self.request.query_params.get('id')
        thread = self.request.query_params.get('thread')

        if parent_id:
            queryset = queryset.filter(parent_id=parent_id, thread__thread=thread)
        else:
            queryset = queryset.filter(parent__isnull=True, thread__thread=thread)

        return queryset

class ThreadList(generics.ListCreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    # permission_classes = [IsAdminUser]
