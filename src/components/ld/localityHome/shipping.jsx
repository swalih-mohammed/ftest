import React, { Component } from "react";

import { svgFreeShipping } from "../../../services/script";

class Shipping extends Component {
  render() {
    return (
      <div className="container">
        <section className="service section-b-space  border-section border-top-0">
          <div className="row ">
            <div className="col-lg-3 col-md-6 service-block1 ">
              <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
              <h4>shipping message</h4>
              <p>{this.props.message}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Shipping;
