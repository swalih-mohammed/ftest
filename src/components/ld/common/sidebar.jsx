import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { fetchUser, clearUser } from "../../../actions/user";
import { logout } from "../../../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sidebar.css";

const StyledSideNav = styled.div`
  background-color: #fffafa;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-x: hidden;
  z-index: 1;
  left: 0;
  top: 0;
  left: -100%;
  transition: 850ms;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  ${({ isOpen }) =>
    isOpen &&
    `
    left: 0;
    transition: 350ms;
  `}
`;

const StyledCloseBarBox = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-right: auto;
  margin-top: 1em;
`;

const StyledCloseBar = styled(FontAwesomeIcon)`
  display: flex;
  margin-left: auto;
  margin-right: 1em;
  margin-top: 1em;
`;
const StyledNavItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 5rem;
  padding-bottom: 5rem;
  margin-left: auto;
  transform: translateX(0);
  transition: transform 0.1s 0s;
`;

const StyledNavItem = styled(Link)`
  padding-bottom: 0.5rem;
  text-decoration: none;
  color: #111;
  font-size: 1rem;
`;

const SideBar = props => {
  const logOut = () => {
    props.close();
    props.logout();
    toast.error("You have logged out");
    this.props.clearUser();
    window.location.reload();
  };
  const refresh = () => {
    props.close();
    window.location.reload();
  };
  const isOpen = props.open;
  // console.log(props.user);
  return (
    <>
      <StyledSideNav isOpen={isOpen}>
        <StyledCloseBarBox>
          <FontAwesomeIcon
            icon={faTimes}
            color={"#606060"}
            onClick={props.close}
          />
        </StyledCloseBarBox>

        <StyledNavItemBox>
          {props.token ? (
            <>
              <StyledNavItem to="/orders" onClick={props.close}>
                My Orders
              </StyledNavItem>
              <StyledNavItem to="/addresses" onClick={props.close}>
                Address
              </StyledNavItem>
              {props.user ? (
                <>
                  {props.user.user.is_shop_owner ? (
                    <StyledNavItem to="/shop-dashboard" onClick={props.close}>
                      My Shop
                    </StyledNavItem>
                  ) : null}
                </>
              ) : null}

              {props.user ? (
                <>
                  {props.user.user.is_staff_user ? (
                    <StyledNavItem
                      to="/manage-order-delivery"
                      onClick={props.close}
                    >
                      Manage Delivery
                    </StyledNavItem>
                  ) : null}
                </>
              ) : null}

              <StyledNavItem to="/" onClick={logOut}>
                Log out
              </StyledNavItem>
            </>
          ) : (
            <>
              <StyledNavItem to="/login" onClick={props.close}>
                Login
              </StyledNavItem>
              <StyledNavItem to="/login" onClick={props.close}>
                Register
              </StyledNavItem>
            </>
          )}
        </StyledNavItemBox>
      </StyledSideNav>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout),
    clearUser: () => dispatch(clearUser)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
