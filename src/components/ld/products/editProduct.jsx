import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";

import { addressUpdateURL, orderAddressURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

class EditProduct extends Component {
  state = {
    formData: {
      //   id: "",
      title: "",
      quantity: "",
      price: "",
      discount_price: "",
      //   category: "",
      description: "",
      is_available: "",
      is_on_sale: ""
    },
    success: false,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.fetchAddress();
  }

  fetchAddress = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    authAxios
      .get(orderAddressURL(params.PrductID))
      .then(res => {
        this.setState({ formData: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
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

  handleUpdateAddress = e => {
    e.preventDefault();
    const { userID } = this.props;
    const { formData } = this.state;
    authAxios
      .put(addressUpdateURL(formData.id), {
        ...formData,
        user: userID
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { formData, success, error, loading } = this.state;
    console.log(formData);

    if (success) {
      return <Redirect to="/addresses" />;
    }
    return (
      <div>
        {/* <Breadcrumb title={"Edit Address"} /> */}

        {/*Create address section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>Edit Product</h3>
                <div className="theme-card">
                  <form
                    className="theme-form"
                    onSubmit={this.handleUpdateAddress}
                  >
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="palce">Product Name</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={formData.title}
                          placeholder="Locality"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="area">Quantity</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          value={formData.area}
                          placeholder="Area"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="house_name">Price</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="house_name"
                          name="price"
                          value={formData.price}
                          placeholder="Price"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="house_name">Discount Price</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          className="form-control"
                          id="house_name"
                          name="discount_price"
                          value={formData.discount_price}
                          placeholder="Price"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="review">Description</label>
                        <textarea
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
                        <label htmlFor="review">Product is in Stock</label>
                        <input
                          onChange={this.handleChange}
                          type="checkbox"
                          className="form-control"
                          id="default"
                          name="is_available"
                          value={formData.is_available}
                          default="fax"
                          required=""
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Featured Product</label>
                        <div class="form-check">
                          <input
                            onChange={this.handleChange}
                            type="checkbox"
                            className="form-control"
                            id="default"
                            name="is_featured"
                            value={formData.is_featured}
                            default="fax"
                            required=""
                          />
                        </div>
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

export default connect(mapStateToProps)(EditProduct);
