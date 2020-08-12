import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import Shipping from "./shipping";
import Service from "./service";
import Offer from "./offer";
import Image from "react-bootstrap/Image";

// Import custom components
import { Slider3 } from "../../../services/script";
// import Trading from "./tranding";
// import Special from "../common/special";
import {
  svgFreeShipping,
  svgservice,
  svgoffer
} from "../../../services/script";
import HeaderTwo from "../../common/headers/header-two";
import FooterOne from "../../common/footers/footer-one";
import ThemeSettings from "../../common/theme-settings";
import Search from "../../pages/search";
import Category from "./category";
import FeautredShops from "./featuredShops";
import Shops from "./shops";

import {
  placeShopListURL,
  feautredShopsInPlaceURL,
  placeDetailURL
} from "../../../constants";

class Locality extends Component {
  state = {
    loading: false,
    error: null,
    shops: [],
    featuredShops: [],
    placeDetail: null
  };
  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
    this.fetchShopList();
    this.fetchFeaturedShops();
    this.fetchPlaceDetail();
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
    const { featuredShops, placeDetail, shops } = this.state;
    // console.log(this.state.placeDetail);
    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        {/* <HeaderTwo logoName={"logo.png"} /> */}
        <section className="p-0">
          {placeDetail && <Image src={placeDetail.image} fluid />}
        </section>
        {placeDetail && (
          <div>
            {placeDetail.exicutive_phone_number !== "" ? (
              <Service message={placeDetail.exicutive_phone_number} />
            ) : null}
            {placeDetail.offer_message !== "" ? (
              <Offer message={placeDetail.offer_message} />
            ) : null}
            {placeDetail.shipping_message !== "" ? (
              <Shipping message={placeDetail.shipping_message} />
            ) : null}
          </div>
        )}
        {featuredShops && <FeautredShops featuredShops={featuredShops} />}
        {/* <Category /> */}
        {shops && <Shops shops={shops} />}
      </div>
    );
  }
}

export default Locality;
