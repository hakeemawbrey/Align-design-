-- Align: the $15 beta. One signup is a vote for the city that opens after
-- Texas, a beta seat, and the birth details to cast the person's card.
--
-- The site inserts a signup (unpaid) and sends its id to Stripe as
-- client_reference_id; the webhook (supabase/functions/beta-webhook) marks it
-- paid. The public can add a signup and read the per-city tally, nothing else.

create table public.beta_signups (
  id             uuid primary key,
  vote           text not null check (vote ~ '^[a-z0-9-]{2,60}$' and vote !~ '-tx$'),  -- the city they want after Texas; Houston and Texas are locked in
  name           text not null check (char_length(name) between 1 and 60),
  birth_date     date not null check (birth_date between date '1900-01-01' and current_date),
  email          text not null check (char_length(email) between 3 and 254 and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),  -- the form's check
  paid           boolean not null default false,
  stripe_session text unique,                                        -- set by the webhook; a retry can't pay twice
  amount_cents   int,
  created_at     timestamptz not null default now(),
  paid_at        timestamptz
);

alter table public.beta_signups enable row level security;

-- anyone can sign up, unpaid; nobody can read rows back (emails and birth details stay private)
create policy "sign up" on public.beta_signups for insert to anon, authenticated
  with check (paid = false and stripe_session is null and amount_cents is null and paid_at is null);

-- the tally: paid signups per city voted for
create view public.city_votes as
  select vote as city, count(*)::int as votes from public.beta_signups where paid group by vote;

-- supabase grants everything on new public tables by default; take it back, so only RLS-checked inserts are left
revoke all on public.beta_signups from anon, authenticated;
revoke all on public.city_votes from anon, authenticated;
grant insert on public.beta_signups to anon, authenticated;
grant select on public.city_votes to anon, authenticated;
