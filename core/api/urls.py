from django.urls import path
from .views import (
    UserIDView,
    UserTypeView,
    AddToCartView,
    OrderDetailView,
    OrderQuantityUpdateView,
    AddCouponView,
    AddressListView,
    AddressCreateView,
    AddressUpdateView,
    AddressDeleteView,
    OrderItemDeleteView,
    OrderConfirmView,
    OrderDeleteView,
    orderAddressView,
    OrderStatusUpdateView,
    AddToFavoritePlacesView,
    AddToFavoriteShopsView,
    FavoriteShopsView,
    FavoritePlacesView,
    RemoveFromFavoriteShopsView,
    RemoveFromFavoritePlacesView,
    OrderItemDetailView,
    AppInfoView,
    ShopDashOrderView,)

from .orderView import (OrderListView, OrderStatusListView,
                        OrderFilterView, OrderSearchView)
from .shopView import (FeaturedShopsInPlace, FeaturedShops, ShopListView, PlaceShopListView, ShopDashOpenStatusView, ShopDashDetailView, ShopsModOfPaymentView, ShopsDetailView, ShopAddView, ShopFilterView,
                       AddCandidateView, AddComplaintView, PlaceTaxiListView, PlaceCooliListView)
from .locationView import (NewPlaces, ServiceAreaView, PlaceListView, AreaFilterView, PlaceFilterView, VillageFilterView,
                           ClusterFilterView, DistrictFilterView, StateListView, PlaceFilterView, PlaceDetailView)
from .productView import (ProductListInfinitForShopView, ItemListView, DeleteVariation,
                          ShopProductCategoryForCustomerListView, ShopProductCategoryListView,
                          ShopFProductListView, ProductImageListView, ProductUpdateForShopView,
                          ItemDetailView, UpdateVariation,
                          AddProductVariationView, AddProductView,
                          shopProductListInfinitView, ShopProductListView)

urlpatterns = [
    path('app-info/', AppInfoView.as_view(), name='app-info'),
    path('user-id/', UserIDView.as_view(), name='user-id'),
    path('user-type/', UserTypeView.as_view(), name='UserType'),
    path('service-area/', ServiceAreaView.as_view(), name='service-area'),

    # address
    path('addresses/', AddressListView.as_view(), name='address-list'),
    path('addresses/create/', AddressCreateView.as_view(), name='address-create'),
    path('addresses/<pk>/update/',
         AddressUpdateView.as_view(), name='address-update'),
    path('addresses/<pk>/delete/',
         AddressDeleteView.as_view(), name='address-delete'),
    path('addresses/<pk>/',
         orderAddressView.as_view(), name='order-address'),

    # shop
    path('shop-product-list/', shopProductListInfinitView.as_view(),
         name='shop-product-list'),
    path('shops-filter/', ShopFilterView.as_view(), name='shop-filter'),
    path('shops/', ShopListView.as_view(), name='shop-list'),
    path('shop-add/', ShopAddView.as_view(), name='shop-add'),
    path('shops/<int:shop_id>/products', ShopProductListView.as_view(),
         name='shop-product-list'),
    path('shops/<int:shop_id>/fproducts', ShopFProductListView.as_view(),
         name='shop-fproduct-list'),
    path('places/<int:place_id>/fshops/', FeaturedShopsInPlace.as_view(),
         name='place-fshop-list'),
    path('featured-shops/',
         FeaturedShops.as_view(), name='featured-shops'),

    # products
    path('products/', ItemListView.as_view(), name='product-list'),
    path('add-product/', AddProductView.as_view(), name='add-product'),
    path('products/<pk>/', ItemDetailView.as_view(), name='product-detail'),
    path('shop-product-add-variation/', AddProductVariationView.as_view(),
         name='shop-product-add-variation'),
    #     path('producstsofashop/<int:owner_id>/', ProductListForShopView.as_view(),
    #     name = 'shop-product-list'),
    path('infinitproductforshops/', ProductListInfinitForShopView.as_view(),
         name='shop-product-list-infinit'),
    path('producstsofashop/<pk>/update/',
         ProductUpdateForShopView.as_view(), name='shop-product-edit'),

    # product category
    path('product-shop-category/<int:owner_id>/',
         ShopProductCategoryListView.as_view(), name='shop-product-category-list'),
    path('product-shop-category-for-customer/<int:shop_id>/',
         ShopProductCategoryForCustomerListView.as_view(), name='shop-product-category-list'),

    # varitaion
    path('variation/<pk>/update/',
         UpdateVariation.as_view(), name='variation-edit'),
    path('variation/<pk>/delete/',
         DeleteVariation.as_view(), name='variation-delete'),

    path('product-images/<int:cateogry_id>/',
         ProductImageListView.as_view(), name='product-images'),

    # location
    path('places/<int:place_id>/shops/', PlaceShopListView.as_view(),
         name='place-shop-list'),
    path('places/<int:taxi_id>/taxis/', PlaceTaxiListView.as_view(),
         name='place-taxi-list'),
    path('places/<int:cooli_id>/coolies/', PlaceCooliListView.as_view(),
         name='place-cooli-list'),
    path('new-places/',
         NewPlaces.as_view(), name='new-places'),

    # order
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('order-item/update-quantity/',
         OrderQuantityUpdateView.as_view(), name='order-item-update-quantity'),
    path('order-items/<pk>/delete/',
         OrderItemDeleteView.as_view(), name='order-item-delete'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('checkout/', OrderConfirmView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('order-filter/', OrderFilterView.as_view(), name='order-filter'),
    path('order-search/', OrderSearchView.as_view(), name='order-search'),
    path('order-status/', OrderStatusListView.as_view(), name='order-status'),
    path('orders/<pk>/delete/',
         OrderDeleteView.as_view(), name='order-delete'),
    path('orders/<pk>/status-update/',
         OrderStatusUpdateView, name='order-status-update'),
    path('orders/<pk>/detail/',
         OrderItemDetailView.as_view(), name='order-detail'),

    path('places/<pk>/detail/', PlaceDetailView.as_view(),
         name='place-detail'),
    path('shops/<pk>/detail/', ShopsDetailView.as_view(),
         name='place-detail'),
    path('mode-of-payment/', ShopsModOfPaymentView.as_view(),
         name='mode-of-payment'),

    # favorite
    path('add-to-favorite-places/', AddToFavoritePlacesView.as_view(),
         name='add-to-favorite-places'),
    path('add-to-favorite-shops/', AddToFavoriteShopsView.as_view(),
         name='add-to-favorite-shops'),
    path('favorite-places/', FavoritePlacesView.as_view(),
         name='favorite-places'),
    path('favorite-shops/', FavoriteShopsView.as_view(),
         name='favorite-shops'),
    path('remove-from-favorite-shops/<pk>/',
         RemoveFromFavoriteShopsView.as_view(), name='remove-from-favorite-shops'),
    path('remove-from-favorite-places/<pk>/',
         RemoveFromFavoritePlacesView.as_view(), name='remove-from-favorite-places'),
    path('candidate-add/',
         AddCandidateView.as_view(), name='candidate-add'),
    path('complaint-add/',
         AddComplaintView.as_view(), name='complaint-add'),

    # //location urls
    path('places-list/', PlaceListView.as_view(), name='place-list'),
    path('areas-filter/', AreaFilterView.as_view(), name='area-filter'),
    path('places-filter/', PlaceFilterView.as_view(), name='place-filter'),
    path('placess-filter/', PlaceFilterView.as_view(), name='places-filter'),
    path('villages-filter/', VillageFilterView.as_view(), name='village-filter'),
    path('clusters-filter/', ClusterFilterView.as_view(), name='cluster-filter'),
    path('districts-filter/', DistrictFilterView.as_view(),
         name='district-filter'),
    path('states/', StateListView.as_view(), name='state-list'),

    #  shop dashboard
    path('shop-dash-detail/', ShopDashDetailView.as_view(), name='shop-dash-detail'),
    path('shop-dash-orders/', ShopDashOrderView.as_view(), name='shop-dash-orders'),
    path('shop-dash-open-status/<pk>/update/', ShopDashOpenStatusView,
         name='shop-dash-open-status'),


]
