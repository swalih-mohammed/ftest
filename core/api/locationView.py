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
from .serializers import PlaceSerializer, StateSerializer, DistrictSerializer, ClusterSerializer, VillageSerializer, AreaSerializer, ServiceAreaSerializer

from core.models import ServiceArea, Shop, UserProfile, Area, Place, Village, Cluster, District, State


class ServiceAreaView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ServiceAreaSerializer

    def get_queryset(self):
        serviceArea = ServiceArea.objects.filter(user=self.request.user)
        return serviceArea


class NewPlaces(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PlaceSerializer
    queryset = Place.objects.all().order_by('-create_date')[:3]


class StateListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = StateSerializer

    def get_queryset(self):
        states = State.objects.all()
        return states


def is_valid_queryparam(param):
    return param != '' and param is not None


def filter(request):
    qs = District.objects.all()
    # print("catch")
    place_contains_query = request.GET.get('stateID')
    print(place_contains_query)

    if is_valid_queryparam(place_contains_query):
        qs = District.objects.filter(state=place_contains_query)

# class DistrictListView(generics.ListAPIView):
#     serializer_class = DistrictSerializer

#     def get_queryset(request):
#         if request.method == 'GET':
#             stateID = request.GET.get('stateID')
#             qs = District.objects.filter(state = stateID)
#             # qs = filter(self.request)
#             return qs


class DistrictFilterView(generics.ListAPIView):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = District.objects.all()
        stateID = self.request.query_params.get('stateID', None)
        if stateID is not None:
            queryset = queryset.filter(state_id=stateID)
        return queryset


class ClusterFilterView(ListAPIView):
    serializer_class = ClusterSerializer

    def get_queryset(self):
        qs = Cluster.objects.all()
        return qs


class VillageFilterView(generics.ListAPIView):
    serializer_class = VillageSerializer

    def get_queryset(self):
        # return Village.objects.all()
        queryset = Village.objects.all()
        districtID = self.request.query_params.get('districtID', None)
        if districtID is not None:
            queryset = queryset.filter(villageDistrict_id=districtID)
        return queryset


class PlaceFilterView(generics.ListAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        queryset = Place.objects.all()
        villageID = self.request.query_params.get('villageID', None)
        if villageID is not None:
            queryset = queryset.filter(village_id=villageID)
        return queryset


class AreaFilterView(generics.ListAPIView):
    serializer_class = AreaSerializer

    def get_queryset(self):
        queryset = Area.objects.all()
        placeID = self.request.query_params.get('placeID', None)
        if placeID is not None:
            queryset = queryset.filter(place_id=placeID)
        return queryset

# class AreaFilterView(generics.ListAPIView):
#     serializer_class = AreaSerializer
#     def get_queryset(self):
#         queryset = Area.objects.all()
#         placeID = self.request.query_params.get('placeID', None)
#         # userType = self.request.query_params.get('userType', None)
#         if placeID is not None:
#             queryset = queryset.filter(place_=placeID)
#         # if userType == "shop_owner":
#         shop = Shop.objects.filter(owner=self.request.user).first()
#         field_name = 'place'
#         field_value = getattr(shop, field_name)
#         queryset = Area.objects.filter(place = field_value)
#         # print(field_value)

#         return queryset


class ClusterFilterView(ListAPIView):
    serializer_class = ClusterSerializer

    def get_queryset(self):
        qs = Cluster.objects.all()
        return qs

# class VillageListView(ListAPIView):
#     serializer_class = VillageSerializer

#     def get_queryset(self):
#     	qs = Village.objects.all()
#     	return qs

# class PlacesListView(ListAPIView):
#     serializer_class = PlaceSerializer

#     def get_queryset(self):
#     	qs = Place.objects.all()
#     	return qs

# class AreaListView(ListAPIView):
#     serializer_class = AreaSerializer

#     def get_queryset(self):
#     	qs = Area.objects.all()
#     	return qs


def infinite_place_filter(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    query = request.GET.get('q')
    # print(query == "all")
    if query != "all":
        # print("not all")
        print(query)
        queryset = Place.objects.filter(Q(name__icontains=query)).distinct()
        return queryset.all()[int(offset): int(offset) + int(limit)]
    else:
        print("all")
        return Place.objects.all()[int(offset): int(offset) + int(limit)]


def is_there_more_data_place(request):
    offset = request.GET.get('offset')
    if int(offset) > Place.objects.all().count():
        return False
    return True


class PlaceListView(generics.ListAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        qs = infinite_place_filter(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "places": serializer.data,
            "has_more": is_there_more_data_place(request)
        })

# class PlaceListView(ListAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = PlaceSerializer
#     queryset = Place.objects.all()

# infinit scroll for places end

        # query_contains_state = request.GET.get('state')
        # if query_contains_state:
     #    	qs = District.objects.filter(state=query_contains_state)
     #    	return qs.all()

        # print("no")


class PlaceDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()
