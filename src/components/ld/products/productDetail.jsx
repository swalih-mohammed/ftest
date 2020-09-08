import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import {
  productDetailURL,
  shopAddProductVariationURL,
  ShopProductUpdateURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
import { Modal, Button, Container } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "./editModal";
import AddVariationModal from "./addVariationModal";
import ProductVariationItem from "./productV-item";

class ProductDetail extends Component {
  state = {
    productForm: {
      id: "",
      title: "",
      title_local: "",
      is_in_stock: false,
      is_featured: false,
      is_on_sale: false
    },
    editProductMode: false,
    addVariationModal: false,
    product: "",
    item: "",
    loading: false,
    vName: "",
    vMRP: "",
    vPrice: "",
    vis_available: true
  };

  componentDidMount() {
    this.fetchProductDetails();
  }

  handleCreateVariation = e => {
    e.preventDefault();
    const item = this.state.product.id;
    const { vName, vMRP, vPrice, vis_available } = this.state;
    authAxios
      .post(shopAddProductVariationURL, {
        item: item,
        name: vName,
        price: vPrice,
        discount_price: vPrice,
        is_available: vis_available
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          vMode: false
        });
        this.HideAddVariationModal();
        this.fetchProductDetails();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  showAddVariationModal = () => {
    this.setState({ addVariationModal: true });
  };

  HideAddVariationModal = () => {
    this.setState({ addVariationModal: false });
  };
  editModalShow = () => {
    this.setState({ editProductMode: true });
  };
  editModalHide = () => {
    this.setState({ editProductMode: false });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeCheckBox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleChangeProductForm = e => {
    const { productForm } = this.state;
    const updatedFormdata = {
      ...productForm,
      [e.target.name]: e.target.value
    };
    this.setState({
      productForm: updatedFormdata
    });
  };

  handlecheckBox = e => {
    const { productForm } = this.state;
    const updatedFormdata = {
      ...productForm,
      [e.target.name]: e.target.checked
    };
    this.setState({
      productForm: updatedFormdata
    });
  };

  handleUpdateProductDetails = e => {
    e.preventDefault();
    const { userID } = this.props;
    const { productForm } = this.state;
    authAxios
      .put(ShopProductUpdateURL(productForm.id), {
        ...productForm,
        user: userID
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true
          //   productForm: { default: false }
        });
        this.editModalHide();
        toast.success("Your edit is successful");
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  fetchProductDetails = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    authAxios
      .get(productDetailURL(params.productID))
      .then(res => {
        this.setState({
          product: res.data,
          productForm: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err, success: false, loading: false });
      });
  };

  render() {
    const {
      product,
      vName,
      vMRP,
      vPrice,
      vis_available,
      addVariationModal,
      editProductMode,
      productForm
    } = this.state;
    // console.log(productForm);

    return (
      <section className="section-b-space">
        <div className="container">
          {editProductMode ? (
            <EditModal
              show={editProductMode}
              productForm={productForm}
              hide={this.editModalHide}
              handleChangeProductForm={this.handleChangeProductForm}
              handlecheckBox={this.handlecheckBox}
              update={this.handleUpdateProductDetails}
            />
          ) : null}
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.title_local}</Card.Text>
              <Card.Text>Product ID:{product.id}</Card.Text>
              <Button
                onClick={this.editModalShow}
                variant="outline-primary"
                size="sm"
              >
                edit
              </Button>{" "}
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                In Stock: {product.is_available ? "Yes" : "No"}
              </ListGroupItem>
              <ListGroupItem>
                Featured: {product.is_featured ? "Yes" : "No"}
              </ListGroupItem>
              <ListGroupItem>
                Is on Sale: {product.is_on_sale ? "Yes" : "No"}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button
                onClick={this.showAddVariationModal}
                variant="outline-secondary"
              >
                Add a variation
              </Button>{" "}
            </Card.Body>
          </Card>
          {addVariationModal ? (
            <AddVariationModal
              show={addVariationModal}
              HideAddVariationModal={this.HideAddVariationModal}
              handleChange={this.handleChange}
              handleCreateVariation={this.handleCreateVariation}
              handleChangeCheckBox={this.handleChangeCheckBox}
            />
          ) : null}
          {product.variations ? (
            <React.Fragment>
              {product.variations.map((variation, index) => {
                return (
                  <ProductVariationItem
                    item={product.id}
                    key={index}
                    variation={variation}
                    fetchProductDetails={this.fetchProductDetails}
                  />
                );
              })}
            </React.Fragment>
          ) : null}
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ProductDetail);
