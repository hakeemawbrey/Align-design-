// r2a0296: star_advice, ADVICE SOLO, "How to give a Leo | *space.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine kind ways to give a Leo room to recharge, each a relatable truth + a warm reframe.
// Ending: callback (the DO NOT DISTURB sign from card six flips to OPEN FOR APPLAUSE).
//   0.0–3.6    "How to give a Leo | *space.*"
//   3.6–37.8   nine cards: quiet is a recharge (battery) · rain check granted · praise by text · even the sun sets
//              · room service by the door · the mane needs a nap (DO NOT DISTURB) · sit nearby, no talking
//              · spotlight off, still glowing · cheer when they're back
//  37.8        "Quiet Leo. | Still *the sun.*"
//  41.2        CALLBACK: "Back from the break. | *Applause, please.*"  the door sign flips.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', SILVER = '#d8dbe8'
const ST = { x: -200 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function battery(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const lvl = lerp(0.12, 1, ease.inOutCubic(clamp((lt - 0.5) / 1.5)))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -70, 260, 140); x.fillRect(130, -30, 26, 60)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -60, 240, 120)
  x.fillStyle = lvl < 0.3 ? RED : lvl < 0.7 ? GOLD : MINT; x.fillRect(-112, -52, 224 * lvl, 104)
  x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(lvl * 100)}%`, 0, 4)
  x.restore()
}
function phone(x, cx, cy, k, rot = 0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400); x.fillStyle = '#2a2350'; x.fillRect(-110, -190, 220, 380)
  x.fillStyle = '#140c30'; x.fillRect(-98, -160, 196, 320)
  x.restore()
}
function doorSign(x, cx, cy, k, flip, s = 1) {
  if (k <= 0.01) return
  const sx = Math.cos(Math.PI * clamp(flip))
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-60, -90); x.lineTo(0, -150); x.lineTo(60, -90); x.stroke()
  x.scale(Math.max(0.04, Math.abs(sx)), 1)
  const back = sx < 0
  x.fillStyle = INK; x.fillRect(-170, -95, 340, 190); x.fillStyle = back ? MINT : PINK; x.fillRect(-162, -87, 324, 174)
  x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const lines = back ? ['OPEN FOR', 'APPLAUSE'] : ['DO NOT', 'DISTURB']
  lines.forEach((l, i) => x.fillText(l, 0, -24 + i * 48))
  x.restore()
}
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const SUNGLASS = ['KKKKK.KKKKK', 'KBBBKKKBBBK', 'KBBBK.KBBBK', '.KKK...KKK.']

const CAMEOS = [
  { sign: 'leo', cap: 'Leo went quiet? | A *recharge*, not a breakup.', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      battery(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1060, 'CHARGING ⚡', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Plans cancelled? | Skip the *guilt trip.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'rain check?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 800, 880, 'of course. | rest up.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      L(x, 790, 1080, 'RAIN CHECK: GRANTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Still want praise? | Send it *by text.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      phone(x, 790, 860, k)
      bubble(x, 790, 800, 'you’re amazing.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 28, col: GOLD, tail: 'bl' })
      bubble(x, 790, 920, 'no reply needed', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 26, tail: 'br' })
      sparkles(x, t, 790, 800, P.t0 + 1.0, 6, 140, 0.4)
    } },
  { sign: 'leo', cap: 'Even the sun | sets *sometimes.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6), y = 800 + 120 * ease.inOutCubic(clamp((lt - 0.4) / 1.3))
      if (k > 0.01) {
        x.save(); x.beginPath(); x.rect(600, 560, 380, 420); x.clip()
        x.fillStyle = '#ff9a5a'; x.beginPath(); x.arc(790, y, 120 * k, 0, 7); x.fill()
        x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(790, y, 86 * k, 0, 7); x.fill()
        drawBits(x, SUNGLASS, { K: INK, B: '#3d3a6a' }, 790, y - 14, 13 * k)
        x.restore()
        x.fillStyle = '#3d8fd8'; x.fillRect(600, 980, 380, 50)
      }
      L(x, 790, 1110, 'BACK TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Snacks by the door. | *Royalty* loves room service.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        const lift = 80 * ease.outCubic(clamp((lt - 0.8) / 0.5))
        x.fillStyle = INK; x.fillRect(-170, 40, 340, 26); x.fillStyle = SILVER; x.fillRect(-160, 44, 320, 18)
        x.fillStyle = '#ffb34a'; x.fillRect(-70, -10, 140, 50); x.fillStyle = '#c98f5a'; x.fillRect(-60, 0, 120, 30)
        x.translate(0, -lift)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 40, 140, Math.PI, 0); x.fill()
        x.fillStyle = SILVER; x.beginPath(); x.arc(0, 40, 130, Math.PI, 0); x.fill()
        x.fillStyle = INK; x.fillRect(-14, -110, 28, 22)
        x.restore()
      }
      drawBits(x, CROWN, CROWN_C, 790, 640, 10 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 790, 1090, 'ROOM SERVICE ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Let them nap. | The *mane* needs rest.', mood: 'sleepy', star: { x: -200, y: 20 },
    front(x, t, lt, P) {
      doorSign(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 0)
      drawBits(x, CROWN, CROWN_C, 370, 700, 10 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: -0.3 })
      L(x, 790, 1100, 'NAP: ROYAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Don’t fill the silence. | Just *sit nearby.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, y: 20 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 780, 920, 220 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      x.save(); x.fillStyle = INK; x.fillRect(170, 1050, 760, 30); x.fillStyle = '#8a4a2e'; x.fillRect(178, 1054, 744, 22); x.restore()
      L(x, 790, 660, 'SAME COUCH. NO TALK.', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 28)
      hearts(x, t, 560, 760, P.t0 + 1.6, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'leo', cap: 'Spotlight off? | They’re *still shining.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [0, -1], star: ST, glow: 1,
    back(x, t, lt, P) {
      const on = lt < 0.9
      if (on) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(300, 470); x.lineTo(440, 470); x.lineTo(560, 1100); x.lineTo(180, 1100); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      L(x, 790, 720, lt < 0.9 ? 'LIGHTS: ON' : 'LIGHTS: OFF', pop01(t, P.t0 + 0.2, 0.3, 2), lt < 0.9 ? GOLD : BONE, 0.04, 34)
      L(x, 790, 900, 'GLOW: STILL ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, 340, 860, P.t0 + 1.5, 8, 200, 0.2)
    } },
  { sign: 'leo', cap: 'When they come back, | *cheer* a little.', mood: 'sparkle', star: ST, hops: [0.8, 1.4, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'welcome back!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      L(x, 790, 900, 'CROWD: 1 (LOUD)', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 32)
      hearts(x, t, 370, 800, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0296', key: 'D', accent: ACC, solo: 'leo', ending: 'callback',
  title: 'How to give a Leo | *space.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet Leo. | Still *the sun.*', mood: 'heart' },
  last: {
    text: 'Back from the break. | *Applause, please.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 540, 860, 320 * k, { mood: lt > 1.6 ? 'sparkle' : 'happy', seed: 7, hops: [t0 + 1.7, t0 + 2.4] })
      doorSign(x, 540, 1290, pop01(t, t0 + 0.4, 0.4, 2), ease.inOutCubic(prog(lt, 1.0, 1.6)), 1.7)
      if (lt > 1.6) { sparkles(x, t, 540, 860, t0 + 1.6, 9, 260, 0.3); hearts(x, t, 540, 760, t0 + 1.7, { n: 8, life: 1.8, spread: 560, cell: 8, seed: 4 }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
