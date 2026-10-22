import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileIcon } from '@/components/profile-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserProfile } from '@/hooks/use-user-profile';

// アップロードする画像の一辺のサイズ（px）。アイコン表示には十分な大きさに縮小して容量を抑える
const ICON_IMAGE_SIZE = 512;
// アップロードできる画像の容量の上限（バイト）。avatars バケットの file_size_limit と合わせる
const MAX_ICON_IMAGE_BYTES = 1024 * 1024;

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const { profile, iconUrl, isLoading, updateIconImage } = useUserProfile();
  const [isUploading, setIsUploading] = useState(false);

  const handleChangeIcon = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled) return;

    setIsUploading(true);
    try {
      const context = ImageManipulator.manipulate(result.assets[0].uri);
      context.resize({ width: ICON_IMAGE_SIZE, height: ICON_IMAGE_SIZE });
      const image = await context.renderAsync();
      const resized = await image.saveAsync({ format: SaveFormat.JPEG, compress: 0.8 });

      const { size } = await fetch(resized.uri).then((response) => response.blob());
      if (size > MAX_ICON_IMAGE_BYTES) {
        Alert.alert('画像のサイズが大きすぎます', '1MB以下になるよう、別の画像を選んでください。');
        return;
      }
      await updateIconImage(resized.uri);
    } catch (error) {
      console.warn('プロフィール画像の更新に失敗しました', error);
      Alert.alert('画像を変更できませんでした', '時間をおいて再度お試しください。');
    } finally {
      setIsUploading(false);
    }
  };

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
          <Pressable
            onPress={handleChangeIcon}
            disabled={!profile || isUploading}
            style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.6 : 1 }]}
            accessibilityRole="button"
            accessibilityLabel="プロフィール画像を変更">
            <ProfileIcon uri={iconUrl} size={96} />
            {isUploading && (
              <View style={styles.iconUploading}>
                <ActivityIndicator color="#FFFFFF" />
              </View>
            )}
          </Pressable>
          {profile && <ThemedText style={styles.iconChangeText}>画像を変更</ThemedText>}
        </View>
        <ThemedView style={[styles.card, { borderColor }]}>
          <View style={styles.field}>
            <ThemedText style={styles.label}>名前</ThemedText>
            <ThemedText>{profile?.name || '未設定'}</ThemedText>
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>メールアドレス</ThemedText>
            <ThemedText>{session?.user.email}</ThemedText>
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.label}>期</ThemedText>
            <ThemedText>{profile?.cohort ? `${profile.cohort}期生` : '未設定'}</ThemedText>
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
    gap: 8,
  },
  iconButton: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconUploading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  iconChangeText: {
    fontSize: 13,
    opacity: 0.7,
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
