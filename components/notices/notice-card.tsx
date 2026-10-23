import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getNoticeCategoryTheme } from '@/constants/notices';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { NotificationRecord } from '@/repositories/notifications';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
};

export function NoticeCard({ notice }: { notice: NotificationRecord }) {
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');
  const theme = notice.category ? getNoticeCategoryTheme(notice.category) : null;

  return (
    <ThemedView style={[styles.card, { borderColor }]}>
      <View style={styles.header}>
        {notice.category && theme && (
          <View style={[styles.badge, { backgroundColor: theme.badgeBackground }]}>
            <ThemedText style={[styles.badgeText, { color: theme.badgeTextColor }]}>
              {notice.category}
            </ThemedText>
          </View>
        )}
        <ThemedText style={styles.meta}>{formatDate(notice.created_at)}</ThemedText>
      </View>
      <ThemedText type="defaultSemiBold">{notice.title}</ThemedText>
      {notice.detail && <ThemedText style={styles.summary}>{notice.detail}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },
});
