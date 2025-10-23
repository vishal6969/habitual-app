import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const CompleteTick = ({ height = 30, width = 31 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 31 30"
  >
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M8.17 0a7.5 7.5 0 0 0-7.5 7.5v15a7.5 7.5 0 0 0 7.5 7.5h15a7.5 7.5 0 0 0 7.5-7.5v-15a7.5 7.5 0 0 0-7.5-7.5h-15Zm13.095 13.026a1.499 1.499 0 0 0-.566-2.43 1.502 1.502 0 0 0-1.624.378l-4.624 4.935-2.285-2.03a1.5 1.5 0 0 0-1.992 2.242l3.375 3a1.5 1.5 0 0 0 2.09-.095l5.625-6h.001Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.91}
        x2={21.648}
        y1={21.111}
        y2={21.028}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#37C871" />
        <Stop offset={1} stopColor="#5FE394" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CompleteTick;
