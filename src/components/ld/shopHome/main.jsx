import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "../../common/index.scss";
import Jumbotron from "react-bootstrap/Jumbotron";
import Offer from "./offer";
import axios from "axios";
import { fetchCart } from "../../../actions/cart";
import Shipping from "./shipping";
import Trending from "./trending";
import ProductList from "./product-list";
// import ShopImage from "./shopImage";
import Productcategory from "../products/productCategory";
import { CardInfo, CardTitle, StyledCover } from "../styled/jumbotron";
import { PageLoader } from "../common/loader";
import { Container } from "../styled/utils";

import {
  ShopProductListInfinitURL,
  ShopFProductListURL,
  ShopDetailURL,
  ShopProductCategoryForCustomerURL
} from "../../../constants";

class Shop extends Component {
  state = {
    loading: false,
    loadingShopDetails: false,
    loadingProducts: false,
    loadingProductsLoadMore: false,
    loadingProducts: false,
    error: null,
    products: [],
    featuredProducts: [],
    ShopDetail: null,
    ShopProductCategory: [],
    SelectedCategory: "all",
    filteredProduct: [],
    offset: 0,
    limit: 20,
    query: "all",
    hasMore: true,
    data: []
  };

  componentDidMount() {
    // document.getElementById("color").setAttribute("href", `#`);
    this.fetchShopDetails();
    this.fetchProductCategory();
    this.fetchProducts();
    // this.fetchFreshProducts();
    // this.fetchfeaturedProducts();

    // this.props.refreshCart();
  }

  handleChangeCategory = cat => {
    this.setState({ offset: 0, query: cat, hasMore: true }, () => {
      this.fetchProducts();
    });
  };

  handleClearCategory = () => {
    // window.scrollTo(0, 1300);
    this.setState({ offset: 0, query: "all", hasMore: true }, () => {
      this.fetchProducts();
    });
  };

  fetchProducts = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loadingProducts: true });
    const { limit, offset, query } = this.state;
    const shopID = params.shopID;
    if (limit != null && offset != null && query != null) {
      console.log(limit, offset, query);
      axios
        .get(
          ShopProductListInfinitURL +
            `?limit=${limit}&offset=${offset}&query=${query}&shopID=${shopID}`
        )
        .then(res => {
          this.setState({
            data: res.data,
            loadingProducts: false,
            hasMore: res.data.has_more,
            products: res.data.products,
            offset: offset + limit
          });
        })
        .catch(err => {
          this.setState({ error: err, loadingProducts: false });
        });
    }
  };

  fetchMore = () => {
    // console.log("test");
    const {
      match: { params }
    } = this.props;
    this.setState({ loadingProductsLoadMore: true });
    // console.log(this.state.loading);
    const { limit, offset, query } = this.state;
    const shopID = params.shopID;
    // console.log(offset);
    axios
      .get(
        ShopProductListInfinitURL +
          `?limit=${limit}&offset=${offset}&query=${query}&shopID=${shopID}`
      )
      .then(res => {
        const newProducts = res.data.products;
        const hasMore = res.data.has_more;
        this.setState({
          hasMore: hasMore,
          loadingProductsLoadMore: false,
          products: [...this.state.products, ...newProducts],
          offset: offset + limit
        });
      })
      .catch(err => {
        this.setState({ error: err, loadingProductsLoadMore: false });
      });
  };

  fetchShopDetails = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loadingShopDetails: true });
    axios
      .get(ShopDetailURL(params.shopID))
      .then(res => {
        this.setState({ ShopDetail: res.data, loadingShopDetails: false });
      })
      .catch(err => {
        this.setState({ error: err, loadingShopDetails: false });
      });
  };

  fetchProductCategory = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });

    axios
      .get(ShopProductCategoryForCustomerURL(params.shopID))
      .then(res => {
        this.setState({ ShopProductCategory: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  fetchfeaturedProducts = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(ShopFProductListURL(params.shopID))
      .then(res => {
        this.setState({ featuredProducts: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const {
      loading,
      products,
      featuredProducts,
      ShopDetail,
      ShopProductCategory,
      filteredProduct,
      hasMore,
      data,
      SelectedCategory
    } = this.state;

    // console.log(this.state.loadingProductsLoadMore);
    // console.log("test main");

    return (
      <Container>
        {/* {this.state.loading ? <Loader loading={loading} /> : null} */}
        {ShopDetail && (
          <div>
            {this.state.loadingShopDetails ? (
              <PageLoader loading={loading} />
            ) : (
              <StyledCover imgurl={ShopDetail.image}>
                <CardInfo>
                  <CardTitle>{ShopDetail.name}</CardTitle>
                </CardInfo>
              </StyledCover>
            )}

            <div>
              {ShopDetail.is_accepting_orders ? (
                <div>
                  {/* <Shipping /> */}
                  {/* {ShopDetail && (
                    <div>
                      {ShopDetail.shipping_message !== "" ? (
                        <Shipping message={ShopDetail.shipping_message} />
                      ) : null}
                      {ShopDetail.offer_message !== "" ? (
                        <Offer message={ShopDetail.offer_message} />
                      ) : null}
                    </div>
                  )} */}
                  {/* {featuredProducts.length > 0 ? (
                    <Trending
                      fProducts={featuredProducts}
                      loading={this.state.loading}
                      ShopDetail={ShopDetail}
                    />
                  ) : null} */}
                  {ShopProductCategory.length > 1 ? (
                    <Productcategory
                      handleClearCategory={this.handleClearCategory}
                      handleChangeCategory={this.handleChangeCategory}
                      ShopProductCategory={ShopProductCategory}
                      ShopDetail={ShopDetail}
                    />
                  ) : null}
                  {/* <Search /> */}
                  {products && (
                    <ProductList
                      loading={loading}
                      loadingProducts={this.state.loadingProducts}
                      loadingProductsLoadMore={
                        this.state.loadingProductsLoadMore
                      }
                      hasmore={hasMore}
                      products={products}
                      fetchProducts={this.fetchMore}
                      SelectedCategory={SelectedCategory}
                      ShopDetail={ShopDetail}
                    />
                  )}
                </div>
              ) : (
                <Jumbotron>
                  <h4>We are not accepting orders now</h4>
                  <p>please check back later</p>
                </Jumbotron>
              )}
            </div>
          </div>
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Shop);
