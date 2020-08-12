import React from "react";
import { Link } from "react-router-dom";
import { localhost } from "../../../constants";

function LogoImage(props) {
  return (
    <Link to="/">
      <img
        src={`${localhost}/media/logo/logo.jpg`}
        alt=""
        className="img-fluid"
      />
    </Link>
  );
}

export default LogoImage;
