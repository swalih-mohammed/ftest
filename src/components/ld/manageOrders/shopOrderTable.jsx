import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { orderFilterURL } from "../../../constants";
import { useFormik, Field } from "formik";
import DatePicker from "react-datepicker";
import Card from "react-bootstrap/Card";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Result from "./testTable";

const Manage = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 0)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 59), 23)
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = e => {
    // e.preventDefault();
    const endingtDate = endDate === undefined ? null : endDate;
    const staringtDate = startDate === undefined ? null : startDate;
    // console.log(endingtDate, staringtDate);
    // console.log(staringtDate);
    setLoading(true);
    authAxios
      .get(orderFilterURL, {
        params: {
          staringtDate,
          endingtDate
        }
      })
      .then(res => {
      
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: e => <a href={`${process.env.PUBLIC_URL}/order/${e.value}`}> {e.value} </a>
    //  <Link to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}>
    },
    {
      Header: "Customer",
      accessor: "customer_name"
    },
    {
      Header: "Area",
      accessor: "area_name"
    },

    {
      Header: "Status",
      accessor: "orderStatus"
      //   getProps: (state, rowInfo, column) => {
      //     return {
      //       style: {
      //         color:
      //           rowInfo && rowInfo.row.orderStatus !== "Pending" ? "red" : null
      //       }
      //     };
      //   }
    },
    {
      Header: "Date",
      accessor: "start_date"
    },

    {
      Header: "Mobile",
      accessor: "mobile_number"
    },
    {
      Header: "Mode of payment",
      accessor: "mode_of_payment"
    }
  ];
  console.log(loading);

  return (
    <div>
      <section className="register-page section-b-space">
        <div className="container">
        {loading && <div className="loading-cls"></div>}
          <div className="row">
            <div className="col-lg-12">
              <h4>Find Orders</h4>
              <div className="theme-card">
                <div className="checkout-page">
                  <div className="checkout-form">
                    <div className="row check-out"></div>
                    <br></br>
                    <div ClassName="form-inline">
                      <div className="row check-out">
                        <div className="form-group col-md-8 col-sm-8 col-xs-8">
                          <DatePicker
                            selected={startDate}
                            selectsStart
                            // onChange={handleChangeStartDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="dd/MMM/yy"
                            // showTimeSelect
                            popperModifiers={{
                              preventOverflow: {
                                enabled: true
                              }
                            }}
                            timeFormat="HH:mm"
                            injectTimes={[
                              setHours(setMinutes(new Date(), 1), 0),
                              setHours(setMinutes(new Date(), 5), 12),
                              setHours(setMinutes(new Date(), 59), 23)
                            ]}
                          />
                        </div>
                        <div className="form-group col-md-8 col-sm-8 col-xs-8">
                          <DatePicker
                            selected={endDate}
                            popperModifiers={{
                              preventOverflow: {
                                enabled: true
                              }
                            }}
                            // onChange={handleChangeEndtDate}
                            onChange={date => setEndDate(date)}
                            // showTimeSelect
                            dateFormat="dd/MMM/yy"
                            timeFormat="HH:mm"
                            injectTimes={[
                              setHours(setMinutes(new Date(), 1), 0),
                              setHours(setMinutes(new Date(), 5), 12),
                              setHours(setMinutes(new Date(), 59), 23)
                            ]}
                          />
                        </div>
                      </div>
                    </div>

                    <br></br>
                    <input
                      type="submit"
                      className="btn btn-solid"
                      id="submit"
                      placeholder="search"
                      onClick={fetchOrders}
                      required=""
                    />
                  </div>
                </div>
                <br></br>
                {orders ? (
                  <div>
                    <Card
                      bg={"secondary"}
                      style={{ width: "18rem" }}
                      className="mb-2"
                      text={"light"}
                    >
                      {/* <Card.Header>Order for today</Card.Header> */}
                      <Card.Body>
                        <Card.Title> {orders.length} Orders </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      {orders ? <Result data={orders} columns={columns} /> : null}
    </div>
  );
};

export default Manage;
