import React, { Component } from "react";

import { svgFreeShipping } from "../../../services/script";

class Shipping extends Component {
  render() {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
        <h4>shipping message</h4>
        <p>{this.props.message}</p>
      </>
    );
  }
}

export default Shipping;
