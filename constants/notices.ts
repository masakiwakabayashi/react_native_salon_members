export type NoticeCategory = '重要' | 'アップデート' | 'イベント' | 'メンテナンス';

type NoticeCategoryTheme = { accentColor: string; badgeBackground: string; badgeTextColor: string };

export const noticeCategoryThemes: Record<NoticeCategory, NoticeCategoryTheme> = {
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

// DB のカテゴリは自由入力のため、定義にないカテゴリはグレーで表示する
const defaultNoticeCategoryTheme: NoticeCategoryTheme = {
  accentColor: '#757575',
  badgeBackground: '#EEEEEE',
  badgeTextColor: '#424242',
};

export const getNoticeCategoryTheme = (category: string): NoticeCategoryTheme =>
  noticeCategoryThemes[category as NoticeCategory] ?? defaultNoticeCategoryTheme;
