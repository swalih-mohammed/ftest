import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { authSignup } from "../../../actions/auth";
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

// Schema for yup
const LoginValidation = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .max(16)
    .required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
});

const Register = props => {
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
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm_password: ""
        }}
        validationSchema={LoginValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            const username = values.username;
            const email = values.email;
            const password1 = values.password;
            const password2 = values.confirm_password;
            props.signup(username, email, password1, password2);
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
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
                  <h3>Register</h3>
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
                        />
                        {touched.username && errors.username ? (
                          <div className="error-message">{errors.username}</div>
                        ) : null}
                      </div>
                      <br></br>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {touched.email && errors.email ? (
                          <div className="error-message">{errors.email}</div>
                        ) : null}
                      </div>
                      <br></br>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          className="form-control"
                          type="text"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {touched.password && errors.password ? (
                          <div className="error-message">{errors.password}</div>
                        ) : null}
                      </div>
                      <br></br>
                      <div className="form-group">
                        <label htmlFor="confirm_password">
                          Confirm Password
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name="confirm_password"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirm_password}
                        />
                        {touched.confirm_password && errors.confirm_password ? (
                          <div className="error-message">
                            {errors.confirm_password}
                          </div>
                        ) : null}
                      </div>
                      <br></br>

                      <input
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
                      with shops' billing or guarantee of the product listed by
                      the stores. It is just a platform which helps small
                      localities to come online. Local shops can sell their
                      goods to their own community and local community can buy
                      things from their own stores without going to the physical
                      store. This platform is created with a good intention of
                      helping small community and stores to continue the
                      business observing physical distance in this Covid era.
                      For any billing or product related issues, you are
                      required to contact the respective shop owners. By signing
                      up, you agree to these terms and conditions.
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

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
    fetchUser: () => dispatch(fetchUser())
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
