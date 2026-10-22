import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { EventCard } from '@/components/events/event-card';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchUpcomingEvents, type EventRecord } from '@/repositories/events';

export default function EventsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchUpcomingEvents()
      .then((records) => {
        if (!cancelled) setEvents(records);
      })
      .catch((error) => {
        console.warn('イベントの取得に失敗しました', error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">イベント</ThemedText>
        {isLoading ? (
          <ActivityIndicator />
        ) : events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <ThemedText style={styles.empty}>開催予定のイベントはありません</ThemedText>
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
