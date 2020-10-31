import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";

// import "./index.scss";
// import "../public/assets/scss/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";

// import React from "react";
// import "./fontawesome/index";
// import { connect } from "react-redux";
// import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";
// import * as serviceWorker from "./serviceWorker";
// Import custom components
// import * as actions from "./actions/auth";
// import translations from "./constants/translations";
// import Cart from "./components/cart";

///non-lazy imports

//common///////////////////

import GlobalStyle from "./globalStyles";
import { PageLoader } from "./components/ld/common/loader";
import Layout from "./components/app";

// home
// import homepage from "./components/ld/homepage/main";
// import LocalityList from "./components/ld/localityList/main";
// import LocalityHome from "./components/ld/localityHome/main";
// import ShopHome from "./components/ld/shopHome/main";

//pages
import Login from "./components/ld/pages/login";
import Register from "./components/ld/pages/register1";
import Logout from "./components/ld/pages/logout";
import PassworReset from "./components/ld/pages/forgetPassword";
import ConfirmPassword from "./components/ld/pages/confirm-reset-password";
import PassworResetSuccess from "./components/ld/pages/password-changed";

import Wishlist from "./components/ld/wishlist/main";
import Checkout from "./components/ld/checkout/main";
import OrderSummary from "./components/ld/checkout/or";

//shop products
// import ShopProducts from "./components/ld/products/productList";
// import ShopProductsEdit from "./components/ld/products/editProduct2";
// import AddShopProduct from "./components/ld/products/addProduct";

//address
// import Address from "./components/ld/address/main";
// import CreateAddress from "./components/ld/address/add";
// import EditAddress from "./components/ld/address/edit";

//orders
// import Orders from "./components/ld/orders/main";
// import ManageOrderFilter from "./components/ld/manageOrders/index";
// import ManageOrderSearch from "./components/ld/manageOrders/searchOrder";
// import ShopOrderManage from "./components/ld/shopManagement/test";
// import OrderTable from "./components/ld/manageOrders/tableIndex";
// import ShopOrderTable from "./components/ld/manageOrders/shopOrderTable";
// import ShopDashboard from "./components/ld/manageShops/shopDash";
// import OrderItem from "./components/ld/orders/order-item";
// import OrderItemCustomer from "./components/ld/orders/order-item-customer";

// //shop manage
// import AddShop from "./components/ld/manageShops/addShop";
// import ManageShopFilter from "./components/ld/manageShops/filterIndex";
// import ManageShopSearch from "./components/ld/manageShops/searchShop";
// import AddCandidate from "./components/ld/career/register";
// import AddComplaint from "./components/ld/complaint/register";

// import swDev from "./swDev";
// import * as serviceWorker from "./serviceWorker";

// serviceWorker
//lazy loading ////////////////////////////////

//home page
const homepage = lazy(() => import("./components/ld/homepage/main"));
const LocalityHome = lazy(() => import("./components/ld/localityHome/main"));
const LocalityList = lazy(() => import("./components/ld/localityList/main"));
const ShopHome = lazy(() => import("./components/ld/shopHome/main"));

// pages
// const Login = lazy(() => import("./components/ld/pages/login"));
// const Register = lazy(() => import("./components/ld/pages/register"));
// const Logout = lazy(() => import("./components/ld/pages/logout"));
// const PassworReset = lazy(() => import("./components/ld/pages/forgetPassword"));
// const Wishlist = lazy(() => import("./components/ld/wishlist/main"));
// const Checkout = lazy(() => import("./components/ld/checkout/main"));
// const OrderSummary = lazy(() => import("./components/ld/checkout/or"));

//shop products
const ShopProducts = lazy(() => import("./components/ld/products/productList"));
const ShopProductDetail = lazy(() =>
  import("./components/ld/products/productDetail")
);

const ShopProductsEdit = lazy(() =>
  import("./components/ld/products/editProduct2")
);
const AddShopProduct = lazy(() =>
  import("./components/ld/products/addProduct")
);

//address
const Address = lazy(() => import("./components/ld/address/main"));
const CreateAddress = lazy(() => import("./components/ld/address/add"));
const EditAddress = lazy(() => import("./components/ld/address/edit"));

// orders
const Orders = lazy(() => import("./components/ld/orders/main"));
const ManageOrderFilter = lazy(() =>
  import("./components/ld/manageOrders/index")
);
const ManageOrderSearch = lazy(() =>
  import("./components/ld/manageOrders/searchOrder")
);
const ShopOrderManage = lazy(() =>
  import("./components/ld/shopManagement/test")
);
const OrderTable = lazy(() =>
  import("./components/ld/manageOrders/tableIndex")
);
const ShopOrderTable = lazy(() =>
  import("./components/ld/manageOrders/shopOrderTable")
);
const ShopDashboard = lazy(() =>
  import("./components/ld/manageShops/shopDash")
);

const OrderItem = lazy(() => import("./components/ld/orders/order-item"));
const OrderItemCustomer = lazy(() =>
  import("./components/ld/orders/order-item-customer")
);

const AddShop = lazy(() => import("./components/ld/manageShops/addShop"));
const ManageShopFilter = lazy(() =>
  import("./components/ld/manageShops/filterIndex")
);
const ManageShopSearch = lazy(() =>
  import("./components/ld/manageShops/searchShop")
);
const AddCandidate = lazy(() => import("./components/ld/career/register"));
const AddComplaint = lazy(() => import("./components/ld/complaint/register"));

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* <IntlProvider translations={translations} locale="en"> */}
        <BrowserRouter basename={"/"}>
          <ScrollContext>
            <Suspense fallback={<PageLoader />}>
              <GlobalStyle />
              <Switch>
                <Layout>
                  <Route
                    path={`${process.env.PUBLIC_URL}/reset-password`}
                    component={PassworReset}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/reset-password-success`}
                    component={PassworResetSuccess}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/password/reset/confirm/:uid/:token`}
                    component={ConfirmPassword}
                  />

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
                    path={`${process.env.PUBLIC_URL}/shop-dashboard`}
                    component={ShopDashboard}
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
                    path={`${process.env.PUBLIC_URL}/shop-product-detail/:productID`}
                    component={ShopProductDetail}
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
            </Suspense>
          </ScrollContext>
        </BrowserRouter>
        {/* </IntlProvider> */}
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
// swDev();
// serviceWorker.register();
