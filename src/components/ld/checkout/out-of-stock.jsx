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
    this.handleFetchAddresses();
    // this.props.refreshCart();
    this.handleFetchOrder();
  }
  handleDisplyCoupon = () => {
    this.setState({ Coupondisplay: !this.state.Coupondisplay });
  };
  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        this.setState({ cart: res.data, loading: false });
        this.setState({ shop_id: res.data.shop_id }, () => {
          this.fetchModeOfPayment();
        });
      })

      .catch(err => {
        this.setState({ error: err });
      });
  };

  fetchModeOfPayment = () => {
    // console.log("fetching mode");
    const shopID = this.state.shop_id;
    if (shopID !== undefined) {
      // console.log(shopID);
      this.setState({ loading: true });
      authAxios
        .get(ShopModeOfPaymentURL, {
          params: {
            shopID
          }
        })
        .then(res => {
          this.setState({ ShopModeOfPayment: res.data, loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    }
  };

  handleFetchAddresses = async () => {
    this.setState({ loading: true });
    authAxios
      .get(addressListURL)
      .then(res => {
        this.setState({ addressList: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleCouponChange = e => {
    this.setState({ coupon: e.target.value });
    // console.log(e.target.value);
  };

  handleCouponSubmit = async e => {
    e.preventDefault();
    // console.log(this.state.coupon);
    const code = this.state.coupon;
    if (code !== "") {
      this.setState({ loading: true });
      authAxios
        .post(addCouponURL, {
          code
        })
        .then(res => {
          this.setState({ offer: res.data, loading: false });
          toast.success("Coupon applied succesfully");
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    } else {
      toast.error("Coupon not entered");
    }
  };

  handleAddress = event => {
    this.setState({ selectedAddress: event.target.value });
    console.log(event.target.value);
  };

  handleModeOfPayment = mode => {
    this.setState({ selectedModeofPayment: mode });
    // console.log(mode);
  };

  submit = ev => {
    ev.preventDefault();
    console.log("test");
    if (this.state.addressList) {
    }
    const selectedAddress = this.state.addressList[0].id;
    // console.log(addressList);
    this.setState({ submitting: true });
    const { addressList } = this.state;
    const selectedModeofPayment = 1;

    if (selectedModeofPayment !== null && addressList.length > 0) {
      authAxios
        .post(checkoutURL, {
          selectedAddress,
          selectedModeofPayment
        })
        .then(res => {
          this.setState({ submitting: false, success: true });
          toast.success("Order placed succesfully");
          this.redirectToOrders();
          this.props.refreshCart();
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data) {
              const error = err.response.data.message;
              this.setState({ out_of_stock_items: error, submitting: false });
              // console.log(error)
            } else {
              toast.error("Error");
            }
          }
        });
    } else {
      this.setState({ submitting: false });
      // toast.error("Please select mode of payment and create an address");
    }
  };

  redirectToOrders() {
    this.props.clearKart();
    // console.log("refreshcard");
    setTimeout(this.props.history.push("/orders"), 10000);
  }

  render() {
    const { isAuthenticated } = this.props;
    // const { address } = this.state.addressList[0];
    const { cart, success } = this.state;

    console.log(this.state.out_of_stock_items);
    console.log(cart);

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    if (success) {
      return <Redirect to="/orders" />;
    }
    return (
      <Container>
        {this.state.loading ? (
          <Loader style={{ marginBottom: "30px" }} />
        ) : null}

        {cart.order_items.map((item, index) => {
          return (
            <ProductDetail key={index}>
              <h5>
                {item.itemLocalName ? item.itemLocalName : item.itemName}[
                {item.vname}] × {item.quantity}
              </h5>
              <h5>Rs:{item.final_price}</h5>
            </ProductDetail>
          );
        })}

        {this.props.out_of_stock_items ? (
          <>
            {" "}
            {this.state.out_of_stock_items.length > 0 ? (
              <Alert>
                <p style={{ color: "red" }}>{this.state.out_of_stock_items}</p>
                <h6 style={{ color: "red" }}>
                  are out of stock, do you want to continue?
                </h6>
                <Button onClick={this.submit}>Confirm order</Button>
              </Alert>
            ) : null}
          </>
        ) : null}
      </Container>
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
