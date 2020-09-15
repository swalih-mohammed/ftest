import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
// import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
// import InfiniteScroll from "react-infinite-scroll-component";
import Form from "./tableSearchForm";

import { serviceAreaURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { fetchUser } from "../../../actions/user";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      loading: false,
      error: null,
      data: []
    };
  }

  componentDidMount() {
    // this.props.fetchUserType();
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
            places: res.data[0].places
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
    const { places } = this.state;
    // const { userType, token } = this.props;
    // console.log(places);

    return (
      <div>
        {/* <Breadcrumb title={"Manage"} /> */}

        {places && <Form places={places} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
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
