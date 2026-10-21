import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import { supabase } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  /** 保存済みセッションの読み込みが終わるまで true */
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) return { error: null };
    if (error.code === 'invalid_credentials') {
      return { error: 'メールアドレスまたはパスワードが正しくありません。' };
    }
    return { error: 'ログインに失敗しました。時間をおいて再度お試しください。' };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthProvider の内側で使ってください');
  }
  return context;
}
