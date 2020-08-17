import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import {
  addToCartURL,
  localhost,
  orderSummaryURL,
  orderItemUpdateQuantityURL
} from "../../../constants";
import Button from "react-bootstrap/Button";

class SideImageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }

  render() {
    const { product } = this.props;
    console.log(product);

    return (
      <div className="product-box2">
        <div className="media">
          <Link
            to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}
          >
            <img
              src={`${localhost}${product.product_image}`}
              className="img-fluid lazyload bg-img"
              alt=""
            />
          </Link>
          <div className="media-body align-self-center">
            <div>
              <h6>
                {product.title}
                <span className="money">[{product.title}]</span>
              </h6>

              <h6>
                [{product.quantity}]{" "}
                <span className="money">
                  {"Rs: "}
                  {product.price}
                </span>
              </h6>
              <h4>
                {/* <Button size="sm" variant="outline-primary">
                  buy
                </Button> */}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideImageItem;
