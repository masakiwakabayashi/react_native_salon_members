import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Event } from '@/constants/event';
import { useThemeColor } from '@/hooks/use-theme-color';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function EventCard({ event }: { event: Event }) {
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');

  return (
    <ThemedView style={[styles.card, { borderColor }]}>
      <ThemedText type="subtitle">{event.name}</ThemedText>
      <ThemedText style={styles.meta}>
        {formatDate(event.date)}・{event.location}
      </ThemedText>
      <ThemedText>{event.description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  meta: {
    fontSize: 13,
    opacity: 0.7,
  },
});
