import React, { Component } from "react";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// Import custom components
import { Slider3 } from "../../../services/script";
// import Special from "../common/special";
// import Search from "../../pages/search";

class FeautredShops extends Component {
  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }
  render() {
    const { featuredShops } = this.props;
    // console.log(123);
    return (
      <div>
        {/*Blog Section*/}
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
                <Slider {...Slider3} className="slide-3 no-arrow">
                  {/* <div> */}
                  {featuredShops.map(shop => (
                    <div key={shop.id} className="col-md-12">
                      <a href="#">
                        <div className="classic-effect">
                          <div>
                            <img
                              // src={`${process.env.PUBLIC_URL}/assets/images/vegetables/blog/1.jpg`}
                              src={
                                "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                              }
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </div>
                          <span></span>
                        </div>
                      </a>
                      <div className="blog-details">
                        <a href="#">
                          <p>{shop.name}</p>
                        </a>
                        <hr className="style1" />
                        <h6>{shop.category}</h6>
                        {/* <h6>Dist: {shop.district}</h6> */}
                      </div>
                    </div>
                  ))}
                  {/* </div> */}
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
