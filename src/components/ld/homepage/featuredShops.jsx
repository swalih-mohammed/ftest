import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Slider3 } from "../../../services/script";
// import Search from "../../pages/search";
import { AddToFavoriteShopsURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import "react-toastify/dist/ReactToastify.css";

class FeautredShops extends Component {
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
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { featuredShops } = this.props;
    // console.log(featuredShops);
    return (
      <div>
        {/*Blog Section*/}
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <br></br>
                <h2 className="title-inner4">Featured Shops</h2>
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
                {featuredShops && (
                  <Slider {...Slider3} className="slide-3 no-arrow">
                    {/* <div> */}
                    {featuredShops.map(shop => (
                      // <div key={locality.id} className="col-md-12">
                      <div key={shop.id} className="product-box">
                        <div className="img-wrapper">
                          <div className="lable-block">
                            {/* <a href={"/places/" + locality.id}> */}
                            <div className="classic-effect">
                              <div className="front">
                                <Link
                                  to={`${process.env.PUBLIC_URL}/places/${shop.id}`}
                                >
                                  <img
                                    src={
                                      "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                                    }
                                    className="img-fluid lazyload bg-img"
                                    alt=""
                                  />
                                </Link>
                              </div>

                              <div className="cart-info cart-wrap">
                                <a
                                  href="javascript:void(0)"
                                  title="Add to Wishlist"
                                  onClick={() => this.addToWishList(shop.id)}
                                >
                                  <i
                                    className="fa fa-heart fa-2x"
                                    style={{ color: "#81ba00" }}
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>

                              <span></span>
                            </div>
                            {/* </a> */}
                            <div className="blog-details">
                              <a href="#">
                                <p>{shop.name}</p>
                              </a>
                              <hr className="style1" />
                              <h6> {shop.category}</h6>
                              <h6>{shop.place}</h6>
                              <h6>{shop.village}</h6>
                              <h6>{shop.phone_number}</h6>
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

export default FeautredShops;
