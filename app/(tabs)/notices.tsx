import { ScrollView, StyleSheet, View } from 'react-native';

import { NoticeCard } from '@/components/notices/notice-card';
import { ThemedText } from '@/components/themed-text';
import { notices } from '@/constants/notices';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function NoticesScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">お知らせ</ThemedText>
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
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
});
