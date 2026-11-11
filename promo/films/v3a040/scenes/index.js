// v3a040: star_advice, ADVICE ROLLCALL, "Each sign's | glow-up." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm glow-up each (the growth, with one light visual gag). Ending: 'group'.
//   0.0–3.6    "Each sign's | *glow-up.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ the send button, held: DRAFT SAVED · ♉ moved the couch on purpose: NEW LAYOUT · ♊ one thing, finished: 1/1
//              · ♋ let a friend tuck them in: CARED FOR · ♌ bowed to a friend: SPOTLIGHT SHARED · ♍ crooked frame: FINE.
//              · ♎ "no thanks!" with no speech · ♏ seven locks open, a welcome mat · ♐ the suitcase, unpacked: WEEK 3
//              · ♑ the laptop shuts at five · ♒ "I feel… happy?" FIRST TIME · ♓ still crying, happy tears now
//  49.2        "Same stars. | *Brighter.*"  The twelve fly up into a group photo and glow (the ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', TEAL = '#2fc79a'

// a framed slab (phone / laptop / paper), ink outline + drop shadow
function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const COUCH = [
  'PP..........PP',
  'PPPPPPPPPPPPPP',
  'PpppppPPppppPP',
  'PpppppPPppppPP',
  'PPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPP',
  'W............W',
]
const COUCH_C = { P: '#5fd068', p: '#8fe08f', W: WOOD }
const BLANKET = ['LLLLLLLLLL', 'LlLlLlLlLL', 'LLLLLLLLLL', 'LlLlLlLlLL', 'LLLLLLLLLL']
const LOCK = ['.KKK.', 'K...K', 'K...K', 'GGGGG', 'GGKGG', 'GGKGG', 'GGGGG']
const LOCK_C = { K: '#9aa5c4', G: GOLD }
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'BBBBBBBBBBBB',
  'BbbbbbbbbbbB',
  'BbbbbbbbbbbB',
  'BBBBBBBBBBBB',
  'BbbbbbbbbbbB',
  'BbbbbbbbbbbB',
  'BBBBBBBBBBBB',
]
const SUIT_C = { K: INK, B: '#ff9a4a', b: '#ffbf7a' }
const SHIRT = ['SS...SS', 'SSSSSSS', '.SSSSS.', '.SSSSS.', '.SSSSS.']

const CAMEOS = [
  { sign: 'aries', cap: 'Pausing before | *hitting send.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 860, 270, 420, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', inner: '#140c30', rot: 0.04 })) {
        x.fillStyle = BONE; x.fillRect(-110, -150, 220, 120)
        txt(x, 'I HAVE NOTES', 0, -110, 26); txt(x, 'ON YOUR NOTES', 0, -70, 26)
        const on = lt < 1.3
        x.fillStyle = INK; x.fillRect(-84, 80, 168, 76); x.fillStyle = on ? RED : '#6b62a8'; x.fillRect(-78, 86, 156, 64)
        txt(x, on ? 'SEND' : 'WAIT…', 0, 120, 34, '#fff4e2')
        x.restore()
      }
      label(x, 790, 1120, 'DRAFT SAVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Moving the furniture. | *On purpose.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), slide = ease.inOutCubic(prog(lt, 0.5, 1.3))
      drawBits(x, COUCH, COUCH_C, lerp(840, 740, slide), 980, 22 * k, { rot: lerp(0, -0.08, slide) * (1 - prog(lt, 1.3, 1.5)) })
      if (lt > 0.5 && lt < 1.35) { x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(lerp(840, 740, slide) + 190 + i * 6, 930 + i * 34, 50, 8) }
      label(x, 790, 720, 'NEW LAYOUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 760, 960, P.t0 + 1.5, 7, 180, 0.2)
    } },
  { sign: 'gemini', cap: 'One thing at a time. | *Finished.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      if (slab(x, 790, 870, 330, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: -0.03 })) {
        txt(x, 'TO DO', 0, -130, 36)
        const rows = ['learn guitar', 'start a podcast', 'finish book'], done = lt > 1.1
        rows.forEach((r, i) => { x.fillStyle = i === 2 && done ? TEAL : '#b9b0a0'; x.fillRect(-136, -70 + i * 70, 36, 36); txt(x, r, 26, -52 + i * 70, 30, i === 2 ? INK : '#8a8298', INTER, 800) })
        if (done) { x.strokeStyle = '#fff'; x.lineWidth = 7; x.beginPath(); x.moveTo(-130, 88); x.lineTo(-118, 100); x.lineTo(-104, 76); x.stroke() }
        x.restore()
      }
      label(x, 790, 1110, 'BOOK: FINISHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Letting someone | *care for you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170, y: 30 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 900, 200 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.0] })
      const d = ease.outCubic(prog(lt, 0.6, 1.2))
      if (lt > 0.6) drawBits(x, BLANKET, { L: LAV, l: '#e6d6ff' }, lerp(800, F.x, d), lerp(980, F.cy + 120, d), 20, { rot: lerp(0.3, 0, d) })
      label(x, 540, 640, 'TUCKED IN BY A FRIEND', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Letting a friend | *take the bow.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, y: 40, s: 250 },
    back(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 0.5, 1.1))
      x.save(); x.globalAlpha = 0.5; x.fillStyle = '#fff1c4'
      const sx = lerp(340, 800, sw)
      x.beginPath(); x.moveTo(sx - 30, 500); x.lineTo(sx + 30, 500); x.lineTo(sx + 160, 1130); x.lineTo(sx - 160, 1130); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 800, 930, 220 * k, { mood: lt > 1.1 ? 'sparkle' : 'wide', seed: 32, glyph: false, tears: 1, hops: [P.t0 + 1.2] })
      label(x, 540, 1150, 'SPOTLIGHT: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Calling it *good enough.* | And meaning it.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, -1], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 820, 280, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: WOOD, inner: '#8fe3ff', rot: 0.12, pad: 20 })) {
        x.fillStyle = '#5fd068'; x.fillRect(-120, 30, 240, 60); x.fillStyle = GOLD; x.fillRect(40, -60, 50, 50)
        x.restore()
      }
      label(x, 790, 1020, 'SLIGHTLY CROOKED.', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'FINE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Saying *no.* | Without a speech.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 300, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.04 })) {
        txt(x, 'MY SPEECH', 0, -120, 30)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-110, -70 + i * 34, 220 - (i % 3) * 30, 14)
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-130, -150); x.lineTo(130, 150); x.moveTo(130, -150); x.lineTo(-130, 150); x.stroke() }
        x.restore()
      }
      bubble(x, 420, 610, 'no thanks!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Letting people | *in.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = ease.inOutCubic(prog(lt, 1.0, 1.5))
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -230, 280, 450); x.fillStyle = '#fff1c4'; x.fillRect(-130, -220, 260, 440)
        const w = 260 * (1 - open * 0.8)
        x.fillStyle = '#7a3fbf'; x.fillRect(-130, -220, w, 440); x.fillStyle = INK; x.fillRect(-130 + w - 6, -220, 6, 440)
        if (open < 0.5) for (let i = 0; i < 7; i++) drawBits(x, LOCK, LOCK_C, 70, -180 + i * 56, 6.5)
        x.restore()
      }
      label(x, 800, 1140, 'WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 42, bg: MINT, rot: 0, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.6, 7, 200, 0.5)
    } },
  { sign: 'sagittarius', cap: 'Staying long enough | to *unpack.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SUITCASE, SUIT_C, 800, 1010, 20 * k)
      const COLS = [PINK, MINT, SKYB, GOLD]
      for (let i = 0; i < 4; i++) {
        const d = ease.outCubic(prog(lt, 0.5 + i * 0.18, 0.9 + i * 0.18))
        if (d > 0) drawBits(x, SHIRT, { S: COLS[i] }, lerp(800, 670 + i * 82, d), lerp(990, 760, d), 14, { rot: (i - 1.5) * 0.12 })
      }
      label(x, 800, 610, 'STILL HERE: WEEK 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Logging off | *at five.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 680); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 74, 0, Math.PI * 2); x.fill()
        x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -56); x.stroke()
        x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(5 / 12 * Math.PI * 2) * 40, -Math.cos(5 / 12 * Math.PI * 2) * 40); x.stroke()
        x.restore()
      }
      const shut = ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(800, 1000); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, 40, 320, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-154, 44, 308, 22)
        const h = 200 * (1 - shut)
        x.fillStyle = INK; x.fillRect(-150, 40 - h - 6, 300, h + 6); if (h > 20) { x.fillStyle = '#6fc3ff'; x.fillRect(-140, 40 - h + 4, 280, h - 14) }
        x.restore()
      }
      label(x, 800, 1130, 'OFF. FOR REAL.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Sharing *feelings.* | Not just facts.', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'fun fact: | octopi have…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 0.95 ? 1 : 0), { size: 38, tail: 'bl', col: LAV })
      bubble(x, 760, 660, 'I feel… | happy?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 1090, 'FIRST TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      hearts(x, t, 560, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 2 })
    } },
  { sign: 'pisces', cap: 'Still crying. | *Happy* tears now.', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: 2, star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 720, 'SAD TEARS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: '#9aa5c4', rot: -0.05, font: MONO, weight: 700 })
      if (lt > 0.95) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(670, 720); x.lineTo(910, 720); x.stroke() }
      label(x, 790, 850, 'HAPPY TEARS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      sparkles(x, t, 790, 850, P.t0 + 1.1, 7, 170, 0.8)
      hearts(x, t, 790, 1050, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3a040', key: 'C', accent: MINT, ending: 'group',
  title: "Each sign's | *glow-up.*",
  cameos: CAMEOS,
  group: {
    cap: 'Same stars. | *Brighter.*',
    moods: ['sparkle', 'happy', 'sparkle', 'heart', 'sparkle', 'happy', 'sparkle', 'happy', 'sparkle', 'happy', 'heart', 'heart'],
    draw(x, t, lt) {
      // a slow golden glow swelling behind the photo, then sparkles all round
      const g = clamp((lt - 1.2) / 1.2)
      if (g > 0) { x.save(); x.globalAlpha = 0.35 * g; const r = x.createRadialGradient(540, 1180, 30, 540, 1180, 520); r.addColorStop(0, '#fff1c4'); r.addColorStop(1, 'rgba(255,241,196,0)'); x.fillStyle = r; x.fillRect(0, 700, 1080, 900); x.restore() }
      sparkles(x, t, 540, 1180, t - lt + 1.6, 12, 380, 0.4, [GOLD, MINT, BONE])
      sparkles(x, t, 540, 1180, t - lt + 2.6, 10, 300, 1.1, [GOLD, PINK, BONE])
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
