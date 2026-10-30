# Align · beta site

One page that sells the $15 beta and counts votes. The hero is the real Align card
(drawn from `app/src`, Juniper's deck card flipping to her revealed card), so the
site always matches the app.

- **$15, every city.** Houston lights first, Texas (Austin, Dallas–Fort Worth, San
  Antonio) is locked in next, and each paid seat anywhere else is one vote for what
  lights after Texas.
- **Checkout** is a Stripe Payment Link. The site adds the chosen city as
  `client_reference_id` and prefills the email.
- **The tally** is the `city_votes` view in the app's Supabase project, filled by
  the `beta-webhook` function when a checkout completes.

```bash
cd site && npm install && npm run dev
```

## Set it up

1. **Supabase**: run `supabase/migrations/20261030000000_beta_votes.sql`, then deploy
   the webhook: `supabase functions deploy beta-webhook --no-verify-jwt` and set its
   secrets `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
2. **Stripe**: make a $15 one-time Payment Link. Under *After payment*, redirect to
   `https://YOUR-SITE/?paid=1` (the page
   thanks them and names the city they picked). Add a webhook endpoint pointing at the function
   URL for `checkout.session.completed`.
3. **Site env** (`site/.env.local`, or Vercel env vars): `VITE_BETA_LINK`,
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Without the link the pay button
   says "Checkout opens soon"; without Supabase the board lists cities with no counts.
4. **Vercel**: new project, root directory `site`. It reads `../app/src` and
   `../app/public`, so keep the whole repo checked out (the default).
