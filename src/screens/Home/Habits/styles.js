import { Dimensions, StyleSheet } from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  shadowContainer: {
    flex: 1,
    width: ScreenWidth - 32,
    marginHorizontal: 16,
    marginVertical: 22,
  },
  shadow: {
    flex: 1,
    width: "100%",
    borderRadius: 12,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 22,
    borderRadius: 12,
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 22,
    color: "#2f2f2f",
    marginBottom: 16,
  },
  habitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 14,
    borderRadius: 5,
    backgroundColor: "#edfff4",
  },
  altHabitItem: {
    backgroundColor: "#fbfbfb",
  },
  habitTitle: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    color: "#37c871",
  },
  altHabitTitle: {
    color: "#2f2f2f",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  threeDotIcon: {
    marginLeft: 8,
  },
});

export default styles;
