import { supabase } from '@/lib/supabase';

export type UserProfileRecord = {
  id: string;
  user_id: string;
  name: string | null;
  icon_image: string | null;
  cohort: number | null;
};

// 指定したユーザーのプロフィールを取得する。プロフィールが未作成なら null を返す
export async function fetchUserProfile(userId: string): Promise<UserProfileRecord | null> {
  const { data, error } = await supabase
    .from('user_profile')
    .select('id, user_id, name, icon_image, cohort')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}
