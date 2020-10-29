import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Pace from "react-pace-progress";
import { authCheckState, logout } from "../../../actions/auth";
import { fetchCart, clearKart } from "../../../actions/cart";
import { localhost } from "../../../constants";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import store from "../../../store";
import SideBar from "./sidebar";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import LogoImage from "./logo";
import CartContainer from "../cart/cart-container";
import styled from "styled-components";
import Badge from "react-bootstrap/Badge";

const StyledNavbar = styled(Navbar)`
  display: flex;
  align-items: center;
  background: "#FFFAFA";
  /* margin: 20 5px 10px 0; */
  padding: 10px;
  margin-bottom: 35px;

  /* overflow-x: hidden; */
  /* position: fixed; */
  top: 0;
  /* width: 100%; */
  z-index: 1;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const ImageContainer = styled.div`
  padding-top: 0.25em;
  padding-left: 0.5em;
  @media (min-width: 320px) {
    width: 135px;
    height: auto;
  }
`;

const StyledfaShoppingCart = styled.div`
  display: flex;
  margin-left: auto;
`;

const StyledfaMenuIcon = styled.div`
  display: flex;
  margin-right: 2px;
  padding-right: 5px;
`;

const StyledCartlabel = styled.div`
  /* position: absolute; */
  /* background: "#ff4c3b"; */
  width: 20px;
  height: 20px;
  color: #ff4c3b;
  border-radius: 20px;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  /* top: 20%; */
  right: -8px;
  padding: 3px;
  background-color: "#ff4c3b";
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      sideBarIsOpen: false
    };
  }

  // componentDidMount() {
  //   setTimeout(function() {
  //     document.querySelector(".loader-wrapper").style = "display: none";
  //   }, 2000);
  // }

  openSidebar = () => {
    this.setState({ sideBarIsOpen: true });
    console.log(123);
  };
  closeSidebar = () => {
    this.setState({ sideBarIsOpen: false });
    console.log("123");
  };

  openNav() {
    console.log("clikc");
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  }

  render() {
    // console.log(this.state.sideBarIsOpen);
    // console.log("testing");
    const cart = this.props.cart;
    return (
      <>
        <StyledNavbar>
          <StyledfaMenuIcon>
            <FontAwesomeIcon
              icon={faBars}
              size={"2x"}
              color={"#606060"}
              onClick={this.openSidebar}
            />
          </StyledfaMenuIcon>

          <SideBar open={this.state.sideBarIsOpen} close={this.closeSidebar} />

          <Navbar.Brand href="/">
            <LogoImage />
          </Navbar.Brand>

          <StyledfaShoppingCart>
            <Link to="/order-summary">
              <img
                src={`${localhost}/media/cart/cart.png`}
                className="img-fluid"
                alt=""
              />
            </Link>
            {cart ? (
              <>
                <h4>
                  <Badge variant="danger">
                    {cart.order_items ? cart.order_items.length : 0}
                  </Badge>
                </h4>
              </>
            ) : null}
          </StyledfaShoppingCart>
        </StyledNavbar>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart
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
