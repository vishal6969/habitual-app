import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfcff",
    marginVertical: "auto",
    marginHorizontal: 22,
    borderRadius: 6,
    padding: 16,
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "#2f2f2f",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
  },
  rowSpaceBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionBtnContainer: {
    marginTop: 56,
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 4,
  },
  actionBtnTxt: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 16,
    color: "#fbfbfb",
  },
});

export default styles;
