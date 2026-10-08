import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Profile } from '../../data/profiles'
import { ME } from '../../data/profiles'
import type { SignId } from '../../data/signs'
import { sfx } from '../../lib/sfx'
import { CARD_W } from '../deck/fx'
import ProfileCard from '../deck/ProfileCard'
import { Caption, Cta, Header, EASE } from './shared'

const W = 196
const S = W / CARD_W

/** O-13 — "Your face comes last." Your own card, veiled; tap it to see what a match sees. */
export default function FaceLast({ sun, moon, rising, dealbreakers, next }: {
  sun: SignId; moon: SignId; rising: SignId; dealbreakers: string; next: () => void
}) {
  const [open, setOpen] = useState(false)
  const t = useRef(0)
  useEffect(() => () => clearTimeout(t.current), [])

  const me: Profile = {
    id: 'me', initial: ME.name, name: ME.name, age: ME.age, sign: sun, moon, rising,
    serial: ME.serial.replace('№ ', ''), pull: 'Steady pull', photo: ME.photo, alignsBack: false,
    dealbreakers: dealbreakers || 'Nothing yet. Brave.',
    blurb: 'Sound engineer. Record stores on Sundays. Cooks too much.',
    reading: [
      { kind: 'pull', text: 'Remembers your order. Plans the second date before the first ends.', strength: 3 },
      { kind: 'push', text: 'Slow to say it. Means it twice as long.', strength: 2 },
      { kind: 'align', text: 'Wants a home and a horizon. Will build you both.', strength: 3 },
    ],
  }

  const peek = () => {
    if (open) return
    sfx.flip(); setOpen(true)
    clearTimeout(t.current)
    t.current = window.setTimeout(() => { setOpen(false); sfx.release() }, 2200)
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="Photos · The last thing anyone sees"
        title="Your face comes last."
        body="Photos stay veiled until you both align. Until then, people read your sky — not your face."
        bodyWidth={318}
        bodyStyle={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.45 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
        style={{ position: 'absolute', top: 246, left: 195 - W / 2, width: W, cursor: 'pointer' }}
        onClick={peek}
      >
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <div style={{ transform: `scale(${S})`, transformOrigin: '0 0', width: CARD_W, height: 527 * S }}>
            <ProfileCard profile={me} peek={open ? 'open' : 'none'} />
          </div>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="mono" style={{ position: 'absolute', top: 572, width: '100%', textAlign: 'center', fontSize: 8.5, letterSpacing: '0.18em', color: open ? '#f2c75c' : 'var(--label-3)' }}>
        {open ? 'WHAT A MATCH SEES · AFTER YOU BOTH ALIGN' : 'TAP YOUR CARD · SEE WHAT A MATCH SEES'}
      </motion.div>
      <Cta onClick={next} delay={1}>Continue</Cta>
      <Caption delay={1.2}>You can add the rest after your first align.</Caption>
    </div>
  )
}
