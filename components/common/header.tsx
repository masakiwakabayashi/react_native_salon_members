import { useRouter } from "expo-router";
import React from "react";
import { AccessibilityRole, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

/**
 * 共通ヘッダーコンポーネント
 * - 画面上部に常時表示
 * - 右側の人間アイコンをタップでマイページへ遷移
 */
export const Header: React.FC = () => {
  const router = useRouter();

  // アクセシビリティラベル
  const myPageLabel = "マイページへ";

  const handlePress = () => {
    router.push("/mypage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header" accessibilityLabel="アプリ名">
        SalonApp
      </Text>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.iconButton}
        accessibilityRole={"button" as AccessibilityRole}
        accessibilityLabel={myPageLabel}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <IconSymbol name="person.fill" size={28} color="#333333" />
      </TouchableOpacity>
    </View>
  );
};

/**
 * スタイル定義
 * - カラールール・レスポンシブ考慮
 */
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF", // 全体背景
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    // iOSのノッチ対応
    paddingTop: Platform.OS === "ios" ? 16 : 0,
  },
  title: {
    color: "#333333", // ヘッダー/タイトル
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  iconButton: {
    padding: 4,
    borderRadius: 20,
    // タッチ領域拡大
    justifyContent: "center",
    alignItems: "center",
  },
});
