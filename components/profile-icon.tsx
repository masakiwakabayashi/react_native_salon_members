import { Image } from 'expo-image';
import { useEffect, useState } from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  uri: string | null | undefined;
  size: number;
};

/** プロフィールのアイコン画像。未設定や読み込みに失敗した場合は既定のアイコンを表示する */
export function ProfileIcon({ uri, size }: Props) {
  const [failed, setFailed] = useState(false);
  const iconColor = useThemeColor({}, 'icon');

  useEffect(() => {
    setFailed(false);
  }, [uri]);

  if (!uri || failed) {
    return <IconSymbol size={size} name="person.crop.circle" color={iconColor} />;
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      contentFit="cover"
      onError={() => setFailed(true)}
    />
  );
}
