import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Slider3 } from "../../../services/script";
import { AddToFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product4, Product5 } from "../../../services/script";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FLocalityItem from "./fLocalityItem";

class FeautredLocality extends Component {
  state = {
    loading: false,
    error: null
  };

  render() {
    const { Newlocalities } = this.props;
    // console.log(Newlocalities);
    return (
      <div>
        <ToastContainer />
        {this.state.loading && <div className="loading-cls"></div>}
        <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title4">
                  <br></br>
                  <h2 className="title-inner4"> New Localities</h2>
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
                <Slider {...Product4} className="product-4 product-m no-arrow">
                  {Newlocalities.map((locality, index) => (
                    <div key={index} className="col-xl-3 col-md-4 col-grid-box">
                      <FLocalityItem locality={locality} />
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

export default FeautredLocality;
