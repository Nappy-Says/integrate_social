# Package imports
from django.db import models
from datetime import datetime

# App imports
from social_network.settings import PATH_MEDIA_DIRECTORY



# A model whose fields identify a user in an integrated social network.
# Nothing new, everything is quite primitive
class User(models.Model):
    __tablename__ = "users"

    telegram_id = models.IntegerField("Telegram ID", unique=True)
    created_at = models.DateTimeField(default=datetime.now, editable=False)
    updated_at = models.DateTimeField(auto_now_add=True)
    username = models.CharField("Username from telegram", max_length=32, blank=False, null=False)
    first_name = models.CharField("First name from telegram", max_length=64)
    last_name = models.CharField("Last name from telegram", max_length=64, blank=False)
    avatar = models.FilePathField("The path to the user's avatar", path=PATH_MEDIA_DIRECTORY / "avatars")

    # Override the save data function.
    # Assign created_at field new time
    def save(self, *args, **kwargs):
        self.modified = datetime.now()
        return super(User, self).save(*args, **kwargs)


class Account(models.Model):
    __tablename__ = "accounts"

    user = models.ForeignKey(
        verbose_name='Attitude towards the user', 
        to=User, related_name='user', 
        to_field='telegram_id', on_delete=models.DO_NOTHING,
    )
    # subscription = models.ForeignKey()
