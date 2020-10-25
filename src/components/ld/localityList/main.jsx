import React, { Component } from "react";
import axios from "axios";
import { AddToFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Locality from "./locality-item";
import { placeListURL } from "../../../constants";
import styled from "styled-components";

const LocalityListSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 5px;
  padding-top: 20px;
`;

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
      limit: 10,
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
      <>
        {localities && (
          <>
            <LocalityListSection>
              {localities.map((locality, index) => (
                <Locality locality={locality} key={index} />
              ))}
            </LocalityListSection>
          </>
        )}
      </>
    );
  }
}

export default LocalityList;
