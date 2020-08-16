import React from "react";
import { Link } from "react-router-dom";
import { localhost } from "../../../constants";
import { Img } from "react-image";

function LogoImage(props) {
  return (
    <Link to="/">
      <img
        src={`${localhost}/media/logo/ld4.jpg`}
        // src="/media/logo/ld4.jpg"
        alt="logo"
        loading="lazy"
        className="img-fluid"
      />

      {/* <Img
        // className="img-fluid lazyload bg-img"
        loading="lazy"
        src={"/media/logo/ld4.jpg"}
        loader={<div className="loading-cls"></div>}
      /> */}
    </Link>
  );
}

export default LogoImage;
