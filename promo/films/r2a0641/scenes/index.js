// r2a0641: star_advice, ADVICE SOLO, "How to thank | a Pisces." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Pisces truth + a warm way to say thank you,
// one gag each. Pisces cries (happy tears) in every card. Ending: callback.
//   0.0–3.6    "How to thank | *a Pisces.*"  One big Pisces pops in (already a little teary).
//   3.6–37.8   a handwritten note goes in the keepsake box · say it out loud · name the little thing they did
//              · make them a playlist (a FOR YOU tape) · skip the big gift, give your time · "it was nothing" (it wasn't)
//              · text them later, they'll reread it fourteen times · draw them something, stick figures count
//              · a hug works, bring tissues
//  37.8        "Big heart. | *Bigger thanks.*"  Pisces comes back, big.
//  41.2        callback: "The stick figure? | *Still on the fridge.*"  The drawing comes back under a heart magnet.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#8f88ff', CREAM = '#fff4e2', RED = '#e23d4e'
const S = 'pisces'

// ── props
const TAPE = [
  'KKKKKKKKKKKKKKKK',
  'KPPPPPPPPPPPPPPK',
  'KPBBBBBBBBBBBBPK',
  'KPBWWWWWWWWWWBPK',
  'KPBWKKWWWWKKWBPK',
  'KPBWKKWWWWKKWBPK',
  'KPBWWWWWWWWWWBPK',
  'KPBBBBBBBBBBBBPK',
  'KPPPPKKKKKKPPPPK',
  'KKKKKKKKKKKKKKKK',
]
const TAPE_C = { K: INK, P: SEA, B: '#2a2350', W: CREAM }
const GLASS = [
  'KKKKKKKKK',
  '.GGGGGGG.',
  '..GSSSG..',
  '...GSG...',
  '....S....',
  '...GSG...',
  '..GSSSG..',
  '.GSSSSSG.',
  'KKKKKKKKK',
]
const GLASS_C = { K: '#8a4a2e', G: SKYB, S: GOLD }
const TISSUE = [
  '.....WW.....',
  '....WWWW....',
  '...WWWWWW...',
  'BBBBBWWBBBBB',
  'BbbbbbbbbbbB',
  'BbHbbbbbbHbB',
  'BbbbbbbbbbbB',
  'BBBBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: SEA, b: LAV, H: PINK }
const MAGNET = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// a handwritten note card
function note(x, cx, cy, k, rot = -0.06) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -96, 290, 200)
  x.fillStyle = INK; x.fillRect(-150, -106, 300, 212)
  x.fillStyle = CREAM; x.fillRect(-144, -100, 288, 200)
  x.fillStyle = '#7a5cc0'; x.font = `italic 600 46px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('thank you', 0, -26); x.fillStyle = PINK; x.font = `800 44px ${INTER}`; x.fillText('♡', 0, 40)
  x.restore()
}
// a keepsake box with a lid
function box(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -60, 280, 150); x.fillStyle = '#c98f2a'; x.fillRect(-132, -52, 264, 134)
  x.fillStyle = '#a8701a'; x.fillRect(-132, 10, 264, 8)
  x.save(); x.translate(-140, -60); x.rotate(-1.1 * open)
  x.fillStyle = INK; x.fillRect(-6, -40, 292, 46); x.fillStyle = '#e0a83a'; x.fillRect(0, -34, 280, 34)
  x.restore()
  x.restore()
}
// a phone with one message and a read counter
function phone(x, cx, cy, k, { head, msg, foot }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  x.font = `800 26px ${INTER}`
  msg.forEach((m, i) => { const w = x.measureText(m).width + 30; x.fillStyle = BONE; x.fillRect(-w / 2 - 10, -60 + i * 50 - 22, w, 44); x.fillStyle = INK; x.fillText(m, -10, -60 + i * 50 + 2) })
  if (foot) { x.fillStyle = PINK; x.font = `700 22px ${MONO}`; x.fillText(foot, 0, 120) }
  x.restore()
}
// a sheet of paper with a wobbly stick-figure star drawn on it
function drawing(x, cx, cy, k, rot = 0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-126, -150, 262, 320)
  x.fillStyle = INK; x.fillRect(-136, -160, 272, 320)
  x.fillStyle = '#ffffff'; x.fillRect(-130, -154, 260, 308)
  x.strokeStyle = '#7a5cc0'; x.lineWidth = 7; x.lineJoin = 'round'; x.lineCap = 'round'
  x.beginPath()
  for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 36 : 82, w = Math.sin(i * 3.1) * 5; const px = Math.cos(a) * r + w, py = -40 + Math.sin(a) * r; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke()
  // stick arms and legs
  x.beginPath(); x.moveTo(-30, 20); x.lineTo(-46, 96); x.moveTo(30, 20); x.lineTo(48, 96); x.stroke()
  x.fillStyle = '#7a5cc0'; x.beginPath(); x.arc(-16, -44, 6, 0, Math.PI * 2); x.arc(16, -44, 6, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.arc(0, -26, 14, 0.2, Math.PI - 0.2); x.stroke()
  x.fillStyle = PINK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('u r the best', 0, 126)
  x.restore()
}

const TEARS = lt => lt > 1.2 ? 2 : 1
const CAMEOS = [
  { sign: S, cap: 'Write it down. | *They’ll keep it forever.*', mood: 'heart', tears: TEARS, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const drop = ease.inOutCubic(prog(lt, 1.0, 1.5))
      box(x, 790, 1060, pop01(t, P.t0 + 0.6, 0.3, 2), 1 - drop * 0.9)
      note(x, 790, lerp(760, 960, drop), pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - 0.6 * drop))
      label(x, 790, 610, 'FILED: KEEPSAKE', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say it out loud. | *They need to hear it.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you really | helped me.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1060, 'TEARS: HAPPY ONES', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 30, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Name the little thing. | *It meant everything.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', tears: TEARS, look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'thanks for | the snacks', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 960, 'YOU | REMEMBERED?!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 46, col: LAV, tail: 'bl' })
      hearts(x, t, 560, 980, P.t0 + 1.3, { n: 5, life: 1.8, spread: 90, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Make them a playlist. | *Happy tears, guaranteed.*', mood: 'heart', tears: lt => lt > 1.2 ? 3 : 1, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TAPE, TAPE_C, 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 700, 'FOR YOU ♡', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'TRACK 1: SOBBING', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip the big gift. | *Give your time.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: TEARS, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(lt * 2) * 0.05 })
      label(x, 790, 640, 'ONE WHOLE AFTERNOON', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'BEST GIFT EVER', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“It was nothing!” | *It wasn’t.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', tears: TEARS, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'oh, it was | nothing!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 960, 'IT WAS SOMETHING', pop01(t, P.t0 + 1.2, 0.25, 2.8), { size: 36, bg: GOLD, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text it later too. | *They’ll reread it.*', mood: 'heart', tears: TEARS, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = Math.min(14, 1 + Math.floor(Math.max(0, lt - 0.7) / 0.1))
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', msg: ['thank you', 'again ♡'], foot: `READ ×${n}` })
    } },
  { sign: S, cap: 'Draw them something. | *Stick figures count.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 3 : 1, look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawing(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'A MASTERPIECE', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A hug works. | *Bring tissues.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 660, 'HUG: ACCEPTED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 540, 1000, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0641', key: 'D', accent: SEA, solo: S, ending: 'callback',
  title: 'How to thank | *a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger thanks.*', mood: 'heart' },
  last: {
    text: 'The stick figure? | *Still on the fridge.*',
    draw(x, t, lt) {
      const t0 = t - lt
      // the fridge door, the drawing, and a heart magnet holding it up
      const k = pop01(t, t0 + 0.4, 0.4, 1.8)
      if (k > 0.01) {
        x.save(); x.translate(540, 1080); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-230, -330, 460, 640); x.fillStyle = '#dfe6f2'; x.fillRect(-220, -320, 440, 620)
        x.fillStyle = '#9aa5c4'; x.fillRect(170, -200, 18, 160)
        x.restore()
      }
      drawing(x, 520, 1050, pop01(t, t0 + 0.8, 0.35, 2) * 0.9, -0.04)
      drawBits(x, MAGNET, { H: '#ff4f86', W: '#fff' }, 520, 900, 9 * pop01(t, t0 + 1.2, 0.3, 2.6))
      label(x, 540, 1440, 'ON DISPLAY: FOREVER', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 860, t0 + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
