import React, { Component } from "react";
import Slider from "react-slick";

import Breadcrumb from "../../common/breadcrumb";
import { Slider6, Slider4 } from "../../../services/script";

class ProductCategory extends Component {
  handleChangeCategory = cat => {
    this.props.handleChangeCategory(cat);
  };

  render() {
    const { ShopProductCategory } = this.props;
    // console.log(ShopProductCategory);
    return (
      <div>
        {/*Category Three*/}
        <div className="container category-button">
          <section className="section-b-space">
            <div className="row partition1">
              <div className="col">
                <a
                  href={null}
                  onClick={e => this.props.handleClearCategory(e)}
                  className="btn btn-outline btn-block"
                >
                  All Products
                </a>
              </div>
              {ShopProductCategory && (
                <React.Fragment>
                  {ShopProductCategory.map((cat, index) => (
                    <div key={index} className="col">
                      <a
                        href={null}
                        // onClick={this.props.handleChangeCategory(cat.name)}
                        className="btn btn-outline btn-block"
                        onClick={() => this.handleChangeCategory(cat.id)}
                      >
                        {cat.name}
                      </a>
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ProductCategory;
