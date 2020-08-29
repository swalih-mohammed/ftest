import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { addressListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

class Address extends Component {
  state = {
    addressList: [],
    loading: false,
    error: null,
    editMode: true
  };

  componentDidMount() {
    this.handleFetchAddresses();
  }

  handleFetchAddresses = async () => {
    this.setState({ loading: true });
    authAxios
      .get(addressListURL)
      .then(res => {
        this.setState({ addressList: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { addressList } = this.state;
    const { token } = this.props;
    // console.log(addressList);

    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Breadcrumb title={"Address"} />
        {this.state.loading && <div className="loading-cls"></div>}

        {addressList && (
          <section className="section-b-space">
            <div className="container">
              <div className="account-sidebar">
                <Link style={{ color: "#FFF" }} to={`/create-address`}>
                  Add Address
                </Link>
              </div>
              {addressList.map(address => (
                <div key={address.id} className="row">
                  <div className="col-lg-3">
                    <div className="dashboard-left">
                      <div className="collection-mobile-back">
                        <span className="filter-back">
                          <i
                            className="fa fa-angle-left"
                            aria-hidden="true"
                          ></i>{" "}
                          back
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="dashboard-right">
                      <div className="dashboard">
                        <div className="box-account box-info">
                          <div className="box-head">
                            <h2>{address.PlaceName}</h2>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="box">
                                <div className="box-title">
                                  <h3>{address.areaName}</h3>
                                  {/* <a href={`editaddress/${address.id}`}>Edit</a> */}
                                </div>

                                <div className="box-content">
                                  {/* <h6>House Name: {address.areaName}</h6> */}
                                  <h6>{address.full_address}</h6>
                                  <h6>Village: {address.vilalgeName}</h6>
                                  <h6>District: {address.districtName}</h6>
                                  <h6>Phone: {address.phone_number}</h6>
                                  <br></br>
                                  <a href={`editaddress/${address.id}`}>Edit</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     userID: state.user.user.userID
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUser: () => dispatch(fetchUser())
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Address);

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Address);
