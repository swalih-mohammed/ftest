import React, { Component } from "react";
import { connect } from "react-redux";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import {
  addToCartURL,
  orderItemUpdateQuantityURL,
  orderItemDeleteURL
} from "../../../constants";
import { fetchCart, clearKart } from "../../../actions/cart";
import { authAxios } from "../../../authAxios";

class AddtoCartButton extends Component {
  handleAddToCart = (id, shop) => {
    console.log(id, shop);
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { id, shop })
      .then(res => {
        // this.handleFetchOrder();
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        toast.error("Oops there was an error");
      });
  };

  handleRemoveQuantityFromCart = id => {
    console.log(id);
    authAxios
      .post(orderItemUpdateQuantityURL, { id })
      .then(res => {
        // this.handleFetchOrder();
        this.props.refreshCart();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleRemoveItemFromCart = id => {
    authAxios
      .delete(orderItemDeleteURL(id))
      .then(res => {
        this.props.refreshCart();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const {
      product,
      shop,
      open,
      quantity,
      item,
      item2,
      orderItemCount
    } = this.props;
    // console.log(this.props);
    return (
      <React.Fragment>
        <div className="addtocart_btn">
          <button
            className="add-button add_cart"
            title="Add to cart"
            onClick={this.props.addToCart(product.id, shop)}
          >
            add to cart
          </button>
          <div className={`qty-box cart_qty ${this.props.open ? "open" : ""}`}>
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  // onClick={() => this.minusQty2(product.id)}
                  onClick={() => this.handleRemoveQuantityFromCart(item.id)}
                  data-type="minus"
                  data-field=""
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={"lg"}
                    color={"#ff4c3b"}
                  />
                </button>
              </span>
              <input
                type="number"
                name="quantity"
                value={quantity}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  // onClick={() => this.plusQty2(product.id, product.shop)}
                  // onClick={() => this.handleAddToCart(product, shop)}
                  onClick={this.props.handleAddToCart}
                  data-type="plus"
                  data-field=""
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={"lg"}
                    color={"#ff4c3b"}
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
    //   clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddtoCartButton);
