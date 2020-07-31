from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from core.models import ( ModeOfPayment, Candidate, Compliant, Taxi, Cooli,OrderStatus,
    UserProfile, Address, ServiceArea, Area, Place, Village, Cluster, District, State, Shop, Item, Order, OrderItem, Coupon, Variation, ItemVariation, Area,FavoritePlaces, FavoriteShops

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

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

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
        #     'slug',
        #     'description',
        #     'image',
        #     'is_available'
        # )


class VariationDetailSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    class Meta:
        model = Variation
        fields = (
            'id',
            'name',
            'item',
        )

    def get_item(self, obj):
        return ItemSerializer(obj.item).data


class ItemVariationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariation
        fields = (
            'id',
            'value',
            'attachment',
            'variation'
        )

    def get_variation(self, obj):
        return VariationDetailSerializer(obj.variation).data


class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField()
    item = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    shop_name = serializers.ReadOnlyField(source='shop.name')

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

    def get_item(self, obj):
        return ItemSerializer(obj.item).data

    def get_item_variations(self, obj):
        return ItemVariationDetailSerializer(obj.item_variations.all(), many=True).data

    def get_final_price(self, obj):
        return obj.get_final_price()


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    # items_count = serializers.SerializerMethodField()
    # order_status = serializers.SerializerMethodField()
    # order_status = serializers.DateField(format="%Y-%m-%d %H:%M:%S")
    start_date = serializers.DateTimeField(format="%d-%m-%Y")
    shop_name = serializers.ReadOnlyField(source='shop.name')
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
            # 'items_count',
            'total',
            # 'coupon',
            'shop_name',
            'shop_id',
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

    def get_coupon(self, obj):
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None


class ItemVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariation
        fields = (
            'id',
            'value',
            'attachment'
        )


class VariationSerializer(serializers.ModelSerializer):
    item_variations = serializers.SerializerMethodField()

    class Meta:
        model = Variation
        fields = (
            'id',
            'name',
            'item_variations'
        )

    def get_item_variations(self, obj):
        return ItemVariationSerializer(obj.itemvariation_set.all(), many=True).data


class ItemDetailSerializer(serializers.ModelSerializer):
    # category = serializers.SerializerMethodField()
    # label = serializers.SerializerMethodField()
    # variations = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'price',
            'discount_price',
            # 'category',
            # 'slug',
            'description',
            # 'image',
            # 'variations'
            'is_available',
            'is_featured',
            'is_on_sale'


        )

    # def get_category(self, obj):
    #     return obj.get_category_display()

    #

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
    # place_village_name = serializers.ReadOnlyField(source='place.village')
    # place_district_name = serializers.ReadOnlyField(source='place.district')
    # place_state_name = serializers.ReadOnlyField(source='place.state')
    class Meta:
        model = FavoritePlaces
        fields = '__all__'

class FavoriteShopsSerializer(serializers.ModelSerializer):
    shop_name = serializers.ReadOnlyField(source='shop.name')
    shop_place_name = serializers.ReadOnlyField(source='shop.place.name')
    # shop_village_name = serializers.ReadOnlyField(source='shop.place.village')
    # shop_category_name = serializers.ReadOnlyField(source='shop.category')
    class Meta:
        model = FavoriteShops
        fields = '__all__'

# class PaymentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Payment
#         fields = (
#             'id',
#             'amount',
#             'timestamp'
#         )
