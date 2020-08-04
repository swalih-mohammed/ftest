const localhost = "http://127.0.0.1:8000";
// const localhost = "http://localdukans.herokuapp.com";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const appInfoURL = `${endpoint}/app-info/`;
export const signUp = `${endpoint}/rest-auth/registration/`;
export const login = `${endpoint}/rest-auth/login/`;

export const candidateAddURL = `${endpoint}/candidate-add/`;
export const registerComplaintURL = `${endpoint}/complaint-add/`;

//location urls
export const stateListURL = `${endpoint}/states/`;
export const placeListURL = `${endpoint}/places-list/`;

export const districtFilterURL = `${endpoint}/districts-filter/`;
export const clusterFilterURL = `${endpoint}/cluster-filter/`;
export const villagesFilterURL = `${endpoint}/villages-filter/`;
export const placeFilterURL = `${endpoint}/places-filter/`;
export const areaFilterURL = `${endpoint}/areas-filter/`;

export const placeDetailURL = id => `${endpoint}/places/${id}/detail/`;
export const ShopDetailURL = id => `${endpoint}/shops/${id}/detail/`;
export const ShopModeOfPaymentURL = `${endpoint}/mode-of-payment/`;
// export const ShopModeOfPaymentURL = id =>
//   `${endpoint}/shops/${id}/mode-of-payment/`;

// export const areaFilterURL = name => `${endpoint}/places/${name}/areas`;
export const placeShopListURL = id => `${endpoint}/places/${id}/shops/`;
export const productListURL = `${endpoint}/products/`;
export const shopProductListURL = `${endpoint}/producstsofashop/`;

export const productDetailURL = id => `${endpoint}/products/${id}/`;
export const ShopFProductListURL = id => `${endpoint}/shops/${id}/fproducts`;
export const ShopProductUpdateURL = id =>
  `${endpoint}/producstsofashop/${id}/update/`;

export const shopListURL = `${endpoint}/shops/`;
export const shopAddURL = `${endpoint}/shop-add/`;
export const shopFilterURL = `${endpoint}/shops-filter/`;
export const ShopProductListURL = id => `${endpoint}/shops/${id}/products`;
export const shopSearchURL = `${endpoint}/shop-search/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const orderDetailURL = id => `${endpoint}/orders/${id}/detail/`;
export const orderFilterURL = `${endpoint}/order-filter/`;

export const checkoutURL = `${endpoint}/checkout/`;
export const addCouponURL = `${endpoint}/add-coupon/`;

export const userIDURL = `${endpoint}/user-id/`;
export const userTypeURL = `${endpoint}/user-type/`;
export const serviceAreaURL = `${endpoint}/service-area/`;

export const addressListURL = `${endpoint}/addresses/`;
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
export const orderAddressURL = id => `${endpoint}/addresses/${id}/`;
export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;

//order
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemURL = id => `${endpoint}/order-items/${id}/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;
export const orderStatusUpdateURL = id =>
  `${endpoint}/orders/${id}/status-update/`;
// export const paymentListURL = `${endpoint}/payments/`;
export const orderListURL = `${endpoint}/orders/`;
export const orderStatusListURL = `${endpoint}/order-status/`;
export const orderSearchURL = `${endpoint}/order-search/`;
// export const orderItemURL = id => `${endpoint}/orders/${id}/`;
export const orderDeleteURL = id => `${endpoint}/orders/${id}/delete/`;

//new items
export const newPlacesURL = `${endpoint}/new-places/`;
export const feautredShopsURL = `${endpoint}/featured-shops/`;
export const feautredShopsInPlaceURL = id => `${endpoint}/places/${id}/fshops/`;

//wish list
export const AddToFavoritePlacesURL = `${endpoint}/add-to-favorite-places/`;
// export const RemoveFromFavoriteShopsURL = `${endpoint}/removefromfavoriteshops/`;
export const AddToFavoriteShopsURL = `${endpoint}/add-to-favorite-shops/`;
export const FavoriteShopsURL = `${endpoint}/favorite-shops/`;
export const FavoritePlacesURL = `${endpoint}/favorite-places/`;

export const RemoveFromFavoriteShopsURL = id =>
  `${endpoint}/remove-from-favorite-shops/${id}/`;
export const RemoveFromFavoritePlacesURL = id =>
  `${endpoint}/remove-from-favorite-places/${id}/`;
