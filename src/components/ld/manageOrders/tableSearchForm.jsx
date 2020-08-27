import React, { useState } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Redirect } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { orderFilterURL } from "../../../constants";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Card from "react-bootstrap/Card";
// import Result from "./orderList";
import Result from "./testTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manage = props => {
  const [orders, setOrders] = useState(null);
  const [loading, setloading] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 0)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 59), 23)
  );

  // const validationSchema = Yup.object().shape({
  //   place: Yup.string().required("Required")
  // });

  const formik = useFormik({
    initialValues: {
      place: ""
    },
    // validationSchema
    onSubmit: values => {
      // const place = values["place"] === undefined ? null : values["place"];
      const endingtDate = endDate === undefined ? null : endDate;
      const staringtDate = startDate === undefined ? null : startDate;
      const place = values["place"];

      if (place !== "") {
        setloading(true);
        authAxios
          .get(orderFilterURL, {
            params: {
              place,
              staringtDate,
              endingtDate
            }
          })
          .then(res => {
            setOrders(res.data);
            setloading(false);
          })
          .catch(err => {
            setloading(false);
            toast.error("error occured");
          });
      } else {
        toast.error("Please select a place");
      }
    }
  });

  const handleChangeStartDate = date => setStartDate(date);
  const handleChangeEndtDate = date => setEndDate(date);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      Cell: e => <a href={`order/${e.value}`}> {e.value} </a>
    },
    {
      Header: "Area",
      accessor: "area_name"
    },
    {
      Header: "Shop",
      accessor: "shop_name"
    },
    {
      Header: "Status",
      accessor: "orderStatus"
    },
    {
      Header: "Date",
      accessor: "start_date"
    },
    {
      Header: "Customer",
      accessor: "customer_name"
    },
    {
      Header: "Mobile",
      accessor: "mobile_number"
    }
  ];

  // const staringtDate =
  // console.log(orders);

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
                  <form onSubmit={formik.handleSubmit}>
                    <div className="checkout-form">
                      <div className="row check-out">
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Place</div>
                          <select
                            id="place"
                            name="place"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.place}
                          >
                            <option value="" disabled selected>
                              Select your place
                            </option>
                            {props.places.map((a, index) => (
                              <option key={index}>{a}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <br></br>
                      <div ClassName="form-inline">
                        <div className="row check-out">
                          <div className="form-group col-md-1 col-sm-2 col-xs-1">
                            <DatePicker
                              selected={startDate}
                              selectsStart
                              // onChange={handleChangeStartDate}
                              onChange={date => setStartDate(date)}
                              popperModifiers={{
                                preventOverflow: {
                                  enabled: true
                                }
                              }}
                              dateFormat="dd/MMM/yy"
                              // showTimeSelect
                              timeFormat="HH:mm"
                              injectTimes={[
                                setHours(setMinutes(new Date(), 1), 0),
                                setHours(setMinutes(new Date(), 5), 12),
                                setHours(setMinutes(new Date(), 59), 23)
                              ]}
                            />
                          </div>
                          <div className="form-group col-md-1 col-sm-2 col-xs-1">
                            <DatePicker
                              selected={endDate}
                              // onChange={handleChangeEndtDate}
                              onChange={date => setEndDate(date)}
                              popperModifiers={{
                                preventOverflow: {
                                  enabled: true
                                }
                              }}
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
                        required=""
                      />
                    </div>
                  </form>
                </div>
              </div>
              <br></br>
              {orders ? (
                <div>
                  <Card
                    bg={"danger"}
                    style={{ width: "18rem" }}
                    className="mb-2"
                    text={"light"}
                  >
                    <Card.Body>
                      <Card.Title>
                        {" "}
                        {
                          orders.filter(order => order.order_status === 1)
                            .length
                        }{" "}
                        Pending Orders{" "}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                  <Card
                    bg={"success"}
                    style={{ width: "18rem" }}
                    className="mb-2"
                    text={"light"}
                  >
                    {/* <Card.Header>Order for today</Card.Header> */}
                    <Card.Body>
                      <Card.Title> {orders.length} Total Orders </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {orders ? <Result data={orders} columns={columns} /> : null}
    </div>
  );
};

export default Manage;
