// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, string>;
type IconSymbolName = string;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  // 追加分
  'bell.fill': 'notifications',
  'doc.text.fill': 'article',
  'video.fill': 'videocam',
  'circle.fill': 'event',
  'person.fill': 'person', // 人間アイコンを追加
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // 型安全＆undefined対策: MAPPING[name]が未定義なら"help"アイコンを表示
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={(MAPPING[name] ?? 'help') as keyof typeof MaterialIcons.glyphMap}
      style={style}
    />
  );
}
