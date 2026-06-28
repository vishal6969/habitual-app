import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 182,
    borderRadius: 6,
    backgroundColor: "#e7e7e7",
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
  },
  dropdownValue: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  dropdownWrapper: {
    position: "relative",
  },
  dropdownListContainer: {
    position: "absolute",
    top: "100%",
    marginTop: 8,
    width: 182,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 6,
    zIndex: 999,
    elevation: 4,
  },
  dropdownListItem: {
    fontFamily: "Nunito-Bold",
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 14,
    paddingLeft: 12,
    paddingVertical: 6,
  },
  selectedItem: {
    backgroundColor: "#e7e7e7",
    color: "#2f2f2f",
  },
});

export default styles;
