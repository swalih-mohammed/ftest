import React, { Component } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(123);
    const { username, email, password1, password2 } = this.state;
    console.log(username);
    this.props.signup(username, email, password1, password2);
    toast.success("Your registration was successful ");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (token) {
      return <Redirect to="/" />;
    }

    const { error, loading, token } = this.props;
    const { username, email, password } = this.state;

    console.log(username);

    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Breadcrumb title={"create account"} />

        {/*Regsiter section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>create account</h3>
                <div className="theme-card">
                  <form className="theme-form" onSubmit={this.handleSubmit}>
                    <div className="form-row">
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="email">User Name</label>
                          <input
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="First Name"
                            required=""
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="review">Email</label>
                          <input
                            onChange={this.handleChange}
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Last Name"
                            required=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">Password</label>
                        <input
                          onChange={this.handleChange}
                          type="password"
                          className="form-control"
                          id="password1"
                          name="password1"
                          placeholder="password"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review"> Confirm Password</label>
                        <input
                          onChange={this.handleChange}
                          type="password"
                          className="form-control"
                          id="password2"
                          name="password2"
                          placeholder="Confirm password"
                          required=""
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

// export default Register;
