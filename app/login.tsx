import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'icon');
  const placeholderColor = useThemeColor({}, 'icon');

  const canSubmit = email.trim() !== '' && password !== '' && !loading;

  const handleLogin = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    // 成功時は AuthProvider のセッション更新で自動的にタブ画面へ切り替わる
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  const inputStyle = [styles.input, { borderColor, color: textColor }];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ThemedText type="title" style={styles.title}>
          ログイン
        </ThemedText>
        <View style={styles.form}>
          <TextInput
            style={inputStyle}
            placeholder="メールアドレス"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
          <TextInput
            style={inputStyle}
            placeholder="パスワード"
            placeholderTextColor={placeholderColor}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
            editable={!loading}
          />
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
          <Pressable
            style={[styles.button, { backgroundColor: tintColor, opacity: canSubmit ? 1 : 0.5 }]}
            onPress={handleLogin}
            disabled={!canSubmit}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.buttonText}>ログイン</ThemedText>
            )}
          </Pressable>
        </View>
        <ThemedText style={styles.note}>
          アカウントは運営から招待された方のみご利用いただけます。
        </ThemedText>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 32,
  },
  title: {
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    color: '#C2412D',
  },
  button: {
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  note: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: 'center',
  },
});
