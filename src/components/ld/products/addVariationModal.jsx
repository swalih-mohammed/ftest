import React, { Component } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { shopAddProductVariationURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

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

  handleChangeStock = v => {
    this.setState({
      stock_weight: v.value
    });
  };

  render() {
    const {
      name,
      price,
      discount_price,
      stock_count,
      is_available,
      // item_stock,
      stock_weight
    } = this.state;
    // console.log(this.state.stock_weight);

    const options = [
      { value: 0.25, label: "250 Gram" },
      { value: 0.5, label: "500 Gram" },
      { value: 0.75, label: "750 Gram" },
      { value: 1, label: "1 KG/No" },
      { value: 1.5, label: "1.5 KG/Ltr" },
      { value: 2, label: "2 KG/No" },
      { value: 5, label: "5 KG/No" },
      { value: 10, label: "10 KG/No" },
      { value: 12, label: "12 KG/No" },
      { value: 15, label: "15 KG/No" },
      { value: 20, label: "20 KG/No" },
      { value: 30, label: "30 KG/No" }
    ];
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
              <Form.Group
                controlId="price"
                style={{
                  display: this.props.item_stock ? "none" : ""
                }}
              >
                <Form.Label>Stock count</Form.Label>
                <Form.Control
                  type="text"
                  name="stock_count"
                  value={stock_count || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                controlId="is_available"
                style={{
                  display: this.props.item_stock ? "none" : "flex"
                }}
              >
                <Form.Check
                  type="checkbox"
                  name="is_available"
                  label="In stock"
                  checked={is_available}
                  onChange={this.handleCheckBox}
                />
              </Form.Group>

              {this.props.item_stock ? (
                <React.Fragment>
                  <Row>
                    <Col sx={12}>
                      <Select
                        // name="item_stock"
                        onChange={this.handleChangeStock}
                        // onClick={() => this.setState({ item_stock: value })}
                        options={options}
                        placeholder={"Deduct from product stock"}
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              ) : null}
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
