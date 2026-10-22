import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileIcon } from '@/components/profile-icon';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserProfile } from '@/hooks/use-user-profile';

export function AppHeader() {
  const { iconUrl } = useUserProfile();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 8, backgroundColor, borderBottomColor: borderColor },
      ]}>
      <Pressable
        onPress={() => router.push('/profile')}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="プロフィールを表示">
        <ProfileIcon uri={iconUrl} size={28} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
