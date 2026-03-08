import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";
import { saveTokenToFirestore } from "./useFireStore";

const useNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  function handleRegistrationError(errorMessage) {
    // keep behavior similar to before but avoid throwing silently
    console.warn(errorMessage);
    // don't throw to avoid breaking app startup
  }

  // Firestore logic is now in `src/hooks/useFireStore.js`

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!",
      );
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({ projectId })
      ).data;

      // save token to Firestore if firebase is configured (handled in separate module)
      await saveTokenToFirestore(pushTokenString);

      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
};

export default useNotifications;
