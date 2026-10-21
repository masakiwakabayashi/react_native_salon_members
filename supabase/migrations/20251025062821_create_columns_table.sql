-- コラム
create table "public"."columns" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "detail" text
);

CREATE UNIQUE INDEX columns_pkey ON public.columns USING btree (id);

alter table "public"."columns" add constraint "columns_pkey" PRIMARY KEY using index "columns_pkey";

grant delete on table "public"."columns" to "anon";

grant insert on table "public"."columns" to "anon";

grant references on table "public"."columns" to "anon";

grant select on table "public"."columns" to "anon";

grant trigger on table "public"."columns" to "anon";

grant truncate on table "public"."columns" to "anon";

grant update on table "public"."columns" to "anon";

grant delete on table "public"."columns" to "authenticated";

grant insert on table "public"."columns" to "authenticated";

grant references on table "public"."columns" to "authenticated";

grant select on table "public"."columns" to "authenticated";

grant trigger on table "public"."columns" to "authenticated";

grant truncate on table "public"."columns" to "authenticated";

grant update on table "public"."columns" to "authenticated";

grant delete on table "public"."columns" to "service_role";

grant insert on table "public"."columns" to "service_role";

grant references on table "public"."columns" to "service_role";

grant select on table "public"."columns" to "service_role";

grant trigger on table "public"."columns" to "service_role";

grant truncate on table "public"."columns" to "service_role";

grant update on table "public"."columns" to "service_role";
