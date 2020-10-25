import React, { Component } from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
// import { addToCartURL } from "../../../constants";
// import { authAxios } from "../../../authAxios";

import { fetchCart } from "../../../actions/cart";
import ProductListItem from "./product-list-item";
import ProductStyleNine from "./product-nine";
import { Product4, Product5 } from "../../../services/script";
import InfiniteScroll from "react-infinite-scroll-component";
// import axios from "axios";
// import { ShopProductListURL } from "../../../constants";

class ProductList extends Component {
  render() {
    const { products, loading, ShopDetail } = this.props;
    // console.log(products);

    return (
      <div>
        {loading && <div className="loading-cls"></div>}
        {/* <section className="ratio_asos absolute-product section-b-space"> */}
        {/* <div className="container"> */}
        {/* <div className="row"> */}
        {/* <div className="col"> */}
        {/* <div className="no-slider row"> */}
        {products.map(product => {
          const variations = product.variations;
          const defaultOption = product.variations[0];

          return (
            <ProductStyleNine
              product={product}
              key={product.id}
              variations={variations}
              defaultOption={defaultOption}
              loading={loading}
              ShopDetail={ShopDetail}
            />
          );
        })}
        {/* </div> */}

        {this.props.loading ? (
          <div className="loading-cls"></div>
        ) : (
          <React.Fragment>
            {" "}
            {this.props.hasmore ? (
              <p
                onClick={this.props.fetchProducts}
                className="seen-cls seen-it-cls"
              >
                <b>Load More</b>
              </p>
            ) : (
              <p className="seen-cls seen-it-cls">
                <b>No more products</b>
              </p>
            )}
          </React.Fragment>
        )}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </section> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.shoppingCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
