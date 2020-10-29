import React, { Component, Suspense, lazy } from "react";
// import { withTranslate } from "react-redux-multilingual";

import Header from "./ld/common/header";
import { connect } from "react-redux";
import { authCheckState } from "../actions/auth";
import Loader from "./ld/common/loader";
const Footer = lazy(() => import("./ld/common/footer"));
// import styled from "styled-components";
// import Loader from "../common/loader";

// const Footer = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import("./ld/common/footer")), 1000);
//   });
// });

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
      <>
        {}
        <Header logoName={"logo.png"} />
        {this.props.children}
        {/* <br></br> <br></br> */}
        {/* <Suspense fallback={<Loader />}> */}
        {/* <Footer logoName={"logo.png"} /> */}
        {/* </Suspense> */}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
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
