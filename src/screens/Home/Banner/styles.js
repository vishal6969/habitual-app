import { Dimensions, StyleSheet } from "react-native";

const ScreenWidth = Dimensions.get("window").width;
const containerWidth = ScreenWidth - 32;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: containerWidth,
    height: containerWidth * (189 / 351),
  },
  infoTxt1: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    color: "#fff",
  },
  infoTxt2: {
    fontFamily: "Nunito-Medium",
    fontSize: 20,
    color: "#fff",
  },
  calendar: {
    position: "absolute",
    right: 8,
    bottom: -6,
    width: 115.99,
    height: 50.44,
  },
});

export default styles;
