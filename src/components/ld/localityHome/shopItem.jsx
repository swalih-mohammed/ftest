import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { localhost } from "../../../constants";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";

class ProductStyleFour extends Component {
  addToWishList = shop => {
    this.setState({ loading: true });
    authAxios
      .post(AddToFavoriteShopsURL, { shop })
      .then(res => {
        this.setState({ loading: false });
        toast.success("This shop added to your favorites");
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast.error("Please login to add to favorites");
          this.setState({ loading: false });
        } else if (err.response.status === 400) {
          toast.error("This shop already exists in your favorites");
          this.setState({ loading: false });
        } else {
          toast.error("An error occured");
        }
      });
  };
  render() {
    const { shop } = this.props;
    // console.log(shop);

    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            <Link to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}>
              <img
                // src={`${localhost}${shop.image}`}
                src={shop.image}
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => this.addToWishList(shop.id)}
            >
              <i>
                <FontAwesomeIcon icon={faHeart} size={"lg"} color={"#ff4c3b"} />
              </i>
            </button>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <Link to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}>
              <h4>{shop.name}</h4>
            </Link>
            <br />

            <h6>
              <a href={"tel:" + shop.phone_number}>{shop.phone_number}</a>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductStyleFour;