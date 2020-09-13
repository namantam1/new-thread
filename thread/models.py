from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class Thread(models.Model):
    thread = models.CharField(max_length=50)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.thread}"

    def get_chats(self):
        chats = self.chat_set.all()
        return chats

class Chat(models.Model):
    parent = models.ForeignKey('self',on_delete=models.CASCADE, null=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)
    image = models.ImageField(null=True)

    def __str__(self):
        return f"{self.text}"

    

