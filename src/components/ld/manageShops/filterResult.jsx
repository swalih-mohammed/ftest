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
  CardDeck
} from "react-bootstrap";

class SearchResult extends Component {
  render() {
    const shopCount = this.props.shops.length;

    console.log(shopCount);

    return (
      <Container>
        <CardDeck>
          {this.props.shops.map((shop, index) => (
            <Card key={index} border="success" style={{ width: "23rem" }}>
              <Card.Header>{shop.category}</Card.Header>
              <Card.Body>
                <Card.Title>{shop.name}</Card.Title>
                <Card.Text>
                  <p>{shop.place}</p>
                  <p>{shop.viallage}</p>
                  <p>{shop.cluster}</p>
                  <p>{shop.district}</p>
                  <p>{shop.state}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
      </Container>
    );
  }
}

export default SearchResult;
