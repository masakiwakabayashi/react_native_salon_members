import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TabLabels } from '@/constants/tab-labels';
import { getContentCategoryLabel } from '@/constants/videos';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchContents, type ContentRecord } from '@/repositories/contents';

export default function VideosScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');
  const thumbnailColor = useThemeColor({ light: '#D0D0D0', dark: '#353636' }, 'icon');
  const [videos, setVideos] = useState<ContentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // タブを開くたびに取得し直し、DB の更新を反映する。再取得中は前回の内容を表示したままにする
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      fetchContents()
        .then((records) => {
          if (!cancelled) setVideos(records);
        })
        .catch((error) => {
          console.warn('動画教材の取得に失敗しました', error);
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
        <ThemedText type="title">{TabLabels.videos}</ThemedText>
        {isLoading ? (
          <ActivityIndicator />
        ) : videos.length > 0 ? (
          videos.map((video) => (
            <ThemedView key={video.id} style={[styles.card, { borderColor }]}>
              <View style={[styles.thumbnail, { backgroundColor: thumbnailColor }]}>
                <IconSymbol size={48} name="play.circle.fill" color="#FFFFFF" />
              </View>
              <View style={styles.body}>
                <ThemedText type="defaultSemiBold">{video.title}</ThemedText>
                {video.category && (
                  <ThemedText style={styles.meta}>{getContentCategoryLabel(video.category)}</ThemedText>
                )}
              </View>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={styles.empty}>{TabLabels.videos}はありません</ThemedText>
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
    overflow: 'hidden',
  },
  thumbnail: {
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 16,
    gap: 8,
  },
  meta: {
    fontSize: 13,
    opacity: 0.7,
  },
  empty: {
    fontSize: 14,
    opacity: 0.7,
  },
});
