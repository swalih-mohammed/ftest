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
# from rest_framework.response import Response
# from rest_framework import viewsets


from core.models import Item, OrderItem, Order, AppInfo

from .serializers import (ShopProductCategorySerializer,ProductImageSerializer,ModeOfPayment, OrderStatusUpdateserializer, AppInfoSerializer,
    ShopSerializer, ItemSerializer, OrderSerializer, ItemDetailSerializer, AddressSerializer,
    ShopProductSerializer, UserProfileSerializer, PlaceSerializer, ServiceAreaSerializer, FavoritePlacesSerializer, FavoriteShopsSerializer
)
from core.models import ProductImage, ProductCategory,UserProfile, Place, Area, Shop, Item, OrderItem, Order, Address, Coupon, Refund, UserProfile, Variation, ItemVariation, FavoriteShops, FavoritePlaces, ServiceArea


class AppInfoView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AppInfoSerializer

    def get_queryset(self):
        appInfo= AppInfo.objects.all()
        return appInfo

# class StateListView(ListAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = StateSerializer

class UserTypeView(APIView):
    def get(self, request, *args, **kwargs):
        profile = UserProfile.objects.get(user=request.user)
        if profile.is_shop_owner:
            print("is_shop_owner")
            return Response({'UserType': "ShopOwner", 'userID': request.user.id, 'userName': request.user.username}, status=HTTP_200_OK)
        elif profile.is_staff_user:
            print("is_staff_user")
            return Response({'UserType': "is_staff_user", 'userID': request.user.id, 'userName': request.user.username}, status=HTTP_200_OK)
        elif profile.is_delivery_staff:
            print("is_delivery_staff")
            return Response({'UserType': "DeliveryStaff", 'userID': request.user.id, 'userName': request.user.username}, status=HTTP_200_OK)
        else:
            print("customer")
            return Response({'UserType': "Customer", 'userID': request.user.id, 'userName': request.user.username}, status=HTTP_200_OK)

class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id, }, status=HTTP_200_OK)

class ServiceAreaView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ServiceAreaSerializer

    def get_queryset(self):
        serviceArea= ServiceArea.objects.filter(user=self.request.user)
        return serviceArea

class orderAddressView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


# infinit scroll for places start

class NewPlaces(ListAPIView):

    permission_classes = (AllowAny,)
    serializer_class = PlaceSerializer
    queryset = Place.objects.all().order_by('-create_date')[:3]


class PlaceShopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        return Shop.objects.filter(place_id=self.kwargs['place_id'])

class FeaturedShopsInPlace(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        return Shop.objects.filter(place_id=self.kwargs['place_id'], is_featured=True)

class FeaturedShops(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer

    def get_queryset(self):
        return Shop.objects.filter(is_featured=True).order_by('-create_date')[:3]

class ShopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopSerializer
    queryset = Shop.objects.all() 


class ShopFProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductSerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        return Item.objects.filter(shop_id=self.kwargs['shop_id'], is_featured=True )


class AddProductView(APIView):
    def post(self, request, *args, **kwargs):
        # permission_classes = (AllowAny, )
        # serializer_class = ShopProductSerializer
        # queryset = Item.objects.all()
        print(request.data)
        user = request.data.get('userID', None)
        shop = Shop.objects.filter(owner=user).first() 
        print(shop)
        title = request.data.get('title', None)
        title_local = request.data.get('title_local', None)
        item_quantity = request.data.get('item_quantity', None)
        price = request.data.get('price', None)
        discount_price = request.data.get('discount_price', None)
        productategory = request.data.get('productategory', None)
        productategory = get_object_or_404(ProductCategory, id=productategory)
        product_image = request.data.get('product_image', None)
        product_image = get_object_or_404(ProductImage, id=product_image)
        is_on_sale = request.data.get('userID', None)
        is_available = request.data.get('userID', None)
        is_featured = request.data.get('userID', None)
        
        item = Item.objects.create(shop=shop,
                title=title, title_local=title_local,  item_quantity=item_quantity,  price=price,  discount_price=discount_price,  productategory=productategory,  product_image=product_image,is_available=is_available, is_on_sale=is_on_sale, is_featured=is_featured)
        item.save()
        return Response(status=HTTP_200_OK)

class ShopProductCategoryListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductCategorySerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        shop = Shop.objects.filter(owner=self.kwargs['owner_id']).first() 
        qs = ProductCategory.objects.filter(shop =shop)
        return qs
       

class ProductImageListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ProductImageSerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        print(self.kwargs)
        return ProductImage.objects.filter(productCategory=self.kwargs['cateogry_id'] )


class ShopProductListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductSerializer
    # queryset = Item.objects.all()

    def get_queryset(self):
        return Item.objects.filter(shop_id=self.kwargs['shop_id'])

class ProductListForShopView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ShopProductSerializer
    
    def get_queryset(self):
        # user = User.objects.get_object_or_404(id=)
        shop = Shop.objects.filter(owner_id=self.kwargs['owner_id'] ).first()
        if shop is None:
            return Response({"message": "No shop found"}, status=HTTP_400_BAD_REQUEST)
        # print(shop)
        return Item.objects.filter(shop=shop )
      
# class ProductUpdateForShopView(UpdateAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = ShopProductSerializer
#     queryset = Item.objects.all()

class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()


class OrderQuantityUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        # print(request.data)
        id = request.data.get('id', None)
        if id is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, id=id)
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item__id=item.id).exists():
                order_item = OrderItem.objects.filter(
                    item=item,
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
        # print(request.data)
        shop = request.data.get('shop', None)
        id = request.data.get('id', None)
        # variations = request.data.get('variations', [])
        item = get_object_or_404(Item, id=id)
        # print(item)
        shop = get_object_or_404(Shop, id=shop)
        place_id = shop.place_id
        place = Place.objects.get(id=place_id)
        # qs_user_address = Address.objects.filter(
        #     user=request.user)
        # shipping_address = qs_user_address[0]
        # address = qs_user_address.first()

        # if not shipping_address:
        #     return Response({"message": "Please add a delivery address from profile page"}, status=HTTP_400_BAD_REQUEST)
        # else:
            

            # minimum_variation_count = Variation.objects.filter(
            #     item=item).count()
            # if len(variations) < minimum_variation_count:
            #     return Response({"message": "Please specify the required variation types"}, status=HTTP_400_BAD_REQUEST)

        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=request.user,
            # shop=shop,
            ordered=False
        )

        # for v in variations:
        #     order_item_qs = order_item_qs.filter(
        #         Q(item_variations__exact=v)
        #     )

        if order_item_qs.exists():

            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:

            order_item = OrderItem.objects.create(
                item=item,
                shop=shop,
                # place=place,
                # shipping_address=shipping_address,
                user=request.user,
                ordered=False
            )
            # order_item.item_variations.add(*variations)
            order_item.save()
            # print(order_item.shop_id)

        order_qs = Order.objects.filter(user=request.user, ordered=False)

        if order_qs.exists():
            order = order_qs[0]

            myorder = OrderItem.objects.filter(
                user=self.request.user, ordered=False)
            order1 = myorder[0]
            cart_item_shop_id = order1.item.shop_id
            cart_item_shop = Shop.objects.get(id=cart_item_shop_id)
            # print(cart_item_shop)
            # print(shop)

            if shop != cart_item_shop:
                # print(cart_item_shop)
                # print(shop)
                return Response({"message": "Unable to add this tiem to your bucket as your have an active order from a diffent shop. Please remove that item and try again"}, status=HTTP_400_BAD_REQUEST)

            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)

                return Response(status=HTTP_200_OK)

        # else:
            # ordered_date = timezone.now()
            # order = Order.objects.create(
            #     user=request.user, shop=shop, address=address, place=place, ordered_date=ordered_date)
            # order.items.add(order_item)

            # return Response(status=HTTP_200_OK)
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
        print(request.data)

        shipping_address_id = request.data.get('selectedAddress')
        address = Address.objects.get(id=shipping_address_id)

        paymentmodeID = request.data.get('selectedModeofPayment')
        modeOfPayment = ModeOfPayment.objects.get(id=paymentmodeID)
        print(modeOfPayment)
        
        
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
    print(pk)
    """
    """
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



class ProductUpdateForShopView(GenericAPIView, UpdateModelMixin):
    '''
    You just need to provide the field which is to be modified.
    '''
    queryset = Item.objects.all()
    serializer_class = ShopProductSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

# class ProductUpdateForShopView(UpdateAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = ShopProductSerializer
#     queryset = Item.objects.all()


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
        if code is None:
            return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
        order = Order.objects.get(
            user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


class CountryListView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(countries, status=HTTP_200_OK)

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
            print("alredy exist")
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



# class OrderListView(ListAPIView):
#     permission_classes = (IsAuthenticated, )
#     serializer_class = OrderSerializer

#     def get_queryset(self):
#         return Order.objects.filter(user=self.request.user)
