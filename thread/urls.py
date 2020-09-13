from django.urls import path
from .views import ChatList, ThreadList

urlpatterns = [
    path('chat', ChatList.as_view()),
    path('thread', ThreadList.as_view()),
]
