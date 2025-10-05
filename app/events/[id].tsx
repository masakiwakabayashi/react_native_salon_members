import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getEventById } from '@/constants/event';

const formatEventDateTime = (isoDate: string) => {
  const date = new Date(isoDate);

  const dateLabel = date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const timeLabel = date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { dateLabel, timeLabel };
};

const splitContent = (content?: string) =>
  content
    ? content
        .trim()
        .split(/\n\s*\n/)
        .filter((block) => block.length > 0)
    : [];

export default function EventDetailScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const rawId = params.id;
  const eventId = Array.isArray(rawId) ? rawId[0] : rawId;

  const event = getEventById(eventId);

  if (!event) {
    return <EventNotFound />;
  }

  const { dateLabel, timeLabel } = formatEventDateTime(event.date);
  const detailBlocks = splitContent(event.content);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: 'イベント詳細', headerBackTitle: '戻る' }} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.heroCard}>
          <View style={styles.heroMetaRow}>
            <ThemedText style={styles.heroDate}>{dateLabel}</ThemedText>
            <ThemedText style={styles.heroTime}>{timeLabel} 開始</ThemedText>
          </View>
          <ThemedText style={styles.heroTitle}>{event.name}</ThemedText>
          <View style={styles.locationRow}>
            <ThemedText style={styles.locationLabel}>開催場所</ThemedText>
            <ThemedText style={styles.locationValue}>{event.location}</ThemedText>
          </View>
          {event.tags && event.tags.length > 0 && (
            <View style={styles.tagsRow}>
              {event.tags.map((tag) => (
                <View key={tag} style={styles.tagPill}>
                  <ThemedText style={styles.tagText}>{tag}</ThemedText>
                </View>
              ))}
            </View>
          )}
        </ThemedView>

        <ThemedView style={styles.sectionCard}>
          <ThemedText style={styles.sectionTitle}>イベント概要</ThemedText>
          <ThemedText style={styles.sectionBody}>{event.description}</ThemedText>
        </ThemedView>

        {(event.host || event.capacity || event.fee || event.registrationDeadline) && (
          <ThemedView style={styles.sectionCard}>
            <ThemedText style={styles.sectionTitle}>基本情報</ThemedText>
            {event.host && <InfoRow label="主催" value={event.host} />}
            {event.capacity && <InfoRow label="定員" value={event.capacity} />}
            {event.fee && <InfoRow label="参加費" value={event.fee} />}
            {event.registrationDeadline && (
              <InfoRow label="申込締切" value={event.registrationDeadline} />
            )}
          </ThemedView>
        )}

        {detailBlocks.length > 0 && (
          <ThemedView style={styles.sectionCard}>
            <ThemedText style={styles.sectionTitle}>開催詳細</ThemedText>
            {detailBlocks.map((block, index) => (
              <ThemedText key={`detail-${index}`} style={styles.detailParagraph}>
                {block}
              </ThemedText>
            ))}
          </ThemedView>
        )}

        {event.schedule && event.schedule.length > 0 && (
          <ThemedView style={styles.sectionCard}>
            <ThemedText style={styles.sectionTitle}>当日のスケジュール</ThemedText>
            <View style={styles.scheduleList}>
              {event.schedule.map((item) => (
                <View key={`${event.id}-${item.time}-${item.title}`} style={styles.scheduleItem}>
                  <ThemedText style={styles.scheduleTime}>{item.time}</ThemedText>
                  <View style={styles.scheduleBody}>
                    <ThemedText style={styles.scheduleTitle}>{item.title}</ThemedText>
                    {item.description && (
                      <ThemedText style={styles.scheduleDescription}>{item.description}</ThemedText>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ThemedView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

function EventNotFound() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: 'イベント詳細', headerBackTitle: '戻る' }} />
      <View style={styles.notFoundWrapper}>
        <ThemedText type="title" style={styles.notFoundTitle}>
          イベントが見つかりません
        </ThemedText>
        <ThemedText style={styles.notFoundBody}>
          リンクが無効か、イベントが終了した可能性があります。
        </ThemedText>
        <Link href="/(tabs)/events" asChild>
          <Pressable style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>イベント一覧に戻る</ThemedText>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 24,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderLeftWidth: 6,
    borderLeftColor: '#4A90E2',
    shadowColor: '#00000021',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    gap: 12,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroDate: {
    color: '#2F6EE2',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  heroTime: {
    marginLeft: 'auto',
    color: '#555555',
    fontSize: 13,
  },
  heroTitle: {
    color: '#333333',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tagPill: {
    backgroundColor: '#E6F0FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    color: '#2F6EE2',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#00000014',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    gap: 12,
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionBody: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 22,
  },
  detailParagraph: {
    color: '#444444',
    fontSize: 14,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoLabel: {
    minWidth: 72,
    color: '#2F6EE2',
    fontSize: 12,
    fontWeight: '700',
  },
  infoValue: {
    flex: 1,
    color: '#555555',
    fontSize: 14,
    lineHeight: 20,
  },
  scheduleList: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    gap: 16,
  },
  scheduleTime: {
    width: 64,
    color: '#2F6EE2',
    fontSize: 13,
    fontWeight: '700',
  },
  scheduleBody: {
    flex: 1,
    gap: 4,
  },
  scheduleTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '700',
  },
  scheduleDescription: {
    color: '#555555',
    fontSize: 13,
    lineHeight: 20,
  },
  notFoundWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  notFoundTitle: {
    color: '#333333',
    textAlign: 'center',
  },
  notFoundBody: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 12,
    backgroundColor: '#1E88E5',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
