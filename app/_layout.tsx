import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import React, { useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '../components/common/header';

export const unstable_settings = {
  anchor: '',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Supabaseの認証状態をチェックしてログイン状態を設定する処理をここに実装
    // 例: supabase.auth.getSession() などを使う
    // ここでは仮にログインしていない状態を初期値として設定
    // 実際にはSupabaseクライアントをインポートして認証状態を取得してください
    const checkAuth = async () => {
      // TODO: Supabaseクライアントのインポートと認証状態取得
      // const { data } = await supabase.auth.getSession();
      // setIsLoggedIn(!!data.session);
      setIsLoggedIn(false); // 仮の初期値
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    // 認証状態の判定中は何も表示しないかローディング画面を表示
    return null;
  }

  // 画面に(tabs)が表示されてしまっているのはおそらくこれが悪い
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Header />
      <Stack>
        {isLoggedIn ? (
          <Stack.Screen name="" options={{ headerShown: false, title: '' }} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
