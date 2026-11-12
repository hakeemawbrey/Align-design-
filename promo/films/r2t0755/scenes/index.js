// r2t0755: star_talk, SOLO, "Your Scorpio mom | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · F).
// One sign the whole way: nine mom moments, each the most extreme (and most loving) Scorpio version.
//   "nothing happened"? she knew everything · one look across the room, you sat down · lost your keys, found in four
//   seconds · your friend fibbed once, never forgotten · the family recipe is classified · someone hurt your feelings,
//   mama bear mode · asked for her honest opinion, got all of it · texted "call me." with no context · bad day? soup and
//   a plan
//  37.8  "Intense? | *Fiercely loving.*"   41.2  callback: "That “call me”? | *Just “love you.”*" (card 8's phone)
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'scorpio', ACC = '#c97bff', ST = { x: -170 }

// a pair of big narrowed eyes, the famous look
function theLook(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const s of [-1, 1]) {
    x.fillStyle = INK; x.fillRect(s * 80 - 64, -34, 128, 68)
    x.fillStyle = '#ffffff'; x.fillRect(s * 80 - 56, -14, 112, 34)
    x.fillStyle = ACC; x.fillRect(s * 80 - 18, -14, 36, 34)
    x.fillStyle = INK; x.fillRect(s * 80 - 8, -6, 16, 18)
    x.fillStyle = INK; x.save(); x.translate(s * 80, -40); x.rotate(s * 0.18); x.fillRect(-66, -10, 132, 18); x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You said “nothing happened.” | *She knew everything.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'nothing happened!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      sheet(x, 800, 930, pop01(t, P.t0 + 0.9, 0.35, 2), { w: 300, h: 230, head: 'WHAT HAPPENED', headBg: ACC, headInk: INK, lines: ['all of it.', 'in order.'], size: 34, progress: clamp((lt - 1.1) / 0.5) })
    } },
  { sign: S, cap: 'One look across the room. | *You sat down.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      theLook(x, 770, 800, 1.3 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 1000, 'THE LOOK', pop01(t, P.t0 + 1.0, 0.3, 2.4), ACC, -0.04, 44)
      bubble(x, 800, 1130, 'sitting. sorry.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: '#e8d0ff', tail: 'bc' })
    } },
  { sign: S, cap: 'Lost your keys? | *Found in four seconds.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const d = ease.outBack ? ease.outBack(prog(lt, 0.6, 1.0)) : prog(lt, 0.6, 1.0)
      bits(x, 'KEY', 800, lerp(1040, 830, d), 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.15 })
      L(x, 800, 650, 'TIME: 0:04', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 40)
      L(x, 800, 1080, 'UNDER YOUR NOSE', pop01(t, P.t0 + 1.5, 0.3, 2.4), CREAM, -0.04, 30)
      sparkles(x, t, 800, 830, P.t0 + 1.0, 6, 140, 0.2)
    } },
  { sign: S, cap: 'Your friend fibbed once. | *In 2014. Noted.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 330, head: 'MOM’S NOTES', headBg: ACC, headInk: INK, lines: ['jamie: lovely', 'sam: polite', ['alex: 2014 ✗', '#c0306a'], 'pat: ok'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1110, 'FORGIVEN? MAYBE.', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'The family recipe? | *Still classified.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 860, k, { w: 300, h: 340, head: 'GRANDMA’S SAUCE', headBg: RED, lines: ['tomatoes', '', '', ''], size: 30, align: 'left' })
      if (k > 0.5) { x.save(); x.translate(800, 860); x.rotate(-0.04); x.fillStyle = INK; for (let i = 0; i < 3; i++) x.fillRect(-126, -4 + i * 40, 160 + (i % 2) * 60, 26); x.restore() }
      L(x, 800, 1110, 'CLEARANCE: DENIED', pop01(t, P.t0 + 1.2, 0.3, 2.4), STEEL, 0.04, 30)
    } },
  { sign: S, cap: 'Someone hurt your feelings? | *Mama bear mode.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 860, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      L(x, 800, 650, 'PROTECTIVE: MAX', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, 0.04, 34)
      bubble(x, 800, 1090, 'who. was. it.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: '#e8d0ff', tail: 'bc' })
    } },
  { sign: S, cap: 'Asked her honest opinion? | *Got all of it.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.35))
      for (let i = 0; i < n; i++) bubble(x, 770 + (i % 2) * 60, 640 + i * 120, ['well…', 'the colour? no.', 'the shoes? no.', 'you? perfect ♡'][i], 1, { size: 32, tail: i % 2 ? 'br' : 'bl', col: i === 3 ? MINT : BONE })
    } },
  { sign: S, cap: 'Texted “call me.” | *No context. Ever.*', mood: 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM ♏︎', headCol: ACC, lines: [['call me.', BONE, pop01(t, P.t0 + 0.5, 0.2, 2.4), false]], size: 30 })
      L(x, 810, 1130, 'PANIC LEVEL: HIGH', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, 0.04, 30)
    } },
  { sign: S, cap: 'Bad day? | *Soup and a plan.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 720, 1020, 14 * pop01(t, P.t0 + 0.2, 0.35, 2))
      steam(x, t, 720, 960, { n: 3 })
      sheet(x, 880, 820, pop01(t, P.t0 + 0.7, 0.35, 2), { w: 220, h: 230, head: 'THE PLAN', headBg: MINT, headInk: INK, lines: ['1. eat', '2. nap', '3. win'], size: 28, align: 'left', progress: clamp((lt - 0.9) / 0.8), rot: 0.05 })
      hearts(x, t, 600, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0755', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Scorpio mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Intense? | *Fiercely loving.*', mood: 'sparkle' },
  last: {
    text: 'That “call me”? | *Just “love you.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.6, 0.35, 2)
      signChar(x, t, S, 360, 1030, 280 * k, { mood: 'heart', seed: 9, hops: [t0 + 1.4] })
      phone(x, t, 770, 1010, 1.15 * pop01(t, t0 + 0.8, 0.3, 2), { head: 'MOM ♏︎', headCol: ACC, lines: [['call me.', BONE, 1, false], ['love you ♡', PINK, pop01(t, t0 + 1.4, 0.25, 2.4), false]], size: 28 })
      hearts(x, t, 560, 1250, t0 + 1.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
