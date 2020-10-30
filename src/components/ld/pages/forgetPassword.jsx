import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { resetRequest } from "../../../constants";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const SignupWrapper = styled.div`
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding-top: 15px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
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
    background: #43a047;
  }
`;

const StyledInput = styled.input`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  /* position: relative; */
  /* width: 100%; */
  border: 0;
  /* margin: 0 0 15px; */
  /* margin: 15px; */
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;
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
      <>
        {/* <Container> */}
        <SignupWrapper>
          <h5>Forgot Your Password?</h5>
          <form className="theme-form">
            {/* <Form.Control */}
            <StyledInput
              name="email"
              type="text"
              id="email"
              placeholder="Enter Your Email"
              required=""
              value={this.state.email}
              onChange={this.handleChange}
            ></StyledInput>

            {/* /> */}
            {/* </Form.Group> */}
          </form>
          <Button onClick={this.resetPassword}>submit</Button>
        </SignupWrapper>
        {/* </Container> */}
      </>
    );
  }
}

export default ForgetPassword;

// export default ForgetPassword;
