import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeTab from "../assets/icons/HomeTab";
import ProfileTab from "../assets/icons/ProfileTab";
import ProgressTab from "../assets/icons/ProgressTab";
import ConfirmProvider from "../src/components/Confirm";

export default function RootLayout() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (!pathname) return false;
    if (route === "/" || route === "index")
      return pathname === "/" || pathname === "";
    return pathname.startsWith(route);
  };

  return (
    <ConfirmProvider>
      <Tabs>
        <SafeAreaView edges={["top"]} style={styles.screenBG}>
          <TabSlot />
        </SafeAreaView>
        <TabList asChild>
          <View style={styles.tabBar}>
            <TabTrigger hitSlop={12} name="index" href="/">
              <HomeTab isFocussed={isActive("/")} />
            </TabTrigger>
            <TabTrigger hitSlop={12} name="progress" href="/progress">
              <ProgressTab isFocussed={isActive("/progress")} />
            </TabTrigger>
            <TabTrigger hitSlop={12} name="profile" href="/profile">
              <ProfileTab isFocussed={isActive("/profile")} />
            </TabTrigger>
          </View>
        </TabList>
      </Tabs>
    </ConfirmProvider>
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
