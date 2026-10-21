import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PageProps } from '../types'
import TabBar from '../../components/TabBar'
import Composer from '../../components/club/Composer'
import { AuraAvatar } from '../../components/club/PostParts'
import { ROOM_COUNT } from '../../components/club/posts'
import { rise } from '../../components/onboarding/shared'
import { ME } from '../../data/profiles'
import { SIGNS, type SignId } from '../../data/signs'
import { session } from '../../lib/session'
import { sfx } from '../../lib/sfx'
import { Cta, Eyebrow, Frame, Panel } from './ui'

const SUN = SIGNS[ME.sign]
/** what a room full of each sign calls itself */
const PEOPLE: Record<SignId, string> = {
  aries: 'Arians', taurus: 'Taureans', gemini: 'Geminis', cancer: 'Cancers', leo: 'Leos', virgo: 'Virgos',
  libra: 'Librans', scorpio: 'Scorpios', sagittarius: 'Sagittarians', capricorn: 'Capricorns', aquarius: 'Aquarians', pisces: 'Pisceans',
}
const CX = 195
const CY = 248
const RINGS = [118, 86, 54]

/** S-17c — Empty club: the room after 11:11, before anyone has said anything. */
export default function ClubEmpty({ go }: PageProps) {
  const [composing, setComposing] = useState(false)

  const post = (text: string) => {
    setComposing(false)
    sfx.send()
    session.patch({ clubMine: [{ id: `me-${Date.now()}`, text, likes: 0, sparks: 0 }, ...session.get().clubMine] })
    window.setTimeout(() => go('club'), 260)
  }

  return (
    <Frame aurora="#2f2a80" warm="#4a2470" seed={17}>
      <div style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center' }}>
        <Eyebrow>Houston · {SUN.name} only</Eyebrow>
        <motion.div className="h-display" {...rise(0.1)} style={{ fontSize: 28, marginTop: 8 }}>The {SUN.name} room</motion.div>
      </div>

      {/* the quiet room: rings around your sign, one slow orbiting mote */}
      {RINGS.map((r, i) => (
        <motion.div key={r} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.1, duration: 0.8 }}
          style={{ position: 'absolute', left: CX - r, top: CY - r, width: r * 2, height: r * 2, borderRadius: '50%', border: '1px solid rgba(179,166,196,0.28)' }} />
      ))}
      {RINGS.map((r, i) => (
        <motion.div key={`m${r}`} animate={{ rotate: 360 }} transition={{ duration: 28 + i * 14, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', left: CX - r, top: CY - r, width: r * 2, height: r * 2, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', left: r - 2, top: -2, width: 4, height: 4, borderRadius: 2, background: 'rgba(239,230,214,0.6)', boxShadow: '0 0 6px rgba(239,230,214,0.6)', opacity: 0.4 + i * 0.2 }} />
        </motion.div>
      ))}
      <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', left: CX - 21, top: CY - 21 }}>
        <AuraAvatar sign={ME.sign} size={42} />
      </motion.div>

      <div style={{ position: 'absolute', top: 392, left: 24, right: 24, textAlign: 'center' }}>
        <Eyebrow delay={0.2}>{SUN.name} only · Quiet</Eyebrow>
        <motion.div className="h-display" {...rise(0.28)} style={{ fontSize: 30, marginTop: 8 }}>Nobody has posted today.</motion.div>
        <motion.p {...rise(0.36)} style={{ margin: '10px auto 0', maxWidth: 330, fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-2)' }}>
          {ROOM_COUNT.toLocaleString('en-US')} {PEOPLE[ME.sign]} are in here. Nobody outside your sign can read a word of it, which is the whole point.
        </motion.p>
      </div>

      <motion.div {...rise(0.45)} style={{ position: 'absolute', top: 524, left: 24, right: 24 }}>
        <Panel style={{ padding: '12px 16px 14px', background: 'rgba(52,35,95,0.72)' }}>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', color: 'var(--label-3)' }}>TRY THIS</div>
          <div style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.45, color: 'var(--label-1)' }}>
            Mercury goes direct tomorrow. Somebody has an opinion about that and it might as well be you.
          </div>
        </Panel>
      </motion.div>

      <Cta top={660} onClick={() => setComposing(true)}>Say the first thing</Cta>
      <TabBar active="club" go={go} />

      <AnimatePresence>
        {composing && (
          <Composer key="composer" prompt="Mercury goes direct tomorrow. Opinions?" listening={ROOM_COUNT.toLocaleString('en-US')}
            onPost={post} onClose={() => setComposing(false)} />
        )}
      </AnimatePresence>
    </Frame>
  )
}
