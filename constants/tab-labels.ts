// タブと各画面の見出しで使う文言。未設定の場合はデフォルトの文言を使用する
// Expo は process.env.EXPO_PUBLIC_* を静的に埋め込むため、変数名はそのまま書く
export const TabLabels = {
  home: process.env.EXPO_PUBLIC_TAB_LABEL_HOME || 'ホーム',
  notices: process.env.EXPO_PUBLIC_TAB_LABEL_NOTICES || 'お知らせ',
  events: process.env.EXPO_PUBLIC_TAB_LABEL_EVENTS || 'イベント',
  columns: process.env.EXPO_PUBLIC_TAB_LABEL_COLUMNS || 'コラム',
  videos: process.env.EXPO_PUBLIC_TAB_LABEL_VIDEOS || '動画教材',
};
