import { supabase } from '@/lib/supabase';

const ICON_BUCKET = 'avatars';
// 署名付きURLの有効期限（秒）
const ICON_URL_EXPIRES_IN = 60 * 60;

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

// 非公開バケットの画像を表示するための署名付きURLを作る
export async function createIconImageUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(ICON_BUCKET)
    .createSignedUrl(path, ICON_URL_EXPIRES_IN);

  if (error) {
    throw error;
  }
  return data.signedUrl;
}

// プロフィール画像をアップロードし、user_profile.icon_image を新しいパスに更新する。古い画像は削除する
export async function uploadIconImage(
  userId: string,
  localUri: string,
  oldPath: string | null,
): Promise<string> {
  // 同じパスで上書きすると古い画像がキャッシュから表示されるため、毎回別のファイル名にする
  const path = `${userId}/${Date.now()}.jpg`;
  const body = await fetch(localUri).then((response) => response.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(ICON_BUCKET)
    .upload(path, body, { contentType: 'image/jpeg' });
  if (uploadError) {
    throw uploadError;
  }

  // プロフィールが未作成だと更新対象が0件になり、エラーにならないため件数も確認する
  const { data: updated, error: updateError } = await supabase
    .from('user_profile')
    .update({ icon_image: path })
    .eq('user_id', userId)
    .select('id');
  if (updateError || !updated?.length) {
    await supabase.storage.from(ICON_BUCKET).remove([path]);
    throw updateError ?? new Error('プロフィールが見つかりません');
  }

  if (oldPath) {
    const { error: removeError } = await supabase.storage.from(ICON_BUCKET).remove([oldPath]);
    if (removeError) {
      console.warn('古いプロフィール画像の削除に失敗しました', removeError);
    }
  }
  return path;
}
