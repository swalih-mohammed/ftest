import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class TopBar extends Component {
  // handleLogout = () => {};
  state = {
    success: false
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
    toast.error("You have logged out");
    this.setState({ success: true });
  };
  render() {
    if (this.state.success) {
      return <Redirect to="/addresses" />;
    }
    // const { translate } = this.props;

    return (
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="header-contact">
                <ul>
                  <li>
                    {/* {translate("topbar_title", { theme_name: " Multikart" })} */}
                    Local Dukans
                  </li>
                  <li>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    {/* {translate("call_us")}: 123 - 456 - 7890 */}
                    call us: 720772 4191
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <ul className="header-dropdown">
                <li className="mobile-wishlist compare-mobile">
                  {/* <Link to={`${process.env.PUBLIC_URL}/compare`}>
                    <i className="fa fa-random" aria-hidden="true"></i>
                    {translate("compare")}
                  </Link> */}
                </li>
                <li className="mobile-wishlist">
                  {this.props.userType == "is_staff_user" ? (
                    <Link
                      to={`${process.env.PUBLIC_URL}/manage-order-delivery`}
                    >
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      {/* {translate("wishlist")} */}
                      wishlist
                    </Link>
                  ) : null}
                  {this.props.userType == "ShopOwner" ? (
                    <Link to={`${process.env.PUBLIC_URL}/shop-order-table`}>
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      {/* {translate("wishlist")} */}
                      wishlist
                    </Link>
                  ) : null}
                  {this.props.userType == "Customer" ? (
                    <Link to={`${process.env.PUBLIC_URL}/Wishlist`}>
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      {/* {translate("wishlist")} */}
                      wishlist
                    </Link>
                  ) : null}
                </li>
                <li className="onhover-dropdown mobile-account">
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  {/* {translate("my_account")} */}
                  My account
                  <ul className="onhover-show-div">
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/login`}
                        data-lng="en"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/register`}
                        data-lng="en"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={this.handleLogout}
                        to={`${process.env.PUBLIC_URL}/`}
                        data-lng="en"
                      >
                        Logout
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        onClick={this.handleLogout}
                        to={`${process.env.PUBLIC_URL}/forgetpassword`}
                        data-lng="en"
                      >
                        Password Reset
                      </Link>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default withTranslate(
//   connect(
//     null,
//     mapDispatchToProps(TopBar)
//   )
// );

// export default connect(
//   null,
//   mapDispatchToProps(TopBar)
// );
// export default TopBar;

const mapStateToProps = state => {
  return {
    userType: state.user.user.UserType,
    userName: state.user.user.userName
    // token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
    // fetchCart: () => dispatch(fetchCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);

// export default TopBar;
