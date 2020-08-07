import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterShops from "./filterShops";
// import Antd from "./antd2";

import { serviceAreaURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { fetchUser } from "../../../actions/user";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      places: [],
      villages: [],
      clusters: [],
      districts: [],
      states: [],
      loading: false,
      error: null,
      data: []
    };
  }

  componentWillMount() {
    this.props.fetchUserType();
    this.fetchServieArea();
  }

  fetchServieArea = () => {
    this.setState({ loading: true }, () => {
      authAxios
        .get(serviceAreaURL)
        .then(res => {
          this.setState({
            data: res.data[0]
          });
          this.setState({
            areas: res.data[0].areas
          });
          this.setState({
            places: res.data[0].places
          });
          this.setState({
            villages: res.data[0].villages
          });
          this.setState({
            clusters: res.data[0].clusters
          });
          this.setState({
            districts: res.data[0].districts
          });
          this.setState({
            states: res.data[0].states
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

  render() {
    const {
      data,
      areas,
      places,
      villages,
      clusters,
      districts,
      states
    } = this.state;
    const { userType, token } = this.props;
    console.log(data);

    return (
      <div>
        <Breadcrumb title={"Manage"} />
        <FilterShops
          areas={areas}
          places={places}
          villages={villages}
          clusters={clusters}
          districts={districts}
          states={states}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.user.user.UserType,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserType: () => dispatch(fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manage);
