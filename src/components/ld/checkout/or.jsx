import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Table, Row, Col, Container } from "react-bootstrap";
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

const OrderSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px 10px auto auto;
  /* background-color: #bbbbbc; */
  /* padding-top: 30px; */
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 150px;
  background-color: #ffff;
  margin: 2px auto;
  padding: 15px 2px;
`;

const OrderTotalWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const OrderTotalItem = styled.div`
  margin: 20px auto;
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
  padding: 2px;
  margin: 2px;
`;

const ContinueShopping = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const CheckOutWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const QuantityBox = styled.input`
  /* margin-left: 5px; */
  /* margin-right: 5px; */
  display: flex;
  border: none;
  text-align: center;
  width: 40px;
  height: 100%;
  padding: 1px;
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #ff5722;
  width: 250px;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 35px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  &:hover {
    background: #ff5722;
    color: #ffffff;
  }
`;
class OrderSummary extends Component {
  state = {
    // cartItems: null,
    quantity: 1,
    error: null,
    loading: false
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

  handleAddToCart2 = (id, shop, variation) => {
    // console.log(id, shop, variation);
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { id, shop, variation })
      .then(res => {
        // this.handleFetchOrder();
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            this.setState({ loading: false });
            toast.error("please login or refresh");
          } else if (err.response.data) {
            const error = err.response.data.message;
            this.setState({ loading: false });
            toast.error(error);
          } else {
            this.setState({ loading: false });
            toast.error("Oops there was an error");
          }
        }
      });
  };

  handleRemoveQuantityFromCart = (id, q) => {
    this.setState({ loading: true });
    authAxios
      .post(orderItemUpdateQuantityURL, { id })
      .then(res => {
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleRemoveItemFromCart = id => {
    this.setState({ loading: true });
    authAxios
      .delete(orderItemDeleteURL(id))
      .then(res => {
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
        this.setState({ loading: false });
      });
  };

  hanldeDeleteOrder = id => {
    this.setState({ loading: true });
    authAxios
      .delete(orderDeleteURL(id))
      .then(res => {
        this.props.clearKart();
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    const { cartItems } = this.props;
    // console.log(cartItems);

    return (
      <>
        {cartItems ? (
          <>
            {cartItems.order_items ? (
              <>
                <ContinueShopping>
                  <h2>Order Summary</h2>
                </ContinueShopping>
                <OrderSummaryContainer>
                  {cartItems.order_items.map((item, index) => (
                    <ProductCard key={index}>
                      <ProductImgContainer>
                        <ProductImgContainer>
                          <ProductImg
                            src={`${localhost}${item.item_image}`}
                          ></ProductImg>
                        </ProductImgContainer>
                        <ProductContent>
                          <ProductTitle>{item.itemName}</ProductTitle>
                          <ProductSecondTitle>{item.vname}</ProductSecondTitle>
                          <PriceWrap>
                            <MRP>{item.quantity}</MRP>
                            <MRP>
                              <FontAwesomeIcon
                                icon={faTimes}
                                style={{ color: "#ff4c3b" }}
                              />
                            </MRP>
                            <MRP>{item.vdiscount_price}</MRP>
                            <MRP>
                              <FontAwesomeIcon
                                icon={faEquals}
                                style={{ color: "#ff4c3b" }}
                              />
                            </MRP>
                            <MRP>{item.final_price}</MRP>
                          </PriceWrap>
                          <QuantityBoxWrap>
                            <QuantityBoxItem>
                              {item.quantity > 1 ? (
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  style={{ color: "#ff4c3b" }}
                                  onClick={() =>
                                    this.handleRemoveQuantityFromCart(
                                      item.item_variation
                                    )
                                  }
                                />
                              ) : (
                                <>
                                  {cartItems.order_items.length < 2 ? (
                                    <FontAwesomeIcon
                                      icon={faMinus}
                                      style={{ color: "#ff4c3b" }}
                                      onClick={() =>
                                        this.hanldeDeleteOrder(cartItems.id)
                                      }
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faMinus}
                                      style={{ color: "#ff4c3b" }}
                                      onClick={() =>
                                        this.handleRemoveItemFromCart(item.id)
                                      }
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
                                  this.handleAddToCart2(
                                    item.item,
                                    item.shop,
                                    item.item_variation
                                  )
                                }
                              />
                            </QuantityBoxItem>
                            <QuantityBoxItem>
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                style={{ color: "#ff4c3b", marginLeft: "15px" }}
                                onClick={() =>
                                  this.handleRemoveItemFromCart(item.id)
                                }
                              />
                            </QuantityBoxItem>
                          </QuantityBoxWrap>
                        </ProductContent>
                      </ProductImgContainer>
                    </ProductCard>
                  ))}
                </OrderSummaryContainer>
                <OrderTotalWrap>
                  <OrderTotalItem>
                    <h1>Total</h1>
                  </OrderTotalItem>
                  <OrderTotalItem>
                    <h1>3</h1>
                  </OrderTotalItem>
                </OrderTotalWrap>
                <CheckOutWrapper>
                  <Link to={`${process.env.PUBLIC_URL}/checkout`}>
                    <Button> check out</Button>
                  </Link>
                </CheckOutWrapper>

                <ContinueShopping>
                  <Link
                    to={`${process.env.PUBLIC_URL}/shops/${cartItems.shop_id}`}
                  >
                    Continue shopping
                  </Link>
                </ContinueShopping>
              </>
            ) : (
              <h6>You cart is empty</h6>
            )}
          </>
        ) : (
          <h6>You cart is empty</h6>
        )}
      </>
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
