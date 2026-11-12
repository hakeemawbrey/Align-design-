// r2t0697: star_talk, BELIKE, "Printer jammed? | Zodiacs be like." (signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of itself vs one jammed office printer. Ending: callback.
//   ♈ fought it (round 3) · ♉ brought snacks to wait it out · ♊ started a group chat about it · ♋ tucked it in with a
//   blanket · ♌ it jammed on forty selfies · ♍ cleaned it, spotless, still jammed · ♎ unplug? restart? · ♏ stared at it
//   until it gave the page back · ♐ moved abroad instead · ♑ fixed it, now runs IT · ♒ built a new printer
//   · ♓ it jammed on their love letter, cried with it
//   group "One printer. | *Twelve meltdowns.*"   last "Printer: 1. | Aries: *“Rematch.”*" (card 1's glove comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, bits, soap, RED, CREAM, STEEL, PLUM, clamp, ease, prog, lerp } from './props.js'

const ST = { x: -200 }
/** a pixel office printer with a crumpled page stuck in its mouth (jam 0…1), shaking when shake > 0 */
function printer(x, t, cx, cy, k, { jam = 1, shake = 0, page = 'ERROR', paperOut = 0, cover = null } = {}) {
  if (k <= 0.01) return
  const sx = shake ? Math.sin(t * 46) * 6 * shake : 0
  x.save(); x.translate(cx + sx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -70, 300, 190)
  x.fillStyle = INK; x.fillRect(-158, -92, 316, 196)
  x.fillStyle = '#d8dbe8'; x.fillRect(-150, -84, 300, 180)
  x.fillStyle = '#b4b9cc'; x.fillRect(-150, 40, 300, 56)
  x.fillStyle = INK; x.fillRect(-110, -12, 220, 18)
  x.fillStyle = '#2a2350'; x.fillRect(70, -64, 60, 34)
  x.fillStyle = jam > 0.5 ? RED : MINT; x.fillRect(84, -56, 14, 14)
  x.fillStyle = '#9fffcf'; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillRect(-130, -70, 170, 40); x.fillStyle = jam > 0.5 ? '#ff8a8a' : '#9fffcf'; x.fillText(page, -45, -50)
  // the stuck (or released) page
  if (jam > 0.01) {
    x.save(); x.translate(0, -4); x.rotate(-0.12)
    x.fillStyle = INK; x.fillRect(-56, -64, 112, 70); x.fillStyle = '#ffffff'; x.fillRect(-50, -58, 100, 60)
    x.fillStyle = STEEL; for (let i = 0; i < 3; i++) x.fillRect(-36 + (i % 2) * 8, -46 + i * 14, 64, 5)
    x.fillStyle = '#c9cce0'; x.beginPath(); x.moveTo(-50, -58); x.lineTo(-20, -30); x.lineTo(-50, -10); x.fill()
    x.restore()
  }
  if (paperOut > 0.01) { x.fillStyle = INK; x.fillRect(-60, 60, 120, 20 + 120 * paperOut); x.fillStyle = '#ffffff'; x.fillRect(-54, 60, 108, 14 + 120 * paperOut) }
  if (cover) cover(x)
  x.restore()
}
const GLOVE = ['..RRRRR..', '.RRRRRRR.', 'RRRRRRRRR', 'RWRRRRRRR', 'RRRRRRRRR', 'RRRRRRRR.', '.RRRRRR..', '.WWWWWW..', '.WWWWWW..']
const GLOVE_C = { R: RED, W: CREAM }

const CAMEOS = [
  { sign: 'aries', cap: 'Printer jammed. | Aries *fought it.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      printer(x, t, 790, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { shake: lt > 0.7 ? 1 : 0 })
      const punch = Math.max(0, Math.sin(t * 10)) * 50
      drawBits(x, GLOVE, GLOVE_C, 520 + punch, 860, 13 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.2 })
      L(x, 790, 680, `ROUND ${1 + Math.floor(clamp((lt - 0.5) / 1.4) * 4)}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Printer jammed. | Taurus *brought snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      printer(x, t, 800, 820, 0.8 * pop01(t, P.t0 + 0.15, 0.3, 2), {})
      bits(x, 'SANDWICH', 470, 1020, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.08 })
      L(x, 790, 1110, 'WAITING IT OUT', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Printer jammed. | Gemini *started a group chat.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 3 + Math.floor(clamp((lt - 0.3) / 1.5) * 40)
      phone(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `PRINTER DRAMA (${n})`, headCol: '#ffd23a', size: 24, lines: [
        ['it JAMMED', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['no WAY', MINT, pop01(t, P.t0 + 0.9, 0.25, 2), false], ['spill.', PINK, pop01(t, P.t0 + 1.3, 0.25, 2), false]] })
    } },
  { sign: 'cancer', cap: 'Printer jammed. | Cancer *tucked it in.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const b = clamp((lt - 0.6) / 0.6)
      printer(x, t, 790, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { cover: b > 0 ? xx => drawBits(xx, ['LLLLLLLLLLLLLLLL', 'LPLLPLLPLLPLLPLL', 'LLLLLLLLLLLLLLLL', 'LLPLLPLLPLLPLLPL'], { L: LAV, P: PINK }, 0, lerp(-140, 30, ease.outCubic(b)), 20, { alpha: b }) : null })
      bubble(x, 790, 650, 'rest, buddy', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 380, 820, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: 'leo', cap: 'It jammed on | *forty selfies.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      printer(x, t, 790, 980, 0.85 * pop01(t, P.t0 + 0.15, 0.3, 2), { page: 'COPY 40/40' })
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.5 + i * 0.25, 0.3, 2)
        if (k < 0.01) continue
        x.save(); x.translate(700 + i * 90, 700 - (i % 2) * 30); x.rotate((i - 1) * 0.12); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-46, -56, 92, 112); x.fillStyle = '#ffffff'; x.fillRect(-40, -50, 80, 100); x.fillStyle = '#ffe7a8'; x.fillRect(-34, -44, 68, 70)
        x.restore()
        signChar(x, t, 'leo', 700 + i * 90, 690 - (i % 2) * 30, 64 * k, { mood: 'wink', glyph: false, seed: 50 + i, glow: 0.5 })
      }
      L(x, 790, 1150, 'NEW PROFILE PICS', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Cleaned the whole printer. | *Still jammed.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      printer(x, t, 790, 900, pop01(t, P.t0 + 0.15, 0.3, 2), {})
      if (lt < 1.4) soap(x, t, 790, 980, { n: 7, spread: 280, r: 24, h: 260 })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 7, 180, 0.3)
      L(x, 790, 680, lt < 1.4 ? 'SPOTLESS ✓' : 'STILL JAMMED', 1, lt < 1.4 ? MINT : RED, 0.05, 36)
    } },
  { sign: 'libra', cap: 'Unplug it? Restart it? | *Forty minutes later…*', mood: 'neutral', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      printer(x, t, 790, 920, 0.9 * pop01(t, P.t0 + 0.15, 0.3, 2), {})
      const sw = Math.floor(lt * 3) % 2
      L(x, 690, 680, 'UNPLUG?', 1 * pop01(t, P.t0 + 0.4, 0.3, 2), sw ? LAV : STEEL, -0.06, 34)
      L(x, 880, 740, 'RESTART?', 1 * pop01(t, P.t0 + 0.7, 0.3, 2), sw ? STEEL : PINK, 0.06, 34)
    } },
  { sign: 'scorpio', cap: 'Stared at the printer | until it *gave it back.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const out = clamp((lt - 1.3) / 0.6)
      printer(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { jam: 1 - out, shake: lt > 0.6 && lt < 1.3 ? 1 : 0, paperOut: out, page: out > 0.5 ? 'SORRY.' : 'ERROR' })
      if (out > 0.5) L(x, 790, 640, 'IT FOLDED', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.05, 36)
    } },
  { sign: 'sagittarius', cap: 'Printer jammed. | Sag *moved abroad.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      printer(x, t, 800, 1030, 0.7 * pop01(t, P.t0 + 0.15, 0.3, 2), {})
      const f = clamp((lt - 0.6) / 1.4)
      bits(x, 'PLANE', lerp(560, 900, f), lerp(800, 620, f), 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.4 })
      L(x, 760, 820, 'ONE WAY ✈', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Fixed the printer. | *Now runs IT.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      printer(x, t, 790, 920, pop01(t, P.t0 + 0.15, 0.3, 2), { jam: lt > 1.0 ? 0 : 1, page: lt > 1.0 ? 'READY' : 'ERROR' })
      bits(x, 'WRENCH', 520, 820, 13 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: Math.sin(t * 8) * 0.3 })
      L(x, 790, 690, 'PROMOTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.05, 40)
    } },
  { sign: 'aquarius', cap: 'Printer jammed. | Aquarius *built a new one.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 790, 880, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 3) * 0.05 })
      L(x, 790, 1110, 'PRINTS IN 3D. ONLY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 30)
      sparkles(x, t, 790, 880, P.t0 + 0.9, 6, 170, 0.2)
    } },
  { sign: 'pisces', cap: 'It jammed on their | *love letter.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      printer(x, t, 790, 940, pop01(t, P.t0 + 0.15, 0.3, 2), { page: 'LOVE.DOC' })
      bubble(x, 790, 660, 'we’re both | stuck…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0697', key: 'E', accent: '#ff8a5a', ending: 'callback',
  title: 'Printer jammed? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One printer. | *Twelve meltdowns.*' },
  last: {
    text: 'Printer: 1. | Aries: *“Rematch.”*',
    draw(x, t, lt) {
      printer(x, t, 740, 1150, 1.3 * pop01(t, t - lt + 0.3, 0.35, 2), { page: 'ERROR' })
      const k = pop01(t, t - lt + 0.6, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 330, 1110, 300 * k, { mood: 'squint', look: [1, 0], seed: 40, hops: [t - lt + 1.0, t - lt + 1.4, t - lt + 1.8] })
      drawBits(x, GLOVE, GLOVE_C, 480 + Math.max(0, Math.sin(t * 9)) * 40, 1070, 15 * k, { rot: -0.2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
