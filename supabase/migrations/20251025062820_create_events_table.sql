-- イベント
create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "category" text,
    "detail" text,
    "starts_at" timestamp with time zone not null,
    "ends_at" timestamp with time zone not null,
    "location" text,
    "created_by" uuid not null
);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE INDEX idx_events_created_by ON public.events USING btree (created_by);

CREATE INDEX idx_events_starts_at ON public.events USING btree (starts_at);

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."events" add constraint "chk_events_time_range" CHECK ((ends_at > starts_at)) not valid;

alter table "public"."events" validate constraint "chk_events_time_range";

alter table "public"."events" add constraint "fk_events_created_by" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."events" validate constraint "fk_events_created_by";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";
