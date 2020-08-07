// import React, { useState } from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { orderFilterURL } from "../../../constants";
import { useFormik, Field } from "formik";
import { Form, Button, Card } from "react-bootstrap";
import Select from "react-select";

class Manage extends Component {
  state = {
    orders: [],
    selectedPlace: null
  };

  fetchOrders = () => {
    const place =
      this.state.selectedPlace === undefined ? null : this.state.selectedPlace;
    authAxios
      .get(orderFilterURL, {
        params: {
          place
        }
      })
      .then(res => {
        this.setState({ orders: res.data, loading: false, success: true });
        // setOrders(res.data);
      })
      .catch(err => {
        // this.setState({ loading: false, error: err });
      });
  };

  handleChangePlaces = place => {
    console.log(place);
    // setOrders(place.id);
    this.setState({
      selectedPlace: place
    });
  };

  //   console.log(props.places);
  render() {
    const { places } = this.props;
    const { orders } = this.states;
    console.log(this.state.orders);
    console.log(this.state.selectedPlace);
    return (
      <div>
        <Card ClassName="h-100 shadow-sm bg-white rounded">
          <Card.Body ClassName="d-flex felx-column">
            <div className="a-flex mb-2 justify-content-between">
              <Select
                className="mb-3"
                onChange={this.handleChangePlaces}
                getOptionLabel={option => `${option}`}
                getOptionValue={option => `${option}`}
                options={this.props.places}
                isSearchable={true}
                filterOption={this.customFilter}
                onInputChange={this.handleInputChange}
                noOptionsMessage={() => null}
                placeholder={"Select your locality"}
                autoFocus={true}
                value={this.state.selectedPlace}
                menuIsOpen={this.state.menuOpen}
              />

              <Button
                variant="primary"
                type="submit"
                onClick={this.fetchOrders}
              >
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Manage;
