import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * 動画一覧ページ（仮）
 */
export default function VideosScreen() {
  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title" style={{ color: '#333333', marginBottom: 12 }}>
        動画一覧
      </ThemedText>
      <ThemedText style={{ color: '#777777' }}>このページは準備中です。</ThemedText>
    </ThemedView>
  );
}
