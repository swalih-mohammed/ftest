import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authAxios } from "../../../authAxios";
import {
  addToCartURL,
  localhost,
  orderItemUpdateQuantityURL
} from "../../../constants";
import { connect } from "react-redux";
import { fetchCart, clearKart } from "../../../actions/cart";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openQuantity: false,
      stock: "InStock",
      quantity: 0,
      image: "",
      notLoggedIn: false
    };
  }

  componentDidMount() {
    this.props.refreshCart();
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
      this.props.onDecrementClicked();
    } else {
      // console.log("removefromcart");
      this.setState({ openQuantity: false });
      this.props.onRemoveFromCart();
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
      this.props.onIncrementClicked();
      this.props.refreshCart();
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };
  updateQty = e => {
    if (this.props.product.stock >= parseInt(e.target.value)) {
      this.setState({ quantity: parseInt(e.target.value) });
      this.props.onAddToCartClicked();
      this.props.refreshCart();
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };

  plusQty2 = (id, shop) => {
    this.setState({ quantity: this.state.quantity + 1 });
    this.props.refreshCart();
    this.handleAddToCart2(id, shop);
  };

  minusQty2 = id => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
      this.handleRemoveQuantityFromCart(id);
      this.props.refreshCart();
    } else {
      this.setState({ openQuantity: false });
    }
  };

  openQuantity = (id, shop) => {
    this.props.refreshCart();
    this.setState({ openQuantity: true });
    this.handleAddToCart2(id, shop);
  };

  handleAddToCart2 = (id, shop) => {
    // console.log(this.props.token);
    if (this.props.token !== null) {
      this.setState({ loading: true });
      this.setState({ openQuantity: true });
      authAxios
        .post(addToCartURL, { id, shop })
        .then(res => {
          this.props.refreshCart();
          this.props.clearKart();
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
          toast.error("Oops there was an error");
        });
    } else {
      toast.error("To add item into your cart, please login");
      this.callback();
    }
  };

  callback = () => {
    this.setState({ notLoggedIn: true });
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
    const { product, token, cartItems } = this.props;
    // const rootURL = "www.localdukans.com"
    console.log(cartItems);

    return (
      // <div className="col-lg-3 col-md-6">
      <div className="product-box">
        <ToastContainer />
        <div className="img-wrapper">
          <div className="lable-block">
            {product.is_available == !true ? (
              <span className="lable3">Out of Stock</span>
            ) : (
              ""
            )}
            {product.is_on_sale == true ? (
              <span className="lable4">Sale</span>
            ) : (
              ""
            )}
          </div>
          <div className="front">
            {/* <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            > */}
            <img
              // src={product.product_image}
              src={`${localhost}${product.product_image}`}
              className="img-fluid lazyload bg-img"
              alt=""
            />
            {/* </Link> */}
          </div>
          {product.is_available === true ? (
            <div>
              {cartItems && (
                <div>
                  {cartItems.order_items.map(item => (
                    <div key={item.id}>
                      {item.item.id === product.id ? (
                        <div className="addtocart_btn">
                          <button
                            className="add-button add_cart"
                            title="Add to cart"
                            // onClick={this.openQuantity}
                            //   onClick={() => this.handleAddToCart2(product.id, product.shop)}
                            onClick={() =>
                              this.openQuantity(product.id, product.shop)
                            }
                          >
                            add to cart
                          </button>
                          {/* <div
                            className={`qty-box cart_qty ${
                              this.state.openQuantity ? "open" : ""
                            }`}
                          > */}
                          <div
                            className={`qty-box cart_qty ${
                              item.quantity > 0 ? "open" : ""
                            }`}
                          >
                            <div className="input-group">
                              <span className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn quantity-left-minus"
                                  // onClick={this.minusQty}
                                  onClick={() => this.minusQty2(product.id)}
                                  data-type="minus"
                                  data-field=""
                                >
                                  {/* <i className="fa fa-minus"></i> */}
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    size={"2x"}
                                    color={"#ff4c3b"}
                                  />
                                </button>
                              </span>
                              <input
                                type="number"
                                name="quantity"
                                // value={this.state.quantity}
                                value={item.quantity}
                                onChange={this.changeQty}
                                onBlur={this.updateQty}
                                className="form-control input-number"
                              />
                              <span className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn quantity-right-plus"
                                  // onClick={this.plusQty}
                                  onClick={() =>
                                    this.plusQty2(product.id, product.shop)
                                  }
                                  data-type="plus"
                                  data-field=""
                                >
                                  {/* <i className="fa fa-plus"></i> */}
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    size={"2x"}
                                    color={"#ff4c3b"}
                                  />
                                </button>
                              </span>
                            </div>
                          </div>
                          {/* <p>eaqual</p> */}
                        </div>
                      ) : (
                        <div>{/* <h1>Hiiiiiiiiiii</h1> */}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* last  */}
          {/* {this.state.stock != "InStock" ? <span>Out Of Stock</span> : ""} */}
        </div>
        <div className="product-detail text-center">
          <div>
            {/* <div className="rating">{RatingStars}</div> */}
            {/* <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            > */}
            <h4>
              {product.title} [{product.quantity}]
            </h4>
            {/* </Link> */}
            <h6>
              Price: Rs{product.price}
              <del>
                {/* <span className="money">{product.discount_price}</span> */}
              </del>
            </h6>
            <br></br>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    cartItems: state.cart.shoppingCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart()),
    clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListItem);
