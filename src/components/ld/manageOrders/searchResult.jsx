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
    const { results } = this.props;
    console.log(results);

    return (
      <CardDeck>
        {this.props.results.map((result, index) => (
          <Card key={index} border="success" style={{ width: "20rem" }}>
            <Card.Header>Order No:{result.id}</Card.Header>
            <Card.Body>
              <Card.Title>{result.shop_name}</Card.Title>
              <Card.Text>
                <p>{result.order_status}</p>
                <p>{result.order_status}</p>
                <p>{result.order_status}</p>
                <p>{result.order_status}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    );
  }
}

export default SearchResult;
