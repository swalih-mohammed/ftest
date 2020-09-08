import React, { Component } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

class AddVariation extends React.Component {
  render() {
    const { vName, vMRP, vPrice, is_available } = this.props;
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
              <Form.Group controlId="title">
                <Form.Label>Name (KG|Color|Size)</Form.Label>
                <Form.Control
                  type="text"
                  name="vName"
                  value={vName || ""}
                  onChange={this.props.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>MRP</Form.Label>
                <Form.Control
                  type="text"
                  name="vMRP"
                  value={vMRP || ""}
                  onChange={this.props.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="vPrice"
                  value={vPrice || ""}
                  onChange={this.props.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="vis_available"
                  label="In stock"
                  checked={is_available}
                  onChange={this.handleChangeCheckBox}
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
          <Button onClick={this.props.handleCreateVariation} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default AddVariation;
