import { Link, type Href } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { EventCard } from '@/components/events/event-card';
import { NoticeCard } from '@/components/notices/notice-card';
import { ThemedText } from '@/components/themed-text';
import { notices } from '@/constants/notices';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchNextEvents, type EventRecord } from '@/repositories/events';

const MAX_ITEMS = 3;

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [upcomingEvents, setUpcomingEvents] = useState<EventRecord[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchNextEvents(MAX_ITEMS)
      .then((records) => {
        if (!cancelled) setUpcomingEvents(records);
      })
      .catch((error) => {
        console.warn('イベントの取得に失敗しました', error);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingEvents(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const latestNotices = [...notices]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="近日開催のイベント" href="/events">
          {isLoadingEvents ? (
            <ActivityIndicator />
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <ThemedText style={styles.empty}>近日開催のイベントはありません</ThemedText>
          )}
        </Section>
        <Section title="新着のお知らせ" href="/notices">
          {latestNotices.length > 0 ? (
            latestNotices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)
          ) : (
            <ThemedText style={styles.empty}>お知らせはありません</ThemedText>
          )}
        </Section>
      </ScrollView>
    </View>
  );
}

function Section({ title, href, children }: { title: string; href: Href; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <Link href={href}>
          <ThemedText type="link" style={styles.more}>
            すべて見る
          </ThemedText>
        </Link>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    fontSize: 14,
  },
  empty: {
    fontSize: 14,
    opacity: 0.7,
  },
});
