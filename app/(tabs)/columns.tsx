import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TabLabels } from '@/constants/tab-labels';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchColumns, type ColumnRecord } from '@/repositories/columns';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
};

export default function ColumnsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');
  const [columns, setColumns] = useState<ColumnRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // タブを開くたびに取得し直し、DB の更新を反映する。再取得中は前回の内容を表示したままにする
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      fetchColumns()
        .then((records) => {
          if (!cancelled) setColumns(records);
        })
        .catch((error) => {
          console.warn('コラムの取得に失敗しました', error);
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
        <ThemedText type="title">{TabLabels.columns}</ThemedText>
        {isLoading ? (
          <ActivityIndicator />
        ) : columns.length > 0 ? (
          columns.map((column) => (
            <ThemedView key={column.id} style={[styles.card, { borderColor }]}>
              <ThemedText type="defaultSemiBold">{column.title}</ThemedText>
              <ThemedText style={styles.meta}>{formatDate(column.created_at)}</ThemedText>
              {column.detail && <ThemedText style={styles.summary}>{column.detail}</ThemedText>}
            </ThemedView>
          ))
        ) : (
          <ThemedText style={styles.empty}>{TabLabels.columns}はありません</ThemedText>
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
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  meta: {
    fontSize: 13,
    opacity: 0.7,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },
  empty: {
    fontSize: 14,
    opacity: 0.7,
  },
});
