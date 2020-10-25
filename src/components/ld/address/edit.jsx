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
import styled from "styled-components";

import {
  addressCreateURL,
  placeFilterURL,
  areaFilterURL,
  districtFilterURL,
  villagesFilterURL,
  orderAddressURL,
  addressUpdateURL
} from "../../../constants";
import { stateListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

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
      loading: false,
      orderAddress: {
        // area:"",
        // areaName: "",
        // PlaceName: "",
        // vilalgeName: "",
        // districtName: "",
        // stateName: "",
        id: "",
        phone_number: "",
        full_address: ""
      }
    };
  }

  componentDidMount() {
    this.fetchAddress();
    this.loadStates();
  }

  fetchAddress = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    authAxios
      .get(orderAddressURL(params.addressID))
      .then(res => {
        this.setState({ orderAddress: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };
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

  handleCreateAddress = e => {
    e.preventDefault();

    // const { userID } = this.props;
    const {
      orderAddress,
      selectedArea,
      selectedPlace,
      selectedVillage,
      selectedDistrict,
      selectedState
    } = this.state;

    if (
      orderAddress !== "" &&
      selectedArea !== "" &&
      selectedPlace !== "" &&
      selectedVillage !== "" &&
      selectedDistrict !== "" &&
      selectedState !== ""
    ) {
      authAxios
        .put(addressUpdateURL(orderAddress.id), {
          ...orderAddress,
          //   user: userID,
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
      //   console.log("else");
      toast.error("Please provide complete address");
    }
  };

  //   handleChangeB(event) {
  //     let fieldName = event.target.name;
  //     let fleldVal = event.target.value;
  //     this.setState({
  //       orderAddress: { ...this.state.form, [fieldName]: fleldVal }
  //     });
  //     // console.log(this.state.form.phone_number);
  //   }

  handleChangeB = e => {
    const { orderAddress } = this.state;
    const updatedOrderAddress = {
      ...orderAddress,
      [e.target.name]: e.target.value
    };
    this.setState({
      orderAddress: updatedOrderAddress
    });
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
        // console.log(this.state.selectedDistrict);
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
    console.log(this.state.selectedArea);
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

    // console.log(this.state.orderAddress.full_address);

    if (success) {
      return <Redirect to="/addresses" />;
    }

    // console.log(villages);
    return (
      <Wrapper>
        <StyledCard>
          <Select
            className="mb-3"
            onChange={this.handleChangeState}
            getOptionLabel={option => `${option.name}`}
            getOptionValue={option => `${option}`}
            options={states}
            isSearchable={true}
            filterOption={this.customFilter}
            onInputChange={this.handleInputChange}
            noOptionsMessage={() => null}
            placeholder={"Select state"}
            autoFocus={true}
            menuIsOpen={this.state.menuOpen}
            // Value={this.state.orderAddress.full_address}
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
            // value={this.state.orderAddress.area}
          />
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                ClassName="mb-3"
                value={this.state.orderAddress.phone_number}
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
                // defaultValue={this.state.form.full_address}
                value={this.state.orderAddress.full_address}
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
        </StyledCard>
      </Wrapper>
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
