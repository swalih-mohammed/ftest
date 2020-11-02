import React, { Component } from "react";
import styled from "styled-components";

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
  background: #ff5722;
  width: 250px;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 35px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  &:hover {
    background: #ff5722;
    color: #ffffff;
  }
`;

export const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

export const LoadMore = styled.div`
  background-color: #ff5722;
  color: #343a40 !important;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 20px;
  display: inline-block;
  &:hover {
    background-color: #fff;
    color: #ff5722 !important;
    text-decoration: none;
    border: #ff5722 0.5px solid;
  }
`;
