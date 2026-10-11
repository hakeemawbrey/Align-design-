import { motion } from 'framer-motion'
import type { Profile } from '../../data/profiles'
import Starfield from '../Starfield'
import ProfileCard from './ProfileCard'
import { CARD_W, CARD_H, EXTENDED, pronoun } from './fx'
import { sfx } from '../../lib/sfx'

interface Props {
  profile: Profile
  onClose: () => void
  onAlign: () => void
  onRelease: () => void
}

const S = 0.54

/** S-06 — the card lifted into a detail sheet. */
export default function ExpandSheet({ profile, onClose, onAlign, onRelease }: Props) {
  // no long-form copy for this person: use their card's own lines, never someone else's
  const pr = pronoun(profile)
  const line = (k: 'pull' | 'push') => profile.reading.find((r) => r.kind === k)?.text ?? ''
  const ext = EXTENDED[profile.id] ?? {
    easy: line('pull'),
    rubs: line('push'),
    now: profile.blurb ? `Open with ${pr.poss} bio: ask about “${profile.blurb.split('.')[0]}.”` : `Open with something specific from ${pr.poss} card, not “hey”.`,
  }
  const sections: [string, string][] = [
    ['WHY YOU’D CLICK', ext.easy],
    ['WHERE YOU’LL CLASH', ext.rubs],
    ['FIRST MESSAGE IDEA', ext.now],
  ]
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'absolute', inset: 0, zIndex: 60 }}
    >
      <Starfield aurora="#3a1d80" warm="#4a1f5a" count={60} seed={11} />
      <div className="mono" style={{ position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', fontSize: 10.5, letterSpacing: '0.22em', color: 'var(--label-2)' }}>
        {pr.cap} CARD&nbsp; · &nbsp;{profile.serial}/∞
      </div>
      <button onClick={() => { sfx.tap(); onClose() }} aria-label="Close" style={{ position: 'absolute', right: 16, top: 56, width: 40, height: 40, display: 'grid', placeItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="#b3a6c4" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>

      {/* lifted card */}
      <motion.div
        initial={{ scale: 1.55, y: 140 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 1.55, y: 140, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        style={{ position: 'absolute', left: 195 - (CARD_W * S) / 2, top: 96, width: CARD_W * S, height: CARD_H * S, transformOrigin: '50% 30%' }}
      >
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <div style={{ width: CARD_W, height: CARD_H, transform: `scale(${S})`, transformOrigin: 'top left' }}>
            <ProfileCard profile={profile} />
          </div>
        </motion.div>
      </motion.div>

      {/* reading panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 26 }}
        style={{
          position: 'absolute', left: 24, right: 24, top: 390, minHeight: 254, display: 'flex', borderRadius: 22, padding: 5,
          border: '1px solid rgba(179,166,196,0.45)',
          background: 'linear-gradient(160deg, rgba(40,26,78,0.75), rgba(30,18,64,0.85) 60%, rgba(60,30,110,0.8))',
          boxShadow: '0 20px 50px rgba(5,2,15,0.5)',
        }}
      >
        <div style={{ flex: 1, borderRadius: 17, border: '1px solid rgba(179,166,196,0.3)', padding: '12px 15px' }}>
          {sections.map(([h, t], i) => (
            <motion.div key={h} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 + i * 0.08 }} style={{ marginTop: i ? 8 : 0 }}>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: 'var(--label-2)' }}>{h}</div>
              <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.35, color: 'var(--label-1)' }}>{t}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mono" style={{ position: 'absolute', top: 672, left: 0, right: 0, textAlign: 'center', fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--label-3)' }}>
        IF {pr.subj.toUpperCase()} ALIGN{pr.subj === 'they' ? '' : 'S'} TOO, {pr.cap} CARD TURNS OVER
      </div>
      <motion.button
        className="chrome-cta"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onAlign()}
        style={{ position: 'absolute', left: 38, top: 694, width: 314, fontSize: 20 }}
      >
        Align — flip the card <span className="spark">✦</span>
      </motion.button>
      <button onClick={() => onRelease()}
        style={{ position: 'absolute', left: 95, right: 95, top: 756, height: 40, textAlign: 'center', fontSize: 15, color: 'var(--label-2)' }}>
        Release this card
      </button>
    </motion.div>
  )
}
