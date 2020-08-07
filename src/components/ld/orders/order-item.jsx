import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import axios from "axios";
import { authAxios } from "../../../authAxios";
import { fetchUser } from "../../../actions/user";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    success: false,
    error: null,
    addressID: null,
    orderAddress: [],
    orderItems: [],
    orderID: null,
    shippingCharges: 25,
    orderTotal: null,
    orderStatus: [],
    selectedOrderStatus: null
  };

  componentDidMount() {
    this.fetchOrder();
    this.fetchOrderStatus();
    this.props.fetchUserType();
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
    const { shippingCharges } = this.state;
    authAxios
      .get(orderDetailURL(params.orderID))
      .then(res => {
        this.setState({
          order: res.data,
          loading: false,
          addressID: res.data.shipping_address,
          orderID: res.data.id,
          orderItems: res.data.order_items,
          orderTotal: res.data.total + shippingCharges
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

  handleChangeOrderStatus = status => {
    // console.log(status);
    this.setState({
      selectedOrderStatus: status.id
    });
  };
  updateOrderStatus = e => {
    e.preventDefault();
    const { orderID } = this.state;

    const { selectedOrderStatus } = this.state;
    console.log(selectedOrderStatus);

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

  callbacktest = () => {
    console.log(this.state.orderStatus);
  };

  render() {
    const { order, orderAddress, orderItems, success } = this.state;
    const { userType } = this.props;

    if (success) {
      return <Redirect to="/shop-order-table" />;
    }

    return (
      <div>
        <ToastContainer />
        <Breadcrumb title={"Order Details"} />
        <section className="section-b-space">
          <div className="container padding-cls">
            <a href="/orders">
              <div className="account-sidebar">Back to Orders</div>
            </a>
            {(userType === "DeliveryStaff") |
            (userType === "ShopOwner") |
            (userType === "is_staff_user") ? (
              <div className="checkout-page">
                <form onSubmit={this.updateOrderStatus}>
                  <div className="checkout-form">
                    <div className="row check-out">
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Update order status</div>

                        <Select
                          className="mb-3"
                          onChange={this.handleChangeOrderStatus}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          options={this.state.orderStatus}
                          isSearchable={true}
                          //   filterOption={this.customFilter}
                          onInputChange={this.handleInputChange}
                          noOptionsMessage={() => null}
                          placeholder={"Select order status"}
                          autoFocus={true}
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
            )}

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
                        <h3>{order.shop_name}</h3>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="box">
                            <div className="box-title">
                              <h4>Order No: {order.id}</h4>
                            </div>
                            <h6>Date: {order.start_date}</h6>
                            <h6>Status: {order.orderStatus}</h6>
                          </div>
                          <br></br>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row section-t-space">
              <div className="col-lg-6">
                <div className="stripe-section">
                  <h5>Address</h5>
                  <div>
                    <h5 className="checkout_class">{orderAddress.place}</h5>
                    <h6 className="checkout_class">{orderAddress.area}</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td>{orderAddress.house_name}</td>
                        </tr>
                        <tr>
                          <td>{orderAddress.road_name}</td>
                          <td>{orderAddress.village}</td>
                        </tr>
                        <tr>
                          <td>{orderAddress.district}</td>
                          <td>{orderAddress.state}</td>
                        </tr>
                        <tr>
                          <td>{orderAddress.phone_number}</td>
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
                                <li key={index}>
                                  {item.item.title} × {item.quantity}{" "}
                                  <span>Rs: {item.final_price}</span>
                                </li>
                              );
                            })}
                          </ul>
                          <ul className="sub-total">
                            <li>
                              Subtotal{" "}
                              <span className="count">
                                {/* {symbol} */}
                                {order.total}
                              </span>
                            </li>
                            <li>
                              Shipping{" "}
                              <span className="count">
                                {/* {symbol} */}
                                {this.state.shippingCharges}
                              </span>
                            </li>
                          </ul>

                          <ul className="total">
                            <li>
                              Total{" "}
                              <span className="count">
                                {this.state.orderTotal}
                              </span>
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
    userType: state.user.user.UserType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserType: () => dispatch(fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderItem);
// export default OrderItem;
