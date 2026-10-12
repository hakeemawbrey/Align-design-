import { motion } from 'framer-motion'
import { Caption, Cta, rise } from '../onboarding/shared'
import { SIGNS, type SignId } from '../../data/signs'
import { ME } from '../../data/profiles'
import { sfx } from '../../lib/sfx'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** "Earth and air." / "Both fire." — your element and theirs */
export function elementsLine(theirs: SignId, mine: SignId = ME.sign) {
  const a = SIGNS[mine].element
  const b = SIGNS[theirs].element
  return a === b ? `Both ${a}.` : `${cap(a)} and ${b}.`
}

/** Two openers built from their card (shown in quotes, sent without), for matches without hand-written ones. */
export function openersFor(name: string, blurb?: string): string[] {
  const first = blurb?.split('.')[0]?.trim()
  return [
    first ? `${first}. Ok, tell me the real version.` : `What’s the story your card doesn’t tell, ${name}?`,
    'The cards said we’re dangerous. Verify?',
  ]
}

/**
 * G-10 — a brand-new match, nothing said yet. Two openers to pick from, then
 * the composer. Sits inside a chat screen (header above, tab bar below).
 */
export default function EmptyThread({ sign, openers, picked, onPick, onSay, onOwn }: {
  /** their sun sign */
  sign: SignId
  openers: string[]
  /** index of the opener in the composer, if any */
  picked: number | null
  onPick: (i: number) => void
  /** the CTA: send the picked opener, or open the composer */
  onSay: () => void
  onOwn: () => void
}) {
  return (
    <>
      <div style={{ position: 'absolute', top: 278, left: 24, right: 24, textAlign: 'center' }}>
        <motion.h1 className="h-display" {...rise(0.1)} style={{ fontSize: 31, lineHeight: 1.12 }}>
          Nobody has said<br />anything yet.
        </motion.h1>
        <motion.p {...rise(0.22)} style={{ margin: '8px auto 0', width: 300, fontSize: 14, lineHeight: 1.4, color: 'var(--label-2)' }}>
          {elementsLine(sign)} Neither of you will start — unless one of you does.
        </motion.p>
      </div>

      <motion.div {...rise(0.32)} style={{ position: 'absolute', top: 452, left: 24, right: 24 }}>
        <div className="eyebrow" style={{ fontSize: 9, color: 'var(--label-3)', marginBottom: 8 }}>Guidance · ask, don’t hint</div>
        {openers.map((o, i) => (
          <motion.button
            key={o}
            whileTap={{ scale: 0.98 }}
            onClick={() => { sfx.tap(); onPick(i) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 58, marginTop: i ? 10 : 0,
              padding: '10px 14px 10px 16px', borderRadius: 16, textAlign: 'left',
              background: picked === i ? 'rgba(64,44,120,0.9)' : 'rgba(52,35,95,0.6)',
              border: `1px solid ${picked === i ? 'rgba(248,237,255,0.55)' : 'rgba(179,166,196,0.16)'}`,
              transition: 'background .2s, border-color .2s',
            }}
          >
            <span style={{ flex: 1, fontSize: 14, lineHeight: 1.4, color: 'var(--label-1)' }}>“{o}”</span>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="var(--label-3)" strokeWidth="1.6" strokeLinecap="round"><path d="m1 1 5 5-5 5" /></svg>
          </motion.button>
        ))}
      </motion.div>

      <Cta onClick={() => { sfx.tap(); onSay() }} delay={0.45}>{picked == null ? 'Say something' : 'Send it'}</Cta>
      <Caption delay={0.55} top={708} onClick={() => { sfx.tap(); onOwn() }}>Or say your own thing</Caption>
    </>
  )
}
