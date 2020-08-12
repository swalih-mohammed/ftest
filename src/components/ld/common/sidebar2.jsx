import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchUser, clearUser } from "../../../actions/user";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Sidebar extends Component {
  state = {
    logoutSuccess: false
  };

  componentDidMount() {
    // this.props.fetchUserType();
  }

  closeNav() {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  }

  logOut = () => {
    this.closeNav();
    this.props.logout();
    toast.error("You have logged out");
    this.props.clearUser();
    window.location.reload();
  };

  // handleSubmenu = event => {
  //   if (event.target.classList.contains("sub-arrow")) return;

  //   if (event.target.nextElementSibling.classList.contains("opensub1"))
  //     event.target.nextElementSibling.classList.remove("opensub1");
  //   else {
  //     document.querySelectorAll(".opensub1").forEach(function(value) {
  //       value.classList.remove("opensub1");
  //     });
  //     event.target.nextElementSibling.classList.add("opensub1");
  //   }
  // };

  // handleSubTwoMenu = event => {
  //   if (event.target.classList.contains("sub-arrow")) return;

  //   if (event.target.nextElementSibling.classList.contains("opensub2"))
  //     event.target.nextElementSibling.classList.remove("opensub2");
  //   else {
  //     document.querySelectorAll(".opensub2").forEach(function(value) {
  //       value.classList.remove("opensub2");
  //     });
  //     event.target.nextElementSibling.classList.add("opensub2");
  //   }
  // };

  // handleSubThreeMenu = event => {
  //   if (event.target.classList.contains("sub-arrow")) return;

  //   if (event.target.nextElementSibling.classList.contains("opensub3"))
  //     event.target.nextElementSibling.classList.remove("opensub3");
  //   else {
  //     document.querySelectorAll(".opensub3").forEach(function(value) {
  //       value.classList.remove("opensub3");
  //     });
  //     event.target.nextElementSibling.classList.add("opensub3");
  //   }
  // };
  // handleSubFourMenu = event => {
  //   if (event.target.classList.contains("sub-arrow")) return;

  //   if (event.target.nextElementSibling.classList.contains("opensub4"))
  //     event.target.nextElementSibling.classList.remove("opensub4");
  //   else {
  //     document.querySelectorAll(".opensub4").forEach(function(value) {
  //       value.classList.remove("opensub4");
  //     });
  //     event.target.nextElementSibling.classList.add("opensub4");
  //   }
  // };

  // handleMegaSubmenu = event => {
  //   if (event.target.classList.contains("sub-arrow")) return;

  //   if (event.target.nextElementSibling.classList.contains("opensidesubmenu"))
  //     event.target.nextElementSibling.classList.remove("opensidesubmenu");
  //   else {
  //     event.target.nextElementSibling.classList.add("opensidesubmenu");
  //   }
  // };

  render() {
    // console.log(this.props.fetchUserType);
    // console.log("prinin side bar");
    // if (this.state.logoutSuccess) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div id="mySidenav" className="sidenav">
        <ToastContainer />
        <a
          href="javascript:void(0)"
          className="sidebar-overlay"
          onClick={this.closeNav}
        ></a>
        <nav>
          <a onClick={this.closeNav}>
            <div className="sidebar-back text-left">
              {/* <i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back */}
              <i>
                <FontAwesomeIcon icon={faAngleLeft} /> Back
              </i>
            </div>
          </a>
          <ul id="sub-menu" className="sidebar-menu">
            {this.props.userType ? (
              <div>
                {this.props.userType === "Customer" ? (
                  <div>
                    <li>
                      <Link to="/orders" onClick={this.closeNav}>
                        Hello ! {this.props.userName}
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" onClick={this.closeNav}>
                        My orders
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/addresses" onClick={this.closeNav}>
                        <span>
                          <i className="sub-arrow" aria-hidden="true"></i>
                        </span>
                        Address
                      </Link>
                    </li>
                  </div>
                ) : null}

                {/* customer end  */}
                {this.props.userType === "ShopOwner" ? (
                  <div>
                    <li>
                      <Link to="/orders" onClick={this.closeNav}>
                        Hello ! {this.props.userName}
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-product-list" onClick={this.closeNav}>
                        Shop Products
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-order-table" onClick={this.closeNav}>
                        Shop Orders
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                  </div>
                ) : null}

                {/* shop owner end */}

                {this.props.userType == "is_staff_user" ? (
                  <div>
                    <li>
                      <Link to="/orders" onClick={this.closeNav}>
                        Hello ! {this.props.userName}
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manage-order-delivery" onClick={this.closeNav}>
                        Manage Delivery
                        <span className="sub-arrow"></span>
                      </Link>
                    </li>
                  </div>
                ) : null}
                {/* staf end  */}
              </div>
            ) : null}
            {/* user type exist  */}

            <div>
              <li>
                <Link to="/add-shop" onClick={this.closeNav}>
                  Add your shop
                  <span className="sub-arrow"></span>
                </Link>
              </li>
              <li>
                <Link to="/add-complaint" onClick={this.closeNav}>
                  Contact Us
                  <span className="sub-arrow"></span>
                </Link>
              </li>
              {this.props.token ? (
                <li onClick={this.logOut}>
                  <Link to="/">Logout</Link>
                </li>
              ) : (
                <div>
                  <li>
                    <Link to="/login" onClick={this.closeNav}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={this.closeNav}>
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.user.user.UserType,
    userName: state.user.user.userName,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserType: () => dispatch(fetchUser()),
    logout: () => dispatch(logout),
    clearUser: () => dispatch(clearUser)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
