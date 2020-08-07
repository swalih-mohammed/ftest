import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Suggestions from "./searchSuggestions";
// import style from "./searchStyle.css";
import { orderSearchURL } from "../../../constants";
import Select from "react-select";
// import SearchResult from "searchResult";
import {
  Form,
  Button,
  Card,
  InputGroup,
  FormControl,
  Col,
  Container,
  CardDeck,
  ListGroup,
  ListGroupItem,
  Row
} from "react-bootstrap";

class SearchResult extends Component {
  render() {
    const { orders } = this.props;
    // console.log(orders);

    return (
      //   <Container>
      <Container fluid>
        <CardDeck>
          <Row>
            {orders.map((order, index) => (
              <Col sm={4}>
                <Card
                  key={index}
                  bg={"secondary"}
                  text={"light"}
                  style={{ width: "21rem" }}
                  className="mb-2"
                >
                  <Card.Header>
                    {order.customer_name} <br></br>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Order No: {order.id}</Card.Title>
                    {order.place_name} <br></br>
                    {order.area_name} <br></br>
                    {order.mobile_number} <br></br>
                    {order.start_date} <br></br>
                    {order.orderStatus} <br></br>
                    {/* <Card.Link href="#">View more</Card.Link> */}
                    <Link to={`order/${order.id}`}>
                      <Button variant="secondary">More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </CardDeck>
      </Container>
    );
  }
}

export default SearchResult;
