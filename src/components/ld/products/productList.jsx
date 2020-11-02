import React, { Component } from "react";
// import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
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
import styled from "styled-components";
import { Loader, PageLoader } from "../common/loader";
import { Button, LoadMore, LoadMoreWrap } from "../styled/utils";
import Productcategory from "./productCategory";
import ProductCard from "./productCard";

const Wrapper = styled.div`
  margin: 100px 5px 20px 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
`;
const FORM = styled(Form)`
  font-size: 1.2em;
  font-weight: 300;
  border-radius: 5px;
  margin-top: 20px;
  padding-top: 1em;
  padding-bottom: 1em;
`;

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
    outOfStock: false,
    productLoadingMore: false
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

  fetchProducts = () => {
    this.setState({ productLoadingMore: true });
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
          productLoadingMore: false,
          products: [...this.state.products, ...newProducts],
          offset: offset + limit
        });
      })
      .catch(err => {
        this.setState({ error: err, productLoadingMore: false });
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
    const {
      products,
      categories,
      hasMore,
      loading,
      productLoadingMore
    } = this.state;
    console.log(loading);

    if (!this.props.token) {
      return <Redirect to="/login" />;
    }

    return (
      <Wrapper>
        {/* <Loader /> */}
        {loading ? <Loader /> : null}

        <Link to={`/add-shop-product`}>
          <Button>Add a product</Button>
        </Link>
        {categories.length > 1 ? (
          <Productcategory
            handleClearCategory={this.handleClearCategory}
            handleChangeCategory={this.handleChangeCategory}
            ShopProductCategory={categories}
            loading={this.state.loading}
          />
        ) : null}

        <FORM>
          <Form.Check
            onChange={this.handleOutofStock}
            checked={this.state.outOfStock}
            type="checkbox"
            label="Search only out of stock"
          />
        </FORM>
        <Card bg={"secondary"} text={"light"} style={{ marginBottom: "30px" }}>
          <Card.Header as="h4">
            <Row>
              <Col xs={4}>Product</Col>
              <Col xs={4}> Stock </Col>
              <Col xs={4}>Orders</Col>
            </Row>
          </Card.Header>
        </Card>
        {this.state.productLoadingMore ? <PageLoader /> : null}
        {products.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <ProductCard
                  item={item}
                  fetchProducts={this.fetchProducts}
                  hasMore={hasMore}
                  loading={this.state.loading}
                />
              </Col>
            </Row>
          );
        })}

        <LoadMoreWrap>
          {this.state.loading ? null : (
            <>
              {this.state.hasMore ? (
                <>
                  {this.state.productLoadingMore ? (
                    <Loader />
                  ) : (
                    <LoadMore onClick={this.fetchProducts}>Load more</LoadMore>
                  )}
                </>
              ) : (
                <LoadMore>No more products to show</LoadMore>
              )}
            </>
          )}
        </LoadMoreWrap>

        {/* {this.loading ? (
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
            )} */}
      </Wrapper>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.shoppingCart,
  user: state.user,
  token: state.auth.token
});

export default connect(mapStateToProps)(ProductList);
