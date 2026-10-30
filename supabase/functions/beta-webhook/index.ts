// Stripe → Supabase: a finished $15 beta checkout marks its signup paid, so its vote counts.
// The site saves the signup first and sends its id as the Payment Link's client_reference_id.
//
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set for you).
// Deploy: supabase functions deploy beta-webhook --no-verify-jwt
import Stripe from 'npm:stripe@17.7.0'
import { createClient } from 'npm:@supabase/supabase-js@2.49.4'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
// the signature check runs on web crypto in deno, as in supabase's stripe example
const cryptoProvider = Stripe.createSubtleCryptoProvider()
const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(), req.headers.get('stripe-signature') ?? '', Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined, cryptoProvider,
    )
  } catch (e) {
    return new Response(`bad signature: ${e}`, { status: 400 })
  }

  // a delayed payment method pays later, in its own event
  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') return new Response('ignored')
  const s = event.data.object
  if (s.payment_status !== 'paid') return new Response('not paid yet')

  // anything below that isn't a db error gets a 2xx: stripe retries non-2xx for days, and a retry can't fix these
  const id = s.client_reference_id ?? ''
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    console.error('[beta-webhook] paid, but no signup id', s.id, id)
    return new Response('no signup id')
  }
  const { data, error } = await db.from('beta_signups')
    .update({ paid: true, stripe_session: s.id, amount_cents: s.amount_total ?? 0, paid_at: new Date().toISOString() })
    .eq('id', id.toLowerCase()).eq('paid', false).select('id')
  if (error) return new Response(error.message, { status: 500 })
  if (data.length) return new Response('ok')

  // nothing updated: a retry of a session we already counted, or a second payment / unknown id to look at by hand
  const { data: row, error: e2 } = await db.from('beta_signups').select('stripe_session').eq('id', id.toLowerCase()).maybeSingle()
  if (e2) return new Response(e2.message, { status: 500 })
  if (row?.stripe_session === s.id) return new Response('already paid')
  console.error(row ? '[beta-webhook] signup already paid by another session' : '[beta-webhook] paid, but no such signup', s.id, id)
  return new Response(row ? 'already paid by another session' : 'no such signup')
})
