import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import FeautredLocality from "./featuredLocality";
import Search from "../localityList/search";
import Localities from "../localityList/main";
import FeautredShops from "./featuredShops";

import { newPlacesURL, feautredShopsURL } from "../../../constants";

class Homepage extends Component {
  state = {
    loading: false,
    error: null,
    Newlocalities: [],
    featuredShops: []
  };

  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
    this.fetchNewPlaces();
    this.fetchFeautredShops();
  }

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
    const { Newlocalities } = this.state;
    const { featuredShops } = this.state;
    // console.log(Newlocalities);

    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        {/* <Header logoName={"logo.png"} /> */}
        {/* <HeaderTwo /> */}
        <section className="p-0">
          <Slider className="slide-2 home-slider">
            <div>
              <div className="home home34 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div
                        className="slider-contain"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <h1
                            style={{
                              color: "#FFFFFF"
                            }}
                          >
                            Buy Local Grow Global
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="home home37 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h1>Shops in your locality come online !</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </section>
        {Newlocalities && <FeautredLocality Newlocalities={Newlocalities} />}
        <FeautredShops featuredShops={featuredShops} />

        <Localities />
      </div>
    );
  }
}

export default Homepage;
