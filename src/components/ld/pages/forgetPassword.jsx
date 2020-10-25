import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { resetRequest } from "../../../constants";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* background: #f7f9fa; */
  height: 250px;
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
`;

const SignupWrapper = styled.div`
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
        <Container>
          <SignupWrapper>
            <h5>Forgot Your Password?</h5>
            <form className="theme-form">
              <Form.Group controlId="username">
                <Form.Control
                  name="email"
                  type="text"
                  id="email"
                  placeholder="Enter Your Email"
                  required=""
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button onClick={this.resetPassword}>submit</Button>
            </form>
          </SignupWrapper>
        </Container>
      </>
    );
  }
}

export default ForgetPassword;

// export default ForgetPassword;
