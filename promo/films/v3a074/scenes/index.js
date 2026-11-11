// v3a074: star_advice, ADVICE SOLO, "Capricorn, stop doing | this in love." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Capricorn love habit, a warm reframe, one gag each.
//   0.0–3.6    "Capricorn, stop doing | *this in love.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the FEELINGS SYNC calendar invite ("or… just talk?") · the laptop closes: out of office · the INDEPENDENT
//              sticker gets an AND LOVED sticker · the date's "application": hired · the five-year plan vs. one hug
//              · three coffee mugs: "rest. I've got you." · "say it: someday" → today · a party hat: silly mode
//              · the gold "earned it" sticker: no work needed
//  37.8        group ending: "Built to last. | *Allowed to rest.*"  Capricorn comes back, hearts in its eyes.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e'
const S = 'capricorn'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) { if (l.k !== undefined && l.k <= 0.01) continue; x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y) }
  x.restore()
}
// a rubber stamp that thumps down at k
function stamp(x, cx, cy, text, k, col = '#2f9e5a', rot = -0.2) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(1 + 0.6 * (1 - k), 1 + 0.6 * (1 - k)); x.globalAlpha *= clamp(k * 1.5)
  x.font = `800 44px ${INTER}`; const w = x.measureText(text).width + 40
  x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(-w / 2, -36, w, 72)
  x.strokeStyle = col; x.lineWidth = 7; x.strokeRect(-w / 2, -36, w, 72)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

// ── props
const MUG = [
  '.WWWWWW...',
  'WBBBBBBW..',
  'WBBBBBBWWW',
  'WBBBBBBW.W',
  'WBBBBBBWWW',
  'WBBBBBBW..',
  '.WWWWWW...',
]
const HAT = [
  '....Y....',
  '...PPP...',
  '...PYP...',
  '..PPPPP..',
  '..YPPPY..',
  '.PPPPPPP.',
  '.PPYPPYP.',
  'PPPPPPPPP',
]
const HAT_C = { P: PINK, Y: GOLD }
const BADGE = [
  '....GG....',
  '...GGGG...',
  'GGGGGGGGGG',
  '.GGGWWGGG.',
  '..GGGGGG..',
  '..GGGGGG..',
  '.GGG..GGG.',
  '.GG....GG.',
]
const BADGE_C = { G: GOLD, W: '#fff' }

function laptop(x, cx, cy, k, close) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 60, 340, 34); x.fillStyle = '#c9d1e0'; x.fillRect(-162, 64, 324, 24)
  const h = 230 * Math.cos(close * Math.PI / 2)
  if (h > 4) {
    x.fillStyle = INK; x.fillRect(-150, 64 - h, 300, h)
    x.fillStyle = '#2a2350'; x.fillRect(-142, 72 - h, 284, h - 16)
    if (h > 120) {
      x.fillStyle = MINT; for (let i = 0; i < 5; i++) x.fillRect(-120, 92 - h + i * 34, 120 + ((i * 53) % 110), 14)
    }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Feelings aren’t | *a meeting.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 790, 320, 210, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, head: 'INVITE', headBg: SKYB,
        lines: [{ text: 'Feelings sync', y: -5, size: 36 }, { text: '30 min · agenda', y: 50, size: 28, color: '#6b62a8' }] })
      bubble(x, 790, 1060, 'or… just talk?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Close the laptop. | *They’re here.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      laptop(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 1.2)))
      label(x, 790, 1090, 'OUT OF OFFICE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 400, 760, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Needing someone | *isn’t weakness.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 790, 'INDEPENDENT', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: BONE, rot: -0.06 })
      label(x, 800, 900, '+ LOVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 50, bg: PINK, rot: 0.05 })
      sparkles(x, t, 800, 900, P.t0 + 1.25, 8, 160, 0.2, [PINK, BONE, GOLD])
    } },
  { sign: S, cap: 'It’s not an interview. | *Let them in.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 850, 300, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, head: 'APPLICATION', headBg: GOLD,
        lines: [{ text: 'role: my person', y: -60, size: 30 }, { text: 'references: 3', y: -10, size: 30 }, { text: 'trial: 6 months', y: 40, size: 30 }] })
      stamp(x, 800, 930, 'WELCOME IN', pop01(t, P.t0 + 1.5, 0.22, 1.6))
    } },
  { sign: S, cap: 'Plans are sweet. | *Hugs are sweeter.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 780); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-156, -110, 312, 220); x.fillStyle = CREAM; x.fillRect(-150, -104, 300, 208)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('OUR 5-YEAR PLAN', 0, -76)
        for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { x.fillStyle = (i + j) % 2 ? '#d7f5e6' : '#fff'; x.fillRect(-130 + j * 88, -50 + i * 36, 84, 32) }
        x.restore()
      }
      bubble(x, 790, 1040, 'or… a hug?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Be tired | *in front of them.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const C = { W: CREAM, B: '#6b4a2e' }
      drawBits(x, MUG, C, 720, 1000, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MUG, C, 850, 1000, 14 * pop01(t, P.t0 + 0.35, 0.3, 2))
      drawBits(x, MUG, C, 785, 900, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 690, "rest. | I've got you.", pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'No perfect time. | *Say it now.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 790, 820, 300, 200, k, { rot: 0.04, head: 'SAY "I LOVE YOU"', headBg: PINK, lines: [{ text: 'when: someday', y: 30, size: 36 }] })
      const s = ease.outCubic(prog(lt, 0.9, 1.2))
      if (s > 0.01 && k > 0.9) { x.save(); x.translate(790, 850); x.rotate(0.04); x.fillStyle = RED; x.fillRect(-120, -4, 240 * s, 8); x.restore() }
      label(x, 800, 1020, 'WHEN: TODAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Be silly. | *They’ll love it.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x + 30, F.top - 40, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: 0.25 })
      label(x, 790, 820, 'SILLY MODE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
      bubble(x, 790, 990, 'cute.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      sparkles(x, t, 400, 700, P.t0 + 1.0, 6, 120, 0.4)
    } },
  { sign: S, cap: 'You don’t earn love. | *You get it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BADGE, BADGE_C, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1050, 'NO WORK NEEDED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 6, life: 2.0, spread: 240, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3a074', key: 'G', accent: GREEN, solo: S, ending: 'group',
  title: 'Capricorn, stop | doing *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Built to last. | *Allowed to rest.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
