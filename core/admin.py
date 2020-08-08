from django.contrib import admin

from .models import (ProductImage, AppInfo, ModeOfPayment, Compliant, Taxi, Cooli, Candidate, ServiceArea, Role, ShopCategory, ProductCategory,
                     Area, Place, Village, Cluster, District, State, Shop, Item, OrderItem, Order, OrderStatus, Coupon, Refund,
                     Address, UserProfile, Variation, ItemVariation, Area, FavoritePlaces, FavoriteShops
                     )


def make_refund_accepted(modeladmin, request, queryset):
    queryset.update(refund_requested=False, refund_granted=True)


make_refund_accepted.short_description = 'Update orders to refund granted'

admin.site.site_header = 'Local Dukans - Administration'


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user',
                    'shop',
                    'order_status',
                    'place',
                    'address',
                    'start_date',
                    'paymentMode'

                    ]
    list_display_links = [
        'user',
        'shop',
        'place',
        'id',
        'address',


    ]
    list_filter = ['shop__name',
                   ]
    search_fields = [
        'user__username',
        'address__phone_number',
        'id',
        'shop'
    ]
    actions = [make_refund_accepted]


class ShopAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'place',
        'place'
    ]
    list_filter = ['name', 'place', ]
    search_fields = ['name', 'place', ]


class ShopCategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
    ]
    list_filter = ['name']
    search_fields = ['name']


class AddressAdmin(admin.ModelAdmin):
    list_display = [
        'user'

    ]

    search_fields = ['user', 'place']


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


class StateAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class DistrictAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class ClusterAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class VillageAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']


class PlaceAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']
    search_fields = ['name']


class AreaAdmin(admin.ModelAdmin):
    list_display = [
        'name'
    ]
    list_filter = ['name']
    search_fields = ['place']

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
        'name'
    ]
    list_filter = ['name']


admin.site.register(ItemVariation, ItemVariationAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(Item)
admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderStatus)

# admin.site.register(Payment)
admin.site.register(Coupon)
admin.site.register(Refund)
admin.site.register(Address, AddressAdmin)

admin.site.register(UserProfile)
admin.site.register(Role)
admin.site.register(Candidate)
admin.site.register(Taxi)
admin.site.register(Cooli)
admin.site.register(Compliant)
admin.site.register(ModeOfPayment)
admin.site.register(AppInfo)
admin.site.register(ProductImage)


# locations
admin.site.register(Area)
admin.site.register(Place)
admin.site.register(Village)
admin.site.register(Cluster)
admin.site.register(District)
admin.site.register(State)
admin.site.register(ServiceArea)

admin.site.register(Shop)
admin.site.register(ShopCategory)
admin.site.register(ProductCategory)
# admin.site.register(Category)
# admin.site.register(DeliveryStaff)
admin.site.register(FavoritePlaces)
admin.site.register(FavoriteShops)
