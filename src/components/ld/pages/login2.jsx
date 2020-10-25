import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { authLogin } from "../../../actions/auth";
import { fetchUser } from "../../../actions/user";
import { Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media (min-width: 786px) {
    width: 60%;
  }
  @media (min-width: 320px) {
    width: 80%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 0.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding-bottom: 8em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }

  @media (min-width: 320px) {
    width: 70%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  }
`;

const LoginValidation = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(6)
    .max(16)
    .required()
});

const Login = props => {
  if (props.token) {
    props.fetchUser();
    return <Redirect to="/" />;
  }

  if (props.error) {
    console.log("error");
    toast.error("Oops! incorrect username or password");
  }
  return (
    <CONTAINER>
      //Sets initial values for form inputs
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            const username = values.username;
            const password = values.password;
            props.login(username, password);

            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <div className="login-page section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h3>Login</h3>
                  <div className="theme-card">
                    <form className="theme-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="username"
                          placeholder="User Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          className={`form-control ${
                            touched.username && errors.username ? "error" : ""
                          }`}
                        />
                        {touched.username && errors.username ? (
                          <div className="error-message">{errors.username}</div>
                        ) : null}
                      </div>
                      <br></br>
                      <div className="form-group">
                        <label htmlFor="review">Password</label>
                        <input
                          //   onChange={this.handleChange}
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          //   className={
                          //     touched.password && errors.password ? "error" : null
                          //   }
                        />
                        {touched.password && errors.password ? (
                          <div className="error-message">{errors.password}</div>
                        ) : null}
                      </div>
                      <br></br>

                      {/* <a href="#" className="btn btn-solid">
                        Login
                      </a> */}
                      <input
                        // onChange={this.handleSubmit}
                        type="submit"
                        className="btn btn-solid"
                        id="submit"
                        placeholder="Submit"
                        required=""
                      />
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 right-login">
                  <div className="theme-card authentication-right">
                    <h6 className="title-font">Forgot Password?</h6>
                    <Link className="btn btn-solid" to="/reset-password">
                      Reset password
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 right-login">
                  <h3>New Customer?</h3>
                  <div className="theme-card authentication-right">
                    <h6 className="title-font">Create A Account</h6>

                    <p>
                      Registration allows you to order from the stores available
                      in the portal. port from the shops of your locality. To
                      start shopping
                      <br></br> <br></br> Disclaimer: Local Dukans does not deal
                      with shops's billing. it is just a platform for small
                      localities to create an online platfom survive in the time
                      of this pandemic, Covid-19. For any billing or product
                      related issues, please contact the shop owners. By signing
                      up, you agree to this terms and condditions.
                    </p>

                    <Link className="btn btn-solid" to="/register">
                      register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </CONTAINER>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

// export default BasicForm;
const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
    fetchUser: () => dispatch(fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
