import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

import HomeTab from "../assets/icons/HomeTab";
import ProfileTab from "../assets/icons/ProfileTab";
import ProgressTab from "../assets/icons/ProgressTab";

export default function RootLayout() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (!pathname) return false;
    if (route === "/" || route === "index")
      return pathname === "/" || pathname === "";
    return pathname.startsWith(route);
  };

  return (
    <Tabs>
      <SafeAreaView edges={["top"]} style={styles.screenBG}>
        <TabSlot />
      </SafeAreaView>
      <TabList asChild>
        <View style={styles.tabBar}>
          <TabTrigger name="index" href="/">
            <HomeTab isFocussed={isActive("/")} />
          </TabTrigger>
          <TabTrigger name="progress" href="/progress">
            <ProgressTab isFocussed={isActive("/progress")} />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile">
            <ProfileTab isFocussed={isActive("/profile")} />
          </TabTrigger>
        </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 55,
    paddingVertical: 21,
  },
});
