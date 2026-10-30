import { useEffect, useState } from 'react'

/** paid beta seats per city slug; one seat is one vote */
export type Votes = Record<string, number>

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
const LINK = import.meta.env.VITE_BETA_LINK as string | undefined

export const votesLive = !!(URL && KEY)
export const checkoutReady = !!LINK

/** the live tally from Supabase (the `city_votes` view); null until it loads or when it isn't set up */
export function useVotes() {
  const [votes, setVotes] = useState<Votes | null>(null)
  useEffect(() => {
    if (!URL || !KEY) return
    const ctl = new AbortController()
    fetch(`${URL}/rest/v1/city_votes?select=city,votes`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rows: { city: string; votes: number }[]) => setVotes(Object.fromEntries(rows.map((r) => [r.city, r.votes]))))
      .catch((e) => { if (!ctl.signal.aborted) console.warn('[align] votes not loaded', e) })
    return () => ctl.abort()
  }, [])
  return votes
}

/** Stripe Payment Link with the city riding along as the vote (the webhook reads client_reference_id). */
export function checkoutUrl(city: string, email: string) {
  if (!LINK) return null
  const u = new window.URL(LINK)
  u.searchParams.set('client_reference_id', city)
  if (email) u.searchParams.set('prefilled_email', email)
  return u.toString()
}
