import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { localhost } from "../../../constants";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  RemoveFromFavoriteShopsURL,
  FavoriteShopsURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";

class ProductStyleFour extends Component {
  removeFromFavList = id => {
    authAxios
      .put(RemoveFromFavoriteShopsURL(id), {
        is_active: false
      })
      .then(res => {
        this.setState({ message: "Shop removed from your favorite list" });
        toast.error("This shop removed from your favorite list");
        this.props.fetchShops();
      })
      .catch(err => {
        this.setState({ error: err });
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
                src={`${localhost}${shop.shop_image}`}
                // src={shop.image}
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => this.removeFromFavList(shop.id)}
            >
              {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
              <i>
                <FontAwesomeIcon icon={faTimes} color={"#ff4c3b"} />
                {/* <FontAwesomeIcon icon={faHeart} /> */}
              </i>
            </button>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <Link to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}>
              <h4>{shop.shop_name}</h4>
            </Link>
            <br />
            <h4>{shop.shop_place_name}</h4>

            {/* <h6>
              <a href={"tel:" + shop.phone_number}>{shop.phone_number}</a>
            </h6> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductStyleFour;
