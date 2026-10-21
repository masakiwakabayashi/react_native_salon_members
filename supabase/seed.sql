-- ユーザーデータの作成
WITH credentials(id, mail, pass) AS (
  SELECT * FROM (VALUES 
    ('123e4567-e89b-12d3-a456-426614174000', 'user1@example.com', 'password'),
    ('123e4567-e89b-12d3-a456-426614174001', 'user2@example.com', 'password'),
    ('123e4567-e89b-12d3-a456-426614174002', 'user3@example.com', 'password')
  ) AS users(id, mail, pass)
),
create_user AS (
  INSERT INTO auth.users (id, instance_id, ROLE, aud, email, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, created_at, updated_at, last_sign_in_at, email_confirmed_at, confirmation_sent_at, confirmation_token, recovery_token, email_change_token_new, email_change)
    SELECT id::uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', mail, '{"provider":"email","providers":["email"]}', '{}', FALSE, crypt(pass, gen_salt('bf')), NOW(), NOW(), NOW(), NOW(), NOW(), '', '', '', '' FROM credentials
  RETURNING id
)
INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  SELECT gen_random_uuid(), id, id, json_build_object('sub', id), 'email', NOW(), NOW(), NOW() FROM create_user;


-- ユーザープロフィールのシードデータ
INSERT INTO public.user_profile (id, user_id, description, icon_image)
VALUES
  ('223e4567-e89b-12d3-a456-426614174100', '123e4567-e89b-12d3-a456-426614174000', 'プロダクトエンジニア', 'https://example.com/icons/user1.png'),
  ('223e4567-e89b-12d3-a456-426614174101', '123e4567-e89b-12d3-a456-426614174001', 'イベント企画担当。', 'https://example.com/icons/user2.png'),
  ('223e4567-e89b-12d3-a456-426614174102', '123e4567-e89b-12d3-a456-426614174002', '映像編集が得意。', 'https://example.com/icons/user3.png')
ON CONFLICT (id) DO NOTHING;

-- お知らせのシードデータ
INSERT INTO public.notifications (id, title, category, detail, created_by)
VALUES
  ('323e4567-e89b-12d3-a456-426614174200', '新しいコンテンツを公開しました', 'news', '最新の動画コンテンツを本日公開しました。', '123e4567-e89b-12d3-a456-426614174000'),
  ('323e4567-e89b-12d3-a456-426614174201', '来月のイベント情報', 'event', '来月の交流会についてお知らせします。', '123e4567-e89b-12d3-a456-426614174001')
ON CONFLICT (id) DO NOTHING;

-- イベントのシードデータ
INSERT INTO public.events (id, title, category, detail, starts_at, ends_at, location, created_by)
VALUES
  ('423e4567-e89b-12d3-a456-426614174300', 'オンライン勉強会', 'online', '最新トレンドを共有するオンラインセッション。', '2025-11-01 10:00:00+09', '2025-11-01 12:00:00+09', 'Zoom', '123e4567-e89b-12d3-a456-426614174000'),
  ('423e4567-e89b-12d3-a456-426614174301', 'オフライン交流会', 'offline', '会員限定の交流イベント。', '2025-12-05 19:00:00+09', '2025-12-05 21:00:00+09', '東京都渋谷区', '123e4567-e89b-12d3-a456-426614174001')
ON CONFLICT (id) DO NOTHING;

-- コラムのシードデータ
INSERT INTO public.columns (id, title, detail)
VALUES
  ('523e4567-e89b-12d3-a456-426614174400', 'マーケティングの基本', '新規顧客獲得のために押さえておきたい考え方。'),
  ('523e4567-e89b-12d3-a456-426614174401', 'サロン運営Tips', '日々の運営を楽にするチェックリスト。')
ON CONFLICT (id) DO NOTHING;

-- コンテンツのシードデータ
INSERT INTO public.contents (id, title, path, category)
VALUES
  ('623e4567-e89b-12d3-a456-426614174500', 'カラー講座', 'https://example.com/videos/color-course.mp4', 'video'),
  ('623e4567-e89b-12d3-a456-426614174501', '接客セミナー', 'https://example.com/videos/hospitality.mp4', 'seminar')
ON CONFLICT (id) DO NOTHING;
