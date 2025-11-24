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
