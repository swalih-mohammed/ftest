import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
// import Slider from "react-slick";
// import Image from "react-bootstrap/Image";
import FeautredLocality from "./featuredLocality";
import Search from "../localityList/search";
import Localities from "../localityList/main";
import FeautredShops from "./featuredShops";
import { Img } from "react-image";

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
    // console.log(this.state.loading);
    // console.log(appInfo.coverPhoto1);

    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        {this.state.loading && <div className="loading-cls"></div>}
        <section className="p-0">
          {appInfo && (
            // <Image
            //   src={appInfo.coverPhoto1}
            //   fluid
            //   className="img-fluid lazyload bg-img"
            //   responsive
            //   // style={{ height: 200, width: 500 }}
            // />
            <Img
              className="img-fluid lazyload bg-img"
              loading="lazy"
              src={appInfo.coverPhoto1}
              loader={<div className="loading-cls"></div>}
            />
          )}
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
