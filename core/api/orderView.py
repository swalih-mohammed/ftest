
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
from rest_framework import filters
from core.models import Item, OrderItem, Order

from .serializers import (OrderStatusSerializer,
                          ShopSerializer, ItemSerializer, OrderSerializer, ItemDetailSerializer, AddressSerializer,
                          ShopProductSerializer, UserProfileSerializer, PlaceSerializer, FavoritePlacesSerializer, FavoriteShopsSerializer
                          )
from core.models import OrderStatus, UserProfile, Place, Area, Cluster, Village, District, State, Shop, Item, OrderItem, Order, Address, Coupon, Refund, UserProfile, Variation, ItemVariation, FavoriteShops, FavoritePlaces


def infinite_order_filter(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    # query = request.GET.get('q')
    profile = UserProfile.objects.get(user=request.user)
    queryset = Order.objects.filter(
        user=request.user, ordered=True).order_by('-start_date')
    # queryset =  queryset.all()[int(offset): int(offset) + int(limit)]
    return queryset.all()[int(offset): int(offset) + int(limit)]


def is_there_more_data(request):
    offset = request.GET.get('offset')
    if int(offset) > Order.objects.filter(user=request.user, ordered=True).count():
        return False
    return True


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = infinite_order_filter(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "orders": serializer.data,
            "has_more": is_there_more_data(request)
        })


def is_valid_queryparam(param):
    return param != '' and param is not None


def filter(request):
    qs = Order.objects.all()
    profile = UserProfile.objects.get(user=request.user)

    startDate_contains_query = request.GET.get('staringtDate')
    endDate_contains_query = request.GET.get('endingtDate')
    place_contains_query = request.GET.get('place')

    # area_contains_query = request.GET.get('area')
    # village_contains_query = request.GET.get('village')
    # cluster_contains_query = request.GET.get('cluster')
    # district_contains_query = request.GET.get('distrit')
    # state_contains_query = request.GET.get('state')
    # userType_contains_query = request.GET.get('userType')

    if is_valid_queryparam(place_contains_query):
        qs = qs.filter(shop__place__name=place_contains_query)

    if is_valid_queryparam(startDate_contains_query):
        qs = qs.filter(start_date__gte=startDate_contains_query)

    if is_valid_queryparam(endDate_contains_query):
        qs = qs.filter(start_date__lte=endDate_contains_query)

    # if is_valid_queryparam(area_contains_query):
    #     qs = qs.filter(address__area__name=area_contains_query)

    # if is_valid_queryparam(village_contains_query):
    #     qs = qs.filter(shop__village__name=village_contains_query)

    # if is_valid_queryparam(cluster_contains_query):
    #     qs = qs.filter(shop__cluster__name=cluster_contains_query)

    # if is_valid_queryparam(district_contains_query):
    #     qs = qs.filter(shop__district__name=district_contains_query)

    # if is_valid_queryparam(state_contains_query):
    #     print(state_contains_query)
    #     qs = qs.filter(shop__state__name=state_contains_query)

    if profile.is_staff_user:
        return qs
    else:
        shop = Shop.objects.filter(owner=request.user).first()
        qs = Order.objects.filter(
            shop=shop, ordered=True).order_by('-start_date')
        return qs


class OrderFilterView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = filter(self.request)
        return qs


class OrderSearchView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = Order.objects.all()
        return qs


class OrderStatusListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = OrderStatusSerializer
    queryset = OrderStatus.objects.all()
