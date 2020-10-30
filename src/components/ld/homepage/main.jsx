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

const StyledCover = styled.div`
  height: 40vh;
  margin-left: 0;
  margin-right: 0;
  background-image: url(${props => props.imgurl});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

// const SVGWrap = styled.div`
//   /* height: 4vh; */
//   display: grid;
//   /* height: 300px; */
//   position: relative;
//   overflow: overlay;
//   grid-template-columns: 1fr 3fr 1fr;
//   /* grid-template-rows: 200px 100px; */
//   /* grid-gap: 1rem; */
//   grid-template-areas:
//     "svg svg svg"
//     "wave wave wave";
// `;

const SVGWrap = styled.div`
  /* height: 4vh; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* position: relative; */
  /* overflow: overlay; */
  overflow: visible;
  /* z-index: 100; */
`;

const Svgs = styled.div`
  position: relative;
  overflow: visible;
  /* display: flex; */
  /* align-items: center; */
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
  /* display: inline-block; */
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
  /* margin-bottom: 3rem; */
  /* margin-top: 3rem; */
  text-shadow: rgba(black, 0.5) 0 10px 10px;
`;

const AddressAskSection = styled.div`
  height: 40vh;
  background-color: #b8cde8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem 1rem;
  padding: 5rem 3rem;
`;

const AddressAskContent = styled.p`
  font-size: 1rem;
  display: flex;
  color: #303030;
  margin-bottom: 2rem;
`;

const AddressButton = styled.button`
  background-color: #ff4c3b;
  white-space: nowrap;
  color: #080808;
  font-size: 0.8rem;
  padding: 0.25rem 5rem;
  border: none;
  border-radius: 30px;
  text-transform: uppercase;

  &:hover {
    background-color: #f0f8ff;
    color: #ff4c3b;
  }
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
            <SVGWrap>
              <TopPic />
            </SVGWrap>
            {/* <Svgs> */}
            <Wave />
            <Card>
              Local Dukans helps your locality comes online! To find your local
              shops, please add your address.{" "}
              <StyledButton>Add Address</StyledButton>
            </Card>
            {/* </Svgs> */}
            {/* {featuredShops.length > 0 ? (
          <FeautredShops featuredShops={featuredShops} />
        ) : null} */}

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
