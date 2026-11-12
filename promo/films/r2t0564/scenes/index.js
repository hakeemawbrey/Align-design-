// r2t0564: star_talk, BELIKE, "Bus is late? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · D).
// Twelve signs in zodiac order, each one's most extreme reaction to a late bus. Ending: callback (Aries is still running).
//   ♈ started running, beat the bus · ♉ sat down, had a picnic · ♊ befriended the whole stop · ♋ live updates to mom
//   · ♌ a bus stop photoshoot · ♍ filed a complaint, twice · ♎ the bus came, couldn't pick a seat
//   · ♏ memorised the whole schedule (it's lying) · ♐ walked to the next town · ♑ bought a car, right there
//   · ♒ designed a better bus · ♓ cried, the bus came, cried again
//   group "The bus? | *Still not here.*"   last "And Aries? | *Still running.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#ffd23a'
const SANDWICH = ['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', '.BBBBBBBBB.']
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', R: '#e23d4e', Y: '#ffd23a' }
const BUS = ['YYYYYYYYYYYYYYYY', 'YWWWYWWWYWWWYWWY', 'YWWWYWWWYWWWYWWY', 'YYYYYYYYYYYYYYYY', 'YYYYYYYYYYYYYYYY', '.KK.........KK..']
const BUS_C = { Y: '#ffd23a', W: SKYB, K: INK }
const CAR = ['...RRRRRR...', '..RWWRWWWR..', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.KK......KK.']
const CAR_C = { R: '#e23d4e', W: SKYB, K: INK }

// a bus stop sign on a pole
function busStop(x, cx, cy, k, txt = 'BUS 14') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -120, 20, 320); x.fillStyle = '#9aa5c4'; x.fillRect(-5, -116, 10, 312)
  x.fillStyle = INK; x.fillRect(-90, -210, 180, 110); x.fillStyle = '#2f8a5a'; x.fillRect(-82, -202, 164, 94)
  x.fillStyle = PAPER; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, -155)
  x.restore()
}
// keep a prop inside the stage panel's glass
const inPanel = (x, fn) => { x.save(); x.beginPath(); x.rect(112, 482, 856, 736); x.clip(); fn(); x.restore() }
const speed = (x, cx, cy, n = 4) => { x.fillStyle = 'rgba(239,230,214,0.6)'; for (let i = 0; i < n; i++) x.fillRect(cx - 160 - (i % 2) * 40, cy - 40 + i * 26, 110, 8) }

const CAMEOS = [
  { sign: 'aries', cap: 'Started running. | *Beat the bus.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P, F) {
      speed(x, F.x - 20, F.cy)
      inPanel(x, () => drawBits(x, BUS, BUS_C, lerp(1100, 790, clamp(lt / 2.2)), 1040, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)))
      label(x, 790, 720, 'ARRIVED FIRST', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Sat down. | Had *a picnic.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(600, 1040, 380, 70)
      for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? PAPER : RED; x.fillRect(606 + i * 61.3, 1046 + j * 29, 61.3, 29) }
      x.restore()
      drawBits(x, SANDWICH, SANDWICH_C, 760, 980, 14 * k); bits(x, 'cookie', 880, 990, 10 * k)
      label(x, 790, 760, 'NO RUSH. EVER.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Made friends | with *the whole stop.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'cancer', 690, 1010, 130 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false }); signChar(x, t, 'virgo', 820, 1010, 130 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 22, glyph: false }); signChar(x, t, 'libra', 940, 1010, 130 * k, { mood: 'heart', look: [-1, 0], seed: 23, glyph: false }) }
      bubble(x, 800, 720, 'group chat? | group chat.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Texted mom | a *live update.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 8)
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '8:1' + Math.min(9, n), head: `UPDATE #${n}`, msg: n > 5 ? 'still here. | love you' : 'bus still | not here', bg: PINK, size: 32 })
      label(x, 800, 1110, 'MOM: “STAY WARM”', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Turned the bus stop | into *a photoshoot.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      busStop(x, 820, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = (lt * 2.2) % 1; if (f < 0.12 && lt > 0.5) { x.save(); x.globalAlpha = 0.5 * (1 - f / 0.12); x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 610, 640, 'LOOK 4 OF 30', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Filed a complaint. | *Twice.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 're: bus 14 | delay: 6 min | (see chart, | attached)', { head: lt > 1.2 ? 'SENT (2)' : 'SENT (1)', headBg: MINT, size: 30, w: 300, rot: 0.04 })
      label(x, 790, 1110, 'CC: EVERYONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Bus finally came. | Couldn’t *pick a seat.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const away = ease.inCubic(prog(lt, 1.5, 2.3))
      inPanel(x, () => drawBits(x, BUS, BUS_C, 790 + away * 500, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)))
      bubble(x, 790, 700, Math.floor(lt * 2.5) % 2 ? 'window?' : 'aisle?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      if (lt > 1.6) label(x, 790, 1110, 'BUS: GONE', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), { size: 34, bg: RED, color: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Memorised the | *whole schedule.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), '8:02 · 8:14 | 8:26 · 8:38 | 8:50 · 9:02', { head: 'BUS 14 (BY HEART)', headBg: '#c97bff', size: 30, w: 320, rot: -0.04 })
      label(x, 790, 1100, 'THE BUS IS LYING.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Gave up. Walked | *to the next town.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      busStop(x, 820, 980, pop01(t, P.t0 + 0.2, 0.3, 2), 'BUS 14')
      label(x, 760, 660, '→ NEXT TOWN: 14 MI', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 380, 640, 'adventure!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Bought a car. | *Right there.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAR, CAR_C, 800, 960, 22 * pop01(t, P.t0 + 0.5, 0.35, 2))
      label(x, 800, 720, 'SOLD ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1110, 'PAID IN FULL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Designed | *a better bus.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 870); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -146, 352, 292); x.fillStyle = '#2a5aa0'; x.fillRect(-170, -140, 340, 280)
        x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 2; for (let i = -140; i < 140; i += 28) { x.beginPath(); x.moveTo(-170, i); x.lineTo(170, i); x.stroke() }
        drawBits(x, BUS, { Y: '#dfe8ff', W: '#2a5aa0', K: '#dfe8ff' }, 0, 10, 13)
        x.fillStyle = '#dfe8ff'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('BUS 2.0 (FLIES)', 0, -100)
        x.fillRect(-60, -64, 6, 30); x.fillRect(54, -64, 6, 30); x.fillRect(-90, -70, 180, 8)
        x.restore()
      }
      label(x, 800, 1110, 'PATENT PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried. Bus came. | *Cried again.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      inPanel(x, () => drawBits(x, BUS, BUS_C, lerp(1150, 790, ease.outCubic(prog(lt, 0.6, 1.2))), 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)))
      bubble(x, 790, 720, lt > 1.2 ? 'it CAME!!' : 'it’s not | coming…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0564', key: 'D', accent: ACC, ending: 'callback',
  title: 'Bus is late? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The bus? | *Still not here.*' },
  last: {
    text: 'And Aries? | *Still running.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      const ax = lerp(260, 820, ease.inOutCubic(prog(lt, 0.3, 3.2)))
      if (k > 0.01) { const F = signChar(x, t, 'aries', ax, 1100, 260 * k, { mood: 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 0.6, t - lt + 1.0, t - lt + 1.4, t - lt + 1.8, t - lt + 2.2, t - lt + 2.6] }); speed(x, F.x - 30, F.cy, 5) }
      label(x, 540, 1350, 'MILE 9', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
