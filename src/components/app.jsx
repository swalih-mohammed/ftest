import React, { Component, Suspense, lazy } from "react";
// import { withTranslate } from "react-redux-multilingual";

// Custom Components
// import Footer from "./ld/common/footer";
// import { fetchCart } from "../actions/cart";
// import { fetchUser } from "../actions/user";

import Header from "./ld/common/header";
import { connect } from "react-redux";
import { authCheckState, logout, fetchUser } from "../actions/auth";
import Loader from "./ld/common/loader";
const Footer = lazy(() => import("./ld/common/footer"));

// const Header = lazy(() => import("./ld/common/header"));

// const Footer = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import("./ld/common/footer")), 3000);
//   });
// });

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    // this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Header logoName={"logo.png"} />
        {this.props.children}
        <br></br> <br></br>
        <Suspense fallback={<Loader />}>
          <Footer logoName={"logo.png"} />
        </Suspense>
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
    onTryAutoSignup: () => dispatch(authCheckState())
    // fetchUser: () => dispatch(fetchUser())
  };
};

// export default withTranslate(App);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
