// r2t0137: THE SIGNS AS… v3, SOLO film, "Aquarians keeping | a secret be like." (~43 s vertical, signs3kit, lofi · E)
// One Aquarius, nine cards, each the most extreme version of an Aquarius keeping a secret. Ending: 'group'.
//   0.0–3.6    "Aquarians keeping | a secret *be like.*"
//   3.6–37.8   told no one, told the moon · "what's new?" → black holes · password protected, 47 characters
//              · poker face, too poker · spilled it in Morse code · kept it three years, forgot it
//              · "what's your sign?" CLASSIFIED · time capsule, open in 2099 · their own birthday? also a secret
//  37.8        "Vault mode. | *Permanently.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aquarius', AQ = '#38c4ec', RED = '#e23d4e', WOOD = '#8a4a2e'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
const MOON = [
  '...MMMM...',
  '.MMMMMMMM.',
  'MMMmMMMMMM',
  'MMMMMMMmMM',
  'MMMMMMMMMM',
  'MMmMMMMMMM',
  'MMMMMMmMMM',
  '.MMMMMMMM.',
  '...MMMM...',
]
const PLANET = ['..PPPP..', '.PPPPPP.', 'RRRRRRRR', '.PPPPPP.', '..PPPP..']
const CAKE = [
  '.C..C..C.',
  '.F..F..F.',
  'WWWWWWWWW',
  'PPPPPPPPP',
  'WPWPWPWPW',
  'PPPPPPPPP',
  'BBBBBBBBB',
]
const BOX = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']

const CAMEOS = [
  { sign: S, cap: 'Told no one. | Told *the moon.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MOON, { M: '#efe6d6', m: '#c9bfae' }, 790, 720, 26 * k)
      bubble(x, 640, 1090, 'psst… | moon…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 850, 930, 'my lips | are sealed', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
    } },
  { sign: S, cap: '“So, what\'s new?” | *Black holes.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 800); x.rotate(t * 0.8); x.scale(k, k)
        for (let r = 6; r > 0; r--) { x.fillStyle = r % 2 ? '#6b62a8' : '#2a2350'; x.beginPath(); x.ellipse(0, 0, r * 26, r * 15, 0, 0, Math.PI * 2); x.fill() }
        x.fillStyle = '#000'; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      drawBits(x, PLANET, { P: PINK, R: GOLD }, 640, 640, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1060, 'TOPIC: CHANGED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: AQ, rot: -0.04 })
    } },
  { sign: S, cap: 'Password protected. | *47 characters.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 820, 330, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: '#fff4e2', head: 'SECRETS.TXT', headBg: INK, headInk: AQ, headSize: 28 })) {
        const n = Math.floor(clamp((lt - 0.4) / 1.3) * 47)
        x.fillStyle = INK
        for (let i = 0; i < n; i++) x.fillRect(-140 + (i % 10) * 29, -60 + Math.floor(i / 10) * 40, 18, 18)
        x.restore()
      }
      label(x, 790, 1080, 'STRENGTH: GALACTIC', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Poker face. | *Too* poker.', mood: 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 990, 200 * k, { mood: lt > 1.2 ? 'wide' : 'sparkle', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.3] })
      bubble(x, 790, 700, 'good news?? | BAD news??', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 370, 1110, 'EXPRESSION: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finally spilled it. | In *Morse code.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      const CODE = '·−−· ··· − ·−·−'
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * CODE.length)
      bubble(x, 740, 720, CODE.slice(0, Math.max(1, n)), pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', font: MONO, weight: 700 })
      label(x, 790, 960, 'NOBODY KNOWS MORSE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
      notes(x, t, 600, 1130, { n: 3, cell: 6, col: AQ, seed: 2, alpha: clamp(lt - 0.3) })
    } },
  { sign: S, cap: 'Kept it three years. | *Forgot* what it was.', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: lt => lt > 1.4 ? [0, -1] : [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(2, Math.floor(clamp((lt - 0.2) / 1.0) * 3))
      if (sheet(x, 790, 820, 260, 260, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.05, bg: '#fff4e2', head: 'YEAR', headBg: AQ, headInk: INK })) {
        x.fillStyle = INK; x.font = `800 130px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n + 1), 0, 40)
        x.restore()
      }
      bubble(x, 790, 1070, 'wait… what | was it?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: '“What\'s your sign?” | *Classified.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (sheet(x, 790, 830, 280, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#2a2350' })) {
        x.fillStyle = '#140c30'; x.fillRect(-120, -160, 240, 200)
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SIGN:', 0, 90)
        x.restore()
        signChar(x, t, S, 790, 760, 140, { mood: 'neutral', seed: 52, glyph: false, glow: 0.7 })
      }
      const k = pop01(t, P.t0 + 1.2, 0.3, 2.6)
      if (k > 0.01) label(x, 790, 940, 'CLASSIFIED', k, { size: 44, bg: RED, color: '#fff4e2', rot: -0.12, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Buried it in | a *time capsule.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.6],
    back(x, t, lt, P) {
      x.fillStyle = WOOD; x.fillRect(560, 1050, 420, 150); x.fillStyle = '#6b3820'; x.fillRect(560, 1050, 420, 20)
    },
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.5, 1.3))
      x.save(); x.beginPath(); x.rect(500, 400, 520, 660); x.clip()
      drawBits(x, BOX, { K: '#2a2350', W: '#9aa5c4' }, 790, lerp(860, 1110, d), 22)
      x.restore()
      label(x, 790, 700, 'OPEN IN 2099', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their own birthday? | Also a *secret.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, { C: GOLD, F: '#ff9a4a', W: '#fff4e2', P: PINK, B: WOOD }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'HAPPY ??? DAY', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 38, bg: AQ, rot: -0.05 })
      bubble(x, 790, 1080, 'how old? | no comment.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0137', key: 'E', accent: AQ, solo: S, ending: 'group',
  title: 'Aquarians keeping | a secret *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Vault mode. | *Permanently.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
