export type Video = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  durationMinutes: number;
  level: '初級' | '中級' | '上級';
};

export const videos: Video[] = [
  {
    id: 'video-001',
    title: 'はじめてのリズムトレーニング',
    instructor: '講師 山本',
    description: 'メトロノームを使った基本のリズム練習。8ビートを安定して刻めるようになります。',
    durationMinutes: 12,
    level: '初級',
  },
  {
    id: 'video-002',
    title: 'コード進行の基礎と弾き語り',
    instructor: '講師 佐藤',
    description: 'よく使われるコード進行を押さえて、1曲通して弾き語りに挑戦します。',
    durationMinutes: 18,
    level: '中級',
  },
  {
    id: 'video-003',
    title: 'アドリブソロの組み立て方',
    instructor: '講師 鈴木',
    description: 'ペンタトニックスケールを軸に、フレーズの作り方と展開のさせ方を学びます。',
    durationMinutes: 25,
    level: '上級',
  },
];
