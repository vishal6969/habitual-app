import * as React from "react";

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Tick = ({ size = 22 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 22 22"
  >
    <Path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6.875 11.275 2.538 2.475 8.462-8.25"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={6.875}
        x2={14.775}
        y1={11.663}
        y2={2.384}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFA450" />
        <Stop offset={0.604} stopColor="#FF5C00" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Tick;
