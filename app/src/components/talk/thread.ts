import { parseTalk } from '../../data/talkCards'
import { parsePlace } from '../../data/places'

/**
 * Read the talk cards out of a chat: which card each play message is, and
 * the latest answer from each side. Answer messages are folded into their
 * card instead of showing as bubbles.
 */
export function talkState(rows: { from: 'me' | 'them'; body: string }[]) {
  const answers: Record<string, { me?: string; them?: string }> = {}
  for (const r of rows) {
    const t = parseTalk(r.body)
    if (t?.type === 'answer') answers[t.cardId] = { ...answers[t.cardId], [r.from]: t.answer }
  }
  return { answers, isTalk: (body: string) => parseTalk(body) != null }
}

/** places played in a chat: each side's yes/no, and whether you checked in */
export function placeState(rows: { from: 'me' | 'them'; body: string }[]) {
  const rsvp: Record<string, { me?: boolean; them?: boolean }> = {}
  const checked = new Set<string>()
  for (const r of rows) {
    const p = parsePlace(r.body)
    if (p?.type === 'rsvp') rsvp[p.id] = { ...rsvp[p.id], [r.from]: p.yes }
    if (p?.type === 'checkin') checked.add(p.id)
  }
  return { rsvp, checked }
}
