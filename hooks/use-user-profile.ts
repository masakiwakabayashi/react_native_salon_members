import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { fetchUserProfile, type UserProfileRecord } from '@/repositories/user-profile';

/** ログイン中のユーザーのプロフィールを取得する。未作成・取得失敗時は profile が null になる */
export function useUserProfile() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [profile, setProfile] = useState<UserProfileRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfile(null);
    if (!userId) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    fetchUserProfile(userId)
      .then((result) => {
        if (!cancelled) setProfile(result);
      })
      .catch((error) => {
        console.warn('プロフィールの取得に失敗しました', error);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { profile, isLoading };
}
