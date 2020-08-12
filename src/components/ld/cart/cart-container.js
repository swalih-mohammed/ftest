import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, clearKart } from "../../../actions/cart";
import CartHeader from "./cart-header";
import cart from "./cart";
// import { authAxios } from "../authAxios";
import { authAxios } from "../../../authAxios";
// import { orderSummaryURL } from "../constants";
import { orderSummaryURL, localhost } from "../../../constants";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CartContainer extends Component {
  state = {
    cart: []
  };

  componentWillMount() {
    if (this.props.authenticated) {
      // this.handleFetchOrder();
      this.props.fetchCart();
    }
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        this.setState({ cart: res.data, loading: false });
      })

      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    // const { cart } = this.state;

    const { cart } = this.props;
    // console.log(cart);

    return (
      <div>
        {cart ? (
          <li className="onhover-div mobile-cart">
            <div className="cart-qty-cls">
              {cart.order_items ? cart.order_items.length : 0}
            </div>

            <Link to={`${process.env.PUBLIC_URL}/order-summary`}>
              <img
                // src={`${process.env.PUBLIC_URL}/media/cart/cart.png`}
                src={`${localhost}/media/cart/cart.png`}
                className="img-fluid"
                alt=""
              />
              {/* <i className="fa fa-shopping-cart"></i> */}
              <i>
                <FontAwesomeIcon icon={faShoppingCart} />
              </i>
            </Link>
            <ul className="show-div shopping-cart">
              {cart && (
                <div>
                  {cart.order_items ? (
                    <div>
                      {cart.order_items.map(item => (
                        <CartHeader key={item.id} item={item} />
                      ))}
                    </div>
                  ) : null}
                </div>
              )}

              {cart && (
                <React.Fragment>
                  {cart.order_items && (
                    <React.Fragment>
                      {cart.order_items.length > 0 ? (
                        <div>
                          <li>
                            <div className="total">
                              <h5>
                                Total: <span>{cart.total}</span>
                              </h5>
                            </div>
                          </li>
                          <li>
                            <div className="buttons">
                              {/* <Link
                        to={`${process.env.PUBLIC_URL}/cart`}
                        className="view-cart"
                      >
                        view cart
                      </Link> */}
                              <Link
                                to={`${process.env.PUBLIC_URL}/order-summary`}
                                className="checkout"
                              >
                                View Cart
                              </Link>
                            </div>
                          </li>
                        </div>
                      ) : (
                        <li>
                          <h5>Your cart is currently empty.</h5>
                        </li>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </ul>
          </li>
        ) : (
          <li className="onhover-div mobile-cart">
            <div className="cart-qty-cls">{0}</div>

            <i>
              <FontAwesomeIcon icon={faShoppingCart} />
            </i>

            <ul className="show-div shopping-cart">
              <li>
                <h5>Your cart is currently empty.</h5>
              </li>
              )}
            </ul>
          </li>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
