import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { authLogin } from "../../../actions/auth";
import { Form, Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
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

// // RegEx for phone number validation
// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

// Schema for yup
const LoginValidation = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    // .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$")
    .required()
});

const Login = props => {
  return (
    <CONTAINER>
      //Sets initial values for form inputs
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            // console.log(values.email);
            const username = values.username;
            const password = values.password;
            // console.log(email);
            props.login(username, password);
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
          <MYFORM onSubmit={handleSubmit} className="mx-auto">
            {/* {console.log(values)}> */}
            <Form.Group controlId="username">
              <Form.Label>User Name :</Form.Label>
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
              <Form.Label>Password :</Form.Label>
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
            <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </BUTTON>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

// export default BasicForm;
const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
    fetchUser: () => dispatch(fetchUser())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
