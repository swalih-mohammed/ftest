import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Container, Card } from "../styled/utils";
import { PageLoader } from "../common/loader";
import {
  productImagesURL,
  ShopProductCategoryURL,
  addProductURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import Select from "react-select";
import { toast } from "react-toastify";
import { Form, Button, InputGroup, FormControl, Col } from "react-bootstrap";

class AddProduct extends Component {
  state = {
    title: "",
    title_local: "",
    stock_count: null,
    product_image: "",
    productategory: "",
    is_available: true,
    is_on_sale: false,
    is_featured: false,
    item_stock: false,

    id: "",
    success: false,
    error: null,
    loading: false,
    categoryID: 1,
    productImages: [],
    selectedImage: "",
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

  handleChangeCategory = cat => {
    this.setState(
      {
        productategory: cat.id
      },
      () => {
        this.fetchProductImage();
      }
    );
  };

  handleChangeImage = image => {
    this.setState({ product_image: image.id });
    this.setState({ selectedImage: image.image1 });
  };

  handleChangeCheckBox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  fetchProductCategory = () => {
    // const ownerID = this.props.userID;
    const ownerID = this.props.user.user.id;
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
    const productategory = this.state.productategory;
    this.setState({ loading: true });
    // authAxios
    axios
      .get(productImagesURL(productategory))
      .then(res => {
        this.setState({ productImages: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleCreateItem = e => {
    e.preventDefault();
    const userID = this.props.user.user.id;

    // console.log(userID);
    const {
      title,
      title_local,
      stock_count,
      productategory,
      product_image,
      is_available,
      is_on_sale,
      is_featured,
      item_stock
    } = this.state;
    authAxios
      .post(addProductURL, {
        userID,
        title,
        title_local,
        stock_count,
        productategory,
        product_image,
        is_available,
        is_on_sale,
        is_featured,
        item_stock
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    // console.log(this.state.selectedImage);
    // console.log(this.props.userID);
    // console.log(123);
    const {
      success,
      error,
      loading,
      id,
      title,
      title_local,
      stock_count,
      is_available,
      is_on_sale,
      is_featured,
      item_stock,
      productategory
    } = this.state;

    // console.log(this.props.user.user.id);

    if (success) {
      return <Redirect to="/shop-product-list" />;
    }
    if (!this.props.token) {
      return <Redirect to="/login" />;
    }
    return (
      <Container>
        <Card>
          {this.state.loading && <PageLoader />}
          <Form onSubmit={this.handleCreateItem}>
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
            <Form.Group controlId="stock_count">
              <Form.Label>Stock Count</Form.Label>
              <Form.Control
                type="text"
                name="stock_count"
                value={stock_count || ""}
                onChange={this.handleChange}
              />
            </Form.Group>

            <div>
              <Select
                className="mb-3"
                onChange={this.handleChangeCategory}
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => `${option}`}
                options={this.state.ShopProductCategory}
                isSearchable={true}
                placeholder={"Select product category"}
              />
            </div>
            <div>
              <Select
                className="mb-3"
                onChange={this.handleChangeImage}
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => `${option}`}
                options={this.state.productImages}
                isSearchable={true}
                noOptionsMessage={() => null}
                placeholder={"Select image"}
              />
            </div>
            {this.state.selectedImage ? (
              <Col xs={8} md={4}>
                <Image src={this.state.selectedImage} loading="lazy" fluid />
              </Col>
            ) : null}

            <Form.Group controlId="on_sale">
              <Form.Check
                type="checkbox"
                label="On sale"
                name="is_on_sale"
                checked={is_on_sale}
                onChange={this.handleChangeCheckBox}
              />
            </Form.Group>

            <Form.Group controlId="is_available">
              <Form.Check
                type="checkbox"
                name="is_available"
                label="In stock"
                checked={is_available}
                onChange={this.handleChangeCheckBox}
              />
            </Form.Group>
            {/* <Form.Group controlId="is_feautured">
            <Form.Check
              type="checkbox"
              label="Feautured product"
              name="is_featured"
              checked={is_featured}
              onChange={this.handleChangeCheckBox}
            />
          </Form.Group> */}

            <Form.Group controlId="item_stock">
              <Form.Check
                type="checkbox"
                label="Manage stock from product"
                name="item_stock"
                checked={item_stock}
                onChange={this.handleChangeCheckBox}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.user
  };
};

export default connect(mapStateToProps)(AddProduct);
