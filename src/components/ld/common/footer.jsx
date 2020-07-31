import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SlideUpDown } from "../../../services/script";
import LogoImage from "./logo";

class Footer extends Component {
  componentDidMount() {
    var contentwidth = window.innerWidth;
    if (contentwidth < 750) {
      SlideUpDown("footer-title");
    } else {
      var elems = document.querySelectorAll(".footer-title");
      [].forEach.call(elems, function(elemt) {
        let el = elemt.nextElementSibling;
        el.style = "display: block";
      });
    }
  }

  render() {
    return (
      <footer className="footer-light">
        <div className="light-layout">
          <div className="container">
            <section className="small-section border-section border-top-0">
              <div className="row"></div>
            </section>
          </div>
        </div>
        <section className="section-b-space light-layout">
          <div className="container">
            <div className="row footer-theme partition-f">
              <div className="col-lg-4 col-md-6">
                <div className="footer-title footer-mobile-title">
                  <h4>Contact us</h4>
                </div>
                <div className="footer-contant">
                  <div className="footer-logo">
                    <LogoImage logo={this.props.logoName} />
                  </div>
                  <p>
                    Local Dukans makes you able to sell your production to your
                    own pleople,
                  </p>
                  <h4>call us: 720 772 41 91</h4>

                  <div className="footer-social">
                    <ul>
                      <li>
                        {/* <Link to={"https://www.facebook.com/"}>
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                        </Link> */}
                      </li>

                      <li>
                        {/* <Link to={"https://instagram.com"}>
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </Link> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
