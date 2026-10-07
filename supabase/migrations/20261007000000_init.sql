-- Align: schema for the demo account and its seeded world.
--
-- People you swipe on live in `profiles` (seeded, read-only to clients).
-- Everything you do is a row keyed by your auth user id, and row-level
-- security means an account only ever sees its own rows. Each device signs
-- in anonymously, so every phone gets its own fresh account.

create table public.profiles (
  id          text primary key,              -- e.g. 'j27'
  name        text not null,
  age         int  not null check (age >= 18),
  sun         text not null,
  moon        text not null,
  rising      text not null,
  photo       text,                          -- path under the web app, e.g. 'img/juniper.jpg'
  aligns_back boolean not null default false, -- the seeded person aligns back when you align
  founder     int,                           -- founders card serial, if any
  card        jsonb not null default '{}',   -- everything else the card shows
  -- starter matches: every new account begins already matched with these people
  starter_day    int,                        -- days aligned when the account starts
  starter_traded boolean not null default false
);

create table public.swipes (
  user_id    uuid not null references auth.users on delete cascade,
  profile_id text not null references public.profiles on delete cascade,
  dir        text not null check (dir in ('align', 'release')),
  created_at timestamptz not null default now(),
  primary key (user_id, profile_id)
);

create table public.matches (
  user_id    uuid not null references auth.users on delete cascade,
  profile_id text not null references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, profile_id)
);

create table public.messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  profile_id text not null,
  sender     text not null check (sender in ('me', 'them')),
  body       text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  foreign key (user_id, profile_id) references public.matches on delete cascade
);
create index messages_thread on public.messages (user_id, profile_id, created_at);

create table public.trades (
  user_id    uuid not null references auth.users on delete cascade,
  profile_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, profile_id),
  foreign key (user_id, profile_id) references public.matches on delete cascade
);

-- Row-level security ---------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.swipes   enable row level security;
alter table public.matches  enable row level security;
alter table public.messages enable row level security;
alter table public.trades   enable row level security;

create policy "profiles are public" on public.profiles for select using (true);

create policy "own swipes" on public.swipes for select using (user_id = auth.uid());
-- swipes are written through swipe() only

create policy "own matches" on public.matches for select using (user_id = auth.uid());
-- matches are created by swipe() only

create policy "own messages" on public.messages for select using (user_id = auth.uid());
-- the app writes both sides of a chat with a seeded person, inside your own account
create policy "write own messages" on public.messages for insert with check (user_id = auth.uid());

create policy "own trades" on public.trades for select using (user_id = auth.uid());
create policy "write own trades" on public.trades for insert with check (user_id = auth.uid());

-- Functions ------------------------------------------------------------------

-- Record a swipe. Returns true when it makes a match; the server decides, so a
-- client can't invent one.
create function public.swipe(p_profile text, p_dir text)
returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  me uuid := auth.uid();
  back boolean;
begin
  if me is null then raise exception 'not signed in'; end if;
  if p_dir not in ('align', 'release') then raise exception 'bad direction'; end if;

  insert into swipes (user_id, profile_id, dir) values (me, p_profile, p_dir)
  on conflict (user_id, profile_id) do update set dir = excluded.dir, created_at = now();

  select aligns_back into back from profiles where id = p_profile;
  if p_dir = 'align' and coalesce(back, false) then
    insert into matches (user_id, profile_id) values (me, p_profile) on conflict do nothing;
    return true;
  end if;
  return false;
end $$;

-- Give a new account its starter matches (and the cards already traded).
-- Safe to call on every launch: does nothing once the account has started.
create function public.start_account()
returns void
language plpgsql security definer set search_path = public
as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in'; end if;
  if exists (select 1 from matches where user_id = me) or exists (select 1 from swipes where user_id = me) then
    return;
  end if;
  insert into matches (user_id, profile_id, created_at)
    select me, id, now() - make_interval(days => starter_day) from profiles where starter_day is not null;
  insert into trades (user_id, profile_id)
    select me, id from profiles where starter_day is not null and starter_traded;
end $$;

-- Start over: wipe this account's swipes, matches, messages and trades, then
-- hand back the starter matches.
create function public.reset_account()
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from matches where user_id = auth.uid();  -- cascades to messages and trades
  delete from swipes  where user_id = auth.uid();
  perform start_account();
end $$;

revoke all on function public.swipe(text, text) from public, anon;
revoke all on function public.reset_account() from public, anon;
revoke all on function public.start_account() from public, anon;
grant execute on function public.start_account() to authenticated;
grant execute on function public.swipe(text, text) to authenticated;
grant execute on function public.reset_account() to authenticated;

-- live chat
alter publication supabase_realtime add table public.messages;
