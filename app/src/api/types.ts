/**
 * The backend contract. The app talks only to this, so the same screens run
 * on the in-browser backend (no setup) or on Supabase (set the env vars).
 *
 * The demo account is a single person (Hakeem) in a seeded world: other
 * people are profiles in the database, and their side of a chat is written
 * by the app. Every account sees only its own swipes, matches and messages.
 */
export type SwipeDir = 'align' | 'release'

export interface Message {
  id: string
  /** profile id of the person you matched with */
  matchId: string
  from: 'me' | 'them'
  body: string
  /** ISO timestamp */
  at: string
}

export interface Snapshot {
  /** profile ids you have a match with, newest first */
  matches: string[]
  /** profile ids you have traded cards with */
  traded: string[]
  swipes: Record<string, SwipeDir>
}

export interface Backend {
  readonly kind: 'local' | 'supabase'
  /** sign in (Supabase: an anonymous account per device) and load your state */
  init(): Promise<Snapshot>
  /** record a swipe; resolves with whether it made a match */
  swipe(profileId: string, dir: SwipeDir): Promise<{ matched: boolean }>
  messages(matchId: string): Promise<Message[]>
  send(matchId: string, from: Message['from'], body: string): Promise<Message>
  /** new messages in this chat from anywhere (another device, the other side) */
  onMessage(matchId: string, cb: (m: Message) => void): () => void
  trade(matchId: string): Promise<void>
  /** wipe this account's swipes, matches, messages and trades; resolves with the fresh state */
  reset(): Promise<Snapshot>
}
