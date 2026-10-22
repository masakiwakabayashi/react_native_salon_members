import { supabase } from '@/lib/supabase';

const EVENT_COLUMNS = 'id, title, category, detail, starts_at, ends_at, location, created_by';

export type EventRecord = {
  id: string;
  title: string;
  category: string | null;
  detail: string | null;
  starts_at: string;
  ends_at: string;
  location: string | null;
  created_by: string;
};

// 開催日当日のイベントは開始時刻を過ぎても表示するため、端末の日付で今日の0時を基準にする
const getStartOfToday = () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return startOfToday.toISOString();
};

// イベント画面用。開催日が今日以降のイベントを開催日の早い順にすべて取得する
export async function fetchUpcomingEvents(): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .gte('starts_at', getStartOfToday())
    .order('starts_at', { ascending: true });

  if (error) {
    throw error;
  }
  return data;
}

// ホーム画面用。開催日が今日以降のイベントを開催日の早い順に limit 件まで取得する
export async function fetchNextEvents(limit: number): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_COLUMNS)
    .gte('starts_at', getStartOfToday())
    .order('starts_at', { ascending: true })
    .limit(limit);

  if (error) {
    throw error;
  }
  return data;
}
