import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { shopProductListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { Modal, Button, Container } from "react-bootstrap";

class ProductList extends Component {
  state = {
    products: [],
    show: false
  };

  componentDidMount() {
    this.handleSubmit();
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleSubmit = e => {
    // e.preventDefault();
    authAxios
      .get(shopProductListURL)
      .then(res => {
        this.setState({ products: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { products } = this.state;

    // console.log(cartItems);
    // console.log(this.state.products);
    return (
      <div>
        {/*SEO Support End */}

        {products ? (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <table className="table    ">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">Edit</th>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Discount</th>
                    </tr>
                  </thead>
                  {products.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <Link to={`edit-shop-product/${item.id}`}>
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </Link>

                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.title}</td>
                          <td>{item.title}</td>
                          <td>{item.title}</td>
                          <td>{item.title}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>No products</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.shoppingCart
});

export default connect(mapStateToProps)(ProductList);
