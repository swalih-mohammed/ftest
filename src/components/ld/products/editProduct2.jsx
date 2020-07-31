import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";

import { ShopProductUpdateURL, productDetailURL } from "../../../constants";
import { authAxios } from "../../../authAxios";

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

class EditProduct extends Component {
  state = {
    formData: {
      id: "",
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
      .get(productDetailURL(params.productID))
      .then(res => {
        this.setState({ formData: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, success: false, loading: false });
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
      .put(ShopProductUpdateURL(formData.id), {
        ...formData,
        user: userID
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
        toast.success("Your edit is successful");
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { formData, success, error, loading } = this.state;
    // console.log(formData);

    if (success) {
      return <Redirect to="/shop-product-list" />;
    }
    return (
      <Container>
        <Form onSubmit={this.handleUpdateAddress}>
          <Form.Group controlId="title">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="title"
              value={formData.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Discount"
              name="discount"
              value={formData.discount}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            name="detail"
            value={formData.detail}
          >
            <Form.Label>Detail</Form.Label>
            <Form.Control type="text" placeholder="Detail" />
          </Form.Group>
          <Form.Group
            controlId="formBasicCheckbox"
            name="is_available"
            value={formData.is_available}
            onChange={this.handleChange}
          >
            <Form.Check type="checkbox" label="In stock" />
          </Form.Group>
          <Form.Group
            controlId="formBasicCheckbox"
            name="is_featured"
            value={formData.is_featured}
            onChange={this.handleChange}
          >
            <Form.Check type="checkbox" label="Feauture product" />
          </Form.Group>
          <Form.Group
            controlId="formBasicCheckbox"
            name="is_on_sale"
            value={formData.is_on_sale}
            onChange={this.handleChange}
          >
            <Form.Check type="checkbox" label="On sale" />
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
    userID: state.user.user.userID
  };
};

export default connect(mapStateToProps)(EditProduct);
