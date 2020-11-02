// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";

// import { SlideUpDown } from "../../../services/script";
// // import LogoImage from "./logo";

// const Title = styled.h4`
//   color: $grey-dark;
//   font-weight: 200;
//   margin-bottom: 0;
//   padding-bottom: 5px;
//   padding-top: 5px;
//   line-height: 1.6;
// `;

// class Footer extends Component {
//   state = {
//     visible: false
//   };
//   componentDidMount() {
//     // setTimeout(() => {
//     //   this.makeVisible();
//     // }, 5000);
//     var contentwidth = window.innerWidth;
//     if (contentwidth < 750) {
//       SlideUpDown("footer-title");
//     } else {
//       var elems = document.querySelectorAll(".footer-title");
//       [].forEach.call(elems, function(elemt) {
//         let el = elemt.nextElementSibling;
//         el.style = "display: block";
//       });
//     }
//   }

//   // makeVisible = () => {
//   //   // console.log("Hello, World!");
//   //   this.setState({ visible: true });
//   // };

//   render() {
//     return (
//       <footer
//         className="footer-light"
//         // style={{ display: this.state.visible ? "" : "none" }}
//       >
//         <div className="light-layout">
//           <div className="container">
//             <section className="small-section border-section border-top-0">
//               <div className="row"></div>
//             </section>
//           </div>
//         </div>
//         <section className="section-b-space light-layout">
//           <div className="container">
//             <div className="row footer-theme partition-f">
//               <div className="col-lg-4 col-md-6">
//                 <div className="footer-title footer-mobile-title">
//                   <h4>Contact us</h4>
//                 </div>
//                 <div className="footer-contant">
//                   <div className="footer-logo">
//                     <LogoImage logo={this.props.logoName} />
//                   </div>
//                   <p>
//                     For Product and billing related queries, please contact
//                     respective shop owners. Local Dukans does not deal with
//                     product quality or shop billing.
//                   </p>
//                   <br></br>
//                   <Title>
//                     <a href="tel: 720 772 41 91">720 772 41 91</a>
//                   </Title>
//                   <Title>
//                     <a href="mailto: localdukans@gmail.com">
//                       localdukans@gmail.com
//                     </a>
//                   </Title>

//                   <div className="footer-social">
//                     <ul>
//                       <li></li>

//                       <li></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </footer>
//     );
//   }
// }

// export default Footer;
