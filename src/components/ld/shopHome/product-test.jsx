import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { getTrendingTagCollection } from "../../../services";

import SideImageItem from "./product-image-item";

class Trending extends Component {
  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <div>
        {/*Paragraph*/}
        <section className="p-0">
          <div className="tab-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="title4">
                    <h2 className="title-inner4">Products</h2>
                    <div className="line">
                      <span></span>
                    </div>
                  </div>
                  <Tabs className="theme-tab">
                    <TabList className="tabs tab-title">
                      <Tab>UNISEX WATCHES</Tab>
                    </TabList>
                    <div className="tab-content-cls">
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {products.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Trending;

// export default connect(mapStateToProps) (Trending);
