import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  addressListURL,
  checkoutURL,
  orderSummaryURL,
  ShopModeOfPaymentURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import { fetchCart } from "../../../actions/cart";
import Header from "../common/header";
import Footer from "../common/footer";

class checkOut extends Component {
  state = {
    shipping: 25,
    addressList: [],
    cart: null,
    selectedAddress: null,
    shop_id: null,
    ShopModeOfPayment: [],
    selectedModeofPayment: null
  };

  componentDidMount() {
    this.handleFetchAddresses();
    // this.props.refreshCart();
    this.handleFetchOrder();
  }

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
    console.log("fetching mode");
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

  handleAddress = event => {
    this.setState({ selectedAddress: event.target.value });
    console.log(event.target.value);
  };

  handleModeOfPayment = event => {
    this.setState({ selectedModeofPayment: event.target.value });
    console.log(event.target.value);
  };
  submit = ev => {
    ev.preventDefault();
    console.log("submitting");
    this.setState({ loading: true });
    const { selectedAddress, selectedModeofPayment } = this.state;

    if ((selectedAddress !== null) | (selectedModeofPayment !== null)) {
      authAxios
        .post(checkoutURL, {
          selectedAddress,
          selectedModeofPayment
        })
        .then(res => {
          this.setState({ loading: false, success: true });
          toast.success("This shop added to your favorites");
          this.redirectToOrders();
        })
        .catch(err => {
          this.setState({ loading: false, error: err }, () => {
            this.redirectToOrders();
          });
        });
    } else {
      toast.error("Please select an address and mode of payment");
    }
  };

  redirectToOrders() {
    this.props.refreshCart();
    console.log("refreshcard");
    setTimeout(this.props.history.push("/orders"), 10000);
  }

  render() {
    const { isAuthenticated } = this.props;
    const {
      addressList,
      selectedAddress,
      cart,
      ShopModeOfPayment,
      shop_id
    } = this.state;

    // console.log(ShopModeOfPayment);
    // console.log(shop_id);

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        {/* <Header /> */}
        <ToastContainer />
        {/* <Footer /> */}
        {cart ? (
          <div className="container padding-cls">
            <div className="checkout-page">
              <div className="checkout-form">
                <div className="col-lg-6 col-sm-12 col-xs-12">
                  <div className="checkout-details">
                    <div className="order-box">
                      <div className="title-box">
                        <div>
                          Product <span> Total</span>
                        </div>
                      </div>
                      <ul className="qty">
                        {cart.order_items.map((item, index) => {
                          return (
                            <li key={index}>
                              {item.item.title} × {item.quantity}{" "}
                              <span>
                                {/* {symbol} */}
                                {item.final_price}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="sub-total">
                        <li>
                          Subtotal{" "}
                          <span className="count">
                            {/* {symbol} */}
                            {cart.total}
                          </span>
                        </li>
                        <li>
                          Shipping{" "}
                          <span className="count">
                            {/* {symbol} */}
                            {this.state.shipping}
                          </span>
                        </li>
                      </ul>

                      <ul className="total">
                        <li>
                          Total{" "}
                          <span className="count">
                            {/* {symbol} */}
                            {this.state.shipping + cart.total}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {ShopModeOfPayment ? (
                <section className="section-b-space">
                  <div className="container">
                    <div className="account-sidebar">
                      <h6 style={{ color: "#FFF" }}> Select Mode of Payment</h6>
                    </div>
                    {ShopModeOfPayment.map(mode => (
                      <div key={mode.id} className="row">
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="box">
                                      <div className="radio">
                                        <label>
                                          <input
                                            value={mode.id}
                                            type="radio"
                                            name="optradio"
                                            onChange={this.handleModeOfPayment}
                                          />
                                          {"  "}
                                          {mode.name}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
              {addressList ? (
                <section className="section-b-space">
                  <div className="container">
                    <div className="account-sidebar">
                      <h6 style={{ color: "#FFF" }}> Select Address</h6>
                    </div>
                    {addressList.map(address => (
                      <div key={address.id} className="row">
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
                                  <h2>{address.PlaceName}</h2>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="box">
                                      <div className="box-title">
                                        <h3>{address.areaName}</h3>
                                      </div>
                                      <div className="box-content">
                                        <h6>{address.full_address}</h6>
                                        <h6>Village: {address.vilalgeName}</h6>
                                        <h6>
                                          District: {address.districtName}
                                        </h6>
                                        <h6>Sate: {address.stateName}</h6>
                                        <h6>Phone: {address.phone_number}</h6>
                                        <br></br>
                                      </div>
                                      <div className="radio">
                                        <label>
                                          <input
                                            value={address.id}
                                            type="radio"
                                            name="optradio"
                                            onChange={this.handleAddress}
                                          />{" "}
                                          Select
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <div>
                  <Link style={{ color: "#FFF" }} to={`/create-address`}>
                    Add Address
                  </Link>
                </div>
              )}
              <br></br>
              <button
                type="button"
                className="btn-solid btn"
                onClick={this.submit}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <p>You dont have an active order</p>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
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
