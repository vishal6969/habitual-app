import { useState } from "react";

import { Pressable, Text, View } from "react-native";

import { getDayString, getMonthString } from "../../utils/dates";
import styles from "./styles";
import Banner from "./Banner";
import Habits from "./Habits";
import Plus from "../../../assets/icons/Plus";
import AddGoalModal from "./AddGoalModal";
import { useGoals } from "@/src/stores/goals";
import { useGlobal } from "@/src/stores/global";
import useNotifications from "../../hooks/useNotifications";

const Home = () => {
  const date = new Date();
  const day = getDayString(date.getDay());
  const month = getMonthString(date.getMonth());
  const formattedDate = `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const { getGoalById } = useGoals();
  const { setGoalEditData } = useGlobal();
  useNotifications();

  const handleGoalEdit = (item) => {
    setGoalEditData({ habitId: item.id, ...getGoalById(item.goalId), lichie:true });
    setGoalModalVisible(true);
  };

  const handleGoalModalClose = () => {
    setGoalEditData(null);
    setGoalModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Banner />
      <Habits handleGoalEdit={handleGoalEdit} />
      <Pressable onPress={() => setGoalModalVisible(true)} style={styles.fab}>
        <Plus />
      </Pressable>
      <AddGoalModal
        isVisible={goalModalVisible}
        onClose={handleGoalModalClose}
      />
    </View>
  );
};

export default Home;
