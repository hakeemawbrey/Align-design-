// r2a0245: star_advice, ADVICE ROLLCALL, "Each sign’s | perfect cup of tea." (~62 s vertical, signs3kit social cut,
// music: lofi · G). Twelve signs, one warm, specific line each with a light visual gag. Ending: lesson.
//   0.0–3.6    "Each sign’s | *perfect cup of tea.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one cup per sign (3.8 s each):
//              ♈ ginger, bold like you · ♉ chai with a biscuit (or four) · ♊ two teabags, both moods covered
//              · ♋ grandma's recipe, tastes like home · ♌ golden turmeric, naturally · ♍ steeped exactly three minutes
//              · ♎ rose tea in the pretty cup · ♏ dark and strong, deep talks only · ♐ a tin from the last adventure
//              · ♑ plain black tea, you earned the break · ♒ a blend nobody's heard of · ♓ chamomile and a good cry
//  49.2        "Twelve cups. | *One cozy table.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Make yourself a cup. | You *deserve the pause.*"  STATUS: COZY
//  58.3        "Taurus wants | *another biscuit.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, mug, clock, CREAM, RED, ORANGE, SUN, GREY, WOOD, BROWN, GREEN, TEAL, clamp, prog, lerp, ease } from './props.js'

const ACC = '#9fe0a0'
const BISCUIT = ['.BBBBBB.', 'BBbBBbBB', 'BBBBBBBB', 'BbBBbBBB', '.BBBBBB.']
const TEABAG = ['..S..', '..S..', '..S..', 'BBBBB', 'BBBBB', 'BBBBB', 'BBBBB']
const ROSE = ['.RRR.', 'RRrRR', 'RrRrR', '.RRR.', '..G..', '.GG..', '..G..']

// a teacup on a saucer
function teacup(x, t, cx, cy, k, { col = CREAM, tea = '#c98f2a', steam = true, text, textCol = INK, size = 30, pattern } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 70, 150, 26, 0, 0, 7); x.fill(); x.fillStyle = col; x.beginPath(); x.ellipse(0, 66, 142, 20, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.fillRect(84, -40, 50, 70); x.fillStyle = col; x.fillRect(90, -32, 36, 54); x.fillStyle = INK; x.fillRect(90, -20, 22, 30)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-106, -66); x.lineTo(106, -66); x.lineTo(80, 64); x.lineTo(-80, 64); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-98, -60); x.lineTo(98, -60); x.lineTo(74, 58); x.lineTo(-74, 58); x.fill()
  x.fillStyle = tea; x.fillRect(-94, -60, 188, 16)
  if (pattern) { x.fillStyle = pattern; for (let i = 0; i < 4; i++) x.fillRect(-60 + i * 36, 30, 16, 16) }
  if (text) txt(x, text, 0, -6, { size, color: textCol, font: MONO, weight: 700 })
  if (steam) {
    x.fillStyle = 'rgba(239,230,214,0.75)'
    for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) {
      const ph = ((t * 0.7 + j / 5 + i * 0.3) % 1)
      x.globalAlpha = Math.sin(Math.PI * ph) * 0.8
      x.fillRect(-36 + i * 36 + Math.sin(ph * 6 + i) * 10 - 6, -86 - ph * 110, 12, 12)
    }
    x.globalAlpha = 1
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ginger tea. | Bold, *like you.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      teacup(x, t, 780, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#ffd0c4', tea: '#e8a24a', text: 'HOT', textCol: RED })
      label(x, 790, 1070, 'SPICE LEVEL: YES', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: ORANGE })
    } },
  { sign: 'taurus', cap: 'Chai with a biscuit. | *Or four.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      teacup(x, t, 760, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { col: CREAM, tea: '#c98f5a' })
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.5) / 0.3) + 1)
      for (let i = 0; i < n; i++) drawBits(x, BISCUIT, { B: '#e8b06a', b: BROWN }, 880, 700 - i * 52 + 80, 11)
      label(x, 790, 1080, 'DUNKING: SERIOUS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: SUN })
    } },
  { sign: 'gemini', cap: 'Two teabags. | *Both moods covered.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      teacup(x, t, 780, 940, pop01(t, P.t0 + 0.2, 0.35, 2), { col: SUN, tea: '#c98f2a' })
      drawBits(x, TEABAG, { S: BONE, B: MINT }, 730, 760 + Math.sin(t * 4) * 10, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      drawBits(x, TEABAG, { S: BONE, B: PINK }, 830, 760 + Math.cos(t * 4) * 10, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 730, 650, 'CALM', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 28, bg: MINT, font: MONO, weight: 700 })
      label(x, 860, 650, 'CHAOS', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Grandma’s recipe. | *Tastes like home.*', mood: 'heart', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      teacup(x, t, 780, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#c8f0ff', pattern: PINK })
      card(x, 790, 680, 260, 120, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => { txt(x, 'NANA’S TEA', 0, -26, { size: 26, font: MONO, weight: 700 }); txt(x, '+ a hug', 0, 24, { size: 30, color: RED }) })
    } },
  { sign: 'leo', cap: 'Golden turmeric. | *Naturally.*', mood: 'sparkle', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      teacup(x, t, 780, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { col: GOLD, tea: '#ffb34a', text: '♌︎', size: 44 })
      sparkles(x, t, 780, 880, P.t0 + 0.9, 8, 180, 0.2)
      label(x, 790, 680, 'GLOWING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD })
    } },
  { sign: 'virgo', cap: 'Steeped exactly | *three minutes.*', mood: 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      teacup(x, t, 760, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#e6f7e6', steam: false })
      const s = Math.min(180, Math.floor(clamp((lt - 0.3) / 1.5) * 180))
      label(x, 790, 680, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 56, bg: MINT, font: MONO, weight: 700 })
      if (s >= 180) label(x, 790, 790, 'PERFECT.', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: CREAM })
    } },
  { sign: 'libra', cap: 'Rose tea | in *the pretty cup.*', mood: 'heart', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      teacup(x, t, 780, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#ffd1e3', tea: '#ff9ccf', pattern: GOLD })
      drawBits(x, ROSE, { R: '#ff4f86', r: '#c93d6a', G: GREEN }, 880, 700, 14 * pop01(t, P.t0 + 0.8, 0.35, 2), { rot: 0.2 })
      label(x, 760, 690, 'FANCY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.06 })
    } },
  { sign: 'scorpio', cap: 'Dark and strong. | *Deep talks only.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      teacup(x, t, 780, 940, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#5a4a8a', tea: '#2a1408' })
      bubble(x, 790, 680, 'so… what scares you?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'A tea from | *their last adventure.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      card(x, 800, 860, 220, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: TEAL, rot: 0.05 }, () => {
        x.fillStyle = '#2a6f8a'; x.fillRect(-110, -130, 220, 40)
        txt(x, 'MOUNTAIN', 0, -20, { size: 30, color: CREAM }); txt(x, 'TEA', 0, 20, { size: 30, color: CREAM })
        x.save(); x.rotate(-0.3); x.strokeStyle = RED; x.lineWidth = 5; x.strokeRect(-60, 50, 120, 50); txt(x, 'VISITED', 0, 76, { size: 22, color: RED, font: MONO, weight: 700 }); x.restore()
      })
      label(x, 800, 650, 'STORY INCLUDED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: ORANGE })
    } },
  { sign: 'capricorn', cap: 'Plain black tea. | *You earned the break.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      teacup(x, t, 780, 940, pop01(t, P.t0 + 0.2, 0.35, 2), { col: GREY, tea: '#5a3414' })
      label(x, 790, 680, 'BREAK: 10 MIN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: CREAM, font: MONO, weight: 700 })
      label(x, 790, 1090, 'TAKE 15', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'A blend | *nobody’s heard of.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      teacup(x, t, 780, 930, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#c8f0ff', tea: ['#7dffb0', '#c97bff', '#6fc3ff'][Math.floor(t * 3) % 3], text: '???', textCol: '#3d8fd8' })
      label(x, 790, 680, 'MOON + MINT + ?', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Chamomile | and *a good cry.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      teacup(x, t, 780, 930, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#d8ccff', tea: '#ffe07a' })
      label(x, 790, 680, 'SAD MOVIE: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: LAV, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'happy tears', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0245', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *perfect cup of tea.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve cups. | *One cozy table.*' },
  lesson: { text: 'Make yourself a cup. | You *deserve the pause.*', chip: 'STATUS: COZY' },
  last: { text: 'Taurus wants | *another biscuit.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
