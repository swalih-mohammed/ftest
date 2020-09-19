import React, { Component } from "react";
// import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Breadcrumb from "../common/breadcrumb";
import {
  ShopProductCategoryURL,
  ShopProductInfinitURL
} from "../../../constants";
import { authAxios } from "../../../authAxios";
// import { Modal, Button, Container } from "react-bootstrap";
// import { faEdit, faSleigh } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
import { Form, Row, Col, Container, Card } from "react-bootstrap";

import Productcategory from "./productCategory";
import ProductCard from "./productCard";

class ProductList extends Component {
  state = {
    products: [],
    categories: [],
    show: false,
    loading: false,
    limit: 20,
    offset: 0,
    query: "all",
    hasMore: false,
    outOfStock: false
  };

  componentDidMount() {
    this.fetchProductCategory();
    this.fetchFreshProducts();
  }

  handleOutofStock = e => {
    this.setState({
      outOfStock: e.target.checked
    });
  };

  handleChangeCategory = cat => {
    // console.log(cat);
    this.setState({ offset: 0, query: cat, hasMore: true }, () => {
      this.fetchFreshProducts();
    });
  };

  handleClearCategory = () => {
    // window.scrollTo(0, 1300);
    this.setState({ offset: 0, query: "all", hasMore: true }, () => {
      this.fetchFreshProducts();
    });
  };

  fetchProducts = () => {
    this.setState({ loading: true });
    const { limit, offset, query, outOfStock } = this.state;
    const owner = this.props.user.user.id;
    authAxios
      .get(ShopProductInfinitURL, {
        params: {
          limit,
          offset,
          query,
          owner,
          outOfStock
        }
      })
      .then(res => {
        const newProducts = res.data.products;
        const hasMore = res.data.has_more;
        this.setState({
          hasMore: hasMore,
          loading: false,
          products: [...this.state.products, ...newProducts],
          offset: offset + limit
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchFreshProducts = () => {
    this.setState({ loading: true });
    const { limit, offset, query, outOfStock } = this.state;
    const owner = this.props.user.user.id;
    authAxios
      .get(ShopProductInfinitURL, {
        params: {
          limit,
          offset,
          query,
          owner,
          outOfStock
        }
      })
      .then(res => {
        this.setState({
          // products: res.data
          loading: false,
          hasMore: res.data.has_more,
          products: res.data.products,
          offset: offset + limit
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleClick = id => {
    this.props.history.push("/shop-product-detail");
  };

  fetchProductCategory = () => {
    // const ownerID = this.props.userID;
    const ownerID = this.props.user.user.id;
    // console.log(ownerID);
    this.setState({ loading: true });
    authAxios
      .get(ShopProductCategoryURL(ownerID))
      .then(res => {
        this.setState({ categories: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { products, categories, hasMore } = this.state;
    console.log(products);

    return (
      <div className="container">
        <Container>
          {/* <ToastContainer /> */}
          <div className="account-sidebar">
            <Link style={{ color: "#FFF" }} to={`/add-shop-product`}>
              Add a product
            </Link>
          </div>

          {this.state.loading && <div className="loading-cls"></div>}
          {categories.length > 1 ? (
            <Productcategory
              handleClearCategory={this.handleClearCategory}
              handleChangeCategory={this.handleChangeCategory}
              ShopProductCategory={categories}
            />
          ) : null}

          <Form>
            <div className="mb-3">
              <Form.Check
                onChange={this.handleOutofStock}
                checked={this.state.outOfStock}
                type="checkbox"
                label="Search only out of stock"
              />
            </div>
          </Form>
          {/* <Container> */}
          {products.length > 0 ? (
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <Card bg={"secondary"} text={"light"}>
                    <Card.Header as="h4">
                      <Row>
                        <Col xs={4}>Product</Col>
                        <Col xs={4}> Stock </Col>
                        <Col xs={4}>Orders</Col>
                      </Row>
                    </Card.Header>
                  </Card>
                </div>
              </div>
              <br></br>

              {products.map((item, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col-sm-12">
                      <ProductCard
                        item={item}
                        fetchProducts={this.fetchProducts}
                        hasMore={hasMore}
                      />
                    </div>
                  </div>
                );
              })}
              {this.loading ? (
                <div className="row">
                  <div className="loading-cls"></div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="row">
                    <Col>
                      {hasMore ? (
                        <p
                          onClick={this.fetchProducts}
                          className="seen-cls seen-it-cls"
                        >
                          <b>Load More</b>
                        </p>
                      ) : (
                        <p className="seen-cls seen-it-cls">
                          <b>No more products</b>
                        </p>
                      )}
                    </Col>
                  </div>
                </React.Fragment>
              )}
            </div>
          ) : (
            <div>No products</div>
          )}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.shoppingCart,
  user: state.user
});

export default connect(mapStateToProps)(ProductList);

// handleShow = () => {
//   this.setState({ show: true });
// };
// handleClose = () => {
//   this.setState({ show: false });
// };
