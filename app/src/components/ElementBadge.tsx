import type { Element } from '../data/signs'

/** the orb's light, mid and deep tones for each element */
const TONES: Record<Element, { light: string; mid: string; deep: string; ink: string }> = {
  fire: { light: '#ffe2c8', mid: '#f0603a', deep: '#a8241a', ink: '#3a0c06' },
  earth: { light: '#fff1c8', mid: '#e9b24a', deep: '#8a5a1a', ink: '#3a2408' },
  air: { light: '#e8faff', mid: '#7fd0f0', deep: '#3a7ab8', ink: '#0c2a40' },
  water: { light: '#d2e4ff', mid: '#3f7cf0', deep: '#1a2a8a', ink: '#081440' },
}

/**
 * The orb in the corner of a card: the card's element, in its colour, with the
 * old alchemy mark (fire △, air △ barred, water ▽, earth ▽ barred).
 */
export default function ElementBadge({ element, size = 36 }: { element: Element; size?: number }) {
  const t = TONES[element]
  const up = element === 'fire' || element === 'air'
  const barred = element === 'air' || element === 'earth'
  const g = Math.round(size * 0.5)
  return (
    <div aria-label={element} style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `radial-gradient(circle at 32% 28%, ${t.light} 0%, ${t.mid} 48%, ${t.deep} 100%)`,
      boxShadow: `0 0 ${Math.round(size * 0.42)}px ${t.mid}99, inset 0 1px 1px rgba(255,255,255,0.6)`,
      display: 'grid', placeItems: 'center',
    }}>
      <svg width={g} height={g} viewBox="0 0 24 24" fill="none" stroke={t.ink} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d={up ? 'M12 3.5 21 19.5H3Z' : 'M12 20.5 3 4.5h18Z'} />
        {barred && <path d={up ? 'M6.9 13.5h10.2' : 'M6.9 10.5h10.2'} />}
      </svg>
    </div>
  )
}
