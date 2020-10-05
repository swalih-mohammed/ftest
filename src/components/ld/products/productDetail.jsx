import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { productDetailURL, localhost } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
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
      is_on_sale: false,
      item_stock: false
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

  showAddVariationModal = () => {
    this.setState({ addVariationModal: true });
  };

  HideAddVariationModal = () => {
    this.setState({ addVariationModal: false });
  };

  // edit product
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
              fetchProduct={this.fetchProductDetails}
              item_stock={productForm.item_stock}
            />
          ) : null}
          {/* <Card style={{ width: "18rem" }}> */}
          <Card>
            <Card.Img variant="top" src={`${localhost}/${product.image}`} />
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
                On Sale: {product.is_on_sale ? "Yes" : "No"}
              </ListGroupItem>
              <ListGroupItem>
                Manage stock from product: {product.item_stock ? "Yes" : "No"}
              </ListGroupItem>
              {product.item_stock ? (
                <ListGroupItem>
                  Stock Count: {product.stock_count}
                </ListGroupItem>
              ) : null}
            </ListGroup>
            <Card.Body>
              <Button
                onClick={this.showAddVariationModal}
                variant="outline-success"
              >
                Add a variation
              </Button>{" "}
            </Card.Body>
          </Card>
          {addVariationModal ? (
            <AddVariationModal
              item={product.id}
              show={addVariationModal}
              HideAddVariationModal={this.HideAddVariationModal}
              // handleChange={this.handleChange}
              // handleChangeCheckBox={this.handleChangeCheckBox}
              fetchProductDetails={this.fetchProductDetails}
              item_stock={productForm.item_stock}
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
                    item_stock={product.item_stock}
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
