import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
// import FeautredLocality from "./featuredLocality";
// import Search from "../localityList/search";
import { connect } from "react-redux";
import Localities from "../localityList/main";
import FeautredShops from "./featuredShops";
import { Img } from "react-image";
import { Redirect, Link } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import styled from "styled-components";

import { newPlacesURL, feautredShopsURL, appInfoURL } from "../../../constants";
// import { userFail } from "../../../actions/auth";
// import { id } from "date-fns/esm/locale";

const CARD = styled(Card)`
  background: #ff4c3b;
  font-size: 1.2em;
  font-weight: 300;
  border-radius: 10px;
`;

const BUTTON = styled(Button)`
  background: #1d3461;
  font-size: 1em;
  font-weight: 400;
  padding-right: 1em;
  padding-left: 1em;
  border-radius: 15px;
  border-style: none

  &:hover {
    color: $grey-dark;
  }
`;

const Title = styled.h4`
  text-transform: uppercase;
  color: $grey-dark;
  font-weight: 700;
  margin-bottom: 0;
  padding-bottom: 20px;
  padding-top: 20px;
  line-height: 1.6;
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
    // console.log(user.user.place);
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
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        {this.state.loading && <div className="loading-cls"></div>}
        <section className="p-0">
          {appInfo && (
            <Img
              className="img-fluid lazyload bg-img"
              loading="lazy"
              src={appInfo.coverPhoto1}
              loader={<div className="loading-cls"></div>}
            />
          )}
        </section>
        {/* {Newlocalities && <FeautredLocality Newlocalities={Newlocalities} />} */}
        {featuredShops.length > 0 ? (
          <FeautredShops featuredShops={featuredShops} />
        ) : null}
        <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
          <div className="container">
            <Container>
              <div className="row">
                <CARD
                  // bg={"primary"}
                  // text={"dark"}
                  style={{ width: "25rem" }}
                  className="mb-2"
                >
                  {/* <Card.Header>Header</Card.Header> */}
                  <Card.Body>
                    {/* <Card.Title>{"primary"} Card Title </Card.Title> */}
                    {/* <Card.Text style={{ color: "white" }}> */}
                    <Title>
                      To find shops of your locality, please add your address
                    </Title>

                    {/* </Card.Text> */}
                    <Link to={`/create-address`}>
                      <BUTTON>Add address</BUTTON>
                    </Link>
                  </Card.Body>
                </CARD>
              </div>
            </Container>
          </div>
        </section>

        <Localities />
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Homepage);
