import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ShopFProductListURL } from "../../../constants";
import { getTopCollection, getTrendingCollection } from "../../../services";
import { Product4 } from "../../../services/script";
import ProductStyleNine from "./product-nine";
import ProductStyleTwo from "./ProductStyleTwo";

// import {
//   addToCart,
//   addToWishlist,
//   addToCompare,
//   incrementQty,
//   decrementQty,
//   removeFromCart
// } from "../../../actions";
import ProductItem from "./product-item";

class Tranding extends Component {
  state = {
    loading: false,
    error: null,
    featuredProducts: []
  };

  render() {
    const { fProducts } = this.props;
    return (
      <div>
        <section className="section-b-space addtocart_count ratio_square">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title4">
                  <h2 className="title-inner4">Feautred Products</h2>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <Slider {...Product4} className="product-4 product-m no-arrow">
                  {fProducts.map((product, index) => (
                    <div key={index}>
                      {/* <ProductItem product={product} key={index} /> */}
                      {/* <ProductStyleNine product={product} key={index} /> */}
                      <ProductStyleTwo product={product} key={index} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Tranding;
