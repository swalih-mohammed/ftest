import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "../../common/index.scss";
// import Slider from "react-slick";
import Jumbotron from "react-bootstrap/Jumbotron";
import Offer from "./offer";
// import { Link } from "react-router-dom";
import axios from "axios";
import { fetchCart } from "../../../actions/cart";
// import Image from "react-bootstrap/Image";
// import InfiniteScroll from "react-infinite-scroll-component";

import Shipping from "./shipping";
import Trending from "./trending";
import ProductList from "./product-list";
import ShopImage from "./shopImage";
import Productcategory from "../products/productCategory";
// import ProductList from "./product-test";

import {
  ShopProductListInfinitURL,
  ShopFProductListURL,
  ShopDetailURL,
  ShopProductCategoryForCustomerURL
} from "../../../constants";

class Shop extends Component {
  state = {
    loading: false,
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
    document.getElementById("color").setAttribute("href", `#`);
    this.fetchProducts();
    this.fetchfeaturedProducts();
    this.fetchShopDetails();
    this.fetchProductCategory();
    // this.props.refreshCart();
  }

  handleChangeCategory = cat => {
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
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
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
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    const { limit, offset, query } = this.state;
    const shopID = params.shopID;
    axios
      .get(
        ShopProductListInfinitURL +
          `?limit=${limit}&offset=${offset}&query=${query}&shopID=${shopID}`
      )
      .then(res => {
        this.setState({
          data: res.data,
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

  fetchShopDetails = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(ShopDetailURL(params.shopID))
      .then(res => {
        this.setState({ ShopDetail: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
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
      products,
      featuredProducts,
      ShopDetail,
      ShopProductCategory,
      filteredProduct,
      hasMore,
      data
    } = this.state;

    // console.log(featuredProducts);
    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>

        {this.state.loading && <div className="loading-cls"></div>}

        <section className="ratio_asos metro-section portfolio-section ">
          {ShopDetail && <ShopImage ShopDetail={ShopDetail} />}
        </section>

        {ShopDetail && (
          <div>
            {ShopDetail.is_active ? (
              <div>
                {ShopDetail.is_accepting_orders ? (
                  <div>
                    {/* <Shipping /> */}
                    {ShopDetail && (
                      <div>
                        {ShopDetail.shipping_message !== "" ? (
                          <Shipping message={ShopDetail.shipping_message} />
                        ) : null}
                        {ShopDetail.offer_message !== "" ? (
                          <Offer message={ShopDetail.offer_message} />
                        ) : null}
                      </div>
                    )}
                    {featuredProducts.length > 0 ? (
                      <Trending
                        fProducts={featuredProducts}
                        loading={this.state.loading}
                      />
                    ) : null}
                    {ShopProductCategory.length > 1 ? (
                      <Productcategory
                        handleClearCategory={this.handleClearCategory}
                        handleChangeCategory={this.handleChangeCategory}
                        ShopProductCategory={ShopProductCategory}
                      />
                    ) : null}
                    {/* <Search /> */}
                    {products && (
                      <ProductList
                        loading={this.state.loading}
                        fetchProducts={this.fetchProducts}
                        hasmore={this.state.hasMore}
                        products={products}
                        SelectedCategory={this.state.SelectedCategory}
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
            ) : (
              <Jumbotron>
                <h4>This shop is currently not active</h4>
                <p>please check back later</p>
              </Jumbotron>
            )}
          </div>
        )}
      </div>
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
