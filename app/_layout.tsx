import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";

import ConfirmProvider from "../src/components/Confirm";

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://26a0334fd02495bfa7ed2993892b515b@o4511021762150400.ingest.de.sentry.io/4511021762609232",
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
  enabled: !__DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [loaded, error] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-ExtraBold": require("../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <ConfirmProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="goal" options={{ presentation: "modal" }} />
      </Stack>
    </ConfirmProvider>
  );
});
