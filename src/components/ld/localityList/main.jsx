import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Slider3 } from "../../../services/script";
import { AddToFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Img } from "react-image";
import Locality from "./locality";
// import { Product4, Product5 } from "../../../services/script";

import Search from "./search";
import { placeListURL, localhost } from "../../../constants";
import { isTemplateExpression } from "typescript";

class LocalityList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      localities: [],
      // journals: [],
      hasMore: true,
      offset: 0,
      limit: 2,
      query: "all",
      newLocalities: []
    };
    window.onscroll = () => {
      const {
        fetchlaces,
        state: { error, loading, hasMore }
      } = this;
      if (error || loading || !hasMore) return;
      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop ===
        document.documentElement.clientHeight
      ) {
        // call some loading method
        fetchlaces();
      }
    };
  }

  // componentWillMount() {
  //   this.fetchlaces();
  // }

  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
    this.fetchlaces();
  }

  fetchlaces = () => {
    this.setState({ loading: true }, () => {
      const { offset, limit, query } = this.state;
      // console.log(query);
      axios
        .get(placeListURL + `?limit=${limit}&offset=${offset}&q=${query}`)
        .then(res => {
          const newLocalities = res.data.places;
          const hasMore = res.data.has_more;
          this.setState({
            hasMore,
            loading: false,
            localities: [...this.state.localities, ...newLocalities],
            newLocalities: res.data.places,
            offset: offset + limit
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            loading: false
          });
        });
    });
  };

  setQuery = e => {
    this.setState({ query: e.target.value });
    this.callbacktest();
  };

  callbacktest = () => {
    console.log(this.state.query);
  };

  // handleSearch = e => {
  //   e.preventDefault();
  //   this.fetchlaces();
  // };

  addToWishList = place => {
    this.setState({ loading: true });
    authAxios
      // .post(AddToFavoritePlacesURL  { shop })
      .post(AddToFavoritePlacesURL, { place })
      .then(res => {
        this.setState({ loading: false });
        toast.success("This locality added to your favorites");
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        toast.error("This locality already exists in your favorites");
      });
  };

  render() {
    const { localities, query, hasMore } = this.state;
    // console.log(localities);

    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        <ToastContainer />
        {this.state.loading && <div className="loading-cls"></div>}
        {/* <HeaderTwo logoName={"logo.png"} /> */}
        <Search />

        {localities && (
          <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="title4">
                    <br></br>
                    <h2 className="title-inner4"> Localities</h2>
                    <div className="line">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="no-slider row">
                    {/* <Slider
                    {...Product4}
                    className="product-4 product-m no-arrow"
                  > */}
                    {localities.map((locality, index) => (
                      <Locality locality={locality} key={index} />
                    ))}
                    {/* </Slider> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default LocalityList;
