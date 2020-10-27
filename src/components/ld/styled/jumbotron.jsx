import React from "react";
import styled from "styled-components";

export const Title = styled.h1`
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5d4037;
  text-align: center;
`;
export const Subheading = styled.p`
  line-height: 1.5em;
`;
export const Container = styled.div`
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
`;

export const Card = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  background-color: #333;
  background-image: url(${props => props.imgurl});
  background-size: cover;
  margin: 0 5px 30px 5px;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
export const CardInfo = styled.div`
  padding: 5px;
  position: absolute;
  bottom: 0;
  color: #fff;
`;

export const CardTitle = styled.h1`
  text-shadow: 0 1px 0 black;
  font-family: "Playfair Display";
  color: #fff;
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`;

export const StyledCover = styled.div`
  position: relative;
  height: 40vh;
  margin-left: 0;
  margin-right: 0;
  background-image: url(${props => props.imgurl});
  background-size: cover;
  background-position: center;
`;
