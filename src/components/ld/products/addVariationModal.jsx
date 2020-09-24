import React, { Component } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
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
    stock_count: "",
    stock_weight: 1,
    weightdisplay: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckBox = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleItemStock = e => {
    if (e.target.checked) {
      this.setState({
        weightdisplay: true
      });
    } else {
      this.setState({
        weightdisplay: false
      });
    }

    this.handleCheckBox(e);
  };

  handleStockWeight = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      item_stock,
      stock_weight
    } = this.state;
    authAxios
      .post(shopAddProductVariationURL, {
        item: item,
        name: name,
        price: price,
        discount_price: discount_price,
        stock_count: stock_count,
        item_stock: item_stock,
        is_available: is_available,
        stock_weight: stock_weight
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
      item_stock,
      stock_weight
    } = this.state;
    console.log(stock_weight);
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
                  onChange={this.handleItemStock}
                />
              </Form.Group>

              <Row
                style={{ display: this.state.weightdisplay ? "flex" : "none" }}
              >
                <Col sx={12}>
                  <Form.Group controlId="v_weight">
                    <Form.Check
                      type="radio"
                      name="stock_weight"
                      label="250 Gram"
                      checked={stock_weight == 0.25}
                      value={0.25}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 0.5}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 0.75}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 1}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 2}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 5}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 10}
                      onChange={this.handleStockWeight}
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
                      checked={stock_weight == 15}
                      onChange={this.handleStockWeight}
                    />
                  </Form.Group>
                </Col>
              </Row>
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
