import { ScrollView, Text, View } from "react-native";

import { getDayString, getMonthString } from "../../utils/dates";
import styles from "./styles";
import Banner from "./Banner";

const Home = () => {
  const date = new Date();
  const day = getDayString(date.getDay());
  const month = getMonthString(date.getMonth());
  const formattedDate = `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Banner />
      </ScrollView>
    </View>
  );
};

export default Home;
