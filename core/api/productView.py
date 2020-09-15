from django_countries import countries
from django.contrib import humanize
from rest_framework.mixins import UpdateModelMixin
from django.db.models import Q
from django.conf import settings

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
from core.models import Item, OrderItem, Order, ProductCategory

from .serializers import (ShopProductCategorySerializer, VariationSerializer, ProductImageSerializer,
                          ShopSerializer, ItemSerializer, OrderSerializer, ItemDetailSerializer, AddressSerializer,
                          ShopProductSerializer, UserProfileSerializer, PlaceSerializer, ServiceAreaSerializer, FavoritePlacesSerializer, FavoriteShopsSerializer
                          )
from core.models import ProductImage, UserProfile, Role, Place, Area, Shop, Item, OrderItem, Order, Address, Coupon, UserProfile, Variation, FavoriteShops, FavoritePlaces, ServiceArea

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
        # print("not less")
        return True
    else:
        count = Item.objects.filter(shop_id=int(
            shop), productategory_id=int(query), is_active=True).count()
        if int(offset) > count:
            # print("less")
            return False
        # print("not less")
        return True


class shopProductListInfinitView(generics.ListAPIView):
    serializer_class = ShopProductSerializer

    def get_queryset(self):
        # print(self.request.data)
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


class AddProductVariationView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        item = request.data.get('item', None)
        name = request.data.get('name', None)
        price = request.data.get('price', None)
        discount_price = request.data.get('discount_price', None)
        is_available = request.data.get('is_available', None)
        item = get_object_or_404(Item, id=item)
        varitation = Variation.objects.create(item=item, name=name,
                                              price=price, discount_price=discount_price, is_available=is_available)
        varitation.save()
        return Response(status=HTTP_200_OK)


class UpdateVariation(GenericAPIView, UpdateModelMixin):
    queryset = Variation.objects.all()
    serializer_class = VariationSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class AddProductView(APIView):
    def post(self, request, *args, **kwargs):
        title = request.data.get('title', None)
        title_local = request.data.get('title_local', None)
        # item_quantity = request.data.get('item_quantity', None)
        # price = request.data.get('price', None)
        # discount_price = request.data.get('discount_price', None)
        productategory = request.data.get('productategory', None)
        product_image = request.data.get('product_image', None)
        is_on_sale = request.data.get('is_on_sale', None)
        is_available = request.data.get('is_available', None)
        is_featured = request.data.get('is_featured', None)

        shop = Shop.objects.filter(owner=request.user).first()
        productategory = get_object_or_404(ProductCategory, id=productategory)
        product_image = get_object_or_404(ProductImage, id=product_image)
        # item = Item.objects.create(shop=shop,
        #         title=title, title_local=title_local,  item_quantity=item_quantity,  price=price,  discount_price=discount_price,  productategory=productategory,  product_image=product_image,is_available=is_available, is_on_sale=is_on_sale, is_featured=is_featured)
        item = Item.objects.create(shop=shop,
                                   title=title, title_local=title_local, productategory=productategory,  product_image=product_image, is_available=is_available, is_on_sale=is_on_sale, is_featured=is_featured)
        item.save()
        return Response(status=HTTP_200_OK)


class ShopProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductSerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        return Item.objects.filter(shop_id=self.kwargs['shop_id'])

# product list infinit view for shops start


def product_filter(request):
    # print(request.data)
    queryset = Item.objects.all()

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    query = request.GET.get('query')
    owner = request.GET.get('owner')
    OutOfStock = request.GET.get('outOfStock')
    print(OutOfStock == True)
    shop = Shop.objects.filter(owner=owner).first()

    if OutOfStock == "true":
        queryset = queryset.filter(v_is_available=False)
        # v_is_available=False
    queryset = queryset.filter(shop=shop)

    if query == "all":
        queryset = queryset.all()
    else:
        queryset = queryset.filter(productategory_id=int(query))

    return queryset.all()[int(offset): int(offset) + int(limit)]


def is_there_more_data(request):
    queryset = Item.objects.all()
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    query = request.GET.get('query')
    owner = request.GET.get('owner')

    shop = Shop.objects.filter(owner=owner).first()
    queryset = queryset.filter(shop=shop)

    if query == "all":
        count = queryset.all().count()
        if int(offset) > count:
            # print(count)
            return False
        # print(count)
        return True
    else:
        count = queryset.filter(productategory_id=int(query)).count()
        if int(offset) > count:
            # print(count)
            return False
        # print(count)
        return True


class ProductListInfinitForShopView(generics.ListAPIView):
    serializer_class = ShopProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        print(self.request.data)
        qs = product_filter(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "products": serializer.data,
            "has_more": is_there_more_data(request)
        })

# infinti product shop view end


class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()


class ProductUpdateForShopView(GenericAPIView, UpdateModelMixin):
    queryset = Item.objects.all()
    serializer_class = ShopProductSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ProductImageListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductImageSerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        print(self.kwargs)
        return ProductImage.objects.filter(productCategory=self.kwargs['cateogry_id'])


class ShopProductCategoryForCustomerListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductCategorySerializer

    def get_queryset(self):
        shop = get_object_or_404(Shop, id=self.kwargs['shop_id'])
        qs = ProductCategory.objects.filter(shop=shop)
        return qs


class ShopProductCategoryListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductCategorySerializer

    def get_queryset(self):
        shop = Shop.objects.filter(owner=self.kwargs['owner_id']).first()
        qs = ProductCategory.objects.filter(shop=shop)
        return qs


class DeleteVariation(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Variation.objects.all()


class ShopFProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductSerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        return Item.objects.filter(shop_id=self.kwargs['shop_id'], is_featured=True)


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
