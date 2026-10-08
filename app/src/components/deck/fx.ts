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
  e30: { cap: 'HIS', poss: 'his', Poss: 'His', subj: 'he' },
  m27: { cap: 'HER', poss: 'her', Poss: 'Her', subj: 'she' },
}

export const pronoun = (p: Profile) => PRONOUN[p.id] ?? { cap: 'THEIR', poss: 'their', Poss: 'Their', subj: 'they' }

/**
 * Long-form reading for the expanded card (S-06), in practical terms: why
 * you'd click, where you'll clash and what to do about it, and an opener.
 */
export const EXTENDED: Record<string, { easy: string; rubs: string; now: string }> = {
  j27: {
    easy: 'You like the same kind of night: good food, real conversation, nothing loud. Talking will feel easy from the first message.',
    rubs: 'She takes her time deciding; you like to settle things. Offer two clear options and a deadline, and it stops being a standoff.',
    now: 'Ask what she’s been listening to on repeat. Her card says playlist archivist — she’ll have an answer.',
  },
  m24: {
    easy: 'You both like plans that actually happen. Dinner that runs long is a good date to her.',
    rubs: 'She likes to fix the details; you like to go with it. Let her plan the itinerary, you pick the restaurant.',
    now: 'Ask about the strangest night shift she’s had. ER nurses always have one.',
  },
  r29: {
    easy: 'He makes you laugh before you’ve decided to. Time with him feels like an occasion.',
    rubs: 'You’re both stubborn. Agree early that whoever cools down first says sorry first.',
    now: 'Ask what he’d cook you on a first date. He’s a chef — let him show off.',
  },
  a31: {
    easy: 'They bring the unusual idea, you bring the follow-through. It works better than it should.',
    rubs: 'You want Friday’s plan on Tuesday; they want Friday to surprise them. Alternate weekends.',
    now: 'Ask what they’re building right now. Lead with a question, not a hello.',
  },
  s26: {
    easy: 'Quiet with them feels like company, not distance. Low pressure, very warm.',
    rubs: 'They feel things fast; you need a few days. Say “I need a minute” instead of going silent.',
    now: 'Ask to see the last thing they made. Ceramicists love that question.',
  },
  k28: {
    easy: 'You both mean what you say and show up when you said you would. No guessing games.',
    rubs: 'Two busy calendars. Put dates in the calendar like meetings, or they won’t happen.',
    now: 'Ask about the building they’d most like to have designed. Then ask what he’d change about yours.',
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
