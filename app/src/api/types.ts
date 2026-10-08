/**
 * The backend contract. The app talks only to this, so the same screens run
 * on the in-browser backend (no setup) or on Supabase (set the env vars).
 *
 * The demo account is a single person (Hakeem) in a seeded world: other
 * people are profiles in the database, and their side of a chat is written
 * by the app. Every account sees only its own swipes, matches and messages.
 */
import type { Profile } from '../data/profiles'
import type { SignId } from '../data/signs'

export type SwipeDir = 'align' | 'release'

/** The card you publish from onboarding — what other people see in their deck. */
export interface MyCard {
  name: string
  age: number
  sun: SignId
  moon: SignId
  rising: SignId
  blurb: string
  dealbreakers: string
  /** URL (Supabase storage) or data URL (on this device) */
  photo?: string
}

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
  /** real people: everyone in your deck, plus anyone you've matched with */
  people: Profile[]
  /** seeded profiles as the database has them (Supabase only) */
  catalog?: Profile[]
  /** your published card id, if you've published one */
  myCardId?: string
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
  /** publish or update your card so it can be dealt to other people */
  publish(card: MyCard): Promise<string>
  /** store a photo for your card; resolves with its URL */
  uploadPhoto(file: Blob): Promise<string>
  /** someone aligned back on you (a match made from their side) */
  onMatch(cb: (profile: Profile) => void): () => void
  /** wipe this account's swipes, matches, messages and trades; resolves with the fresh state */
  reset(): Promise<Snapshot>
}
