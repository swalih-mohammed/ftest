import React, { Component } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { variationPlacements } from "@popperjs/core";
import { authAxios } from "../../../authAxios";
import { VariationUpdateURL } from "../../../constants";
import styled from "styled-components";

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  margin-right: 0.5em;
  margin-left: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 80%;
  }

  @media (min-width: 320px) {
    width: 95%;
  }
`;

class EditVariation extends React.Component {
  state = {
    variationForm: {
      item: "",
      id: "",
      name: "",
      price: "",
      discount_price: "",
      is_available: false,
      item_stock: false,
      stock_count: "",
      stock_weight: 1
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
          loading: false
          // saving: false,
          // success: true
          //   productForm: { default: false }
        });
        this.props.fetchProductDetails();
        this.props.hideEdit();
        // toast.success("Your edit is successful");
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { variationForm } = this.state;
    // console.log(this.props.variation);
    // console.log(variationForm.stock_weight);
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton onClick={this.props.hideEdit}>
          <Modal.Title>Edit Product Variation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <MYFORM>
              <Form.Group controlId="name">
                <Form.Label>Name (KG|Color|Size)</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={variationForm.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="mrp">
                <Form.Label>MRP</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={variationForm.price}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="discountprice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="discount_price"
                  value={variationForm.discount_price}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="stock_count">
                <Form.Label>Stock count</Form.Label>
                <Form.Control
                  type="text"
                  label="Stock Count"
                  name="stock_count"
                  value={variationForm.stock_count}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="is_available">
                <Form.Check
                  type="checkbox"
                  label="In Stock"
                  name="is_available"
                  checked={variationForm.is_available}
                  onChange={this.handlecheckBox}
                />
              </Form.Group>
              <Form.Group controlId="item_stock">
                <Form.Check
                  type="checkbox"
                  label="Product stock"
                  name="item_stock"
                  checked={variationForm.item_stock}
                  onChange={this.handlecheckBox}
                />
              </Form.Group>
            </MYFORM>
            <Row
              style={{ display: variationForm.item_stock ? "flex" : "none" }}
            >
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="250 Gram"
                    checked={variationForm.stock_weight == 0.25}
                    value={0.25}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="500 Gram"
                    value={0.5}
                    checked={variationForm.stock_weight == 0.5}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="750 Gram"
                    value={0.75}
                    checked={variationForm.stock_weight == 0.75}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="1 KG"
                    value={1}
                    checked={variationForm.stock_weight == 1}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="2 KG"
                    value={2}
                    checked={variationForm.stock_weight == 2}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="5 KG"
                    value={5}
                    checked={variationForm.stock_weight == 5}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="10 KG"
                    value={10}
                    checked={variationForm.stock_weight == 10}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sx={12}>
                <Form.Group controlId="v_weight">
                  <Form.Check
                    type="radio"
                    name="stock_weight"
                    label="15 KG"
                    value={15}
                    checked={variationForm.stock_weight == 15}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
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
