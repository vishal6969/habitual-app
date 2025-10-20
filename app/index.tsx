import { useEffect } from "react";

import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";

import HomeScreen from "../src/screens/Home";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [loaded, error] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return <HomeScreen />;
}
