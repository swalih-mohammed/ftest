import React from "react";
import { Link } from "react-router-dom";
import { localhost } from "../../../constants";
import { Img } from "react-image";
import styled from "styled-components";

const Box = styled.div`
  @media (min-width: 320px) {
    width: 200px;
    height: auto;
  }
`;

function LogoImage(props) {
  return (
    <Box>
      <Link to="/">
        <img
          src={`${localhost}/media/logo/logo.png`}
          alt="logo"
          loading="lazy"
          className="img-fluid"
        />
      </Link>
    </Box>
  );
}

export default LogoImage;
