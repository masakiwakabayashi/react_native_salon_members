// contents テーブルの category の表示名。定義にないカテゴリはそのまま表示する
const contentCategoryLabels: Record<string, string> = {
  video: '動画',
  archive: 'アーカイブ',
  seminar: 'セミナー',
  workshop: 'ワークショップ',
};

export const getContentCategoryLabel = (category: string) =>
  contentCategoryLabels[category] ?? category;
