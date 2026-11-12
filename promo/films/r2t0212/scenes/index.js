// r2t0212: star_talk, SOLO, "Geminis at a party | be like." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards), each the most extreme social-butterfly Gemini.
//   0.0–3.6    "Geminis at a party | *be like.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              arrived alone, left with forty best friends · six conversations, finished none · changed outfits mid-party
//              · didn't know the host, now co-hosting · texting the party from the party · asked everyone's sign, charted
//              the room · bored at 9:02, back at 9:03 · their match showed up, talked for four hours · goodbye number 14
//  37.8        "Talked to everyone. | *Remembered everyone.*"  Gemini comes back, big.
//  41.0        LESSON UNLOCKED: "Curious is a gift. | Keep *asking.*"  STATUS: SOCIAL
//  46.9        "Gemini’s plus-one? | *Everyone.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SIGN_IDS,
} from '../../signs3kit.js'
import { signStar } from '../../startalk.js'

const LIME = '#e8f06a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const S = 'gemini'

// ── props
const HATS = [
  ['..KKKK..', '..KKKK..', '..KRRK..', 'KKKKKKKK'],
  ['...YY...', '..YYYY..', '.YYPYYY.', 'YYYYYYYY'],
  ['.G....G.', 'GGG..GGG', 'GGGGGGGG', '.GGGGGG.'],
]
const HAT_C = { K: INK, R: RED, Y: GOLD, P: PINK, G: MINT }

// a phone with chat lines
function phone(x, cx, cy, k, { head = 'THE PARTY (40)', headCol = LIME, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a birth-chart wheel: twelve wedges light up one by one, each a sign's colour
function chart(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 176, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 168, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) {
    const a0 = i / 12 * Math.PI * 2 - Math.PI / 2, a1 = a0 + Math.PI * 2 / 12
    x.fillStyle = i < n ? signStar(SIGN_IDS[i]).color : '#3a3360'
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 160, a0 + 0.02, a1 - 0.02); x.closePath(); x.fill()
  }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 54, 0, Math.PI * 2); x.fill()
  x.rotate(-t * 0.15); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${n}/12`, 0, 2)
  x.restore()
}
// a digital clock face
function clock(x, cx, cy, k, txt, col = LIME) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-146, -66, 304, 144)
  x.fillStyle = INK; x.fillRect(-156, -78, 312, 156); x.fillStyle = '#140c30'; x.fillRect(-144, -66, 288, 132)
  x.fillStyle = col; x.font = `700 84px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 4)
  x.restore()
}

const FRIENDS = ['aries', 'taurus', 'leo', 'libra', 'sagittarius', 'aquarius', 'capricorn', 'scorpio']
const CHATS = ['so anyway—', 'wait, wh—', 'ok but—', 'did you—', 'LOL so—', 'hold on—']

const CAMEOS = [
  { sign: S, cap: 'Arrived alone. | Left with *forty best friends.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -220 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      FRIENDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.13, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 640 + (i % 4) * 95, 790 + Math.floor(i / 4) * 150, 120 * k, { mood: i % 2 ? 'happy' : 'wink', seed: 50 + i, glyph: false, glow: 0.6, hops: [P.t0 + 1.2 + i * 0.07] })
      })
      label(x, 790, 1110, `NEW BESTIES: ${Math.round(clamp((lt - 0.3) / 1.6) * 40)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: LIME, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Started six conversations. | *Finished none.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: 60, s: 250 },
    front(x, t, lt, P) {
      CHATS.forEach((c, i) => {
        const px = i % 2 ? 790 : 290, py = 620 + Math.floor(i / 2) * 150
        bubble(x, px, py, c, pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2), { size: 32, col: i % 3 === 0 ? LIME : i % 3 === 1 ? BONE : LAV, tail: i % 2 ? 'bl' : 'br' })
      })
    } },
  { sign: S, cap: 'Changed outfits | *mid-party.* Twice.', mood: 'sparkle', star: { x: -200 }, hops: [0.75, 1.5],
    front(x, t, lt, P, F) {
      const n = lt < 0.75 ? 0 : lt < 1.5 ? 1 : 2
      drawBits(x, HATS[n], HAT_C, F.x, F.top - 30, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.75 * 1.29, 6, 150, 0.1)
      sparkles(x, t, F.x, F.cy, P.t0 + 1.5 * 1.29, 6, 150, 0.5)
      label(x, 790, 860, `LOOK #${n + 1}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 52, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Didn’t know the host. | *Now co-hosting.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 920, 230 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 61, glyph: false })
      label(x, 790, 1090, 'HOST', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, F.x, F.cy + 200, 'CO-HOST', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LIME, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 560, 620, 'welcome, | everyone!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Texting the party | *from the party.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { lines: [
        ['look left', LIME, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['you’re right here', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['ok now look right', LIME, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
      label(x, 790, 1110, '3 FEET AWAY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked everyone’s sign. | *Charted the room.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.7],
    front(x, t, lt, P) {
      chart(x, t, 790, 850, pop01(t, P.t0 + 0.15, 0.35, 2), Math.min(12, Math.floor(clamp((lt - 0.3) / 1.3) * 12)))
      bubble(x, 420, 620, 'what’s | your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 - prog(lt, 1.5, 1.65)), { size: 32, tail: 'bc' })
      label(x, 790, 1110, 'ROOM: CHARTED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bored at 9:02. | *Back at 9:03.*', mood: lt => lt > 1.2 ? 'sparkle' : 'eyeroll', star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), lt > 1.2 ? '9:03' : '9:02', lt > 1.2 ? LIME : '#8a8aa0')
      label(x, 790, 1050, 'NEW TOPIC FOUND', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LIME, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.25 * 1.29, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Their match showed up. | *Talked for four hours.*', mood: lt => lt > 1 ? 'heart' : 'wide', look: [1, 0], star: { x: -200, y: 20, s: 270 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 910, 260 * k, { mood: lt > 1 ? 'heart' : 'happy', look: [-1, 0], seed: 62, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 790, 640, `HOUR ${1 + Math.floor(clamp((lt - 0.4) / 1.5) * 3.99)}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 6, life: 1.6, spread: 220, cell: 6, seed: 9 })
    } },
  { sign: S, cap: 'Said “one more minute.” | *Goodbye number 14.*', mood: lt => lt > 1 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 13.99)
      label(x, 790, 820, `GOODBYE #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: LIME, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'ok bye! | oh wait—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0212', key: 'E', accent: LIME, solo: S, ending: 'lesson',
  title: 'Geminis at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Talked to everyone. | *Remembered everyone.*', mood: 'sparkle' },
  lesson: { text: 'Curious is a gift. | Keep *asking.*', chip: 'STATUS: SOCIAL' },
  last: { text: 'Gemini’s plus-one? | *Everyone.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
