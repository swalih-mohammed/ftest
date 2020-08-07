import React, { Component } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";

import { addressCreateURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

class AddAddress extends Component {
  state = {
    formData: {
      place: "",
      area: "",
      house_name: "",
      road_name: "",
      village: "",
      district: "",
      state: "",
      pin_code: "",
      phone_number: "",
      default: true
    },
    success: false,
    error: null,
    loading: false,
    editMode: false
  };

  handleChange = e => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
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
        user: userID,
        address_type: "S"
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
    const { formData, success, error, loading } = this.state;
    // console.log(success);
    if (success) {
      return <Redirect to="/addresses" />;
    }
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
                        <label htmlFor="palce">Locality</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="place"
                          name="place"
                          value={formData.place}
                          placeholder="Locality"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="area">Area</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="area"
                          name="area"
                          value={formData.area}
                          placeholder="Area"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="house_name">House Name/Falt No</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="house_name"
                          name="house_name"
                          value={formData.house_name}
                          placeholder="House Name/Flat No"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Raod Name</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="road_name"
                          name="road_name"
                          value={formData.road_name}
                          placeholder="Road Name"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">village</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="village"
                          name="village"
                          value={formData.village}
                          placeholder="Village/Panchayath"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">District</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="district"
                          name="district"
                          value={formData.district}
                          placeholder="District"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">State</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value={formData.state}
                          placeholder="State"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Pin Code</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="pin_code"
                          name="pin_code"
                          value={formData.pin_code}
                          placeholder="Pin Code"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Phone Number</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          placeholder="Phone Number"
                          required=""
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="review">Make it defalult</label>
                        <input
                          onChange={this.handleChange}
                          type="radio"
                          className="form-control"
                          id="default"
                          name="default"
                          value={formData.default}
                          default="fax"
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
