import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { videos } from '@/constants/videos';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function VideosScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');
  const thumbnailColor = useThemeColor({ light: '#D0D0D0', dark: '#353636' }, 'icon');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">動画教材</ThemedText>
        {videos.map((video) => (
          <ThemedView key={video.id} style={[styles.card, { borderColor }]}>
            <View style={[styles.thumbnail, { backgroundColor: thumbnailColor }]}>
              <IconSymbol size={48} name="play.circle.fill" color="#FFFFFF" />
            </View>
            <View style={styles.body}>
              <ThemedText type="defaultSemiBold">{video.title}</ThemedText>
              <ThemedText style={styles.meta}>
                {video.level}・{video.instructor}・{video.durationMinutes}分
              </ThemedText>
              <ThemedText style={styles.description}>{video.description}</ThemedText>
            </View>
          </ThemedView>
        ))}
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
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
