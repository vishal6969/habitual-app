import { useEffect } from "react";
import { AppState, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

import HomeTab from "../../assets/icons/HomeTab";
import ProgressTab from "../../assets/icons/ProgressTab";
import { runHabitSyncNow } from "../../src/background/habitSync";

export default function TabsLayout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    runHabitSyncNow().catch((e) => console.warn("runHabitSyncNow failed:", e));

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

  const isActive = (route: string) => {
    if (!pathname) return false;
    if (route === "/" || route === "index")
      return pathname === "/" || pathname === "";
    return pathname.startsWith(route);
  };

  return (
    <Tabs>
      <View style={[styles.screenBG, { paddingTop: insets.top }]}>
        <StatusBar barStyle="dark-content" />
        <TabSlot />
      </View>
      <TabList style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        <TabTrigger hitSlop={12} name="index" href="/" >
          <HomeTab isFocussed={isActive("/")} />
        </TabTrigger>
        <TabTrigger hitSlop={12} name="progress" href="/progress" >
          <ProgressTab isFocussed={isActive("/progress")} />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  screenBG: {
    flex: 1,
    backgroundColor: "#fcfcff",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 21,
    backgroundColor: "#fcfcff",
    width: "100%",
  },
});
