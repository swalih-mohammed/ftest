import React, { Component } from "react";
import EditVariationModal from "./editVariationModal";
import { VariationDeleteURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, ListGroup, ListGroupItem, Form, Button } from "react-bootstrap";
class VaritaionItem extends React.Component {
  state = {
    editMode: false
  };

  showEdit = () => {
    this.setState({ editMode: true });
  };
  hideEdit = () => {
    this.setState({ editMode: false });
  };

  handleDeleteVariation = e => {
    e.preventDefault();
    const { variation } = this.props;
    // const { variationForm } = this.state;
    authAxios
      .delete(VariationDeleteURL(variation.id))
      .then(res => {
        this.setState({
          loading: false
        });
        toast.error("Variation deleted");
        this.props.fetchProductDetails();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
  render() {
    const { variation, item } = this.props;
    console.log(this.state.editMode);
    return (
      <div>
        {this.state.editMode ? (
          <EditVariationModal
            show={this.state.editMode}
            variation={variation}
            item={item}
            hideEdit={this.hideEdit}
          />
        ) : null}
        <Card
          bg={"Light"}
          text={"light"}
          style={{ width: "18rem" }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Name: {variation.name}</ListGroupItem>
                <ListGroupItem>MRP: {variation.price}</ListGroupItem>
                <ListGroupItem>Price: {variation.discount_price}</ListGroupItem>
                <ListGroupItem>
                  In Stock: {variation.is_available ? "Yes" : "No"}
                </ListGroupItem>
              </ListGroup>
            </Card.Text>
            <Button onClick={this.showEdit} variant="outline-primary" size="sm">
              edit
            </Button>{" "}
            <Button
              onClick={this.handleDeleteVariation}
              variant="outline-danger"
              size="sm"
            >
              Delete
            </Button>{" "}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default VaritaionItem;
