import React, { Component } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

class EditProductModal extends React.Component {
  render() {
    const { productForm } = this.props;
    console.log(productForm);
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="vName"
                  value={productForm.title || ""}
                  onChange={this.props.handleChangeProductForm}
                />
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Local Name</Form.Label>
                <Form.Control
                  type="text"
                  name="vMRP"
                  value={productForm.title_local || ""}
                  onChange={this.props.handleChangeProductForm}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="is_available"
                  label="In stock"
                  checked={productForm.is_available}
                  onChange={this.props.handlecheckBox}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Feautured product"
                  checked={productForm.is_featured}
                  name="is_featured"
                  checked={productForm.is_featured}
                  onChange={this.props.handlecheckBox}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="On sale"
                  name="is_on_sale"
                  checked={productForm.is_on_sale}
                  onChange={this.props.handlecheckBox}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hide} variant="secondary">
            Close
          </Button>
          <Button onClick={this.props.update} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditProductModal;
