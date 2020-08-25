import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  ShopDashboardDetialURL,
  ShopDashProductsURL,
  ShopDashOrdersURL,
  ShopDashOpenStatusURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShopDetail: "",
      pendingOrders: "",
      totalOrders: "",
      item: "",
      orders: null,
      loading: false
    };
  }

  componentWillMount() {
    this.fetchShopDetails();
    this.fetchShopDashOrders();
  }

  fetchShopDashOrders = () => {
    this.setState({ loading: true });
    authAxios
      .get(ShopDashOrdersURL)
      .then(res => {
        this.setState({ orders: res.data, loading: false });
        // console.log(res.data.pendingOrders);
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchShopDetails = () => {
    this.setState({ loading: true });
    authAxios
      .get(ShopDashboardDetialURL)
      .then(res => {
        this.setState({ ShopDetail: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  shopOpenStatus = (status, id) => {
    this.setState({ loading: true });
    authAxios
      .put(ShopDashOpenStatusURL(id), {
        is_accepting_orders: status
      })
      .then(res => {
        // toast.error("Order  cancelled");
        this.fetchShopDetails();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
        this.setState({ loading: false });
      });
  };

  render() {
    const { ShopDetail, orders } = this.state;
    const { token } = this.props;
    console.log(this.state.Orders);

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Breadcrumb title={"Shop Details"} />
        <div>
          <section className="section-b-space">
            {this.state.loading && <div className="loading-cls"></div>}
            <div className="container">
              {/* <div className="account-sidebar"></div> */}
              <div className="row">
                <div className="col-lg-3">
                  <div className="dashboard-left">
                    <div className="collection-mobile-back">
                      <span className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                        back
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="dashboard-right">
                    <div className="dashboard">
                      <div className="box-account box-info">
                        <div className="box-head">
                          <h3>{ShopDetail.name}</h3>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="box">
                              <div className="box-title">
                                {/* <h4>Order ID: {order.id}</h4> */}
                              </div>
                              <div className="box-content">
                                <h6>{ShopDetail.place}</h6>
                                <h6>Phone: {ShopDetail.phone_number}</h6>
                                <br />
                                <h4>
                                  {ShopDetail.is_accepting_orders
                                    ? "Your Shop is open"
                                    : "Your Shop is closed"}
                                </h4>
                                <br></br>
                                <>
                                  <Button
                                    onClick={() => {
                                      this.shopOpenStatus(
                                        !ShopDetail.is_accepting_orders,
                                        ShopDetail.id
                                      );
                                    }}
                                    variant="primary"
                                    // size="lg"
                                    // block
                                  >
                                    {ShopDetail.is_accepting_orders
                                      ? "Close shop"
                                      : "Open shop"}
                                  </Button>
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* pending orders  */}

              {orders ? (
                <div className="row">
                  <div className="col-lg-3">
                    <div className="dashboard-left">
                      <div className="collection-mobile-back">
                        <span className="filter-back">
                          <i
                            className="fa fa-angle-left"
                            aria-hidden="true"
                          ></i>{" "}
                          back
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="dashboard-right">
                      <div className="dashboard">
                        <div className="box-account box-info">
                          <div className="box-head">
                            <h3>
                              {this.state.orders.pendingOrders} Pending Orders
                            </h3>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="box">
                                <div className="box-title">
                                  {/* <h4>Order ID: {order.id}</h4> */}
                                </div>
                                <div className="box-content">
                                  <a href="/shop-order-table">
                                    <Button variant="primary">
                                      Go to orders
                                    </Button>{" "}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {orders ? (
                <div className="row">
                  <div className="col-lg-3">
                    <div className="dashboard-left">
                      <div className="collection-mobile-back">
                        <span className="filter-back">
                          <i
                            className="fa fa-angle-left"
                            aria-hidden="true"
                          ></i>{" "}
                          back
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="dashboard-right">
                      <div className="dashboard">
                        <div className="box-account box-info">
                          <div className="box-head">
                            <h3>
                              {this.state.orders.totalOrders} Total Orders
                            </h3>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="box">
                                <div className="box-title">
                                  {/* <h4>Order ID: {order.id}</h4> */}
                                </div>
                                {/* <div className="box-content"></div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {orders ? (
                <div className="row">
                  <div className="col-lg-3">
                    <div className="dashboard-left">
                      <div className="collection-mobile-back">
                        <span className="filter-back">
                          <i
                            className="fa fa-angle-left"
                            aria-hidden="true"
                          ></i>{" "}
                          back
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="dashboard-right">
                      <div className="dashboard">
                        <div className="box-account box-info">
                          <div className="box-head">
                            <h3>
                              {this.state.orders.item} Products in your shop
                            </h3>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="box">
                                <div className="box-title">
                                  {/* <h4>Order ID: {order.id}</h4> */}
                                </div>
                                <div className="box-content">
                                  <a href="/shop-product-list">
                                    {" "}
                                    <Button variant="primary">
                                      Go to products
                                    </Button>{" "}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.user.user,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Orders);

// export default Orders;
