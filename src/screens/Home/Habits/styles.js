import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderRadius: 16,
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
    borderRadius: 6,
    backgroundColor: "#edfff4",
  },
  altHabitItem: {
    backgroundColor: "#f7f7f7",
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
  tooltip: {
    height: "auto",
    width: "auto",
    minWidth: 130,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 6,
  },
  edit: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  menuDivider: {
    height: 0.5,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    marginHorizontal: 8,
  },
  delete: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  editTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    color: "#2f2f2f",
    marginLeft: 8,
  },
  deleteTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    color: "#e03030",
    marginLeft: 8,
  },
});

export default styles;
