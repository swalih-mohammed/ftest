import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Table, Row, Col, Container } from "react-bootstrap";

import {
  orderSummaryURL,
  addToCartURL,
  orderItemUpdateQuantityURL,
  localhost,
  orderItemDeleteURL,
  orderDeleteURL
} from "../../../constants";
import { fetchCart, clearKart } from "../../../actions/cart";
import { authAxios } from "../../../authAxios";
import {
  faMinus,
  faPlus,
  faTrashAlt,
  faAngleRight,
  faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class OrderSummary extends Component {
  state = {
    // cartItems: null,
    quantity: 1,
    error: null
  };

  componentDidMount() {
    // this.handleFetchOrder();
    this.props.refreshCart();
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

  handleAddToCart2 = (id, shop, variation) => {
    // console.log(id, shop, variation);
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { id, shop, variation })
      .then(res => {
        // this.handleFetchOrder();
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        toast.error("Oops there was an error");
      });
  };

  handleRemoveQuantityFromCart = (id, q) => {
    console.log(q);
    authAxios
      .post(orderItemUpdateQuantityURL, { id })
      .then(res => {
        this.props.refreshCart();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleRemoveItemFromCart = id => {
    authAxios
      .delete(orderItemDeleteURL(id))
      .then(res => {
        this.props.refreshCart();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  hanldeDeleteOrder = id => {
    // console.log(id);
    // console.log("delete");
    authAxios
      .delete(orderDeleteURL(id))
      .then(res => {
        this.props.clearKart();
        this.props.refreshCart();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  // testOnchange = () => {
  //   // console.log("hi");
  // };

  render() {
    // const { cartItems } = this.state;
    const { cartItems } = this.props;
    console.log(cartItems);

    return (
      <div>
        <ToastContainer />
        {this.state.loading ? (
          <div className="loading-cls"></div>
        ) : (
          <React.Fragment>
            {cartItems && (
              <React.Fragment>
                {cartItems.order_items ? (
                  <section className="cart-section section-b-space">
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-12">
                          <table className="table cart-table table-responsive-xs">
                            <thead>
                              <tr className="table-head">
                                <th scope="col">Image</th>
                                <th scope="col">Detial</th>
                                <th scope="col">price</th>
                                <th scope="col">quantity</th>
                                <th scope="col">action</th>
                                <th scope="col">total</th>
                              </tr>
                            </thead>
                            {/* {cartItems.map((item, index) => { */}
                            {cartItems.order_items.map((item, index) => {
                              return (
                                <tbody key={index}>
                                  <tr>
                                    <td>
                                      <Link to={""}>
                                        <img
                                          src={`${localhost}${item.item_image}`}
                                          alt=""
                                        />
                                      </Link>
                                    </td>
                                    <td>
                                      <Link to={""}>
                                        {item.itemLocalName ? (
                                          <React.Fragment>
                                            {item.itemLocalName} [{item.vname}]
                                          </React.Fragment>
                                        ) : (
                                          <React.Fragment>
                                            {item.itemName} [{item.vname}]
                                          </React.Fragment>
                                        )}

                                        <p>
                                          {"Rs: "}
                                          {item.final_price}
                                        </p>
                                      </Link>
                                      <div className="mobile-cart-content row">
                                        <div className="col-xs-4">
                                          <div className="qty-box">
                                            <div className="input-group">
                                              <span className="input-group-prepend">
                                                {item.quantity > 1 ? (
                                                  <button
                                                    type="button"
                                                    className="btn quantity-left-minus"
                                                    // onClick={this.minusQty}

                                                    onClick={() =>
                                                      this.handleRemoveQuantityFromCart(
                                                        item.item_variation
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
                                                ) : (
                                                  <div>
                                                    {cartItems.order_items
                                                      .length < 2 ? (
                                                      <button
                                                        type="button"
                                                        className="btn quantity-left-minus"
                                                        // onClick={this.minusQty}
                                                        onClick={() =>
                                                          this.hanldeDeleteOrder(
                                                            cartItems.id
                                                          )
                                                        }
                                                        data-type="minus"
                                                        data-field=""
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faMinus}
                                                          size={"lg"}
                                                          color={"#ff4c3b"}
                                                        />
                                                      </button>
                                                    ) : (
                                                      // otherwise
                                                      <button
                                                        type="button"
                                                        className="btn quantity-left-minus"
                                                        // onClick={this.minusQty}
                                                        onClick={() =>
                                                          this.handleRemoveItemFromCart(
                                                            item.id
                                                          )
                                                        }
                                                        data-type="minus"
                                                        data-field=""
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faMinus}
                                                          size={"lg"}
                                                          color={"#ff4c3b"}
                                                        />
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </span>
                                              <input
                                                type="text"
                                                name="quantity"
                                                value={item.quantity}
                                                // defaultValue={0}
                                                onChange={this.testOnchange}
                                                // onChange={null}
                                                className="form-control input-number"
                                              />
                                              <span className="input-group-prepend">
                                                <button
                                                  type="button"
                                                  className="btn quantity-right-plus"
                                                  // onClick={this.handleAddToCart2}
                                                  onClick={() =>
                                                    this.handleAddToCart2(
                                                      item.item,
                                                      item.shop,
                                                      item.item_variation
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
                                        <div className="col-xs-4">
                                          <h2 className="td-color">
                                            {/* {symbol} */}
                                            {/* {item.final_price} */}
                                          </h2>
                                        </div>
                                        <div className="col-xs-4">
                                          <h2 className="td-color">
                                            <a
                                              //   href="#"
                                              className="icon"
                                              onClick={() =>
                                                this.handleRemoveItemFromCart(
                                                  item.id
                                                )
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                size={"lg"}
                                              />
                                            </a>
                                          </h2>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h4>{item.final_price}</h4>
                                    </td>
                                    <td>
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
                                            // onChange={this.changeQty}
                                            className="form-control input-number"
                                          />
                                          <span className="input-group-prepend">
                                            <button
                                              type="button"
                                              className="btn quantity-right-plus"
                                              // onClick={this.handleAddToCart2}
                                              onClick={() =>
                                                this.handleAddToCart2(
                                                  item.item,
                                                  item.shop,
                                                  item.item_variation
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
                                      {/* {item.qty >= item.stock ? "out of Stock" : ""} */}
                                    </td>
                                    <td>
                                      <a
                                        // href="#"
                                        className="icon"
                                        // onClick={() => this.props.removeFromCart(item)}
                                        onClick={() =>
                                          this.handleRemoveItemFromCart(item.id)
                                        }
                                      >
                                        {/* <i className="fa fa-times"></i> */}
                                        <FontAwesomeIcon
                                          icon={faTrashAlt}
                                          size={"lg"}
                                        />
                                      </a>
                                    </td>
                                    <td>
                                      <h2 className="td-color">
                                        {/* {symbol} */}
                                        {item.final_price}
                                      </h2>
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
                                  <h2>
                                    {/* {symbol}  */}
                                    {cartItems.total}{" "}
                                  </h2>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      <div className="row cart-buttons">
                        <div className="col-6">
                          <Link
                            // to={""}
                            to={`${process.env.PUBLIC_URL}/shops/${cartItems.shop_id}`}
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
                  </section>
                ) : (
                  <section className="cart-section section-b-space">
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-12">
                          <div>
                            <div className="col-sm-12 empty-cart-cls text-center">
                              <img
                                src={`${process.env.PUBLIC_URL}/media/cart/icon-empty-cart.png`}
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
              </React.Fragment>
            )}
          </React.Fragment>
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
    refreshCart: () => dispatch(fetchCart()),
    clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);
