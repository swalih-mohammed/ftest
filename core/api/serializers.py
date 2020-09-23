from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from core.models import (ProductCategory, ProductImage, AppInfo, ModeOfPayment, Candidate, Compliant, Taxi, Cooli, OrderStatus,
                         UserProfile, Address, ServiceArea, Area, Place, Village, Cluster, District, State, Shop, Item, Order, OrderItem, Coupon, Variation, Variation, Area, FavoritePlaces, FavoriteShops

                         )


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


# class CouponSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Coupon
#         fields = (
#             'id',
#             'code',
#             'amount'
        # )


class AppInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppInfo
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    place = serializers.SerializerMethodField()
    userName = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_place(self, obj):
        # return AddressSerializer(obj.get_address()).data
        # return obj.get_address()
        return obj.get_place()


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class ShopProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    # image = serializers.ReadOnlyField(source='product_image.image')
    product_image = serializers.ReadOnlyField(
        source='product_image.image1.url')

    class Meta:
        model = Item
        fields = '__all__'
        # fields = (
        #     'id',
        #     'shop',
        #     'title',
        #     'price',
        #     'discount_price',
        #     'category_name',
        #     'slug',
        #     'description',
        #     'image',
        #     'is_available'
        # )


class AreaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Area
        fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
    village_name = serializers.ReadOnlyField(source='village.name')
    # district_name = serializers.ReadOnlyField(source='district.name')
    # state_name = serializers.ReadOnlyField(source='state.name')

    class Meta:
        model = Place
        fields = '__all__'


class VillageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Village
        fields = '__all__'


class ClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cluster
        fields = '__all__'


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'


class ServiceAreaSerializer(serializers.ModelSerializer):
    areas = StringSerializer(many=True)
    places = StringSerializer(many=True)
    villages = StringSerializer(many=True)
    clusters = StringSerializer(many=True)
    districts = StringSerializer(many=True)
    states = StringSerializer(many=True)

    class Meta:
        model = ServiceArea
        fields = '__all__'


class ShopSerializer(serializers.ModelSerializer):
    place = serializers.ReadOnlyField(source='place.name')
    village = serializers.ReadOnlyField(source='village.name')
    district = serializers.ReadOnlyField(source='district.name')

    class Meta:
        model = Shop
        fields = '__all__'


class ShopProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    shop_name = serializers.ReadOnlyField(source='shop.name')
    variations = serializers.SerializerMethodField()
    # v_availability = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()
    item_in_order = serializers.SerializerMethodField()
    update_v_availability = serializers.SerializerMethodField()
    stock_of_varitations = serializers.SerializerMethodField()
    order_of_varitations = serializers.SerializerMethodField()
    v_availability = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'
        # fields = (
        #     'id',
        #     'shop_name',
        #     'title',
        #     'price',
        #     'discount_price',
        #     'category_name',
        #     'description',
        #     'image',
        #     'is_available'
        #     ''
        # )

    def get_variations(self, obj):
        # # print("tesing from getting vari")
        # # variation = obj.get_v_availability()
        # variations = obj.get_variations()
        # item = Item.objects.get(id=obj.id)
        # # print(item)

        # test = False
        # for v in variations:
        #     if v.stock_count < 1:
        #         test = True
        # # test = test
        # if test:
        #     # print("No")
        #     # print(item)
        #     serializer = ItemSerializer(
        #         item,  data={'v_is_available': False}, partial=True)
        #     if serializer.is_valid():
        #         serializer.save()
        #     item.save()
        #     print(item)
        #     print(item.v_is_available)
        #     item.save()
        # else:
        #     # print("Yes")
        #     # print(item)
        #     serializer = ItemSerializer(
        #         item,  data={'v_is_available': True}, partial=True)
        #     if serializer.is_valid():
        #         serializer.save()
        #         item.save()

        return VariationSerializer(obj.variation_set.all(), many=True).data

    def get_update_v_availability(self, obj):
        variations = obj.get_variations()
        # print(variations)
        for v in variations:
            variation = Variation.objects.get(id=v.id)
            # print(variation)
            if variation.stock_count < 1:
                # print("less than one")
                serializer = VariationSerializer(
                    variation,  data={'is_available': False}, partial=True)
            else:
                serializer = VariationSerializer(
                    variation,  data={'is_available': True}, partial=True)
            if serializer.is_valid():
                serializer.save()
            variation.save()

    # def item_available(self, obj):
    #     item_is_available = obj.check_if_available()
    #     if item_is_available:
    #         print("item is available")
    #         return None
    #     else:
    #         print("item is not available")
    #         item = Item.objects.get(id=obj.id)
    #         serializer = ItemSerializer(
    #             item,  data={'is_available': False}, partial=True)
    #         if serializer.is_valid():
    #             serializer.save()
    #         item.save()

    def get_v_availability(self, obj):
        test = obj.get_v_availability()
        item = Item.objects.get(id=obj.id)
        if test:

            serializer = ItemSerializer(
                item,  data={'v_is_available': True}, partial=True)
            if serializer.is_valid():
                serializer.save()
                item.save()
        else:

            serializer = ItemSerializer(
                item,  data={'v_is_available': False}, partial=True)
            if serializer.is_valid():
                serializer.save()
            item.save()

    def get_product_image(self, obj):
        return obj.get_image()

    def get_item_in_order(self, obj):
        return obj.item_in_order()

    def get_stock_of_varitations(self, obj):
        return obj.stock_of_varitations()

    # def get_order_of_variations(self, obj):
    #     test = obj.get_variations()
    def get_order_of_varitations(self, obj):
        return obj.order_of_varitations()


class VariationSerializer(serializers.ModelSerializer):
    is_in_stock = serializers.SerializerMethodField()
    check_in_order = serializers.SerializerMethodField()

    shop = serializers.SerializerMethodField()

    class Meta:
        model = Variation
        fields = (
            'id',
            'name',
            'price',
            'discount_price',
            'item',
            'is_available',
            'is_in_stock',
            'stock_count',
            'item_stock',
            'shop',
            'check_in_order'
        )

    def get_is_in_stock(self, obj):
        return obj.check_if_available()

    def get_shop(self, obj):
        # pass
        return obj.v_shop()

    def get_check_in_order(self, obj):
        return obj.check_in_order()


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    # order_id = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    item_image = serializers.SerializerMethodField()
    shop_name = serializers.ReadOnlyField(source='shop.name')
    itemName = serializers.ReadOnlyField(source='item.title')
    itemLocalName = serializers.ReadOnlyField(source='item.title_local')
    vname = serializers.ReadOnlyField(source='item_variation.name')
    vdiscount_price = serializers.ReadOnlyField(
        source='item_variation.discount_price')

    class Meta:
        model = OrderItem
        fields = '__all__'
        # fields = (
        #     'id',
        #     'item',
        #     'item_variations',
        #     'final_price',
        #     'quantity',
        #     'ordered',
        #     'shop_name'
        # )

    def get_final_price(self, obj):
        return obj.final_price()

    def get_item_image(self, obj):
        return obj.item_image()

    # def get_order_id(self, obj):
    #     return obj.order_number()


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    coupon_code = serializers.SerializerMethodField()
    coupon_offer = serializers.SerializerMethodField()

    # items_count = serializers.SerializerMethodField()
    # order_status = serializers.SerializerMethodField()
    # order_status = serializers.DateField(format="%Y-%m-%d %H:%M:%S")
    start_date = serializers.DateTimeField(format="%d-%m-%Y")
    shop_name = serializers.ReadOnlyField(source='shop.name')
    shipping_message = serializers.ReadOnlyField(
        source='shop.shipping_message')
    place_name = serializers.ReadOnlyField(source='place.name')
    area_name = serializers.ReadOnlyField(source='address.area.name')
    mobile_number = serializers.ReadOnlyField(source='address.phone_number')
    customer_name = serializers.ReadOnlyField(source='user.username')
    orderStatus = serializers.ReadOnlyField(source='order_status.name')
    mode_of_payment = serializers.ReadOnlyField(source='paymentMode.name')

    # order_status = serializers.PrimaryKeyRelatedField(queryset=OrderStatus.objects.all())
    # shop_name = serializers.ReadOnlyField(source='shop.name')

    class Meta:
        model = Order
        # fields = '__all__'
        fields = (
            'id',
            'order_items',
            'status',
            'coupon_code',
            'coupon_offer',
            'total',
            'coupon',
            'shop_name',
            'shop_id',
            'shipping_message',
            'order_status',
            'address',
            'start_date',
            'mode_of_payment',
            'place_name',
            'customer_name',
            'orderStatus',
            'area_name',
            'mobile_number'
        )

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    # def get_items_count(self, obj):
    #     return OrderItemSerializer(obj.items.count, many=True).data

    def get_total(self, obj):
        return obj.get_total()

    def get_status(self, obj):
        return obj.get_order_status()

    def get_coupon_code(self, obj):
        if obj.coupon:
            return obj.get_order_coupon_code()
        return None

    def get_coupon_offer(self, obj):
        if obj.coupon:
            return obj.get_order_coupon_offer()
        return None


# class VariationSerializer(serializers.ModelSerializer):
#     item_variations = serializers.SerializerMethodField()

#     class Meta:
#         model = Variation
#         fields = (
#             'id',
#             'name',
#             'item_variations'
#         )

#     def get_item_variations(self, obj):
#         return ItemVariationSerializer(obj.itemvariation_set.all(), many=True).data


class ItemDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    variations = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'title_local',
            'category',
            'is_available',
            'is_featured',
            'is_on_sale',
            'image',
            'variations'
        )

    def get_category(self, obj):
        return obj.get_category()

    def get_image(self, obj):
        return obj.get_image()

    def get_variations(self, obj):
        return VariationSerializer(obj.variation_set.all(), many=True).data


class AddressSerializer(serializers.ModelSerializer):
    areaName = serializers.ReadOnlyField(source='area.name')
    PlaceName = serializers.ReadOnlyField(source='place.name')
    vilalgeName = serializers.ReadOnlyField(source='village.name')
    districtName = serializers.ReadOnlyField(source='district.name')
    stateName = serializers.ReadOnlyField(source='state.name')
    # country = CountryField()

    class Meta:
        model = Address
        fields = '__all__'


class OrderStatusUpdateserializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


class CandidateSerializer(serializers.ModelSerializer):
    # country = CountryField()

    class Meta:
        model = Candidate
        fields = '__all__'


class ComplaintSerializer(serializers.ModelSerializer):
    # country = CountryField()

    class Meta:
        model = Compliant
        fields = '__all__'


class TaxiSerializer(serializers.ModelSerializer):
    # country = CountryField()

    class Meta:
        model = Taxi
        fields = '__all__'


class CooliSerializer(serializers.ModelSerializer):
    # country = CountryField()

    class Meta:
        model = Cooli
        fields = '__all__'


class ModeOfPaymentSerializer(serializers.ModelSerializer):
    # country = CountryField()

    class Meta:
        model = ModeOfPayment
        fields = '__all__'


class FavoritePlacesSerializer(serializers.ModelSerializer):
    place_name = serializers.ReadOnlyField(source='place.name')
    place_image = serializers.ReadOnlyField(source='place.image.url')
    # place_village_name = serializers.ReadOnlyField(source='place.village')
    # place_district_name = serializers.ReadOnlyField(source='place.district')
    # place_state_name = serializers.ReadOnlyField(source='place.state')

    class Meta:
        model = FavoritePlaces
        fields = '__all__'
        # fields = (
        #     'id',
        #     'place',
        #     'place_name',
        #     'place_image'
        # )


class FavoriteShopsSerializer(serializers.ModelSerializer):
    shop_name = serializers.ReadOnlyField(source='shop.name')
    shop_place_name = serializers.ReadOnlyField(source='shop.place.name')
    shop_image = serializers.ReadOnlyField(source='shop.image.url')
    # shop_village_name = serializers.ReadOnlyField(source='shop.place.village')
    # shop_category_name = serializers.ReadOnlyField(source='shop.category')

    class Meta:
        model = FavoriteShops
        fields = '__all__'
