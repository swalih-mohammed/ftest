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
import AddTocartButton from "./addTocartButton";
// import productItem from "./product-item";

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
    // this.props.refreshCart();
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

    console.log(cartItems);
    console.log(cartItems.order_items.length);

    return (
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
            <img
              src={`${localhost}${product.product_image}`}
              className="img-fluid lazyload bg-img"
              alt=""
            />
          </div>
          {product.is_available === true ? (
            <div>
              {/* {cartItems.length > 0 ? ( */}
              {cartItems ? (
                <div>
                  {/* {cartItems.order_items.length <= 0 ? (
                    <div>no item</div>
                  ) : (
                    <div>more than zero</div>
                  )} */}
                  {cartItems.order_items.map(item => (
                    <div>
                      {item.item.id === product.id ? (
                        <AddTocartButton
                          quantity={item.quantity}
                          product={product.id}
                          shop={product.shop}
                          item={item.item}
                          item2={item.id}
                          open={true}
                          orderItemCount={cartItems.order_items}
                        />
                      ) : (
                        <AddTocartButton
                          shop={product.shop}
                          product={product}
                          quantity={item.quantity}
                          orderItemCount={cartItems.order_items}
                          open={false}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <AddTocartButton
                  shop={product.shop}
                  orderItemCount={cartItems.order_items}
                  product={product}
                  open={false}
                />
              )}
            </div>
          ) : (
            <h1>hi</h1>
          )}
        </div>

        <div className="product-detail text-center">
          <div>
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
