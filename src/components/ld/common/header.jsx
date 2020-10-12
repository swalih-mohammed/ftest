import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { IntlActions } from "react-redux-multilingual";
import Pace from "react-pace-progress";

// Import custom components
import store from "../../../store";
import { authCheckState, logout } from "../../../actions/auth";
import { fetchCart, clearKart } from "../../../actions/cart";
// import { fetchUser } from "../../../actions/user";
// import NavBar from "./navbar";
import SideBar from "./sidebar2";
// import CartContainer from "./../../../containers/CartContainer";
import CartContainer from "../cart/cart-container";
import TopBar from "./topbar";
import LogoImage from "./logo";
// import { changeCurrency } from "../../../actions";
import { connect } from "react-redux";
import {
  faBars,
  faHome,
  faCog,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    // this.props.clearKart();
    setTimeout(function() {
      document.querySelector(".loader-wrapper").style = "display: none";
    }, 2000);
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed");
      } else document.getElementById("sticky").classList.add("fixed");
    } else {
      document.getElementById("sticky").classList.remove("fixed");
    }
  };
  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
  }

  openNav() {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }
  openSearch() {
    document.getElementById("search-overlay").style.display = "block";
  }

  closeSearch() {
    document.getElementById("search-overlay").style.display = "none";
  }

  load = () => {
    this.setState({ isLoading: true });
    fetch().then(() => {
      // deal with data fetched
      this.setState({ isLoading: false });
    });
  };

  render() {
    // console.log(this.props.cart);
    return (
      <div>
        <header>
          {/* <header id="sticky" className="sticky"> */}
          {/* <header id="sticky" className="sticky header-2 header-6"> */}
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}
          <div className="mobile-fix-option"></div>
          {/*Top Header Component*/}
          {/* <TopBar /> */}

          {/* <div className="container"> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                {/* <div className="main-menu border-section border-top-0"> */}
                <div className="main-menu">
                  <div className="menu-left">
                    <div className="navbar">
                      <a href="javascript:void(0)" onClick={this.openNav}>
                        <div className="bar-style">
                          {" "}
                          {/* <i
                            className="fa fa-bars sidebar-bar"
                            aria-hidden="true"
                          ></i> */}
                          <FontAwesomeIcon
                            icon={faBars}
                            size={"2x"}
                            color={"black"}
                          />
                        </div>
                      </a>
                      {/*SideBar Navigation Component*/}
                      <SideBar />
                    </div>
                  </div>
                  <div className="brand-logo layout4-logo">
                    <LogoImage logo={"Local Dukans"} />
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
          {/* <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-nav-center"></div>
              </div>
            </div>
          </div> */}
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
