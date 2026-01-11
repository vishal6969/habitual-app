import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressComponent = ({ size = 118, strokeWidth = 15, progress = 75 }) => {
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
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#FFA450" />
            <Stop offset="1" stopColor="#FFC6A6" />
          </LinearGradient>
          <LinearGradient
            id="b"
            x1={18.995}
            x2={117.706}
            y1={58.799}
            y2={59.294}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0.755} />
            <Stop offset={1} stopColor="#fff" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#b)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      <Text style={styles.text}>
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
    fontSize: 21,
    color: "#fff",
  },
});

export default ProgressComponent;
