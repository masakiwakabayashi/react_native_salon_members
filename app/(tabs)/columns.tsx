import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * コラム一覧ページ（仮）
 */
export default function ColumnsScreen() {
  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title" style={{ color: '#333333', marginBottom: 12 }}>
        コラム一覧
      </ThemedText>
      <ThemedText style={{ color: '#777777' }}>このページは準備中です。</ThemedText>
    </ThemedView>
  );
}
