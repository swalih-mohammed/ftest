from django.contrib import admin

from .models import (ProductImage, AppInfo, ModeOfPayment, Compliant, Taxi, Cooli, Candidate, ServiceArea, Role, ShopCategory, ProductCategory,
                     Area, Place, Village, Cluster, District, State, Shop, Item, OrderItem, Order, OrderStatus, Coupon, Refund,
                     Address, UserProfile, Variation, ItemVariation, Area, FavoritePlaces, FavoriteShops
                     )


def make_refund_accepted(modeladmin, request, queryset):
    queryset.update(refund_requested=False, refund_granted=True)


make_refund_accepted.short_description = 'Update orders to refund granted'

admin.site.site_header = 'Local Dukans - Administration'


class PaymentModeInline(admin.TabularInline):
    model = ModeOfPayment


class OrderAdmin(admin.ModelAdmin):
    # inlines = [
    #     PaymentModeInline,
    # ]
    # exclude = ('toppings',)

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

# inlines = [inlineItem]


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


class ItemAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'shop',
        'price',
        'discount_price'
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

    search_fields = ['user', 'place', 'phone_number']
    list_filter = ['area', 'place', 'village',
                   'district', 'state', 'create_date']


class ItemVariationAdmin(admin.ModelAdmin):
    list_display = ['variation',
                    'value',
                    'attachment']
    list_filter = ['variation', 'variation__item']
    search_fields = ['value']


class ItemVariationInLineAdmin(admin.TabularInline):
    model = ItemVariation
    extra = 1


class VariationAdmin(admin.ModelAdmin):
    list_display = ['item',
                    'name']
    list_filter = ['item']
    search_fields = ['name']
    inlines = [ItemVariationInLineAdmin]

# locations


class inlineDistrict(admin.StackedInline):
    model = District
    extra = 1

# inlines = [inlineItem]


class StateAdmin(admin.ModelAdmin):
    inlines = [inlineDistrict]
    list_display = [
        'name'
    ]
    list_filter = ['name']


class inlineVillage(admin.StackedInline):
    model = Village
    extra = 1

# inlines = [inlineVillage]


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
        'name'
    ]
    list_filter = ['name']
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
        'image1',
        'productCategory'
    ]
    list_filter = ['productCategory']
    list_editable = ['image1']
    search_fields = ['name']


class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'create_date'
    ]
    list_filter = ['is_customer', 'is_shop_owner', 'create_date']


admin.site.register(ItemVariation, ItemVariationAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderStatus)

# admin.site.register(Payment)
admin.site.register(Coupon)
admin.site.register(Refund)
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
admin.site.register(ProductCategory)
# admin.site.register(Category)
# admin.site.register(DeliveryStaff)
admin.site.register(FavoritePlaces)
admin.site.register(FavoriteShops)
