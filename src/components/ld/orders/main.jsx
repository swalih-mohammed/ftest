import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Loader } from "../common/loader";

import { orderListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
// import { fetchUser } from "../../../actions/user";

const Wrapper = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const OrderCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  width: 100%;
  /* border-radius: 10px; */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 2px auto;
  max-width: 800px;
`;

const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 30px;
  cursor: pointer;
  background: #ff4c3b;
  color: #fff;
  border: none;
  border-radius: 5px;
  border: 1px #fff solid;
  &:hover {
    transform: scale(0.98);
    color: #343a40;
  }
`;

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      newOrders: [],
      loading: false,
      error: null,
      offset: 0,
      limit: 2,
      query: "all",
      // query: 184
      hasMore: true
    };
  }

  componentWillMount() {
    // this.props.fetchUserType();

    this.setState({ loading: true }, () => {
      const { offset, limit, query } = this.state;
      authAxios
        .get(orderListURL + `?limit=${limit}&offset=${offset}`)
        .then(res => {
          this.setState({ orders: res.data.orders, loading: false });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            loading: false
          });
        });
    });
  }

  handleFetchOrdersScroll = () => {
    this.setState({ loading: true }, () => {
      const { offset, limit } = this.state;
      this.setState({ offset: this.state.offset + limit });
      authAxios
        .get(orderListURL + `?limit=${limit}&offset=${offset}`)
        // .get(orderListURL)
        .then(res => {
          this.setState({ orders: this.state.orders.concat(res.data.orders) });
          this.setState({ hasMore: res.data.hasMore, loading: false });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            loading: false
          });
        });
    });
  };

  render() {
    const { orders, loading, hasMore, query, limit } = this.state;
    const { token } = this.props;
    // console.log(this.state.loading);

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <Wrapper>
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {orders && (
              <div>
                <InfiniteScroll
                  dataLength={this.state.orders.length}
                  next={this.handleFetchOrdersScroll}
                  hasMore={this.state.hasMore}
                  endMessage={
                    <p className="seen-cls seen-it-cls">
                      <b>No more order to show</b>
                    </p>
                  }
                >
                  {orders.map((order, index) => (
                    <div key={index}>
                      <OrderCard>
                        <h2>{order.shop_name}</h2>
                        <h6>Order ID: {order.id}</h6>
                        <h6>Date: {order.start_date}</h6>
                        <h6>Status: {order.orderStatus}</h6>
                        <Link to={`customer-order/${order.id}`}>
                          <StyledButton>View More</StyledButton>
                        </Link>
                      </OrderCard>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    // userType: state.user.user.UserType,
    user: state.user,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Orders);

// export default Orders;
