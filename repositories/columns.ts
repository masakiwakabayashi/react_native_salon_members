import { supabase } from '@/lib/supabase';

export type ColumnRecord = {
  id: string;
  title: string;
  detail: string | null;
  created_at: string;
};

// コラム画面用。コラムを新しい順にすべて取得する
export async function fetchColumns(): Promise<ColumnRecord[]> {
  const { data, error } = await supabase
    .from('columns')
    .select('id, title, detail, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data;
}
