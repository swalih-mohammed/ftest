import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RemoveFromFavoriteShopsURL, localhost } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShopItem from "./shopItem";

class Shop extends Component {
  state = {
    loading: false
  };
  render() {
    const { shops } = this.props;
    // console.log(shops);

    return (
      <div>
        {this.state.loading && <div className="loading-cls"></div>}
        <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title4">
                  <br></br>
                  <h3 className="title-inner4"> Favorite Shops</h3>
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
                <div className="no-slider row">
                  {shops.map((shop, index) => (
                    <ShopItem
                      shop={shop}
                      fetchShops={this.props.fetchShops}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Shop;
