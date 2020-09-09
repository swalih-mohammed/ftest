from django_countries import countries
from datetime import datetime, timedelta, time
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
from rest_framework.decorators import api_view

from core.models import Item, OrderItem, Order, AppInfo

from .serializers import (VariationSerializer, ShopProductCategorySerializer, ProductImageSerializer, ModeOfPayment, OrderStatusUpdateserializer, AppInfoSerializer,
    ShopSerializer, ItemSerializer, OrderSerializer, ItemDetailSerializer, AddressSerializer,
    ShopProductSerializer, UserProfileSerializer, PlaceSerializer, ServiceAreaSerializer, FavoritePlacesSerializer, FavoriteShopsSerializer
)
from core.models import ProductImage, ProductCategory, UserProfile, Place, Area, Shop, Item, OrderItem, Order, Address, Coupon, UserProfile, Variation, FavoriteShops, FavoritePlaces, ServiceArea


class AppInfoView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AppInfoSerializer

    def get_queryset(self):
        appInfo = AppInfo.objects.all()
        return appInfo


class ShopDashDetailView(RetrieveAPIView):
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            shop = Shop.objects.filter(owner=self.request.user).first()
            return shop
        except ObjectDoesNotExist:
            raise Http404("shop not found")


class ShopDashOrderView(APIView):
    def get(self, request, *args, **kwargs):
        print(request)
        shop = Shop.objects.filter(owner=request.user).first()
        if shop:
            today = datetime.now().date()
            pendingOrders = Order.objects.filter(
                shop=shop, order_status=1, ordered=True,).count()
            totalOrders = Order.objects.filter(
                shop=shop, ordered=True, ).count()
            item = Item.objects.filter(shop=shop).count()
            return Response({'pendingOrders': pendingOrders, 'totalOrders': totalOrders, 'item': item}, status=HTTP_200_OK)


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


class UserTypeView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = UserProfile.objects.filter(user=self.request.user).first()
            return order
        except ObjectDoesNotExist:
            raise Http404("No user found")


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id, }, status=HTTP_200_OK)


class ServiceAreaView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ServiceAreaSerializer

    def get_queryset(self):
        serviceArea = ServiceArea.objects.filter(user=self.request.user)
        return serviceArea


class orderAddressView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


# infinit scroll for places start

class NewPlaces(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PlaceSerializer
    queryset = Place.objects.all().order_by('-create_date')[:3]


class PlaceShopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        #  place = get_object_or_404(Place, id=self.kwargs['place_id'])
        return Shop.objects.filter(place_id=self.kwargs['place_id'])

class FeaturedShopsInPlace(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        qs =Shop.objects.filter(service_localities__id=self.kwargs['place_id'])
        # return Shop.objects.filter(place_id=self.kwargs['place_id'], is_featured=True)
        return qs

class FeaturedShops(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        return Shop.objects.filter(is_featured=True).order_by('-create_date')[:3]

class ShopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer
    queryset = Shop.objects.all() 

class OrderQuantityUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        # print(request.data)
        id = request.data.get('id', None)
        if id is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Variation, id=id)
        # print(item)
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item_variation__id=item.id).exists():
                order_item = OrderItem.objects.filter(
                    item_variation=item,
                    user=request.user,
                    ordered=False
                )[0]
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    order.items.remove(order_item)
                return Response(status=HTTP_200_OK)
            else:
                return Response({"message": "This item was not in your cart"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class OrderItemDeleteView(DestroyAPIView):
    # print(request.data)
    permission_classes = (IsAuthenticated, )
    queryset = OrderItem.objects.all()


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        shop = request.data.get('shop', None)
        id = request.data.get('id', None)
        v = request.data.get('variation', None)
        # variations = request.data.get('variations', [])
        item = get_object_or_404(Item, id=id)
        variation = get_object_or_404(Variation, id=v)
        # print(variation)
        shop = get_object_or_404(Shop, id=shop)
        # print(shop)
        place_id = shop.place_id
        place = Place.objects.get(id=place_id)
        order_item_qs = OrderItem.objects.filter(
            item=item,
            item_variation=variation,
            user=request.user,
            ordered=False
        )
        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
            # totalll = order_item.get_total()
            # print(totalll)
        else:
            order_item = OrderItem.objects.create(
                item=item,
                item_variation=variation,
                shop=shop,
                user=request.user,
                ordered=False
            )
            # order_item.item_variation.add(variation)
            order_item.save()
            # totalll = order_item.get_total()
            # print(totalll)
            # print("test")

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        # ttoal = order_qs[0].get_total()
        # print(ttoal)

        if order_qs.exists():
            order = order_qs[0]
            shopOfItemInCart = order.shop
            if shop != shopOfItemInCart:
                # print(cart_item_shop)
                # print(shop)
                return Response({"message": "Unable to add this tiem to your bucket as your have an active order from a diffent shop. Please remove that item and try again"}, status=HTTP_400_BAD_REQUEST)

            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)

                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, shop=shop, place=place,  ordered_date=ordered_date)
            order.items.add(order_item)

            return Response(status=HTTP_200_OK)

class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.filter(user=self.request.user, ordered=False).last()
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class OrderConfirmView(APIView):
    def post(self, request, *args, **kwargs):
        # print(request.data)

        shipping_address_id = request.data.get('selectedAddress')
        address = Address.objects.get(id=shipping_address_id)

        paymentmodeID = request.data.get('selectedModeofPayment')
        modeOfPayment = ModeOfPayment.objects.get(id=paymentmodeID)
        # print(modeOfPayment)
        
        
        # print(address)
        if address is None:
            return Response({"message": "Address is required"}, status=HTTP_400_BAD_REQUEST)
        order = Order.objects.get(user=self.request.user, ordered=False)
        userprofile = UserProfile.objects.get(user=self.request.user)
        
        order_items = order.items.all()
        shop_qs1 = order_items.first()
        shop_id = shop_qs1.shop_id
        place_id = shop_qs1.place_id
        shop = Shop.objects.get(id=shop_id)
        place = Place.objects.get(id=shop.place_id)
        # order_status = "Not Accepted by Shop"
        # address = Address.objects.get(id=shipping_address_id)
        # order.address.update(address=address)
        # address = get_object_or_404(Address, id=shipping_address_id)
        order.paymentMode = modeOfPayment
        order.address = address
        order_items.update(ordered=True)
        for item in order_items:
            item.save()
        order.ordered = True
        order.save()

        return Response(status=HTTP_200_OK)


@api_view(['GET', 'PUT',])
def OrderStatusUpdateView(request, pk):
   
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
  
    if request.method == 'PUT':
        serializer = OrderStatusUpdateserializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
        if code is None:
            return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        coupon = get_object_or_404(Coupon, code=code)
        if coupon.is_valid == False:
            print("not valid")
            return Response({"message": "This order is not eligible for the offer"}, status=HTTP_400_BAD_REQUEST)
        order = Order.objects.get(user=self.request.user, ordered=False)
        min_amount = coupon.min_amount
        total = order.get_total()
        shop = order.shop
        place = order.place
        # print(total)
        if total < min_amount:
            print("amount is not eligible ")
            return Response({"message": "This order is not eligible for the offer"}, status=HTTP_400_BAD_REQUEST)
        if coupon.is_only_once_per_user:
            checkOrder = Order.objects.filter(ordered=True, coupon=coupon, user=self.request.user)
            if checkOrder.exists():
                print("not firths order")
                return Response({"message": "This coupon is valid once per user"}, status=HTTP_400_BAD_REQUEST)
        if coupon.is_for_shop_only:
            print(shop)
            shopInCoupon = shop.coupon_set.filter(shops=shop).exists()
            print(shopInCoupon)
            if shopInCoupon == False:
                print("not for this shop")
                return Response({"message": "This coupon is not valid for your shop"}, status=HTTP_400_BAD_REQUEST)
        if coupon.is_for_place_only:
            placeInCoupon = place.coupon_set.filter(places=place).exists()
            if placeInCoupon == False:
                print("not for this place")
                return Response({"message": "This coupon is not valid for your locality"}, status=HTTP_400_BAD_REQUEST)
        start_date = coupon.start_date
        end_date = coupon.expiry_date
        order_date = order.start_date
        offer = coupon.offer

        if order_date > start_date and order_date < end_date:
            print("valid")
            order.coupon = coupon
            order.save()
            return Response({"message": offer },status=HTTP_200_OK)
        else:
            print("old")
            return Response({"message": "Invalid coupon"}, status=HTTP_400_BAD_REQUEST)

# class CountryListView(APIView):
#     def get(self, request, *args, **kwargs):
#         return Response(countries, status=HTTP_200_OK)

class AddressListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer

    def get_queryset(self):
        addresses = Address.objects.filter(user=self.request.user).order_by('-create_date')
        return addresses

class AddressCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class AddressUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class AddressDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Address.objects.all()


class OrderDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Order.objects.all()


class DeliveryStaffOrders(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = OrderSerializer

    def get_queryset(self):
        staff = DeliveryStaff.objects.get(
            user=self.request.user)
        place = Place.objects.get(id=staff.place_id)
        return Order.objects.filter(place=place, ordered=True)


class OrderListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = OrderSerializer

    def get_queryset(self):
        order = Order.objects.filter(user=self.request.user, ordered=True).order_by('-start_date')
        return order

class OrderItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

class FavoriteShopsView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = FavoriteShopsSerializer

    def get_queryset(self):
        favoriteShops = FavoriteShops.objects.filter(user=self.request.user, is_active = True)
        return favoriteShops

class FavoritePlacesView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = FavoritePlacesSerializer

    def get_queryset(self):
        favoritePlaces = FavoritePlaces.objects.filter(user=self.request.user, is_active = True)
        return favoritePlaces

class AddToFavoritePlacesView(APIView):
    def post(self, request, *args, **kwargs):
        place = request.data.get('place', None)
        place = get_object_or_404(Place, id=place)
        
        wish_list_qs = FavoritePlaces.objects.filter(user=request.user,place=place, is_active=True)
        if wish_list_qs.exists():
            # print("alredy exist")
            return Response({"message": "This shop already exists in your favorite list "}, status=HTTP_400_BAD_REQUEST)
        wish_list_qs_2 = FavoritePlaces.objects.filter(user=request.user,place=place, is_active=False)
        if wish_list_qs_2.exists():
            test = wish_list_qs_2[0]
            test.is_active = True
            test.save()
            print("false changed to true")
            return Response(status=HTTP_200_OK)
        else:
            wish_list_qs_3 = FavoritePlaces.objects.create(
                user=request.user, place=place, is_active = True)
            wish_list_qs_3.save()
            print("new added")
            return Response(status=HTTP_200_OK)

class AddToFavoriteShopsView(APIView):
    def post(self, request, *args, **kwargs):
        shop = request.data.get('shop', None)
        shop = get_object_or_404(Shop, id=shop)
        
        wish_list_qs = FavoriteShops.objects.filter(user=request.user,shop=shop, is_active=True)
        if wish_list_qs.exists():
            print("alredy exist")
            return Response({"message": "This shop already exists in your favorite list "}, status=HTTP_400_BAD_REQUEST)
        wish_list_qs_2 = FavoriteShops.objects.filter(user=request.user,shop=shop, is_active=False)
        if wish_list_qs_2.exists():
            test = wish_list_qs_2[0]
            test.is_active = True
            test.save()
            print("false changed to true")
            return Response(status=HTTP_200_OK)
        else:
            wish_list_qs_3 = FavoriteShops.objects.create(
                user=request.user, shop=shop, is_active = True)
            wish_list_qs_3.save()
            print("new added")
            return Response(status=HTTP_200_OK)

class RemoveFromFavoriteShopsView(GenericAPIView, UpdateModelMixin):
    permission_classes = (IsAuthenticated, )
    serializer_class = FavoriteShopsSerializer
    queryset = FavoriteShops.objects.all()

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
class RemoveFromFavoritePlacesView(GenericAPIView, UpdateModelMixin):
    permission_classes = (IsAuthenticated, )
    serializer_class = FavoritePlacesSerializer
    queryset = FavoritePlaces.objects.all()

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


