import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { resetPassword } from "../../../actions/auth";
import axios from "axios";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    this.props.resetPassword(email);
    console.log("submite");
  };

  resetPassword = email => {
    // e.preventDefault();
    console.log("resetting");
    axios
      .post("http://127.0.0.1:8000/rest-auth/reset/", {
        email: email
      })
      .then(res => {
        const responsed = res.data;
        console.log(responsed);
        // const token = res.data.key;
        // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        // localStorage.setItem("token", token);
        // localStorage.setItem("expirationDate", expirationDate);
        // dispatch(authSuccess(token));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        // dispatch(authFail(err));
      });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Breadcrumb title={"forget password"} />

        {/*Forget Password section*/}
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
                    {/* <a href="#" className="btn btn-solid">
                      Submit
                    </a> */}
                    <input
                      type="submit"
                      className="btn btn-solid"
                      id="submit"
                      placeholder="Submit"
                      required=""
                      //   onClick={this.resetPassword}
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
