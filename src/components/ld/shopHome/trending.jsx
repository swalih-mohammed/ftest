import React, { Component } from "react";
import Slider from "react-slick";
import { Product4 } from "../../../services/script";
import ProductStyleTwo from "./ProductStyleTwo";

class Tranding extends Component {
  render() {
    const { fProducts } = this.props;
    // console.log(fProducts);
    return (
      <div>
        <section className="section-b-space addtocart_count ratio_square">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="title4">
                  <h2 className="title-inner4">Sale</h2>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <Slider {...Product4} className="product-4 product-m no-arrow">
                  {fProducts.map(product => {
                    const variations = product.variations;
                    const defaultOption = product.variations[0];
                    return (
                      <div
                        key={product.id}
                        className="col-xl-3 col-md-6 col-grid-box"
                      >
                        <ProductStyleTwo
                          product={product}
                          key={product.id}
                          variations={variations}
                          defaultOption={defaultOption}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Tranding;
