/** Juniper × Hakeem cosmic alignment — copy from S-21 / S-21b / S-21c / S-21d. */
export type ReadingTab = 'spark' | 'rub' | 'align' | 'relationship'

export interface Reading {
  id: ReadingTab
  label: string
  eyebrow: string
  color: string
  /** pill fill when active */
  pill: string
  pips: number
  headline: string
  body: string
  tryLine: string
}

export const READINGS: Reading[] = [
  {
    id: 'spark', label: 'Spark', eyebrow: 'Where it lights', color: '#8fd8f6', pill: 'rgba(120, 150, 230, 0.38)', pips: 4,
    headline: 'She answers like you do.',
    body: 'No games, no three-day rule. You both reply when you have something to say and go quiet when you don’t, which reads as confidence from either side. The first five nights will feel easier than they should.',
    tryLine: 'Ask about the last thing she changed her mind on.',
  },
  {
    id: 'rub', label: 'Rub', eyebrow: 'Where it catches', color: '#f59cc4', pill: 'rgba(232, 98, 160, 0.38)', pips: 2,
    headline: 'You want the last word. She wants silence.',
    body: 'Libra ends an argument by leaving the room; Taurus ends it by winning. Neither works on the other. Money is the second fault line — you keep, she spends on beauty, and both of you think that is obvious.',
    tryLine: 'Name a number before the second dinner.',
  },
  {
    id: 'align', label: 'Align', eyebrow: 'Where it holds', color: '#f2c75c', pill: 'rgba(242, 199, 92, 0.42)', pips: 5,
    headline: 'You read rooms the same way.',
    body: 'Venus rules you both, so you agree on what is beautiful, what is rude, and who at the table is lying. Neither of you makes a scene. The quiet between you carries more than it looks.',
    tryLine: 'Say the specific compliment. Vanity is honest here.',
  },
  {
    id: 'relationship', label: 'Relationship', eyebrow: 'The long game', color: '#dcaaf2', pill: 'rgba(200, 150, 240, 0.38)', pips: 4,
    headline: 'You stay. She talks. Both count.',
    body: 'Fixed earth, cardinal air: built to hold, made to be seen. You fix by staying; she fixes by talking. Let her talk first, then stay. Her indecision is not disinterest; your silence is not sulking.',
    tryLine: 'Say which one it is, out loud.',
  },
]

export const ALIGN_SCORE = 92
