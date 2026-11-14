/**
 * Planet symbols, drawn. Text characters like ☉ ♀ ♂ come from whatever font
 * the phone has, and some phones swap them for emoji or a mismatched style;
 * these look the same everywhere.
 */
export type PlanetKind = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'rising'

/** the strokes for one symbol, on a 24 × 24 grid */
export function planetShape(kind: PlanetKind) {
  switch (kind) {
    case 'sun': return <><circle cx="12" cy="12" r="7.5" /><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" /></>
    case 'moon': return <path d="M15.5 4.2a8 8 0 1 0 0 15.6 6.4 6.4 0 0 1 0-15.6Z" />
    case 'mercury': return <><circle cx="12" cy="11" r="4.2" /><path d="M12 15.2V21M9.3 18.4h5.4M8.2 3.4a3.8 3.8 0 0 0 7.6 0" /></>
    case 'venus': return <><circle cx="12" cy="9" r="5" /><path d="M12 14v7M8.8 18h6.4" /></>
    case 'mars': return <><circle cx="10" cy="14" r="5" /><path d="M13.6 10.4 19.5 4.5M14.5 4.5h5v5" /></>
    case 'jupiter': return <path d="M6.5 7.5c1.6-3 6-2.6 6 .6 0 3-3.4 5-6.4 6.4H18M15 5v15" />
    case 'saturn': return <path d="M7 3.5v12M4.5 7h6M7 11.5c2.2-3.2 8-2.2 8 2 0 2.6-2.6 3.6-2.6 5.4 0 1.2 1 2 2.6 1.6" />
    case 'rising': return <path d="M12 20V5M6.5 10.5 12 5l5.5 5.5" />
  }
}

export default function PlanetIcon({ kind, size = 16, color = 'currentColor', weight = 1.7 }: { kind: PlanetKind; size?: number; color?: string; weight?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', color }}>
      {planetShape(kind)}
    </svg>
  )
}
