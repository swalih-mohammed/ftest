import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Pace from "react-pace-progress";
import { authCheckState, logout } from "../../../actions/auth";
import { fetchCart, clearKart } from "../../../actions/cart";
import {
  faBars,
  faHome,
  faCog,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import store from "../../../store";
import SideBar from "./sidebar2";
import { connect } from "react-redux";
import LogoImage from "./logo";
import CartContainer from "../cart/cart-container";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  /*=====================
         Pre loader
         ==========================*/
  componentDidMount() {
    setTimeout(function() {
      document.querySelector(".loader-wrapper").style = "display: none";
    }, 2000);
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }

  render() {
    return (
      <div>
        <header>
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}
          <div className="mobile-fix-option"></div>
          {/*Top Header Component*/}
          {/* <TopBarWhite/> */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="main-menu">
                  <div className="menu-left">
                    <div className="navbar">
                      <a href="javascript:void(0)" onClick={this.openNav}>
                        <div className="bar-style">
                          <FontAwesomeIcon
                            icon={faBars}
                            size={"2x"}
                            color={"black"}
                          />
                        </div>
                      </a>
                      <SideBar />
                    </div>
                    <div className="brand-logo">
                      <LogoImage logo={this.props.logoName} />
                    </div>
                  </div>
                  <div className="menu-right pull-right">
                    {/* <div> */}
                    <div>
                      <div className="icon-nav">
                        <ul>
                          <li className="onhover-div mobile-search">
                            <div>
                              <Link to="/">
                                <i>
                                  <FontAwesomeIcon icon={faHome} />
                                </i>
                                <span className="sub-arrow"></span>
                              </Link>
                            </div>
                          </li>
                          <li className="onhover-div mobile-setting">
                            <div>
                              {this.props.userType === "is_staff_user" ? (
                                <Link
                                  to={`${process.env.PUBLIC_URL}/manage-order-delivery`}
                                >
                                  <i>
                                    <FontAwesomeIcon
                                      icon={faHeart}
                                      size={"lg"}
                                    />
                                  </i>
                                  wishlist
                                </Link>
                              ) : null}
                              {this.props.userType == "ShopOwner" ? (
                                <Link
                                  to={`${process.env.PUBLIC_URL}/shop-order-table`}
                                >
                                  <i>
                                    <FontAwesomeIcon icon={faHeart} />
                                  </i>
                                  wishlist
                                </Link>
                              ) : null}
                              {this.props.userType == "Customer" ? (
                                <Link to={`${process.env.PUBLIC_URL}/Wishlist`}>
                                  <i>
                                    <FontAwesomeIcon icon={faHeart} />
                                  </i>
                                  wishlist
                                </Link>
                              ) : null}
                              {this.props.userType == undefined ? (
                                <Link to={`${process.env.PUBLIC_URL}/Wishlist`}>
                                  <i>
                                    <FontAwesomeIcon icon={faHeart} />
                                  </i>
                                  wishlist
                                </Link>
                              ) : null}
                            </div>
                          </li>
                          {/* Header Cart Component */}
                          <CartContainer />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart
    // userType: state.user.user.UserType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    clearKart: () => dispatch(clearKart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
