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
// import axios from "axios";
// import { ShopProductListURL } from "../../../constants";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    // console.log(products);

    return (
      <div>
        <section className="ratio_asos absolute-product section-b-space">
          {/* <div className="title2">
            <h2 className="title-inner2">products</h2>
          </div> */}
          <div className="title4">
            <h2 className="title-inner4">Products</h2>
            <div className="line">
              <span></span>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                {/* <Slider {...Product5} className="product-5 product-m no-arrow"> */}
                <div className="no-slider row">
                  {/* {this.props.SelectedCategory === "all" ? ( */}

                  {products.map((product, index) => (
                    // <div className="col-xl-3 col-md-6 col-grid-box">
                    <ProductStyleNine product={product} key={index} />
                    // </div>
                  ))}
                </div>
                {/* </Slider> */}
              </div>
            </div>
          </div>
        </section>
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
