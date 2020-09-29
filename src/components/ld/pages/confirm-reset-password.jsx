import React, { Component } from "react";
// import { resetConfirm } from "../../../actions/auth";

import { resetConfirm } from "../../../constants";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Breadcrumb from "../common/breadcrumb";

class ConfirmResetpassword extends Component {
  state = {
    password1: "",
    password2: "",
    success: false,
    loading: false,
    data: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    this.setState({
      loading: true
    });

    e.preventDefault();

    const uid = this.props.match.params.uid;
    const token = this.props.match.params.token;
    const password1 = this.state.password1;
    const password2 = this.state.password2;

    axios
      // .post("https://www.localdukans.com/rest-auth/password/reset/confirm/", {
      // .post("http://127.0.0.1:8000/rest-auth/password/reset/confirm/", {
      .post(resetConfirm, {
        new_password1: password1,
        new_password2: password2,
        uid: uid,
        token: token
      })
      .then(res => {
        this.setState({
          data: res.data,
          loading: false,
          success: true
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false
        });
      });
  };

  render() {
    // const { error,  } = this.props;
    const { password1, password2, success, loading } = this.state;
    // console.log(success);

    if (this.state.success) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Breadcrumb title={"Reset password"} />

        <div className="login-page section-b-space">
          <div className="container">
            {loading ? (
              <div className="loading-cls"></div>
            ) : (
              <div className="row">
                <div className="col-lg-6">
                  <h3>Change Password</h3>
                  <div className="theme-card">
                    <form className="theme-form" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">New Password</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="username"
                          value={password1}
                          name="password1"
                          placeholder="New Password"
                          required=""
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="review">Confirm new password</label>
                        <input
                          onChange={this.handleChange}
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Confirm new password"
                          required=""
                          value={password2}
                          name="password2"
                        />
                      </div>

                      <input
                        onChange={this.handleSubmit}
                        type="submit"
                        className="btn btn-solid"
                        id="submit"
                        placeholder="Submit"
                        required=""
                      />
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmResetpassword;

// export default Login;
