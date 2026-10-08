-- Align: real people.
--
-- An account can publish its own card (from onboarding). Published cards show
-- up in other accounts' decks; when two real people align on each other it's
-- a match on both phones, and their chat is shared. Seeded profiles keep
-- working exactly as before.

alter table public.profiles
  add column owner      uuid unique references auth.users on delete cascade,  -- null = seeded
  add column blurb      text check (char_length(blurb) <= 120),
  add column deal_order int,                  -- seeded: position in tonight's deal (null = not dealt)
  add column comet      boolean not null default false,
  add column updated_at timestamptz not null default now();

-- Publish (or update) your card. Only the fields a person may set; the
-- server owns everything else (aligns_back, starter_*, deal_order).
create function public.publish_card(
  p_name text, p_age int, p_sun text, p_moon text, p_rising text,
  p_blurb text, p_dealbreakers text, p_photo text
) returns text
language plpgsql security definer set search_path = public
as $$
declare
  me uuid := auth.uid();
  pid text;
begin
  if me is null then raise exception 'not signed in'; end if;
  if p_age < 18 then raise exception 'Align is 18+'; end if;
  if char_length(coalesce(p_name, '')) not between 1 and 40 then raise exception 'name required'; end if;
  pid := 'u_' || replace(me::text, '-', '');
  insert into profiles (id, owner, name, age, sun, moon, rising, photo, blurb, card, updated_at)
  values (pid, me, p_name, p_age, p_sun, p_moon, p_rising, p_photo, left(p_blurb, 120),
          jsonb_build_object('dealbreakers', left(coalesce(p_dealbreakers, ''), 300), 'pull', 'Steady pull'), now())
  on conflict (id) do update set
    name = excluded.name, age = excluded.age, sun = excluded.sun, moon = excluded.moon, rising = excluded.rising,
    photo = coalesce(excluded.photo, profiles.photo), blurb = excluded.blurb, card = profiles.card || excluded.card,
    updated_at = now();
  return pid;
end $$;

-- Swipe, now aware of real people: aligning on a real person is a match when
-- they have already aligned on you, and then it's a match for both of you.
create or replace function public.swipe(p_profile text, p_dir text)
returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  me uuid := auth.uid();
  target profiles%rowtype;
  mine text;
begin
  if me is null then raise exception 'not signed in'; end if;
  if p_dir not in ('align', 'release') then raise exception 'bad direction'; end if;
  select * into target from profiles where id = p_profile;
  if not found then raise exception 'no such card'; end if;
  if target.owner = me then raise exception 'that is your own card'; end if;

  insert into swipes (user_id, profile_id, dir) values (me, p_profile, p_dir)
  on conflict (user_id, profile_id) do update set dir = excluded.dir, created_at = now();
  if p_dir <> 'align' then return false; end if;

  if target.owner is null then
    if target.aligns_back then
      insert into matches (user_id, profile_id) values (me, p_profile) on conflict do nothing;
      return true;
    end if;
    return false;
  end if;

  -- a real person: did they align on my card?
  select id into mine from profiles where owner = me;
  if mine is not null and exists (
    select 1 from swipes where user_id = target.owner and profile_id = mine and dir = 'align'
  ) then
    insert into matches (user_id, profile_id) values (me, p_profile) on conflict do nothing;
    insert into matches (user_id, profile_id) values (target.owner, mine) on conflict do nothing;
    return true;
  end if;
  return false;
end $$;

-- Send a message. To a real person, it also lands in their copy of the chat.
create function public.send_message(p_profile text, p_body text)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  me uuid := auth.uid();
  them uuid;
  mine text;
  mid uuid;
begin
  if me is null then raise exception 'not signed in'; end if;
  if not exists (select 1 from matches where user_id = me and profile_id = p_profile) then
    raise exception 'not matched';
  end if;
  insert into messages (user_id, profile_id, sender, body) values (me, p_profile, 'me', p_body) returning id into mid;
  select owner into them from profiles where id = p_profile;
  if them is not null then
    select id into mine from profiles where owner = me;
    insert into messages (user_id, profile_id, sender, body) values (them, mine, 'them', p_body);
  end if;
  return mid;
end $$;

-- Real people in your deck: published cards that aren't yours and that you
-- haven't swiped on yet. (Your blocks are applied in the app.)
create function public.real_people()
returns setof profiles
language sql security definer set search_path = public stable
as $$
  select p.* from profiles p
  where p.owner is not null and p.owner <> auth.uid()
    and not exists (select 1 from swipes s where s.user_id = auth.uid() and s.profile_id = p.id)
  order by p.updated_at desc
  limit 50;
$$;

revoke all on function public.publish_card(text, int, text, text, text, text, text, text) from public, anon;
revoke all on function public.send_message(text, text) from public, anon;
revoke all on function public.real_people() from public, anon;
grant execute on function public.publish_card(text, int, text, text, text, text, text, text) to authenticated;
grant execute on function public.send_message(text, text) to authenticated;
grant execute on function public.real_people() to authenticated;

-- a match made by the other person shows up live
alter publication supabase_realtime add table public.matches;

-- Photos: public to read (they're only shown after a match or a peek),
-- each account writes only inside its own folder.
insert into storage.buckets (id, name, public) values ('photos', 'photos', true) on conflict (id) do nothing;
create policy "photos are readable" on storage.objects for select using (bucket_id = 'photos');
create policy "upload own photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "replace own photos" on storage.objects for update to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
