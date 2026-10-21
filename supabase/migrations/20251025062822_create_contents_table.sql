-- 動画コンテンツ
create table "public"."contents" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "path" text not null,
    "category" text
);

CREATE UNIQUE INDEX contents_pkey ON public.contents USING btree (id);

CREATE INDEX idx_contents_category ON public.contents USING btree (category);

alter table "public"."contents" add constraint "contents_pkey" PRIMARY KEY using index "contents_pkey";

grant delete on table "public"."contents" to "anon";

grant insert on table "public"."contents" to "anon";

grant references on table "public"."contents" to "anon";

grant select on table "public"."contents" to "anon";

grant trigger on table "public"."contents" to "anon";

grant truncate on table "public"."contents" to "anon";

grant update on table "public"."contents" to "anon";

grant delete on table "public"."contents" to "authenticated";

grant insert on table "public"."contents" to "authenticated";

grant references on table "public"."contents" to "authenticated";

grant select on table "public"."contents" to "authenticated";

grant trigger on table "public"."contents" to "authenticated";

grant truncate on table "public"."contents" to "authenticated";

grant update on table "public"."contents" to "authenticated";

grant delete on table "public"."contents" to "service_role";

grant insert on table "public"."contents" to "service_role";

grant references on table "public"."contents" to "service_role";

grant select on table "public"."contents" to "service_role";

grant trigger on table "public"."contents" to "service_role";

grant truncate on table "public"."contents" to "service_role";

grant update on table "public"."contents" to "service_role";
