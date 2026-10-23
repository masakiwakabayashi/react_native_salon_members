import { supabase } from '@/lib/supabase';

export type ContentRecord = {
  id: string;
  title: string;
  path: string;
  category: string | null;
};

// 動画教材画面用。コンテンツをすべて取得する
export async function fetchContents(): Promise<ContentRecord[]> {
  const { data, error } = await supabase
    .from('contents')
    .select('id, title, path, category')
    .order('title', { ascending: true });

  if (error) {
    throw error;
  }
  return data;
}
