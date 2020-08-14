import React, { Component } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";

import {
  addressCreateURL,
  placeListURL,
  areaFilterURL,
  districtFilterURL,
  villageFilterURL
} from "../../../constants";
import { stateListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

class AddAddress extends Component {
  state = {
    aeras: [],
    places: [],
    villages: [],
    districts: [],
    states: [],

    selectedArea: "",
    selectedPlace: "",
    selectedVillage: "",
    dselecteDistrict: "",
    selectedState: "",

    full_address: "",
    phone_number: "",

    success: false,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.loadStates();
    this.loadDistricts();
    this.loadVillages();
    this.loadPlaces();
    this.loadAreas();
  }

  loadStates = async () => {
    this.setState({ loading: true });
    authAxios
      .get(stateListURL)
      .then(res => {
        this.setState({ states: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadDistricts = async () => {
    this.setState({ loading: true });
    authAxios
      .get(districtFilterURL)
      .then(res => {
        this.setState({ districts: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadVillages = async () => {
    this.setState({ loading: true });
    authAxios
      .get(villageFilterURL)
      .then(res => {
        this.setState({ villages: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadPlaces = async () => {
    this.setState({ loading: true });
    authAxios
      .get(placeListURL)
      .then(res => {
        this.setState({ places: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadAreas = async () => {
    this.setState({ loading: true });
    authAxios
      .get(areaFilterURL)
      .then(res => {
        this.setState({ aeras: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleChange = e => {
    const { formData } = this.state;
    const updatedFormdata = {
      [e.target.name]: e.target.value
    };
    this.setState({
      formData: updatedFormdata
    });
  };

  handleCreateAddress = e => {
    e.preventDefault();
    const { userID } = this.props;
    // console.log(userID);
    const { formData } = this.state;
    authAxios
      .post(addressCreateURL, {
        ...formData,
        user: userID
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
        this.props.handleCallback();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const {
      success,
      error,
      loading,
      states,
      districts,
      villages,
      places,
      aeras,
      phone_number,
      full_address
    } = this.state;
    // console.log(success);
    if (success) {
      return <Redirect to="/addresses" />;
    }

    console.log("test");
    return (
      <div>
        <Breadcrumb title={"Add Address"} />

        {/*Create address section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>Add Address</h3>
                <div className="theme-card">
                  <form
                    className="theme-form"
                    onSubmit={this.handleCreateAddress}
                  >
                    <div className="form-row">
                      <div className="col-md-6">
                        {/* <label htmlFor="palce">Locality</label> */}
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={this.handleSelect}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          // isOptionSelected={option => {
                          //   this.state.selected.id === option.id ? true : false;
                          // }}
                          options={states}
                          isSearchable={true}
                          filterOption={this.customFilter}
                          onInputChange={this.handleInputChange}
                          noOptionsMessage={() => null}
                          placeholder={"Select state"}
                          autoFocus={true}
                          menuIsOpen={this.state.menuOpen}
                        />
                      </div>
                      <br></br>
                      <div className="col-md-6">
                        {/* <label htmlFor="area">District</label> */}
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={this.handleSelect}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          // isOptionSelected={option => {
                          //   this.state.selected.id === option.id ? true : false;
                          // }}
                          options={districts}
                          isSearchable={true}
                          filterOption={this.customFilter}
                          onInputChange={this.handleInputChange}
                          noOptionsMessage={() => null}
                          placeholder={"Select district"}
                          autoFocus={true}
                          menuIsOpen={this.state.menuOpen}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="form-row">
                      <div className="col-md-6">
                        {/* <label htmlFor="house_name">House Name/Falt No</label> */}
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={this.handleSelect}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          // isOptionSelected={option => {
                          //   this.state.selected.id === option.id ? true : false;
                          // }}
                          options={villages}
                          isSearchable={true}
                          filterOption={this.customFilter}
                          onInputChange={this.handleInputChange}
                          noOptionsMessage={() => null}
                          placeholder={"Select village"}
                          autoFocus={true}
                          menuIsOpen={this.state.menuOpen}
                        />
                      </div>
                      <br></br>
                      <div className="col-md-6">
                        {/* <label htmlFor="review">Raod Name</label> */}
                        <Select
                          // className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={this.handleSelect}
                          getOptionLabel={option => `${option.name}`}
                          getOptionValue={option => `${option}`}
                          // isOptionSelected={option => {
                          //   this.state.selected.id === option.id ? true : false;
                          // }}
                          options={places}
                          isSearchable={true}
                          filterOption={this.customFilter}
                          onInputChange={this.handleInputChange}
                          noOptionsMessage={() => null}
                          placeholder={"Select locality"}
                          autoFocus={true}
                          menuIsOpen={this.state.menuOpen}
                        />
                      </div>
                      <br></br>

                      <div className="col-md-6">
                        {/* <label htmlFor="review">Phone Number</label> */}
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                          value={phone_number}
                          placeholder="Phone Number"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Address</label>
                        <textarea
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="full_address"
                          name="full_address"
                          value={full_address}
                          placeholder="Full address"
                          required=""
                        />
                      </div>

                      <input
                        // onChange={this.handleSubmit}
                        type="submit"
                        className="btn btn-solid"
                        id="submit"
                        placeholder="Submit"
                        required=""
                      />
                    </div>
                  </form>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userID: state.user.user.userID
  };
};

export default connect(mapStateToProps)(AddAddress);
