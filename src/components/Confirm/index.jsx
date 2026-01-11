import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

let _showHandler = null;

/**
 * showConfirm(options) -> Promise<boolean>
 * options: { title, subtitle, confirmText, cancelText, destructive }
 */
export function showConfirm(options = {}) {
  return new Promise((resolve) => {
    if (typeof _showHandler !== "function") {
      console.warn("ConfirmProvider not mounted — cannot show confirm dialog");
      resolve(false);
      return;
    }
    _showHandler({ ...options, resolve });
  });
}

export default function ConfirmProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [opts, setOpts] = useState({});
  const [resolver, setResolver] = useState(null);

  useEffect(() => {
    _showHandler = ({ title, subtitle, confirmText, cancelText, destructive, resolve }) => {
      setOpts({ title, subtitle, confirmText, cancelText, destructive });
      setResolver(() => resolve);
      setVisible(true);
    };

    return () => {
      _showHandler = null;
    };
  }, []);

  const onConfirm = () => {
    setVisible(false);
    if (resolver) resolver(true);
    setResolver(null);
  };

  const onCancel = () => {
    setVisible(false);
    if (resolver) resolver(false);
    setResolver(null);
  };

  return (
    <>
      {children}

      <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
        <View style={styles.backdrop}>
          <View style={styles.container}>
            {opts.title ? <Text style={styles.title}>{opts.title}</Text> : null}
            {opts.subtitle ? <Text style={styles.subtitle}>{opts.subtitle}</Text> : null}

            <View style={styles.actionsRow}>
              <Pressable onPress={onCancel} style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}>
                <Text style={styles.cancelTxt}>{opts.cancelText ?? "Cancel"}</Text>
              </Pressable>

              <Pressable onPress={onConfirm} style={({ pressed }) => [styles.confirmBtn, pressed && styles.pressed]}>
                <LinearGradient
                  colors={opts.destructive ? ["#FF6B6B", "#FF3B30"] : ["#FFA450", "#FF5C00"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmGradient}
                >
                  <Text style={styles.confirmTxt}>{opts.confirmText ?? "OK"}</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  container: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 18,
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Nunito-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 18,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Platform.OS === "web" ? 12 : 8,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginRight: 8,
  },
  cancelTxt: {
    fontFamily: "Nunito-SemiBold",
    color: "#666",
    fontSize: 14,
  },
  confirmBtn: {
    borderRadius: 8,
    overflow: "hidden",
  },
  confirmGradient: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmTxt: {
    fontFamily: "Nunito-Bold",
    color: "#fff",
    fontSize: 14,
  },
  pressed: { opacity: 0.85 },
});
