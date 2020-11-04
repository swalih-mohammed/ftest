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
import { Loader, ButtonLoader } from "../common/loader";

const GridRow = styled.div`
  grid-column-gap: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 5px;
  padding-top: 20px;
`;

const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const LoadMore = styled.div`
  background-color: #ff5722;
  color: #343a40 !important;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 20px;
  display: inline-block;
  &:hover {
    background-color: #fff;
    color: #ff5722 !important;
    text-decoration: none;
    border: #ff5722 0.5px solid;
  }
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
  /* position: absolute; */
  /* top: ${props => (props.middletheEelement ? "50%" : "")}; */
  text-shadow: rgba(black, 0.5) 0 10px 10px;
`;

class ProductList extends Component {
  render() {
    const {
      products,
      loading,
      ShopDetail,
      hasmore,
      middletheEelement
    } = this.props;
    // console.log(this.props.loadingProductsLoadMore);

    return (
      <>
        <>
          <CardTitle>Products</CardTitle>
          {/* <ButtonLoader /> */}

          <GridRow>
            {this.props.loadingProducts ? <Loader loading={true} /> : null}
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

          <LoadMoreWrap>
            {this.props.loadingProducts ? null : (
              <>
                {this.props.hasmore ? (
                  <>
                    {this.props.loadingProductsLoadMore ? (
                      <Loader loading={true} />
                    ) : (
                      <LoadMore onClick={this.props.fetchProducts}>
                        Load more
                      </LoadMore>
                    )}
                  </>
                ) : (
                  <LoadMore>No more products to show</LoadMore>
                )}
              </>
            )}
          </LoadMoreWrap>
        </>
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
