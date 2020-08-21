import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { localhost } from "../../../constants";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  RemoveFromFavoritePlacesURL,
  FavoritePlacesURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";

class ProductStyleFour extends Component {
  state = {
    loading: false
  };
  removeFromFavList = id => {
    this.setState({ loading: true });
    authAxios
      .put(RemoveFromFavoritePlacesURL(id), {
        is_active: false
      })
      .then(res => {
        toast.error("This locality removed from your favorite list");
        this.props.fetchPlaces();
        this.setState({ loading: false });
      })
      .catch(err => {
        toast.error("an error occured");
        this.setState({ loading: false });
      });
  };

  fetchPlaces = async () => {
    this.setState({ loading: true });
    authAxios
      .get(FavoritePlacesURL)
      .then(res => {
        this.setState({ localities: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };
  render() {
    const { locality } = this.props;
    console.log(locality);

    return (
      <div className="product-box">
        {this.state.loading && <div className="loading-cls"></div>}
        <div className="img-wrapper">
          <div className="front">
            <Link to={`${process.env.PUBLIC_URL}/places/${locality.place}`}>
              <img
                src={`${localhost}${locality.place_image}`}
                className="img-fluid"
                alt=""
                loading="lazy"
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => this.removeFromFavList(locality.id)}
            >
              <i>
                <FontAwesomeIcon icon={faTimes} color={"#ff4c3b"} />
              </i>
            </button>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <Link to={`${process.env.PUBLIC_URL}/places/${locality.id}`}>
              <h4>{locality.place_name}</h4>
            </Link>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductStyleFour;
