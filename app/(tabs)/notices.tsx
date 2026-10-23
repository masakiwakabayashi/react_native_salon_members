import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { NoticeCard } from '@/components/notices/notice-card';
import { ThemedText } from '@/components/themed-text';
import { TabLabels } from '@/constants/tab-labels';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchNotifications, type NotificationRecord } from '@/repositories/notifications';

export default function NoticesScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [notices, setNotices] = useState<NotificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // タブを開くたびに取得し直し、DB の更新を反映する。再取得中は前回の内容を表示したままにする
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      fetchNotifications()
        .then((records) => {
          if (!cancelled) setNotices(records);
        })
        .catch((error) => {
          console.warn('お知らせの取得に失敗しました', error);
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">{TabLabels.notices}</ThemedText>
        {isLoading ? (
          <ActivityIndicator />
        ) : notices.length > 0 ? (
          notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)
        ) : (
          <ThemedText style={styles.empty}>お知らせはありません</ThemedText>
        )}
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
  empty: {
    fontSize: 14,
    opacity: 0.7,
  },
});
