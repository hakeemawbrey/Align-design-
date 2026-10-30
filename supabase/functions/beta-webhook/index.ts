// Stripe → Supabase: a finished $15 beta checkout marks its signup paid, so its vote counts.
// The site saves the signup first and sends its id as the Payment Link's client_reference_id.
//
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set for you).
// Deploy: supabase functions deploy beta-webhook --no-verify-jwt
import Stripe from 'npm:stripe@17.7.0'
import { createClient } from 'npm:@supabase/supabase-js@2.49.4'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(), req.headers.get('stripe-signature') ?? '', Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
    )
  } catch (e) {
    return new Response(`bad signature: ${e}`, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') return new Response('ignored')
  const s = event.data.object
  if (s.payment_status !== 'paid') return new Response('not paid')

  const id = s.client_reference_id ?? ''
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response('no signup id', { status: 400 })
  const { error } = await db.from('beta_signups')
    .update({ paid: true, stripe_session: s.id, amount_cents: s.amount_total ?? 0, paid_at: new Date().toISOString() })
    .eq('id', id).eq('paid', false)
  if (error) return new Response(error.message, { status: 500 })
  return new Response('ok')
})
