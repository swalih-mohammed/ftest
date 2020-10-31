import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/user";
import styled from "styled-components";
import { authLogin } from "../../../actions/auth";
// import { Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const SignupWrapper = styled.div`
  margin: 10px;
  display: flex;
  width: 90%;
`;

const Form = styled.form`
  position: relative;
  /* z-index: 1; */
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
  position: relative;
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

const LoginValidation = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(8)
    .max(16)

    .required()
});

const Login = props => {
  console.log(props.token);
  if (props.token) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {/* <CONTAINER> */}
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
          <>
            <Form onSubmit={handleSubmit} className="mx-auto">
              {/* <Form.Group controlId="username"> */}
              {/* <Form.Control */}
              <StyledInput
                type="text"
                name="username"
                placeholder="User Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={touched.username && errors.username ? "error" : null}
              ></StyledInput>

              {touched.username && errors.username ? (
                <ErrorMsg className="error-message">{errors.username}</ErrorMsg>
              ) : null}
              {/* </Form.Group> */}
              {/* <Form.Group controlId="password"> */}
              {/* <Form.Control */}
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={touched.password && errors.password ? "error" : null}
              ></StyledInput>

              {/* /> */}
              {touched.password && errors.password ? (
                <ErrorMsg>{errors.password}</ErrorMsg>
              ) : null}
              {/* </Form.Group> */}
              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
              <SignupWrapper>
                <Link style={{ marginRight: "auto" }} to="/register">
                  <h6>Register</h6>
                </Link>
                <Link to="/reset-password">
                  <h6>Forgot password?</h6>
                </Link>
              </SignupWrapper>
            </Form>
          </>
        )}
      </Formik>
      {/* </CONTAINER> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

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
