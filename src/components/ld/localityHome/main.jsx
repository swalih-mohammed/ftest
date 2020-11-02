import React, { Component } from "react";
import { localhost } from "../../../constants";
import axios from "axios";
import Shipping from "./shipping";
import Offer from "./offer";
// import Category from "./category";
import FeautredShopList from "./featured-shop-list";
import ShopList from "./shop-list";
import styled from "styled-components";
import { PageLoader, Loader } from "../common/loader";

import {
  placeShopListURL,
  feautredShopsInPlaceURL,
  placeDetailURL
} from "../../../constants";
import { CardInfo, CardTitle, StyledCover } from "../styled/jumbotron";

export const TitleShops = styled.h1`
  display: flex;
  justify-content: center;
  font-family: "Playfair Display";
  color: #333333;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 1rem;
  margin-top: 3rem;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
`;

const ShopListSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 5px;
  padding-top: 20px;
`;

class Locality extends Component {
  state = {
    loading: false,
    shopsLoading: false,
    error: null,
    shops: [],
    featuredShops: [],
    placeDetail: null
  };
  componentDidMount() {
    // document.getElementById("color").setAttribute("href", `#`);
    this.fetchPlaceDetail();
    this.fetchShopList();
    // this.fetchFeaturedShops();
  }

  fetchShopList = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(placeShopListURL(params.placeID))
      .then(res => {
        this.setState({ shops: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchPlaceDetail = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(placeDetailURL(params.placeID))
      .then(res => {
        this.setState({ placeDetail: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchFeaturedShops = () => {
    const {
      match: { params }
    } = this.props;
    axios
      .get(feautredShopsInPlaceURL(params.placeID))
      .then(res => {
        this.setState({ featuredShops: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { featuredShops, placeDetail, shops, loading } = this.state;
    // console.log(placeDetail);
    return (
      <div>
        {this.state.loading ? (
          <PageLoader loading={true} />
        ) : (
          <React.Fragment>
            {placeDetail && (
              <>
                <StyledCover imgurl={placeDetail.image}>
                  <CardInfo>
                    <CardTitle>{placeDetail.name}</CardTitle>
                  </CardInfo>
                </StyledCover>
                {/* <div> */}
                {/* {placeDetail.offer_message !== "" ? (
                    <Offer message={placeDetail.offer_message} />
                  ) : null}
                  {placeDetail.shipping_message !== "" ? (
                    <Shipping message={placeDetail.shipping_message} />
                  ) : null} */}
                {/* </div> */}
              </>
            )}
            {/* {featuredShops.length > 0 ? (
              <FeautredShopList featuredShops={featuredShops} />
            ) : null} */}

            {shops.length > 0 ? (
              <>
                <TitleShops>Shops</TitleShops>
                {this.shopsLoading ? <Loader loading={true} /> : null}
                <ShopListSection>
                  <ShopList shops={shops} />
                </ShopListSection>
              </>
            ) : (
              <>{this.state.loading ? null : <p>No shops to show</p>}</>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Locality;
