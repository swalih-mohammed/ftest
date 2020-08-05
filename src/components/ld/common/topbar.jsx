import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import { faHeart, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                    faPhone
                    <FontAwesomeIcon icon={faPhone} size={"lg"} />
                    {/* <i className="fa fa-phone" aria-hidden="true"></i> */}
                    {/* {translate("call_us")}: 123 - 456 - 7890 */}
                    call us: 720 772 4191
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <ul className="header-dropdown">
                <li className="mobile-wishlist">
                  {/* {this.props.userType == "is_staff_user" ? (
                    <Link
                      to={`${process.env.PUBLIC_URL}/manage-order-delivery`}
                    >
                      <li>
                        <FontAwesomeIcon icon={faHeart} size={"2x"} />
                      </li>
                      wishlist
                    </Link>
                  ) : null}
                  {this.props.userType == "ShopOwner" ? (
                    <Link to={`${process.env.PUBLIC_URL}/shop-order-table`}>
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
                  ) : null} */}
                </li>
              </ul>
            </div>
          </div>
        </div>
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
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
