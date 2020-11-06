import React, { Component } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  max-width: 1000px;
  margin-top: 100px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
  @media screen and (max-width: 991px) {
    padding-right: 5px;
    padding-left: 5px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
`;

export const Button = styled.button`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  /* background: #ff5722; */
  background: ${props => (props.outline ? "#ffffff" : "#ff5722")};
  color: ${props => (props.outline ? "ff5722" : "ffffff")};
  width: 250px;
  border: 0;
  padding: 15px;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 35px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  &:hover {
    background: ${props => (props.outline ? "#ff5722" : "#ffffff")};
    color: ${props => (props.outline ? "ffffff" : "ff5722")};
  }
`;

export const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  border: #ff5722;
`;

export const LoadMore = styled.button`
  border: 1px #ff5722 solid;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 20px;
  display: inline-block;
  &:hover {
    background-color: #fff;
    color: #ff5722 !important;
    text-decoration: none;
    border: #ff5722 0.5px solid;
  }
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
  margin: 10px auto 20px auto;
`;

export const StyledInput = styled.input`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  position: relative;
  width: 100%;
  border: 0;
  /* margin: 0 0 15px; */
  margin: 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

export const StyledSelect = styled.select`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  position: relative;
  border: 0;
  width: 200px;
  margin: 5px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
`;

export const StyledDatePicker = styled(DatePicker)`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  position: relative;
  width: 200px;
  border: 0;
  margin: 5px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
`;
