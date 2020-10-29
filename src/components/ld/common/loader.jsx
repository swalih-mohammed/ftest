import React from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";
const override = css`
  display: flex;
  margin: 0 auto 0 auto;
  border-color: red;
`;

const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

function Loader(props) {
  return (
    <LoaderWrap>
      <BeatLoader
        css={override}
        size={20}
        color={"#ff5722"}
        loading={props.loading}
      />
    </LoaderWrap>
  );
}
export default Loader;
