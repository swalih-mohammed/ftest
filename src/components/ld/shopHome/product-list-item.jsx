import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Modal from "react-responsive-modal";
import Select from "react-select";
// import { Img } from "react-image";
import { addToCartURL, localhost } from "../../../constants";
import { fetchCart, clearKart } from "../../../actions/cart";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
// import { Row } from "react-bootstrap";
// import { LabelFour } from "../styled/productBox";

const ProductCard = styled.div`
  display: flex;
  border: 1px solid transparent;
  background-color: #f8f9fa;
  /* max-width: 325px; */
  width: 350;
  height: 200px;
  margin: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  padding: 0px 25px;
`;

const ProductImgContainer = styled.div`
  flex: 1;
  height: 200px;
  width: 200px;
  overflow: hidden;
  display: flex;
  align-content: center;
`;
const ProductImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;
const ProductContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px 20px;
  width: 50%;
`;

const ProductTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #343a40;
`;
const PriceWrap = styled.div`
  display: flex;
`;
const MRP = styled.h2`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #343a40;
  padding-right: 10px;
`;

const Mybutton = styled.button`
  margin-top: 10px;
  width: auto;
  border: 1px solid #ff5722;
  background: #fff;
  padding: 7px 14px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  &:hover {
    width: auto;
    background: #ff5722;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
  }
`;
const SelectWrap = styled.div`
  padding: 5px 2px;
`;

class ProductStyleNine extends Component {
  state = {
    isAdding: false,
    selectedVariationID: "",
    selectedVariationName: "",
    selectedVariationMRP: "",
    selectedVariationPrice: ""
  };
  componentDidMount() {
    this.setDefaultVariation();
  }

  setDefaultVariation = () => {
    if (this.props.variations) {
      let firstValue = this.props.variations[0];
      if (typeof firstValue !== "undefined") {
        let name = this.props.variations[0].name;
        let id = this.props.variations[0].id;
        let mrp = this.props.variations[0].price;
        let price = this.props.variations[0].discount_price;
        this.setState({
          selectedVariationName: name,
          selectedVariationID: id,
          selectedVariationMRP: mrp,
          selectedVariationPrice: price
        });
      }
    }
  };

  handleAddToCart = (id, shop, variation) => {
    if (this.props.token !== null) {
      this.setState({ isAdding: true });
      authAxios
        .post(addToCartURL, { id, shop, variation })
        .then(res => {
          toast.success("item added to cart");
          this.props.refreshCart();
          this.setState({ isAdding: false });
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 401) {
              this.setState({ isAdding: false });
              toast.error("please login or refresh");
            } else if (err.response.data) {
              const error = err.response.data.message;
              this.setState({ isAdding: false });
              toast.error(error);
            } else {
              this.setState({ isAdding: false });
              toast.error("Oops there was an error");
            }
          }
        });
    } else {
      this.setState({ isAdding: false });
      toast.error("Please login or refresh");
    }
  };

  handleChangeVariation(value) {
    // console.log(value);
    this.setState({
      selectedVariationID: value.id,
      selectedVariationName: value.name,
      selectedVariationMRP: value.price,
      selectedVariationPrice: value.discount_price
    });
  }

  render() {
    const {
      product,
      variations,
      defaultOption,
      loading,
      ShopDetail
    } = this.props;
    const { isAdding } = this.state;
    // console.log(loading);

    return (
      <>
        <ProductCard>
          <ProductImgContainer>
            {/* <p style={{ display: "flex" }}> out of stock</p> */}
            <ProductImg
              src={`${localhost}${product.product_image}`}
            ></ProductImg>
          </ProductImgContainer>
          <ProductContent>
            {ShopDetail != undefined ? (
              <>
                {ShopDetail.preferred_language === "Malayalam" ? (
                  <ProductTitle>{product.title}</ProductTitle>
                ) : (
                  <ProductTitle>{product.title}</ProductTitle>
                )}
              </>
            ) : null}

            <PriceWrap>
              <MRP>Rs: {this.state.selectedVariationPrice}</MRP>
              <del>
                <MRP>{this.state.selectedVariationMRP}</MRP>
              </del>
            </PriceWrap>
            <SelectWrap>
              {defaultOption ? (
                <>
                  {defaultOption.name && (
                    <Select
                      options={variations}
                      getOptionLabel={option => `${option.name}`}
                      value={variations.filter(
                        ({ name }) => name === this.state.selectedVariationName
                      )}
                      onChange={value => this.handleChangeVariation(value)}
                      isSearchable={false}
                    />
                  )}
                </>
              ) : null}
            </SelectWrap>

            {product.variations.length > 0 ? (
              <React.Fragment>
                <div className="cart-bottom">
                  {product.do_not_disply_when_not_available ? (
                    <Mybutton
                      disabled={isAdding}
                      title="Add to cart"
                      onClick={() =>
                        this.handleAddToCart(
                          product.id,
                          product.shop,
                          this.state.selectedVariationID
                        )
                      }
                    >
                      Add to cart
                    </Mybutton>
                  ) : null}
                </div>
              </React.Fragment>
            ) : null}
          </ProductContent>
        </ProductCard>
      </>
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
)(ProductStyleNine);
