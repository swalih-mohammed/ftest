import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SlideUpDown } from "../../../services/script";
import LogoImage from "./logo";

class Footer extends Component {
  state = {
    visible: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.makeVisible();
    }, 5000);
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

  makeVisible = () => {
    console.log("Hello, World!");
    this.setState({ visible: true });
  };

  render() {
    return (
      <footer
        className="footer-light"
        style={{ display: this.state.visible ? "" : "none" }}
      >
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
                    Local Dukans makes you able to sell your product to your own
                    pleople.
                  </p>
                  <br></br>
                  <h4>
                    <a href="tel: 720 772 41 91">Call us: 720 772 41 91</a>
                  </h4>

                  <div className="footer-social">
                    <ul>
                      <li></li>

                      <li></li>
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
