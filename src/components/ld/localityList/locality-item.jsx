import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { localhost } from "../../../constants";
import { ArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { Card, CardInfo, CardTitle } from "../styled/jumbotron";

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
    const { locality } = this.props;
    // console.log(locality);

    return (
      <>
        <Link to={`${process.env.PUBLIC_URL}/places/${locality.id}`}>
          <Card imgurl={`${localhost}${locality.image}`}>
            <CardInfo>
              {locality.village_name}
              <CardTitle>{locality.name}</CardTitle>
            </CardInfo>
          </Card>
        </Link>
      </>
    );
  }
}

export default ProductStyleFour;
