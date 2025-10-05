import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { events, type Event } from '@/constants/event';
import { Link } from 'expo-router';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatEventDateTime = (isoDate: string) => {
  const date = new Date(isoDate);

  const dateLabel = date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });

  const timeLabel = date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { dateLabel, timeLabel };
};

const renderEventCard: ListRenderItem<Event> = ({ item }) => <EventCard event={item} />;

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={ListSeparator}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function ListHeader() {
  return (
    <View style={styles.headerWrapper}>
      <ThemedText type="title" style={styles.title}>
        イベント一覧
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        サロン主催のイベントやセミナーをピックアップしました。気になるイベントは早めの参加登録がおすすめです。
      </ThemedText>
    </View>
  );
}

function ListSeparator() {
  return <View style={styles.separator} />;
}

type EventCardProps = {
  event: Event;
};

function EventCard({ event }: EventCardProps) {
  const { dateLabel, timeLabel } = formatEventDateTime(event.date);

  return (
    <Link href={{ pathname: '/events/[id]', params: { id: event.id } }} asChild>
      <Pressable
        android_ripple={{ color: '#D8E6FF' }}
        style={({ pressed }) => [styles.cardPressable, pressed && styles.cardPressablePressed]}>
        <ThemedView style={styles.card}>
          <View style={styles.metaRow}>
            <View style={styles.dateBadge}>
              <ThemedText style={styles.dateBadgeLabel}>{dateLabel}</ThemedText>
            </View>
            <ThemedText style={styles.timeLabel}>{timeLabel} 開始</ThemedText>
          </View>
          <ThemedText style={styles.eventTitle}>{event.name}</ThemedText>
          <View style={styles.locationRow}>
            <ThemedText style={styles.locationLabel}>開催場所</ThemedText>
            <ThemedText style={styles.locationValue}>{event.location}</ThemedText>
          </View>
          <ThemedText style={styles.eventDescription}>{event.description}</ThemedText>
          <ThemedText style={styles.eventFooter}>詳細を見る &gt;</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  headerWrapper: {
    gap: 8,
    marginBottom: 12,
  },
  title: {
    color: '#333333',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    height: 16,
  },
  cardPressable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardPressablePressed: {
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#4A90E2',
    shadowColor: '#00000021',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBadge: {
    borderRadius: 999,
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateBadgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2F6EE2',
    letterSpacing: 0.6,
  },
  timeLabel: {
    marginLeft: 'auto',
    color: '#555555',
    fontSize: 12,
  },
  eventTitle: {
    marginTop: 12,
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  locationLabel: {
    color: '#2F6EE2',
    fontSize: 12,
    fontWeight: '700',
  },
  locationValue: {
    color: '#555555',
    fontSize: 13,
    flexShrink: 1,
  },
  eventDescription: {
    marginTop: 10,
    color: '#555555',
    fontSize: 14,
    lineHeight: 22,
  },
  eventFooter: {
    marginTop: 14,
    color: '#2F6EE2',
    fontSize: 13,
    fontWeight: '600',
  },
});
