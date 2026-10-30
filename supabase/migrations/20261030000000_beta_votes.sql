-- Align: the $15 beta. Every paid seat is a seat in the buyer's city and one
-- vote, cast now, for the city that opens after Texas (Houston and Texas seats
-- vote too).
--
-- Rows are written only by the Stripe webhook (supabase/functions/beta-webhook)
-- with the service role; the public can read the per-city tally and nothing else.

create table public.beta_seats (
  stripe_session text primary key,          -- one checkout, one seat, so a retried webhook can't double-vote
  city           text not null check (city ~ '^[a-z0-9-]{2,60}$'),           -- where they'll use Align
  vote           text check (vote ~ '^[a-z0-9-]{2,60}$'),                     -- the city they want after Texas
  email          text,
  amount_cents   int  not null,
  created_at     timestamptz not null default now()
);

alter table public.beta_seats enable row level security;
-- no policies: anon and authenticated can't read emails or write seats

-- per city: seats bought there, and votes for it to open after Texas
create view public.city_votes as
  select coalesce(s.city, v.city) as city, coalesce(s.seats, 0) as seats, coalesce(v.votes, 0) as votes
  from (select city, count(*)::int as seats from public.beta_seats group by city) s
  full join (select vote as city, count(*)::int as votes from public.beta_seats where vote is not null group by vote) v
    on v.city = s.city;

grant select on public.city_votes to anon, authenticated;
