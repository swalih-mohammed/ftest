import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
// import axios from "axios";
import { authAxios } from "../../../authAxios";
// import { fetchUser } from "../../../actions/user";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Row, Col, Alert } from "react-bootstrap";

import {
  orderDetailURL,
  orderAddressURL,
  orderStatusUpdateURL,
  orderStatusListURL
} from "../../../constants";

class OrderItem extends Component {
  state = {
    order: [],
    loading: false,
    ShopSuccess: false,
    CustomerSuccess: false,
    error: null,
    addressID: null,
    orderAddress: [],
    orderItems: [],
    orderID: null,
    shippingCharges: 25,
    orderTotal: null,
    orderStatus: [],
    shopOrderStatus: [],
    staffOrderStatus: [],
    selectedOrderStatus: null
  };

  componentWillMount() {
    this.fetchOrder();
    this.fetchOrderStatus();
    // this.props.fetchUserType();
    this.filter();
    setTimeout(() => {
      this.filter();
    }, 3000);
  }

  filter() {
    if (this.props.user.user.is_shop_owner) {
      this.orderStatusShop();
    }
    if (this.props.user.user.is_staff_user) {
      this.orderStatusStaff();
    }
  }

  orderStatusShop() {
    const { orderStatus } = this.state;
    this.setState({
      shopOrderStatus: this.state.orderStatus.filter(
        status => status.can_update_by === "shop"
      )
    });
  }
  orderStatusStaff() {
    const { orderStatus } = this.state;
    this.setState({
      staffOrderStatus: this.state.orderStatus.filter(
        status => status.can_update_by === "staff"
      )
    });
  }

  fetchOrderStatus = () => {
    authAxios
      .get(orderStatusListURL)
      .then(res => {
        // SetOrderStatus(res.data);
        this.setState({ orderStatus: res.data });
      })
      .catch(err => {
        this.setState({
          // error: err.message,
          loading: false
        });
      });
    // });
  };

  fetchOrder = () => {
    const {
      match: { params }
    } = this.props;

    this.setState({ loading: true });
    // const { shippingCharges } = this.state;
    authAxios
      .get(orderDetailURL(params.orderID))
      .then(res => {
        this.setState({
          order: res.data,
          loading: false,
          addressID: res.data.address,
          orderID: res.data.id,
          orderItems: res.data.order_items,
          orderTotal: res.data.total
        });
        this.handleCallback();
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleCallback = () => {
    this.fetchAddress();
  };

  fetchAddress = () => {
    const { addressID } = this.state;
    this.setState({ loading: true });
    authAxios
      .get(orderAddressURL(addressID))
      .then(res => {
        this.setState({ orderAddress: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  orderCancelCustoemr = e => {
    e.preventDefault();
    const { orderID } = this.state;
    const selectedOrderStatus = 4;
    console.log(selectedOrderStatus);
    authAxios
      .put(orderStatusUpdateURL(orderID), {
        order_status: selectedOrderStatus
      })
      .then(res => {
        toast.error("Order  cancelled");
        this.setState({ CustomerSuccess: true });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleChangeOrderStatus = status => {
    this.setState({
      selectedOrderStatus: status.id
    });
  };

  updateOrderStatus = e => {
    e.preventDefault();
    const { orderID } = this.state;
    const { selectedOrderStatus } = this.state;
    authAxios
      .put(orderStatusUpdateURL(orderID), {
        order_status: selectedOrderStatus
      })
      .then(res => {
        toast.success("Order status updated");
        this.setState({ success: true });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  // callbacktest = () => {
  //   console.log(this.state.orderStatus);
  // };

  render() {
    const { order, orderAddress, orderItems, success } = this.state;

    const { user } = this.props;
    // console.log(loading);

    if (success) {
      if (user.user.is_staff_user) {
        return <Redirect to="/manage-order-delivery" />;
      } else if (user.user.is_shop_owner) {
        return <Redirect to="/shop-order-table" />;
      } else {
        return <Redirect to="/orders" />;
      }
    }

    return (
      <div>
        <ToastContainer />
        <Breadcrumb title={"Order Details"} />
        <section className="section-b-space">
          <div className="container padding-cls">
            <Link to={"/shop-order-table"}>
              <Button variant="outline-danger">Back to orders</Button>{" "}
            </Link>

            {/* {user.user.is_customer ? (
              <div className="checkout-page">
                <form onSubmit={this.updateOrderStatus}>
                  <div className="checkout-form">
                    <div className="row check-out">
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <br></br>
                        <div className="field-label">Update order status</div>

                        <Select
                          className="mb-3"
                          onChange={this.handleChangeOrderStatus}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          options={this.state.shopOrderStatus}
                          onInputChange={this.handleInputChange}
                          placeholder={"Select order status"}
                          menuIsOpen={this.state.menuOpen}
                        />
                      </div>
                    </div>
                    <br></br>
                    <input
                      type="submit"
                      className="btn btn-solid"
                      id="submit"
                      placeholder="Submit"
                      required=""
                    />
                  </div>
                </form>
                <br></br>
              </div>
            ) : (
              ""
            )} */}
            {user.user.is_staff_user ? (
              <div className="checkout-page">
                <form onSubmit={this.updateOrderStatus}>
                  <div className="checkout-form">
                    <div className="row check-out">
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <br></br>
                        <div className="field-label">Update order status</div>

                        <Select
                          className="mb-3"
                          onChange={this.handleChangeOrderStatus}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          options={this.state.staffOrderStatus}
                          onInputChange={this.handleInputChange}
                          placeholder={"Select order status"}
                          menuIsOpen={this.state.menuOpen}
                        />
                      </div>
                    </div>
                    <br></br>
                    <input
                      type="submit"
                      className="btn btn-solid"
                      id="submit"
                      placeholder="Update"
                      required=""
                    />
                  </div>
                </form>
                <br></br>
              </div>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-lg-9">
                <div className="dashboard-right">
                  <div className="dashboard">
                    <div className="box-account box-info">
                      <div className="box-head">
                        <h3>{order.shop_name}</h3>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="box">
                            <div className="box-title">
                              <h4>Order No: {order.id}</h4>
                            </div>
                            <h6>Date: {order.start_date}</h6>
                            {/* <h6>Status: {order.orderStatus}</h6> */}
                            <h6
                              className={
                                order.status === "Pending" ? "text-danger" : ""
                              }
                            >
                              Status: {order.orderStatus}
                            </h6>
                            <h6>Mod of Payment: {order.mode_of_payment}</h6>
                          </div>

                          {user.user && (
                            <React.Fragment>
                              {user.user.is_customer ? (
                                <Button
                                  type="submit"
                                  // variant="info"
                                  variant="outline-danger"
                                  size="sm"
                                  // onClick={() => this.orderCancelCustoemr}
                                  onClick={this.orderCancelCustoemr}
                                >
                                  Cancel order
                                </Button>
                              ) : null}
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {order.coupon ? (
              <Row>
                <Col>
                  <Alert variant={"success"}>
                    {" "}
                    {order.coupon_code} coupon Applied !!{order.coupon_offer}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <div className="row section-t-space">
              <div className="col-lg-6">
                <div className="stripe-section">
                  <h5>Address</h5>
                  <div>
                    <h5 className="checkout_class">{orderAddress.PlaceName}</h5>
                    <h6 className="checkout_class">{orderAddress.areaName}</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td>{orderAddress.full_address}</td>
                        </tr>
                        <tr>
                          <td>{orderAddress.districtName}</td>
                          <td>{orderAddress.vilalgeName}</td>
                        </tr>
                        {/* <tr>
                          <td>{orderAddress.district}</td>
                          <td>{orderAddress.state}</td>
                        </tr> */}
                        {/* <br></br> */}
                        <tr>
                          <td>
                            {" "}
                            <a href={"tel:" + orderAddress.phone_number}>
                              {orderAddress.phone_number}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {order ? (
              <div className="row section-t-space">
                <div className="col-lg-6">
                  <div className="stripe-section">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <div className="checkout-details">
                        <div className="order-box">
                          <div className="title-box">
                            <div>
                              Product <span> Total</span>
                            </div>
                          </div>
                          <ul className="qty">
                            {/* {orderItems.map(order_item => ( */}
                            {orderItems.map((item, index) => {
                              return (
                                // <li key={index}>
                                //   {item.title} × {item.quantity}{" "}
                                //   <span>Rs: {item.final_price}</span>
                                // </li>
                                <Row>
                                  <Col xs={8}>
                                    {" "}
                                    {item.itemLocalName
                                      ? item.itemLocalName
                                      : item.itemName}{" "}
                                    [{item.vname}] × {item.quantity}{" "}
                                  </Col>
                                  <Col xs={4}>Rs: {item.final_price}</Col>
                                </Row>
                              );
                            })}
                          </ul>

                          <ul className="total">
                            <li>
                              Total <span className="count">{order.total}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(OrderItem);
// export default OrderItem;
