import { supabase } from '@/lib/supabase';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

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

// イベントの一覧情報を取得する関数を作成する

export async function fetchEvents(): Promise<EventRecord[]> {

  return [];
}

// これから開催されるイベントを開催日の早い順に取得する
export async function fetchUpcomingEvents(limit: number): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, category, detail, starts_at, ends_at, location, created_by')
    .gte('starts_at', new Date().toISOString())
    .order('starts_at', { ascending: true })
    .limit(limit);

  if (error) {
    throw error;
  }
  return data;
}
