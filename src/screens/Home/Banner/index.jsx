import React from "react";

import { Image, ImageBackground, Text, View } from "react-native";

import styles from "./styles";
import ProgressComponent from "./ProgressComponent";

const Banner = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/images/home-banner-bg.png")}
    >
      <ProgressComponent />
      <View>
        <Text style={styles.infoTxt1}>3 of 5 habits</Text>
        <Text style={styles.infoTxt2}>completed today!</Text>
      </View>
      <Image
        style={styles.calendar}
        source={require("../../../../assets/images/home-calendar-icon.png")}
      />
    </ImageBackground>
  );
};

export default Banner;
