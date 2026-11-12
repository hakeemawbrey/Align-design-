// r2t0530: star_talk, SOLO, "Libras texting | *be like.*" (~53 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a Libra texting, every reply weighed to the extreme.
// Ending: lesson.
//   0.0–3.6    hook
//   3.6–37.8   "ok" became "okay!" · three drafts of "sure" · polled the group chat on how to reply · a seven-minute voice
//              note of pros and cons · replied in two business days · texted the dentist a heart · a match asked "where?",
//              Libra sent twelve options · mediated someone else's fight · typing… for forty minutes
//  37.8        "Every word | *weighed.*"
//  41.0        LESSON: "Slow replies? | *They care.*"  REPLY: WORTH IT
//  46.9        "Final answer: | *“sounds good!”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', ROSE = '#ff8fb1', ORANGE = '#ffb34a'

/** a phone: header strip + chat rows [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, rows = [], rot = 0.05, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk, right, strike], i) => {
    if (kk <= 0.01) return
    x.font = `800 ${size}px ${INTER}`; const w = Math.min(236, x.measureText(txt).width + 28)
    x.save(); x.translate(right ? 116 - w : -116, -80 + i * 70); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 14, 2)
    if (strike) { x.fillStyle = RED; x.fillRect(8, -3, w - 16, 6) }
    x.restore()
  })
  x.restore()
}
const dots = (t) => 'typing' + ['.', '..', '...'][Math.floor(t * 3) % 3]
const TOOTH = ['.WWWWWW.', 'WWWWWWWW', 'WWWWWWWW', 'WWWWWWWW', '.WWWWWW.', '.WW..WW.', '.WW..WW.', '..W..W..']
const SCALES = ['....GG....', '....GG....', 'GGGGGGGGGG', 'G...GG...G', 'G...GG...G', 'PPP.GG.PPP', 'PPP.GG.PPP', '....GG....', '..GGGGGG..']

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'Typed “ok.” | Deleted. *“Okay!”*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'DRAFT', rows: [
        ['ok.', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true, lt > 0.9], ['okay!', ROSE, pop01(t, P.t0 + 1.2, 0.25, 2.2), true], ['okay!! :)', MINT, pop01(t, P.t0 + 1.7, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Three drafts. | *For “sure.”*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 2)
      label(x, 790, 650, `DRAFT ${n} OF 3`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, ['sure', 'sure!', 'sure :) x'][n - 1], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 60, col: ROSE, tail: 'bl' })
      label(x, 790, 1100, 'VIBE CHECK…', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Polled the group chat | *on how to reply.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = LAV; x.fillRect(-162, -142, 324, 56); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('POLL: REPLY WITH?', 0, -114)
        const a = clamp((lt - 0.5) / 1.2)
        ;[['“haha”', 0.5 * a], ['“lol”', 0.5 * a], ['“HAHA”', 0.5 * a]].forEach(([s, v], i) => {
          const y = -40 + i * 64
          x.fillStyle = '#d8d0c0'; x.fillRect(-140, y - 22, 280, 44); x.fillStyle = MINT; x.fillRect(-140, y - 22, 280 * v, 44)
          x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.fillText(s, -126, y + 2)
        })
        x.restore()
      }
      label(x, 790, 1110, 'RESULT: A TIE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A seven-minute voice note. | *Pros and cons.*', mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-176, -56, 352, 112); x.fillStyle = ROSE; x.fillRect(-168, -48, 336, 96)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -24); x.lineTo(-140, 24); x.lineTo(-104, 0); x.fill()
        for (let i = 0; i < 16; i++) { const h = 10 + 30 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-84 + i * 15, -h / 2, 8, h) }
        x.restore()
      }
      label(x, 790, 960, '7:12', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 46, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TOPIC: PIZZA OR TACOS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replied fast. | *Two business days.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SEEN: TUESDAY', headCol: SLATE, rows: [
        ['you free fri?', BONE, 1, false], ['', 'rgba(0,0,0,0)', 0], ['yes!! (thurs)', ROSE, pop01(t, P.t0 + 1.2, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Texted the dentist | *a heart.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TOOTH, { W: CREAM }, 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 990, 'see you at 3 ♡', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: ROSE, tail: 'bl' })
      hearts(x, t, 800, 740, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Their match asked “where?” | *Twelve options.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(clamp((lt - 0.4) / 1.3) * 12))
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♎︎ YOUR MATCH', headCol: ROSE, rows: [
        ['where?', BONE, 1, false], [`option ${Math.max(1, n)}…`, MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
      ] })
      label(x, 790, 1120, `OPTIONS SENT: ${n}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mediated a fight | *in someone else’s chat.*', mood: 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCALES, { G: GOLD, P: ROSE }, 790, 830, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.08 })
      label(x, 790, 1060, 'BOTH SIDES: VALID', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Typing… | *for forty minutes.*', mood: lt => lt > 1.6 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 780, dots(t), pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 52, col: BONE, tail: 'bl' })
      const m = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 39)
      label(x, 790, 1040, `TYPING: ${m} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0530', key: 'F', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Libras texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Every word | *weighed.*', mood: 'sparkle' },
  lesson: { text: 'Slow replies? | *They care.*', chip: 'REPLY: WORTH IT' },
  last: {
    text: 'Final answer: | *“sounds good!”*',
    draw(x, t, lt) { bubble(x, 540, 1300, 'sounds good! ♡', pop01(t, t - lt + 0.9, 0.3, 2.2), { size: 52, col: ROSE, tail: 'bc' }); hearts(x, t, 540, 1240, t - lt + 1.1, { n: 8, life: 2, spread: 400, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
