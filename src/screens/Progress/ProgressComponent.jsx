import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressComponent = ({
  size = 190,
  strokeWidth = 24,
  progress = 75,
  fontStyle,
  color1 = "#FFA450",
  color2 = "#FF5C00",
  bgCircleColor = "#f0f0f0",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(isNaN(progress) ? 0 : progress, {
      duration: 1500,
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const dashOffset =
      circumference - (circumference * animatedProgress.value) / 100;
    return { strokeDashoffset: dashOffset };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient
            id="grad"
            x1="160.998"
            y1="36.23"
            x2="261.128"
            y2="208.582"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color1} />
            <Stop offset="0.604" stopColor={color2} />
          </LinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgCircleColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Circle */}
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          fill="none"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      <Text style={[styles.text, fontStyle]}>
        {isNaN(progress) ? 0 : Math.round(progress)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    fontFamily: "Nunito-Bold",
    fontSize: 28,
    color: "#FF5C00",
  },
});

export default ProgressComponent;
