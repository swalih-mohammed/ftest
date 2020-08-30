import React, { Component, Suspense, lazy } from "react";
import { withTranslate } from "react-redux-multilingual";

// Custom Components
// import Footer from "./ld/common/footer";
// import { fetchCart } from "../actions/cart";
// import { fetchUser } from "../actions/user";

import Header from "./ld/common/header";
import { connect } from "react-redux";
import { authCheckState, logout, fetchUser } from "../actions/auth";
import Loader from "./ld/common/loader";
const Footer = lazy(() => import("./ld/common/footer"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Header logoName={"logo.png"} />
        {/* <Suspense fallback={<Loader />}> */}
        {this.props.children}
        {/* </Suspense> */}
         <Suspense fallback={<Loader />}>
        <Footer logoName={"logo.png"} />
          </Suspense>
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
    // fetchUser: () => dispatch(fetchUser())
  };
};

// export default withTranslate(App);
export default withTranslate(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
