import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Card, Button, Col, Container, Row } from "react-bootstrap";

class ProductCard extends Component {
  state = {
    display: false
  };
  handleViewVariationDisply = () => {
    this.setState({ display: !this.state.display });
  };
  render() {
    const { item } = this.props;
    // console.log(123);

    return (
      <div>
        <Card
          border={item.v_availability ? "success" : "danger"}
          // style={{ width: "20rem" }}
          onClick={() => {
            this.handleViewVariationDisply();
          }}
        >
          <Card.Header>
            <Row>
              <Col xs={6}>
                {item.title_local ? item.title_local : item.title}
              </Col>
              <Col xs={3}>{item.stock_count} </Col>
              <Col xs={3}>{item.item_in_order}</Col>
            </Row>
          </Card.Header>
          <ListGroup
            style={{ display: this.state.display ? "" : "none" }}
            variant="flush"
          >
            {item.variations.map((item, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  variant={item.stock_count > 0 ? "success" : "danger"}
                >
                  <Row>
                    <Col xs={6}>{item.name} </Col>
                    <Col xs={3}>
                      {item.stock_count > 0 ? item.stock_count : "Out of stock"}
                    </Col>
                    <Col xs={3}>{item.check_in_order}</Col>
                  </Row>
                  {/* {item.name} Stock: */}
                  {/* {item.stock_count > 0 ? item.stock_count : "Out of stock"} */}
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item>
              {/* <Card.Link
                to={`${process.env.PUBLIC_URL}/shop-product-detail/${item.id}`}
              >
                View More
              </Card.Link> */}
              <Link
                to={`${process.env.PUBLIC_URL}/shop-product-detail/${item.id}`}
              >
                <Button variant="outline-primary" size="sm">
                  View More
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <br></br>
      </div>
    );
  }
}

export default ProductCard;
