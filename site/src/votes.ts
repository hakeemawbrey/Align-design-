import { useEffect, useState } from 'react'

/** counts per city slug */
export type Votes = Record<string, number>

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
const LINK = import.meta.env.VITE_BETA_LINK as string | undefined
const EVERY_MS = 20_000

export const votesLive = !!(URL && KEY)
export const checkoutReady = !!LINK

/** what the board shows before it's connected, labelled as a sample on the page */
const SAMPLE: Votes = {
  'atlanta-ga': 131, 'new-orleans-la': 104, 'new-york-ny': 88, 'los-angeles-ca': 71, 'chicago-il': 52,
  'miami-fl': 47, 'tulsa-ok': 33, 'denver-co': 24, 'nashville-tn': 19, 'oklahoma-city-ok': 14, 'phoenix-az': 11,
}

export interface Tally {
  /** paid seats by the city they voted for after Texas; one seat, one vote */
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

/** what someone fills in to vote and get a beta seat */
export interface Signup {
  vote: string
  name: string
  birthDate: string
  email: string
}

/**
 * Save the signup (unpaid) and return the Stripe Payment Link for it. Stripe only carries
 * the signup's id as client_reference_id; the webhook marks that row paid, and its vote counts.
 * Without Supabase the link carries just the vote.
 */
export async function checkout(s: Signup): Promise<string | null> {
  if (!LINK) return null
  let ref = s.vote
  if (URL && KEY) {
    ref = crypto.randomUUID()
    const r = await fetch(`${URL}/rest/v1/beta_signups`, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({
        id: ref, vote: s.vote, name: s.name, birth_date: s.birthDate,
        email: s.email,
      }),
    })
    if (!r.ok) throw new Error(`signup not saved (${r.status})`)
  }
  const u = new window.URL(LINK)
  u.searchParams.set('client_reference_id', ref)
  if (s.email) u.searchParams.set('prefilled_email', s.email)
  return u.toString()
}
