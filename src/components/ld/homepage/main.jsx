import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { newPlacesURL, feautredShopsURL, appInfoURL } from "../../../constants";
import Localities from "../localityList/main";
import FeautredShops from "./featuredShops";
import TopPic from "./topPic";
import Wave from "./waive";
import styled from "styled-components";
import { PageLoader } from "../common/loader";
const SVGWrap = styled.div`
  display: flex;
  justify-content: center;
  overflow: visible;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  height: 30vh;
  width: 80%;
  margin: 0 auto 25px auto;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 5px 25px 5px 25px;
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: centet;
  max-width: 150px;
  padding: 10px 30px;
  cursor: pointer;
  background: #ff4c3b;
  color: #fff;
  border: none;
  border-radius: 5px;
  border: 1px #fff solid;
  margin-top: 20px;
  &:hover {
    transform: scale(0.98);
    color: #343a40;
  }
`;
export const CardTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-family: "Playfair Display";
  color: #333333;
  font-size: 30px;
  font-weight: 800;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
`;

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
    // document.getElementById("color").setAttribute("href", `#`);
    // this.fetchAppInfo();
    // this.fetchNewPlaces();
    // this.fetchFeautredShops();
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
    const { user } = this.props;
    if (user.user) {
      if (user.user.place !== undefined) {
        if (user.user.place !== 0) {
          return (
            <Redirect
              to={`${process.env.PUBLIC_URL}/places/${user.user.place}`}
            />
          );
        }
      }
    }
    return (
      <>
        {this.state.loading ? (
          <PageLoader loading={true} />
        ) : (
          <>
            <SVGWrap style={{ marginTop: "90px" }}>
              <TopPic />
            </SVGWrap>

            <Wave />
            <Card>
              Local Dukans helps your locality comes online! To find your local
              shops, please add your address.{" "}
              <StyledButton>Add Address</StyledButton>
            </Card>

            <Localities />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Homepage);
