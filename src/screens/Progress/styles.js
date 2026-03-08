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
    paddingTop: 48,
  },
  noGoalStateContainer: {
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: "20%",
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

export const goalsListStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f7f7f7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  goalDetails: {
    flex: 1,
    marginLeft: 16,
  },
  goalName: {
    flex: 1,
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#2f2f2f",
  },
  goalTarget: {
    fontFamily: "Nunito-Medium",
    fontSize: 14,
    color: "#2f2f2f",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
