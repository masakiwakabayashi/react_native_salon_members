import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { columns } from '@/constants/columns';
import { useThemeColor } from '@/hooks/use-theme-color';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
};

export default function ColumnsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">コラム</ThemedText>
        {columns.map((column) => (
          <ThemedView key={column.id} style={[styles.card, { borderColor }]}>
            <ThemedText type="defaultSemiBold">{column.title}</ThemedText>
            <ThemedText style={styles.meta}>
              {formatDate(column.publishedAt)}・{column.author}・{column.readingMinutes}分で読めます
            </ThemedText>
            <ThemedText style={styles.summary}>{column.summary}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </SafeAreaView>
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
});
