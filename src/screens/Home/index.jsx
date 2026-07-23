import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { getDayString, getMonthString } from "../../utils/dates";
import styles from "./styles";
import Banner from "./Banner";
import Habits from "./Habits";
import Plus from "../../../assets/icons/Plus";
import { useGoals } from "@/src/stores/goals";
import { useGlobal } from "@/src/stores/global";
import useNotifications from "../../hooks/useNotifications";

const Home = () => {
  const date = new Date();
  const day = getDayString(date.getDay());
  const month = getMonthString(date.getMonth());
  const formattedDate = `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
  const { getGoalById } = useGoals();
  const { setGoalEditData } = useGlobal();
  useNotifications();

  const handleGoalEdit = (item) => {
    setGoalEditData({ habitId: item.id, ...getGoalById(item.goalId) });
    router.push("/goal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Banner />
      <Habits handleGoalEdit={handleGoalEdit} />
      <Pressable onPress={() => router.push("/goal")} style={styles.fab}>
        <Plus />
      </Pressable>
    </View>
  );
};

export default Home;
