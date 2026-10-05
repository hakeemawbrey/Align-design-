import confetti from 'canvas-confetti'
import type { Element } from '../../data/signs'
import type { Profile } from '../../data/profiles'

/** Layout constants shared by Dealing + Deck so the hand-off is seamless. */
export const CARD_W = 330
export const CARD_H = 527
export const CARD_SCALE = 0.95
/** top-left of the (scaled) card on the 390×844 canvas */
export const CARD_TOP = 160
export const CARD_CX = 195
export const CARD_CY = CARD_TOP + (CARD_H * CARD_SCALE) / 2

/** top-of-screen sky tint per element (S-05x variants) */
export const ELEMENT_SKY: Record<Element, string> = {
  fire: '#8a3a17',
  earth: '#3f5e1f',
  air: '#3e2384',
  water: '#16397a',
}

export const PRONOUN: Record<string, { cap: string; poss: string; Poss: string; subj: string }> = {
  m24: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  r29: { cap: 'HIS', poss: 'his', Poss: 'His', subj: 'he' },
  j27: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  a31: { cap: 'THEIR', poss: 'their', Poss: 'Their', subj: 'they' },
  s26: { cap: 'THEIR', poss: 'their', Poss: 'Their', subj: 'they' },
  k28: { cap: 'HIS', poss: 'his', Poss: 'His', subj: 'he' },
  l26: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  a29: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  t30: { cap: 'HIS', poss: 'his', Poss: 'His', subj: 'he' },
  n27: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  j28: { cap: 'HIS', poss: 'his', Poss: 'His', subj: 'he' },
  b25: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  i24: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
  d31: { cap: 'HIS', poss: 'his', Poss: 'His', subj: 'he' },
  r29b: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
}

export const pronoun = (p: Profile) => PRONOUN[p.id] ?? { cap: 'THEIR', poss: 'their', Poss: 'Their', subj: 'they' }

/** Long-form reading for the expanded card (S-06). */
export const EXTENDED: Record<string, { easy: string; rubs: string; now: string }> = {
  j27: {
    easy: 'Venus rules you both. You want the same evening, and neither of you needs it to be loud.',
    rubs: 'She weighs; you wait. A decision can sit on the table for a week with both of you being polite about it.',
    now: 'The moon is in her sign until Thursday — a good week to be direct.',
  },
  m24: {
    easy: 'Two earth signs. You both like plans that actually happen and dinners that run long.',
    rubs: 'She edits; you settle. Let her fix the itinerary and she’ll let you pick the restaurant.',
    now: 'Mercury is quiet in her chart this week — say the thing out loud, she’s listening.',
  },
  r29: {
    easy: 'His Sun lands on your Moon. He makes you laugh before you’ve decided to.',
    rubs: 'Two fixed signs. Nobody blinks first, and the argument is usually about who blinked.',
    now: 'Mars is lighting up his fifth house — expect a spontaneous plan, say yes to one.',
  },
  a31: {
    easy: 'They bring the weird idea, you bring the follow-through. It works better than it should.',
    rubs: 'You want to know Friday’s plan on Tuesday. They want Friday to surprise them.',
    now: 'Uranus is restless in their chart — the first message should be a question, not a hello.',
  },
  s26: {
    easy: 'Water softens earth. Silences with them feel like company, not distance.',
    rubs: 'They feel it all on Monday; you process it by Sunday. Meet in the middle — Thursday.',
    now: 'Neptune is soft on their Moon this week. Gentle openers land best.',
  },
  k28: {
    easy: 'Saturn on your Sun. You both mean what you say and show up when you said you would.',
    rubs: 'Two calendars, zero chaos. Someone has to suggest the unplanned thing.',
    now: 'The moon crosses his tenth house — he’s busy, but he’ll make time for something real.',
  },
}

let fire: confetti.CreateTypes | null = null
let fireCanvas: HTMLCanvasElement | null = null

/** Gold star particles, confined to the phone canvas. */
export function starBurst(canvas: HTMLCanvasElement | null, x: number, y: number, power = 1) {
  if (!canvas) return
  if (!fire || fireCanvas !== canvas) {
    fire = confetti.create(canvas, { resize: true, useWorker: false })
    fireCanvas = canvas
  }
  const origin = { x: x / 390, y: y / 844 }
  const gold = ['#f2c75c', '#fff4cf', '#f2d784', '#ffe7a3', '#ffffff']
  fire({
    particleCount: Math.round(40 * power), spread: 80, startVelocity: 34 * power, origin,
    colors: gold, shapes: ['star'], scalar: 1.1, ticks: 110, gravity: 0.7, decay: 0.92,
  })
  fire({
    particleCount: Math.round(28 * power), spread: 360, startVelocity: 18 * power, origin,
    colors: gold, shapes: ['circle'], scalar: 0.55, ticks: 90, gravity: 0.4, decay: 0.9,
  })
}

export function resetBurst() {
  fire?.reset()
  fire = null
  fireCanvas = null
}
