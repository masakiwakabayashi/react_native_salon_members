import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';
import { fetchUserProfile } from '@/repositories/user-profile';

const ICON_SIZE = 28;

export function AppHeader() {
  const { session, signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const [iconImage, setIconImage] = useState<string | null>(null);

  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');
  const iconColor = useThemeColor({}, 'icon');

  const userId = session?.user.id;

  useEffect(() => {
    setIconImage(null);
    if (!userId) return;

    let cancelled = false;
    fetchUserProfile(userId)
      .then((profile) => {
        if (!cancelled) setIconImage(profile?.icon_image ?? null);
      })
      .catch((error) => {
        // 取得に失敗してもヘッダーは既定のアイコンで表示する
        console.warn('プロフィールの取得に失敗しました', error);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 8, backgroundColor, borderBottomColor: borderColor },
      ]}>
      <View style={styles.user}>
        {iconImage ? (
          <Image
            source={{ uri: iconImage }}
            style={styles.icon}
            contentFit="cover"
            // 画像が読み込めない場合は既定のアイコンに切り替える
            onError={() => setIconImage(null)}
          />
        ) : (
          <IconSymbol size={ICON_SIZE} name="person.crop.circle" color={iconColor} />
        )}
      </View>
      <Pressable onPress={signOut} hitSlop={8}>
        <ThemedText type="link" style={styles.signOut}>
          ログアウト
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  signOut: {
    fontSize: 14,
  },
});
