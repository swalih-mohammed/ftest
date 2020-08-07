import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { orderListURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { fetchUser } from "../../../actions/user";

class Orders extends Component {
  render() {
    console.log(this.props.orders);
    return (
      <div>
        {this.props.orders && (
          <section className="section-b-space">
            <div className="container">
              {this.props.orders.map((order, index) => (
                <div key={index} className="row">
                  <div className="col-lg-3">
                    <div className="dashboard-left">
                      <div className="collection-mobile-back">
                        <span className="filter-back">
                          <i
                            className="fa fa-angle-left"
                            aria-hidden="true"
                          ></i>{" "}
                          back
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="dashboard-right">
                      <div className="dashboard">
                        <div className="box-account box-info">
                          <div className="box-head">
                            <h3>{order.shop_name}</h3>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="box">
                                <div className="box-title">
                                  <h4>Order No: {order.id}</h4>
                                  <div>
                                    <div>Customer: {order.customer_name}</div>
                                    <div>Customer: {order.phone_number}</div>
                                  </div>
                                </div>

                                <div className="box-content">
                                  <h6>Date: {order.start_date}</h6>
                                  <h6>Status: {order.order_status}</h6>
                                  <br></br>
                                  <a href={`order/${order.id}`}>View More</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Orders;
