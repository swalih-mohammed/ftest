import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authSignup } from "../../../actions/auth";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { authAxios } from "../../../authAxios";
import { orderFilterURL } from "../../../constants";
import { useFormik, Field } from "formik";
import DatePicker from "react-datepicker";
import { Form, Card } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Result from "./testTable";
import styled from "styled-components";
import { Loader, PageLoader } from "../common/loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TableWrapper = styled.div`
  margin: 20px auto;
  width: 95%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;

const DateWrapper = styled.div`
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 1fr 1fr;
  /* width: 250px; */
  gap: 10px;
  /* overflow: hidden; */
  /* hight: 10px; */
`;
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
  margin: 100px auto 20px auto;
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
  max-width: 200px;
  &:hover {
    transform: scale(0.98);
    color: #343a40;
  }
`;
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

      Cell: ({ row }) => (
        <Link to={`${process.env.PUBLIC_URL}/order/${row.values.id}`}>
          {row.values.id}
        </Link>
      )
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
  // console.log(loading);

  return (
    <Wrapper>
      <StyledCard>
        <DateWrapper>
          <h6>From</h6>
          <h6>To</h6>
          <DatePicker
            selected={startDate}
            selectsStart
            // onChange={handleChangeStartDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd/MMM/yy"
            // showTimeSelect
            onFocus={e => (e.target.readOnly = true)}
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

          <DatePicker
            className="form-group"
            selected={endDate}
            popperModifiers={{
              preventOverflow: {
                enabled: true
              }
            }}
            // onChange={handleChangeEndtDate}
            onChange={date => setEndDate(date)}
            onFocus={e => (e.target.readOnly = true)}
            // showTimeSelect
            dateFormat="dd/MMM/yy"
            timeFormat="HH:mm"
            injectTimes={[
              setHours(setMinutes(new Date(), 1), 0),
              setHours(setMinutes(new Date(), 5), 12),
              setHours(setMinutes(new Date(), 59), 23)
            ]}
          />
        </DateWrapper>
        <StyledButton
          type="submit"
          // className="btn btn-solid"
          id="submit"
          placeholder="search"
          onClick={fetchOrders}
          // required=""
        >
          Submit
        </StyledButton>
      </StyledCard>
      {orders ? (
        <div>
          <Card
            bg={"secondary"}
            style={{ width: "18rem", marginTop: "20px", marginBottom: "20px" }}
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

      {loading ? <PageLoader /> : null}

      {orders ? (
        <TableWrapper>
          <Result data={orders} columns={columns} />
        </TableWrapper>
      ) : null}
    </Wrapper>
  );
};

export default Manage;
