import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DECK } from '../../data/profiles'
import { CARD_W } from '../deck/fx'
import ProfileCard from '../deck/ProfileCard'
import CardBack from '../intro/CardBack'
import { Caption, Cta, Header, EASE } from './shared'

const HER = DECK.find((p) => p.id === 'j27') ?? DECK[0]
const CW = 116
const CH = 185
const TOP = 250
const S = CW / CARD_W

const RULES = [
  'Every profile is a veiled card — aura, chart, dealbreakers. No photos.',
  'Align with someone who aligns back, and both cards flip — faces revealed.',
  'Pass, and you never see who they were. Nobody gets judged by a photo.',
]

const face: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

/** O-11 — the flipped-card rule. The right card flips on a loop. */
export default function CardRule({ next }: { next: () => void }) {
  const [up, setUp] = useState(false)

  useEffect(() => {
    let t: number
    const loop = (u: boolean) => {
      t = window.setTimeout(() => { setUp(!u); loop(!u) }, u ? 2800 : 1700)
    }
    loop(false)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Header
        eyebrow="How Align works"
        title={<>You fall for the chart.<br />The face comes after.</>}
        body="Everyone arrives as a veiled card. Align each other and both cards flip."
        bodyWidth={330}
      />

      {/* left: veiled */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -6 }} animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
        style={{ position: 'absolute', left: 32, top: TOP, width: CW, height: CH }}
      >
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <CardBack width={CW} height={CH} />
        </motion.div>
      </motion.div>

      {/* arrow */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
        <div className="mono" style={{ position: 'absolute', top: TOP + 26, left: 145, width: 100, textAlign: 'center', fontSize: 9, lineHeight: 1.5, letterSpacing: '0.18em', color: 'var(--label-1)' }}>
          IF YOU<br />BOTH ALIGN
        </div>
        <svg width={390} height={844} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }}>
          <motion.path
            d={`M 158 ${TOP + 122} Q 192 ${TOP + 170} 232 ${TOP + 96}`}
            fill="none" stroke="#efe6d6" strokeWidth={2.4} strokeLinecap="round" strokeDasharray="0 7"
            animate={{ strokeDashoffset: [0, -14] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.6))' }}
          />
          <path d={`M 224 ${TOP + 98} L 233 ${TOP + 94} L 234 ${TOP + 104}`} fill="none" stroke="#efe6d6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* right: flips on a loop */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 6 }} animate={{ opacity: 1, x: 0, rotate: 2 }}
        transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
        style={{ position: 'absolute', left: 242, top: TOP, width: CW, height: CH, perspective: 700 }}
      >
        <motion.div
          animate={{ opacity: up ? [0.4, 1, 0.6] : 0, scale: up ? [0.9, 1.15, 1] : 0.9 }}
          transition={{ duration: 0.9 }}
          style={{ position: 'absolute', inset: -16, borderRadius: 24, background: 'radial-gradient(closest-side, rgba(225,99,214,0.55), transparent)', filter: 'blur(6px)' }}
        />
        <motion.div
          animate={{ rotateY: up ? 180 : 0, scale: up ? [1, 1.08, 1] : [1, 1.04, 1] }}
          transition={{ duration: 0.75, ease: [0.5, 0, 0.2, 1] }}
          style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
        >
          <div style={face}><CardBack width={CW} height={CH} /></div>
          <div style={{ ...face, transform: 'rotateY(180deg)' }}>
            <div style={{ transform: `scale(${S})`, transformOrigin: '0 0', width: CARD_W }}>
              <ProfileCard profile={HER} peek="open" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* numbered rules */}
      <div style={{ position: 'absolute', top: TOP + CH + 18, left: 40, width: 316, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {RULES.map((r, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.55, ease: EASE }}
            style={{ display: 'flex', gap: 18, fontSize: 13.5, lineHeight: 1.4, color: 'var(--label-1)' }}>
            <span className="mono" style={{ fontSize: 9.5, color: '#d88ad8', paddingTop: 3, flexShrink: 0 }}>0{i + 1}</span>
            {r}
          </motion.div>
        ))}
      </div>

      <Cta onClick={next} delay={1.2}>I’m in</Cta>
      <Caption delay={1.35}>No photo is shown until you both align.</Caption>
    </div>
  )
}
