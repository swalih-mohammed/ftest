import React, { Component } from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { addToCartURL } from "../../../constants";
// import { authAxios } from "../../../authAxios";

import { fetchCart } from "../../../actions/cart";
import ProductListItem from "./product-list-item";
// import axios from "axios";
// import { ShopProductListURL } from "../../../constants";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <section className="collection section-b-spacee addtocart_count">
          <div className="container">
            <div className="title4">
              <h2 className="title-inner4">Products</h2>
              <div className="line">
                <span></span>
              </div>
            </div>
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <ProductListItem product={product} key={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
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
)(ProductList);
