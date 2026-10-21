/**
 * Juniper × you: the cosmic alignment — copy from S-21 / S-21b / S-21c / S-21d.
 * Written against each founder's chart (Juniper: Libra sun, Gemini moon,
 * Aquarius rising, Venus and Mercury in Virgo / Libra).
 */
import { PERSONA, type PersonaId } from '../../data/persona'

export type ReadingTab = 'pull' | 'push' | 'align' | 'relationship'

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

const HAKEEM: Reading[] = [
  {
    id: 'pull', label: 'Pull', eyebrow: 'What draws you in', color: '#8fd8f6', pill: 'rgba(120, 150, 230, 0.38)', pips: 4,
    headline: 'She answers like you do.',
    body: 'No games, no three-day rule. You both reply when you have something to say and go quiet when you don’t, which reads as confidence from either side. The first five nights will feel easier than they should.',
    tryLine: 'Ask about the last thing she changed her mind on.',
  },
  {
    id: 'push', label: 'Push', eyebrow: 'Where you push back', color: '#f59cc4', pill: 'rgba(232, 98, 160, 0.38)', pips: 2,
    headline: 'You want the last word. She wants silence.',
    body: 'She ends an argument by leaving the room; you end it by trying to win. Neither works on the other. Money is the other one: you save, she spends on beautiful things, and you each think your way is obvious.',
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
    body: 'You show love by staying; she shows it by talking. After a fight, let her talk first, then stay in the room. Her taking time to decide isn’t disinterest, and your quiet isn’t sulking. Say both of those out loud once.',
    tryLine: 'Say which one it is, out loud.',
  },
]

const XAVIER: Reading[] = [
  {
    ...HAKEEM[0],
    headline: 'She notices like you do.',
    body: 'Her Venus is in Virgo, your sun sign, so she shows care the way you do: small favours, details remembered, nothing announced. You will both catch it. The first five nights will feel easier than they should.',
    tryLine: 'Bring up something small she mentioned earlier.',
  },
  {
    ...HAKEEM[1],
    headline: 'You want it decided. She wants it open.',
    body: 'Your Capricorn moon likes a plan and a clear yes. Her Libra sun weighs every option, and her Gemini moon talks it through twice. You read the wait as doubt; she reads your plan as pressure.',
    tryLine: 'Offer two options, not one. Let her pick.',
  },
  {
    ...HAKEEM[2],
    headline: 'You talk the same way.',
    body: 'Your Mercury and hers are both in Libra, so you think out loud the same way: fair, careful, a little polite. Neither of you makes a scene. The quiet between you carries more than it looks.',
    tryLine: 'Say the specific compliment. She will remember the detail.',
  },
  {
    ...HAKEEM[3],
    headline: 'You fix. She talks. Both count.',
    body: 'You show love by doing; she shows it by talking. After a fight, let her talk first, then fix one small thing. Her taking time to decide isn’t disinterest, and your quiet isn’t judgement. Say both of those out loud once.',
  },
]

export const READINGS: Reading[] = { hakeem: HAKEEM, xavier: XAVIER }[PERSONA.id]

/** the line over the reading tabs (S-21 card and the inline chat card) */
export const READING_TITLE: Record<PersonaId, { title: string; line: string }> = {
  hakeem: { title: 'Venus rules you both.', line: 'She balances the room; you keep it.' },
  xavier: { title: 'You both think in Libra.', line: 'She weighs the room; you read it.' },
}
export const MY_READING_TITLE = READING_TITLE[PERSONA.id]
