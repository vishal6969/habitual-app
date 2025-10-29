import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  date: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#2f2f2f",
    marginHorizontal: 16,
  },
  fab: {
    backgroundColor: "#fff",
    borderWidth: 3.5,
    borderRadius: 100,
    borderColor: "#fff",
    position: "absolute",
    bottom: 32,
    right: 48,
    elevation: 1,
  },
});

export default styles;
