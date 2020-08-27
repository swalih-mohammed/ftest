import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authAxios } from "../../../authAxios";
import { orderItemDeleteURL } from "../../../constants";
import { fetchCart } from "../../../actions/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CartHeader extends Component {
  handleRemoveItemFromCart = id => {
    // console.log(id);
    // console.log("removing");
    // toast.error("Item removed from your cart");
    authAxios
      .delete(orderItemDeleteURL(id))
      .then(res => {
        this.refreshCart();
        // toast.error("Item removed from your cart");
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
  render() {
    const { item } = this.props;
    // console.log(item);
    // console.log(234);
    return (
      <li>
        {/* <ToastContainer /> */}
        <div className="media">
          <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
            {/* <img alt="" className="mr-3" src={`${item.pictures[0]}`} /> */}
          </Link>
          <div className="media-body">
            {/* <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}> */}
            <h4>{item.item.title}</h4>
            {/* </Link> */}
            <h4>
              <span>
                {item.quantity} x {item.item.price} = {item.final_price}
              </span>
            </h4>
          </div>
        </div>
        {/* <span>{this.state.cart}</span> */}
        <div className="close-circle">
          <a href={null}>
            {/* <i className="fa fa-times" aria-hidden="true"></i> */}
            <i onClick={() => this.handleRemoveItemFromCart(item.id)}>
              <FontAwesomeIcon icon={faTimes} color={"#ff4c3b"} />
            </i>
          </a>
        </div>
      </li>
    );
  }
}

// export default CartHeader;

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CartHeader);
