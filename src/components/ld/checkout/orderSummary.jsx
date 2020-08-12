import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import {
  orderSummaryURL,
  addToCartURL,
  orderItemUpdateQuantityURL
} from "../../../constants";
import { fetchCart } from "../../../actions/cart";
import { authAxios } from "../../../authAxios";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class OrderSummary extends Component {
  state = {
    cartItems: null,
    quantity: 1,
    error: null
  };

  componentDidMount() {
    this.handleFetchOrder();
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        this.setState({ cartItems: res.data, loading: false });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: "You currently do not have an order",
            loading: false
          });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  handleAddToCart2 = (id, shop) => {
    console.log(id, shop);
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { id, shop })
      .then(res => {
        this.handleFetchOrder();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        toast.error("Oops there was an error");
      });
  };

  handleRemoveQuantityFromCart = id => {
    authAxios
      .post(orderItemUpdateQuantityURL, { id })
      .then(res => {
        this.handleFetchOrder();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { cartItems } = this.state;
    console.log(cartItems);
    // console.log("order sum");
    return (
      <div>
        <ToastContainer />
        {cartItems ? (
          // <section className="cart-section section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  {cartItems.order_items.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className="col-xs-4">
                            <h6> {item.item.title}</h6>
                          </td>
                          <td>
                            <div className="mobile-cart-content row">
                              <div className="col-xs-4">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <span className="input-group-prepend">
                                      <button
                                        type="button"
                                        className="btn quantity-left-minus"
                                        // onClick={this.minusQty}
                                        onClick={() =>
                                          this.handleRemoveQuantityFromCart(
                                            item.item.id
                                          )
                                        }
                                        data-type="minus"
                                        data-field=""
                                      >
                                        {/* <i className="fa fa-angle-left"></i> */}
                                        <FontAwesomeIcon
                                          icon={faMinus}
                                          size={"lg"}
                                          color={"#ff4c3b"}
                                        />
                                      </button>
                                    </span>
                                    <input
                                      type="text"
                                      name="quantity"
                                      value={item.quantity}
                                      // onChange={this.changeQty}
                                      onChange={this.changeQty}
                                      className="form-control input-number"
                                    />
                                    <span className="input-group-prepend">
                                      <button
                                        type="button"
                                        className="btn quantity-right-plus"
                                        // onClick={this.handleAddToCart2}
                                        onClick={() =>
                                          this.handleAddToCart2(
                                            item.item.id,
                                            item.shop
                                          )
                                        }
                                        data-type="plus"
                                        data-field=""
                                      >
                                        {/* <i className="fa fa-angle-right"></i> */}
                                        <FontAwesomeIcon
                                          icon={faPlus}
                                          size={"lg"}
                                          color={"#ff4c3b"}
                                        />
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  {/* {symbol} */}
                                  {item.final_price}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>*</td>
                          <td>
                            {item.qty >= item.stock ? "out of Stock" : ""}
                          </td>
                          <td></td>
                          <td>
                            <h2 className="td-color">{item.total}</h2>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>total price :</td>
                      <td>
                        <h2>{cartItems.total}</h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="row cart-buttons">
              <div className="col-6">
                <Link
                  to="/"
                  // to={`${process.env.PUBLIC_URL}/shops/${cartItems.order_items[0].item.shop}`}
                  className="btn btn-solid"
                >
                  continue shopping
                </Link>
              </div>
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/checkout`}
                  className="btn btn-solid"
                >
                  check out
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // </section>
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`}
                        className="img-fluid mb-4"
                        alt=""
                      />
                      <h3>
                        <strong>Your Cart is Empty</strong>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.shoppingCart
});

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
    // clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);
