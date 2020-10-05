import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Modal from "react-responsive-modal";
import Select from "react-select";

import { addToCartURL, localhost } from "../../../constants";
import { fetchCart, clearKart } from "../../../actions/cart";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductStyleEleven extends Component {
  state = {
    loading: false,
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
    console.log(value);
    this.setState({
      selectedVariationID: value.id,
      selectedVariationName: value.name,
      selectedVariationMRP: value.price,
      selectedVariationPrice: value.discount_price
    });
  }

  render() {
    const { product, variations, defaultOption } = this.props;
    // console.log(product);

    return (
      <div className="product-box">
        {this.state.loading && <div className="loading-cls"></div>}
        <div className="img-wrapper">
          <div className="lable-block">
            {product.is_featured == true && product.is_available ? (
              <span className="lable3">new</span>
            ) : (
              ""
            )}
            {product.is_on_sale == true && product.is_available ? (
              <span className="lable3">sale</span>
            ) : (
              ""
            )}
            {product.is_available !== true ? (
              <span className="lable4">Out of stock</span>
            ) : (
              ""
            )}
          </div>
          <div className="front">
            <img
              src={`${localhost}${product.product_image}`}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="cart-info cart-wrap">
            {product.is_available ? (
              <button
                title="Add to cart"
                onClick={() =>
                  this.handleAddToCart(
                    product.id,
                    product.shop,
                    this.state.selectedVariationID
                  )
                }
              >
                <i>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    size={"lg"}
                    color={"#ff4c3b"}
                  />
                </i>
              </button>
            ) : null}
          </div>
        </div>
        <div className="product-detail">
          <div>
            <div className="rating">{""}</div>

            {product.title_local ? (
              <h6>{product.title_local}</h6>
            ) : (
              <h6>{product.title}</h6>
            )}

            <h4>
              {"Rs: "} {this.state.selectedVariationMRP}{" "}
              <del>
                <span className="money">
                  {"  MRP "}
                  {this.state.selectedVariationMRP}
                </span>
              </del>
            </h4>
            <br />
            {defaultOption ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : null}
          </div>
        </div>
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
)(ProductStyleEleven);

// export default ProductStyleEleven;
