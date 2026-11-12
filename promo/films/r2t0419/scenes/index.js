// r2t0419: star_talk, SOLO (scorpio), "Scorpios keeping | a secret be like." (signs3kit social cut, music: lofi · D). Ending: callback.
// One sign the whole way: nine extreme (and lovable) ways a Scorpio keeps a secret.
//   0.0–3.6    "Scorpios keeping | a secret *be like.*"  One big Scorpio pops in.
//   3.6–37.8   nine cards: the diary is blank · "what's new?" "nothing." (everything) · a vault inside a vault
//              · face calm, inside confetti · changed the subject to your love life · speaks only in eyebrow
//              · the secret is a surprise party, planned six months · asked directly, left the chat · the lie detector sweats
//  37.8        "Vault mode: | *forever.*"
//  41.2        callback: "Surprise! | *Zero leaks.*"  The party hat and confetti, the friend finally in on it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', ACC = '#ff5c8a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }
const S = 'scorpio'

const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPY..', '.PPPPPPP.', '.PYPPPYP.', 'PPPPPPPPP']
const HAT_C = { P: PINK, Y: GOLD }
const BROW = ['......KKKK', '...KKKK...', 'KKKK......']

/** a closed diary with a padlock; opens to blank pages */
function diary(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  if (!open) {
    x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = '#7a2b5e'; x.fillRect(-132, -162, 264, 324)
    x.fillStyle = GOLD; x.fillRect(110, -30, 40, 60); x.fillStyle = INK; x.fillRect(122, -6, 16, 16)
    x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DIARY', 0, -100)
  } else {
    x.fillStyle = INK; x.fillRect(-250, -170, 500, 340); x.fillStyle = CREAM; x.fillRect(-242, -162, 238, 324); x.fillRect(4, -162, 238, 324)
    x.fillStyle = '#d9cfbf'; x.fillRect(-4, -162, 8, 324)
  }
  x.restore()
}
/** a safe door; nested: a smaller one inside */
function vault(x, cx, cy, s, k, spin = 0, body = '#9aa5c4', face = '#7d88a8') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = body; x.fillRect(-140, -140, 280, 280)
  x.fillStyle = face; x.fillRect(-120, -120, 240, 240)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
  x.save(); x.rotate(spin); x.fillStyle = INK; for (let i = 0; i < 4; i++) { x.rotate(Math.PI / 2); x.fillRect(-8, -60, 16, 44) } x.restore()
  x.fillStyle = INK; x.fillRect(118, -30, 20, 60)
  x.restore()
}
/** confetti falling inside the panel */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 330, h = 560, alpha = 1 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, cy - h / 2 + ph * h); x.rotate(t * 3 + i)
    x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillStyle = COLS[i % 6]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel phone with chat chips */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 22px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2); x.restore()
  })
  x.restore()
}
/** a lie-detector box with a jittery needle line and a sweat drop */
function detector(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -120, 360, 240); x.fillStyle = '#c9c9d8'; x.fillRect(-170, -110, 340, 220)
  x.fillStyle = '#ffffff'; x.fillRect(-150, -90, 300, 120)
  x.strokeStyle = RED; x.lineWidth = 4; x.beginPath()
  const amp = lerp(4, 44, clamp((lt - 0.6) / 1.0))
  for (let i = 0; i <= 60; i++) { const px = -150 + i * 5, py = -30 + Math.sin(i * 1.3 + t * 14) * amp * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.4))); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  x.fillStyle = INK; x.fillRect(-120, 56, 60, 30); x.fillRect(60, 56, 60, 30)
  if (lt > 1.2) { x.fillStyle = SKYB; const dy = ((t * 1.6) % 1) * 60; x.beginPath(); x.moveTo(170, -120 + dy); x.lineTo(184, -92 + dy); x.arc(170, -92 + dy, 14, 0, Math.PI); x.lineTo(156, -92 + dy); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Told nobody. | Not even *the diary.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      diary(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.0)
      L(x, 790, 1110, 'PAGES: BLANK', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: S, cap: '“What’s new?” | “*Nothing.*”', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'nothing.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
      L(x, 790, 900, '(EVERYTHING)', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.05, 40)
    } },
  { sign: S, cap: 'Put it in a vault. | *Inside a vault.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      vault(x, 790, 860, 1.1, k, lt * 2)
      vault(x, 790, 860, 0.55, pop01(t, P.t0 + 0.9, 0.3, 2), -lt * 3, GOLD, '#c98f2a')
      vault(x, 790, 860, 0.25, pop01(t, P.t0 + 1.4, 0.3, 2), lt * 4, PINK, '#d0477a')
    } },
  { sign: S, cap: 'Face: calm. | Inside: *confetti.*', mood: 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { if (lt > 0.8) confetti(x, t, 370, 860, P.t0 + 0.8 * 1.29, { n: 26, spread: 220, h: 600 }) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'POKER FACE', pop01(t, P.t0 + 0.3, 0.3, 2.4), BONE, -0.04, 40)
      L(x, 790, 960, 'HEART: 200 BPM', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Changed the subject. | *To your love life.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'anyway… | how’s YOUR | love life?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 790, 1050, 'DEFLECTION: 10/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Now speaks | only in *eyebrow.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const up = ease.outBack ? ease.outBack(prog(lt, 0.6, 1.0)) : prog(lt, 0.6, 1.0)
      drawBits(x, BROW, { K: INK }, F.x + 50, F.top - 10 - 30 * up, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 760, 'EYEBROW: RAISED', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, -0.04, 32)
      L(x, 790, 920, 'MEANING: ???', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 34)
    } },
  { sign: S, cap: 'The secret? | A *surprise party.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HAT, HAT_C, 790, 860, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 })
      L(x, 790, 660, 'PLANNING SINCE MAY', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 28)
      L(x, 790, 1080, 'LEAKS: ZERO', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Asked directly? | *Left the chat.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: ACC, lines: [
        ['ok spill. now.', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['scorpio?', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2), true],
        ['SCORPIO LEFT', RED, pop01(t, P.t0 + 1.5, 0.25, 2.4)],
      ] })
    } },
  { sign: S, cap: 'Lie detector? | *It’s* the nervous one.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      detector(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1080, 'RESULT: UNCLEAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0419', key: 'D', accent: ACC, solo: 'scorpio', ending: 'callback',
  title: 'Scorpios keeping | a secret *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Vault mode: | *forever.*', mood: 'squint' },
  last: {
    text: 'Surprise! | *Zero leaks.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) {
        const F = signChar(x, t, 'scorpio', 400, 1080, 260 * k, { mood: lt > 1.0 ? 'sparkle' : 'wink', seed: 7, look: [1, 0], hops: [t0 + 1.0, t0 + 1.8] })
        drawBits(x, HAT, HAT_C, 410, F.top - 50, 11 * k, { rot: -0.12 })
        signChar(x, t, 'taurus', 720, 1100, 220 * k, { mood: lt > 1.0 ? 'wide' : 'happy', seed: 8, look: [-1, 0], hops: [t0 + 1.1] })
      }
      if (lt > 0.9) confetti(x, t, 540, 1000, t0 + 0.9, { n: 30, spread: 420, h: 620 })
      sparkles(x, t, 560, 980, t0 + 0.9, 10, 260, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
