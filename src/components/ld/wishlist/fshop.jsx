import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RemoveFromFavoriteShopsURL, localhost } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Shop extends Component {
  removeFromFavList = id => {
    authAxios
      .put(RemoveFromFavoriteShopsURL(id), {
        is_active: false
      })
      .then(res => {
        this.setState({ message: "Shop removed from your favorite list" });
        toast.error("This shop removed from your favorite list");
        this.props.fetchShops();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { shops } = this.props;
    // console.log(shops);

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <br></br>
                <h2 className="title-inner4">My favorite Shops</h2>
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
                {shops.map(shop => (
                  <div key={shop.id} className="col-md-4">
                    <div className="product-box">
                      <div className="img-wrapper">
                        <div className="lable-block">
                          {/* <a href={"/places/" + locality.id}> */}
                          <div className="classic-effect">
                            <div className="front">
                              <Link
                                to={`${process.env.PUBLIC_URL}/shops/${shop.id}`}
                              >
                                <img
                                  // src={shop.image}
                                  src={`${localhost}${shop.shop_image}`}
                                  className="img-fluid lazyload bg-img"
                                  alt=""
                                />
                              </Link>
                            </div>

                            <div className="cart-info cart-wrap">
                              <a
                                href="javascript:void(0)"
                                title="Add to Wishlist"
                                onClick={() => this.removeFromFavList(shop.id)}
                              >
                                {/* <i
                                  className="fa fa-times fa-2x"
                                  style={{ color: "#81ba00" }}
                                  aria-hidden="true"
                                ></i> */}
                                <i>
                                  <FontAwesomeIcon
                                    icon={faTimes}
                                    size={"2x"}
                                    color={"#ff4c3b"}
                                  />
                                </i>
                              </a>
                            </div>

                            <span></span>
                          </div>
                          {/* </a> */}
                          <div className="blog-details">
                            <a href="#">
                              <p>{shop.shop_name}</p>
                            </a>
                            <hr className="style1" />
                            <h6> {shop.shop_category_name}</h6>
                            <h6>{shop.shop_place_name}</h6>
                          </div>
                          <br></br>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Shop;
