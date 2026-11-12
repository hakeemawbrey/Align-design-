// r2a0242: star_advice, ADVICE SOLO, "Signs a Pisces | misses you." (~52 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable sign that a Pisces misses you + a warm
// reframe, one gag each; Pisces cries in every card. Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Signs a Pisces | *misses you.*"  One big Pisces pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              sent you a song (that's a hug) · kept every voicemail · kept the café receipt · a sunset made them cry
//              · still has your (Cancer) hoodie · dreamt about you, part 7 · liked an old photo · "no big deal" (big deal)
//              · "thinking of you" (they mean it)
//  37.8        "Big heart. | *Bigger feelings.*"  Pisces comes back, big.
//  41.0        LESSON UNLOCKED: "Being missed | is *being loved.*"  STATUS: MISSED YOU
//  46.9        "Text them back. | They’ll cry *(happy).*" over the match card: Pisces + Cancer (the hoodie's owner).
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, pill, CREAM, RED, ORANGE, SUN, GREY, clamp, prog, lerp, ease } from './props.js'

const S = 'pisces', ACC = '#b7a6ff', CANCERC = '#8fe3ff'
const T_ = lt => lt > 1.2 ? 2 : 1                       // Pisces always cries; harder once it lands

const HOODIE = [
  '...HHHHH...',
  '..HHhhhHH..',
  '.HHHhhhHHH.',
  'HHHHHHHHHHH',
  'HHHHHHHHHHH',
  'HH.HHHHH.HH',
  'HH.HHHHH.HH',
  'HH.HPPPH.HH',
  '...HPPPH...',
  '...HHHHH...',
]
const HOODIE_C = { H: CANCERC, h: '#2a6f8a', P: '#c8f0ff' }

// a sunset: half sun over the sea with stripes
function sunset(x, cx, cy, k, t) {
  card(x, cx, cy, 300, 240, k, { bg: '#ff9a6a', rot: 0.03 }, () => {
    x.fillStyle = '#ffc06a'; x.fillRect(-150, -120, 300, 60)
    x.fillStyle = SUN; x.beginPath(); x.arc(0, 20, 70, Math.PI, 0); x.fill()
    x.fillStyle = '#5a6fd8'; x.fillRect(-150, 20, 300, 100)
    x.fillStyle = '#fff2b0'; for (let i = 0; i < 4; i++) x.fillRect(-50 + (i % 2) * 20 + Math.sin(t * 2 + i) * 8, 36 + i * 20, 100 - i * 20, 6)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Sent you a song? | *That’s a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: T_, star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'NEW MESSAGE', headCol: ACC }, () => {
        pill(x, '♪ made me think of u', 0, -60, 1, { col: ACC, size: 18 })
        x.fillStyle = MINT; for (let i = 0; i < 14; i++) { const hh = 10 + 30 * Math.abs(Math.sin(i * 1.3 + t * 5)); x.fillRect(-84 + i * 12, 40 - hh / 2, 8, hh) }
      })
      notes(x, t, 790, 660, { n: 4, cell: 7, col: ACC, seed: 1 })
    } },
  { sign: S, cap: 'Kept every voicemail? | *You’re their comfort.*', mood: 'heart', tears: T_, star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'SAVED', headCol: MINT }, () => {
        const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.25))
        for (let i = 0; i < n; i++) pill(x, `▶ you  0:${12 + i * 7}`, 0, -90 + i * 52, 1, { col: i % 2 ? BONE : SKYB, size: 22, w: 190 })
      })
      label(x, 790, 1100, 'DELETE? NEVER.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK })
    } },
  { sign: S, cap: 'Kept the café receipt? | *It means something.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: T_, star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 830, 240, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => {
        txt(x, 'CAFÉ', 0, -130, { size: 30, font: MONO, weight: 700 })
        const L = ['2 tea', '1 cake', '1 laugh', 'TOTAL: ♥']
        L.forEach((s, i) => txt(x, s, 0, -60 + i * 46, { size: 26, font: MONO, weight: 700, color: i === 3 ? RED : INK }))
        x.fillStyle = '#d9d2c2'; for (let i = 0; i < 8; i++) x.fillRect(-120 + i * 30, 160, 18, 10)
      })
      label(x, 790, 1060, 'SINCE LAST MAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A sunset made them cry? | *Send one back.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sunset(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1060, 'you’d love this', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Still has your hoodie? | *It’s safekeeping.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', tears: T_, star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 830, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 })
      label(x, 790, 1060, '♋︎ YOURS. KIND OF.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: CANCERC })
    } },
  { sign: S, cap: 'Dreamt about you? | *Ask how it ended.*', mood: 'sleepy', tears: T_, star: { x: -190, y: 30 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE
      for (const [px, py, r] of [[500, 720, 12], [560, 660, 20]]) { x.beginPath(); x.arc(px, py, r, 0, 7); x.fill() }
      x.restore()
      bubble(x, 790, 640, 'it was a whole movie', k, { size: 34, col: ACC, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.3) * 6)
      label(x, 800, 860, `PART ${n}`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 48, bg: LAV, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: S, cap: 'Liked an old photo? | *Say hi back.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', tears: T_, star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 820, 280, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.04 }, () => {
        x.fillStyle = '#5a6fd8'; x.fillRect(-120, -150, 240, 220)
        x.fillStyle = SUN; x.beginPath(); x.arc(60, -90, 30, 0, 7); x.fill()
        x.fillStyle = '#2fa36b'; x.fillRect(-120, 20, 240, 50)
        txt(x, '3 YEARS AGO', 0, 110, { size: 24, color: BONE, font: MONO, weight: 700 })
      })
      const hk = pop01(t, P.t0 + 1.1, 0.3, 2.4)
      if (hk > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 790, 760, 16 * hk)
      label(x, 790, 1060, 'OOPS. (ON PURPOSE)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: PINK })
    } },
  { sign: S, cap: 'Said “no big deal”? | *Call them anyway.*', mood: 'squint', tears: lt => lt > 1.2 ? 3 : 1, star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'no big deal :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, 'BIG DEAL', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 64, bg: RED, color: CREAM, rot: -0.06 })
    } },
  { sign: S, cap: '“Thinking of you.” | They *mean it.*', mood: 'heart', tears: T_, star: { x: -190 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '11:11 PM', headCol: ACC }, () => {
        pill(x, 'thinking of you', 0, -40, pop01(t, P.t0 + 0.6, 0.3, 2), { col: BONE, size: 24 })
        pill(x, 'for real', 0, 30, pop01(t, P.t0 + 1.2, 0.3, 2), { col: ACC, size: 24 })
      })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0242', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Signs a Pisces | *misses you.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Big heart. | *Bigger feelings.*', mood: 'heart' },
  lesson: { text: 'Being missed | is *being loved.*', chip: 'STATUS: MISSED YOU' },
  last: { text: 'Text them back. | They’ll cry *(happy).*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
