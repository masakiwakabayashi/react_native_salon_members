import { supabase } from '@/lib/supabase';

const NOTIFICATION_COLUMNS = 'id, title, category, detail, created_at';

export type NotificationRecord = {
  id: string;
  title: string;
  category: string | null;
  detail: string | null;
  created_at: string;
};

// お知らせ画面用。お知らせを新しい順にすべて取得する
export async function fetchNotifications(): Promise<NotificationRecord[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select(NOTIFICATION_COLUMNS)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data;
}

// ホーム画面用。お知らせを新しい順に limit 件まで取得する
export async function fetchLatestNotifications(limit: number): Promise<NotificationRecord[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select(NOTIFICATION_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }
  return data;
}
