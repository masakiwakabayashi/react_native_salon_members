import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * ユーザー情報の型定義
 */
type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
};

/**
 * 仮のログインユーザーデータ
 * ※本番ではSupabase等から取得し、セキュリティ上は環境変数や認証情報を直接記載しないこと
 */
const dummyUser: User = {
  id: "user_001",
  name: "山田 太郎",
  email: "taro.yamada@example.com",
  avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  bio: "趣味はカフェ巡りと映画鑑賞。",
};

/**
 * マイページ
 * ログインユーザーの情報を表示
 * タブナビゲーションには含めない
 */
const MyPage: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* プロフィール画像 */}
        <Image
          source={{ uri: dummyUser.avatarUrl }}
          style={styles.avatar}
          accessibilityLabel="プロフィール画像"
        />
        {/* ユーザー名 */}
        <Text style={styles.name}>{dummyUser.name}</Text>
        {/* メールアドレス */}
        <Text style={styles.email}>{dummyUser.email}</Text>
        {/* 自己紹介 */}
        <Text style={styles.bio}>{dummyUser.bio}</Text>
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF", // 全体背景
    justifyContent: "flex-start", // 上寄せ
    alignItems: "center",
    paddingTop: 40, // 上部余白をやや多めに
    paddingBottom: 32, // 下部余白
  },
  container: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    padding: 24,
    shadowColor: "#333333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: windowWidth * 0.32,
    height: windowWidth * 0.32,
    borderRadius: (windowWidth * 0.32) / 2,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FF7043", // アクセントカラー
    backgroundColor: "#FFF",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333", // ヘッダー/タイトル
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: "#777777", // 本文グレー
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    color: "#555555", // 本文グレー
    textAlign: "center",
    lineHeight: 22,
  },
});

export default MyPage;
