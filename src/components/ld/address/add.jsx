import React, { Component } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import Select from "react-select";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addressCreateURL,
  placeFilterURL,
  areaFilterURL,
  districtFilterURL,
  villagesFilterURL
} from "../../../constants";
import { stateListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aeras: [],
      places: [],
      villages: [],
      districts: [],
      states: [],

      selectedArea: "",
      selectedPlace: "",
      selectedVillage: "",
      selectedDistrict: "",
      selectedState: "",

      form: {
        full_address: "",
        phone_number: ""
      },

      success: false,
      error: null,
      loading: false
    };
  }

  componentDidMount() {
    this.loadStates();
  }

  handleChangeState = state => {
    this.setState(
      {
        selectedState: state.id
      },
      () => {
        this.loadDistricts();
      }
    );
  };

  handleChangeDistrict = district => {
    this.setState(
      {
        selectedDistrict: district.id
      },
      () => {
        this.loadVillages();
      }
    );
  };

  handleChangeVillage = village => {
    this.setState(
      {
        selectedVillage: village.id
      },
      () => {
        this.loadPlaces();
        console.log(this.state.selectedDistrict);
      }
    );
  };

  handleChangePlaces = place => {
    this.setState(
      {
        selectedPlace: place.id
      },
      () => {
        this.loadAreas();
      }
    );
  };

  handleChangeArea = area => {
    this.setState({ selectedArea: area.id });
    // console.log(this.state.selectedArea);
  };

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

  loadDistricts = () => {
    const stateID = this.state.selectedState;
    // console.log(stateID);
    this.setState({ loading: true });
    axios
      .get(districtFilterURL, {
        params: {
          stateID
        }
      })
      .then(res => {
        this.setState({ districts: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadVillages = async () => {
    this.setState({ loading: true });
    const districtID = this.state.selectedDistrict;

    authAxios
      .get(villagesFilterURL, {
        params: {
          districtID
        }
      })

      .then(res => {
        this.setState({ villages: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadPlaces = async () => {
    this.setState({ loading: true });
    const villageID = this.state.selectedVillage;
    authAxios
      .get(placeFilterURL, {
        params: {
          villageID
        }
      })
      .then(res => {
        this.setState({ places: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  loadAreas = async () => {
    this.setState({ loading: true });
    const placeID = this.state.selectedPlace;
    authAxios
      .get(areaFilterURL, {
        params: {
          placeID
        }
      })
      .then(res => {
        this.setState({ aeras: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleCreateAddress = e => {
    e.preventDefault();
    const userID = this.props.user.user.id;
    console.log(userID);
    const {
      form,
      selectedArea,
      selectedPlace,
      selectedVillage,
      selectedDistrict,
      selectedState
    } = this.state;

    if (
      form !== "" &&
      selectedArea !== "" &&
      selectedPlace !== "" &&
      selectedVillage !== "" &&
      selectedDistrict !== "" &&
      selectedState !== ""
    ) {
      authAxios
        .post(addressCreateURL, {
          ...form,
          user: userID,
          area: selectedArea,
          place: selectedPlace,
          village: selectedVillage,
          district: selectedDistrict,
          state: selectedState
        })
        .then(res => {
          toast.success("Address added succesfully");
          this.setState({ success: true });
        })
        .catch(err => {
          this.setState({ error: err });
          toast.error("Oops there was an error");
        });
    } else {
      console.log("else");
      toast.error("Please provide complete address");
    }
  };

  handleChangeB(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ form: { ...this.state.form, [fieldName]: fleldVal } });
    // console.log(this.state.form.phone_number);
  }

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
      full_address,
      selectedState
    } = this.state;

    if (success) {
      return <Redirect to="/addresses" />;
    }

    return (
      <div>
        {loading ? (
          <div className="loading-cls"></div>
        ) : (
          <React.Fragment>
            <ToastContainer />
            <Card ClassName="h-100 shadow-sm bg-white rounded">
              <Card.Body ClassName="d-flex felx-column">
                <div ClassName="a-flex mb-2 justify-content-between">
                  <Select
                    className="mb-3"
                    onChange={this.handleChangeState}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option}`}
                    options={states}
                    // isSearchable={true}
                    filterOption={this.customFilter}
                    onInputChange={this.handleInputChange}
                    noOptionsMessage={() => null}
                    placeholder={"Select state"}
                    // autoFocus={true}
                    menuIsOpen={this.state.menuOpen}
                    isSearchable={false}
                  />
                  <Select
                    className="mb-3"
                    onChange={this.handleChangeDistrict}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option}`}
                    options={districts}
                    isSearchable={true}
                    filterOption={this.customFilter}
                    onInputChange={this.handleInputChange}
                    noOptionsMessage={() => null}
                    placeholder={"Select district"}
                    menuIsOpen={this.state.menuOpen}
                    isSearchable={false}
                  />
                  <Select
                    className="mb-3"
                    onChange={this.handleChangeVillage}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option}`}
                    options={villages}
                    isSearchable={true}
                    filterOption={this.customFilter}
                    onInputChange={this.handleInputChange}
                    noOptionsMessage={() => null}
                    placeholder={"Select village"}
                    menuIsOpen={this.state.menuOpen}
                  />
                  <Select
                    className="mb-3"
                    onChange={this.handleChangePlaces}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option}`}
                    options={places}
                    isSearchable={true}
                    filterOption={this.customFilter}
                    onInputChange={this.handleInputChange}
                    noOptionsMessage={() => null}
                    placeholder={"Select your locality"}
                    menuIsOpen={this.state.menuOpen}
                  />
                  <Select
                    className="mb-3"
                    onChange={this.handleChangeArea}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option}`}
                    options={aeras}
                    isSearchable={true}
                    filterOption={this.customFilter}
                    onInputChange={this.handleInputChange}
                    noOptionsMessage={() => null}
                    placeholder={"Select area"}
                    menuIsOpen={this.state.menuOpen}
                  />
                  <Form>
                    <Form.Group controlId="formGridAddress1">
                      <Form.Control
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        ClassName="mb-3"
                        defaultValue={this.state.phone_number}
                        onChange={this.handleChangeB.bind(this)}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="full_address"
                        placeholder="Road, House Name ..."
                        ClassName="mb-3"
                        defaultValue={this.state.form.full_address}
                        onChange={this.handleChangeB.bind(this)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.handleCreateAddress}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.user
  };
};

export default connect(mapStateToProps)(AddAddress);
