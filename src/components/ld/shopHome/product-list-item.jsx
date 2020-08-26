import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authAxios } from "../../../authAxios";
import {
  addToCartURL,
  localhost,
  orderSummaryURL,
  orderItemUpdateQuantityURL
} from "../../../constants";
import { connect } from "react-redux";
import { fetchCart, clearKart } from "../../../actions/cart";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AddTocartButton from "./addTocartButton";
// import AddTocartButton1 from "./addToCart/addToCart1";
// import AddTocartButton3 from "./addToCart/addToCart3";

// import productItem from "./product-item";

class ProductListItem extends Component {
  state = {
    open: false,
    openQuantity: false,
    stock: "InStock",
    quantity: 0,
    image: "",
    notLoggedIn: false,
    cartItems: null,
    error: null
  };

  componentDidMount() {
    // this.handleFetchOrder();
    // this.props.refreshCart();
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        this.setState({ cartItems: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleAddToCart = (id, shop) => {
    console.log(this.props.token);
    if (this.props.token !== null) {
      this.setState({ loading: true });
      authAxios
        .post(addToCartURL, { id, shop })
        .then(res => {
          toast.success("item added to cart");
          this.props.refreshCart();
          this.setState({ loading: false });
        })
        .catch(err => {
          // console.log(err);
          // this.setState({ error: err.response.status });
          if (err.response.status === 400) {
            toast.error("You have an active order from a different shop");
          } else if (err.response.status === 401) {
            toast.error("Please login");
          } else {
            this.setState({ error: err, loading: false });
            toast.error("Oops there was an error");
          }
        });
    } else {
      this.setState({ loading: false });
      toast.error("To add item into your cart, please login");
    }
  };

  render() {
    const { product, token } = this.props;

    // const { cartItems } = this.state;
    // const { cartItems } = this.props;
    // console.log(this.state.error);

    // console.log(cartItems.order_items.length);

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
            <div className="addtocart_btn">
              <button
                className="add-button add_cart"
                title="Add to cart"
                // onClick={this.handleAddToCart(product.id, product.shop)}
                onClick={() => this.handleAddToCart(product.id, product.shop)}
              >
                add to cart
              </button>
            </div>
          ) : null}
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
    token: state.auth.token
    // cartItems: state.cart.shoppingCart
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
