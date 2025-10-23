import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ThreeDotVertical = ({ height = 18, width = 19 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 19 18"
  >
    <Path
      stroke="#666"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.67 9.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.67 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.67 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
    />
  </Svg>
);
export default ThreeDotVertical;
