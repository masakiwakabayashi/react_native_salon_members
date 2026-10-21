-- イベントとユーザーの中間テーブル (イベントの参加者を管理するために使う)
create table "public"."user_events" (
  "id" uuid not null default gen_random_uuid(),
  "user_id" uuid not null,
  "event_id" uuid not null
);


CREATE UNIQUE INDEX user_events_pkey ON public.user_events USING btree (id);

CREATE UNIQUE INDEX user_events_user_id_event_id_key ON public.user_events USING btree (user_id, event_id);

alter table "public"."user_events" add constraint "user_events_pkey" PRIMARY KEY using index "user_events_pkey";

alter table "public"."user_events" add constraint "fk_user_events_event" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."user_events" validate constraint "fk_user_events_event";

alter table "public"."user_events" add constraint "fk_user_events_user" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_events" validate constraint "fk_user_events_user";

alter table "public"."user_events" add constraint "user_events_user_id_event_id_key" UNIQUE using index "user_events_user_id_event_id_key";

grant delete on table "public"."user_events" to "anon";

grant insert on table "public"."user_events" to "anon";

grant references on table "public"."user_events" to "anon";

grant select on table "public"."user_events" to "anon";

grant trigger on table "public"."user_events" to "anon";

grant truncate on table "public"."user_events" to "anon";

grant update on table "public"."user_events" to "anon";

grant delete on table "public"."user_events" to "authenticated";

grant insert on table "public"."user_events" to "authenticated";

grant references on table "public"."user_events" to "authenticated";

grant select on table "public"."user_events" to "authenticated";

grant trigger on table "public"."user_events" to "authenticated";

grant truncate on table "public"."user_events" to "authenticated";

grant update on table "public"."user_events" to "authenticated";

grant delete on table "public"."user_events" to "service_role";

grant insert on table "public"."user_events" to "service_role";

grant references on table "public"."user_events" to "service_role";

grant select on table "public"."user_events" to "service_role";

grant trigger on table "public"."user_events" to "service_role";

grant truncate on table "public"."user_events" to "service_role";

grant update on table "public"."user_events" to "service_role";


