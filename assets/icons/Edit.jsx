import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const SvgComponent = ({ size = 24, color = "#838383" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M22.824 1.176a4.108 4.108 0 0 0-5.676 0L1.611 16.713A5.464 5.464 0 0 0 .001 20.6v1.9A1.5 1.5 0 0 0 1.5 24h1.9a5.464 5.464 0 0 0 3.888-1.611L22.824 6.852a4.018 4.018 0 0 0 0-5.676ZM5.166 20.268c-.47.467-1.104.73-1.766.732H3v-.4a2.52 2.52 0 0 1 .732-1.768L15.3 7.267 16.733 8.7 5.166 20.268ZM20.7 4.731 18.854 6.58 17.42 5.146 19.27 3.3a1.037 1.037 0 0 1 1.433 0 1.015 1.015 0 0 1-.003 1.431Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
