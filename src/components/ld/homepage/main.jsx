import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import Image from "react-bootstrap/Image";
import FeautredLocality from "./featuredLocality";
import Search from "../localityList/search";
import Localities from "../localityList/main";
import FeautredShops from "./featuredShops";

import { newPlacesURL, feautredShopsURL, appInfoURL } from "../../../constants";

class Homepage extends Component {
  state = {
    loading: false,
    error: null,
    Newlocalities: [],
    featuredShops: [],
    appInfo: "",
    bannerImage1: ""
  };

  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
    this.fetchAppInfo();
    this.fetchNewPlaces();
    this.fetchFeautredShops();
  }

  fetchAppInfo = async () => {
    this.setState({ loading: true });
    axios
      .get(appInfoURL)
      .then(res => {
        this.setState({ appInfo: res.data[0], loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchFeautredShops = async () => {
    this.setState({ loading: true });
    axios
      .get(feautredShopsURL)
      .then(res => {
        this.setState({ featuredShops: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };
  fetchNewPlaces = async () => {
    this.setState({ loading: true });
    axios
      .get(newPlacesURL)
      .then(res => {
        this.setState({ Newlocalities: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { Newlocalities, appInfo } = this.state;
    const { featuredShops } = this.state;
    // console.log(appInfo);
    // console.log(appInfo.coverPhoto1);

    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        <section className="p-0">
          {appInfo && <Image src={appInfo.coverPhoto1} fluid responsive />}
        </section>
        {Newlocalities && <FeautredLocality Newlocalities={Newlocalities} />}
        <FeautredShops featuredShops={featuredShops} />
        <Localities />
        <div></div>
      </div>
    );
  }
}

export default Homepage;
