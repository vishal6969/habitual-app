import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ChevronRight = ({ size = 24, color = "#2f2f2f" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 6 6 6-6 6"
    />
  </Svg>
);

export default ChevronRight;
