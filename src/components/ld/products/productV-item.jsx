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
        // this.setState({ error: err });
        toast.error("error");
      });
  };
  render() {
    const { variation, item } = this.props;
    // console.log(variation);
    return (
      <div>
        {this.state.editMode ? (
          <EditVariationModal
            show={this.state.editMode}
            variation={variation}
            item={item}
            hideEdit={this.hideEdit}
            fetchProductDetails={this.props.fetchProductDetails}
          />
        ) : null}
        <br></br>
        <Card style={{ width: "18rem" }}>
          <Card.Header>Name: {variation.name}</Card.Header>
          <ListGroup variant="flush">
            {/* <ListGroupItem>Name: {variation.name}</ListGroupItem> */}

            <ListGroupItem>MRP: {variation.price}</ListGroupItem>
            <ListGroupItem>Price: {variation.discount_price}</ListGroupItem>
            <ListGroupItem>Stcok Count: {variation.stock_count}</ListGroupItem>
            <ListGroupItem>
              In Stock: {variation.is_available ? "Yes" : "No"}
            </ListGroupItem>
            <ListGroupItem>
              Product Stock: {variation.item_stock ? "Yes" : "No"}
            </ListGroupItem>
          </ListGroup>

          <ListGroupItem>
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
          </ListGroupItem>
        </Card>
      </div>
    );
  }
}
export default VaritaionItem;
