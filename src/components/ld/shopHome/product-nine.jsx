import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Modal from "react-responsive-modal";
import { Img } from "react-image";
import {
  addToCartURL,
  localhost,
  orderSummaryURL,
  orderItemUpdateQuantityURL
} from "../../../constants";
import { fetchCart, clearKart } from "../../../actions/cart";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductStyleNine extends Component {
  state = {
    loading: false
  };
  handleAddToCart = (id, shop) => {
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
          if (err.response) {
            if (err.response.status === 400) {
              this.setState({ loading: false });
              toast.error("You have an active order from a different shop");
            } else if (err.response.status === 401) {
              toast.error("To add item into your cart, please login");
            } else {
              this.setState({ loading: false });
              toast.error("Oops there was an error");
            }
          }
        });
    } else {
      this.setState({ loading: false });
      toast.error("To add item into your cart, please login");
    }
  };

  render() {
    const { product } = this.props;
    // console.log(product);

    return (
      <div className="product-box">
        <ToastContainer />

        {this.state.loading && <div className="loading-cls"></div>}
        <div className="img-wrapper">
          <div className="lable-block">
            {product.is_featured == true ? (
              <span className="lable3">new</span>
            ) : (
              ""
            )}
            {product.is_on_sale == true ? (
              <span className="lable3">sale</span>
            ) : (
              ""
            )}
            {product.is_available !== true ? (
              <span className="lable4">Out of stock</span>
            ) : (
              ""
            )}
          </div>
          <div className="front">
            {/* <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            > */}
            {/* <img
              src={`${localhost}${product.product_image}`}
              className="img-fluid"
              alt="product-image"
            /> */}
            <Img
              loading="lazy"
              className="img-fluid lazyload bg-img"
              // src={shop.image}
              src={`${localhost}${product.product_image}`}
              loader={<div className="loading-cls"></div>}
            />
            {/* </Link> */}
          </div>
        </div>
        <div className="product-detail">
          <div>
            {/* <div className="rating">{RatingStars}</div> */}
            <div className="rating"> </div>
            {/* <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            > */}
            <h6>{product.title}</h6>
            {/* </Link> */}
            <h4>
              {"Rs: "} {product.price}
              {/* <del>
                <span className="money">{product.price}</span>
              </del> */}
            </h4>

            <div className="cart-bottom">
              {product.is_available ? (
                <button
                  title="Add to cart"
                  onClick={() => this.handleAddToCart(product.id, product.shop)}
                >
                  {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
                  <i>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size={"lg"}
                      color={"#ff4c3b"}
                    />
                  </i>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductStyleNine);

// export default ProductStyleNine;
