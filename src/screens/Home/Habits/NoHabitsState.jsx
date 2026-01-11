import { StyleSheet, Text, View } from "react-native";

import Notepad from "../../../../assets/icons/Notepad";

const NoHabitsState = () => {
  return (
    <View style={styles.container}>
      <Notepad height={230} />
      <Text style={styles.title}>Get Started !!</Text>
      <Text style={styles.description}>
        Create a goal to build some good habits
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "18%",
    alignItems: "center",
  },
  title: {
    marginTop: -40,
    fontFamily: "Nunito-Bold",
    fontSize: 32,
    color: "#2f2f2f",
  },
  description: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    color: "#666666",
  },
});

export default NoHabitsState;
