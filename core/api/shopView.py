
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
from rest_framework.decorators import api_view

from core.models import ModeOfPayment, Shop, Candidate, Compliant, Taxi, Cooli
from .serializers import (ModeOfPaymentSerializer, ShopSerializer, ShopSerializer,
                          CooliSerializer, TaxiSerializer, CandidateSerializer, ComplaintSerializer)


class FeaturedShopsInPlace(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        qs = Shop.objects.filter(
            service_localities__id=self.kwargs['place_id'], is_active=True)
        # return Shop.objects.filter(place_id=self.kwargs['place_id'], is_featured=True)
        return qs


class FeaturedShops(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        return Shop.objects.filter(is_featured=True, is_active=True).order_by('-create_date')[:3]


class ShopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()


class PlaceShopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        #  place = get_object_or_404(Place, id=self.kwargs['place_id'])
        return Shop.objects.filter(place_id=self.kwargs['place_id'], is_active=True)


@api_view(['GET', 'PUT', ])
def ShopDashOpenStatusView(request, pk):
    try:
        # shop = Shop.objects.filter(owner=self.request.user).first()
        shop = Shop.objects.get(pk=pk)
    except shop.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ShopSerializer(shop, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class ShopDashDetailView(RetrieveAPIView):
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            shop = Shop.objects.filter(owner=self.request.user).first()
            return shop
        except ObjectDoesNotExist:
            raise Http404("shop not found")


class ShopAddView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()


class AddCandidateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()


class AddComplaintView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ComplaintSerializer
    queryset = Compliant.objects.all()


class PlaceTaxiListView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = TaxiSerializer
    queryset = Taxi.objects.all()


class PlaceCooliListView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CooliSerializer
    queryset = Cooli.objects.all()


def is_valid_queryparam(param):
    return param != '' and param is not None


def filter(request):
    # print("filter")
    qs = Shop.objects.all()
    # place_contains_query = request.GET.get('area')
    place_contains_query = request.GET.get('place')
    village_contains_query = request.GET.get('village')
    cluster_contains_query = request.GET.get('cluster')
    district_contains_query = request.GET.get('distrit')
    state_contains_query = request.GET.get('state')
    # print(place_contains_query,village_contains_query, cluster_contains_query, district_contains_query, state_contains_query,)

    if is_valid_queryparam(place_contains_query):
        qs = Shop.objects.filter(place_name=place_contains_query)

    if is_valid_queryparam(village_contains_query):
        qs = Shop.objects.filter(village_name=village_contains_query)

    if is_valid_queryparam(cluster_contains_query):
        qs = Shop.objects.filter(cluster_name=cluster_contains_query)

    if is_valid_queryparam(district_contains_query):
        qs = Shop.objects.filter(district_name=district_contains_query)

    if is_valid_queryparam(state_contains_query):
        qs = Shop.objects.filter(state_name=state_contains_query)

    return qs

# class ShopFilterView(generics.ListAPIView):


class ShopFilterView(generics.ListAPIView):
    serializer_class = ShopSerializer

    def get_queryset(self):
        qs = filter(self.request)
        return qs


class ShopsDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()


class ShopsModOfPaymentView(generics.ListAPIView):
    serializer_class = ModeOfPaymentSerializer

    def get_queryset(self):
        # return Village.objects.all()
        queryset = ModeOfPayment.objects.all()
        shopID = self.request.query_params.get('shopID', None)
        if shopID is not None:
            queryset = queryset.filter(shop=shopID)
        return queryset
