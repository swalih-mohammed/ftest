import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Suggestions from "./searchSuggestions";
// import style from "./searchStyle.css";
import { orderSearchURL } from "../../../constants";
import Select from "react-select";
import SearchResult from "./searchResult";
import {
  Form,
  Button,
  Card,
  InputGroup,
  FormControl,
  Col,
  Container
} from "react-bootstrap";

class SearchOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    axios
      .get(orderSearchURL + `?search=${search}`)
      .then(res => {
        this.setState({ results: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { results } = this.state;
    // console.log(results);

    return (
      <Container>
        <Form inline>
          <Form.Label for="inlineFormInputName2" srOnly>
            search
          </Form.Label>
          <Form.Control
            name="search"
            className="mb-2 mr-sm-2"
            id="inlineFormInputName2"
            placeholder="search with order number/name/phone number"
            defaultValue={this.state.search}
            // onChange={this.handleChange}
            onChange={this.handleChange}
          />

          <Button type="submit" className="mb-2" onClick={this.handleSubmit}>
            Search
          </Button>
        </Form>
        {results ? (
          <div>
            <SearchResult results={results} />
          </div>
        ) : (
          <p>No order to show</p>
        )}
      </Container>
    );
  }
}

export default SearchOrder;
