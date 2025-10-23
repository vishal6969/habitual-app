import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Plus = ({ height = 53, width = 52 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 52 53"
  >
    <Path
      fill="url(#a)"
      d="M26 .444c14.268 0 25.833 11.566 25.833 25.834C51.833 40.545 40.268 52.11 26 52.11 11.732 52.111.167 40.545.167 26.278.167 12.01 11.732.444 26 .444Zm0 12.917a1.937 1.937 0 0 0-1.92 1.674l-.017.264v9.041H15.02a1.937 1.937 0 0 0-.264 3.857l.264.018h9.041v9.042a1.937 1.937 0 0 0 3.857.264l.018-.264v-9.042h9.042a1.938 1.938 0 0 0 .264-3.857l-.264-.018h-9.041V15.3A1.938 1.938 0 0 0 26 13.36Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={2.302}
        x2={36.296}
        y1={36.803}
        y2={36.659}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#37C871" />
        <Stop offset={1} stopColor="#5FE394" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Plus;
