import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ProgressTab = ({ height = 24, width = 24, isFocussed = false }) =>
  isFocussed ? (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        stroke="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 12h-4l-3 9L9 3l-3 9H2"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={2}
          x2={19.455}
          y1={16.446}
          y2={-0.64}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFA450" />
          <Stop offset={0.604} stopColor="#FF5C00" />
        </LinearGradient>
      </Defs>
    </Svg>
  ) : (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        stroke="#838383"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 12h-4l-3 9L9 3l-3 9H2"
      />
    </Svg>
  );

export default ProgressTab;
