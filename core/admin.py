from django.contrib import admin

from .models import (ProductImage, AppInfo, ModeOfPayment, Compliant, Taxi, Cooli, Candidate, ServiceArea, Role, ShopCategory, ProductCategory,
                     Area, Place, Village, Cluster, District, State, Shop, Item, OrderItem, Order, OrderStatus, Coupon,
                     Address, UserProfile, Variation, Area, FavoritePlaces, FavoriteShops
                     )


def make_refund_accepted(modeladmin, request, queryset):
    queryset.update(refund_requested=False, refund_granted=True)


make_refund_accepted.short_description = 'Update orders to refund granted'

admin.site.site_header = 'Local Dukans - Administration'


class PaymentModeInline(admin.TabularInline):
    model = ModeOfPayment


class OrderAdmin(admin.ModelAdmin):

    list_display = ['id', 'user',
                    'shop',
                    'order_status',
                    'place',
                    'address',
                    'start_date',
                    # 'paymentMode'

                    ]
    list_display_links = [
        'user',
        'shop',
        'place',
        'id',
        'address',


    ]
    list_filter = ['shop__name', 'place', 'shop__village', 'start_date', 'order_status'
                   ]
    search_fields = [
        'user__username',
        'address__phone_number',
        'id',
        'shop'
    ]
    actions = [make_refund_accepted]


class inlineItem(admin.StackedInline):
    model = Item
    extra = 1


class ShopAdmin(admin.ModelAdmin):
    inlines = [inlineItem]
    list_display = [
        'name',
        'owner',
        'place',
        'village',
        # 'district',
        # 'state'

    ]
    list_display_links = [
        'name',
        'owner',
        'place',
        'village'

    ]
    list_filter = ['place', 'village', 'district', 'state',  'create_date']
    search_fields = ['name', 'place', 'owner']


class inlineVariation(admin.StackedInline):
    model = Variation
    extra = 1


class ItemAdmin(admin.ModelAdmin):
    inlines = [inlineVariation]
    list_display = [
        'title',
        'shop',

    ]
    list_filter = ['shop', 'is_available', 'productategory']
    search_fields = ['title']


class ShopCategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
    ]
    list_filter = ['name']
    search_fields = ['name']


class AddressAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'place',
        'village',
        'district',
        'state'
    ]


class inlineDistrict(admin.StackedInline):
    model = District
    extra = 1


class StateAdmin(admin.ModelAdmin):
    inlines = [inlineDistrict]
    list_display = [
        'name'
    ]
    list_filter = ['name']


class inlineVillage(admin.StackedInline):
    model = Village
    extra = 1


class DistrictAdmin(admin.ModelAdmin):
    inlines = [inlineVillage]
    list_display = [
        'name',
        'state'

    ]
    list_filter = ['name']


class inlineCluster(admin.StackedInline):
    model = Cluster
    extra = 1

# inlines = [inlineCluster]


class ClusterAdmin(admin.ModelAdmin):
    # inlines = [inlineCluster]
    list_display = [
        'name',
        'district'
    ]
    list_filter = ['name', 'district']


class inlinePlace(admin.StackedInline):
    model = Place
    extra = 1

# inlines = [inlinePlace]


class VillageAdmin(admin.ModelAdmin):
    inlines = [inlinePlace]
    list_display = [
        'name',
        'villageDistrict'
    ]
    list_filter = ['name', 'villageDistrict']


class inlineArea(admin.StackedInline):
    model = Area
    extra = 1

# inlines = [inlineArea]


class PlaceAdmin(admin.ModelAdmin):
    inlines = [inlineArea]
    list_display = [
        'name',
        'village'
    ]
    list_filter = ['name', 'village', ]
    search_fields = ['name']


class AreaAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'place'

    ]
    list_filter = ['place']
    search_fields = ['name', 'place']

# location admin end


class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'local_name'
    ]
    # list_filter = ['shop']
    search_fields = ['name']


class serviceAreaAdmin(admin.ModelAdmin):
    list_display = [
        'user'
    ]


class RoleAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]


class OrderStatusAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class CandidateAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class TaxiAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class CooliAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class CompliantAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class ModeOfPaymentAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']

# AppInfo


class ProductImageAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'local_name',
        'image1',
        'productCategory'
    ]
    list_display_links = [
        'name'

    ]
    list_filter = ['productCategory']

    search_fields = ['name', 'local_name']


class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'create_date'
    ]
    list_filter = ['is_customer', 'is_shop_owner', 'create_date']


class CouponAdmin(admin.ModelAdmin):
    list_display = [
        'code',
        'start_date',
        'expiry_date',
        'create_date'
    ]
    list_filter = ['code', 'create_date']


admin.site.register(Variation)
admin.site.register(Item, ItemAdmin)
admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderStatus)

# admin.site.register(Payment)
admin.site.register(Coupon, CouponAdmin)
# admin.site.register(Refund)
admin.site.register(Address, AddressAdmin)

admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Role)
admin.site.register(Candidate)
admin.site.register(Taxi)
admin.site.register(Cooli)
admin.site.register(Compliant)
admin.site.register(ModeOfPayment)
admin.site.register(AppInfo)
admin.site.register(ProductImage, ProductImageAdmin)


# locations
admin.site.register(Area, AreaAdmin)
admin.site.register(Place, PlaceAdmin)
admin.site.register(Village, VillageAdmin)
admin.site.register(Cluster, ClusterAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(State, StateAdmin)
admin.site.register(ServiceArea)

admin.site.register(Shop, ShopAdmin)
admin.site.register(ShopCategory)
admin.site.register(ProductCategory, ProductCategoryAdmin)
# admin.site.register(Category)
# admin.site.register(DeliveryStaff)
admin.site.register(FavoritePlaces)
admin.site.register(FavoriteShops)
