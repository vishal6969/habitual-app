import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { useEffect } from "react";
import { AppState, StatusBar, StyleSheet, View } from "react-native";
import * as Sentry from '@sentry/react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeTab from "../assets/icons/HomeTab";
import ProgressTab from "../assets/icons/ProgressTab";
import { runHabitSyncNow } from "../src/background/habitSync";
import ConfirmProvider from "../src/components/Confirm";

Sentry.init({
  dsn: 'https://26a0334fd02495bfa7ed2993892b515b@o4511021762150400.ingest.de.sentry.io/4511021762609232',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
  enabled: !__DEV__,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    runHabitSyncNow().catch((e) => {
      console.warn("runHabitSyncNow failed:", e);
    });

    // Also sync when app comes to foreground (useful when returning from background)
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        runHabitSyncNow().catch((e) => console.warn("runHabitSyncNow failed:", e));
      }
    });

    return () => {
      try {
        sub.remove();
      } catch {}
    };
  }, []);

  const insets = useSafeAreaInsets();

  const isActive = (route: string) => {
    if (!pathname) return false;
    if (route === "/" || route === "index")
      return pathname === "/" || pathname === "";
    return pathname.startsWith(route);
  };

  return (
    <ConfirmProvider>
      <Tabs>
        <View style={[styles.screenBG, { paddingTop: insets.top }]}>
          <StatusBar barStyle={"dark-content"} />
          <TabSlot />
        </View>
        <TabList asChild>
          <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
            <TabTrigger hitSlop={12} name="index" href="/">
              <HomeTab isFocussed={isActive("/")} />
            </TabTrigger>
            <TabTrigger hitSlop={12} name="progress" href="/progress">
              <ProgressTab isFocussed={isActive("/progress")} />
            </TabTrigger>
          </View>
        </TabList>
      </Tabs>
    </ConfirmProvider>
  );
});

const styles = StyleSheet.create({
  screenBG: {
    flex: 1,
    backgroundColor: "#fcfcff",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 21,
    backgroundColor: "#fcfcff",
  },
});
