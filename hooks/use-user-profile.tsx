import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import { useAuth } from '@/hooks/use-auth';
import {
  createIconImageUrl,
  fetchUserProfile,
  uploadIconImage,
  type UserProfileRecord,
} from '@/repositories/user-profile';

type UserProfileContextValue = {
  /** 未作成・取得失敗時は null */
  profile: UserProfileRecord | null;
  /** プロフィール画像の署名付きURL。未設定なら null */
  iconUrl: string | null;
  isLoading: boolean;
  /** 端末の画像をアップロードしてプロフィール画像に設定する */
  updateIconImage: (localUri: string) => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

// 画像のURL取得に失敗してもプロフィール自体は表示できるよう、失敗時は null にする
async function resolveIconUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  try {
    return await createIconImageUrl(path);
  } catch (error) {
    console.warn('プロフィール画像のURL取得に失敗しました', error);
    return null;
  }
}

/** ログイン中のユーザーのプロフィールを保持し、ヘッダーとプロフィール画面で共有する */
export function UserProfileProvider({ children }: PropsWithChildren) {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [profile, setProfile] = useState<UserProfileRecord | null>(null);
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfile(null);
    setIconUrl(null);
    if (!userId) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    fetchUserProfile(userId)
      .then(async (result) => {
        const url = await resolveIconUrl(result?.icon_image ?? null);
        if (cancelled) return;
        setProfile(result);
        setIconUrl(url);
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

  const updateIconImage = async (localUri: string) => {
    if (!userId || !profile) {
      throw new Error('プロフィールが読み込まれていません');
    }
    const path = await uploadIconImage(userId, localUri, profile.icon_image);
    setProfile({ ...profile, icon_image: path });
    setIconUrl(await resolveIconUrl(path));
  };

  return (
    <UserProfileContext.Provider value={{ profile, iconUrl, isLoading, updateIconImage }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile は UserProfileProvider の内側で使ってください');
  }
  return context;
}
