import React, { Component } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { shopAddProductVariationURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

class AddVariation extends React.Component {
  state = {
    name: "",
    price: "",
    discount_price: "",
    is_available: true,
    item_stock: false,
    stock_count: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckBox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleCreateVariation = e => {
    e.preventDefault();
    const item = this.props.item;
    const {
      name,
      price,
      discount_price,
      is_available,
      stock_count,
      item_stock
    } = this.state;
    authAxios
      .post(shopAddProductVariationURL, {
        item: item,
        name: name,
        price: price,
        stock_count: stock_count,
        item_stock: item_stock,
        discount_price: discount_price,
        is_available: is_available
      })
      .then(res => {
        this.setState({
          loading: false
        });
        toast.success("Variation added");
        this.props.HideAddVariationModal();
        this.props.fetchProductDetails();
      })
      .catch(err => {
        // this.setState({ error: err });
        toast.error("error");
      });
  };

  render() {
    const {
      name,
      price,
      discount_price,
      stock_count,
      is_available,
      item_stock
    } = this.state;
    // console.log(productForm);
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Variation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name (KG|Color|Size)</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="mrp">
                <Form.Label>MRP</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={price || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="discount_price"
                  value={discount_price || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Stock count</Form.Label>
                <Form.Control
                  type="text"
                  name="stock_count"
                  value={stock_count || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="is_available">
                <Form.Check
                  type="checkbox"
                  name="is_available"
                  label="In stock"
                  checked={is_available}
                  onChange={this.handleCheckBox}
                />
              </Form.Group>
              <Form.Group controlId="FromProductstock">
                <Form.Check
                  type="checkbox"
                  name="item_stock"
                  label="From Product stock"
                  checked={item_stock}
                  onChange={this.handleCheckBox}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.props.HideAddVariationModal}
            variant="secondary"
          >
            Close
          </Button>
          <Button onClick={this.handleCreateVariation} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default AddVariation;