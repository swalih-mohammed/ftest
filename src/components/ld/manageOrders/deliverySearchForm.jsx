import React, { useState } from "react";
// import { connect } from "react-redux";
// import { authSignup } from "../../../actions/auth";
import { Link } from "react-router-dom";
// import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { orderFilterURL } from "../../../constants";
import { useFormik, Field } from "formik";
// import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Card from "react-bootstrap/Card";
// import Result from "./orderList";
import Result from "./testTable";
import { ToastContainer, toast } from "react-toastify";
import { PageLoader } from "../common/loader";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  StyledCard,
  Button,
  StyledSelect,
  StyledDatePicker
} from "../styled/utils";
import styled from "styled-components";

const FORM = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Manage = props => {
  const [orders, setOrders] = useState(null);
  const [loading, setloading] = useState(false);
  const [place, setPlace] = useState("");

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 0)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 59), 23)
  );

  const selectPlace = e => {
    console.log(e.target.value);
    setPlace(e.target.value);
  };

  const fetchOrders = () => {
    console.log("submitting");
    // const place = values["place"] === undefined ? null : values["place"];
    const selectedPlace = place === undefined ? null : place;
    const endingtDate = endDate === undefined ? null : endDate;
    const staringtDate = startDate === undefined ? null : startDate;
    //   const place = values["place"];

    if (selectedPlace !== "") {
      setloading(true);
      authAxios
        .get(orderFilterURL, {
          params: {
            selectedPlace,
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
  };

  //   const handleChangeStartDate = date => setStartDate(date);
  //   const handleChangeEndtDate = date => setEndDate(date);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      // Cell: e => <a href={`order/${e.value}`}> {e.value} </a>

      Cell: cellInfo => (
        <Link
          to={`staff-order/${cellInfo.value}`}
          // id={cellInfo.row.linkName}
        >
          {cellInfo.value}
        </Link>
      )
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
  //   console.log(props.places);

  return (
    <PageWrapper>
      <ToastContainer />
      {loading && <PageLoader />}
      <StyledCard style={{ marginLeft: "10px", marginRight: "10px" }}>
        <FORM onSubmit={fetchOrders}>
          <StyledSelect
            id="place"
            name="place"
            type="text"
            onChange={selectPlace}
            value={place}
          >
            <option value="" disabled selected>
              Select your place
            </option>
            {props.places.map((a, index) => (
              <option key={index}>{a}</option>
            ))}
          </StyledSelect>

          <StyledDatePicker
            selected={startDate}
            selectsStart
            onChange={date => setStartDate(date)}
            popperModifiers={{
              preventOverflow: {
                enabled: true
              }
            }}
            dateFormat="dd/MMM/yy"
            onFocus={e => (e.target.readOnly = true)}
            timeFormat="HH:mm"
            injectTimes={[
              setHours(setMinutes(new Date(), 1), 0),
              setHours(setMinutes(new Date(), 5), 12),
              setHours(setMinutes(new Date(), 59), 23)
            ]}
          />

          <StyledDatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            popperModifiers={{
              preventOverflow: {
                enabled: true
              }
            }}
            // showTimeSelect
            onFocus={e => (e.target.readOnly = true)}
            dateFormat="dd/MMM/yy"
            timeFormat="HH:mm"
            injectTimes={[
              setHours(setMinutes(new Date(), 1), 0),
              setHours(setMinutes(new Date(), 5), 12),
              setHours(setMinutes(new Date(), 59), 23)
            ]}
          />
          <Button onClick={fetchOrders}> Submit</Button>
        </FORM>
      </StyledCard>

      {orders ? (
        <>
          <Card
            bg={"danger"}
            style={{ width: "18rem" }}
            className="mb-2"
            text={"light"}
          >
            <Card.Body>
              <Card.Title>
                {" "}
                {orders.filter(order => order.order_status === 1).length}{" "}
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
            <Card.Body>
              <Card.Title> {orders.length} Total Orders </Card.Title>
            </Card.Body>
          </Card>
        </>
      ) : null}

      {orders ? (
        <StyledCard style={{ padding: "5px" }}>
          <Result data={orders} columns={columns} />
        </StyledCard>
      ) : null}
    </PageWrapper>
  );
};

export default Manage;
