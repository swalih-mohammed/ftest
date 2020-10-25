import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { addressListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px 30px auto auto;
  display: flex;
  flex-direction: column;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
`;

const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 30px;
  cursor: pointer;
  background: #ff4c3b;
  color: #fff;
  border: none;
  border-radius: 5px;
  border: 1px #fff solid;
  &:hover {
    transform: scale(0.98);
    color: #343a40;
  }
`;

class Address extends Component {
  state = {
    addressList: [],
    loading: false,
    error: null,
    editMode: true
  };

  componentDidMount() {
    this.handleFetchAddresses();
  }

  handleFetchAddresses = async () => {
    this.setState({ loading: true });
    authAxios
      .get(addressListURL)
      .then(res => {
        this.setState({ addressList: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { addressList } = this.state;
    const { token } = this.props;
    // console.log(addressList);

    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <Wrapper>
        {addressList ? (
          <>
            {addressList.map(address => (
              <StyledCard>
                <h2>{address.PlaceName}</h2>
                <h4>{address.areaName}</h4>
                <h6>{address.full_address}</h6>
                <h6>Village: {address.vilalgeName}</h6>
                <h6>District: {address.districtName}</h6>
                <h6>Phone: {address.phone_number}</h6>
                <Link
                  to={`${process.env.PUBLIC_URL}/editaddress/${address.id}`}
                >
                  <StyledButton>Edit</StyledButton>
                </Link>
              </StyledCard>
            ))}
          </>
        ) : (
          <StyledCard>
            <Link to={`/create-address`}>
              <StyledButton>Add your address</StyledButton>
            </Link>
          </StyledCard>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Address);
