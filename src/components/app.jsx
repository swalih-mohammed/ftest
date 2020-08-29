import React, { Component, Suspense } from "react";
import { withTranslate } from "react-redux-multilingual";

// Custom Components

import Footer from "./ld/common/footer";
// import ThemeSettings from "./common/theme-settings";
import Header from "./ld/common/header";
import { connect } from "react-redux";
import { authCheckState, logout, fetchUser } from "../actions/auth";
import { fetchCart } from "../actions/cart";
import Loader from "./ld/common/loader";
// import { fetchUser } from "../actions/user";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Header logoName={"logo.png"} />
        <Suspense fallback={<Loader />}>
        {this.props.children}
        </Suspense>
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
