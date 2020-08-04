import React, { Component } from "react";
import Slider from "react-slick";

import Breadcrumb from "../../common/breadcrumb";
import { Slider6, Slider4 } from "../../../services/script";

class Category extends Component {
  render() {
    return (
      <div>
        <section className="section-b-space">
          <div className="row partition1">
            <div className="col">
              <a href="#" className="btn btn-outline btn-block">
                airbag
              </a>
            </div>
            <div className="col">
              <a href="#" className="btn btn-outline btn-block">
                burn bag
              </a>
            </div>
            <div className="col">
              <a href="#" className="btn btn-outline btn-block">
                briefcase
              </a>
            </div>
            <div className="col">
              <a href="#" className="btn btn-outline btn-block">
                carpet bag
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Category;
