/**
 * イベント情報の型定義とサンプルデータ
 * 今後Supabase連携時も考慮した拡張性のある設計
 */

export interface EventScheduleItem {
  /** 開始時刻 */
  time: string;
  /** セッション名 */
  title: string;
  /** 補足説明 */
  description?: string;
}

export interface Event {
  /** イベントID（ユニーク） */
  id: string;
  /** イベント名 */
  name: string;
  /** 開催日時（ISO8601形式） */
  date: string;
  /** 開催場所 */
  location: string;
  /** 一覧向けの概要 */
  description: string;
  /** 詳細ページ向けの説明全文 */
  content?: string;
  /** 主催者情報 */
  host?: string;
  /** 参加費用 */
  fee?: string;
  /** 定員情報 */
  capacity?: string;
  /** 申込締切 */
  registrationDeadline?: string;
  /** タグ（開催形式など） */
  tags?: string[];
  /** 当日のスケジュール */
  schedule?: EventScheduleItem[];
}

export const events: Event[] = [
  {
    id: 'spring-networking',
    name: '春の交流パーティー',
    date: '2024-05-20T18:30:00+09:00',
    location: 'サロン本館 トップラウンジ',
    description:
      '季節限定の特別メニューとともに、会員同士の交流を深めましょう。初参加の方もお気軽にご参加ください。',
    content: `春らしいフィンガーフードとスペシャルドリンクをご用意しています。\n\n会場では簡単なアイスブレイクの後、興味関心ごとでグループに分かれて交流いただけます。名刺交換スペースも設置予定ですので、ぜひご活用ください。\n\nドレスコードはスマートカジュアルです。フォトスポットもご用意していますので撮影もお楽しみください。`,
    host: 'コミュニティマネージャー 加藤 / イベントチーム',
    fee: '会員無料 / 招待ゲスト 3,000円（税込）',
    capacity: '40名（先着順）',
    registrationDeadline: '2024年5月15日（水） 23:59',
    tags: ['交流会', 'オフライン', '会員限定'],
    schedule: [
      { time: '18:30', title: '受付・ウェルカムドリンク' },
      { time: '19:00', title: '開会挨拶とアイスブレイク' },
      {
        time: '19:30',
        title: '交流タイム（グループセッション）',
        description: '興味関心トピックごとにチーム分けして交流します。',
      },
      { time: '20:30', title: '自由交流・記念撮影' },
      { time: '21:00', title: '閉会' },
    ],
  },
  {
    id: 'wellness-retreat',
    name: '週末リトリート体験会',
    date: '2024-06-08T10:00:00+09:00',
    location: '軽井沢提携リゾート',
    description: '心身を整えるヨガと瞑想セッション、ヘルシーランチ付き。送迎バスあり。',
    content: `自然豊かな軽井沢で、心と体を整える1日をお過ごしください。\n\n経験豊富なインストラクターによる朝ヨガと森林浴、地元食材を使ったランチをご提供します。午後は瞑想ワークとセルフケアのワークショップを予定しています。\n\n現地集合のほか、東京駅発の専用バス（別途 2,000円）もご利用いただけます。`,
    host: 'ウェルネスコーディネーター 田中',
    fee: '会員 8,000円 / 同伴者 10,000円（ランチ付き）',
    capacity: '20名（最少催行 10名）',
    registrationDeadline: '2024年5月25日（土） 18:00',
    tags: ['リトリート', 'アウトドア', '少人数'],
    schedule: [
      { time: '10:00', title: '集合・オリエンテーション' },
      { time: '10:30', title: '朝ヨガ & ブレスワーク' },
      { time: '12:00', title: 'ランチタイム（オーガニックメニュー）' },
      { time: '13:30', title: '森林浴ウォーク', description: 'ガイドと共にリゾート内を散策します。' },
      { time: '15:00', title: '瞑想 & セルフケアワークショップ' },
      { time: '16:30', title: 'クロージング・解散' },
    ],
  },
  {
    id: 'business-seminar',
    name: 'ビジネスアップデートセミナー',
    date: '2024-06-25T19:00:00+09:00',
    location: 'オンライン（Zoom配信）',
    description: '最新の業界トレンドやマーケティング事例を専門家が紹介。Q&Aセッションあり。',
    content: `マーケティングとコミュニティ運営の最新トレンドをテーマにしたオンラインセミナーです。\n\n前半はゲストスピーカーによるケーススタディ紹介、後半は参加者からの質問にお答えするライブQ&Aを実施します。\n\n参加登録後に視聴リンクをお送りします。アーカイブ視聴（1週間）もご用意しています。`,
    host: 'ゲスト講師：Growth Partners CEO 佐藤',
    fee: '会員無料 / 一般 2,000円',
    capacity: 'オンライン無制限（ライブQ&Aは先着100名）',
    registrationDeadline: '2024年6月24日（月） 12:00',
    tags: ['オンライン', 'セミナー', 'ビジネス'],
    schedule: [
      { time: '19:00', title: 'オープニング' },
      {
        time: '19:10',
        title: 'キーノート：最新マーケティングトレンド',
        description: '国内外の成功事例をもとにしたアップデートを共有します。',
      },
      { time: '19:50', title: 'ケーススタディ & ミニワーク' },
      { time: '20:20', title: 'ライブQ&Aセッション' },
      { time: '20:50', title: 'クロージング' },
    ],
  },
];

export const getEventById = (id: string | undefined) =>
  id ? events.find((event) => event.id === id) : undefined;
