"""
TODO:
- settle UUID to json
- verify is access token needs to have expirations
"""

import jwt
import datetime
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder


def generate_access_token(user):
      id_json = DjangoJSONEncoder.encode(user, user.id)
      payload = {
            'user_id': id_json,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
      }

      return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')