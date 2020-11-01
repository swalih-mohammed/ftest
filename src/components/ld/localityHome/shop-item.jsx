import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import { CardInfo, CardTitle } from "../styled/jumbotron";
import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  background-color: #333;
  background-image: url(${props => props.imgurl});
  background-size: cover;
  margin: 0 5px 30px 5px;
  border-radius: 10px;
  border: #0a0a0a 3px solid;
  box-shadow: rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

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
