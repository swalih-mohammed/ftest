import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Product4 } from "../../../services/script";
import FshopItem from "./fshop-item";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const Test = styled.div`
  @media (min-width: 320px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-right: 25px;
    margin-right: -15px;
    margin-left: -15px;
    width: 350px;
  }
`;

class FeautredShops extends Component {
  render() {
    const { featuredShops } = this.props;
    return (
      <>
        <Slider {...Product4}>
          {featuredShops.map((shop, index) => (
            <div key={index} className="col-xl-3 col-md-6 col-grid-box">
              <Test>
                <FshopItem shop={shop} />
              </Test>
            </div>
          ))}
        </Slider>
      </>
    );
  }
}

export default FeautredShops;
