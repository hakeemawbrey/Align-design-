import { motion } from 'framer-motion'
import { useTalk, talk } from '../../lib/talk'

/** The talk-card button in a chat composer: a tiny fanned hand, with a dot when something's new. */
export default function CardsButton({ onClick }: { onClick: () => void }) {
  const { packs } = useTalk()
  const fresh = packs.length > 0 || talk.dailyAvailable()
  return (
    <motion.button type="button" aria-label="Talk cards" whileTap={{ scale: 0.88 }}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      style={{ position: 'relative', width: 38, height: 38, borderRadius: 19, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'rgba(52,35,95,0.9)' }}>
      <HandIcon />
      {fresh && <span style={{ position: 'absolute', top: 3, right: 3, width: 8, height: 8, borderRadius: 4, background: 'var(--rub)', boxShadow: '0 0 6px var(--rub)' }} />}
    </motion.button>
  )
}

/** the hand: three fanned cards. The one icon for your cards everywhere in the app. */
export function HandIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 20 / 22} viewBox="0 0 22 20" fill="none">
      <rect x="2.5" y="4" width="9" height="13" rx="2" transform="rotate(-14 7 10.5)" stroke="#c9b6f0" strokeWidth="1.3" fill="#2a1660" />
      <rect x="10" y="3" width="9" height="13" rx="2" transform="rotate(12 14.5 9.5)" stroke="#c9b6f0" strokeWidth="1.3" fill="#2a1660" />
      <rect x="6.5" y="2" width="9" height="13" rx="2" stroke="#f8edff" strokeWidth="1.4" fill="#3a1d78" />
      <path d="M11 5.8c.25 1.6.9 2.3 2.4 2.5-1.5.2-2.15.9-2.4 2.5-.25-1.6-.9-2.3-2.4-2.5 1.5-.2 2.15-.9 2.4-2.5Z" fill="#f8edff" />
    </svg>
  )
}
