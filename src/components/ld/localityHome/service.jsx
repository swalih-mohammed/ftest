import React, { Component } from "react";
import { svgservice } from "../../../services/script";

class Service extends Component {
  render() {
    return (
      <div className="container">
        <section className="service section-b-space  border-section border-top-0">
          <div className="row ">
            <div className="col-lg-3 col-md-6 service-block1 ">
              <div dangerouslySetInnerHTML={{ __html: svgservice }} />
              <h4> Call Local Exicutive</h4>
              <a href={"tel:" + this.props.message}>{this.props.message}</a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Service;
