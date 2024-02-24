# api/urls.py

from django.urls import path
from .views import SaveImageView

urlpatterns = [
    path('save_image/', SaveImageView.as_view(), name='save_image'),
]

