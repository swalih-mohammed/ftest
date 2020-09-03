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
        addresses = Address.objects.filter(
            user=self.request.user).order_by('-create_date')
        return addresses

# product list infinit scroll start


def infinite_product_filter(request):

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    query = request.GET.get('query')
    shop = request.GET.get('shopID')
    # print(query)
    if query == "all":
        queryset = Item.objects.filter(
            shop_id=int(shop), is_active=True)
    else:
        queryset = Item.objects.filter(
            shop_id=int(shop), productategory_id=int(query), is_active=True)
    return queryset.all()[int(offset): int(offset) + int(limit)]


def is_there_more_data(request):
    offset = request.GET.get('offset')
    query = request.GET.get('query')
    shop = request.GET.get('shopID')
    if query == "all":
        count = Item.objects.filter(shop_id=int(shop), is_active=True).count()
        print(count)
        if int(offset) > count:
            print("less")
            return False
        print("not less")
        return True
    else:
        count = Item.objects.filter(shop_id=int(
            shop), productategory_id=int(query), is_active=True).count()
        if int(offset) > count:
            print("less")
            return False
        print("not less")
        return True


class shopProductListInfinitView(generics.ListAPIView):
    serializer_class = ShopProductSerializer

    def get_queryset(self):
        print(self.request.data)
        qs = infinite_product_filter(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "products": serializer.data,
            "has_more": is_there_more_data(request)

        })

# product list infinit scrool end
