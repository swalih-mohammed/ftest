from django_countries import countries
from django.contrib import humanize
from rest_framework.mixins import UpdateModelMixin
from django.db.models import Q
from django.conf import settings
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView, GenericAPIView
)

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from core.models import Item, OrderItem, Order

from .serializers import (
    ShopSerializer, ItemSerializer, OrderSerializer, ItemDetailSerializer, AddressSerializer,
    ShopProductSerializer, UserProfileSerializer, PlaceSerializer, ServiceAreaSerializer, FavoritePlacesSerializer, FavoriteShopsSerializer
)
from core.models import UserProfile, Role, Place, Area, Shop, Item, OrderItem, Order, Address, Coupon, Refund, UserProfile, Variation, ItemVariation, FavoriteShops, FavoritePlaces, ServiceArea

# class ProductofShopListView(g/enerics.ListAPIView):

class ProductofShopListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer

    def get_queryset(self):
        addresses = Address.objects.filter(user=self.request.user).order_by('-create_date')
        return addresses

        # return Item.objects.filter(shop_id=self.kwargs['shop_id'])







