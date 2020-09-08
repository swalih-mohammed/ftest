import React, { Component } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { variationPlacements } from "@popperjs/core";
import { authAxios } from "../../../authAxios";
import { VariationUpdateURL } from "../../../constants";

class EditVariation extends React.Component {
  state = {
    variationForm: {
      item: "",
      id: "",
      name: "",
      price: "",
      discount_price: "",
      is_available: true
    }
  };
  componentDidMount() {
    const { variation } = this.props;
    this.setState({
      variationForm: variation
    });
  }

  handleChange = e => {
    const { variationForm } = this.state;
    const updatedFormdata = {
      ...variationForm,
      [e.target.name]: e.target.value
    };
    this.setState({
      variationForm: updatedFormdata
    });
  };

  handlecheckBox = e => {
    const { variationForm } = this.state;
    const updatedFormdata = {
      ...variationForm,
      [e.target.name]: e.target.checked
    };
    this.setState({
      variationForm: updatedFormdata
    });
  };

  handleUpdateVariation = e => {
    e.preventDefault();
    const { item } = this.props;
    const { variationForm } = this.state;
    authAxios
      .put(VariationUpdateURL(variationForm.id), {
        ...variationForm,
        item: item
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true
          //   productForm: { default: false }
        });
        this.props.hideEdit();
        // toast.success("Your edit is successful");
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { variationForm } = this.state;

    // console.log(this.state.variationForm);
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Variation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name (KG|Color|Size)</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={variationForm.name || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="mrp">
                <Form.Label>MRP</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={variationForm.price || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="discountprice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="discount_price"
                  value={variationForm.discount_price || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="in-stock">
                <Form.Check
                  type="checkbox"
                  name="is_available"
                  label="In stock"
                  checked={variationForm.is_available}
                  onChange={this.handleCheckBox}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideEdit} variant="secondary">
            Close
          </Button>
          <Button onClick={this.handleUpdateVariation} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditVariation;
