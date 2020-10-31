import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{ margin: 0; padding: 0; box-sizing: border-box; }
*::before, *::after{ box-sizing: inherit; }

 body {
    box-sizing: border-box;
    font-family: 'sans-serif';
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    /* height: 100%; */
    /* padding: 20px 20px; */
    overflow: scroll;
  }
  h1{
  font-size: 30px;
  display:flex;
  align-content:center;
  align-items: center;
  color: #343a40;
  font-weight: 700;
  text-transform: uppercase;
  margin-right: auto;
  padding-left: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  }
  h2{
  font-size: 20px;
  color: $dark-font; 
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em
  }
  h3{
  font-size: 24px;
  font-weight: 400;
  color: #343a40;
  letter-spacing:0.03em;

  }
  h4{
  font-size: 18px;
  text-transform:capitalize;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1;

  }
  h5{
    font-size: 16px;
  font-weight: 400;
  color: $dark-font;
  line-height: 24px;
  letter-spacing: 0.05em;

  }
  h6{
    font-size: 14px;
  font-weight: 400;
  color: $grey;
  line-height: 24px;

  }
  p {
  font-size: 14px;
  color: $grey;
  line-height: 1;
}
a {
  transition: 0.5s ease;
  &:hover {
    text-decoration: none;
    transition: 0.5s ease;
  }
  &:focus {
    outline: none;
  }
}

`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  min-width: 100px;
  border: 1px solid #ff5722;
  background: #fff;
  padding: 7px 14px;
  color: #ff5722;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.7rem;
  text-transform: uppercase;
  &:hover {
    width: auto;
    background: #ff5722;
    color: #fff;
    padding: 7px 14px;
    cursor: pointer;
  }
`;

export default GlobalStyle;
