
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import index
from django.contrib import admin


# from .pwaViews import views as pwa_views
from .pwaViews import ServiceWorkerView


urlpatterns = [
    path('', include('frontend.urls')),
    # path('./serviceworker.js', include('frontend.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/password/reset', include('rest_auth.registration.urls')),
    path('rest-auth/password/reset/confirm/',
         include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),

    path(
        'sw.js',
        ServiceWorkerView.as_view(),
        name=ServiceWorkerView.name,
    ),


    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns = [
#     # ... the rest of your URLconf goes here ...
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
