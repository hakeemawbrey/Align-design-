# Align · beta site

One page that sells the $15 beta and counts votes. The hero deals a hand of real Align
cards (drawn from `app/src`): you release Maya, align on Rio, then align on Juniper, and
when it's mutual her card turns over to show her photo. The site always matches the app.

- **$15, every city.** Houston lights first and Texas (Austin, Dallas–Fort Worth,
  San Antonio) is locked in next. Every seat votes today for the city after Texas.
- **The ballot** is the vote city, first name, birth date/time/place (to cast their
  card) and email. The site saves it to `beta_signups` (unpaid), then opens the
  Stripe Payment Link with the signup's id as `client_reference_id` and the email
  prefilled.
- **The tally** is the `city_votes` view (paid signups per vote city), marked paid by
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
   thanks them and names the city they voted for). Add a webhook endpoint pointing at the function
   URL for `checkout.session.completed`.
3. **Site env** (`site/.env.local`, or Vercel env vars): `VITE_BETA_LINK`,
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Without the link the pay button
   stays off and the line under it says "Checkout opens soon". Without Supabase the board
   shows labelled sample numbers, and checkout carries only the vote (no signup is saved).
4. **Vercel**: new project, root directory `site`. It reads `../app/src` and
   `../app/public`, so keep the whole repo checked out (the default).
