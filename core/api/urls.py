from django.urls import path
from .views import (
    UserIDView,
    UserTypeView,
    ItemListView,
    ItemDetailView,
    ShopListView,
    ShopProductListView,
    AddToCartView,
    OrderDetailView,
    OrderQuantityUpdateView,
    #     PaymentView,
    AddCouponView,
    CountryListView,
    AddressListView,
    AddressCreateView,
    AddressUpdateView,
    AddressDeleteView,
    OrderItemDeleteView,
    #     PaymentListView,
    OrderConfirmView,
    # OrderListView,
    # PlaceListView,
    PlaceShopListView,
    OrderDeleteView,
    orderAddressView,
    OrderStatusUpdateView,
    # new items
    NewPlaces,
    FeaturedShops,
    FeaturedShopsInPlace,
    ShopFProductListView,
    # favorite-list
    AddToFavoritePlacesView,
    AddToFavoriteShopsView,
    FavoriteShopsView,
    FavoritePlacesView,
    RemoveFromFavoriteShopsView,
    RemoveFromFavoritePlacesView,
    OrderItemDetailView,
    ServiceAreaView,
    ProductListForShopView,
    ProductUpdateForShopView,
    ProductImageListView,
    ShopProductCategoryListView,
    AddProductView,
    AppInfoView



)

from .orderView import (OrderListView, OrderStatusListView,
                        OrderFilterView, OrderSearchView)
from .shopView import (ShopsModOfPaymentView, ShopsDetailView, ShopAddView, ShopFilterView,
                       AddCandidateView, AddComplaintView, PlaceTaxiListView, PlaceCooliListView)
from .locationView import (PlaceListView, AreaFilterView, PlaceFilterView, VillageFilterView,
                           ClusterFilterView, DistrictFilterView, StateListView, PlaceFilterView, PlaceDetailView)
# from .productView import (ProductofShopListView)

urlpatterns = [
    path('app-info/', AppInfoView.as_view(), name='app-info'),
    path('user-id/', UserIDView.as_view(), name='user-id'),
    path('user-type/', UserTypeView.as_view(), name='UserType'),
    path('service-area/', ServiceAreaView.as_view(), name='service-area'),
    path('countries/', CountryListView.as_view(), name='country-list'),

    path('addresses/', AddressListView.as_view(), name='address-list'),
    path('addresses/create/', AddressCreateView.as_view(), name='address-create'),
    path('addresses/<pk>/update/',
         AddressUpdateView.as_view(), name='address-update'),
    path('addresses/<pk>/delete/',
         AddressDeleteView.as_view(), name='address-delete'),
    path('addresses/<pk>/',
         orderAddressView.as_view(), name='order-address'),


    path('add-product/', AddProductView.as_view(), name='add-product'),
    path('products/', ItemListView.as_view(), name='product-list'),
    path('producstsofashop/<int:owner_id>/', ProductListForShopView.as_view(),
         name='shop-product-list'),
    path('producstsofashop/<pk>/update/',
         ProductUpdateForShopView.as_view(), name='shop-product-edit'),
    path('products/<pk>/', ItemDetailView.as_view(), name='product-detail'),

    path('product-shop-category/<int:owner_id>/',
         ShopProductCategoryListView.as_view(), name='shop-product-category-list'),
    path('product-images/<int:cateogry_id>/',
         ProductImageListView.as_view(), name='product-images'),
    path('places/<int:place_id>/shops/', PlaceShopListView.as_view(),
         name='place-shop-list'),
    path('places/<int:taxi_id>/taxis/', PlaceTaxiListView.as_view(),
         name='place-taxi-list'),
    path('places/<int:cooli_id>/coolies/', PlaceCooliListView.as_view(),
         name='place-cooli-list'),

    path('shops-filter/', ShopFilterView.as_view(), name='shop-filter'),
    path('shops/', ShopListView.as_view(), name='shop-list'),
    path('shop-add/', ShopAddView.as_view(), name='shop-add'),

    # path('all-shops/', AllShopView.as_view(), name='all-shops'),
    path('shops/<int:shop_id>/products', ShopProductListView.as_view(),
         name='shop-product-list'),
    path('shops/<int:shop_id>/fproducts', ShopFProductListView.as_view(),
         name='shop-fproduct-list'),

    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    #   path('checkout/', PaymentView.as_view(), name='checkout'),
    path('checkout/', OrderConfirmView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('order-items/<pk>/delete/',
         OrderItemDeleteView.as_view(), name='order-item-delete'),
    path('order-item/update-quantity/',
         OrderQuantityUpdateView.as_view(), name='order-item-update-quantity'),
    #     path('payments/', PaymentListView.as_view(), name='payment-list'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('order-filter/', OrderFilterView.as_view(), name='order-filter'),
    path('order-search/', OrderSearchView.as_view(), name='order-search'),
    path('order-status/', OrderStatusListView.as_view(), name='order-status'),

    path('orders/<pk>/delete/',
         OrderDeleteView.as_view(), name='order-delete'),

    # look here e

    path('orders/<pk>/status-update/',
         OrderStatusUpdateView, name='order-status-update'),

    path('orders/<pk>/detail/',
         OrderItemDetailView.as_view(), name='order-detail'),
    # new order-items
    path('new-places/',
         NewPlaces.as_view(), name='new-places'),
    path('featured-shops/',
         FeaturedShops.as_view(), name='featured-shops'),

    path('places/<int:place_id>/fshops/', FeaturedShopsInPlace.as_view(),
         name='place-fshop-list'),

    path('places/<pk>/detail/', PlaceDetailView.as_view(),
         name='place-detail'),
    path('shops/<pk>/detail/', ShopsDetailView.as_view(),
         name='place-detail'),
    # path('shops/<pk>/mode-of-payment/', ShopsModOfPaymentView.as_view(),
    #   name='mode-of-payment'),

    path('mode-of-payment/', ShopsModOfPaymentView.as_view(),
         name='mode-of-payment'),

    # favrite
    path('add-to-favorite-places/', AddToFavoritePlacesView.as_view(),
         name='add-to-favorite-places'),
    path('add-to-favorite-shops/', AddToFavoriteShopsView.as_view(),
         name='add-to-favorite-shops'),

    path('favorite-places/', FavoritePlacesView.as_view(),
         name='favorite-places'),
    path('favorite-shops/', FavoriteShopsView.as_view(),
         name='favorite-shops'),

    # path('removefromfavoriteshops/', RemoveFromFavoriteShopsView.as_view(), name='remove-from-favorite-shops'),
    path('remove-from-favorite-shops/<pk>/',
         RemoveFromFavoriteShopsView.as_view(), name='remove-from-favorite-shops'),
    path('remove-from-favorite-places/<pk>/',
         RemoveFromFavoritePlacesView.as_view(), name='remove-from-favorite-places'),
    path('candidate-add/',
         AddCandidateView.as_view(), name='candidate-add'),
    path('complaint-add/',
         AddComplaintView.as_view(), name='complaint-add'),

    # //location urls
    path('places-list/', PlaceListView.as_view(), name='area-list'),
    path('areas-filter/', AreaFilterView.as_view(), name='area-filter'),
    path('places-filter/', PlaceFilterView.as_view(), name='place-filter'),
    path('placess-filter/', PlaceFilterView.as_view(), name='places-filter'),
    path('villages-filter/', VillageFilterView.as_view(), name='village-filter'),
    path('clusters-filter/', ClusterFilterView.as_view(), name='cluster-filter'),
    path('districts-filter/', DistrictFilterView.as_view(),
         name='district-filter'),
    path('states/', StateListView.as_view(), name='state-list'),


]
