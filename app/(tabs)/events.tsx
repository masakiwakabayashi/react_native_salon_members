import React from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Event } from "../../constants/event";

/**
 * ダミーイベントデータ
 * ※将来的にSupabase連携で差し替え予定
 */
const dummyEvents: Event[] = [
  {
    id: "1",
    name: "オンラインサロン開設記念イベント",
    date: "2025-09-20T19:00:00+09:00",
    location: "Zoom（オンライン）",
    description: "サロン開設を記念したオンラインイベントです。主催者によるトークやQ&Aを予定しています。",
  },
  {
    id: "2",
    name: "月例ミートアップ",
    date: "2025-10-05T18:00:00+09:00",
    location: "渋谷コワーキングスペース",
    description: "メンバー同士の交流を目的としたオフラインミートアップです。お気軽にご参加ください。",
  },
  {
    id: "3",
    name: "特別ゲスト講演会",
    date: "2025-10-15T20:00:00+09:00",
    location: "YouTube Live",
    description: "業界著名人を招いた特別講演会。最新トレンドやキャリアについて語っていただきます。",
  },
];

/**
 * 日時を日本語でフォーマット
 * @param isoDate ISO8601形式の日付文字列
 * @returns フォーマット済み日付文字列
 */
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  });
};

/**
 * イベントカードのProps型
 */
type EventCardProps = {
  event: Event;
};

/**
 * イベントカードコンポーネント
 * @param event イベント情報
 */
const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <View style={styles.eventCard}>
    {/* アクセントライン */}
    <View style={styles.accentLine} />
    <Text style={styles.eventName}>{event.name}</Text>
    <Text style={styles.eventDate}>開催日時: <Text style={styles.eventDateValue}>{formatDate(event.date)}</Text></Text>
    <Text style={styles.eventLocation}>開催場所: <Text style={styles.eventLocationValue}>{event.location}</Text></Text>
    <Text style={styles.eventDescription}>{event.description}</Text>
    {/* 主要アクションボタン例（今後詳細ページや参加機能追加時に活用） */}
    {/* <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
      <Text style={styles.actionButtonText}>詳細を見る</Text>
    </TouchableOpacity> */}
  </View>
);

/**
 * イベント一覧ページ
 */
const EventsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Text style={styles.title}>イベント一覧</Text>
      <FlatList
        data={dummyEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;

/**
 * カラールール・UI/UXベストプラクティスに基づくスタイル
 */
const { width } = Dimensions.get("window");
const CARD_MAX_WIDTH = 480;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // 全体背景
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 24 : 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333", // ヘッダー/タイトル
    textAlign: "center",
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 32,
    alignItems: "center",
  },
  eventCard: {
    width: "100%",
    maxWidth: CARD_MAX_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    position: "relative",
  },
  accentLine: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 6,
    height: "100%",
    backgroundColor: "#FF7043", // メインアクセント
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333", // タイトル
    marginBottom: 10,
    marginLeft: 10,
  },
  eventDate: {
    fontSize: 14,
    color: "#555555", // 本文
    marginBottom: 2,
    marginLeft: 10,
  },
  eventDateValue: {
    color: "#FF7043", // アクセントカラー
    fontWeight: "bold",
  },
  eventLocation: {
    fontSize: 14,
    color: "#555555", // 本文
    marginBottom: 8,
    marginLeft: 10,
  },
  eventLocationValue: {
    color: "#FF6B6B", // リンク/ボタン強調色
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 15,
    color: "#777777", // 本文
    marginBottom: 0,
    marginLeft: 10,
    lineHeight: 22,
  },
  actionButton: {
    marginTop: 16,
    backgroundColor: "#FF7043", // 主要アクションボタン背景
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "flex-end",
    minWidth: 120,
    shadowColor: "#FF7043",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionButtonText: {
    color: "#FFFFFF", // 主要アクションボタン文字色
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
