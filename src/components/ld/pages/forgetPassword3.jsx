import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { resetRequest } from "../../../constants";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ForgetPassword extends Component {
  state = {
    email: "",
    success: false,
    loading: false,
    data: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetPassword = () => {
    console.log("resetting");
    const email = this.state.email;
    axios

      .post(resetRequest, {
        email: email
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
          error: err,
          loading: false
        });
      });
  };

  render() {
    // console.log(this.state.success);
    const { success, loading } = this.state;

    if (success) {
      return <Redirect to="/reset-password-success" />;
    }
    return (
      <div>
        <Breadcrumb title={"forget password"} />
        <section className="pwd-page section-b-space">
          <div className="container">
            {loading ? (
              <div className="loading-cls"></div>
            ) : (
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <h2>Forgot Your Password?</h2>
                  <form className="theme-form">
                    <div className="form-row">
                      <div className="col-md-12">
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter Your Email"
                          required=""
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>

                      <input
                        // type="submit"
                        className="btn btn-solid"
                        id="submit"
                        placeholder="Submit"
                        required=""
                        onClick={this.resetPassword}
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default ForgetPassword;

// export default ForgetPassword;
