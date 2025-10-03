import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { ListRenderItem } from 'react-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NoticeCategory = '重要' | 'アップデート' | 'イベント' | 'メンテナンス';

type Notice = {
  id: string;
  category: NoticeCategory;
  title: string;
  summary: string;
  publishedAt: string;
  isNew?: boolean;
};

const noticeCategoryThemes: Record<
  NoticeCategory,
  { accentColor: string; badgeBackground: string; badgeTextColor: string }
> = {
  重要: {
    accentColor: '#FF7043',
    badgeBackground: '#FFF3E0',
    badgeTextColor: '#E65100',
  },
  アップデート: {
    accentColor: '#1E88E5',
    badgeBackground: '#E3F2FD',
    badgeTextColor: '#1565C0',
  },
  イベント: {
    accentColor: '#8E24AA',
    badgeBackground: '#F3E5F5',
    badgeTextColor: '#6A1B9A',
  },
  メンテナンス: {
    accentColor: '#FFB300',
    badgeBackground: '#FFF8E1',
    badgeTextColor: '#FF8F00',
  },
};

const notices: Notice[] = [
  {
    id: 'notice-001',
    category: '重要',
    title: 'コミュニティガイドライン改定のお知らせ',
    summary:
      '2025年10月1日よりコミュニティガイドライン第3章を更新します。該当箇所をご確認のうえ運営方針に沿ったご利用をお願いします。',
    publishedAt: '2025-09-12T09:00:00+09:00',
    isNew: true,
  },
  {
    id: 'notice-002',
    category: 'メンテナンス',
    title: 'システムメンテナンス実施 (9/30 深夜)',
    summary:
      '9月30日 1:00-3:00に定期メンテナンスを実施します。作業中はログインおよび動画視聴がご利用いただけません。',
    publishedAt: '2025-09-10T18:00:00+09:00',
  },
  {
    id: 'notice-003',
    category: 'アップデート',
    title: 'プロフィール編集機能を改善しました',
    summary:
      'スマートフォンからプロフィール画像が変更しやすくなりました。併せて自己紹介タグの検索性能も向上しています。',
    publishedAt: '2025-09-08T11:30:00+09:00',
  },
  {
    id: 'notice-004',
    category: 'イベント',
    title: '10月度ウェルカムライブ配信のご案内',
    summary:
      '新メンバー向けウェルカムライブを10月1日 20:00より開催します。事前質問フォームからトピックを募集しています。',
    publishedAt: '2025-09-05T12:00:00+09:00',
  },
];

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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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
    <ThemedView style={[styles.card, { borderLeftColor: theme.accentColor }] }>
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
