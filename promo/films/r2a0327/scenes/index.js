// r2a0327: star_advice, ADVICE SOLO (capricorn), "Capricorn, before you | send that text." (signs3kit social cut, music: lofi · F).
// Nine warm cards about texting someone you like, each a relatable Capricorn truth + a kind reframe. Ending: card.
//   draft v6 · the pros-and-cons list · scheduling the reply · waiting for perfect timing · lifting a pillow (soft is strong)
//   · you can go first · checked their sign first · phone down, live · "Best regards" becomes "xo"
//   Group: "Boss on the outside. | Softie inside."  Lesson: "Your heart isn't | a rough draft."  Last line over the
//   Capricorn + Cancer match card (the sign check, paid off): "They replied *“xo.”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', GREY = '#c9c9d8', BROWN = '#8a4a2e', ACC = '#2fc79a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.15, k * 1.15)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right, strike], i) => {
    if (kk <= 0.01) return
    x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    if (strike) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(4, 4); x.lineTo(4 + (w - 8) * strike, -2); x.stroke() }
    x.restore()
  })
  x.restore()
}
const strikeLine = (x, a, b, y, p) => { if (p <= 0) return; x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(a, y + 8); x.lineTo(a + (b - a) * p, y - 8); x.stroke(); x.restore() }
const CAL = ['RRRRRRRRRR', 'RRRRRRRRRR', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW']
const PILLOW = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPPWPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', '.PPPPPPPPPP.']
const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK', 'B.....', 'B.....', 'B.....', 'B.....', 'B.....', 'B.....']
const GRASS = ['.G...G..G...G.', 'GG.G.GG.GG.G.G', 'GGGGGGGGGGGGGG', 'DDDDDDDDDDDDDD']
const FLOWER = ['.P.', 'PYP', '.P.', '.G.', '.G.']
const ST = { x: -170 }
const S = 'capricorn'

const CAMEOS = [
  { sign: S, cap: 'Rewrote it six times? | *It was kind at one.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const v = Math.min(6, 1 + Math.floor(lt * 3.5))
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: `DRAFT V${v}`, headCol: ACC, lines: [['hey! hope', BONE, 1, true], ['your week', BONE, 1, true], ['is good :)', BONE, 1, true]] })
      L(x, 800, 1150, 'V1 WAS PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Made a pros and cons list? | *Your heart voted.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 850); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.fillStyle = CREAM; x.fillRect(-162, -192, 324, 384)
        x.fillStyle = INK; x.fillRect(-4, -150, 8, 320); x.fillRect(-150, -120, 300, 6)
        x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.fillText('PROS', -80, -140); x.fillText('CONS', 80, -140)
        x.fillStyle = TEAL; for (let i = 0; i < 5; i++) if (lt > 0.3 + i * 0.12) x.fillRect(-130, -90 + i * 50, 100, 18)
        x.restore()
        hearts(x, t, 560, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 120, cell: 8, seed: 2 })
      }
      L(x, 800, 1130, 'PROS: 14. CONS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Scheduling the reply? | *Just say hi.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CAL, { R: RED, W: CREAM }, 800, 820, 26 * k)
      if (k > 0.5) {
        x.save(); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.fillText('REPLY: THU 9:00', 800, 850); x.restore()
        strikeLine(x, 680, 920, 840, clamp((lt - 0.8) / 0.3))
      }
      bubble(x, 800, 1060, 'hi :)', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 50, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Waiting for perfect timing? | *Now works too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 146, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 124 - 6, Math.sin(a) * 124 - 6, 12, 12) }
        const sp = lt < 1.3 ? lt * 14 : 1.3 * 14
        x.save(); x.rotate(sp); x.fillRect(-6, -110, 12, 110); x.restore()
        x.save(); x.rotate(sp / 12); x.fillStyle = RED; x.fillRect(-8, -76, 16, 76); x.restore()
        x.restore()
      }
      L(x, 800, 1100, 'TIMING: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Scared of seeming soft? | *Soft is strong.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [0, -1], star: { x: -60, y: 50, s: 280 }, hops: [1.0, 1.6],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const lift = ease.outCubic(clamp((lt - 0.6) / 0.5)) * 120
      drawBits(x, PILLOW, { P: PINK, W: '#ffd1e0' }, F.x, F.top - 40 - lift, 26 * k, { rot: 0.04 * Math.sin(t * 6) })
      L(x, 800, 640, 'WEIGHT: 40 KG', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.06, 34)
      L(x, 800, 1130, 'NEW PERSONAL BEST', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Waiting for them first? | *You can go first.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: '#ffffff', B: BROWN }, 790, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 5) })
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = BONE; x.fillRect(260, 1110, 560, 10); x.restore()
      bubble(x, 860, 640, 'ready, set…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 830, 1050, 'GO!', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, 0.05, 48)
    } },
  { sign: S, cap: 'Checked their sign first? | Fair. *Still send it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 820, 170 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: true })
      L(x, 800, 660, '♑︎ + ♋︎ = ?', pop01(t, P.t0 + 0.5, 0.3, 2.2), BONE, 0.03, 40)
      L(x, 800, 1040, 'COMPATIBILITY: CUTE', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Staring at “typing…”? | *Phone down. Live.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      if (lt < 1.0) phone(x, 800, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CHAT', headCol: ACC, lines: [['typing' + '.'.repeat(1 + Math.floor(lt * 6) % 3), GREY, 1]] })
      else {
        x.save(); x.fillStyle = INK; x.fillRect(680, 1060, 240, 40); x.fillStyle = '#2a2350'; x.fillRect(686, 1066, 228, 28); x.restore()
        drawBits(x, GRASS, { G: '#5fd068', D: BROWN }, 800, 1150, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
        ;[[690, 0.2], [790, 0.35], [890, 0.5]].forEach(([fx, d]) => drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, fx, 1060 - 40, 16 * pop01(t, P.t0 + 1.1 + d, 0.3, 2.4)))
        L(x, 800, 760, 'OUTSIDE: NICE', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
      }
    } },
  { sign: S, cap: 'Signing off “Regards”? | Try *“xo.”*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'TO: THEM', headCol: PINK, lines: [
        ['had fun!', BONE, 1, true],
        ['Best regards,', BONE, 1, true, clamp((lt - 0.7) / 0.3)],
        ['xo', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.4), true],
      ] })
      hearts(x, t, 820, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0327', key: 'F', accent: ACC, solo: 'capricorn', ending: 'card',
  title: 'Capricorn, before | you *send that text.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Boss on the outside. | *Softie inside.*', mood: 'heart' },
  lesson: { text: 'Your heart isn’t | a *rough draft.*', chip: 'TEXT: SENT' },
  last: { text: 'They replied *“xo.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
