/**
 * Juniper × you: the cosmic alignment — copy from S-21 / S-21b / S-21c / S-21d.
 * Written against each founder's chart (Juniper: Libra sun, Gemini moon,
 * Aquarius rising, Venus in Virgo, Mercury in Libra).
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
    headline: 'You feel the same way.',
    body: 'You both have a Gemini moon, so you feel by talking: out loud, the same night, with follow-up questions. Neither of you has to drag it out of the other. The first five nights will feel easier than they should.',
    tryLine: 'Ask the question you’d usually save for date three.',
  },
  {
    ...HAKEEM[1],
    headline: 'You want a plan. She wants options.',
    body: 'Your Capricorn sun likes a decision and a date in the calendar. Her Libra sun weighs every option twice. You read the wait as doubt; she reads your plan as pressure.',
    tryLine: 'Offer two options, not one. Let her pick.',
  },
  {
    ...HAKEEM[2],
    headline: 'You make the same first impression.',
    body: 'Your Libra rising meets her Libra sun: you both lead with charm and hate a scene. You agree on what is beautiful and what is rude. The quiet between you carries more than it looks.',
  },
  {
    ...HAKEEM[3],
    headline: 'You build. She talks. Both count.',
    body: 'You show love by building something; she shows it by talking it through. After a fight, let her talk first, then make one plan together. Her taking time to decide isn’t disinterest, and your quiet isn’t coldness. Say both of those out loud once.',
  },
]

const JEREMY: Reading[] = [
  {
    ...HAKEEM[0],
    headline: 'You talk the way she feels.',
    body: 'Your Mercury is in Gemini, her moon sign, so the way you talk is the way she feels: quick, curious, lots of questions. She will feel heard early. The first five nights will feel easier than they should.',
  },
  {
    ...HAKEEM[1],
    headline: 'You feel it now. She thinks it over.',
    body: 'Your Cancer sun feels first and wants to hear it back. Her Libra sun weighs it, and her Aquarius rising keeps a little distance. You read the pause as cold; she reads the need as pressure.',
    tryLine: 'Ask how she’s feeling, then give her a day to answer.',
  },
  {
    ...HAKEEM[2],
    headline: 'You both like it done right.',
    body: 'Your Venus is in Leo: you love out loud, with effort and a bit of show. She is a Libra sun and loves a date done properly. You will plan the nights she tells her friends about.',
    tryLine: 'Plan one date with a detail she’ll notice.',
  },
  {
    ...HAKEEM[3],
    headline: 'You host. She talks. Both count.',
    body: 'You show love by taking care of people; she shows it by talking. After a fight, let her talk first, then cook. Her taking time to decide isn’t disinterest, and your feelings aren’t too much. Say both of those out loud once.',
  },
]

export const READINGS: Reading[] = { hakeem: HAKEEM, xavier: XAVIER, jeremy: JEREMY }[PERSONA.id]

/** the line over the reading tabs (S-21 card and the inline chat card) */
export const READING_TITLE: Record<PersonaId, { title: string; line: string }> = {
  hakeem: { title: 'Venus rules you both.', line: 'She balances the room; you keep it.' },
  xavier: { title: 'Two Gemini moons.', line: 'She weighs it; you build it.' },
  jeremy: { title: 'Big heart, fair mind.', line: 'She balances the room; you feed it.' },
}
export const MY_READING_TITLE = READING_TITLE[PERSONA.id]
