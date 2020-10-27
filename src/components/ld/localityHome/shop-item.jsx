import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardInfo, CardTitle } from "../styled/jumbotron";

class ShopItem extends Component {
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
        <Link to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}>
          <Card imgurl={shop.image}>
            <CardInfo>
              <CardTitle>{shop.name}</CardTitle>
            </CardInfo>
          </Card>
        </Link>
      </>
    );
  }
}

export default ShopItem;
