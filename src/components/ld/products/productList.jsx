import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { shopProductListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { Modal, Button, Container } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProductList extends Component {
  state = {
    products: [],
    show: false,
    loading: false
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
    this.setState({ loading: true });
    const userID = this.props.userID;
    authAxios
      .get(shopProductListURL, {
        userID: userID
      })
      .then(res => {
        this.setState({ products: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleClick = id => {
    this.props.history.push("/edit-shop-product");
  };

  render() {
    const { products } = this.state;
    console.log(this.props.userID);
    // console.log(this.state.products);
    return (
      <div>
        {/*SEO Support End */}
        {this.state.loading && <div className="loading-cls"></div>}

        {products ? (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <table className="table    ">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">Edit</th>
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      {/* <th scope="col">Discount</th> */}
                    </tr>
                  </thead>
                  {products.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          {/* <td>{item.id}</td> */}
                          <td>
                            <React.Fragment>
                              <Link to={`edit-shop-product/${item.id}`}>
                                <i>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    size={"2x"}
                                    color={"#ff4c3b"}
                                    onClick={this.handleClick}
                                  />
                                </i>
                              </Link>
                            </React.Fragment>
                          </td>
                          <td>{item.title}</td>
                          <td>{item.title_local}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          {/* <td>{item.discount}</td> */}
                          {/* <td>{item.title}</td> */}
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
  cartItems: state.cart.shoppingCart,
  userID: state.user.user.userID
});

export default connect(mapStateToProps)(ProductList);
