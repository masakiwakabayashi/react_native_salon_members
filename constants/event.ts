/**
 * イベント情報の型定義
 * 今後Supabase連携時も考慮した拡張性のある設計
 */
export interface Event {
  /** イベントID（ユニーク） */
  id: string;
  /** イベント名 */
  name: string;
  /** 開催日時（ISO8601形式） */
  date: string;
  /** 開催場所 */
  location: string;
  /** 詳細説明 */
  description: string;
}
