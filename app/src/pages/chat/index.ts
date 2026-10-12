import type { CaptureShot, PageDef } from '../types'
import ChatState from './ChatState'
import MatchExpired from './MatchExpired'

export const PAGES: Record<string, PageDef> = {
  'chat-state': { ref: 'S-09c…h — Chat states', Component: ChatState, home: 'matches' },
  'match-expired': { ref: 'G-12 — Match Expired', Component: MatchExpired, home: 'matches' },
}

/** every match from data/matches.ts blocked → the Matches tab has nobody to show */
const NO_MATCHES = { blockedPeople: ['j27', 't24', 'a31', 'z26', 'm29', 's29'] }

export const SHOTS: CaptureShot[] = [
  { name: 'S-09c — Chat · sent, unread', hash: 'x/chat-state/unread' },
  { name: 'S-09e — Chat · not sent', hash: 'x/chat-state/failed' },
  { name: 'S-09f — Chat · expiring', hash: 'x/chat-state/expiring' },
  { name: 'S-09g — Chat · closed', hash: 'x/chat-state/closed' },
  { name: 'S-09h — Chat · Her card', hash: 'x/chat-state/card', wait: 2400 },
  { name: 'G-09b — No Matches Yet', hash: 'matches', session: NO_MATCHES },
  { name: 'G-10 — Chat Empty State', hash: 'x/chat-state/empty' },
  { name: 'G-12 — Match Expired', hash: 'x/match-expired/j27' },
]
