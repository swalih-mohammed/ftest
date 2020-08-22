import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import axios from "axios";

import { productImagesURL, ShopProductCategoryURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Col,
  Container
} from "react-bootstrap";

class AddProduct extends Component {
  state = {
    id: "",
    title: "",
    title_local: "",
    item_quantity: "",
    price: "",
    discount_price: "",
    is_available: false,
    is_on_sale: false,
    is_featured: false,

    success: false,
    error: null,
    loading: false,

    categoryID: 1,
    productImages: [],
    shopID: 1,
    ShopProductCategory: []
  };

  componentDidMount() {
    // this.fetchProductImage();
    this.fetchProductCategory();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeCheckBox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  fetchProductCategory = () => {
    const ownerID = this.props.userID;
    this.setState({ loading: true });
    // authAxios
    axios
      .get(ShopProductCategoryURL(ownerID))
      .then(res => {
        this.setState({ ShopProductCategory: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchProductImage = () => {
    const categoryID = this.state.categoryID;
    this.setState({ loading: true });
    // authAxios
    axios
      .get(productImagesURL(categoryID))
      .then(res => {
        this.setState({ productImages: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    console.log(this.state.productImages);
    console.log(this.props.userID);
    const {
      success,
      error,
      loading,
      id,
      title,
      title_local,
      item_quantity,
      price,
      discount_price,
      is_available,
      is_on_sale,
      is_featured
    } = this.state;

    // console.log(formData);

    if (success) {
      return <Redirect to="/shop-product-list" />;
    }
    return (
      <Container>
        {this.state.loading && <div className="loading-cls"></div>}
        <Form onSubmit={this.handleUpdateProductDetails}>
          <Form.Group controlId="title">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title || ""}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Product Local Name</Form.Label>
            <Form.Control
              type="text"
              name="title_local"
              value={title_local || ""}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Quantity"
              name="quantity"
              value={item_quantity || ""}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={price || ""}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Discounted Price</Form.Label>
            <Form.Control
              type="text"
              name="discount"
              value={discount_price || ""}
              onChange={this.handleChange}
            />
          </Form.Group>
          <div>
            <Select
              className="mb-3"
              onChange={this.handleChangeState}
              getOptionLabel={option => `${option.name}`}
              getOptionValue={option => `${option}`}
              // options={states}
              isSearchable={true}
              filterOption={this.customFilter}
              onInputChange={this.handleInputChange}
              noOptionsMessage={() => null}
              placeholder={"Select state"}
              // autoFocus={true}
              // menuIsOpen={this.state.menuOpen}
            />
          </div>
          <div>
            <Select
              className="mb-3"
              onChange={this.handleChangeState}
              getOptionLabel={option => `${option.name}`}
              getOptionValue={option => `${option}`}
              // options={states}
              isSearchable={true}
              filterOption={this.customFilter}
              onInputChange={this.handleInputChange}
              noOptionsMessage={() => null}
              placeholder={"Select state"}
              // autoFocus={true}
              // menuIsOpen={this.state.menuOpen}
            />
          </div>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="is_available"
              label="In stock"
              checked={is_available}
              onChange={this.handleChangeCheckBox}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Feautured product"
              name="is_featured"
              checked={is_featured}
              onChange={this.handleChangeCheckBox}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="On sale"
              name="is_on_sale"
              checked={is_on_sale}
              onChange={this.handleChangeCheckBox}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    // userID: state.user.user.userID
    userID: state.user.user.userID
  };
};

export default connect(mapStateToProps)(AddProduct);
