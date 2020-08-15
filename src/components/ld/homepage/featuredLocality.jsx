import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Slider3 } from "../../../services/script";
// import Search from "../../pages/search";
import styles from "./styles.css";
import { AddToFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductStyleSix from "./p-style";
import { Product4, Product5 } from "../../../services/script";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FeautredLocality extends Component {
  state = {
    loading: false,
    error: null
  };

  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }

  addToWishList = place => {
    this.setState({ loading: true });
    authAxios
      .post(AddToFavoritePlacesURL, { place })
      .then(res => {
        this.setState({ loading: false });
        toast.success("This locality added to your favorites");
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
    const { Newlocalities } = this.props;
    console.log(Newlocalities);
    return (
      <div>
        {/*Blog Section*/}
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <br></br>
                <h2 className="title-inner4">New Localities</h2>
                <div className="line">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="blog section-b-space pt-0 ratio2_3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {Newlocalities && (
                  <Slider {...Slider3} className="slide-3 no-arrow">
                    {/* <div> */}
                    {Newlocalities.map(locality => (
                      // <div key={locality.id} className="col-md-12">
                      <div key={locality.id} className="product-box">
                        <div className="img-wrapper">
                          <div className="lable-block">
                            {/* <a href={"/places/" + locality.id}> */}
                            <div className="classic-effect">
                              <div className="front">
                                <Link
                                  to={`${process.env.PUBLIC_URL}/places/${locality.id}`}
                                >
                                  <img
                                    src={locality.image}
                                    className="img-fluid lazyload bg-img"
                                    alt=""
                                  />
                                </Link>
                              </div>

                              <div className="cart-info cart-wrap">
                                <a
                                  href="javascript:void(0)"
                                  title="Add to Wishlist"
                                  onClick={() =>
                                    this.addToWishList(locality.id)
                                  }
                                >
                                  <i>
                                    <FontAwesomeIcon
                                      icon={faHeart}
                                      size={"2x"}
                                      color={"#ff4c3b"}
                                    />
                                  </i>
                                </a>
                              </div>
                              <span></span>
                            </div>
                            {/* </a> */}
                            <div className="blog-details">
                              <a
                                href={`${process.env.PUBLIC_URL}/places/${locality.id}`}
                              >
                                <p>{locality.name}</p>
                                <p>{locality.village_name} Village</p>
                              </a>
                              <hr className="style1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* </div> */}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default FeautredLocality;
