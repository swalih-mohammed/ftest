import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Navbar, Alert, Col, Row } from "react-bootstrap";
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
    const {
      addressList,
      selectedAddress,
      cart,
      ShopModeOfPayment,
      shop_id,
      offer,
      error
    } = this.state;

    console.log(this.state.cart);
    // console.log(addressList.length);

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        {/* <Header /> */}
        <ToastContainer />
        {/* <Footer /> */}
        {this.state.loading ? (
          <div className="loading-cls"></div>
        ) : (
          <React.Fragment>
            {cart ? (
              <div className="container padding-cls">
                <div className="checkout-page">
                  <div className="checkout-form">
                    <section className="section-b-space">
                      <div className="container">
                        <Navbar bg="dark">
                          <h4 style={{ color: "white" }}>Shop details</h4>
                        </Navbar>

                        <div className="row">
                          <div className="col-lg-9">
                            <div className="dashboard-right">
                              <div className="dashboard">
                                <div className="box-account box-info">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="box">
                                        <h3>{cart.shop_name}</h3>
                                        <h6>{cart.place_name}</h6>
                                      </div>
                                      <br></br>
                                      <h4>{cart.shipping_message}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* end of shop detail  */}
                    <div className="col-lg-6 col-sm-8 col-xs-12">
                      <Navbar bg="dark">
                        <h4 style={{ color: "white" }}>Product details</h4>
                      </Navbar>
                      <div className="checkout-details">
                        <div className="order-box">
                          <div className="title-box">
                            {/* <div>
                          Product <span> Total</span>
                        </div> */}
                            <Row>
                              <Col xs={8}>
                                <h4>Product</h4>
                              </Col>

                              <Col xs={4}>
                                {" "}
                                <h4>Total</h4>{" "}
                              </Col>
                            </Row>
                          </div>
                          <ul className="qty">
                            {cart.order_items.map((item, index) => {
                              return (
                                // <li key={index}>
                                //   {item.itemLocalName ? (
                                //     <React.Fragment>
                                //       {item.itemLocalName} [{item.vname}] {" x "}{" "}
                                //       {item.quantity}
                                //     </React.Fragment>
                                //   ) : (
                                //     <React.Fragment>
                                //       {item.itemName} [{item.vname}] {" x "}{" "}
                                //       {item.quantity}
                                //     </React.Fragment>
                                //   )}

                                //   <span>
                                //     {/* {symbol} */}
                                //     {item.final_price}
                                //   </span>
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
                          <ul className="sub-total">
                            {/* <li>
                          Total{" "}
                          <span className="count">
                           
                            {cart.total}
                          </span>
                        </li> */}
                            <Row>
                              <Col xs={8}>
                                <h4 className="text-danger">Total</h4>
                              </Col>

                              <Col xs={4}>
                                {" "}
                                <h4 className="text-danger">
                                  {cart.total}
                                </h4>{" "}
                              </Col>
                            </Row>
                            {/* <li>
                          Shipping{" "}
                          <span className="count">{this.state.shipping}</span>
                        </li> */}
                          </ul>
                          {/* 
                      <ul className="total">
                        <li>
                          Total{" "}
                          <span className="count">
                       
                            {cart.total}
                          </span>
                        </li>
                      </ul> */}
                        </div>

                        <Link style={{ color: "#FFF" }} to={`/order-summary`}>
                          <button type="button" className="btn btn-secondary">
                            Edit Order
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {addressList.length > 0 ? (
                    <section className="section-b-space">
                      <div className="container">
                        <Navbar bg="dark">
                          <h4 style={{ color: "white" }}>Delivery Address</h4>
                        </Navbar>
                        <OrderAddress address={addressList[0]} />
                      </div>
                    </section>
                  ) : (
                    <section className="section-b-space">
                      <div className="container">
                        <div className="account-sidebar">
                          <Link
                            style={{ color: "#FFF" }}
                            to={`/create-address`}
                          >
                            Add Address
                          </Link>
                        </div>
                      </div>
                    </section>
                  )}

                  {ShopModeOfPayment ? (
                    <section className="section-b-space">
                      <div className="container">
                        <Navbar bg="dark">
                          <h4 style={{ color: "white" }}>
                            Select Payment Method
                          </h4>
                        </Navbar>
                        <ModeOfPayment
                          handleModeOfPayment={this.handleModeOfPayment}
                          options={ShopModeOfPayment}
                        />
                      </div>
                    </section>
                  ) : null}

                  <section className="section-b-space">
                    <div className="container">
                      <Alert
                        onClick={() => {
                          this.handleDisplyCoupon();
                        }}
                        variant={"success"}
                      >
                        Have a coupon ?
                      </Alert>
                      <div
                        className="row"
                        style={{
                          display: this.state.Coupondisplay ? "" : "none"
                        }}
                      >
                        <div className="col-lg-6">
                          <div className="theme-card">
                            <form
                              className="theme-form"
                              // onSubmit={this.handleCouponSubmit}
                            >
                              <div className="form-group">
                                <Navbar bg="dark">
                                  <h4 style={{ color: "white" }}>
                                    Enter Coupon code
                                  </h4>
                                </Navbar>
                                <br></br>
                                {/* <label htmlFor="coupon">Enter Coupon code</label> */}
                                <input
                                  // onChange={this.handleCouponChange}
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
                                {offer ? (
                                  <Alert variant={"success"}>
                                    Offer Applied !!{offer.message}
                                  </Alert>
                                ) : null}
                              </div>
                              <div>
                                {error ? (
                                  <Alert variant={"danger"}>
                                    {" "}
                                    This coupon is not valid
                                  </Alert>
                                ) : null}
                              </div>
                              <Button
                                type="submit"
                                onClick={this.handleCouponSubmit.bind(this)}
                                variant="flat"
                                size="xxl"
                                style={{ color: "red" }}
                              >
                                Apply coupon
                              </Button>
                            </form>
                          </div>
                        </div>
                      </div>

                      <br></br>
                      <button
                        type="button"
                        className="btn-solid btn"
                        onClick={this.submit}
                      >
                        Place Order
                      </button>
                    </div>
                    <br /> <br />
                  </section>
                </div>
              </div>
            ) : (
              <p>You dont have an active order</p>
            )}{" "}
          </React.Fragment>
        )}
      </div>
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
// export default checkOut;
