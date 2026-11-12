// r2t0381: star_talk, ROLLCALL, "Every sign’s | voice notes." (signs3kit social cut, music: lofi · C). Ending: lesson.
//   ♈ fourteen voice notes before hello · ♉ forty seconds of chewing · ♊ one story, nine parts · ♋ a lullaby for your bad day
//   · ♌ it has an intro song · ♍ take thirty-one · ♎ "quick question", eleven minutes · ♏ one word: "interesting."
//   · ♐ recorded on a mountain · ♑ it has an agenda · ♒ 3 a.m. pigeon theory · ♓ tried to say hi, cried for four minutes
//   group "Nobody | just texted."  lesson "Hear them out. | The love's in there."  last "Even the chewing one."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

/** a voice-note pill: play button, a wiggling waveform, a duration */
function vnote(x, t, cx, cy, k, dur, { col = MINT, w = 380, rot = 0.03, live = true, bars = 13 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const h = 92
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.roundRect(-w / 2 + 8, -h / 2 + 10, w, h, 46); x.fill()
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 52); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 46); x.fill()
  // play button
  x.fillStyle = INK; x.beginPath(); x.arc(-w / 2 + 50, 0, 30, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2 + 40, -14); x.lineTo(-w / 2 + 64, 0); x.lineTo(-w / 2 + 40, 14); x.closePath(); x.fill()
  // waveform
  const x0 = -w / 2 + 100, x1 = w / 2 - 104, n = bars
  x.fillStyle = INK
  for (let i = 0; i < n; i++) {
    const a = 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7 + (live ? t * 6 : 0) + i * i * 0.3))
    const bh = 10 + 46 * a, bx = lerp(x0, x1, i / (n - 1))
    x.fillRect(bx - 4, -bh / 2, 8, bh)
  }
  x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(dur, w / 2 - 22, 2)
  x.restore()
}

const BURGER = ['..BBBBB..', '.BBWBBWB.', 'GGGGGGGGG', 'MMMMMMMMM', '.BBBBBBB.']
const BURGER_C = { B: '#e8a24a', W: CREAM, G: '#5fd068', M: '#8a4a2e' }
const MOUNT = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']
const MOUNT_C = { W: '#ffffff', G: '#6b62a8' }
const PIGEON = ['...GGG....', '..GGWKG...', '..GGGGGO..', '.GGGGGG...', 'GGPPGGG...', 'GGGGGGGG..', '.GGGGGGGG.', '...Y..Y...']
const PIGEON_C = { G: '#9aa5c4', W: '#ffffff', K: INK, O: ORANGE, P: '#b07dd6', Y: GOLD }

/** a clipboard agenda */
function agenda(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -164, 296, 352)
  x.fillStyle = INK; x.fillRect(-152, -180, 304, 360)
  x.fillStyle = '#8a4a2e'; x.fillRect(-144, -172, 288, 344)
  x.fillStyle = CREAM; x.fillRect(-124, -140, 248, 296)
  x.fillStyle = '#9aa5c4'; x.fillRect(-50, -188, 100, 40)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('AGENDA', -104, -104)
  const items = ['1. hello', '2. our charts', '3. Q3 goals', '4. bye']
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * items.length + 0.001)
  x.font = `700 26px ${MONO}`
  for (let i = 0; i < n; i++) x.fillText(items[i], -104, -46 + i * 54)
  x.restore()
}

const ST_L = { x: -170 }, ST_R = { x: 160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Fourteen voice notes. | Before *hello.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: ST_L, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      L(x, 790, 600, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.05, 32)
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.4) / 0.25) + (lt > 0.4 ? 1 : 0))
      for (let i = 0; i < n; i++) vnote(x, t, 790, 720 + i * 110, 0.78, ['0:58', '1:12', '0:47', '2:03'][i], { col: i % 2 ? PINK : MINT, w: 380, rot: i % 2 ? -0.03 : 0.03 })
      L(x, 790, 1170, '14 NEW', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Forty seconds of | *chewing.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST_L,
    front(x, t, lt, P, F) {
      drawBits(x, BURGER, BURGER_C, F.x + 140, F.cy + 40, 13 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.1 })
      vnote(x, t, 790, 700, pop01(t, P.t0 + 0.4, 0.3, 2), '0:40', { col: '#5fd068' })
      bubble(x, 790, 900, 'hold on— | *munch*', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Started one story. | Finished *nine.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST_L,
    front(x, t, lt, P) {
      vnote(x, t, 790, 700, pop01(t, P.t0 + 0.2, 0.3, 2), '6:12', { col: '#ffd23a' })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 8)
      L(x, 790, 860, `PART ${n} OF 9`, pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.04, 40)
      bubble(x, 790, 1040, 'anyway, | so THEN—', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Recorded a lullaby. | For your *bad day.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST_L,
    front(x, t, lt, P, F) {
      vnote(x, t, 790, 740, pop01(t, P.t0 + 0.25, 0.3, 2), '3:30', { col: SKYB })
      notes(x, t, 790, 640, { n: 4, cell: 7, col: SKYB, seed: 1 })
      L(x, 790, 900, 'FOR YOU ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.05, 40)
      hearts(x, t, F.x + 60, F.top, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Their voice note | has an *intro song.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST_L, hops: [1.1],
    front(x, t, lt, P) {
      vnote(x, t, 790, 700, pop01(t, P.t0 + 0.2, 0.3, 2), '4:44', { col: ORANGE })
      notes(x, t, 790, 600, { n: 5, cell: 8, col: GOLD, seed: 3 })
      L(x, 790, 860, 'FEAT. LEO', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.05, 44)
      sparkles(x, t, 790, 860, P.t0 + 0.9, 7, 170, 0.4)
      bubble(x, 790, 1040, 'it’s me, hi', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Re-recorded it | *thirty-one times.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', star: ST_L,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 30)
      vnote(x, t, 790, 700, pop01(t, P.t0 + 0.2, 0.3, 2), '0:09', { col: '#7dffb0', live: Math.floor(lt * 5) % 2 === 0 })
      L(x, 790, 860, `TAKE ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 48)
      L(x, 790, 1020, 'FINALLY. PERFECT.', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: '“Quick question.” | *Eleven minutes.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST_L,
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'quick question!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      const m = Math.floor(clamp((lt - 0.4) / 1.5) * 11)
      vnote(x, t, 790, 820, pop01(t, P.t0 + 0.4, 0.3, 2), `${m}:${String((m * 7 + 4) % 60).padStart(2, '0')}`, { col: PINK })
      L(x, 790, 990, 'STILL DECIDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'One voice note. | One word: *“interesting.”*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST_L,
    front(x, t, lt, P) {
      vnote(x, t, 790, 720, pop01(t, P.t0 + 0.3, 0.3, 2), '0:01', { col: '#c97bff', bars: 9 })
      bubble(x, 790, 900, '…interesting.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      L(x, 790, 1060, 'NO FOLLOW-UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.05, 30)
    } },
  { sign: 'sagittarius', cap: 'Recorded it | *on a mountain.*', mood: 'sparkle', star: ST_R, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 540, 1040, 40 * pop01(t, P.t0 + 0.1, 0.35, 1.8))
      // wind streaks
      if (lt > 0.4) {
        x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 6
        for (let i = 0; i < 4; i++) { const ph = ((t * 1.3 + i * 0.29) % 1 + 1) % 1; const wy = 560 + i * 70; x.beginPath(); x.moveTo(lerp(140, 900, ph), wy); x.lineTo(lerp(140, 900, ph) + 120, wy); x.stroke() }
        x.restore()
      }
    },
    front(x, t, lt, P) {
      vnote(x, t, 320, 640, pop01(t, P.t0 + 0.4, 0.3, 2), '2:15', { col: '#ff9a4a', w: 340, rot: -0.04 })
      bubble(x, 320, 1100, 'CAN YOU | HEAR ME?!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Their voice note | has an *agenda.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], star: ST_R,
    front(x, t, lt, P) {
      agenda(x, 320, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      vnote(x, t, 320, 1110, pop01(t, P.t0 + 1.2, 0.3, 2), '9:00', { col: '#9aa5c4', w: 340 })
    } },
  { sign: 'aquarius', cap: '3 a.m. voice note: | *pigeon theory.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, -1], star: ST_L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PIGEON_C, 800, 740, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 800, 560, 'what if they | KNOW things', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: '#6fc3ff', tail: 'bl' })
      vnote(x, t, 790, 980, pop01(t, P.t0 + 0.5, 0.3, 2), '3:07 AM', { col: '#6fc3ff', w: 400 })
      L(x, 790, 1120, 'PART 1', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: 'pisces', cap: 'Tried to say hi. | *Cried* for four minutes.', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST_L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'hiii… *sob*', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      vnote(x, t, 790, 820, pop01(t, P.t0 + 0.6, 0.3, 2), '4:00', { col: '#b7a6ff' })
      L(x, 790, 980, 'SENT ANYWAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0381', key: 'C', accent: MINT,
  title: 'Every sign’s | *voice notes.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Nobody | *just texted.*' },
  lesson: { text: 'Hear them out. | The *love’s* in there.', chip: 'MESSAGE: HEARD' },
  last: {
    text: 'Even the | *chewing* one.',
    draw(x, t, lt) {
      drawBits(x, BURGER, BURGER_C, 540, 760, 20 * pop01(t, t - lt + 0.6, 0.35, 2), { rot: -0.08 })
      hearts(x, t, 540, 1100, t - lt + 0.8, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
