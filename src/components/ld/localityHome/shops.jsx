import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// Import custom components
import { Slider3 } from "../../../services/script";
// import Special from "../common/special";
import Search from "../../pages/search";

class Shops extends Component {
  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }
  render() {
    const { shops } = this.props;
    // console.log(123);
    return (
      <div>
        {/*Blog Section*/}
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <br></br>
                <h2 className="title-inner4">Shops</h2>
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
              {shops.map(shop => (
                <div key={shop.id} className="col-md-4">
                  <div className="product-box">
                    <div className="img-wrapper">
                      <div className="lable-block">
                        {/* <a href={"/places/" + locality.id}> */}
                        <div className="classic-effect">
                          <div className="front">
                            <Link
                              to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}
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
                          <br></br>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Shops;
