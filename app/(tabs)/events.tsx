import { ScrollView, StyleSheet, View } from 'react-native';

import { EventCard } from '@/components/events/event-card';
import { ThemedText } from '@/components/themed-text';
import { events } from '@/constants/event';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function EventsScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">イベント</ThemedText>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
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
