import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import axios from "axios";
import { authAxios } from "../../../authAxios";
import { fetchUser } from "../../../actions/user";
// import Select from "react-select";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Alert, Row, Col } from "react-bootstrap";
import styled from "styled-components";
// import Card from "../styled.utils.js";

import {
  orderDetailURL,
  orderAddressURL,
  orderStatusUpdateURL,
  orderStatusListURL
} from "../../../constants";

const Wrapper = styled.div`
  margin: 20px auto 30px auto;
  display: flex;
  flex-direction: column;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
`;

const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 30px;
  cursor: pointer;
  background: #ff4c3b;
  color: #fff;
  border: none;
  border-radius: 5px;
  border: 1px #fff solid;
  width: 150px;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: auto;
`;

const CheckoutHeadingContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    this.props.fetchUserType();
  }

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

  render() {
    const {
      order,
      orderAddress,
      orderItems,
      ShopSuccess,
      CustomerSuccess
    } = this.state;

    // const { userType } = this.props;
    // console.log(this.state.shopOrderStatus, userType);
    // console.log(order);

    if (CustomerSuccess) {
      return <Redirect to="/orders" />;
    }

    return (
      <Wrapper>
        <ToastContainer />
        <Card>
          {/* summary */}
          <h3>{order.shop_name}</h3>
          <h4>Order No: {order.id}</h4>
          <h6>Date: {order.start_date}</h6>
          <h6>Status: {order.orderStatus}</h6>
          <h6>Mod of Payment: {order.mode_of_payment}</h6>
          {order.orderStatus !== "Cancelled by customer" ? (
            <StyledButton type="submit" onClick={this.orderCancelCustoemr}>
              Cancel order
            </StyledButton>
          ) : (
            <Alert variant={"danger"}>Order has been cancelled</Alert>
          )}

          {/* product detail  */}

          <CheckoutHeadingContainer>
            <h2> Product details</h2>
          </CheckoutHeadingContainer>

          <ProductDetail>
            <h2>Product</h2>
            <h4>Price</h4>
          </ProductDetail>

          {orderItems.map((item, index) => {
            return (
              <ProductDetail key={index}>
                <h6>
                  {item.itemLocalName ? item.itemLocalName : item.itemName} [
                  {item.vname}] × {item.quantity}
                </h6>
                <h6>Rs: {item.final_price}</h6>
              </ProductDetail>
            );
          })}
          <ProductDetail>
            <h4>Total</h4>
            <h4> Rs: {order.total}</h4>
          </ProductDetail>

          {/* coupon */}

          {order.coupon ? (
            <Alert variant={"success"}>
              {" "}
              {order.coupon_code} coupon Applied !!{order.coupon_offer}
            </Alert>
          ) : null}

          {/* ///address */}
          <CheckoutHeadingContainer>
            <h2> Order Address</h2>
          </CheckoutHeadingContainer>
          <>
            <h2>{orderAddress.PlaceName}</h2>
            <h4>{orderAddress.areaName}</h4>
            <h5>{orderAddress.full_address}</h5>
            <h5>Village: {orderAddress.vilalgeName}</h5>
            <h5>District: {orderAddress.districtName}</h5>
            <h5>Sate: {orderAddress.stateName}</h5>
            <h5>Phone: {orderAddress.phone_number}</h5>
            <a href={"tel:" + orderAddress.phone_number}>
              {orderAddress.phone_number}
            </a>
          </>
        </Card>
      </Wrapper>
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
