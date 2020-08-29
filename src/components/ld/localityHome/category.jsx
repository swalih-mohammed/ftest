import React, { Component } from "react";
import Slider from "react-slick";
import Breadcrumb from "../../common/breadcrumb";
// import { Slider6, Slider4 } from "../../../services/script";

class Category extends Component {
  render() {
    return (
      <div>
        <section className="p-0 ratio2_1">
          <div className="container-fluid">
            <div className="row category-border">
              <div className="col-sm-4 border-padding">
                <div className="category-banner">
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/cart6.jpg`}
                      className="img-fluid blur-up lazyload bg-img"
                      alt=""
                    />
                  </div>
                  <div className="category-box">
                    <a href="#">
                      <h2>Ready For Job</h2>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 border-padding">
                <div className="category-banner">
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/cat2.jpg`}
                      className="img-fluid blur-up lazyload bg-img"
                      alt=""
                    />
                  </div>
                  <div className="category-box">
                    <a href="#">
                      <h2>For sale</h2>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 border-padding">
                <div className="category-banner">
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/cart5.jpg`}
                      className="img-fluid blur-up lazyload bg-img"
                      alt=""
                    />
                  </div>
                  <div className="category-box">
                    <a href="#">
                      <h2>Local Talent</h2>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Category;
