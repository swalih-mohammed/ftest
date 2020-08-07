import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../common/breadcrumb";
import { clearUser } from "../../../actions/user";
// import { authLogin } from "../../../actions/auth";

class Logout extends Component {
  componentDidMount() {
    console.log("logging out");
    toast.error("You have logged out");
    // this.props.clearUser();
    this.props.logOut();
  }

  render() {
    return (
      <div>
        {/* <Breadcrumb title={"Logout"} /> */}
        <ToastContainer />
        {/*Login section*/}
        <div className="login-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h3>You have succefully logged out</h3>
                {/* <div className="theme-card"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(clearUser),
    logOut: () => dispatch(logout)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
