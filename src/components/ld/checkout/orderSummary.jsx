import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cartItems } = this.props;
    // console.log(cartItems);
    // console.log("order sum");
    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>Local Dukans | Order Summary</title>
          <meta
            name="description"
            content="Local dukans: Buy local Grow Gloabl"
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Order SUmmary"} />

        {cartItems.order_items.length > 0 ? (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table cart-table table-responsive-xs">
                    <thead>
                      <tr className="table-head">
                        {/* <th scope="col">image</th> */}
                        <th scope="col">product name</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        {/* <th scope="col">action</th> */}
                        <th scope="col">total</th>
                      </tr>
                    </thead>
                    {cartItems.order_items.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>
                              <Link
                                to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`}
                              >
                                <img
                                //   src={
                                //     item.variants
                                //       ? item.variants[0].images
                                //       : item.pictures[0]
                                //   }
                                //   alt=""
                                />
                                {item.item.title}
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`${process.env.PUBLIC_URL}/left-sidebar/product/${item.id}`}
                              >
                                {item.item.title}
                              </Link>
                              <div className="mobile-cart-content row">
                                <div className="col-xs-4">
                                  <h2 className="td-color">
                                    {/* {symbol} */}
                                    {/* {item.item.title} */}
                                  </h2>
                                </div>
                                <div className="col-xs-3">
                                  <div className="qty-box">
                                    <div className="input-group">
                                      <span className="input-group-prepend">
                                        <button
                                          type="button"
                                          className="btn quantity-left-minus"
                                          // onClick={this.minusQty}
                                          data-type="minus"
                                          data-field=""
                                        >
                                          <i className="fa fa-angle-left"></i>
                                        </button>
                                      </span>
                                      <input
                                        type="text"
                                        name="quantity"
                                        value={item.quantity}
                                        onChange={this.changeQty}
                                        className="form-control input-number"
                                      />
                                      <span className="input-group-prepend">
                                        <button
                                          type="button"
                                          className="btn quantity-right-plus"
                                          onClick={this.plusQty}
                                          data-type="plus"
                                          data-field=""
                                        >
                                          <i className="fa fa-angle-right"></i>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xs-3">
                                  <h2 className="td-color">
                                    {/* {symbol} */}
                                    {item.final_price}
                                  </h2>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h2>
                                {/* {symbol} */}
                                {/* {item.price -
                                  (item.price * item.discount) / 100} */}
                              </h2>
                            </td>
                            <td>
                              {item.qty >= item.stock ? "out of Stock" : ""}
                            </td>
                            <td></td>
                            <td>
                              <h2 className="td-color">{item.total}</h2>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <table className="table cart-table table-responsive-md">
                    <tfoot>
                      <tr>
                        <td>total price :</td>
                        <td>
                          <h2>{cartItems.total}</h2>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="row cart-buttons">
                <div className="col-6">
                  <Link
                    to={`${process.env.PUBLIC_URL}/shops/${cartItems.order_items[0].item.shop}`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to={`${process.env.PUBLIC_URL}/checkout`}
                    className="btn btn-solid"
                  >
                    check out
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`}
                        className="img-fluid mb-4"
                        alt=""
                      />
                      <h3>
                        <strong>Your Cart is Empty</strong>
                      </h3>
                      <h4>Explore more shortlist some items.</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.shoppingCart
});

export default connect(mapStateToProps)(OrderSummary);
