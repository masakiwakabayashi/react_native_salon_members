-- お知らせ・コラムを新しい順に並べ、日付を表示するため作成日時を追加する
alter table "public"."notifications" add column "created_at" timestamp with time zone not null default now();

CREATE INDEX idx_notifications_created_at ON public.notifications USING btree (created_at);

alter table "public"."columns" add column "created_at" timestamp with time zone not null default now();

CREATE INDEX idx_columns_created_at ON public.columns USING btree (created_at);
