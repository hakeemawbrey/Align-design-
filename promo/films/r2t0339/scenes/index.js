// r2t0339: star_talk, SOLO (cancer), "Being a Cancer | *be like.*" (signs3kit social cut, music: lofi · D).
// Ending: group (the group beat is the punchline: "Soft shell. | Softer heart.").
//   a friend sneezed, Cancer made soup · bought a houseplant, threw it a birthday · still has the receipt from your first
//   hangout · home by 9, blanket by 9:01 · mom said "call me", already calling · a hug that lasts a full minute
//   · one night away, three pillows · the group photo got deleted, Cancer has backups · you said you're fine, the tea's already on
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, clock, confetti, CUP, CUP_C, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const ACC = '#8fe3ff'
const POT = ['.KKKKKKKKK.', 'KRRRRRRRRRK', 'KRRRRRRRRRK', 'KRRWRRRRRRK', 'KRRRRRRRRRK', '.KRRRRRRRK.']
const POT_C = { K: INK, R: '#ff6b5a', W: '#fff' }
const PLANT = ['..GG.GG..', '.GGGGGGG.', 'GG.GGG.GG', '...GGG...', '....G....', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..']
const PLANT_C = { G: '#5fd068', T: '#c46a3a' }
const HAT = ['...Y...', '..YPY..', '.YYPYY.', 'YPYYYPY']
const HAT_C = { Y: GOLD, P: PINK }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const steam = (x, t, cx, cy) => { x.save(); x.fillStyle = 'rgba(239,230,214,0.75)'; for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillRect(cx - 40 + i * 36 + Math.sin(ph * 6 + i) * 8, cy - ph * 120, 12, 30) } x.restore() }

const S = 'cancer', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Friend sneezed once. | Cancer *made soup.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      drawBits(x, POT, POT_C, 800, 920, 24 * k)
      if (k > 0.8) { steam(x, t, 800, 820); L(x, 800, 930, 'SOUP', k, CREAM, 0.03, 34) }
      bubble(x, 560, 620, 'achoo', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 34, tail: 'bl', col: LAV })
      if (lt > 1.4) L(x, 800, 1100, 'SERVES 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Bought a houseplant. | *Threw it a birthday.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, HAT, HAT_C, 800, 770, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: 0.15 })
      if (lt > 1.1) { confetti(x, t, 800, 860, P.t0 + 1.1, { n: 14, spread: 180, h: 440 }); L(x, 800, 1110, 'HAPPY 1 WEEK!', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 34) }
    } },
  { sign: S, cap: 'Still has the receipt | from *your first hangout.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 300, 380, pop01(t, P.t0 + 0.25, 0.35, 2), 0.04, x => {
        x.fillStyle = GOLD; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#c98f2a'; x.fillRect(-130, -170, 260, 340); x.fillStyle = CREAM; x.fillRect(-90, -140, 180, 280)
        x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'
        ;['RECEIPT', '2 fries', '1 shake', '----', 'TOTAL $9', '', 'best day'].forEach((r, i) => x.fillText(r, 0, -110 + i * 36))
      }, GOLD)
      if (lt > 1.3) hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Home by 9. | *Blanket by 9:01.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P, F) {
      clock(x, 820, 720, 100, pop01(t, P.t0 + 0.2, 0.35, 2), 9, lt > 1.0 ? 1 : 0)
      // the blanket wraps the star up to its chin
      const w = ease.outCubic(prog(lt, 0.9, 1.4))
      if (w > 0.01) { x.save(); x.globalAlpha = w; x.fillStyle = INK; x.beginPath(); x.roundRect(F.x - 170, F.cy - 10, 340, 190, 40); x.fill(); x.fillStyle = '#b7a6ff'; x.beginPath(); x.roundRect(F.x - 162, F.cy - 2, 324, 176, 34); x.fill(); x.fillStyle = '#ffe7a8'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 130 + i * 80, F.cy + 40, 40, 40); x.restore() }
      if (lt > 1.6) L(x, 820, 1050, 'DO NOT DISTURB', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Mom texted “call me.” | *Already calling.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ring = Math.sin(t * 40) * 0.06 * (lt > 0.7 ? 1 : 0)
      phone(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: lt > 0.7 ? 'CALLING MOM…' : 'MOM', headCol: lt > 0.7 ? MINT : PINK, rot: 0.05 + ring, rows: [['call me', PINK, pop01(t, P.t0 + 0.35, 0.25, 2)]] })
      if (lt > 1.4) L(x, 800, 1120, 'PICKED UP: 0.2s', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Hugs you hello. | For *a full minute.*', mood: 'heart', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 760, 900, 260 * k, { mood: lt > 1.5 ? 'wide' : 'happy', look: [-1, 0], seed: 33, glyph: false })
      const s = Math.min(60, Math.floor(clamp((lt - 0.3) / 1.8) * 61))
      L(x, 780, 620, `HUG: 0:${String(s).padStart(2, '0')}`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.04, 38)
      hearts(x, t, 620, 820, P.t0 + 0.6, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'One night away. | *Packed three pillows.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = ['#ffe7a8', '#b7a6ff', '#8fe3ff']
      cols.forEach((c, i) => drawBits(x, PILLOW, { W: c }, 800, 1040 - i * 110, 22 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), { rot: (i - 1) * 0.06 }))
      if (lt > 1.6) L(x, 800, 620, '+ ONE MORE?', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: S, cap: 'Group photo got deleted? | Cancer *has backups.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.0) * 4)
      for (let i = 0; i < n; i++) card(x, 760 + i * 30, 820 + i * 30, 240, 190, 1, -0.08 + i * 0.05, x => { x.fillStyle = ['#ff8fb1', '#ffd23a', '#7dffb0', '#8fe3ff', '#c97bff'][i]; x.fillRect(-100, -80, 200, 130); x.fillStyle = INK; for (let j = 0; j < 3; j++) x.fillRect(-60 + j * 50, -20, 26, 26) })
      if (lt > 1.5) L(x, 800, 1110, 'BACKUP #400', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'You said you’re fine. | *The tea’s already on.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'i’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bc', col: LAV })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      drawBits(x, CUP, CUP_C, 800, 940, 22 * k)
      if (k > 0.8) steam(x, t, 790, 860)
      if (lt > 1.6) L(x, 800, 1110, 'SIT. TALK.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0339', key: 'D', accent: ACC, solo: 'cancer', ending: 'group',
  title: 'Being a Cancer | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Soft shell. | *Softer heart.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
