// v3t061: THE SIGNS AS… v3, SOLO film, "Capricorns in love | be like." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine love situations, each pushed to the most extreme (and lovable) Capricorn version.
//   0.0–3.6    "Capricorns in love | *be like.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards: "I love you" in a quarterly review · first date, a firm handshake · flirts with compound
//              interest · anniversary gift, a retirement fund · love letter, notarized · cuddling, set a timer
//              · checked compatibility, then credit · one tear at the wedding · meeting the parents, brought a résumé
//  37.8        "Romantic. | *Strategically.*"
//  41.2        callback: "Cuddle timer rang. | They hit *snooze.*"  The cuddle timer comes back; Capricorn stays.
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, readout, bits, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT } from './props.js'

const ACC = '#2fc79a'

// a presentation board: four rising bars, a heart on the tallest
function review(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = BROWN_; x.fillRect(-110, 150, 16, 150); x.fillRect(94, 150, 16, 150)
  x.fillStyle = INK; x.fillRect(-172, -172, 344, 330)
  x.fillStyle = CREAM; x.fillRect(-162, -162, 324, 310)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Q3: FEELINGS', 0, -128)
  const COLS = [GREY, '#6fc3ff', ACC, PINK]
  for (let i = 0; i < 4; i++) {
    const h = 50 + i * 42, g = ease.outCubic(prog(lt, 0.4 + i * 0.18, 0.75 + i * 0.18))
    x.fillStyle = COLS[i]; x.fillRect(-124 + i * 66, 130 - h * g, 48, h * g)
  }
  x.restore()
}
const BROWN_ = '#8a4a2e'

const CAMEOS = [
  { sign: 'capricorn', cap: 'Said “I love you” | in a *quarterly review.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      review(x, t, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1110, 'LOVE: UP, Q/Q', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 860, 680, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'capricorn', cap: 'First date? | A firm *handshake.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 800, 930, 230 * k, { mood: lt > 1.2 ? 'wide' : 'heart', look: [-1, 0], seed: 12, glyph: false, tears: 1 })
      const sh = Math.sin(lt * 14) * 10 * clamp((lt - 0.8) * 3) * (lt < 1.8 ? 1 : 0)
      bits(x, 'HANDS', 590, 960 + sh, 19 * pop01(t, P.t0 + 0.75, 0.3, 2))
      bubble(x, 560, 610, 'a pleasure.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 700, 'DATE: CONFIRMED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: ACC, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their flirting? | *Compound interest* facts.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'it grows | over time ;)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      // a little growth curve card
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 940); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -110, 320, 220); x.fillStyle = NIGHT; x.fillRect(-150, -100, 300, 200)
        x.strokeStyle = ACC; x.lineWidth = 8; x.beginPath()
        const g = clamp((lt - 0.9) / 0.9)
        for (let i = 0; i <= 30 * g; i++) { const u = i / 30, px = -130 + u * 260, py = 80 - 160 * Math.pow(u, 3); i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.restore()
      }
      hearts(x, t, 860, 860, P.t0 + 1.7, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: 'capricorn', cap: 'Anniversary gift? | A *retirement fund.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const open = lt > 1.0
      if (!open) bits(x, 'GIFT', 790, 900, 24 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: Math.sin(lt * 18) * 0.04 * clamp((lt - 0.6) * 3) })
      else { bits(x, 'PIGGY', 790, 910, 24 * pop01(t, P.t0 + 1.0, 0.3, 2.2)); sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 170, 0.4) }
      label(x, 790, 1110, 'FOR US · AGE 65', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'so romantic', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Wrote a love letter. | Had it *notarized.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 380, rot: 0.05, head: 'DEAR YOU,', headBg: PINK, headColor: INK,
        lines: ['I love you.', 'Terms below.', '§1 … §2 …', '§3 … §4 …'], size: 26, n: 1 + Math.floor(clamp((lt - 0.3) / 0.8) * 4) })
      // the stamp slams down
      const s = prog(lt, 1.15, 1.3)
      if (s > 0) {
        x.save(); x.translate(850, 960); x.rotate(-0.2); const sc = lerp(1.8, 1, ease.outCubic(s)); x.scale(sc, sc); x.globalAlpha = clamp(s * 2)
        x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-120, -34, 240, 68)
        x.fillStyle = RED; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NOTARIZED', 0, 2)
        x.restore()
      }
    } },
  { sign: 'capricorn', cap: 'Cuddling? | Set a *timer.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      bits(x, 'TIMER', 790, 850, 26 * k)
      const secs = Math.max(0, 15 * 60 - Math.floor(clamp((lt - 0.6) / 1.6) * 2))
      readout(x, 790, 1080, pop01(t, P.t0 + 0.6, 0.3, 2), `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, { size: 56, color: ACC })
      label(x, 790, 640, 'CUDDLE: 15 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Checked our compatibility. | Then *my credit score.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 300, bg: DEEP, head: '✦ COMPATIBILITY', headBg: ACC, headColor: INK, color: BONE,
        lines: ['♑︎ + YOU', 'ALIGNED ✓', lt > 0.9 ? 'CREDIT: …' : ''], size: 30, gap: 52 })
      label(x, 790, 1060, 'CREDIT: APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 620, 1000, P.t0 + 1.6, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: 'capricorn', cap: 'Cried at the wedding. | *One tear.* Efficient.', mood: lt => lt > 0.8 ? 'wide' : 'neutral', star: { x: -150 },
    front(x, t, lt, P, F) {
      // one single tear rolls down, then stops
      const d = ease.inOutCubic(prog(lt, 0.5, 1.4))
      if (lt > 0.45) bits(x, 'TEAR', F.x - 40, lerp(F.cy - 10, F.cy + 90, d), 9)
      label(x, 790, 760, 'TEARS: 1', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'that’s enough.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Meeting your parents? | Brought a *résumé.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.7],
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 400, rot: 0.04, head: 'RÉSUMÉ', headBg: INK, headColor: ACC, align: 'left',
        lines: ['GOALS: YOU', 'SKILLS: LOYAL', 'REFS: 3', 'HOBBY: PLANS'], size: 26, n: 1 + Math.floor(clamp((lt - 0.3) / 0.9) * 4), top: -60 })
      label(x, 790, 640, 'HIRED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.06 })
      sparkles(x, t, 790, 860, P.t0 + 1.6, 7, 200, 0.2)
    } },
]

const F = makeFilm({
  id: 'v3t061', key: 'C', accent: ACC, solo: 'capricorn', ending: 'callback',
  title: 'Capricorns in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Romantic. | *Strategically.*', mood: 'heart' },
  last: {
    text: 'Cuddle timer rang. | They hit *snooze.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      signChar(x, t, 'capricorn', 390, 1020, 420 * k, { mood: lt > 1.4 ? 'heart' : 'sleepy', seed: 9, hops: [t - lt + 1.5] })
      bits(x, 'TIMER', 790, 960 + Math.sin(lt * 30) * 8 * (lt < 1.3 ? 1 : 0), 32 * pop01(t, t - lt + 0.5, 0.3, 2))
      label(x, 760, 1230, 'SNOOZE: 15 MORE', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, t - lt + 1.5, { n: 8, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
