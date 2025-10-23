import { Text, TouchableOpacity, View } from "react-native";

import { getDayString, getMonthString } from "../../utils/dates";
import styles from "./styles";
import Banner from "./Banner";
import Habits from "./Habits";
import Plus from "../../../assets/icons/Plus";

const Home = () => {
  const date = new Date();
  const day = getDayString(date.getDay());
  const month = getMonthString(date.getMonth());
  const formattedDate = `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Banner />
      <Habits />
      <TouchableOpacity style={styles.fab}>
        <Plus />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
