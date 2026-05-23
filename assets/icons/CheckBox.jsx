import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CheckBox = ({ height = 30, width = 33 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 33 32"
  >
    <Path
      stroke="#37C871"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24.503 1H7.837A6.667 6.667 0 0 0 1.17 7.667v16.666A6.667 6.667 0 0 0 7.837 31h16.666a6.667 6.667 0 0 0 6.667-6.667V7.667A6.667 6.667 0 0 0 24.503 1Z"
    />
  </Svg>
);
export default CheckBox;
