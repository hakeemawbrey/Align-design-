// r2t0243: THE SIGNS AS… v3, ROLLCALL, "The signs at | pottery class." (~57 s vertical, signs3kit social cut, music: lofi · G)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "The signs at | *pottery class.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each), pushed to the extreme:
//              ♈ spun it so fast it left the room · ♉ made a bowl, already eating from it · ♊ started a vase, ended a mug
//              · ♋ a mug for every relative · ♌ a statue of themself · ♍ "fixed" the teacher's bowl · ♎ still picking a glaze
//              · ♏ made something, won't show anyone · ♐ wandered off to the painting class · ♑ opened a shop by week two
//              · ♒ the bowl is a spaceship · ♓ the bowl collapsed, so did Pisces
//  49.2        "Twelve bowls. | *None round.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Aries’ bowl? | *Still flying.*"  The clay blob whizzes past.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, mug, speed, CREAM, RED, ORANGE, SUN, GREY, WOOD, CLAY, BROWN, clamp, prog, lerp, ease } from './props.js'

const ACC = '#e89a6a'
const CLAYD = '#9a5a3a'

// a potter's wheel (a disc on a stand), spinning stripes
function wheel(x, t, cx, cy, k, spin = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-30, 0, 60, 120); x.fillStyle = GREY; x.fillRect(-24, 0, 48, 116)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 34, 0, 0, 7); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.ellipse(0, 0, 142, 28, 0, 0, 7); x.fill()
  x.fillStyle = 'rgba(42,35,80,0.4)'; for (let i = 0; i < 4; i++) { const a = t * 8 * spin + i * 1.57; x.fillRect(Math.cos(a) * 110 - 8, Math.sin(a) * 18 - 4, 16, 8) }
  x.restore()
}
// a bowl (clay), optionally lopsided; bottom-centre at (cx, cy)
function bowl(x, cx, cy, k, { w = 200, h = 90, col = CLAY, tilt = 0, glaze } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(tilt); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 6, -h - 6); x.lineTo(w / 2 + 6, -h - 6); x.lineTo(w / 2 - 34, 6); x.lineTo(-w / 2 + 34, 6); x.fill()
  x.fillStyle = glaze || col; x.beginPath(); x.moveTo(-w / 2, -h); x.lineTo(w / 2, -h); x.lineTo(w / 2 - 38, 0); x.lineTo(-w / 2 + 38, 0); x.fill()
  x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-w / 2 + 4, -h, w - 8, 14)
  x.restore()
}
// a flying clay blob with speed lines
function blob(x, cx, cy, k, t) {
  if (k <= 0.01) return
  speed(x, cx - 50, cy, k, { n: 4, len: 180, col: CLAY })
  x.save(); x.translate(cx, cy); x.rotate(t * 9); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, 7); x.fill()
  x.fillStyle = CLAY; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill()
  x.fillStyle = CLAYD; x.fillRect(-20, -10, 16, 16); x.fillRect(10, 8, 12, 12)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Spun it so fast | it *left the room.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', star: { x: -180 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wheel(x, t, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2), 3)
      const fly = prog(lt, 0.8, 1.5)
      if (fly < 1) blob(x, lerp(780, 1100, ease.inCubic(fly)), lerp(900, 560, fly), pop01(t, P.t0 + 0.3, 0.3, 2), t)
      label(x, 780, 650, 'SPEED: MAX', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: RED, color: CREAM, font: MONO, weight: 700 })
      bubble(x, 780, 1140, 'did it work?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Made a bowl. | *Already eating from it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bowl(x, 790, 960, k, { w: 260, h: 110 })
      const n = Math.max(0, 5 - Math.floor(clamp((lt - 0.8) / 1.2) * 5))
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(708 + i * 34, 838 - (i % 2) * 14, 30, 30); x.fillStyle = SUN; x.fillRect(712 + i * 34, 842 - (i % 2) * 14, 22, 22) }
      label(x, 790, 1060, 'STILL WET. WORTH IT.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: SUN })
    } },
  { sign: 'gemini', cap: 'Started a vase. | Ended *a mug.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const NAMES = ['VASE', 'BOWL?', 'PLATE?', 'MUG.']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      if (n < 3) bowl(x, 790, 980, k, { w: [120, 230, 300][n], h: [220, 100, 30][n] })
      else mug(x, 780, 900, k, t, { col: CLAY, fillCol: CLAYD, steam: false, w: 140, h: 160 })
      label(x, 790, 650, NAMES[n], pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Made a mug | for *every relative.*', mood: 'heart', star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      const N = ['MOM', 'DAD', 'NANA', 'AUNT', 'BABY', 'DOG']
      N.forEach((s, i) => mug(x, 690 + (i % 3) * 110, 720 + Math.floor(i / 3) * 190, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), t, { w: 90, h: 100, col: [SKYB, PINK, MINT, SUN, LAV, ORANGE][i], steam: false, handle: false, text: s, size: 18 }))
      label(x, 790, 1110, 'COUSINS: NEXT WEEK', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 26, bg: CREAM })
    } },
  { sign: 'leo', cap: 'Made a statue. | *Of themself.*', mood: 'sparkle', star: { x: -200, s: 260 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.fillStyle = INK; x.fillRect(700, 1010, 180, 70); x.fillStyle = CLAYD; x.fillRect(706, 1016, 168, 58)
        x.save(); x.filter = 'sepia(1) saturate(1.6) hue-rotate(-15deg) brightness(0.9)'
        signChar(x, t, 'leo', 790, 900, 240 * k, { mood: 'sparkle', seed: 70, glyph: false, glow: 0, bob: 0 })
        x.restore()
      }
      label(x, 790, 640, 'MASTERPIECE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD })
      sparkles(x, t, 790, 880, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Fixed the teacher’s bowl. | *Politely.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const fix = prog(lt, 0.9, 1.4)
      bowl(x, 790, 950, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 240, h: 100, tilt: lerp(0.25, 0, fix) })
      bubble(x, 790, 680, 'small note:', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1050, 'NOW SYMMETRICAL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT })
    } },
  { sign: 'libra', cap: 'Still picking | *a glaze color.*', mood: 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const G = [PINK, SKYB, MINT, SUN, LAV, ORANGE]
      G.forEach((c, i) => card(x, 700 + (i % 3) * 90, 720 + Math.floor(i / 3) * 110, 70, 80, pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), { bg: c, rot: 0, border: 4 }))
      const sel = Math.floor(t * 3) % 6
      x.strokeStyle = BONE; x.lineWidth = 6; x.strokeRect(700 + (sel % 3) * 90 - 44, 720 + Math.floor(sel / 3) * 110 - 50, 88, 100)
      label(x, 790, 1040, 'CLASS ENDED 1H AGO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GREY, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Made something. | *Won’t show anyone.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 900, 240, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#3d3470', rot: 0.02 }, () => {
        x.fillStyle = '#2a2350'; for (let i = 0; i < 5; i++) x.fillRect(-120 + i * 52, -100, 20, 200)
      })
      label(x, 790, 700, 'DO NOT LOOK', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'it’s nothing.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Wandered off | to *the painting class.*', mood: 'sparkle', star: { x: -280, s: 220 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      wheel(x, t, 780, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), 0.2)
      label(x, 790, 700, 'BRB → ART ROOM', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: ORANGE, font: MONO, weight: 700, rot: 0.05 })
      card(x, 790, 860, 160, 120, pop01(t, P.t0 + 1.3, 0.3, 2), { bg: CREAM, rot: -0.06 }, () => { x.fillStyle = SKYB; x.fillRect(-70, -50, 140, 50); x.fillStyle = MINT; x.fillRect(-70, 0, 140, 50); x.fillStyle = SUN; x.beginPath(); x.arc(30, -20, 18, 0, 7); x.fill() })
    } },
  { sign: 'capricorn', cap: 'Opened a shop | *by week two.*', mood: 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      [0, 1, 2].forEach(i => bowl(x, 700 + i * 90, 960, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { w: 90, h: 50, glaze: [MINT, SKYB, PINK][i] }))
      label(x, 790, 880, '$40 EACH', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, font: MONO, weight: 700, rot: -0.05 })
      label(x, 790, 680, 'OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 44, bg: MINT, font: MONO, weight: 700, rot: 0.04 })
      label(x, 790, 1060, 'TEACHER: CUSTOMER', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 26, bg: CREAM })
    } },
  { sign: 'aquarius', cap: 'Made a bowl. | It’s *a spaceship.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const lift = ease.inOutCubic(prog(lt, 0.9, 2.0)) * 160
      bowl(x, 790, 960 - lift, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 240, h: 70, glaze: '#9aa5c4', tilt: Math.sin(t * 3) * 0.06 })
      if (lt > 0.9) { x.save(); x.globalAlpha = 0.3; x.fillStyle = '#c8f0ff'; x.beginPath(); x.moveTo(740, 960 - lift); x.lineTo(840, 960 - lift); x.lineTo(880, 1080); x.lineTo(700, 1080); x.fill(); x.restore() }
      label(x, 790, 1110, 'LIFTOFF', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Bowl collapsed. | *So did Pisces.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, squash: lt => lt > 1.2 ? 0.12 : 0, star: { x: -180 },
    front(x, t, lt, P) {
      const c = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.1)) : prog(lt, 0.6, 1.1)
      bowl(x, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2), { w: lerp(200, 300, c), h: lerp(160, 30, c), tilt: c * 0.08 })
      label(x, 790, 1080, 'R.I.P. BOWL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0243', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs at | *pottery class.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve bowls. | *None round.*' },
  last: {
    text: 'Aries’ bowl? | *Still flying.*',
    draw(x, t, lt) {
      const p = (lt * 0.45) % 1
      blob(x, lerp(-60, 1140, p), 1080 - Math.sin(Math.PI * p) * 200, 1.8 * pop01(t, t - lt + 0.3, 0.3, 2), t)
      const k = pop01(t, t - lt + 0.8, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 540, 1300, 220 * k, { mood: 'wide', look: [1, -1], seed: 41, hops: [t - lt + 1.6] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
