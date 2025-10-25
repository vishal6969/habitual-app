import { useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { getDayString, getMonthString } from "../../utils/dates";
import styles from "./styles";
import Banner from "./Banner";
import Habits from "./Habits";
import Plus from "../../../assets/icons/Plus";
import AddGoalModal from "./AddGoalModal";

const Home = () => {
  const date = new Date();
  const day = getDayString(date.getDay());
  const month = getMonthString(date.getMonth());
  const formattedDate = `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Banner />
      <Habits />
      <TouchableOpacity
        onPress={() => setGoalModalVisible(true)}
        style={styles.fab}
      >
        <Plus />
      </TouchableOpacity>
      <AddGoalModal
        isVisible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
      />
    </View>
  );
};

export default Home;
