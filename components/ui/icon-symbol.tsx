import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolView } from 'expo-symbols';
import { useMemo } from 'react';
import { Platform } from 'react-native';

import type { ComponentProps } from 'react';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

type IconProps = {
  name: SymbolName;
  size?: number;
  color?: string;
};

const FALLBACK_ICON_MAP: Record<string, ComponentProps<typeof Ionicons>['name']> = {
  'house.fill': 'home',
  'bell.fill': 'notifications',
  'doc.text.fill': 'document-text',
  'circle.fill': 'ellipse',
  'video.fill': 'videocam',
  'person.fill': 'person',
};

export function IconSymbol({ name, size = 24, color }: IconProps) {
  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        name={name}
        tintColor={color}
        resizeMode="scaleAspectFit"
        style={{ width: size, height: size }}
      />
    );
  }

  const fallbackName = FALLBACK_ICON_MAP[name] ?? 'ellipse';
  return <Ionicons name={fallbackName} size={size} color={color} />;
}
