import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

// Custom Components

import Footer from "./ld/common/footer";
import ThemeSettings from "./common/theme-settings";
import Header from "./ld/common/header";
import { connect } from "react-redux";
import { authCheckState, logout } from "../actions/auth";
import { fetchCart } from "../actions/cart";
import { fetchUser } from "../actions/user";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    // if (this.props.userType === null) {
    //   this.props.fetchUser();
    // }
    // this.props.fetchCart();
    // this.props.fetchUser();
    // console.log("app");
  }

  render() {
    return (
      <div>
        <Header logoName={"logo.png"} />
        {this.props.children}
        <Footer logoName={"logo.png"} />

        {/* <ThemeSettings /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    // cart: state.cart.shoppingCart,
    user: state.user.id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
    // logout: () => dispatch(logout()),
    // fetchCart: () => dispatch(fetchCart()),
    fetchUser: () => dispatch(fetchUser())
  };
};

// export default withTranslate(App);
export default withTranslate(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
