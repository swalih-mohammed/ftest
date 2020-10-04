import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product4 } from "../../../services/script";
import FshopItem from "./fshopItem";
// import { Slider3 } from "../../../services/script";
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
  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }

  render() {
    const { featuredShops } = this.props;
    // console.log(featuredShops);
    return (
      <div>
        {/*Blog Section*/}
        <ToastContainer />
        <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title4">
                  <br></br>
                  <h2 className="title-inner4"> Premium Shops</h2>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col">
                <Slider {...Product4}>
                  {/* <Slider {...Product4} className="product-4 product-m no-arrow"> */}
                  {featuredShops.map((shop, index) => (
                    <div key={index} className="col-xl-3 col-md-6 col-grid-box">
                      <Test>
                        <FshopItem shop={shop} />
                      </Test>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default FeautredShops;
