import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { localhost } from "../../../constants";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";

class ProductStyleFour extends Component {
  addToWishList = place => {
    this.setState({ loading: true });
    authAxios
      .post(AddToFavoritePlacesURL, { place })
      .then(res => {
        this.setState({ loading: false });
        toast.success("This locality added to your favorites");
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast.error("Please login to add to favorites");
          this.setState({ loading: false });
        } else if (err.response.status === 400) {
          toast.error("This locality already exists in your favorites");
          this.setState({ loading: false });
        } else {
          toast.error("An error occured");
        }
      });
  };
  render() {
    const { ShopDetail } = this.props;
    // console.log(ShopDetail);

    return (
      //   <div className="no-slider row">
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            {/* <Link to={`${process.env.PUBLIC_URL}/places/${placeDetail.id}`}> */}
            <img
              src={ShopDetail.image}
              className="img-fluid"
              alt="place-image"
              loading="lazy"
            />
            {/* </Link> */}
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => this.addToWishList(ShopDetail.id)}
            >
              <i>
                <FontAwesomeIcon icon={faHeart} size={"lg"} color={"#ff4c3b"} />
              </i>
            </button>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <h2>{ShopDetail.name}</h2>
            <br />
          </div>
          <h6>
            Call us:
            <a href={"tel:" + ShopDetail.phone_number}>
              {ShopDetail.phone_number}
            </a>
          </h6>
        </div>
      </div>
    );
  }
}

export default ProductStyleFour;
