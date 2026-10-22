import type { Element } from '../data/signs'

/** the orb's light, mid and deep tones for each element */
const TONES: Record<Element, { light: string; mid: string; deep: string; ink: string }> = {
  fire: { light: '#ffe2c8', mid: '#f0603a', deep: '#a8241a', ink: '#3a0c06' },
  earth: { light: '#fff1c8', mid: '#e9b24a', deep: '#8a5a1a', ink: '#3a2408' },
  air: { light: '#e8faff', mid: '#7fd0f0', deep: '#3a7ab8', ink: '#0c2a40' },
  water: { light: '#d2e4ff', mid: '#3f7cf0', deep: '#1a2a8a', ink: '#081440' },
}

/** a clear picture of each element: a flame, mountains, wind, a drop of water */
function Glyph({ element, ink, size }: { element: Element; ink: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {element === 'fire' && (
        <>
          <path d="M12 2.2c.9 3.4 6.2 5.9 6.2 11.6a6.2 6.2 0 0 1-12.4 0c0-2.9 1.5-4.8 2.9-6 .2 2 1.1 3.3 2.4 3.7-.6-3.4.2-6.6.9-9.3Z" fill={ink} />
          <path d="M12 21.2a2.9 2.9 0 0 1-2.9-2.9c0-1.8 1.6-2.8 2.4-4.5.5 1.4 3.4 2.6 3.4 4.5a2.9 2.9 0 0 1-2.9 2.9Z" fill="#ffb06a" />
        </>
      )}
      {element === 'earth' && (
        <>
          <path d="M1.8 20 8.6 7.6l4.1 7.1 2.6-4.2L22.2 20Z" fill={ink} />
          <path d="m8.6 7.6 1.9 3.4-1.3-.6-1.5 1.2-.6-.9Z" fill="rgba(255,255,255,0.6)" />
        </>
      )}
      {element === 'air' && (
        <g fill="none" stroke={ink} strokeWidth="2.3" strokeLinecap="round">
          <path d="M2.5 8.5h11a3 3 0 1 0-3-3" />
          <path d="M2.5 13h16a3 3 0 1 1-3 3" />
          <path d="M2.5 17.5h7" />
        </g>
      )}
      {element === 'water' && (
        <>
          <path d="M12 2.4s6.8 7.5 6.8 12.4a6.8 6.8 0 0 1-13.6 0C5.2 9.9 12 2.4 12 2.4Z" fill={ink} />
          <path d="M8.6 14.6a3.4 3.4 0 0 0 2.6 3.4" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

/**
 * The orb in the corner of a card: the card's element, in its colour, with a
 * picture of it you can read at a glance.
 */
export default function ElementBadge({ element, size = 36 }: { element: Element; size?: number }) {
  const t = TONES[element]
  return (
    <div aria-label={element} style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `radial-gradient(circle at 32% 28%, ${t.light} 0%, ${t.mid} 48%, ${t.deep} 100%)`,
      boxShadow: `0 0 ${Math.round(size * 0.42)}px ${t.mid}99, inset 0 1px 1px rgba(255,255,255,0.6)`,
      display: 'grid', placeItems: 'center',
    }}>
      <Glyph element={element} ink={t.ink} size={Math.round(size * 0.56)} />
    </div>
  )
}
