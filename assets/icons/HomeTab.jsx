import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const HomeTab = ({ height = 24, width = 24, isFocussed = false }) =>
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
        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
      />
      <Path
        stroke="url(#b)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 22V12h6v10"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={3}
          x2={21.888}
          y1={16.94}
          y2={1.964}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFA450" />
          <Stop offset={0.604} stopColor="#FF5C00" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={9}
          x2={17.015}
          y1={19.47}
          y2={15.234}
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
        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
      />
      <Path
        stroke="#838383"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 22V12h6v10"
      />
    </Svg>
  );

export default HomeTab;
