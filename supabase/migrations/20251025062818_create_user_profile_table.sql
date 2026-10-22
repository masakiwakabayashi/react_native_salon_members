-- ユーザーの詳しいプロフィール情報
create table "public"."user_profile" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "name" text,
    -- avatars バケット内のパス（例: {user_id}/1730000000000.jpg）
    "icon_image" text,
    -- 何期生か（1期生なら 1）。どの期にも属さないユーザーは null
    "cohort" integer check ("cohort" > 0)
);

CREATE INDEX idx_user_profile_user_id ON public.user_profile USING btree (user_id);

CREATE UNIQUE INDEX user_profile_pkey ON public.user_profile USING btree (id);

alter table "public"."user_profile" add constraint "user_profile_pkey" PRIMARY KEY using index "user_profile_pkey";

alter table "public"."user_profile" add constraint "fk_user_profile_user" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_profile" validate constraint "fk_user_profile_user";

grant delete on table "public"."user_profile" to "anon";

grant insert on table "public"."user_profile" to "anon";

grant references on table "public"."user_profile" to "anon";

grant select on table "public"."user_profile" to "anon";

grant trigger on table "public"."user_profile" to "anon";

grant truncate on table "public"."user_profile" to "anon";

grant update on table "public"."user_profile" to "anon";

grant delete on table "public"."user_profile" to "authenticated";

grant insert on table "public"."user_profile" to "authenticated";

grant references on table "public"."user_profile" to "authenticated";

grant select on table "public"."user_profile" to "authenticated";

grant trigger on table "public"."user_profile" to "authenticated";

grant truncate on table "public"."user_profile" to "authenticated";

grant update on table "public"."user_profile" to "authenticated";

grant delete on table "public"."user_profile" to "service_role";

grant insert on table "public"."user_profile" to "service_role";

grant references on table "public"."user_profile" to "service_role";

grant select on table "public"."user_profile" to "service_role";

grant trigger on table "public"."user_profile" to "service_role";

grant truncate on table "public"."user_profile" to "service_role";

grant update on table "public"."user_profile" to "service_role";

-- ログイン中のメンバーは全員のプロフィールを閲覧でき、作成・更新・削除は自分のものだけ
alter table "public"."user_profile" enable row level security;

create policy "メンバーはプロフィールを閲覧できる"
on "public"."user_profile" for select to authenticated
using (true);

create policy "自分のプロフィールを作成できる"
on "public"."user_profile" for insert to authenticated
with check (user_id = auth.uid());

create policy "自分のプロフィールを更新できる"
on "public"."user_profile" for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "自分のプロフィールを削除できる"
on "public"."user_profile" for delete to authenticated
using (user_id = auth.uid());

-- プロフィール画像の非公開バケット。表示には署名付きURLを使う
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', false, 1048576, array['image/jpeg']);

-- 画像はログイン中のメンバーなら誰でも閲覧でき、アップロード・削除は自分のフォルダ（{user_id}/）だけ
create policy "メンバーはプロフィール画像を閲覧できる"
on storage.objects for select to authenticated
using (bucket_id = 'avatars');

create policy "自分のプロフィール画像をアップロードできる"
on storage.objects for insert to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "自分のプロフィール画像を削除できる"
on storage.objects for delete to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
