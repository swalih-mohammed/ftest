import React, { Component } from "react";
import { Link } from "react-router-dom";

// const CartHeader = ({ item }) => (
class CartHeader extends Component {
  render() {
    const { item } = this.props;
    console.log(item);
    console.log(234);
    return (
      <li>
        <div className="media">
          <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
            <img alt="" className="mr-3" src={`${item.pictures[0]}`} />
          </Link>
          <div className="media-body">
            <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
              <h4>{item.item.title}</h4>
            </Link>
            <h4>
              <span>
                {item.quantity} x {item.final_price}
              </span>
            </h4>
          </div>
        </div>
        {/*<span>{cart}</span>*/}
        <div className="close-circle">
          <a href={null}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
        </div>
      </li>
    );
  }
}

export default CartHeader;
