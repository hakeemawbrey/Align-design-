-- Align: the $15 beta. Every paid seat is one vote for the buyer's city.
--
-- Rows are written only by the Stripe webhook (supabase/functions/beta-webhook)
-- with the service role; the public can read the per-city tally and nothing else.

create table public.beta_seats (
  stripe_session text primary key,          -- one checkout, one seat, so a retried webhook can't double-vote
  city           text not null check (city ~ '^[a-z0-9-]{2,60}$'),
  email          text,
  amount_cents   int  not null,
  created_at     timestamptz not null default now()
);

alter table public.beta_seats enable row level security;
-- no policies: anon and authenticated can't read emails or write seats

create view public.city_votes as
  select city, count(*)::int as votes from public.beta_seats group by city;

grant select on public.city_votes to anon, authenticated;
