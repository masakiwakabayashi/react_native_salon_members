import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileIcon } from '@/components/profile-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserProfile } from '@/hooks/use-user-profile';

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const { profile, isLoading } = useUserProfile();

  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loading, { backgroundColor }]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <ProfileIcon uri={profile?.icon_image} size={96} />
        </View>
        <ThemedView style={[styles.card, { borderColor }]}>
          <View style={styles.field}>
            <ThemedText style={styles.label}>メールアドレス</ThemedText>
            <ThemedText>{session?.user.email}</ThemedText>
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>自己紹介</ThemedText>
            <ThemedText>{profile?.description || '未設定'}</ThemedText>
          </View>
        </ThemedView>
        {/* ログアウトすると AuthProvider のセッション更新で自動的にログイン画面へ切り替わる */}
        <Pressable
          style={({ pressed }) => [styles.signOutButton, { opacity: pressed ? 0.6 : 1 }]}
          onPress={signOut}>
          <ThemedText style={styles.signOutText}>ログアウト</ThemedText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  field: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    opacity: 0.7,
  },
  signOutButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#C2412D',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: '#C2412D',
    fontWeight: '600',
  },
});
