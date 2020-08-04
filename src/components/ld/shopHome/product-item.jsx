import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import { authAxios } from "../../../authAxios";
import { addToCartURL } from "../../../constants";
import { connect } from "react-redux";
import { fetchCart } from "../../../actions/cart";

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openQuantity: false,
      stock: "InStock",
      quantity: 1,
      image: ""
    };
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
      this.props.onDecrementClicked();
    } else {
      console.log("removefromcart");
      this.setState({ openQuantity: false });
      this.props.onRemoveFromCart();
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
      this.props.onIncrementClicked();
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };
  updateQty = e => {
    if (this.props.product.stock >= parseInt(e.target.value)) {
      this.setState({ quantity: parseInt(e.target.value) });
      this.props.onAddToCartClicked();
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };

  plusQty2 = (id, shop) => {
    // this.setState({ openQuantity: true });
    console.log("plus qnt");
    this.setState({ quantity: this.state.quantity + 1 });
    this.handleAddToCart2(id, shop);
    this.props.refreshCart();
  };

  minusQty2 = id => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    } else {
      this.setState({ openQuantity: false });
    }

    console.log("minus qnt");

    // this.handleAddToCart2(id, shop);
  };

  openQuantity = (id, shop) => {
    this.setState({ openQuantity: true });
    this.handleAddToCart2(id, shop);
  };

  handleAddToCart2 = (id, shop) => {
    console.log("addtocart");
    this.setState({ loading: true });

    authAxios
      .post(addToCartURL, { id, shop })
      .then(res => {
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const {
      product,
      symbol,
      // onAddToCartClicked,
      onAddToWishlistClicked,
      onAddToCompareClicked
      // handleAddToCart
    } = this.props;

    let RatingStars = [];
    for (var i = 0; i < product.rating; i++) {
      RatingStars.push(<i className="fa fa-star" key={i}></i>);
    }
    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="lable-block">
            {product.is_available == !true ? (
              <span className="lable3">Out of Stock</span>
            ) : (
              ""
            )}
            {product.is_on_sale == true ? (
              <span className="lable4">Sale</span>
            ) : (
              ""
            )}
          </div>
          <div className="front">
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            >
              <img
                src={product.image}
                className="img-fluid lazyload bg-img"
                alt=""
              />
            </Link>
          </div>

          <div className="addtocart_btn">
            <button
              className="add-button add_cart"
              title="Add to cart"
              // onClick={this.openQuantity}
              //   onClick={() => this.handleAddToCart2(product.id, product.shop)}
              onClick={() => this.openQuantity(product.id, product.shop)}
            >
              add to cart
            </button>
            <div
              className={`qty-box cart_qty ${
                this.state.openQuantity ? "open" : ""
              }`}
            >
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    // onClick={this.minusQty}
                    onClick={() => this.minusQty2(product.id)}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                </span>
                <input
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.changeQty}
                  onBlur={this.updateQty}
                  className="form-control input-number"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    // onClick={this.plusQty}
                    onClick={() => this.plusQty2(product.id, product.shop)}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          {/* {this.state.stock != "InStock" ? <span>Out Of Stock</span> : ""} */}
        </div>
        <div className="product-detail text-center">
          <div>
            <div className="rating">{RatingStars}</div>
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
            >
              <h6>{product.title}</h6>
            </Link>
            <h4>
              {symbol}
              {product.price - (product.price * product.discount) / 100}
              <del>
                <span className="money">
                  {symbol}
                  {product.final_price}
                </span>
              </del>
            </h4>
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
)(ProductItem);
