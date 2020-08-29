import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import Shop from "./shopItem";

// import { Slider3 } from "../../../services/script";
// import Special from "../common/special";
// import Search from "../../pages/search";

class Shops extends Component {
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
    const { shops } = this.props;
    // console.log(123);
    return (
      <div>
        <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title4">
                  <br></br>
                  <h2 className="title-inner4"> Shops</h2>
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
                    <Shop shop={shop} key={index} />
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

export default Shops;
