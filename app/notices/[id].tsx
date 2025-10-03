import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { noticeCategoryThemes, notices } from '@/constants/notices';

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
};

const splitContent = (content: string): string[] =>
  content
    .trim()
    .split(/\n\s*\n/)
    .filter((block) => block.length > 0);

export default function NoticeDetailScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const rawId = params.id;
  const noticeId = Array.isArray(rawId) ? rawId[0] : rawId;

  const notice = notices.find((item) => item.id === noticeId);

  if (!notice) {
    return <NoticeNotFound />;
  }

  const theme = noticeCategoryThemes[notice.category];
  const contentBlocks = splitContent(notice.content);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: 'お知らせ詳細', headerBackTitle: '戻る' }} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedView style={[styles.heroCard, { borderLeftColor: theme.accentColor }]}>
          <View style={styles.metaRow}>
            <View style={[styles.categoryBadge, { backgroundColor: theme.badgeBackground }]}>
              <ThemedText style={[styles.categoryLabel, { color: theme.badgeTextColor }]}>{notice.category}</ThemedText>
            </View>
            <ThemedText style={styles.metaDate}>{formatDate(notice.publishedAt)}</ThemedText>
            {notice.isNew && (
              <View style={styles.newBadge}>
                <ThemedText style={styles.newBadgeText}>NEW</ThemedText>
              </View>
            )}
          </View>
          <ThemedText style={styles.title}>{notice.title}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionCard}>
          <ThemedText style={styles.sectionTitle}>概要</ThemedText>
          <ThemedText style={styles.sectionText}>{notice.summary}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionCard}>
          <ThemedText style={styles.sectionTitle}>詳細</ThemedText>
          {contentBlocks.map((block, index) => (
            <ThemedText key={`content-${index}`} style={styles.contentParagraph}>
              {block}
            </ThemedText>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

function NoticeNotFound() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: 'お知らせ詳細', headerBackTitle: '戻る' }} />
      <View style={styles.notFoundWrapper}>
        <ThemedText type="title" style={styles.notFoundTitle}>
          お知らせが見つかりません
        </ThemedText>
        <ThemedText style={styles.notFoundBody}>
          リンクが無効か、お知らせが削除された可能性があります。
        </ThemedText>
        <Link href="/(tabs)/notices" asChild>
          <Pressable style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>お知らせ一覧に戻る</ThemedText>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 24,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderLeftWidth: 6,
    shadowColor: '#00000021',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
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
  metaDate: {
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
  title: {
    marginTop: 16,
    color: '#333333',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#00000014',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    gap: 12,
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionText: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 22,
  },
  contentParagraph: {
    color: '#444444',
    fontSize: 14,
    lineHeight: 22,
  },
  notFoundWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  notFoundTitle: {
    color: '#333333',
    textAlign: 'center',
  },
  notFoundBody: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 12,
    backgroundColor: '#1E88E5',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
