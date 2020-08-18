import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
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

class ProductStyleEleven extends Component {
  handleAddToCart = (id, shop) => {
    // console.log(this.props.token);
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
          if (err.response.status === 400) {
            toast.error("You have an active order from a different shop");
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
    const { product } = this.props;

    return (
      <div className="product-box">
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
            <img
              src={`${localhost}${product.product_image}`}
              className="img-fluid"
              alt=""
            />
            {/* </Link> */}
          </div>
          <div className="cart-info cart-wrap">
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
        <div className="product-detail">
          <div>
            {/* <div className="rating">{RatingStars}</div> */}
            <div className="rating">{""}</div>
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            >
              <h6>{product.title}</h6>
            </Link>
            <h4>
              {"Rs: "} {product.price}
            </h4>
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
)(ProductStyleEleven);

// export default ProductStyleEleven;
