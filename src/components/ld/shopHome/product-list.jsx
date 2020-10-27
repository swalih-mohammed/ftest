import React, { Component } from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Slider from "react-slick";
// import { addToCartURL } from "../../../constants";
// import { authAxios } from "../../../authAxios";

import { fetchCart } from "../../../actions/cart";
// import ProductListItem from "./product-list-item3";
import ProductItem from "./product-list-item";
// import { Product4, Product5 } from "../../../services/script";
// import InfiniteScroll from "react-infinite-scroll-component";
// import axios from "axios";
// import { ShopProductListURL } from "../../../constants";
import styled from "styled-components";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const GridRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* margin: 10px auto; */
  padding-top: 30px;
`;

const CardTitle = styled.h1`
  display: flex;
  justify-content: center;
  font-family: "Playfair Display";
  color: #333333;
  font-size: 30px;
  font-weight: 800;
  /* margin-bottom: 3rem; */
  margin-top: 3rem;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
`;

class ProductList extends Component {
  render() {
    const { products, loading, ShopDetail } = this.props;
    console.log(loading);

    return (
      <>
        <>
          <CardTitle>Products</CardTitle>
          <GridRow>
            {products.map(product => {
              const variations = product.variations;
              const defaultOption = product.variations[0];
              return (
                <ProductItem
                  product={product}
                  key={product.id}
                  variations={variations}
                  defaultOption={defaultOption}
                  loading={loading}
                  ShopDetail={ShopDetail}
                />
              );
            })}
          </GridRow>
        </>

        {this.props.loading ? (
          <>
            <ClipLoader
              css={override}
              size={50}
              color={"#123abc"}
              loading={this.props.loading}
            />
          </>
        ) : (
          <>
            {this.props.hasmore ? (
              <p onClick={this.props.fetchProducts}>
                <b>Load More</b>
              </p>
            ) : (
              <p>
                <b>No more products</b>
              </p>
            )}
          </>
        )}
      </>
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
