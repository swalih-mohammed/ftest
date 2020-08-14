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

import Search from "./search";
import { placeListURL, localhost } from "../../../constants";

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

  handleSearch = e => {
    e.preventDefault();
    this.fetchlaces();
  };

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
        {/* <HeaderTwo logoName={"logo.png"} /> */}
        <Search />

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

        {localities && (
          <section className="banner-furniture absolute_banner ratio3_2">
            <div className="container">
              <div className="row partition3">
                {localities.map(locality => (
                  <div key={locality.id} className="col-md-4">
                    {/* <a href={`places/${locality.id}`}> */}
                    <div className="collection-banner p-left text-left">
                      <div className="img-wrapper">
                        <Link
                          to={`${process.env.PUBLIC_URL}/places/${locality.id}`}
                        >
                          {/* <img
                            src={`${localhost}${locality.image}`}
                            // src={locality.image}
                            // src={
                            //   "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                            // }
                            alt=""
                            className="img-fluid blur-up lazyload bg-img"
                          /> */}
                          <img src={`/media/place/${locality.image.url}`} />
                        </Link>
                      </div>
                      <div className="absolute-contain">
                        <h3>{locality.name}</h3>
                        <h4>{locality.village_name} Village</h4>

                        <br></br>
                        <div>
                          {/* <a
                              href="javascript:void(0)"
                              title="Add to Wishlist" //
                            > */}
                          <span>
                            <a onClick={() => this.addToWishList(locality.id)}>
                              {/* <i
                                className="fa fa-heart fa-2x"
                                style={{ color: "#81ba00" }}
                                aria-hidden="true"
                                // onClick={() => this.addToWishList(locality.id)}
                              ></i> */}
                              <i>
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  size={"2x"}
                                  color={"#ff4c3b"}
                                />
                              </i>
                            </a>
                          </span>
                          {/* </a> */}
                        </div>
                      </div>
                    </div>
                    {/* </a> */}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default LocalityList;
