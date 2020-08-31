"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import index
from django.contrib import admin


from .views import index


# urlpatterns = [
#     path('', index, name='index'),
#     path('admin/', admin.site.urls),
# ]

urlpatterns = [

    # path('', index, name='index'),
    path('', include('frontend.urls')),
    path('', include('pwa.urls')),

    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/password/reset', include('rest_auth.registration.urls')),
    path('rest-auth/password/reset/confirm/',
         include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns = [
#     # ... the rest of your URLconf goes here ...
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
