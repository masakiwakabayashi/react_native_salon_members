import { Tabs } from 'expo-router';
import React from 'react';

import { AppHeader } from '@/components/app-header';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TabLabels } from '@/constants/tab-labels';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        header: () => <AppHeader />,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: TabLabels.home,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notices"
        options={{
          title: TabLabels.notices,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: TabLabels.events,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="columns"
        options={{
          title: TabLabels.columns,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: TabLabels.videos,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="play.rectangle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
