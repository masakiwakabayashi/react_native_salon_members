export type Column = {
  id: string;
  title: string;
  author: string;
  summary: string;
  publishedAt: string;
  readingMinutes: number;
};

export const columns: Column[] = [
  {
    id: 'column-001',
    title: '練習が続く人がやっている3つの習慣',
    author: '講師 山本',
    summary: '毎日少しずつでも練習を続けるためのコツを、受講生の実例とともに紹介します。',
    publishedAt: '2025-09-15T10:00:00+09:00',
    readingMinutes: 5,
  },
  {
    id: 'column-002',
    title: 'ライブ前の緊張とうまく付き合う方法',
    author: '講師 佐藤',
    summary: '本番で実力を出し切るための準備と、当日の過ごし方をまとめました。',
    publishedAt: '2025-09-09T18:00:00+09:00',
    readingMinutes: 7,
  },
  {
    id: 'column-003',
    title: '耳コピ上達への近道',
    author: '講師 鈴木',
    summary: 'ベースラインから聴き取る、短いフレーズを繰り返すなど、すぐ試せる方法を解説します。',
    publishedAt: '2025-09-02T12:00:00+09:00',
    readingMinutes: 6,
  },
];
