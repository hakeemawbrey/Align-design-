// trs3onread: THE SIGNS AS… v3, "Zodiacs left on read | be like." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Story, then the closing match card. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Zodiacs left on read | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign takes being left on read (3.8 s each), pushed to the extreme:
//              ♈ one text, then forty more · ♉ will out-wait you, brought snacks · ♊ kept the chat going alone
//              · ♋ a three-page apology to "Dear match" · ♌ assumes you're speechless · ♍ checked their chart, blamed Mercury
//              · ♎ typed, deleted, typed since Tuesday · ♏ left you on read back, on principle · ♐ didn't notice, up a mountain
//              · ♑ scheduled being sad for 4:30 (new match at 4:45) · ♒ wrote a theory about read receipts
//              · ♓ wrote a sad song, cried at the chorus
//  49.2        "Everyone *overreacted.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "People get busy. | The right one *replies.*"  REPLY: SENT
//  58.3        "Sag replied. | *From a mountain.*"  over the match card: Aries (forty texts) + Sagittarius (the summit).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e'

// ── props
const SNACKS = [
  'R.R.R.R.R.R.R',
  'RRRRRRRRRRRRR',
  '.RRRRRRRRRRR.',
  '.RRWWWWWWWRR.',
  '.RRWKKKKKWRR.',
  '.RRWWWWWWWRR.',
  '.RRRRRRRRRRR.',
  '.RRRYYYYYRRR.',
  '.RRYYYYYYYRR.',
  '.RRRYYYYYRRR.',
  '.RRRRRRRRRRR.',
  'RRRRRRRRRRRRR',
  'R.R.R.R.R.R.R',
]
const SNACKS_C = { R: '#ff6b5a', W: '#fff4e2', Y: GOLD, K: INK }
const HOURGLASS = [
  'BBBBBBBBB',
  '.WSSSSSW.',
  '.WSSSSSW.',
  '..WSSSW..',
  '...WSW...',
  '....W....',
  '...W.W...',
  '..W.S.W..',
  '.W.SSS.W.',
  '.WSSSSSW.',
  'BBBBBBBBB',
]
const HOURGLASS_C = { B: '#8a4a2e', W: '#d9e8ff', S: GOLD }
const MOUNTAIN = [
  '.......F#.......',
  '.......FRR......',
  '.......FR.......',
  '.......W........',
  '......WWW.......',
  '.....WWGWW......',
  '....GGGGGGG.....',
  '...GGGGGGGGG....',
  '..GGGGGGGGGGGG..',
  '.GGGGGGGGGGGGGG.',
  'GGGGGGGGGGGGGGGG',
]
const MOUNTAIN_C = { F: '#efe6d6', R: RED, '#': RED, W: '#ffffff', G: '#7a86b8' }

/** a little birth-chart wheel with a highlighted Mercury dot */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  const pulse = 1 + 0.25 * Math.sin(t * 9)
  x.fillStyle = BONE; for (const a of [0.9, 2.4, 4.1]) x.fillRect(Math.cos(a) * r * 0.42 - 7, Math.sin(a) * r * 0.42 - 7, 14, 14)
  x.fillStyle = INK; x.fillRect(Math.cos(5.4) * r * 0.42 - 14 * pulse, Math.sin(5.4) * r * 0.42 - 14 * pulse, 28 * pulse, 28 * pulse)
  x.fillStyle = RED; x.fillRect(Math.cos(5.4) * r * 0.42 - 10 * pulse, Math.sin(5.4) * r * 0.42 - 10 * pulse, 20 * pulse, 20 * pulse)
  x.restore()
}

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sent one text. | Then *forty more.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', star: { x: -160 }, hops: [0.7, 1.1, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const TX = ['hey!', 'hey?', 'HELLO??', 'u up?', 'hi again', 'HEY', 'ok bye', 'jk hi']
      const n = Math.max(0, Math.floor((lt - 0.25) / 0.26))
      for (let s = 0; s < 3; s++) {
        const m = n - s
        if (m < 0) continue
        bubble(x, 770 + (m % 2 ? 15 : -15), 960 - s * 150, TX[m % TX.length], pop01(t, P.t0 + 0.25 + m * 0.26, 0.2, 2.2) * (1 - 0.08 * s), { size: 58, tail: m % 2 ? 'br' : 'bl' })
      }
      const c = Math.round(1 + 40 * ease.outCubic(prog(lt, 0.3, 2.0)))
      label(x, 790, 1135, `SENT: ${c}`, pop01(t, P.t0 + 0.35, 0.3, 2), { size: 42, bg: c >= 41 ? RED : GOLD, color: c >= 41 ? BONE : INK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Will out-wait you. | Brought *snacks.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -160 },
    back(x, t, lt, P) {
      drawBits(x, SNACKS, SNACKS_C, 800, 1000, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
    },
    front(x, t, lt, P) {
      const d = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.6) / 0.15))
      label(x, 790, 790, `DAY ${d}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 780, 630, 'I can do | this all year.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Kept the chat going. | *Alone.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.2) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const L = ['so anyway—', 'lol same', 'you’d love this', 'haha totally', 'great chat!']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.25) / 0.42))
      for (let s = 0; s < 2; s++) {
        const m = n - s
        if (m < 0) continue
        const me = m % 2 === 0
        bubble(x, me ? 740 : 790, 760 - s * 150, L[m], pop01(t, P.t0 + 0.25 + m * 0.42, 0.22, 2.2) * (1 - 0.06 * s), { size: 46, col: me ? BONE : LAV, tail: me ? 'bl' : 'br' })
      }
      label(x, 790, 960, `ALSO GEMINI`, pop01(t, P.t0 + 0.7, 0.3, 2) * (n % 2 ? 1 : 0.0001), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, `GEMINI`, pop01(t, P.t0 + 0.4, 0.3, 2) * (n % 2 ? 0.0001 : 1), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Sent an apology. | *Three pages* long.', mood: lt => lt < 1.2 ? 'squint' : 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      const u = ease.outCubic(prog(lt, 0.4, 1.8))      // the scroll unrolls downwards
      const H = 120 + 460 * u
      x.save(); x.translate(790, 560); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, 10, 300, H)
      x.fillStyle = INK; x.fillRect(-156, -6, 312, H + 12)
      x.fillStyle = '#fff4e2'; x.fillRect(-150, 0, 300, H)
      x.fillStyle = '#d9b36a'; x.fillRect(-162, -16, 324, 26); x.fillRect(-162, H - 10, 324, 26)
      x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('Dear match,', -122, 52)
      x.fillStyle = '#b9a9c9'
      for (let r = 0; r * 38 + 100 < H - 30; r++) x.fillRect(-122, 92 + r * 38, r % 3 === 2 ? 150 : 240, 12)
      x.restore()
      label(x, 790, 1150, 'SORRY (PT. 3)', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 32, bg: PINK, rot: -0.05 })
    } },
  { sign: 'leo', cap: 'Assumed you were | *speechless.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'stunned you, | didn’t I?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 900, 'SEEN = IN AWE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: '#ffb34a', rot: 0.05 })
      sparkles(x, t, 390, 860, P.t0 + 1.2, 8, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Checked their chart. | Blamed *Mercury.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      chart(x, 790, 730, 130, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 920, 'MERCURY: RETROGRADE', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'ah. that | explains it.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Typed. Deleted. Typed. | *Since Tuesday.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        const MSG = 'hey :) so I was'
        const cyc = (lt - 0.3) / 0.8, ph = cyc - Math.floor(cyc)
        const nch = lt < 0.3 ? 0 : Math.round(MSG.length * (ph < 0.6 ? ph / 0.6 : 1 - (ph - 0.6) / 0.4))
        x.save(); card(x, 790, 780, 380, 104, k, 0.03)
        x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        const s = MSG.slice(0, nch); x.fillText(s, -158, 2)
        if (Math.floor(t * 3) % 2) x.fillRect(-158 + x.measureText(s).width + 4, -22, 5, 44)
        x.restore()
      }
      bubble(x, 790, 620, '• • •', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      const d = Math.min(40, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.045))
      label(x, 790, 950, `DRAFT ${d}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 46, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Left *you* on read. | On principle.', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'Seen. ✓✓', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, col: LAV, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.7, 0.3, 2)
      drawBits(x, HOURGLASS, HOURGLASS_C, 790, 880, 18 * k, { rot: Math.PI * ease.inOutCubic(prog(lt, 1.2, 1.6)) })
      label(x, 790, 1080, 'REPLY IN: 1 YEAR', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 38, bg: '#c9c4d8', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Didn’t notice. | Was *up a mountain.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      drawBits(x, MOUNTAIN, MOUNTAIN_C, 330, 960, 24 * pop01(t, P.t0 + 0.15, 0.35, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 330, 640, 'phone? | what phone?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'br' })
      sparkles(x, t, 330, 760, P.t0 + 0.6, 6, 120, 0.5)
    } },
  { sign: 'capricorn', cap: 'Scheduled being sad | for *4:30.*', mood: lt => lt < 1.3 ? 'neutral' : 'squint', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); card(x, 320, 820, 340, 380, k, -0.04)
      x.fillStyle = '#2fc79a'; x.fillRect(-170, -190, 340, 70)
      x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY', 0, -153)
      const ROWS = [['4:00', 'MEETING'], ['4:30', 'BE SAD'], ['4:45', 'NEW MATCH']]
      ROWS.forEach(([h, w], i) => {
        const y = -70 + i * 92, on = lt > 0.6 + i * 0.4
        if (!on) return
        if (i === 1) { x.fillStyle = PINK; x.fillRect(-150, y - 34, 300, 68) }
        if (i === 2) { x.fillStyle = MINT; x.fillRect(-150, y - 34, 300, 68) }
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.fillText(h, -136, y + 2)
        x.font = `800 30px ${INTER}`; x.fillText(w, -40, y + 2)
      })
      x.restore()
    } },
  { sign: 'aquarius', cap: 'Wrote a *theory* | about read receipts.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); card(x, 790, 760, 360, 300, k, 0.04, '#1f4a3a')
        x.fillStyle = '#8a4a2e'; x.fillRect(-186, 150, 372, 16)
        x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const L = ['seen + 0 = ?', 'busy ∝ life', 'READ ≠ RUDE']
        L.forEach((s, i) => { if (lt > 0.5 + i * 0.4) { x.fillStyle = i === 2 ? GOLD : BONE; x.font = `${i === 2 ? 800 : 700} ${i === 2 ? 40 : 30}px ${i === 2 ? INTER : MONO}`; x.fillText(s, 0, -80 + i * 80) } })
        x.restore()
      }
      label(x, 790, 1000, 'PEER REVIEWED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.05 })
    } },
  { sign: 'pisces', cap: 'Wrote a sad song. | *Cried* at the chorus.', mood: lt => lt < 1.0 ? 'sleepy' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.25, 2.2)
      bubble(x, 780, 660, 'you left me | on reeead~', k, { size: 42, col: LAV, tail: 'bl' })
      if (k > 0.5) notes(x, t, 790, 1120, { n: 5, cell: 12, col: SKYB, seed: 2 })
      label(x, 790, 860, 'TRACK 1: SEEN', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 40, bg: SKYB, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'trs3onread', key: 'G', accent: '#8fe3ff',
  title: 'Zodiacs left on read | *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'sagittarius', chip: 'REPLIED' },
  group: { cap: 'Everyone *overreacted.*' },
  lesson: { text: 'People get busy. | The right one *replies.*', chip: 'REPLY: SENT' },
  last: {
    text: 'Sag replied. | *From a mountain.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
