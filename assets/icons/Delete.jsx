import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = ({ size = 24, color = "#838383" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      fill={color}
      d="M23 4.5A1.5 1.5 0 0 0 21.5 3h-3.776A4.494 4.494 0 0 0 13.5 0h-3a4.494 4.494 0 0 0-4.224 3H2.5a1.5 1.5 0 0 0 0 3H3v12.5A5.5 5.5 0 0 0 8.5 24h7a5.5 5.5 0 0 0 5.5-5.5V6h.5A1.5 1.5 0 0 0 23 4.5Zm-5 14a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 18.5V6h12v12.5Z"
    />
    <Path
      fill={color}
      d="M9.5 18a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-3 0v6A1.5 1.5 0 0 0 9.5 18ZM14.5 18a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-3 0v6a1.5 1.5 0 0 0 1.5 1.5Z"
    />
  </Svg>
);

export default SvgComponent;
