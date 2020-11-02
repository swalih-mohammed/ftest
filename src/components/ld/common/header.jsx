import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
// import Pace from "react-pace-progress";
import { authCheckState, logout } from "../../../actions/auth";
import { fetchCart, clearKart } from "../../../actions/cart";
import { localhost } from "../../../constants";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import store from "../../../store";
import SideBar from "./sidebar";
import { connect } from "react-redux";
// import Navbar from "react-bootstrap/Navbar";
// import CartContainer from "../cart/cart-container";
import styled from "styled-components";
import Badge from "react-bootstrap/Badge";

const StyledNavbar = styled.nav`
  width: 100%;
  background-color: "#FFFAFA";
  display: flex;
  justify-content: baseline;
  align-items: center;
  /* margin: 2px 5px; */
  padding: 15px 10px;
  height: 80px;
  /* background: #292f36; */
  background-color: #ffffff;
  position: fixed;
  top: 0px;
  z-index: 999;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const LogoContainer = styled.div`
  padding-left: 15px;
  img {
    width: auto;
    height: 40px;
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

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      sideBarIsOpen: false
    };
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  openSidebar = () => {
    this.setState({ sideBarIsOpen: true });
    // console.log(123);
  };
  closeSidebar = () => {
    this.setState({ sideBarIsOpen: false });
    // console.log("123");
  };

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

          <LogoContainer>
            <Link to="">
              <img src={`${localhost}/media/logo/logo.png`} alt="" />
            </Link>
          </LogoContainer>

          <StyledfaShoppingCart>
            <Link to="/order-summary">
              <img src={`${localhost}/media/cart/cart.png`} alt="" />
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
    clearKart: () => dispatch(clearKart),
    fetchCart: () => dispatch(fetchCart)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
