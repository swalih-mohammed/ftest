
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import index
from django.contrib import admin
from allauth.account.views import ConfirmEmailView

from rest_auth.views import (
    LoginView, LogoutView, UserDetailsView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView
)


# from .pwaViews import views as pwa_views
from .pwaViews import ServiceWorkerView

urlpatterns = [
    path('', include('frontend.urls')),
    # path('password/reset/confirm/<uidb64>/<token>/',
    #      TemplateView.as_view(), name='password_reset_confirm'),

    path('password/reset/confirm/<uidb64>/<token>/',
         TemplateView.as_view(template_name="index.html"),  name='password_reset_confirm'),

    #  path('password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     TemplateView.as_view(template_name="password_reset_confirm.html"),
    #     name='password_reset_confirm'),

    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/password/reset/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
    path(
        'sw.js',
        ServiceWorkerView.as_view(),
        name=ServiceWorkerView.name,
    ),
    #
    # path(
    #     'manifest.json',
    #     ManifestView.as_view(),
    #     name=ManifestView.name,
    # ),

    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns = [
#     # ... the rest of your URLconf goes here ...
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
