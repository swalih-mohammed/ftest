import React from "react";
import { Link } from "react-router-dom";
import { localhost } from "../../../constants";
import { Img } from "react-image";
import styled from "styled-components";

const Box = styled.div`
  padding-top: 0.25em;
  padding-left: 0.5em;
  img {
    /* height: 25px; */
    /* width: 100%; */
    width: 135px;
    height: auto;
  }
  /* @media (min-width: 320px) {
    width: 135px;
    height: auto;
  } */
`;

function LogoImage(props) {
  return (
    <Box>
      <img
        src={`${localhost}/media/logo/logo.png`}
        alt="logo"
        loading="lazy"
        // className="img-fluid"
      />
    </Box>
  );
}

export default LogoImage;
