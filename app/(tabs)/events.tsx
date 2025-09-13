import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
 */
const formatDate = (isoDate: string) => {
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
 * イベント一覧ページ
 */
const EventsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>イベント一覧</Text>
      <FlatList
        data={dummyEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDate}>開催日時: {formatDate(item.date)}</Text>
            <Text style={styles.eventLocation}>開催場所: {item.location}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#222",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 32,
  },
  eventCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: "#444",
  },
});
