import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Slider3 } from "../../../services/script";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import "react-toastify/dist/ReactToastify.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Img } from "react-image";
import FshopItem from "./fShopItem";
import { Product4, Product5 } from "../../../services/script";

class FeautredShops extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }

  addToWishList = shop => {
    this.setState({ loading: true });
    authAxios
      .post(AddToFavoriteShopsURL, { shop })
      .then(res => {
        this.setState({ loading: false });
        toast.success("This shop added to your favorites");
        // console.log("added");
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast.error("Please login to add to favorites");
          this.setState({ loading: false });
        } else if (err.response.status === 400) {
          toast.error("This locality already exists in your favorites");
          this.setState({ loading: false });
        } else {
          toast.error("An error occured");
        }
      });
  };

  render() {
    const { featuredShops } = this.props;
    // console.log(featuredShops);
    return (
      <div>
        {/*Blog Section*/}
        {/* <ToastContainer /> */}

        {this.state.loading ? (
          <div className="loading-cls"></div>
        ) : (
          <React.Fragment>
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
                    <Slider
                      {...Product4}
                      className="product-4 product-m no-arrow"
                    >
                      {featuredShops.map((shop, index) => (
                        <div
                          key={index}
                          className="col-xl-3 col-md-6 col-grid-box"
                        >
                          <FshopItem shop={shop} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default FeautredShops;
