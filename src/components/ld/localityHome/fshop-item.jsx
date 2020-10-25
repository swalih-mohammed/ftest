import React, { Component } from "react";
import { Link } from "react-router-dom";
import { localhost } from "../../../constants";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "react-bootstrap";

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
      <>
        <Card>
          <Link to={`${process.env.PUBLIC_URL}/places/${shop.id}`}>
            <Card.Img variant="top" src={shop.image} />
          </Link>
          <Card.Body>
            <Card.Title>{shop.name}</Card.Title>
            <Card.Text>{shop.place}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default ProductStyleFour;
