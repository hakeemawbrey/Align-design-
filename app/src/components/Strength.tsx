/**
 * How strong something is, in a word. Replaces the old row of dots, which
 * nobody could read without being told what they meant.
 */
const WORDS: Record<3 | 5, string[]> = {
  3: ['Light', 'Medium', 'Strong'],
  5: ['Faint', 'Light', 'Medium', 'Strong', 'Very strong'],
}

export function strengthWord(n: number, of: 3 | 5 = 3) {
  const w = WORDS[of]
  return w[Math.min(w.length, Math.max(1, Math.round(n))) - 1]
}

export default function Strength({ n, of = 3, color, size = 8.5 }: { n: number; of?: 3 | 5; color: string; size?: number }) {
  return (
    <span className="mono" style={{
      flexShrink: 0, padding: '2px 7px', borderRadius: 999, fontSize: size, letterSpacing: '0.12em', textTransform: 'uppercase',
      color, border: `1px solid ${color}88`, background: `${color}14`, whiteSpace: 'nowrap',
    }}>
      {strengthWord(n, of)}
    </span>
  )
}
