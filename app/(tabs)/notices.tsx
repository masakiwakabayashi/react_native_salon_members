import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Notice } from '@/constants/notices';
import { noticeCategoryThemes, notices } from '@/constants/notices';
import { Link } from 'expo-router';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
};

const renderNoticeCard: ListRenderItem<Notice> = ({ item }) => <NoticeCard notice={item} />;

export default function NoticesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id}
        renderItem={renderNoticeCard}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ListSeparator}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function ListHeader() {
  return (
    <View style={styles.headerWrapper}>
      <ThemedText type="title" style={styles.title}>
        お知らせ一覧
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        サロン運営からの最新情報をお届けします。重要なお知らせはメールでも配信していますので、併せてご確認ください。
      </ThemedText>
    </View>
  );
}

function ListSeparator() {
  return <View style={styles.separator} />;
}

type NoticeCardProps = {
  notice: Notice;
};

function NoticeCard({ notice }: NoticeCardProps) {
  const theme = noticeCategoryThemes[notice.category];

  return (
    <Link
      href={{ pathname: '/notices/[id]', params: { id: notice.id } }}
      asChild>
      <Pressable
        android_ripple={{ color: '#E0E0E0' }}
        style={({ pressed }) => [styles.cardPressable, pressed && styles.cardPressablePressed]}>
        <ThemedView style={[styles.card, { borderLeftColor: theme.accentColor }]}>
          <View style={styles.metaRow}>
            <View style={[styles.categoryBadge, { backgroundColor: theme.badgeBackground }]}>
              <ThemedText style={[styles.categoryLabel, { color: theme.badgeTextColor }]}>{notice.category}</ThemedText>
            </View>
            <ThemedText style={styles.noticeDate}>{formatDate(notice.publishedAt)}</ThemedText>
            {notice.isNew && (
              <View style={styles.newBadge}>
                <ThemedText style={styles.newBadgeText}>NEW</ThemedText>
              </View>
            )}
          </View>
          <ThemedText style={styles.noticeTitle}>{notice.title}</ThemedText>
          <ThemedText style={styles.noticeSummary}>{notice.summary}</ThemedText>
          <ThemedText style={styles.noticeFooter}>詳しく見る &gt;</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  headerWrapper: {
    gap: 8,
    marginBottom: 12,
  },
  title: {
    color: '#333333',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    height: 16,
  },
  cardPressable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardPressablePressed: {
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 6,
    shadowColor: '#00000021',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 12,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  noticeDate: {
    marginLeft: 'auto',
    color: '#777777',
    fontSize: 12,
  },
  newBadge: {
    marginLeft: 12,
    backgroundColor: '#FF7043',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  noticeTitle: {
    marginTop: 12,
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  noticeSummary: {
    marginTop: 8,
    color: '#555555',
    fontSize: 14,
    lineHeight: 22,
  },
  noticeFooter: {
    marginTop: 14,
    color: '#FF7043',
    fontSize: 13,
    fontWeight: '600',
  },
});
