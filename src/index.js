import React from "react";
// import "./fontawesome/index";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";
import "./index.scss";
// import serviceWorker from "./serviceWorker";
import * as serviceWorker from "./serviceWorker";

// Import custom components
import store from "./store";
import * as actions from "./actions/auth";
import translations from "./constants/translations";
// import { getAllProducts } from "./actions";
// import Landing from "./components/landing";

//local dukans
import Layout from "./components/app";
import Cart from "./components/cart";
import homepage from "./components/ld/homepage/main";
import LocalityHome from "./components/ld/localityHome/main";
import LocalityList from "./components/ld/localityList/main";
import ShopHome from "./components/ld/shopHome/main";
// import ShopList from "./components/ld/shopHome/list";
import Login from "./components/ld/pages/login";
import Register from "./components/ld/pages/register";
import Logout from "./components/ld/pages/logout";
import PassworReset from "./components/ld/pages/forgetPassword";

import Orders from "./components/ld/orders/main";
import ManageOrderFilter from "./components/ld/manageOrders/index";
import ManageOrderSearch from "./components/ld/manageOrders/searchOrder";
import ShopOrderManage from "./components/ld/shopManagement/test";
import OrderTable from "./components/ld/manageOrders/tableIndex";
import ShopOrderTable from "./components/ld/manageOrders/shopOrderTable";

import OrderItem from "./components/ld/orders/order-item";
import OrderItemCustomer from "./components/ld/orders/order-item-customer";

import Address from "./components/ld/address/main";
import CreateAddress from "./components/ld/address/add2";
import EditAddress from "./components/ld/address/edit2";
import Wishlist from "./components/ld/wishlist/main";
import Checkout from "./components/ld/checkout/main";
// import OrderSummary from "./components/ld/checkout/orderSummary";
import OrderSummary from "./components/ld/checkout/or";

//products
import ShopProducts from "./components/ld/products/productList";
import ShopProductsEdit from "./components/ld/products/editProduct2";
import AddShopProduct from "./components/ld/products/addProduct";
// import EditProduct from "./components/ld/products/addProduct"
// import DeleteProduct from "./components/ld/products/addProduct"

import AddShop from "./components/ld/manageShops/addShop";
import ManageShopFilter from "./components/ld/manageShops/filterIndex";
import ManageShopSearch from "./components/ld/manageShops/searchShop";
import AddCandidate from "./components/ld/career/register";
import AddComplaint from "./components/ld/complaint/register";

class Root extends React.Component {
  // componentDidMount() {
  // this.props.onTryAutoSignup();
  //   console.log("hi");
  // }
  render() {
    return (
      <Provider store={store}>
        <IntlProvider translations={translations} locale="en">
          <BrowserRouter basename={"/"}>
            <ScrollContext>
              <Switch>
                <Route
                  path={`${process.env.PUBLIC_URL}/reset-password`}
                  component={PassworReset}
                />
                <Layout>
                  <Route
                    path={`${process.env.PUBLIC_URL}/login`}
                    component={Login}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/register`}
                    component={Register}
                  />
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    component={homepage}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/logout`}
                    component={Logout}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/places/:placeID`}
                    component={LocalityHome}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/place-list`}
                    component={LocalityList}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shops/:shopID`}
                    component={ShopHome}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/editaddress/:addressID`}
                    component={EditAddress}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/create-address`}
                    component={CreateAddress}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/addresses`}
                    component={Address}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-product-list`}
                    component={ShopProducts}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/add-shop-product`}
                    component={AddShopProduct}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/edit-shop-product/:productID`}
                    component={ShopProductsEdit}
                  />
                  {/* <Route
                    path={`${process.env.PUBLIC_URL}/edit-product`}
                    component={Orders}
                  /> */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/order/:orderID`}
                    component={OrderItem}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/customer-order/:orderID`}
                    component={OrderItemCustomer}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/orders`}
                    component={Orders}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/manage-order-delivery`}
                    component={OrderTable}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/wishlist`}
                    component={Wishlist}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/checkout`}
                    component={Checkout}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/order-summary`}
                    component={OrderSummary}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/ordersummary`}
                    component={OrderSummary}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/manage-order-filter`}
                    component={ManageOrderFilter}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/manage-order-search`}
                    component={ManageOrderSearch}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-order-manage`}
                    component={ShopOrderManage}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/add-shop`}
                    component={AddShop}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-filter`}
                    component={ManageShopFilter}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-order-table`}
                    component={ShopOrderTable}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-search`}
                    component={ManageShopSearch}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/add-candidate`}
                    component={AddCandidate}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/add-complaint`}
                    component={AddComplaint}
                  />
                </Layout>
              </Switch>
            </ScrollContext>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
