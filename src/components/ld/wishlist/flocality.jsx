import React, { Component } from "react";
import { RemoveFromFavoritePlacesURL } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                    <a href={`places/${locality.place}`}></a>
                    <img
                      src={
                        "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                      }
                      alt=""
                      className="img-fluid blur-up lazyload bg-img"
                    />

                    <div className="absolute-contain">
                      <h3>{locality.place_name}</h3>
                      <h4>{locality.place_village_name}</h4>
                      <h4>{locality.place_district_name}</h4>
                      <br></br>
                      <div>
                        <a
                          href="javascript:void(0)"
                          title="Add to Wishlist"
                          onClick={() => this.removeFromFavList(locality.id)}
                        >
                          <i
                            className="fa fa-times fa-2x"
                            style={{ color: "#81ba00" }}
                            aria-hidden="true"
                          ></i>
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
