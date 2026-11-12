// r2a0194: star_advice, ADVICE ROLL CALL, "How each sign | handles waiting." (~57 s vertical, signs3kit, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific, relatable line each about waiting, with a light visual gag.
//   0.0–3.6    "How each sign | *handles a long wait.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries paces (lap 40: one slow breath) · Taurus brought snacks (genius) · Gemini made three friends in line
//              · Cancer worries (it'll be okay: the cloud clears) · Leo hates waiting (still the star: the spotlight comes
//              back) · Virgo tidied the waiting room (now sit) · Libra let everyone go first (your turn counts too)
//              · Scorpio glares at the clock (it is moving) · Sagittarius planned a trip mid-queue (stay for this one)
//              · Capricorn timed it to the second (let it be fuzzy) · Aquarius redesigned the queue (lovely, now rest)
//              · Pisces cried at the hold music (feelings allowed)
//  49.2        "Worth the wait? | *You* are."  Group photo.
//  52.6        CALLBACK: "Taurus’s snacks? | Shared *just one.*"  Taurus's cookie bag comes back; one cookie travels over.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', TEAL = '#2fc79a', SAGE = '#9fe0c0'

// ── props
const BAG = ['.KKKKKKK.', 'KPPPPPPPK', 'KPPPPPPPK', 'KPPCCPPPK', 'KPCCCCPPK', 'KPPCCPPPK', 'KPPPPPPPK', 'KKKKKKKKK']
const BAG_C = { K: BROWN, P: '#e2b07a', C: '#8a5a3a' }
const COOKIE = ['.CCCC.', 'CCcCCC', 'CCCCcC', 'CcCCCC', 'CCCcCC', '.CCCC.']
const COOKIE_C = { C: '#e2a45a', c: '#5b3a1a' }
const CLOUD = ['....GGGG......', '..GGGGGGGG.GG.', '.GGGGGGGGGGGGG', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.']
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const CHAIR = ['WW....', 'WW....', 'WW....', 'WWWWWW', 'W....W', 'W....W']
const PLANE = ['....W.....', '....WW....', 'WWWWWWWWWW', '....WW....', '....W.....']
const FOOT = ['.KK.', 'KKKK', 'KKKK', '.KK.', '....', '.KK.']

// a wall clock, hands moving slowly
function clock(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 112 - 5, Math.sin(a) * 112 - 5, 10, 10) }
  const m = -Math.PI / 2 + lt * 0.35, h = -Math.PI / 2 + 2.2
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(h) * 60, Math.sin(h) * 60); x.stroke()
  x.lineWidth = 8; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(m) * 100, Math.sin(m) * 100); x.stroke()
  x.restore()
}
// a ticket-number display
function display(x, cx, cy, k, text, { size = 52, col = MINT } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(text).width + 60
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -size * 0.9 - 8, w + 16, size * 1.8 + 16); x.fillStyle = '#140c30'; x.fillRect(-w / 2, -size * 0.9, w, size * 1.8)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
// a phone with hold music
function holdPhone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388); x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = LAV; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ON HOLD', 0, -110)
  x.fillStyle = BONE; x.font = `800 48px ${INTER}`; x.fillText('47:12', 0, -30)
  x.restore()
  notes(x, t, cx, cy + 40, { n: 4, cell: 7, col: LAV, seed: 3 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Pacing the room? | Try *one slow breath.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -180 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 8; i++) { const a = pop01(t, P.t0 + 0.2 + i * 0.12, 0.2, 2); drawBits(x, FOOT, { K: 'rgba(239,230,214,0.6)' }, 650 + (i % 4) * 80, 1090 - Math.floor(i / 4) * 70 + (i % 2) * 20, 8 * a) }
      label(x, 790, 760, 'LAP 40', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 600, 'in… and out.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Brought snacks. | Honestly? *Genius.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'QUEUE: SURVIVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Made three friends in line. | *Keep them.*', mood: lt => lt > 0.8 ? 'happy' : 'wink', look: [1, 0], star: { x: -220, s: 250 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const ids = ['libra', 'sagittarius', 'aquarius']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2); if (k > 0.01) signChar(x, t, id, 560 + i * 140, 940 - (i % 2) * 40, 150 * k, { mood: 'happy', look: [-1, 0], seed: 70 + i, glyph: false }) })
      bubble(x, 700, 640, 'same time next week?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Worried the whole wait? | It’ll *be okay.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const clr = ease.inOutCubic(clamp((lt - 1.0) / 0.6))
      drawBits(x, SUN, { Y: GOLD }, 800, 760, 22 * pop01(t, P.t0 + 1.1, 0.35, 2))
      drawBits(x, CLOUD, { G: '#7a7f99' }, lerp(790, 1080, clr), 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - clr })
      label(x, 790, 1060, 'FORECAST: FINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Hate being kept waiting? | Still *the star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'eyeroll', star: { x: -10 }, hops: [1.4],
    back(x, t, lt, P, F) {
      const on = lt > 1.2 ? ease.outCubic(clamp((lt - 1.2) / 0.3)) : 0.25
      x.save(); x.globalAlpha = 0.35 * on; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(500, 480); x.lineTo(580, 480); x.lineTo(760, 1180); x.lineTo(320, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      display(x, 800, 620, pop01(t, P.t0 + 0.2, 0.3, 2), 'NOW: LEO', { size: 34, col: GOLD })
      sparkles(x, t, 530, 860, P.t0 + 1.25, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Tidied the waiting room. | Now *sit down.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const COLS = [SAGE, SKYB, PINK, GOLD]
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.25, 2.2); drawBits(x, CHAIR, { W: COLS[i] }, 590 + i * 105, 980, 14 * k) }
      label(x, 750, 760, 'CHAIRS: ALIGNED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Let everyone go first? | Your turn *counts too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = lt > 1.3 ? 'YOU’RE UP' : `NO. ${40 + Math.floor(clamp(lt / 1.3) * 18)}`
      display(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), n, { size: 44, col: lt > 1.3 ? MINT : PINK })
      bubble(x, 760, 1060, 'after you! no, you!', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt > 1.3 ? 0 : 1), { size: 32, tail: 'bc' })
      sparkles(x, t, 790, 820, P.t0 + 1.35, 7, 170, 0.5)
    } },
  { sign: 'scorpio', cap: 'Glaring at the clock? | It *is* moving.', mood: 'squint', look: [1, -1], star: { x: -190, y: 30 }, hops: [],
    front(x, t, lt, P) {
      clock(x, t, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1040, 'PROMISE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Planned a trip mid-queue? | *Stay* for this one.', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, -1], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), f = clamp((lt - 0.3) / 1.0)
      drawBits(x, PLANE, { W: BONE }, lerp(620, 960, f), lerp(860, 640, f), 16 * k, { rot: -0.5 })
      label(x, 790, 1060, 'GATE: LATER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#b36cff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Timed it to the second? | Let it *be fuzzy.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const s = 7 + Math.floor((t - P.t0) * 10) % 60
      display(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.4 ? '~ a while ~' : `14:32:${String(s).padStart(2, '0')}`, { size: 40, col: lt > 1.4 ? LAV : TEAL })
      sparkles(x, t, 790, 840, P.t0 + 1.45, 6, 160, 0.3)
    } },
  { sign: 'aquarius', cap: 'Redesigned the whole queue? | *Lovely.* Now rest.', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#1d3a6a'; x.fillRect(-142, -142, 284, 284)
        x.strokeStyle = SKYB; x.lineWidth = 6; x.beginPath(); x.moveTo(-110, 110); x.bezierCurveTo(-110, -90, 110, 90, 110, -110); x.stroke()
        for (let i = 0; i < 5; i++) { const p = i / 4; x.fillStyle = BONE; x.fillRect(-110 + p * 220 - 8, 110 - p * 220 - 8, 16, 16) }
        x.restore()
      }
      label(x, 790, 1060, 'QUEUE 2.0', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the hold music? | Feelings *are allowed.*', mood: 'sparkle', tears: 3, look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      holdPhone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'IT WAS A GOOD SONG', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0194', key: 'E', accent: SAGE, ending: 'callback',
  title: 'How each sign | *handles waiting.*',
  cameos: CAMEOS,
  group: { cap: 'Worth the wait? | *You* are.' },
  last: {
    text: 'Taurus’s snacks? | Shared *just one.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, 'taurus', 290, 1060, 290, { mood: 'happy', look: [1, 0], pop: pop01(t, t0 + 0.4, 0.4, 2), seed: 80, glyph: false })
      signChar(x, t, 'aries', 790, 1060, 290, { mood: lt > 1.7 ? 'heart' : 'wide', look: [-1, 0], pop: pop01(t, t0 + 0.6, 0.4, 2), seed: 81, glyph: false, hops: [t0 + 1.8] })
      drawBits(x, BAG, BAG_C, 290, 1300, 20 * pop01(t, t0 + 0.5, 0.3, 2))
      const f = ease.inOutCubic(clamp((lt - 1.0) / 0.7))
      if (lt > 0.9) drawBits(x, COOKIE, COOKIE_C, lerp(360, 700, f), lerp(1210, 1180, f) - Math.sin(Math.PI * f) * 160, 18)
      hearts(x, t, 540, 1000, t0 + 1.8, { n: 5, life: 1.5, spread: 300, cell: 8, seed: 12 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
