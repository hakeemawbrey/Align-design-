// v3t067: THE SIGNS AS… v3, "Plans cancelled? | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order when plans get cancelled, each pushed to the extreme; lesson ending.
//   0.0–3.6    "Plans cancelled? | Zodiacs *be like.*"
//   3.6–49.2   ♈ new plans in a minute · ♉ food ordered before the text ended · ♊ plan B, plan C · ♋ relieved, sad,
//              baked a cake · ♌ photoshoot anyway · ♍ calendar updated in red · ♎ "nooo :(", secretly thrilled
//              · ♏ cancelled first · ♐ went anyway, alone · ♑ back to work · ♒ forgot they had plans · ♓ cried from relief
//  49.2        "Cancelled plans: | the *best plans.*"
//  52.4        LESSON UNLOCKED: "Rest is a plan too. | *Enjoy it.*"  STATUS: COZY
//  58.3        "Same time next week? | *Let’s cancel again.*"
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, readout, confetti, bits, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT, GREEN } from './props.js'

const ACC = LAV

const CAMEOS = [
  { sign: 'aries', cap: 'Plans cancelled? | *New plans* in a minute.', mood: lt => lt > 0.9 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 460, head: 'TONIGHT',
        msgs: [{ t: 'so sorry, | can’t make it' }, { t: 'NEW PLAN:', me: true, c: '#f0603a' }, { t: 'go-karts. | 7 PM. go.', me: true, c: '#f0603a' }], n: lt > 1.4 ? 3 : lt > 0.9 ? 2 : 1, size: 26 })
      label(x, 800, 1130, 'TIME TAKEN: 0:58', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Food ordered | *before the text ended.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'hey, so | tonight…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      paper(x, 790, 900, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 290, h: 260, rot: 0.04, head: 'ORDER PLACED', headBg: GREEN, headColor: INK, lines: ['noodles', 'dumplings', 'dessert x2'], size: 28 })
      label(x, 790, 1120, 'ETA: 20 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Had a backup plan. | And *a backup backup.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 3)
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, rot: -0.04, head: 'TONIGHT', headBg: '#f2cf4a', align: 'left',
        lines: [{ t: 'PLAN A  ✗', c: RED }, { t: 'PLAN B  ✗', c: RED }, { t: 'PLAN C  ✓', c: '#2f9a5a' }], size: 34, n })
      label(x, 790, 1110, 'PLAN D: READY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Relieved. Then sad. | Then *baked a cake.*', mood: lt => lt < 0.7 ? 'sparkle' : lt < 1.3 ? 'neutral' : 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const word = lt < 0.7 ? 'yay!' : lt < 1.3 ? 'oh no…' : 'cake time.'
      bubble(x, 790, 650, word, pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      bits(x, 'CAKE', 790, 920, 26 * pop01(t, P.t0 + 1.3, 0.3, 2))
      if (lt > 1.3) sparkles(x, t, 790, 900, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: 'leo', cap: 'Outfit was ready. | *Photoshoot* anyway.', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      for (const f of [0.6, 1.1, 1.6, 2.0]) { const d = lt - f; if (d > 0 && d < 0.15) { x.save(); x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - d / 0.15)).toFixed(3)})`; x.fillRect(110, 480, 860, 740); x.restore() } }
    },
    front(x, t, lt, P) {
      const n = Math.min(99, Math.floor(Math.max(0, lt - 0.4) * 30))
      readout(x, 800, 760, pop01(t, P.t0 + 0.3, 0.3, 2), `PHOTOS: ${n}`, { size: 44, color: '#f39a3a' })
      label(x, 800, 960, 'LOOK: SERVED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: '#f39a3a', rot: 0.05 })
      bubble(x, 800, 1120, 'for no one.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Updated the calendar. | *In red.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 790, 860, k, { w: 320, h: 340, rot: 0.03, head: 'FRIDAY', headBg: '#ef5c94', align: 'left', lines: ['7 PM · DINNER', '9 PM · MOVIE'], size: 28 })
      const s = clamp((lt - 0.7) / 0.5)
      if (s > 0 && k > 0.9) { x.save(); x.translate(790, 860); x.rotate(0.03); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(-110, -60); x.lineTo(-110 + 220 * s, -60 + 160 * s); x.stroke(); if (s >= 1) { x.beginPath(); x.moveTo(110, -60); x.lineTo(-110, 100); x.stroke() } x.restore() }
      label(x, 790, 1110, 'NOW: FREE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Texted “nooo :(” | Secretly *thrilled.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'nooo :( | so sad', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 940, 'SECRETLY: THRILLED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: '#e163d6', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Cancelled first. | *Pre-emptively.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 420, head: 'FRIDAY',
        msgs: [{ t: 'can’t make it.', me: true, c: '#e23d66' }, { t: 'oh! me neither' }], n: lt > 1.1 ? 2 : lt > 0.5 ? 1 : 0, size: 28 })
      label(x, 800, 1110, 'FIRST BY 1 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Went anyway. | *Alone.* Had a blast.', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      confetti(x, t, 760, 860, P.t0 + 0.4, { n: 18, spread: 220, h: 560 })
      label(x, 790, 720, 'PARTY OF 1', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: '#a35cf0', color: CREAM, rot: 0.05 })
      bubble(x, 790, 1000, 'best night | ever!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Free evening? | *Back to work.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -130, 340, 230); x.fillStyle = '#3a3466'; x.fillRect(-158, -118, 316, 206)
        x.fillStyle = INK; x.fillRect(-200, 100, 400, 26); x.fillStyle = GREY; x.fillRect(-192, 104, 384, 16)
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 5)
        x.fillStyle = '#2fc79a'; for (let i = 0; i < n; i++) x.fillRect(-130, -96 + i * 38, 160 + (i % 3) * 40, 16)
        x.restore()
      }
      label(x, 790, 650, 'TO-DO: 14', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'productive!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Didn’t notice. | *Forgot they had plans.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'sorry, | cancelling!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      bubble(x, 790, 920, 'we had | PLANS?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1120, 'ALSO: STILL IN PJs', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Plans cancelled. | *Cried.* From relief.', mood: lt => lt < 0.8 ? 'neutral' : 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 700, 'CANCELLED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: RED, color: CREAM, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'thank | goodness', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 800, 1110, 'HAPPY TEARS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t067', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Plans cancelled? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Cancelled plans: | the *best plans.*' },
  lesson: { text: 'Rest is a plan too. | *Enjoy it.*', chip: 'STATUS: COZY' },
  last: {
    text: 'Same time next week? | *Let’s cancel again.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
