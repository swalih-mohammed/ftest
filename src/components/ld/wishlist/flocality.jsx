import React, { Component } from "react";
import { RemoveFromFavoritePlacesURL, localhost } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Locality extends Component {
  removeFromFavList = id => {
    authAxios
      .put(RemoveFromFavoritePlacesURL(id), {
        is_active: false
      })
      .then(res => {
        this.setState({
          message: "This locality removed from your favorite list"
        });
        toast.error("This locality removed from your favorite list");
        this.props.fetchPlaces();
      })
      .catch(err => {
        this.setState({ error: err });
        toast.error("an error occured");
      });
  };
  render() {
    const { localities } = this.props;
    // console.log(localities);

    return (
      <div>
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="title4">
                <br></br>
                <h2 className="title-inner4">My Favorite Localities</h2>
                <div className="line">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="banner-furniture absolute_banner ratio3_2">
          <div className="container">
            <div className="row partition3">
              {localities.map(locality => (
                <div key={locality.id} className="col-md-4">
                  <div className="collection-banner p-left text-left">
                    <a href={`places/${locality.place}`}>
                      <img
                        // src={locality.place_image}
                        src={`${localhost}${locality.place_image}`}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img"
                      />
                    </a>
                    <div className="absolute-contain">
                      <h3>{locality.place_name}</h3>
                      <h4>{locality.place_village_name}</h4>
                      {/* <h4>{locality.place_district_name}</h4> */}
                      <br></br>
                      <div>
                        <a
                          href="javascript:void(0)"
                          title="Add to Wishlist"
                          onClick={() => this.removeFromFavList(locality.id)}
                        >
                          <i>
                            <FontAwesomeIcon
                              icon={faTimes}
                              size={"2x"}
                              color={"#ff4c3b"}
                            />
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Locality;
