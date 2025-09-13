import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * お知らせデータ型
 */
type Notice = {
  id: string;
  title: string;
  date: string;
};

/**
 * イベントデータ型
 */
type Event = {
  id: string;
  title: string;
  date: string;
};

/**
 * コラムデータ型
 */
type Column = {
  id: string;
  title: string;
  author: string;
};

/**
 * 動画データ型
 */
type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

// ダミーデータ（本番はSupabaseから取得）
const recentNotices: Notice[] = [
  { id: '1', title: '新機能リリースのお知らせ', date: '2025-09-10' },
];
const thisMonthEvents: Event[] = [
  { id: '1', title: '9月オンライン交流会', date: '2025-09-20' },
];
const todayColumn: Column = {
  id: '1',
  title: 'サロン活用のコツ',
  author: '運営スタッフ',
};
const recentVideos: Video[] = [
  {
    id: '1',
    title: '新メンバー向けガイダンス動画',
    thumbnailUrl: 'https://placehold.jp/150x90.png',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        {/* 最近のお知らせ */}
        <SectionCard title="最近のお知らせ" accent>
        {recentNotices.map((notice) => (
          <View key={notice.id} style={styles.itemRow}>
            <ThemedText style={styles.itemTitle}>{notice.title}</ThemedText>
            <ThemedText style={styles.itemDate}>{notice.date}</ThemedText>
          </View>
        ))}
        <Link href="/(tabs)/notices" asChild>
          <ThemedText style={styles.linkButton} accessibilityRole="button">
            お知らせ一覧を見る
          </ThemedText>
        </Link>
      </SectionCard>

      {/* 今月のイベント */}
      <SectionCard title="今月のイベント">
        {thisMonthEvents.map((event) => (
          <View key={event.id} style={styles.itemRow}>
            <ThemedText style={styles.itemTitle}>{event.title}</ThemedText>
            <ThemedText style={styles.itemDate}>{event.date}</ThemedText>
          </View>
        ))}
        <Link href="/events" asChild>
          <ThemedText style={styles.linkButton} accessibilityRole="button">
            イベント一覧を見る
          </ThemedText>
        </Link>
      </SectionCard>

      {/* 当日のコラム */}
      <SectionCard title="本日のコラム">
        <View style={styles.itemRow}>
          <ThemedText style={styles.itemTitle}>{todayColumn.title}</ThemedText>
          <ThemedText style={styles.itemAuthor}>by {todayColumn.author}</ThemedText>
        </View>
        <Link href="/(tabs)/columns" asChild>
          <ThemedText style={styles.linkButton} accessibilityRole="button">
            コラム一覧を見る
          </ThemedText>
        </Link>
      </SectionCard>

      {/* 最近追加された動画 */}
      <SectionCard title="最近追加された動画">
        {recentVideos.map((video) => (
          <View key={video.id} style={styles.videoRow}>
            <View style={styles.thumbnailPlaceholder}>
              {/* 本番はImageコンポーネント推奨 */}
            </View>
            <ThemedText style={styles.itemTitle}>{video.title}</ThemedText>
          </View>
        ))}
        <Link href="/(tabs)/videos" asChild>
          <ThemedText style={styles.linkButton} accessibilityRole="button">
            動画一覧を見る
          </ThemedText>
        </Link>
      </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * セクションカード共通コンポーネント
 */
type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
};
function SectionCard({ title, children, accent }: SectionCardProps) {
  return (
    <ThemedView
      style={[
        styles.sectionCard,
        accent && { borderLeftColor: '#FF7043', borderLeftWidth: 6 },
      ]}
    >
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.sectionContent}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#33333322',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    borderLeftColor: '#EEE',
    borderLeftWidth: 4,
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    color: '#555555',
    fontSize: 16,
    flex: 1,
    fontWeight: '600',
  },
  itemDate: {
    color: '#777777',
    fontSize: 14,
    marginLeft: 8,
  },
  itemAuthor: {
    color: '#777777',
    fontSize: 14,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  linkButton: {
    backgroundColor: '#FF7043',
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    elevation: 1,
  },
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  thumbnailPlaceholder: {
    width: 60,
    height: 36,
    backgroundColor: '#EEE',
    borderRadius: 6,
    marginRight: 8,
  },
});
