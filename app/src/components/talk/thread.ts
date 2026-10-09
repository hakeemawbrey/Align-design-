import { parseTalk } from '../../data/talkCards'

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
