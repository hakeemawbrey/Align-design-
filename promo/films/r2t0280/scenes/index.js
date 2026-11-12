// r2t0280: star_talk, BELIKE (twelve signs), "Lift is full? | Zodiacs be like." (~60 s vertical, signs3kit, lofi · F)
// Twelve signs and one packed lift, each the most extreme version of itself.
//   0.0–3.6    "Lift is full? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ squeezed in anyway, the door said no · ♉ waits for the next one, snacking · ♊ new best friends by floor
//              three · ♋ holds the door for everyone, forever · ♌ turned the lift into a stage · ♍ counted heads, one over
//              · ♎ pressed every button, to be fair · ♏ silent in the corner, knows everyone's floor · ♐ took the stairs,
//              all thirty floors · ♑ a work call in the lift · ♒ started a lift book club · ♓ someone said sorry, Pisces
//              sobbed
//  49.2        "One lift. | *Twelve problems.*"
//  52.4        LESSON UNLOCKED: "Make a little room. | We’re all *going up.*"  STATUS: SQUEEZED IN
//  58.3        "Taurus is | *still waiting.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#c9a6ff'
const ST = { x: -170 }

const DONUT = ['..KKKKK..', '.KPPPPPK.', 'KPPSPPSPK', 'KPPKKKPPK', 'KPSK.KPPK', 'KPPKKKSPK', 'KPPPPPPPK', '.KPSPPPK.', '..KKKKK..']
const DONUT_C = { K: INK, P: PINK, S: SUN }
const BOOK_BM = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KBBWWWWBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']

/** lift doors: two steel panels that close to `p` (0 open … 1 shut) */
function doors(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -230, 340, 460)
  x.fillStyle = '#3a3360'; x.fillRect(-160, -220, 320, 440)
  const w = 160 * p
  x.fillStyle = '#9aa5c4'; x.fillRect(-160, -220, w, 440); x.fillRect(160 - w, -220, w, 440)
  x.fillStyle = '#c9d0e4'; x.fillRect(-160 + w - 8, -220, 8, 440); x.fillRect(160 - w, -220, 8, 440)
  x.restore()
}
/** a lift button panel; `lit` buttons glow */
function buttons(x, cx, cy, k, lit) {
  card(x, cx, cy, 200, 320, k, { bg: '#2a2350', rot: 0 }, () => {
    for (let i = 0; i < 10; i++) {
      const bx = -45 + (i % 2) * 90, by = -120 + Math.floor(i / 2) * 60, on = i < lit
      x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 24, 0, Math.PI * 2); x.fill()
      x.fillStyle = on ? SUN : GREY; x.beginPath(); x.arc(bx, by, 19, 0, Math.PI * 2); x.fill()
      txt(x, String(i + 1), bx, by + 1, { size: 20, font: MONO, weight: 700, color: INK })
    }
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Squeezed in anyway. | *The door said no.*', mood: lt => lt > 1.1 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const p = 0.4 + 0.5 * Math.abs(Math.sin(Math.PI * clamp((lt - 0.5) / 0.6)))
      doors(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), p)
      label(x, 800, 1140, 'DOOR: 1 · ARIES: 0', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Waits for the next one. | *Snacking.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DONUT, DONUT_C, 800, 880, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 660, 'NEXT LIFT: 4 MIN', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'no rush', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'New best friends | *by floor three.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const IDS = ['virgo', 'capricorn']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.3, 0.35, 2); if (k > 0.01) signChar(x, t, id, 720 + i * 170, 1040, 140 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 50 + i, glyph: false }) })
      bubble(x, 800, 690, 'group chat??', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      label(x, 800, 860, 'FLOOR 3', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Holds the door. | For everyone. *Forever.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      doors(x, 820, 880, pop01(t, P.t0 + 0.2, 0.35, 2), 0.25)
      const m = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 11)
      label(x, 800, 660, `HOLDING: ${m} MIN`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'come in, come in!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Turned the lift | *into a stage.*', mood: 'sparkle', look: [0, 0], star: ST, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(330, 470); x.lineTo(410, 470); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'thank you, | floor four!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
      label(x, 800, 960, 'ENCORE?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 46, bg: PINK, rot: 0.05 })
    } },
  { sign: 'virgo', cap: 'Counted heads. | *One over the limit.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 820, 320, 200, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'MAX: 8', 0, -40, { size: 44, font: MONO, weight: 700 })
        const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 8)
        txt(x, `NOW: ${n}`, 0, 30, { size: 44, font: MONO, weight: 700, color: n > 8 ? RED : GREEN })
      })
      bubble(x, 800, 1070, 'someone. | step. out.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Pressed every button. | *To be fair.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      buttons(x, 800, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.4) / 1.2) * 10))
      label(x, 800, 1150, 'EVERY FLOOR, EQUALLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Silent. In the corner. | Knows *everyone’s floor.*', mood: 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const F = [['YOU: 7', MINT], ['HIM: 12', GOLD], ['HER: 3', PINK]]
      F.forEach(([s, c], i) => label(x, 800, 700 + i * 150, s, pop01(t, P.t0 + 0.4 + i * 0.4, 0.3, 2), { size: 40, bg: c, rot: (i - 1) * 0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'sagittarius', cap: 'Took the stairs. | *All thirty floors.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(640 + i * 50, 1100 - i * 60, 60, 60 + i * 60)
      x.fillStyle = '#7a8bb0'; for (let i = 0; i < 6; i++) x.fillRect(646 + i * 50, 1106 - i * 60, 48, 20)
      const f = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 29)
      label(x, 800, 660, `FLOOR ${f}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Took a work call. | *In the lift.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'let’s circle back', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      bubble(x, 800, 880, 'you’re breaking up', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: GREY, tail: 'br' })
      label(x, 800, 1070, 'SIGNAL: 0 BARS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a lift | *book club.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      ;[SKYB, PINK, MINT].forEach((c, i) => drawBits(x, BOOK_BM, { K: INK, B: c, W: CREAM }, 700 + i * 100, 900 + (i % 2) * 40, 14 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.12 }))
      label(x, 800, 680, 'MEETS: FLOORS 1–9', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'chapter one!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Someone said “sorry.” | Pisces *sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'oh, sorry!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      bubble(x, 800, 900, 'that was | so KIND', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 800, 1100, 'FLOORS CRIED: 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0280', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Lift is full? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One lift. | *Twelve problems.*' },
  lesson: { text: 'Make a little room. | We’re all *going up.*', chip: 'STATUS: SQUEEZED IN' },
  last: { text: 'Taurus is | *still waiting.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
