import React, { Component } from "react";

class ProductCategory extends Component {
  handleChangeCategory = cat => {
    this.props.handleChangeCategory(cat);
    window.scrollTo(0, 1300);
  };

  render() {
    const { ShopProductCategory, ShopDetail } = this.props;
    // console.log(ShopProductCategory);
    return (
      <div>
        {/*Category Three*/}
        {this.props.loading ? (
          <div className="loading-cls"></div>
        ) : (
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
                          {ShopDetail &&
                          ShopDetail.preferred_language === "Malayalam" ? (
                            <React.Fragment> {cat.local_name}</React.Fragment>
                          ) : (
                            <React.Fragment> {cat.name}</React.Fragment>
                          )}
                        </a>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default ProductCategory;
