import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { resetPassword } from "../../../actions/auth";
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
    // e.preventDefault();
    console.log("resetting");
    const email = this.state.email;
    axios
      .post("http://127.0.0.1:8000/rest-auth/password/reset/", {
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

    if (this.state.success) {
      return <Redirect to="/reset-password-success" />;
    }
    return (
      <div>
        <Breadcrumb title={"forget password"} />
        <section className="pwd-page section-b-space">
          <div className="container">
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
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(resetPassword(email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPassword);

// export default ForgetPassword;
