export type NoticeCategory = '重要' | 'アップデート' | 'イベント' | 'メンテナンス';

export type Notice = {
  id: string;
  category: NoticeCategory;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  isNew?: boolean;
};

export const noticeCategoryThemes: Record<
  NoticeCategory,
  { accentColor: string; badgeBackground: string; badgeTextColor: string }
> = {
  重要: {
    accentColor: '#FF7043',
    badgeBackground: '#FFF3E0',
    badgeTextColor: '#E65100',
  },
  アップデート: {
    accentColor: '#1E88E5',
    badgeBackground: '#E3F2FD',
    badgeTextColor: '#1565C0',
  },
  イベント: {
    accentColor: '#8E24AA',
    badgeBackground: '#F3E5F5',
    badgeTextColor: '#6A1B9A',
  },
  メンテナンス: {
    accentColor: '#FFB300',
    badgeBackground: '#FFF8E1',
    badgeTextColor: '#FF8F00',
  },
};

export const notices: Notice[] = [
  {
    id: 'notice-001',
    category: '重要',
    title: 'コミュニティガイドライン改定のお知らせ',
    summary:
      '2025年10月1日よりコミュニティガイドライン第3章を更新します。該当箇所をご確認のうえ運営方針に沿ったご利用をお願いします。',
    content: `いつもサロンをご利用いただきありがとうございます。\n\nコミュニティの健全な運営を目的として、2025年10月1日よりコミュニティガイドライン第3章「投稿と交流」に関する規定を一部改定いたします。\n\n主な変更点は以下の3点です。\n• 専用チャンネルでのPR投稿ルールの明確化\n• 不適切なコンテンツの報告手順の改善\n• 運営チームによる投稿モデレーションの強化\n\n詳しくはメンバーサイト内「ガイドライン」ページをご確認ください。引き続き健全なコミュニティ運営にご協力をお願いいたします。`,
    publishedAt: '2025-09-12T09:00:00+09:00',
    isNew: true,
  },
  {
    id: 'notice-002',
    category: 'メンテナンス',
    title: 'システムメンテナンス実施 (9/30 深夜)',
    summary:
      '9月30日 1:00-3:00に定期メンテナンスを実施します。作業中はログインおよび動画視聴がご利用いただけません。',
    content: `以下の日程で定期メンテナンスを行います。\n\n日時: 9月30日 1:00-3:00 (JST)\n影響範囲: サイトへのログイン、動画視聴、コメント投稿\n\nメンテナンス完了後は順次サービスを再開いたします。ご不便をおかけいたしますが、ご理解とご協力をお願いいたします。`,
    publishedAt: '2025-09-10T18:00:00+09:00',
  },
  {
    id: 'notice-003',
    category: 'アップデート',
    title: 'プロフィール編集機能を改善しました',
    summary:
      'スマートフォンからプロフィール画像が変更しやすくなりました。併せて自己紹介タグの検索性能も向上しています。',
    content: `プロフィール編集画面をアップデートしました。\n\n• アップロード済み画像のトリミング機能を追加\n• 自己紹介タグの候補表示を高速化\n• 入力途中の内容が下書き保存されるよう改善\n\n今後も使いやすさ向上のための改修を予定しています。お気付きの点はフィードバックフォームまでお寄せください。`,
    publishedAt: '2025-09-08T11:30:00+09:00',
  },
  {
    id: 'notice-004',
    category: 'イベント',
    title: '10月度ウェルカムライブ配信のご案内',
    summary:
      '新メンバー向けウェルカムライブを10月1日 20:00より開催します。事前質問フォームからトピックを募集しています。',
    content: `10月1日 20:00より、オンラインでウェルカムライブを配信します。\n\n出演: コミュニティマネージャー佐藤 / スペシャルゲスト数名\n内容: サロンの活用方法、最近の取り組み紹介、リアルタイムQ&A\n\n参加希望の方は事前質問フォームへ入力のうえ、当日サロン内に掲載する配信リンクからご参加ください。`,
    publishedAt: '2025-09-05T12:00:00+09:00',
  },
];
