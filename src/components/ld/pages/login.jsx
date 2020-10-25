import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/user";
import styled from "styled-components";
import { authLogin } from "../../../actions/auth";
import { Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: 500px;
  width: 95%;
  margin: 50px auto;
  color: snow;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);

  @media (min-width: 786px) {
    width: 60%;
  }
  @media (min-width: 320px) {
    width: 95%;
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
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`;

const SignupWrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SignupContainer = styled.div`
  margin-top: 30px;

  display: flex;
  flex-direction: column;

  margin: 20px auto;

  .outline-auto {
    background-color: #dc3545;
    outline: 50px auto lavender;
  }
`;

const MYFORM = styled(Form)`
  width: 95%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;
  flex-direction: column;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  @media (min-width: 786px) {
    width: 50%;
  }
  @media (min-width: 320px) {
    width: 100%;
  }
`;

const Button = styled.button`
  margin-top: 5px;
  width: 200px;
  border: 1px solid #ff5722;
  background: #fff;
  padding: 7px 14px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  &:hover {
    /* width: auto; */
    background: #ff5722;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
  }
`;

const ForgotButton = styled.button`
  margin-top: 50px;
  width: 200px;
  border: 1px solid #ff5722;
  background: #fff;
  padding: 7px 14px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  &:hover {
    /* width: auto; */
    background: #ff5722;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
  }
`;

const RegisterButton = styled.button`
  margin-top: 25px;
  width: 100px;
  border: 1px solid #ff5722;
  background: #fff;
  padding: 7px 14px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  &:hover {
    /* width: auto; */
    background: #ff5722;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
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
    <CONTAINER>
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
          <MYFORM onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="username">
              {/* <Form.Label>User Name :</Form.Label> */}
              <Form.Control
                type="text"
                name="username"
                placeholder="User Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={touched.username && errors.username ? "error" : null}
              />
              {touched.username && errors.username ? (
                <div className="error-message">{errors.username}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="password">
              {/* <Form.Label>Password :</Form.Label> */}
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={touched.password && errors.password ? "error" : null}
              />
              {touched.password && errors.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
            <br></br>
            <Link to="/reset-password">
              <ForgotButton type="submit">Forgot password</ForgotButton>
            </Link>
            <SignupWrapper>
              <SignupContainer>
                <p> Dont have an account?</p>
                <Link to="/reset-password">
                  <RegisterButton type="submit">Register</RegisterButton>
                </Link>
              </SignupContainer>
            </SignupWrapper>
          </MYFORM>
        )}
      </Formik>
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
