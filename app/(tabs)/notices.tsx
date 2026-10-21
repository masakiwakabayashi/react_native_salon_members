import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { noticeCategoryThemes, notices } from '@/constants/notices';
import { useThemeColor } from '@/hooks/use-theme-color';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
};

export default function NoticesScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">お知らせ</ThemedText>
        {notices.map((notice) => {
          const theme = noticeCategoryThemes[notice.category];
          return (
            <ThemedView key={notice.id} style={[styles.card, { borderColor }]}>
              <View style={styles.header}>
                <View style={[styles.badge, { backgroundColor: theme.badgeBackground }]}>
                  <ThemedText style={[styles.badgeText, { color: theme.badgeTextColor }]}>
                    {notice.category}
                  </ThemedText>
                </View>
                <ThemedText style={styles.meta}>{formatDate(notice.publishedAt)}</ThemedText>
                {notice.isNew && <ThemedText style={styles.newLabel}>NEW</ThemedText>}
              </View>
              <ThemedText type="defaultSemiBold">{notice.title}</ThemedText>
              <ThemedText style={styles.summary}>{notice.summary}</ThemedText>
            </ThemedView>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    opacity: 0.7,
  },
  newLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E65100',
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },
});
