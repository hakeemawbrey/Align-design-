import { useEffect, useState } from 'react'

/** paid beta seats per city slug; one seat is one vote */
export type Votes = Record<string, number>

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
const LINK = import.meta.env.VITE_BETA_LINK as string | undefined
const EVERY_MS = 20_000

export const votesLive = !!(URL && KEY)
export const checkoutReady = !!LINK

/** what the board shows before it's connected, labelled as a sample on the page */
const SAMPLE: Votes = {
  'houston-tx': 212, 'austin-tx': 64, 'dallas-fort-worth-tx': 81, 'san-antonio-tx': 37,
  'atlanta-ga': 58, 'new-orleans-la': 41, 'new-york-ny': 39, 'los-angeles-ca': 33, 'chicago-il': 24,
  'miami-fl': 22, 'tulsa-ok': 17, 'denver-co': 11, 'nashville-tn': 9,
}

export interface Tally {
  votes: Votes
  /** false: sample numbers, the board isn't connected */
  live: boolean
  updatedAt: number | null
}

/** the tally from Supabase's `city_votes` view, refreshed every 20 seconds while the page is open */
export function useVotes(): Tally {
  const [t, setT] = useState<Tally>({ votes: votesLive ? {} : SAMPLE, live: false, updatedAt: null })
  useEffect(() => {
    if (!URL || !KEY) return
    const ctl = new AbortController()
    const load = () => {
      if (document.hidden) return
      fetch(`${URL}/rest/v1/city_votes?select=city,votes`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, signal: ctl.signal })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((rows: { city: string; votes: number }[]) =>
          setT({ votes: Object.fromEntries(rows.map((r) => [r.city, r.votes])), live: true, updatedAt: Date.now() }))
        .catch((e) => { if (!ctl.signal.aborted) console.warn('[align] votes not loaded', e) })
    }
    load()
    const id = window.setInterval(load, EVERY_MS)
    document.addEventListener('visibilitychange', load)
    return () => { ctl.abort(); window.clearInterval(id); document.removeEventListener('visibilitychange', load) }
  }, [])
  return t
}

/** Stripe Payment Link with the city riding along as the vote (the webhook reads client_reference_id). */
export function checkoutUrl(city: string, email: string) {
  if (!LINK) return null
  const u = new window.URL(LINK)
  u.searchParams.set('client_reference_id', city)
  if (email) u.searchParams.set('prefilled_email', email)
  return u.toString()
}
