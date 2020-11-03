import React, { Component } from "react";
import { authAxios } from "../../../authAxios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "../../common/index.scss";

import { Redirect } from "react-router-dom";

import FLocality from "./flocality";
import FShop from "./fshop";

import { FavoritePlacesURL, FavoriteShopsURL } from "../../../constants";

class Wishlist extends Component {
  state = {
    loading: false,
    error: null,
    localities: [],
    shops: []
  };

  componentDidMount() {
    // document.getElementById("color").setAttribute("href", `#`);
    this.fetchPlaces();
    this.fetchShops();
  }

  fetchPlaces = async () => {
    this.setState({ loading: true });
    authAxios
      .get(FavoritePlacesURL)
      .then(res => {
        this.setState({ localities: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchShops = async () => {
    this.setState({ loading: true });
    authAxios
      .get(FavoriteShopsURL)
      .then(res => {
        this.setState({ shops: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { localities, shops } = this.state;
    const { token } = this.props;

    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        <div>
          {localities ? (
            <FLocality localities={localities} fetchPlaces={this.fetchPlaces} />
          ) : (
            <p>
              No locality in favorite list. Please click on Heart button on any
              locality to have them added here{" "}
            </p>
          )}
        </div>
        <div>
          {shops ? (
            <FShop shops={shops} fetchShops={this.fetchShops} />
          ) : (
            <p>
              No shops in favorite list. Please click on Heart button on any
              locality to have them added here
            </p>
          )}{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Wishlist);
