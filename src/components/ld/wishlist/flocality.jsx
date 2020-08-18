import React, { Component } from "react";
import { RemoveFromFavoritePlacesURL, localhost } from "../../../constants";
import { authAxios } from "../../../authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalityItem from "./localityItem";

class Locality extends Component {
  render() {
    const { localities } = this.props;
    // console.log(localities);

    return (
      <div>
        <ToastContainer />

        {localities && (
          <section className="ratio_asos metro-section portfolio-section light-layout section-b-space">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="title4">
                    <br></br>
                    <h3 className="title-inner4"> Favorite Localities</h3>
                    <div className="line">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="no-slider row">
                    {localities.map((locality, index) => (
                      <LocalityItem
                        locality={locality}
                        fetchPlaces={this.props.fetchPlaces}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Locality;
