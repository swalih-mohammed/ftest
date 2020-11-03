import React, { Component } from "react";
import "../../common/index.scss";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import ShopItem from "./shop-item";
// import { Row, Col } from "react-bootstrap";
// import { placeListURL } from "../../../constants";
import styled from "styled-components";

const ShopListSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 5px;
  padding-top: 20px;
`;

class Shops extends Component {
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
          toast.error("This locality already exists in your favorites");
          this.setState({ loading: false });
        } else {
          toast.error("An error occured");
        }
      });
  };
  render() {
    const { shops } = this.props;
    return (
      <>
        <ShopListSection>
          {shops.map((shop, index) => (
            <ShopItem shop={shop} key={index} />
          ))}
        </ShopListSection>
      </>
    );
  }
}

export default Shops;
