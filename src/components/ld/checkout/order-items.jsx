import React, { Component } from "react";
// import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import SimpleReactValidator from "simple-react-validator";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from "react-bootstrap";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader, ButtonLoader } from "../common/loader";
import { Container } from "../styled/utils";
import EmptyCartSVG from "./empty-cart-svg";
import {
  addressListURL,
  checkoutURL,
  orderSummaryURL,
  ShopModeOfPaymentURL,
  addCouponURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import { fetchCart, clearKart } from "../../../actions/cart";
// import ModeOfPayment from "./modeOfPayment";
import OrderAddress from "./orderAddress";

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const CouponContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckOutWrapper = styled.div`
  margin: 5px auto;
  border: 1px solid #ccc;
  background-color: #ffff;
  width: 100%;
  max-width: 800px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
`;

const CheckOutWrapperContainer = styled.div`
  margin: 10px;
  padding: 5px;
`;
const CheckoutHeadingContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckoutItem = styled.div`
  height: auto;
  padding: 5px 10px;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: auto;
`;

const ProductTotal = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 25px;
  /* height: auto; */
  h3 {
    padding: 5px;
    margin: 5px;
    font-size: 25px;
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #ff5722;
  width: 250px;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 35px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  &:hover {
    background: #ff5722;
    color: #ffffff;
  }
`;
class checkOut extends Component {
  state = {
    loading: false,
    submitting: false,
    shipping: 25,
    addressList: [],
    cart: null,
    selectedAddress: null,
    shop_id: null,
    ShopModeOfPayment: [],
    selectedModeofPayment: null,
    coupon: "",
    Coupondisplay: false,
    offer: "",
    error: "",
    out_of_stock_items: []
  };
  componentWillMount() {
    this.props.refreshCart();
  }
  render() {
    const { cart } = this.props;
    return (
      <>
        {this.state.loading ? (
          <Loader style={{ marginBottom: "30px" }} />
        ) : null}

        {cart ? (
          <>
            {cart.order_items ? (
              <>
                {cart.order_items.map((item, index) => {
                  return (
                    <ProductDetail key={index}>
                      <h5>
                        {item.itemLocalName
                          ? item.itemLocalName
                          : item.itemName}
                        [{item.vname}] × {item.quantity}
                      </h5>
                      <h5>Rs:{item.final_price}</h5>
                    </ProductDetail>
                  );
                })}
                <ProductTotal>
                  <h3>Total</h3>
                  <h3>{cart.total}</h3>
                </ProductTotal>
              </>
            ) : null}
          </>
        ) : null}

        {this.props.out_of_stock_items ? (
          <>
            {this.props.out_of_stock_items.length > 0 ? (
              <Alert>
                <p style={{ color: "red" }}>{this.props.out_of_stock_items}</p>
                <h6 style={{ color: "red" }}>are out of stock </h6>

                {cart.order_items ? (
                  <>
                    <h6> do you want to continue?</h6>
                    <Button onClick={this.props.submit}>Confirm order</Button>
                  </>
                ) : null}
              </Alert>
            ) : null}
          </>
        ) : null}
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart()),
    clearKart: () => dispatch(clearKart)
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token,
    cart: state.cart.shoppingCart
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkOut);
