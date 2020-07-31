import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// Import custom components
import { Slider3 } from "../../../services/script";
import Trading from "./tranding";
import Special from "../common/special";
import {
  svgFreeShipping,
  svgservice,
  svgoffer
} from "../../../services/script";
import HeaderTwo from "../../common/headers/header-two";
import FooterOne from "../../common/footers/footer-one";
import ThemeSettings from "../../common/theme-settings";
import Search from "../../pages/search";

class Vegetables extends Component {
  componentDidMount() {
    document.getElementById("color").setAttribute("href", `#`);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Local Dukans</title>
        </Helmet>
        <HeaderTwo logoName={"logo.png"} />
        <section className="p-0">
          <Slider className="slide-1 home-slider">
            <div>
              <div className="home home39 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h1>Now your local stores are online</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="home home38 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>save upto 10%</h4>
                          <h1>fresh vegetables</h1>
                          <a href="#" className="btn btn-solid">
                            shop now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </section>
        {/*Blog Section*/}
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <br></br>
                <h2 className="title-inner4">Top Localities</h2>
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
                  <div className="col-md-12">
                    <a href="#">
                      <div className="classic-effect">
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/vegetables/blog/1.jpg`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <span></span>
                      </div>
                    </a>
                    <div className="blog-details">
                      <a href="#">
                        <p>Kolapparamb</p>
                      </a>
                      <hr className="style1" />
                      <h6>Village: Kottilangadi</h6>
                      <h6>Dist: Malappuram</h6>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <a href="#">
                      <div className="classic-effect">
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/vegetables/blog/2.jpg`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <span></span>
                      </div>
                    </a>
                    <div className="blog-details">
                      <h4>25 January 2018</h4>
                      <a href="#">
                        <p>
                          Lorem ipsum dolor sit consectetur adipiscing elit,
                        </p>
                      </a>
                      <hr className="style1" />
                      <h6>by: John Dio , 2 Comment</h6>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <a href="#">
                      <div className="classic-effect">
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/vegetables/blog/3.jpg`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <span></span>
                      </div>
                    </a>
                    <div className="blog-details">
                      <h4>25 January 2018</h4>
                      <a href="#">
                        <p>
                          Lorem ipsum dolor sit consectetur adipiscing elit,
                        </p>
                      </a>
                      <hr className="style1" />
                      <h6>by: John Dio , 2 Comment</h6>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <a href="#">
                      <div className="classic-effect">
                        <div>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/vegetables/blog/4.jpg`}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <span></span>
                      </div>
                    </a>
                    <div className="blog-details">
                      <h4>25 January 2018</h4>
                      <a href="#">
                        <p>
                          Lorem ipsum dolor sit consectetur adipiscing elit,
                        </p>
                      </a>
                      <hr className="style1" />
                      <h6>by: John Dio , 2 Comment</h6>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        {/*Blog Section End*/}

        {/* button start */}
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <a href="category-page.html" className="btn btn-outline">
                  Find All Localities
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* button end  */}
        <Search />
        <ThemeSettings />
        <FooterOne logoName={"logo.png"} />
      </div>
    );
  }
}

export default Vegetables;
