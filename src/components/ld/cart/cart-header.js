import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authAxios } from "../../../authAxios";
import { orderItemDeleteURL } from "../../../constants";
import { fetchCart } from "../../../actions/cart";
import "react-toastify/dist/ReactToastify.css";

class CartHeader extends Component {
  state = {
    loading: false
  };

  render() {
    const { item } = this.props;
    // console.log(item);
    // console.log(234);
    return (
      <li>
        {/* <ToastContainer /> */}
        <div className="media">
          {/* <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
            <img alt="" className="mr-3" src={`${item.pictures[0]}`} />
          </Link> */}
          <div className="media-body">
            <h4>
              <span>
                {item.quantity} x{" "}
                {item.itemLocalName ? item.itemLocalName : item.itemName} ={" "}
                {item.final_price}
              </span>
            </h4>
          </div>
        </div>
        {/* <span>{this.state.cart}</span> */}
        <div className="close-circle">
          <a href={null}>
            {/* <i className="fa fa-times" aria-hidden="true"></i> */}
            <i onClick={() => this.props.handleRemoveItemFromCart(item.id)}>
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
