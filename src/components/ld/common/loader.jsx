import React, { Component } from "react";
import { css } from "@emotion/core";
import { BeatLoader, MoonLoader } from "react-spinners";
import styled from "styled-components";
const override = css`
  display: flex;
  margin: 0 auto 0 auto;
  border-color: red;
`;

const PageLoaderWrap = styled.div`
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
const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: absolute;
  /* top: 0; */
  left: 0;
  /* bottom: 0; */
  right: 0;
`;

class PageLoader extends Component {
  render() {
    return (
      <PageLoaderWrap>
        <BeatLoader
          css={override}
          size={20}
          color={"#ff5722"}
          loading={this.props.loading}
        />
      </PageLoaderWrap>
    );
  }
}

class Loader extends Component {
  render() {
    return (
      <LoaderWrap>
        <BeatLoader
          css={override}
          size={20}
          color={"#ff5722"}
          loading={this.props.loading}
        />
      </LoaderWrap>
    );
  }
}
class ButtonLoader extends Component {
  render() {
    return (
      <MoonLoader
        css={override}
        size={30}
        color={"#ff5722"}
        loading={this.props.loading}
      />
    );
  }
}
export { PageLoader, Loader, ButtonLoader };
