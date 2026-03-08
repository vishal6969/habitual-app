import Constants from "expo-constants";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { Platform } from "react-native";

/**
 * Initialize Firebase (if needed) and ensure an anonymous auth user.
 * Returns the auth user or null if firebase is not configured or auth failed.
 */
export async function ensureFirebaseInitialized() {
  const firebaseConfig =
    Constants?.expoConfig?.extra?.firebaseConfig ||
    Constants?.manifest?.extra?.firebaseConfig;

  if (!firebaseConfig) return null;

  if (!getApps().length) {
    try {
      initializeApp(firebaseConfig);
    } catch (e) {
      console.warn("Firebase initializeApp error", e);
      return null;
    }
  }

  const auth = getAuth();

  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.warn("Anonymous sign-in failed:", e);
      return null;
    }
  }

  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          unsub();
        } catch {}
        resolve(user);
      }
    });
    setTimeout(() => resolve(auth.currentUser || null), 3000);
  });
}

/**
 * Save an Expo push token into Firestore under collection `devices`.
 * No-op if Firebase isn't configured or initialization fails.
 */
export async function saveTokenToFirestore(pushToken) {
  const firebaseConfig =
    Constants?.expoConfig?.extra?.firebaseConfig ||
    Constants?.manifest?.extra?.firebaseConfig;

  if (!firebaseConfig) return;

  const user = await ensureFirebaseInitialized();
  if (!user) return;

  try {
    const db = getFirestore();
    const docRef = doc(db, "devices", pushToken);
    await setDoc(docRef, {
      token: pushToken,
      uid: user.uid,
      platform: Platform.OS,
      createdAt: serverTimestamp(),
    });
    console.log("Saved push token to Firestore");
  } catch (e) {
    console.warn("Failed to save push token to Firestore:", e);
  }
}

export default {
  ensureFirebaseInitialized,
  saveTokenToFirestore,
};
