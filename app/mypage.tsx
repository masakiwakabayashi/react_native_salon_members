import React from "react";
import { StyleSheet, View } from "react-native";

/**
 * マイページ（中身は空）
 * タブナビゲーションには含めない
 */
const MyPage: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default MyPage;
