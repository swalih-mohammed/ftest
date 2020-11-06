import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
// import { Table, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import {
  orderSummaryURL,
  addToCartURL,
  orderItemUpdateQuantityURL,
  localhost,
  orderItemDeleteURL,
  orderDeleteURL
} from "../../../constants";
import { fetchCart, clearKart } from "../../../actions/cart";
import { authAxios } from "../../../authAxios";
import {
  faMinus,
  faPlus,
  faTrashAlt,
  faAngleRight,
  faAngleLeft,
  faTimes,
  faEquals
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Container } from "../styled/utils";
import { ButtonLoader, Loader, PageLoader } from "../common/loader";

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 150px;
  background-color: #ffff;
  border-bottom: #0a0a0a 0.5px solid;
  margin: 2px auto;
  padding: 15px 2px;
`;

const ProductImgContainer = styled.div`
  flex: 1;
  height: 150px;
  width: auto;
  overflow: hidden;
  display: flex;
  align-content: center;
`;
const ProductImg = styled.img`
  padding: 25px;
  width: 100%;
  /* height: auto; */
  object-fit: contain;
`;
const ProductContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* padding: 100px 10px; */
  width: 60%;
`;

const ProductTitle = styled.h2`
  display: flex;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #343a40;
`;
const ProductSecondTitle = styled.h2`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #343a40;
`;
const PriceWrap = styled.div`
  display: flex;
`;
const MRP = styled.h2`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #343a40;
  padding-right: 10px;
`;

const QuantityBoxWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

const QuantityBoxItem = styled.div`
  padding: 2px 10px;
  /* margin: 2px 5px; */
  border: #ff5722 0.5px solid;
`;

const QuantityBox = styled.input`
  display: flex;
  text-align: center;
  width: 40px;
  height: 100%;
  padding: 1px;
  border: #ff5722 0.5px solid;
`;

class OrderSummary extends Component {
  state = {
    // cartItems: null,
    quantity: 1,
    error: null,
    loading: false,
    isAdding: false
  };

  componentDidMount() {
    // this.handleFetchOrder();
    this.props.refreshCart();
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        this.setState({ cartItems: res.data, loading: false });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: "You currently do not have an order",
            loading: false
          });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  handleAddToCart = (id, shop, variation) => {
    // console.log(id, shop, variation);
    this.setState({ isAdding: true });
    authAxios
      .post(addToCartURL, { id, shop, variation })
      .then(res => {
        // this.handleFetchOrder();
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
  };

  handleRemoveQuantityFromCart = (id, q) => {
    this.setState({ isAdding: true });
    authAxios
      .post(orderItemUpdateQuantityURL, { id })
      .then(res => {
        this.props.refreshCart();
        this.setState({ isAdding: false });
      })
      .catch(err => {
        this.setState({ error: err, isAdding: false });
      });
  };

  handleRemoveItemFromCart = id => {
    this.setState({ isAdding: true });
    authAxios
      .delete(orderItemDeleteURL(id))
      .then(res => {
        this.props.refreshCart();
        this.setState({ isAdding: false });
      })
      .catch(err => {
        this.setState({ error: err });
        this.setState({ isAdding: false });
      });
  };

  hanldeDeleteOrder = id => {
    this.setState({ isAdding: true });
    authAxios
      .delete(orderDeleteURL(id))
      .then(res => {
        this.props.clearKart();
        this.props.refreshCart();
        this.setState({ isAdding: false });
      })
      .catch(err => {
        this.setState({ error: err });
        this.setState({ isAdding: false });
      });
  };

  render() {
    // const { loading } = this.state;
    const { cartItems } = this.props;
    const { item } = this.props;
    // console.log(this.state.isAdding);
    return (
      <ProductCard>
        <ProductImgContainer>
          <ProductImgContainer>
            <ProductImg src={`${localhost}${item.item_image}`}></ProductImg>
          </ProductImgContainer>
          <ProductContent>
            <ProductTitle>{item.itemName}</ProductTitle>
            <ProductSecondTitle>{item.vname}</ProductSecondTitle>
            <PriceWrap>
              <MRP>{item.quantity}</MRP>
              <MRP>
                <FontAwesomeIcon icon={faTimes} style={{ color: "#ff4c3b" }} />
              </MRP>
              <MRP>{item.vdiscount_price}</MRP>
              <MRP>
                <FontAwesomeIcon icon={faEquals} style={{ color: "#ff4c3b" }} />
              </MRP>
              <MRP>{item.final_price}</MRP>
            </PriceWrap>
            {this.state.isAdding ? (
              <ButtonLoader />
            ) : (
              <QuantityBoxWrap>
                <QuantityBoxItem>
                  {item.quantity > 1 ? (
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{ color: "#ff4c3b", cursor: "pointor" }}
                      onClick={() =>
                        this.handleRemoveQuantityFromCart(item.item_variation)
                      }
                    />
                  ) : (
                    <>
                      {cartItems.order_items.length < 2 ? (
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{ color: "#ff4c3b" }}
                          onClick={() => this.hanldeDeleteOrder(cartItems.id)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{ color: "#ff4c3b" }}
                          onClick={() => this.handleRemoveItemFromCart(item.id)}
                        />
                      )}
                    </>
                  )}
                </QuantityBoxItem>

                <QuantityBox
                  className="form-control"
                  type="text"
                  value={item.quantity}
                ></QuantityBox>

                <QuantityBoxItem>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#ff4c3b" }}
                    onClick={() =>
                      this.handleAddToCart(
                        item.item,
                        item.shop,
                        item.item_variation
                      )
                    }
                  />
                </QuantityBoxItem>
                <QuantityBoxItem style={{ border: "none" }}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      color: "#ff4c3b",
                      marginLeft: "15px"
                    }}
                    onClick={() => this.handleRemoveItemFromCart(item.id)}
                  />
                </QuantityBoxItem>
              </QuantityBoxWrap>
            )}
          </ProductContent>
        </ProductImgContainer>
      </ProductCard>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.shoppingCart
});

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart()),
    clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);
