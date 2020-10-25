import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { Navbar, Alert, Col, Row, Container } from "react-bootstrap";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  addressListURL,
  checkoutURL,
  orderSummaryURL,
  ShopModeOfPaymentURL,
  addCouponURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import { fetchCart, clearKart } from "../../../actions/cart";
import ModeOfPayment from "./modeOfPayment";
import OrderAddress from "./orderAddress";

const PageContainer = styled.div`
  margin-bottom: 50px;
`;

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
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
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
const ProductTitle = styled.h2`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #202428;
`;
const ProductSecondTitle = styled.h2`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #202428;
`;
const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: auto;
`;

const ProductDetailItem = styled.div`
  padding: 2px;
  margin: 2px;
  font-size: 15px;
  font-weight: 500;
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
const Button = styled.button`
  margin-top: 10px;
  min-width: 100px;
  border: 1px solid #ff5722;
  background: #fff;
  padding: 7px 14px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  &:hover {
    width: auto;
    background: #ff5722;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
  }
`;

class checkOut extends Component {
  state = {
    loading: false,
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
    error: ""
  };

  componentDidMount() {
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

    if (this.state.addressList) {
    }
    const selectedAddress = this.state.addressList[0].id;
    // console.log(addressList);
    this.setState({ loading: true });
    const { selectedModeofPayment, addressList } = this.state;

    if (selectedModeofPayment !== null && addressList.length > 0) {
      authAxios
        .post(checkoutURL, {
          selectedAddress,
          selectedModeofPayment
        })
        .then(res => {
          this.setState({ loading: false, success: true });
          toast.success("Order placed succesfully");
          this.redirectToOrders();
          this.props.refreshCart();
        })
        .catch(err => {
          this.setState({ loading: false, error: err }, () => {
            // this.redirectToOrders();
            toast.success("There was an error");
            this.setState({ loading: false });
          });
        });
    } else {
      this.setState({ loading: false });
      toast.error("Please select mode of payment and create an address");
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
    const {
      addressList,
      selectedAddress,
      cart,
      ShopModeOfPayment,
      shop_id,
      offer,
      error
    } = this.state;

    // console.log(this.state.cart);
    // console.log(addressList.length);

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <PageContainer>
        {cart ? (
          <div>
            <div>
              <CheckoutContainer>
                <CheckOutWrapper>
                  <CheckOutWrapperContainer>
                    <CheckoutHeadingContainer>
                      <h2> Shop details</h2>
                    </CheckoutHeadingContainer>
                    <CheckoutItem>
                      <h3>{cart.shop_name}</h3>
                      <h4>{cart.place_name}</h4>
                    </CheckoutItem>
                  </CheckOutWrapperContainer>
                </CheckOutWrapper>

                <CheckOutWrapper>
                  <CheckOutWrapperContainer>
                    <CheckoutHeadingContainer>
                      <h2> Product Details</h2>
                    </CheckoutHeadingContainer>

                    {cart.order_items.map((item, index) => {
                      return (
                        <ProductDetail>
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
                      <h3>Rs: 123</h3>
                    </ProductTotal>
                  </CheckOutWrapperContainer>
                </CheckOutWrapper>
              </CheckoutContainer>
            </div>

            {addressList.length > 0 ? (
              <>
                <CheckOutWrapper>
                  <CheckOutWrapperContainer>
                    <CheckoutHeadingContainer>
                      <h2> Delivery Address</h2>
                    </CheckoutHeadingContainer>
                    <OrderAddress address={addressList[0]} />
                  </CheckOutWrapperContainer>
                </CheckOutWrapper>
              </>
            ) : (
              <section className="section-b-space">
                <div className="container">
                  <div className="account-sidebar">
                    <Link style={{ color: "#FFF" }} to={`/create-address`}>
                      Add Address
                    </Link>
                  </div>
                </div>
              </section>
            )}

            <CheckOutWrapper>
              <CheckOutWrapperContainer>
                <CouponContainer>
                  <div>
                    <h5>
                      Do you have a coupon?{" "}
                      <span style={{ float: "right" }}>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          onClick={() => {
                            this.handleDisplyCoupon();
                          }}
                        />
                      </span>
                    </h5>
                  </div>
                  <div
                    style={{
                      display: this.state.Coupondisplay ? "" : "none"
                    }}
                  >
                    <div>
                      <h5>Enter your coupon</h5>
                    </div>
                    <div></div>
                    <div>
                      <input
                        onChange={this.handleCouponChange.bind(this)}
                        type="text"
                        className="form-control"
                        id="coupon"
                        value={this.state.coupon}
                        name="coupon"
                        required=""
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        onClick={this.handleCouponSubmit.bind(this)}
                      >
                        Apply coupon
                      </Button>
                    </div>
                    <div>
                      {offer ? (
                        <Alert variant={"success"}>
                          Offer Applied !!{offer.message}
                        </Alert>
                      ) : null}
                    </div>
                    <div>
                      {error ? (
                        <Alert variant={"danger"}>
                          This coupon is not valid
                        </Alert>
                      ) : null}
                    </div>
                  </div>
                </CouponContainer>
              </CheckOutWrapperContainer>
            </CheckOutWrapper>
            <Button type="button" onClick={this.submit}>
              Place Order
            </Button>
          </div>
        ) : (
          <p>You dont have an active order</p>
        )}
      </PageContainer>
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
