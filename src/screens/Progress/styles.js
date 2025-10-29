const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 28,
    color: "#2f2f2f",
  },
  filterContainer: {
    marginTop: 0,
  },
  filterInput: {
    width: 138,
  },
  filterList: {
    width: 138,
    left: 8,
  },
  content: {
    flex: 1,
    marginTop: 32,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 28,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 12,
  },
  goalAchievedTxt: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#ff5c00",
    marginLeft: 4,
  },
  goalNotAchievedTxt: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#a2a2a2",
    marginLeft: 4,
  },
});

export default styles;
