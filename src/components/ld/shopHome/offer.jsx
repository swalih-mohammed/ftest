import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 200px;
  margin: 5px auto;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 5px auto;
  p {
    color: #ff5500;
    font-size: 25px;
    line-height: 2rem;
  }
`;

class Offer extends Component {
  render() {
    return (
      <>
        <Card>
          <svg
            width="320"
            height="200"
            viewBox="0 0 1143 584"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.1"
              d="M840.37 573.94C852.57 573.94 862.46 560.997 862.46 545.03C862.46 529.064 852.57 516.12 840.37 516.12C828.17 516.12 818.28 529.064 818.28 545.03C818.28 560.997 828.17 573.94 840.37 573.94Z"
              fill="#3F3D56"
            />
            <path
              opacity="0.1"
              d="M840.37 397.26C852.57 397.26 862.46 384.316 862.46 368.35C862.46 352.383 852.57 339.44 840.37 339.44C828.17 339.44 818.28 352.383 818.28 368.35C818.28 384.316 828.17 397.26 840.37 397.26Z"
              fill="#3F3D56"
            />
            <path
              opacity="0.1"
              d="M840.37 361.92C852.57 361.92 862.46 348.977 862.46 333.01C862.46 317.043 852.57 304.1 840.37 304.1C828.17 304.1 818.28 317.043 818.28 333.01C818.28 348.977 828.17 361.92 840.37 361.92Z"
              fill="#3F3D56"
            />
            <path
              d="M1143 556.22C1143 563.09 1092.78 569.37 1009.75 574.22C994.65 575.09 978.47 575.92 961.31 576.7C946.483 577.367 930.943 577.997 914.69 578.59C898.943 579.15 882.593 579.67 865.64 580.15C812.1 581.68 752.91 582.78 690.03 583.33C674.77 583.47 659.307 583.577 643.64 583.65C627.32 583.723 610.813 583.757 594.12 583.75C290.98 583.75 45.25 571.44 45.25 556.25C45.25 541.06 290.98 528.75 594.12 528.75C724.63 528.75 844.48 531.04 938.68 534.84L948.98 535.26H949.04C1067.7 540.29 1143 547.86 1143 556.22Z"
              fill="#3F3D56"
            />
            <path
              opacity="0.15"
              d="M1143 556.22C1143 563.09 1092.78 569.37 1009.75 574.22C994.65 575.09 978.47 575.92 961.31 576.7C946.483 577.367 930.943 577.997 914.69 578.59C898.943 579.15 882.593 579.67 865.64 580.15C812.1 581.68 752.91 582.78 690.03 583.33C674.77 583.47 659.307 583.577 643.64 583.65C627.32 583.723 610.813 583.757 594.12 583.75C290.98 583.75 45.25 571.44 45.25 556.25C45.25 541.06 290.98 528.75 594.12 528.75C724.63 528.75 844.48 531.04 938.68 534.84L948.98 535.26H949.04C1067.7 540.29 1143 547.86 1143 556.22Z"
              fill="black"
            />
            <path
              d="M1097.75 551.38C1097.75 557.12 1047.53 562.38 964.5 566.38C949.41 567.11 933.22 567.8 916.07 568.45C901.237 569.01 885.697 569.537 869.45 570.03C853.703 570.497 837.353 570.933 820.4 571.34C766.85 572.62 707.66 573.54 644.78 574C629.533 574.113 614.07 574.2 598.39 574.26C582.07 574.32 565.567 574.35 548.88 574.35C245.74 574.35 0 564.06 0 551.35C0 538.64 245.74 528.35 548.88 528.35C679.38 528.35 799.23 530.26 893.43 533.44L903.73 533.79H903.8C1022.5 538.06 1097.75 544.35 1097.75 551.38Z"
              fill="#3F3D56"
            />
            <path
              d="M683.11 277.62C648.99 277.62 622.1 264.077 602.44 236.99C582.78 209.903 572.95 177.09 572.95 138.55C572.95 99.75 582.457 67.0033 601.47 40.31C620.483 13.6166 647.303 0.28331 681.93 0.309976C718.65 0.309976 746.317 14.3733 764.93 42.5C783.543 70.6266 792.853 103.18 792.86 140.16C792.86 176.873 783.227 208.967 763.96 236.44C744.693 263.913 717.743 277.64 683.11 277.62ZM684.11 247.15C706.557 247.15 723.333 237.367 734.44 217.8C745.547 198.233 751.1 173.567 751.1 143.8C751.1 110.667 745.417 83.5366 734.05 62.41C722.683 41.2833 705.25 30.7167 681.75 30.71C637.083 30.71 614.75 66.19 614.75 137.15C614.75 210.49 637.863 247.157 684.09 247.15H684.11ZM695.35 538.94H646L969.08 5.73998H1017.5L695.35 538.94ZM981.17 544.41C946.537 544.41 919.537 530.743 900.17 503.41C880.803 476.077 871.08 443.26 871 404.96C871 366.42 880.44 333.803 899.32 307.11C918.2 280.417 945.087 267.083 979.98 267.11C1016.44 267.11 1043.91 281.173 1062.4 309.3C1080.89 337.427 1090.13 369.977 1090.14 406.95C1090.14 443.423 1080.57 475.457 1061.43 503.05C1042.29 530.643 1015.53 544.43 981.15 544.41H981.17ZM981.75 513.16C1004.09 513.16 1020.78 503.543 1031.81 484.31C1042.84 465.077 1048.36 440.51 1048.36 410.61C1048.36 378.61 1042.78 351.773 1031.61 330.1C1020.44 308.427 1003.05 297.573 979.42 297.54C934.493 297.54 912.03 333.02 912.03 403.98C912.017 476.773 935.25 513.167 981.73 513.16H981.75Z"
              fill="#3F3D56"
            />
            <path
              d="M683.11 277.62C648.99 277.62 622.1 264.077 602.44 236.99C582.78 209.903 572.95 177.09 572.95 138.55C572.95 99.75 582.457 67.0033 601.47 40.31C620.483 13.6166 647.303 0.28331 681.93 0.309976C718.65 0.309976 746.317 14.3733 764.93 42.5C783.543 70.6266 792.853 103.18 792.86 140.16C792.86 176.873 783.227 208.967 763.96 236.44C744.693 263.913 717.743 277.64 683.11 277.62ZM684.11 247.15C706.557 247.15 723.333 237.367 734.44 217.8C745.547 198.233 751.1 173.567 751.1 143.8C751.1 110.667 745.417 83.5366 734.05 62.41C722.683 41.2833 705.25 30.7167 681.75 30.71C637.083 30.71 614.75 66.19 614.75 137.15C614.75 210.49 637.863 247.157 684.09 247.15H684.11ZM695.35 538.94H646L969.08 5.73998H1017.5L695.35 538.94ZM981.17 544.41C946.537 544.41 919.537 530.743 900.17 503.41C880.803 476.077 871.08 443.26 871 404.96C871 366.42 880.44 333.803 899.32 307.11C918.2 280.417 945.087 267.083 979.98 267.11C1016.44 267.11 1043.91 281.173 1062.4 309.3C1080.89 337.427 1090.13 369.977 1090.14 406.95C1090.14 443.423 1080.57 475.457 1061.43 503.05C1042.29 530.643 1015.53 544.43 981.15 544.41H981.17ZM981.75 513.16C1004.09 513.16 1020.78 503.543 1031.81 484.31C1042.84 465.077 1048.36 440.51 1048.36 410.61C1048.36 378.61 1042.78 351.773 1031.61 330.1C1020.44 308.427 1003.05 297.573 979.42 297.54C934.493 297.54 912.03 333.02 912.03 403.98C912.017 476.773 935.25 513.167 981.73 513.16H981.75Z"
              fill="#3F3D56"
            />
            <path
              opacity="0.15"
              d="M683.11 277.62C648.99 277.62 622.1 264.077 602.44 236.99C582.78 209.903 572.95 177.09 572.95 138.55C572.95 99.75 582.457 67.0033 601.47 40.31C620.483 13.6166 647.303 0.28331 681.93 0.309976C718.65 0.309976 746.317 14.3733 764.93 42.5C783.543 70.6266 792.853 103.18 792.86 140.16C792.86 176.873 783.227 208.967 763.96 236.44C744.693 263.913 717.743 277.64 683.11 277.62ZM684.11 247.15C706.557 247.15 723.333 237.367 734.44 217.8C745.547 198.233 751.1 173.567 751.1 143.8C751.1 110.667 745.417 83.5366 734.05 62.41C722.683 41.2833 705.25 30.7167 681.75 30.71C637.083 30.71 614.75 66.19 614.75 137.15C614.75 210.49 637.863 247.157 684.09 247.15H684.11ZM695.35 538.94H646L969.08 5.73998H1017.5L695.35 538.94ZM981.17 544.41C946.537 544.41 919.537 530.743 900.17 503.41C880.803 476.077 871.08 443.26 871 404.96C871 366.42 880.44 333.803 899.32 307.11C918.2 280.417 945.087 267.083 979.98 267.11C1016.44 267.11 1043.91 281.173 1062.4 309.3C1080.89 337.427 1090.13 369.977 1090.14 406.95C1090.14 443.423 1080.57 475.457 1061.43 503.05C1042.29 530.643 1015.53 544.43 981.15 544.41H981.17ZM981.75 513.16C1004.09 513.16 1020.78 503.543 1031.81 484.31C1042.84 465.077 1048.36 440.51 1048.36 410.61C1048.36 378.61 1042.78 351.773 1031.61 330.1C1020.44 308.427 1003.05 297.573 979.42 297.54C934.493 297.54 912.03 333.02 912.03 403.98C912.017 476.773 935.25 513.167 981.73 513.16H981.75Z"
              fill="black"
            />
            <path
              d="M652.11 277.62C617.99 277.62 591.1 264.077 571.44 236.99C551.78 209.903 541.95 177.09 541.95 138.55C541.95 99.75 551.457 67.0033 570.47 40.31C589.483 13.6166 616.303 0.28331 650.93 0.309976C687.65 0.309976 715.317 14.3733 733.93 42.5C752.543 70.6266 761.853 103.18 761.86 140.16C761.86 176.873 752.227 208.967 732.96 236.44C713.693 263.913 686.743 277.64 652.11 277.62ZM653.11 247.15C675.557 247.15 692.333 237.367 703.44 217.8C714.547 198.233 720.1 173.567 720.1 143.8C720.1 110.667 714.417 83.5366 703.05 62.41C691.683 41.2833 674.25 30.7167 650.75 30.71C606.083 30.71 583.75 66.19 583.75 137.15C583.75 210.49 606.863 247.157 653.09 247.15H653.11ZM664.35 538.94H615L938.08 5.73998H986.5L664.35 538.94ZM950.17 544.41C915.537 544.41 888.537 530.743 869.17 503.41C849.803 476.077 840.08 443.26 840 404.96C840 366.42 849.44 333.803 868.32 307.11C887.2 280.417 914.087 267.083 948.98 267.11C985.44 267.11 1012.91 281.173 1031.4 309.3C1049.89 337.427 1059.13 369.977 1059.14 406.95C1059.14 443.423 1049.57 475.457 1030.43 503.05C1011.29 530.643 984.53 544.43 950.15 544.41H950.17ZM950.75 513.16C973.09 513.16 989.777 503.543 1000.81 484.31C1011.84 465.077 1017.36 440.51 1017.36 410.61C1017.36 378.61 1011.78 351.773 1000.61 330.1C989.443 308.427 972.04 297.573 948.4 297.54C903.473 297.54 881.01 333.02 881.01 403.98C881.01 476.773 904.25 513.167 950.73 513.16H950.75Z"
              fill="#3F3D56"
            />
            <path
              opacity="0.1"
              d="M1080.32 513.86C1078.06 518.31 1074.17 521.72 1069.46 523.383C1064.75 525.047 1059.58 524.837 1055.03 522.797C1050.47 520.757 1046.87 517.043 1044.97 512.424C1043.08 507.805 1043.03 502.634 1044.84 497.98C1046.44 499.034 1047.88 500.318 1049.11 501.79C1050.96 504.05 1052.18 506.61 1054.32 508.71C1058.32 512.61 1064.72 514.22 1070.44 514.37C1073.74 514.397 1077.04 514.227 1080.32 513.86V513.86Z"
              fill="black"
            />
            <path
              d="M490.98 535.58C491.91 538.657 493.056 541.664 494.41 544.58C498.303 543.765 502.133 542.673 505.87 541.31C505.147 540.183 504.352 539.104 503.49 538.08C502.571 537.059 501.473 536.215 500.25 535.59C499.06 535.07 497.59 535.46 496.32 535.53C494.54 535.597 492.76 535.613 490.98 535.58Z"
              fill="#FBBEBE"
            />
            <path
              opacity="0.1"
              d="M638.68 347.536C639.769 342.153 645.711 339.594 652.332 341.56C653.102 335.097 655.562 329.205 659.278 324.922C662.994 320.64 667.727 318.243 672.641 318.155C673.098 318.155 673.555 318.155 674 318.155C672.101 317.383 670.126 316.994 668.141 317C663.227 317.088 658.494 319.485 654.778 323.768C651.062 328.05 648.602 333.942 647.832 340.405C641.269 338.439 635.269 340.998 634.18 346.381C633.008 352.014 637.695 358.598 644.633 361.095C645.923 361.571 647.246 361.874 648.582 362C641.996 359.441 637.566 353.044 638.68 347.536Z"
              fill="black"
            />
            <path
              d="M392.347 508.405C393.811 513.883 395.614 519.236 397.744 524.424C403.864 522.969 409.885 521.018 415.761 518.589C415.942 518.514 412.391 513.234 412.018 512.802C410.611 511.175 408.79 509.273 406.93 508.354C405.055 507.426 402.744 508.134 400.737 508.25C397.943 508.413 395.146 508.464 392.347 508.405Z"
              fill="#FBBEBE"
            />
            <path
              d="M406.962 516.696C403.901 515.607 402.041 512.106 400.796 508.729C399.551 505.352 398.547 501.67 396.185 499.192C395.28 499.242 394.552 500.077 394.104 500.977C393.656 501.878 393.39 502.892 392.872 503.742C391.887 505.36 390.156 506.142 388.918 507.514C387.62 508.952 386.91 510.986 385.567 512.369C383.879 514.105 381.493 514.536 379.279 515.11C375.854 516 372.546 517.394 369.438 519.258C368.294 520.042 367.07 520.665 365.793 521.115C364.388 521.421 362.95 521.476 361.53 521.276L351.74 520.483C350.868 520.356 349.984 520.4 349.126 520.613C347.114 521.256 345.864 523.809 346.012 526.192C346.16 528.574 347.464 530.709 349.11 532.18C350.814 533.566 352.694 534.649 354.686 535.391C363.214 539.051 371.994 541.902 380.937 543.915L380.941 546.118C387.159 549.594 393.995 551.403 400.925 551.407C401.437 551.451 401.951 551.35 402.42 551.113C403.107 550.689 403.426 549.776 403.68 548.932C406.029 541.124 407.403 532.98 407.763 524.738C407.937 522.648 407.794 520.54 407.342 518.505C406.808 516.502 408.644 517.344 406.946 516.559"
              fill="#2F2E41"
            />
            <path
              d="M448.076 510.011C452.62 511.774 457.204 513.395 461.827 514.873C464.415 510.043 469.256 506.682 470.36 501.16C470.428 500.919 470.428 500.661 470.36 500.42C470.242 500.184 470.06 499.998 469.84 499.891C466.528 497.805 462.851 496.58 459.073 496.304C456.089 496.09 454.728 499.631 453.375 502.12C452.828 503.128 449.292 510.483 448.076 510.011Z"
              fill="#FBBEBE"
            />
            <path
              d="M454.445 506.485C451.762 505.846 449.136 504.206 447.766 501.493C447.124 500.221 446.441 498.507 445.16 498.603C443.971 498.693 443.424 500.306 443.156 501.634C442.153 506.606 441.168 511.617 439.409 516.306C437.649 520.996 435.046 525.398 431.375 528.301C429.692 529.633 427.814 530.627 426.169 532.019C424.69 533.269 423.401 534.838 421.767 535.805C420.674 536.374 419.546 536.853 418.392 537.236C416.694 537.908 415.071 538.806 413.558 539.91C412.227 540.789 411.099 542.015 410.266 543.486C409.857 544.228 409.618 545.074 409.57 545.948C409.523 546.822 409.669 547.696 409.995 548.489C410.346 549.142 410.814 549.704 411.369 550.136C411.925 550.568 412.554 550.862 413.217 550.998C414.54 551.257 415.889 551.295 417.221 551.112C422.514 550.668 427.8 550.133 433.086 549.597C435.322 549.433 437.545 549.082 439.735 548.546C440.893 548.228 442.028 547.808 443.181 547.47C445.159 546.89 447.185 546.555 449.225 546.469C449.818 546.412 450.415 546.474 450.989 546.652C452.213 547.107 453.082 548.492 454.346 548.773C455.157 548.861 455.975 548.737 456.737 548.41C460.546 547.226 464.547 547.258 468.488 547.016C470.225 546.909 472.257 546.534 473.054 544.768C474.048 542.564 472.4 540.1 471.744 537.738C471.416 536.228 471.234 534.682 471.199 533.128C470.896 529.286 469.904 525.556 468.284 522.167C466.937 519.355 465.098 516.246 466.044 513.228C466.366 512.204 467.004 511.25 466.941 510.164C466.662 505.397 456.878 507.065 454.445 506.485Z"
              fill="#2F2E41"
            />
            <path
              d="M575.144 528.394H614.944V297.846L575.144 269.959V528.394Z"
              fill="#F2F2F2"
            />
            <path
              d="M590.417 468.631C590.689 469.725 590.993 470.811 591.317 471.89C589.862 470.263 588.433 468.592 586.978 466.976C587.562 467.183 588.144 467.389 588.694 467.634C589.294 467.905 589.871 468.239 590.417 468.631V468.631ZM583.366 463.199C574.787 454.719 564.847 448.154 556.055 439.933C560.856 442.618 565.526 445.747 570.159 448.747C575.653 452.305 581.213 455.726 586.839 459.007C585.922 460.639 584.745 462.061 583.366 463.199V463.199ZM587.036 441.847C587.173 441.688 587.31 441.528 587.447 441.368C587.451 442.573 587.459 443.699 587.471 444.722C586.703 444.432 585.936 444.134 585.172 443.83C585.829 443.214 586.452 442.552 587.036 441.847V441.847ZM511.467 464.803C515.002 460.264 518.073 455.284 520.621 449.958C524.027 456.722 529.561 461.6 534.269 467.264C526.684 466.126 519.088 465.187 511.467 464.803Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M624.751 348.678C624.751 348.678 644.53 343.7 646.711 363.533C648.892 383.366 636.207 387.109 636.207 387.109L628.174 389.564L597.097 380.267L601.459 366.012L624.751 348.678Z"
              fill="#2F2E41"
            />
            <path
              d="M617.624 349.772C632.386 349.772 644.352 336.169 644.352 319.388C644.352 302.608 632.386 289.005 617.624 289.005C602.863 289.005 590.896 302.608 590.896 319.388C590.896 336.169 602.863 349.772 617.624 349.772Z"
              fill="#2F2E41"
            />
            <path
              d="M523.703 382.481L529.134 383.722L547.598 414.759L539.452 416L523.703 382.481Z"
              fill="#2F2E41"
            />
            <path
              d="M594.735 474.74C565.708 476.716 537.019 467.057 507.955 466.025C504.341 465.896 500.689 465.906 497.16 466.807C493.428 467.76 489.949 469.679 486.478 471.515C470.89 479.76 454.764 486.588 438.657 493.408L420.155 501.242C416.458 502.807 412.627 504.397 408.691 504.124C406.927 504.001 404.761 503.698 403.769 505.369C400.759 510.438 402.181 517.886 404.17 523.575C404.816 525.422 405.907 527.414 407.637 527.624C408.855 527.772 409.988 526.97 411.171 526.61C414.539 525.585 417.897 528.16 421.363 528.579C425.645 529.097 429.621 526.324 433.662 524.626C440.365 521.81 447.695 521.899 454.74 520.565C466.554 518.328 477.504 512.092 487.739 504.988C491.637 502.282 495.58 499.384 500.058 498.395C505.206 497.257 510.494 498.765 515.541 500.388C527.577 504.259 539.425 508.846 551.038 514.129C557.152 516.91 563.223 519.893 569.585 521.817C583.347 525.936 597.904 524.971 611.151 519.062C615.797 516.975 620.846 513.285 621.112 507.587C621.264 504.338 619.048 501.475 617.566 498.697C616.616 496.915 615.666 495.133 614.632 493.414C609.626 485.095 603.552 474.14 594.735 474.74Z"
              fill="#2F2E41"
            />
            <path
              opacity="0.1"
              d="M594.735 474.74C565.708 476.716 537.019 467.057 507.955 466.025C504.341 465.896 500.689 465.906 497.16 466.807C493.428 467.76 489.949 469.679 486.478 471.515C470.89 479.76 454.764 486.588 438.657 493.408L420.155 501.242C416.458 502.807 412.627 504.397 408.691 504.124C406.927 504.001 404.761 503.698 403.769 505.369C400.759 510.438 402.181 517.886 404.17 523.575C404.816 525.422 405.907 527.414 407.637 527.624C408.855 527.772 409.988 526.97 411.171 526.61C414.539 525.585 417.897 528.16 421.363 528.579C425.645 529.097 429.621 526.324 433.662 524.626C440.365 521.81 447.695 521.899 454.74 520.565C466.554 518.328 477.504 512.092 487.739 504.988C491.637 502.282 495.58 499.384 500.058 498.395C505.206 497.257 510.494 498.765 515.541 500.388C527.577 504.259 539.425 508.846 551.038 514.129C557.152 516.91 563.223 519.893 569.585 521.817C583.347 525.936 597.904 524.971 611.151 519.062C615.797 516.975 620.846 513.285 621.112 507.587C621.264 504.338 619.048 501.475 617.566 498.697C616.616 496.915 615.666 495.133 614.632 493.414C609.626 485.095 603.552 474.14 594.735 474.74Z"
              fill="black"
            />
            <path
              d="M551.206 421.803C546.062 419.226 541.941 414.573 539.64 408.743C539.155 407.49 538.757 406.182 538.29 404.917C536.768 400.716 534.401 396.979 531.378 394.005C530.622 393.277 529.735 392.581 528.812 392.772C527.926 392.955 527.229 393.951 526.925 395.069C526.665 396.22 526.6 397.416 526.733 398.595C526.991 401.372 527.412 404.128 527.991 406.842L529.398 414.128C529.572 415.249 529.866 416.341 530.273 417.381C530.88 418.607 531.681 419.696 532.634 420.592C533.919 421.938 535.225 423.247 536.552 424.521C538.395 426.531 540.798 427.745 543.345 427.954C549.109 429.169 554.972 430.92 559.836 435.196C559.782 435.148 559.816 430.309 559.731 429.754C559.509 428.288 559.336 426.836 558.496 425.844C556.61 423.617 553.503 422.963 551.206 421.803Z"
              fill="#FBBEBE"
            />
            <path
              opacity="0.1"
              d="M551.206 421.803C546.062 419.226 541.941 414.573 539.64 408.743C539.155 407.49 538.757 406.182 538.29 404.917C536.768 400.716 534.401 396.979 531.378 394.005C530.622 393.277 529.735 392.581 528.812 392.772C527.926 392.955 527.229 393.951 526.925 395.069C526.665 396.22 526.6 397.416 526.733 398.595C526.991 401.372 527.412 404.128 527.991 406.842L529.398 414.128C529.572 415.249 529.866 416.341 530.273 417.381C530.88 418.607 531.681 419.696 532.634 420.592C533.919 421.938 535.225 423.247 536.552 424.521C538.395 426.531 540.798 427.745 543.345 427.954C549.109 429.169 554.972 430.92 559.836 435.196C559.782 435.148 559.816 430.309 559.731 429.754C559.509 428.288 559.336 426.836 558.496 425.844C556.61 423.617 553.503 422.963 551.206 421.803Z"
              fill="black"
            />
            <path
              d="M610.321 366.031C614.22 366.031 617.381 362.418 617.381 357.962C617.381 353.505 614.22 349.892 610.321 349.892C606.422 349.892 603.261 353.505 603.261 357.962C603.261 362.418 606.422 366.031 610.321 366.031Z"
              fill="#2F2E41"
            />
            <path
              d="M605.951 353.086C604.035 352.845 601.906 352.666 600.371 353.998C599.556 354.817 598.905 355.825 598.461 356.954C596.985 360.104 595.53 363.314 594.787 366.786C594.156 369.731 594.052 372.811 593.271 375.709C591.824 381.084 588.115 385.621 587.691 391.225C587.501 393.733 587.87 396.669 586.261 398.386C585.864 398.766 585.439 399.108 584.993 399.409C583.877 400.259 582.93 401.366 582.214 402.657C581.611 403.746 581.147 404.996 580.24 405.76C578.805 406.969 576.421 406.846 575.714 408.717C574.986 410.64 576.832 412.78 576.404 414.817C576.056 416.476 574.429 417.237 573.309 418.364C571.873 419.808 571.217 421.987 570.618 424.063C568.257 424.571 565.826 424.492 563.494 423.831C561.162 423.17 558.984 421.943 557.109 420.234C559.08 425.751 559.122 431.841 559.208 437.8C559.235 439.733 559.182 441.903 557.968 443.249C563.589 443.386 569.071 445.117 574.555 446.526C576.953 447.142 579.555 447.677 581.79 446.511C583.045 445.747 584.167 444.733 585.104 443.515C588.087 440.075 591.218 436.323 591.948 431.552C592.357 428.878 591.961 426.134 592.069 423.423C592.203 420.064 593.107 416.818 593.88 413.573C595.463 406.933 596.524 400.145 597.051 393.291C597.376 389.061 600.589 385.657 602.281 381.877C605.475 374.741 608.739 367.309 608.979 359.298C609.06 356.619 608.282 353.38 605.951 353.086Z"
              fill="#2F2E41"
            />
            <path
              opacity="0.1"
              d="M605.951 353.086C604.035 352.845 601.906 352.666 600.371 353.998C599.556 354.817 598.905 355.825 598.461 356.954C596.985 360.104 595.53 363.314 594.787 366.786C594.156 369.731 594.052 372.811 593.271 375.709C591.824 381.084 588.115 385.621 587.691 391.225C587.501 393.733 587.87 396.669 586.261 398.386C585.864 398.766 585.439 399.108 584.993 399.409C583.877 400.259 582.93 401.366 582.214 402.657C581.611 403.746 581.147 404.996 580.24 405.76C578.805 406.969 576.421 406.846 575.714 408.717C574.986 410.64 576.832 412.78 576.404 414.817C576.056 416.476 574.429 417.237 573.309 418.364C571.873 419.808 571.217 421.987 570.618 424.063C568.257 424.571 565.826 424.492 563.494 423.831C561.162 423.17 558.984 421.943 557.109 420.234C559.08 425.751 559.122 431.841 559.208 437.8C559.235 439.733 559.182 441.903 557.968 443.249C563.589 443.386 569.071 445.117 574.555 446.526C576.953 447.142 579.555 447.677 581.79 446.511C583.045 445.747 584.167 444.733 585.104 443.515C588.087 440.075 591.218 436.323 591.948 431.552C592.357 428.878 591.961 426.134 592.069 423.423C592.203 420.064 593.107 416.818 593.88 413.573C595.463 406.933 596.524 400.145 597.051 393.291C597.376 389.061 600.589 385.657 602.281 381.877C605.475 374.741 608.739 367.309 608.979 359.298C609.06 356.619 608.282 353.38 605.951 353.086Z"
              fill="black"
            />
            <path
              d="M599.339 481.689C593.294 478.419 588.87 472.323 583.982 467.105C574.651 457.144 563.239 450.093 553.428 440.754C546.924 434.564 541.107 427.355 533.961 422.173C527.667 417.617 520.532 414.775 513.112 413.869C512.262 413.703 511.39 413.753 510.559 414.014C509.622 414.485 508.805 415.219 508.186 416.148C505.02 420.209 502.206 424.608 499.783 429.284C487.347 453.282 469.682 473.46 455.047 495.78C454.58 496.305 454.302 497.01 454.27 497.756C454.238 498.502 454.452 499.234 454.872 499.809L457.849 506.44C459.515 510.151 462.184 514.474 465.775 513.736C467.416 513.399 468.724 512.027 469.933 510.713L483.297 496.191L497.309 480.965C505.519 472.043 513.869 462.915 519.221 451.503C523.404 459.75 530.825 465.147 535.917 472.697C537.854 475.568 539.436 478.726 541.164 481.766C543.936 486.639 547.087 491.212 550.234 495.778L566.307 519.099C568.499 522.279 570.752 525.523 573.749 527.681C577.556 530.42 582.185 531.142 586.666 531.598C592.704 532.213 598.767 532.462 604.828 532.345C609.449 532.255 614.215 531.91 618.361 529.577C622.508 527.244 625.914 522.455 625.699 517.178C625.587 514.434 624.537 511.86 623.382 509.451C617.641 497.476 610.138 487.529 599.339 481.689Z"
              fill="#2F2E41"
            />
            <path
              d="M614.666 369.756C617.665 369.756 620.096 366.976 620.096 363.548C620.096 360.12 617.665 357.341 614.666 357.341C611.666 357.341 609.235 360.12 609.235 363.548C609.235 366.976 611.666 369.756 614.666 369.756Z"
              fill="#2F2E41"
            />
            <path
              d="M613.465 358.884C614.789 361.541 614.79 364.849 614.061 367.791C613.333 370.734 611.942 373.395 610.566 376.018C609.212 378.598 607.842 381.203 606.025 383.381C614.408 383.837 622.534 380.1 629.931 375.571C635.882 371.928 641.821 367.43 644.997 360.621C643.139 361.255 641.092 360.629 639.448 359.455C637.851 358.19 636.42 356.674 635.197 354.953L630.988 349.572C630 348.4 629.132 347.104 628.4 345.71C627.489 343.802 627.102 341.628 627.289 339.467C625.617 341.456 623.749 343.219 621.721 344.72C618.715 346.944 615.401 348.557 612.389 350.768C611.321 351.552 608.946 352.813 609.558 354.4C610.154 355.947 612.618 357.184 613.465 358.884Z"
              fill="#FBBEBE"
            />
            <path
              opacity="0.1"
              d="M613.465 358.884C614.789 361.541 614.79 364.849 614.061 367.791C613.333 370.734 611.942 373.395 610.566 376.018C609.212 378.598 607.842 381.203 606.025 383.381C614.408 383.837 622.534 380.1 629.931 375.571C635.882 371.928 641.821 367.43 644.997 360.621C643.139 361.255 641.092 360.629 639.448 359.455C637.851 358.19 636.42 356.674 635.197 354.953L630.988 349.572C630 348.4 629.132 347.104 628.4 345.71C627.489 343.802 627.102 341.628 627.289 339.467C625.617 341.456 623.749 343.219 621.721 344.72C618.715 346.944 615.401 348.557 612.389 350.768C611.321 351.552 608.946 352.813 609.558 354.4C610.154 355.947 612.618 357.184 613.465 358.884Z"
              fill="black"
            />
            <path
              d="M613.58 359.824C612.004 362.835 611.666 366.391 613.58 369.135C613.818 369.476 614.702 371.596 615.084 371.615C615.454 371.581 615.797 371.383 616.04 371.065C618.076 368.95 619.568 366.252 621.356 363.862C623.144 361.473 625.4 359.295 628.119 358.813C631.401 358.232 634.569 360.209 637.44 362.116C638.633 362.908 639.871 363.748 640.622 365.071C641.227 366.314 641.584 367.692 641.667 369.109C642.659 377.603 642.637 386.205 642.614 394.775C642.597 400.97 642.576 407.208 641.545 413.29C641.012 416.433 640.212 419.519 639.834 422.691C639.556 425.491 639.443 428.309 639.496 431.126L639.488 442.92C639.419 445.086 639.554 447.254 639.891 449.388C640.384 451.972 641.459 454.358 642.178 456.872C642.92 459.762 643.427 462.723 643.694 465.717L645.114 477.93C645.561 481.776 645.892 485.984 643.846 489.08C642.921 490.48 641.705 491.6 640.767 492.989C637.255 498.188 638.382 505.607 636.917 511.958C635.761 516.61 633.385 520.75 630.106 523.828C627.596 526.252 624.354 528.159 621.123 527.477C616.761 526.556 614.141 521.386 612.951 516.501C611.762 511.616 611.329 506.298 608.752 502.171C606.648 498.801 603.388 496.682 600.44 494.276C597.492 491.87 594.612 488.769 593.971 484.695C593.69 482.915 593.865 481.082 593.698 479.284C593.464 477.006 592.695 474.841 591.473 473.016C590.25 471.191 588.619 469.773 586.749 468.91C584.516 467.923 581.758 467.57 580.501 465.242C583.747 463.162 585.903 459.318 587.038 455.267C588.173 451.215 588.405 446.916 588.628 442.67L589.374 428.478C589.707 422.136 589.859 415.85 592.316 410.151C593.414 407.603 594.781 405.218 595.924 402.696C597.437 399.158 598.728 395.503 599.789 391.759C601.57 385.944 603.352 380.127 604.94 374.239C605.696 371.434 606.423 368.574 607.772 366.076C609.12 363.577 611.055 360.363 613.58 359.824Z"
              fill="#F50057"
            />
            <path
              d="M585.857 452.023L589.159 452.158L589.863 446.483C589.955 445.348 590.191 444.233 590.562 443.174C591.107 442.054 591.743 440.995 592.461 440.011C595.713 434.789 595.476 427.856 596.281 421.513C597.356 413.054 600.464 405.134 603.539 397.342L609.952 381.093C611.231 378.335 611.843 375.24 611.725 372.125C611.782 369.613 612.437 360.473 612.493 357.962C612.514 357.032 610.691 357.549 610.321 356.72C609.517 354.916 608.417 359.808 606.915 360.882C605.413 361.955 604.584 363.899 603.946 365.788C602.564 369.881 601.719 374.186 600.432 378.319C599.144 382.452 597.342 386.512 594.445 389.39C593.129 390.698 591.612 391.735 590.368 393.133C586.379 397.617 585.99 404.7 585.85 411.094C585.766 414.895 585.12 452.023 585.857 452.023Z"
              fill="#2F2E41"
            />
            <path
              d="M633.415 353.048C630.206 354.482 628.447 358.438 627.545 362.238C626.643 366.039 626.276 370.09 624.553 373.5C620.524 381.47 610.252 383.793 607.41 392.406C606.48 395.224 606.52 398.316 606.27 401.315C605.754 407.486 603.969 413.449 603.441 419.619C603.033 424.399 603.386 429.216 603.739 434.002L607.329 482.676C607.847 489.707 607.834 497.26 606.253 504.08C609.888 504.886 613.667 503.807 617.039 502.06C620.411 500.312 623.489 497.913 626.735 495.877C632.316 492.377 638.471 489.897 643.359 485.234C644.243 484.451 645.001 483.499 645.599 482.42C646.578 480.496 646.658 478.168 647.124 476.006C647.547 474.281 648.085 472.596 648.733 470.965C650.522 466.06 652.081 461.05 653.403 455.957C654.311 452.578 655.029 449.136 655.551 445.652C655.943 442.878 656.154 440.075 656.365 437.275C656.626 432.891 657.392 428.565 658.644 424.409C661.767 414.496 663.535 404.099 663.887 393.578C663.993 392.058 663.902 390.529 663.618 389.039C663.192 387.191 662.233 385.576 661.446 383.891C659.954 380.696 659.058 377.18 657.65 373.936C654.469 366.606 648.85 361.049 642.964 356.39C640.074 354.103 636.689 351.585 633.415 353.048Z"
              fill="#2F2E41"
            />
            <path
              d="M558.359 432.454C555.874 430.809 553.391 429.038 551.521 426.548C550.625 425.355 549.886 424.016 548.975 422.838C546.759 419.972 543.62 418.195 540.375 417.266C537.129 416.337 533.754 416.196 530.408 416.164C528.17 416.142 525.876 416.179 523.781 417.078C521.686 417.977 519.796 419.917 519.391 422.433C518.904 425.46 520.644 428.41 522.733 430.352C524.677 432.156 526.964 433.418 529.413 434.039C531.411 434.436 533.427 434.705 535.451 434.843C547.339 436.258 557.944 443.613 568.362 450.31C577.511 456.192 586.838 461.692 596.342 466.808C596.719 463.572 596.876 460.308 596.811 457.045C596.763 454.607 596.657 450.892 594.632 449.461C592.272 447.794 588.388 447.411 585.726 446.419C579.601 444.137 573.619 441.386 567.82 438.186C564.605 436.411 561.451 434.5 558.359 432.454Z"
              fill="#FBBEBE"
            />
            <path
              d="M610.321 356.099C622.018 356.099 631.5 345.261 631.5 331.891C631.5 318.521 622.018 307.682 610.321 307.682C598.624 307.682 589.142 318.521 589.142 331.891C589.142 345.261 598.624 356.099 610.321 356.099Z"
              fill="#FBBEBE"
            />
            <path
              d="M639.47 380.495C637.578 383.002 636.631 386.232 635.36 389.207C632.745 395.329 628.643 400.584 626.589 406.979C624.422 413.726 624.495 421.752 620.247 427.051C619.508 427.973 618.617 428.862 618.403 430.088C618.276 430.815 618.408 431.594 618.187 432.291C617.578 434.217 614.806 434.314 614.289 436.274C614.137 436.847 614.222 437.482 614.035 438.042C613.61 439.309 612.137 439.503 611.153 440.262C609.097 441.847 609.512 445.533 608.045 447.818C606.884 449.626 604.696 450.232 602.752 449.925C600.809 449.619 599.029 448.561 597.259 447.594C596.651 447.205 595.978 446.964 595.283 446.889C594.463 446.92 593.669 447.229 593.002 447.774C589.09 450.602 587.254 456.203 587.281 461.493C587.308 466.784 588.907 471.882 590.545 476.831C590.768 477.666 591.135 478.442 591.624 479.115C592.921 480.675 595.18 480.423 596.903 479.555C598.626 478.688 600.19 477.323 602.043 476.942C605.32 476.267 608.523 478.827 611.848 478.616C614.284 478.462 616.439 476.852 618.463 475.294C621.693 472.809 624.983 470.26 627.358 466.733C628.812 464.573 629.878 462.11 631.146 459.802C632.776 456.969 634.562 454.257 636.494 451.681L648.707 434.688C651.641 431.057 653.662 426.594 654.556 421.769C655.717 417.24 656.886 412.659 657.087 407.946C657.252 404.066 656.757 400.191 656.2 396.359C655.652 392.587 655.028 388.773 653.57 385.331C650.917 379.067 644.458 373.883 639.47 380.495Z"
              fill="#2F2E41"
            />
            <path
              d="M646.579 309.767C661.341 309.767 673.307 296.164 673.307 279.384C673.307 262.603 661.341 249 646.579 249C631.818 249 619.851 262.603 619.851 279.384C619.851 296.164 631.818 309.767 646.579 309.767Z"
              fill="#2F2E41"
            />
            <path
              d="M669.634 304.543C666.174 307.385 662.166 309.245 657.945 309.965C653.724 310.686 649.413 310.246 645.371 308.684C641.33 307.122 637.677 304.483 634.717 300.987C631.757 297.491 629.577 293.24 628.359 288.589C628.82 292.757 630.036 296.77 631.93 300.377C633.824 303.983 636.356 307.103 639.365 309.541C642.374 311.979 645.794 313.682 649.411 314.541C653.028 315.4 656.762 315.398 660.378 314.533C663.994 313.669 667.413 311.962 670.419 309.52C673.426 307.078 675.954 303.954 677.845 300.346C679.735 296.737 680.947 292.722 681.404 288.553C681.86 284.385 681.552 280.155 680.498 276.129C681.096 281.538 680.404 287.03 678.492 292.029C676.581 297.029 673.521 301.351 669.634 304.543V304.543Z"
              fill="#2F2E41"
            />
            <path
              d="M624.751 346.734C635.577 346.734 644.352 336.758 644.352 324.452C644.352 312.147 635.577 302.171 624.751 302.171C613.926 302.171 605.151 312.147 605.151 324.452C605.151 336.758 613.926 346.734 624.751 346.734Z"
              fill="#2F2E41"
            />
            <path
              d="M608.269 331.542C617.864 331.542 625.642 324.627 625.642 316.097C625.642 307.567 617.864 300.652 608.269 300.652C598.674 300.652 590.896 307.567 590.896 316.097C590.896 324.627 598.674 331.542 608.269 331.542Z"
              fill="#2F2E41"
            />
            <path
              d="M614.943 343.898C616.111 342.818 615.903 340.328 614.478 338.336C613.053 336.345 610.951 335.605 609.783 336.685C608.615 337.765 608.823 340.255 610.248 342.247C611.673 344.238 613.775 344.978 614.943 343.898Z"
              fill="#FBBEBE"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="551.392"
                y1="471.89"
                x2="551.392"
                y2="439.933"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#808080" stopOpacity="0.25" />
                <stop offset="0.53514" stopColor="#808080" stopOpacity="0.12" />
                <stop offset="1" stopColor="#808080" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </Card>
        <Message>
          <p>{this.props.message}</p>
        </Message>
      </>
    );
  }
}

export default Offer;
