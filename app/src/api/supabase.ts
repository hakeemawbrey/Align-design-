import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Backend, Message, SwipeDir } from './types'

interface Row { id: string; profile_id: string; sender: 'me' | 'them'; body: string; created_at: string }
const toMessage = (r: Row): Message => ({ id: r.id, matchId: r.profile_id, from: r.sender, body: r.body, at: r.created_at })

/**
 * Supabase backend. Each device signs in anonymously, so every phone you hand
 * someone gets its own fresh account; row-level security keeps accounts apart.
 * Schema: supabase/migrations. Requires "Allow anonymous sign-ins" in Auth settings.
 */
export function supabaseBackend(url: string, anonKey: string): Backend {
  const sb: SupabaseClient = createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } })
  let uid = ''

  const must = <T>(r: { data: T | null; error: { message: string } | null }): T => {
    if (r.error) throw new Error(r.error.message)
    return r.data as T
  }

  return {
    kind: 'supabase',
    async init() {
      const { data } = await sb.auth.getSession()
      if (data.session) uid = data.session.user.id
      else {
        const res = await sb.auth.signInAnonymously()
        if (res.error || !res.data.user) throw new Error(res.error?.message ?? 'anonymous sign-in failed')
        uid = res.data.user.id
      }
      // first launch on this account: hand out the starter matches (no-op afterwards)
      must(await sb.rpc('start_account'))
      const [swipes, matches, trades] = await Promise.all([
        sb.from('swipes').select('profile_id, dir'),
        sb.from('matches').select('profile_id, created_at').order('created_at', { ascending: false }),
        sb.from('trades').select('profile_id'),
      ])
      return {
        swipes: Object.fromEntries(must(swipes).map((s: { profile_id: string; dir: SwipeDir }) => [s.profile_id, s.dir])),
        matches: must(matches).map((m: { profile_id: string }) => m.profile_id),
        traded: must(trades).map((t: { profile_id: string }) => t.profile_id),
      }
    },
    async swipe(profileId, dir) {
      // server decides the match (profiles.aligns_back), so the client can't fake one
      const matched = must(await sb.rpc('swipe', { p_profile: profileId, p_dir: dir })) as boolean
      return { matched }
    },
    async messages(matchId) {
      const rows = must(await sb.from('messages').select('*').eq('profile_id', matchId).order('created_at')) as Row[]
      return rows.map(toMessage)
    },
    async send(matchId, from, body) {
      const row = must(await sb.from('messages').insert({ user_id: uid, profile_id: matchId, sender: from, body }).select().single()) as Row
      return toMessage(row)
    },
    onMessage(matchId, cb) {
      const ch = sb.channel(`messages:${uid}:${matchId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `user_id=eq.${uid}` }, (p) => {
          const r = p.new as Row
          if (r.profile_id === matchId) cb(toMessage(r))
        })
        .subscribe()
      return () => { void sb.removeChannel(ch) }
    },
    async trade(matchId) {
      must(await sb.from('trades').upsert({ user_id: uid, profile_id: matchId }))
    },
    async reset() {
      must(await sb.rpc('reset_account'))
      return this.init()
    },
  }
}
