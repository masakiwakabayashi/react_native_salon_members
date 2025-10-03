import { Link } from "expo-router";
import React from "react";
import { AccessibilityRole, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/icon-symbol";

// MEMO: 自作のヘッダーは使わない方がいいか

/**
 * 共通ヘッダーコンポーネント
 * - 画面上部に常時表示
 * - 右側の人間アイコンをタップでマイページへ遷移
 */
export const Header: React.FC = () => {
  // アクセシビリティラベル
  const myPageLabel = "マイページへ";

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
      // iOS/Android両対応でノッチ・ステータスバーを考慮
    >
      <View style={styles.container}>
        <Text style={styles.title} accessibilityRole="header" accessibilityLabel="アプリ名">
          SalonApp
        </Text>
        <Link href="/mypage" asChild>
          <Text
            style={styles.iconButton}
            accessibilityRole={"button" as AccessibilityRole}
            accessibilityLabel={myPageLabel}
          >
            <IconSymbol name="person.fill" size={28} color="#333333" />
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

/**
 * スタイル定義
 * - カラールール・レスポンシブ考慮
 */
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF", // 全体背景
  },
  container: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
