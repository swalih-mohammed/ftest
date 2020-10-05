import React, { Component } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { ShopProductUpdateURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { toast } from "react-toastify";
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

class EditProductModal extends React.Component {
  state = {
    form: {
      id: "",
      title: "",
      title_local: "",
      stock_count: "",
      is_available: true,
      is_featured: true,
      is_on_sale: true,
      item_stock: false
    }
  };
  componentDidMount() {
    const { productForm } = this.props;
    this.setState({
      form: productForm
    });
  }

  handleChange = e => {
    const { form } = this.state;
    const updatedFormdata = {
      ...form,
      [e.target.name]: e.target.value
    };
    this.setState({
      form: updatedFormdata
    });
  };

  handlecheckBox = e => {
    const { form } = this.state;
    const updatedFormdata = {
      ...form,
      [e.target.name]: e.target.checked
    };
    this.setState({
      form: updatedFormdata
    });
  };

  handleUpdateProduct = e => {
    e.preventDefault();
    // const { userID } = this.props;
    const { form } = this.state;
    authAxios
      .put(ShopProductUpdateURL(form.id), {
        ...form
        // user: userID
      })
      .then(res => {
        this.setState({
          // saving: false,
          // success: true
        });
        this.props.fetchProduct();
        this.props.hide();
        toast.success("Your edit is successful");
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { form } = this.state;
    // console.log(form);
    // console.log(this.props.productForm);

    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton onClick={this.props.hide}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <MYFORM>
              <Form.Group controlId="title">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Local Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title_local"
                  value={form.title_local || ""}
                  onChange={this.handleChange}
                />
              </Form.Group>

              {form.item_stock ? (
                <Form.Group controlId="stock_count">
                  <Form.Label>Stock Count</Form.Label>
                  <Form.Control
                    type="text"
                    label="Stock Count"
                    name="stock_count"
                    checked={form.stock_count}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              ) : null}

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="is_available"
                  label="In stock"
                  checked={form.is_available}
                  onChange={this.handlecheckBox}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="On sale"
                  name="is_on_sale"
                  checked={form.is_on_sale}
                  onChange={this.handlecheckBox}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Feautured product"
                  checked={form.is_featured}
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={this.handlecheckBox}
                />
              </Form.Group>
              <Form.Group controlId="item_stock">
                <Form.Check
                  type="checkbox"
                  label="Manage stock from product"
                  name="item_stock"
                  checked={form.item_stock}
                  onChange={this.handlecheckBox}
                />
              </Form.Group>
            </MYFORM>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hide} variant="secondary">
            Close
          </Button>
          <Button onClick={this.handleUpdateProduct} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditProductModal;
