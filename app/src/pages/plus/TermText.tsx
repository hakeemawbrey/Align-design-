import type { ReactNode } from 'react'
import type { ScreenId } from '../../screens/types'
import { sfx } from '../../lib/sfx'
import { TERM_WORDS } from './terms'

const RE = new RegExp(`\\b(${TERM_WORDS.map(([w]) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
const SLUG = Object.fromEntries(TERM_WORDS.map(([w, s]) => [w.toLowerCase(), s]))

/**
 * Reading copy with its astro words made tappable: each one opens the term
 * explainer (x/term/<slug>). Only the first mention of each term is linked.
 */
export default function TermText({ text, go }: { text: string; go: (id: ScreenId) => void }) {
  const out: ReactNode[] = []
  const seen = new Set<string>()
  let last = 0
  for (const m of text.matchAll(RE)) {
    const slug = SLUG[m[0].toLowerCase()]
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    const at = m.index ?? 0
    if (at > last) out.push(text.slice(last, at))
    out.push(
      <button key={at} onClick={(e) => { e.stopPropagation(); sfx.tap(); go(`x/term/${slug}`) }}
        style={{ display: 'inline', padding: 0, font: 'inherit', color: 'inherit', textDecoration: 'underline dotted', textDecorationColor: 'rgba(239,230,214,0.55)', textUnderlineOffset: 3, cursor: 'pointer' }}>
        {m[0]}
      </button>,
    )
    last = at + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}
