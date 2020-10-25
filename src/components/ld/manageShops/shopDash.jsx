import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import {
  ShopDashboardDetialURL,
  ShopDashProductsURL,
  ShopDashOrdersURL,
  ShopDashOpenStatusURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";

const Wrapper = styled.div`
  margin: 20px 2px 30px 2px;
  display: flex;
  flex-direction: column;
`;

const SectionWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 5px 30px 5px;
  padding: 2px;
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

const CheckoutHeadingContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

  refreshpage = () => {
    console.log("hi");
    window.location.reload();
  };

  render() {
    const { ShopDetail, orders } = this.state;
    const { token } = this.props;
    // console.log(token);

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <Wrapper>
          <Card>
            {/* shop detail  */}
            {ShopDetail ? (
              <SectionWrap>
                <h2>{ShopDetail.name}</h2>
                <h6>{ShopDetail.place}</h6>
                <h6>Phone: {ShopDetail.phone_number}</h6>
                <h4>
                  {ShopDetail.is_accepting_orders ? (
                    <Alert variant={"success"}>Your shop is open</Alert>
                  ) : (
                    <Alert variant={"danger"}>Your shop is closed</Alert>
                  )}
                </h4>
                <StyledButton
                  onClick={() => {
                    this.shopOpenStatus(
                      !ShopDetail.is_accepting_orders,
                      ShopDetail.id
                    );
                  }}
                  variant={
                    ShopDetail.is_accepting_orders
                      ? "outline-danger"
                      : "outline-success"
                  }
                >
                  {ShopDetail.is_accepting_orders ? "Close shop" : "Open shop"}
                </StyledButton>
              </SectionWrap>
            ) : null}

            {/* orders  */}
            {orders ? (
              <SectionWrap>
                <h3>{this.state.orders.pendingOrders} Pending Orders</h3>
                <Link to="/shop-order-table">
                  <StyledButton>Go to orders</StyledButton>
                </Link>
              </SectionWrap>
            ) : null}

            {/* products  */}
            {orders ? (
              <SectionWrap>
                <h3>{this.state.orders.item} Products in your shop</h3>
                <Link to="/shop-product-list">
                  <StyledButton>Go to products</StyledButton>
                </Link>
              </SectionWrap>
            ) : null}
          </Card>
        </Wrapper>
      </>
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
