// r2t0498: star_talk, ROLLCALL, "The signs writing | *holiday cards.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order writing holiday cards, each pushed to the extreme. Ending: callback.
//   ♈ sent them all in October · ♉ bought fancy paper, kept it · ♊ wrote two drafts, sent both · ♋ every card a
//   twelve-page letter · ♌ the card photo: just Leo · ♍ corrected the cards they got · ♎ still choosing the font
//   · ♏ sealed with wax, signed "you know who" · ♐ sent from abroad, no return address · ♑ a spreadsheet of who
//   gets one · ♒ mailed one to the moon · ♓ signed card one, sobbed
//   group "Signed, sealed, | *dramatic.*"   last "Taurus finally | *used the paper.*" (the fancy paper, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#2fc79a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function card(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const TREE = ['....Y....', '...GGG...', '..GGRGG..', '.GGGGGGG.', '..GGGGG..', '.GGRGGGG.', 'GGGGGGGRG', '....B....']
const TREE_C = { Y: GOLD, G: GREEN, R: RED, B: BROWN }
const MOON = ['...MMMM..', '..MMMMMM.', '.MMMmMMMM', '.MMMMMMMM', '.MMMMMmMM', '.MMmMMMMM', '..MMMMMM.', '...MMMM..']
const SEAL = ['.RRRRR.', 'RRRRRRR', 'RRWRWRR', 'RRRWRRR', 'RRWRWRR', 'RRRRRRR', '.RRRRR.']

const CAMEOS = [
  { sign: 'aries', cap: 'Sent them all. | *In October.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 5))
      for (let i = 0; i < n; i++) card(x, 760 + i * 24, 880 - i * 30, 220, 150, 1, -0.1 + i * 0.05, () => { drawBits(x, TREE, TREE_C, 0, 0, 10) })
      L(x, 790, 640, 'SENT: OCT 2', pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 40)
      L(x, 790, 1120, 'HALLOWEEN: NOT YET', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Bought the fancy paper. | *Kept it.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 320, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        x.fillStyle = '#c98f2a'; x.fillRect(-110, -140, 220, 280); x.fillStyle = GOLD; x.fillRect(-96, -126, 192, 252)
        x.fillStyle = CREAM; x.font = `700 28px ${MONO}`; x.fillText('✦ ✦ ✦', 0, 0)
      }, GOLD)
      L(x, 790, 640, '$$$', pop01(t, P.t0 + 0.5, 0.3, 2.2), MINT, 0.05, 40)
      L(x, 790, 1110, 'TOO NICE TO USE', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, -0.04, 32)
      sparkles(x, t, 790, 860, P.t0 + 0.6, 7, 180, 0.3)
    } },
  { sign: 'gemini', cap: 'Wrote two drafts. | *Sent both.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 700, 860, 200, 260, k, -0.08, () => { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('love you!', 0, -10); x.font = `700 22px ${MONO}`; x.fillText('DRAFT 1', 0, 80) })
      card(x, 890, 860, 200, 260, pop01(t, P.t0 + 0.6, 0.3, 2), 0.08, () => { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('who’s this?', 0, -10); x.font = `700 22px ${MONO}`; x.fillText('DRAFT 2', 0, 80) })
      L(x, 790, 1110, 'MAILED: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Every card is a letter. | *Twelve pages.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 12))
      for (let i = 0; i < n; i++) card(x, 790 + (i % 2 ? 8 : -8), 1050 - i * 26, 240, 80, 1, (i % 3 - 1) * 0.04, () => { x.fillStyle = '#c9b8e8'; for (let j = 0; j < 3; j++) x.fillRect(-100, -20 + j * 18, 200, 3) })
      L(x, 790, 640, `PAGE ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), PINK, 0.05, 40)
    } },
  { sign: 'leo', cap: 'The family card photo? | *Just Leo.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 860, 280, 340, k, 0.05, () => { x.fillStyle = '#ffb34a'; x.fillRect(-120, -150, 240, 240); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('HAPPY HOLIDAYS', 0, 130) })
      if (k > 0.5) signChar(x, t, 'leo', 790, 830, 170, { mood: 'wink', seed: 51, glyph: false, glow: 0.5 })
      L(x, 790, 640, 'FAMILY: CROPPED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: 'virgo', cap: 'Corrected the cards | *they received.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 220, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('Happy Holiday’s!', 0, -20)
        if (lt > 0.8) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(86, -34, 20, 0, Math.PI * 2); x.stroke() }
        if (lt > 1.2) { x.fillStyle = RED; x.font = `700 26px ${MONO}`; x.fillText('see me.', 60, 60) }
      })
      L(x, 790, 1110, 'MAILED IT BACK', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Still choosing | *the font.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const F = [`800 60px ${INTER}`, `italic 500 70px ${SERIF}`, `700 56px ${MONO}`, `italic 800 60px ${INTER}`]
      card(x, 790, 860, 300, 220, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => { x.fillStyle = INK; x.font = F[Math.floor(lt * 2.5) % 4]; x.fillText('Joy', 0, 0) })
      L(x, 790, 650, `FONT ${1 + Math.floor(lt * 2.5) % 4 + Math.floor(lt * 6)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, 0.05, 36)
      L(x, 790, 1100, 'DEC 31. STILL.', pop01(t, P.t0 + 1.7, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Sealed it with wax. | Signed *“you know who.”*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 200, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#e6dccb'; x.beginPath(); x.moveTo(-150, -100); x.lineTo(0, 10); x.lineTo(150, -100); x.closePath(); x.fill()
        x.strokeStyle = INK; x.lineWidth = 4; x.stroke()
      })
      drawBits(x, SEAL, { R: '#b0203a', W: '#ff8fa0' }, 790, 870, 14 * pop01(t, P.t0 + 0.8, 0.35, 2.6))
      L(x, 790, 1100, 'FROM: ???', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Sent from abroad. | *No return address.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 220, pop01(t, P.t0 + 0.15, 0.3, 2), -0.05, () => {
        x.fillStyle = SKYB; x.fillRect(-150, -100, 140, 200); x.fillStyle = GOLD; x.beginPath(); x.arc(-80, -20, 30, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText('wish u were', 0, -30); x.fillText('here! xo', 0, 6)
        for (let i = 0; i < 3; i++) { x.fillStyle = [PINK, MINT, GOLD][i]; x.fillRect(40 + i * 36, -90, 30, 34) }
      })
      L(x, 790, 1100, 'WHERE ARE THEY?', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Made a spreadsheet. | *Who earned a card.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 300, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 2
        for (let i = 0; i <= 5; i++) { x.beginPath(); x.moveTo(-150, -140 + i * 56); x.lineTo(150, -140 + i * 56); x.stroke() }
        x.beginPath(); x.moveTo(40, -140); x.lineTo(40, 140); x.stroke()
        x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'left'
        const R = [['mom', '✓'], ['boss', '✓'], ['ex', '✗'], ['Gemini', '?'], ['dentist', '✓']]
        R.forEach(([a, b], i) => { if (lt > 0.4 + i * 0.25) { x.fillStyle = INK; x.fillText(a, -136, -112 + i * 56); x.fillStyle = b === '✓' ? GREEN : RED; x.fillText(b, 76, -112 + i * 56) } })
      })
      L(x, 790, 1110, 'ROI: STRONG', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Mailed one | *to the moon.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#e6e0c8', m: '#b9b0a0' }, 840, 640, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const p = prog(lt, 0.5, 2.0)
      card(x, lerp(640, 820, p), lerp(1050, 720, p), 120, 80, pop01(t, P.t0 + 0.4, 0.3, 2) * (1 - 0.5 * p), -0.2 + p, () => { x.fillStyle = PINK; x.fillRect(20, -30, 30, 26) })
      L(x, 790, 1120, 'POSTAGE: A LOT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Signed card one. | *Sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 300, pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, () => {
        x.fillStyle = INK; x.font = `italic 500 44px ${SERIF}`; x.fillText('love,', 0, -30); x.fillText('Pisces', 0, 30)
        x.fillStyle = 'rgba(143,227,255,0.6)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(-60 + i * 40, 90 + (i % 2) * 20, 14, 0, Math.PI * 2); x.fill() }
      })
      L(x, 790, 640, 'CARDS LEFT: 39', pop01(t, P.t0 + 1.1, 0.3, 2.4), SKYB, 0.05, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0498', key: 'G', accent: ACC,
  title: 'The signs writing | *holiday cards.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Signed, sealed, | *dramatic.*' },
  last: {
    text: 'Taurus finally | *used the paper.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      card(x, 540, 1050, 300, 360, k, -0.04, () => {
        x.fillStyle = '#c98f2a'; x.fillRect(-130, -160, 260, 320); x.fillStyle = GOLD; x.fillRect(-116, -146, 232, 292)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('for you.', 0, -30); x.font = `700 24px ${MONO}`; x.fillText('(only you)', 0, 30)
      }, GOLD)
      if (k > 0.5) signChar(x, t, 'taurus', 290, 1180, 250, { mood: 'heart', seed: 8, glyph: false })
      sparkles(x, t, 540, 1050, t - lt + 1.0, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
