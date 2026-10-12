import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import { PageShell, Label, Row, CARD_BG, CARD_LINE } from '../../components/kit'
import { sfx } from '../../lib/sfx'
import { AFTER_SIGNIN } from './state'

export type Perm = 'notifications' | 'camera' | 'location'

const NOTES = [
  { time: 'now', text: 'Juniper aligned back. Seven days. Start talking.' },
  { time: '11:11', text: 'Your deck refreshes at 11:11. Fifteen cards.' },
  { time: 'Tue', text: 'Venus is retrograde. Do not text the ex.' },
]

const ASK: Record<Perm, { title: string; body: string }> = {
  notifications: {
    title: 'Let Align tap you on the shoulder?',
    body: 'A match, the 11:11 deal and the odd planet doing something rude. Never more than three a day.',
  },
  camera: {
    title: 'One veiled photo.',
    body: 'Used for AuraCam and photo verification. Nothing is taken without you pressing the shutter.',
  },
  location: {
    title: 'Your city, never your street.',
    body: 'We read the city once to deal nearby cards. Never live, never shared, never a pin on a map.',
  },
}

const ORDER: Perm[] = ['notifications', 'camera', 'location']

/** a single rounded card around one row, as the design stacks them */
export function CardRow(props: React.ComponentProps<typeof Row>) {
  return (
    <div style={{ borderRadius: 14, background: CARD_BG, border: CARD_LINE, overflow: 'hidden', marginBottom: 8 }}>
      <Row {...props} />
    </div>
  )
}

/** G-03 Permission Primers — the reasons, before the system dialogs ask. */
export default function Permissions({ go, back }: PageProps) {
  // the asks still to make in the one-at-a-time sheet, and what was said so far
  const [queue, setQueue] = useState<Perm[] | null>(null)
  const [denied, setDenied] = useState<Perm[]>([])
  // 'one' = opened from a row: answer just that ask and stay here
  const [mode, setMode] = useState<'all' | 'one'>('all')
  const [said, setSaid] = useState<Partial<Record<Perm, boolean>>>({})
  const open = (m: 'all' | 'one', q: Perm[]) => { setMode(m); setDenied([]); setQueue(q) }

  const allowAll = () => { sfx.align(); go(AFTER_SIGNIN) }

  const answer = (allow: boolean) => {
    if (!queue) return
    const [cur, ...rest] = queue
    const nextDenied = allow ? denied.filter((d) => d !== cur) : [...new Set([...denied, cur])]
    if (allow) sfx.sparkle(); else sfx.tap()
    setSaid((x) => ({ ...x, [cur]: allow }))
    if (mode === 'one') { setQueue(null); return }
    setDenied(nextDenied)
    if (rest.length) { setQueue(rest); return }
    setQueue(null)
    window.setTimeout(() => {
      if (nextDenied.length) go(`x/permissions-off/${ORDER.filter((p) => nextDenied.includes(p)).join(',')}`)
      else go(AFTER_SIGNIN)
    }, 350)
  }

  const cur = queue?.[0]
  const step = cur ? ORDER.indexOf(cur) + 1 : 0

  return (
    <>
      <PageShell
        onBack={back}
        eyebrow="Before the system asks"
        title={<>Three asks,<br />each with a reason.</>}
        body="Notifications first. All they would ever say:"
        cta={{ label: 'Allow all three', onClick: allowAll }}
        caption={{ label: 'Decide one at a time', onClick: () => open('all', ORDER) }}
      >
        {NOTES.map((n, i) => (
          <motion.div key={n.time} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.12, type: 'spring', stiffness: 260, damping: 26 }}
            style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', marginBottom: 8, borderRadius: 16, background: CARD_BG, border: CARD_LINE }}>
            <img src="icons/icon-192.png" alt="" width={34} height={34} style={{ borderRadius: 9, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--label-1)' }}>Align</span>
                <span style={{ fontSize: 11, color: 'var(--label-3)' }}>{n.time}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.35, color: 'var(--label-1)', marginTop: 2, textWrap: 'pretty' }}>{n.text}</div>
            </div>
          </motion.div>
        ))}
        <Label style={{ marginTop: 20 }}>The other two</Label>
        <CardRow label="Camera" value={said.camera === undefined ? 'One veiled photo' : said.camera ? 'Allowed' : 'Not now'} onClick={() => open('one', ['camera'])} />
        <CardRow label="Location" value={said.location === undefined ? 'City, never live' : said.location ? 'Allowed' : 'Not now'} onClick={() => open('one', ['location'])} />
      </PageShell>

      <AnimatePresence>
        {cur && (
          <>
            <motion.div key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { sfx.tap(); setQueue(null) }}
              style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(5,2,15,0.58)' }} />
            <motion.div key="sheet" initial={{ y: 420 }} animate={{ y: 0 }} exit={{ y: 420 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 61, padding: '30px 24px 40px', borderRadius: '26px 26px 0 0', background: 'var(--raised)', borderTop: CARD_LINE }}>
              <div style={{ position: 'absolute', top: 12, left: '50%', marginLeft: -20, width: 40, height: 4, borderRadius: 2, background: 'rgba(179,166,196,0.3)' }} />
              <AnimatePresence mode="wait">
                <motion.div key={cur} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}>
                  <div className="eyebrow" style={{ color: 'var(--label-3)', letterSpacing: '0.2em' }}>
                    {mode === 'all' ? `${step} of 3 · ` : ''}{cur}
                  </div>
                  <h2 className="h-display" style={{ fontSize: 26, lineHeight: 1.15, marginTop: 8 }}>{ASK[cur].title}</h2>
                  <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.45, color: 'var(--label-2)' }}>{ASK[cur].body}</p>
                </motion.div>
              </AnimatePresence>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <motion.button className="chrome-cta" whileTap={{ scale: 0.97 }} onClick={() => { sfx.tap(); answer(true) }}>
                  Allow <span className="spark">✦</span>
                </motion.button>
                <button onClick={() => answer(false)} style={{ minHeight: 40, padding: '0 16px', fontSize: 13.5, color: 'var(--label-2)' }}>Not now</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
