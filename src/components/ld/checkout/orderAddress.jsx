import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
const CheckoutItem = styled.div`
  height: auto;
  padding: 5px 10px;
`;
class OrderAddress extends Component {
  render() {
    const { address } = this.props;
    // console.log(address);
    return (
      <>
        <CheckoutItem>
          <h3>{address.PlaceName}</h3>
          <h4>{address.areaName}</h4>
          <h5>{address.full_address}</h5>
          <h5>Village: {address.vilalgeName}</h5>
          <h5>District: {address.districtName}</h5>
          <h5>Sate: {address.stateName}</h5>
          <h5>Phone: {address.phone_number}</h5>
        </CheckoutItem>
      </>
      // <div className="row">
      //   <div className="col-lg-9">
      //     {/* <div className="box-head">
      //       <h3>Order Address</h3>
      //     </div> */}
      //     <div className="dashboard-right">
      //       <div className="dashboard">
      //         <div className="box-account box-info">
      //           <div className="box-head">
      //             <h2>{address.PlaceName}</h2>
      //           </div>
      //           <div className="row">
      //             <div className="col-sm-6">
      //               <div className="box">
      //                 <div className="box-title">
      //                   <h3>{address.areaName}</h3>
      //                 </div>
      //                 <div className="box-content">
      //                   <h6>{address.full_address}</h6>
      //                   <h6>Village: {address.vilalgeName}</h6>
      //                   <h6>District: {address.districtName}</h6>
      //                   <h6>Sate: {address.stateName}</h6>
      //                   <h6>Phone: {address.phone_number}</h6>
      //                   <br></br>
      //                   <a
      //                     href={`${process.env.PUBLIC_URL}/editaddress/${address.id}`}
      //                   >
      //                     Edit
      //                   </a>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default OrderAddress;
