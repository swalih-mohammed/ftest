import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { authSignup } from "../../../actions/auth";
import { fetchUser } from "../../../actions/user";
// import { Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #ff5722;
  width: 90%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 35px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  &:hover {
    background: #ff5722;
    color: #ffffff;
  }
`;

const SignupWrapper = styled.div`
  margin: 10px;
  display: flex;
  width: 90%;
`;

const Form = styled.form`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const StyledInput = styled.input`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  /* position: relative; */
  width: 100%;
  border: 0;
  /* margin: 0 0 15px; */
  margin: 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;
const ErrorMsg = styled.div`
  color: #ff6565;
  /* padding: 1em; */
  height: 1em;
  /* position: absolute; */
  font-size: 0.8em;
  margin-right: auto;
`;

const Terms = styled.div`
  justify-content: left;
  text-align: left;
  margin: 15px 2px;
  width: 90%;
  align-content: left;
  align-items: left;
  line-height: 20px;
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
    <>
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
          <>
            <Form onSubmit={handleSubmit}>
              <h2>Register</h2>
              <StyledInput
                type="text"
                name="username"
                placeholder="User Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              ></StyledInput>
              {touched.username && errors.username ? (
                <ErrorMsg>{errors.username}</ErrorMsg>
              ) : null}
              <StyledInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              ></StyledInput>

              {touched.email && errors.email ? (
                <ErrorMsg>{errors.email}</ErrorMsg>
              ) : null}

              <StyledInput
                type="text"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              ></StyledInput>
              {touched.password && errors.password ? (
                <ErrorMsg>{errors.password}</ErrorMsg>
              ) : null}
              <StyledInput
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm_password}
              ></StyledInput>
              {touched.confirm_password && errors.confirm_password ? (
                <ErrorMsg>{errors.confirm_password}</ErrorMsg>
              ) : null}
              <Button
                type="submit"
                id="submit"
                placeholder="Submit"
                required=""
              >
                Submit
              </Button>
              <h6>
                Already have an account?{" "}
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </h6>
              <Terms>
                <strong>Disclaimer:</strong> Local Dukans does not deal with
                shops' billing or guarantee the quality of the product listed by
                the stores. It is just a platform which helps small localities
                to come online. Local shops can sell their goods to their own
                community and local communities can buy things from their own
                stores without going to the physical store. This platform is
                created with a good intention of helping small communities and
                stores to continue their business observing physical distance.
                For any billing or product related issues, you are required to
                contact the respective shops. By signing up, you agree to these
                terms and conditions.
              </Terms>
            </Form>
          </>
        )}
      </Formik>
      <ToastContainer />
    </>
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
