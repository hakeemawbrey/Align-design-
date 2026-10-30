// guideearth (30 s vertical Align ad, Star Talk "Your Star Guide", element pep talk: the earth signs) · story 0–25.6, then
// the shared end card.
//   0.00       "*Earth* signs, gather round."  The gold guide floats on a little cloud, lantern lit, over a garden bed where
//              ♉ Taurus (watering can, mid-pour), ♍ Virgo (clipboard) and ♑ Capricorn (ruler) are already at work.
//   2.82       ★ YOUR STAR: "you build love like a garden. slowly."  Sprouts come up row by row.
//              The ★ ASTROLOGY SAYS chip: the earth signs, Taurus, Virgo, Capricorn.
//   7.40       "but don't plan every seed."  Labelled stakes pop up beside every sprout (A1, A2, …), Capricorn measures.
//   10.2       A gust: one stray seed tumbles in from nowhere and lands in the gap. Three wide-eyed stares.
//   11.6       "let one surprise grow."  It shoots up and blooms into a big wildflower. Heart-eyes all round.
//   15.5       Tonight's deck deals in: "someone you didn't plan for" (CARD FIRST. FACE LAST.).
//   19.7 cut   "Plant it. Then *let it grow*."  The garden from frame 0, with one wildflower; a butterfly visits.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { guideFilm } from './guidefilm.js'
import { INK, MONO, drawBits, drawTalkCard } from './kit.js'

const T = {
  hookOut: [2.3, 2.6], open: 2.6, l1: 2.82, grow: 3.9, fact: [5.0, 4.4],
  l2: 7.4, stakes: 8.3, gust: 10.2, land: 10.85, l3: 11.6, sprout: 12.9, bloom: 13.8, love: 14.4,
  deal: 15.5, close: 19.6, cut: 19.7, last: 19.8, lastLand: 20.35, fly: 22.0, hop: 23.3, out: [25.15, 25.5],
}
export const CPS = 30
const ACC = '#9be07a'
const GUIDE = { x: 540, y: 790, size: 250 }
const SOIL = 1238
const SIGNS3 = [
  { ...signStar('taurus'), x: 170, y: 1120, seed: 4 },
  { ...signStar('virgo'), x: 425, y: 1135, seed: 5 },
  { ...signStar('capricorn'), x: 915, y: 1120, seed: 7 },
]
const ROWS = [95, 215, 335, 455, 575, 795, 915, 1015]     // the planned sprouts; 680 is the gap
const WILD = 685
const CAN = ['....GGGGG.', 'G..GGGGGGG', '.GGGGGGGGG', '..GGGGGGGG', '...GGGGGGG', '...GGGGGGG', '....GGGGG.']
const CAN_C = { G: '#7fb8d8' }
const CLIP = ['.SS.', 'BBBB', 'BWWB', 'BWWB', 'BWWB', 'BBBB']
const CLIP_C = { S: '#9aa3b5', B: '#b9824a', W: '#f5eedf' }
const RULER = ['YYYYYYYYYYYY', 'YkYkYkYkYkYk']
const RULER_C = { Y: '#f2cf4a', k: '#7a5a12' }
const SEED = ['.SS.', 'SSSS', 'SSSS', '.SS.']
const FLY = ['PP.PP', 'PPKPP', '.PKP.', 'PPKPP']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

function cloud(x, cx, cy, t, ok) {
  x.save(); x.globalAlpha = ok; x.translate(cx, cy + Math.sin(t * 2.2 + 2.1) * 8)
  const puff = [[-120, 10, 48], [-60, -12, 62], [10, -22, 70], [80, -8, 58], [135, 12, 44], [0, 22, 66]]
  x.fillStyle = INK; puff.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r + 7, 0, 7); x.fill() })
  x.fillStyle = '#e9e1ff'; puff.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill() })
  x.fillStyle = '#ffffff'; puff.slice(0, 5).forEach(([a, b, r]) => { x.beginPath(); x.arc(a - r * 0.2, b - r * 0.3, r * 0.4, 0, 7); x.fill() })
  x.restore()
}

function soil(x, ok) {
  x.save(); x.globalAlpha = ok
  x.fillStyle = INK; x.fillRect(0, SOIL - 8, 1080, 76)
  x.fillStyle = '#6b4226'; x.fillRect(0, SOIL, 1080, 60)
  x.fillStyle = '#865634'; for (let i = 0; i < 1080; i += 24) x.fillRect(i + ((i / 24) % 2) * 8, SOIL + 8 + ((i / 24) % 3) * 14, 12, 8)
  x.fillStyle = '#57c26a'; x.fillRect(0, SOIL - 8, 1080, 8)
  x.restore()
}

/** a sprout at (sx, SOIL): h 0…1 */
function sprout(x, sx, h, t, k, ok) {
  if (h <= 0) return
  const c = 8, n = Math.max(1, Math.round(h * 6)), sway = Math.round(Math.sin(t * 2 + k) * 1.2)
  x.save(); x.globalAlpha = ok
  for (let j = 0; j < n; j++) { x.fillStyle = INK; x.fillRect(sx - c / 2 - 3 + (j > 3 ? sway * 3 : 0), SOIL - (j + 1) * c - 2, c + 6, c + 4); x.fillStyle = '#3fae6a'; x.fillRect(sx - c / 2 + (j > 3 ? sway * 3 : 0), SOIL - (j + 1) * c, c, c) }
  if (h > 0.6) {
    const ty = SOIL - n * c, tx = sx + sway * 3
    x.fillStyle = '#57c26a'; x.fillRect(tx - 4 * c, ty - c, 3 * c, c); x.fillRect(tx + c, ty - c, 3 * c, c)
    x.fillStyle = '#8fe08a'; x.fillRect(tx - 3 * c, ty - 2 * c, 2 * c, c); x.fillRect(tx + c, ty - 2 * c, 2 * c, c)
  }
  x.restore()
}

function stake(x, sx, i, p, ok) {
  if (p <= 0) return
  const s = easeOutBack(p, 2.5)
  x.save(); x.globalAlpha = ok; x.translate(sx + 38, SOIL); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-4, -78, 8, 78); x.fillStyle = '#d8c9a8'; x.fillRect(-2, -76, 4, 76)
  x.fillStyle = INK; x.fillRect(-28, -112, 56, 42); x.fillStyle = '#f5eedf'; x.fillRect(-24, -108, 48, 34)
  x.fillStyle = '#7a6aa8'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${'AB'[i % 2]}${1 + (i >> 1)}`, 0, -90)
  x.restore()
}

function wildflower(x, t, ok) {
  // the stray seed: tumbles in on the gust, lands in the gap, then shoots up and blooms
  const fp = prog(t, T.gust, T.land)
  if (fp <= 0) return
  if (fp < 1) {
    const sx = lerp(1150, WILD, ease.outQuad(fp)), sy = lerp(760, SOIL - 6, ease.inQuad(fp)) - Math.sin(fp * Math.PI * 3) * 40 * (1 - fp)
    drawBits(x, SEED, { S: '#c98a1f' }, sx, sy, 7, { rot: fp * 12, alpha: ok })
    return
  }
  const g = ease.outCubic(prog(t, T.sprout, T.bloom)), H = 230 * g
  if (g <= 0) { drawBits(x, SEED, { S: '#c98a1f' }, WILD, SOIL - 6, 7, { alpha: ok }); return }
  x.save(); x.globalAlpha = ok
  const sw = Math.sin(t * 1.8) * 10 * g
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(WILD, SOIL); x.quadraticCurveTo(WILD - 20, SOIL - H * 0.5, WILD + sw, SOIL - H); x.stroke()
  x.strokeStyle = '#3fae6a'; x.lineWidth = 10; x.beginPath(); x.moveTo(WILD, SOIL); x.quadraticCurveTo(WILD - 20, SOIL - H * 0.5, WILD + sw, SOIL - H); x.stroke()
  if (g > 0.4) { x.fillStyle = INK; x.beginPath(); x.ellipse(WILD + 32, SOIL - H * 0.45, 34, 16, -0.5, 0, 7); x.fill(); x.fillStyle = '#57c26a'; x.beginPath(); x.ellipse(WILD + 32, SOIL - H * 0.45, 28, 11, -0.5, 0, 7); x.fill() }
  x.restore()
  const b = easeOutBack(prog(t, T.bloom, T.bloom + 0.45), 2.6)
  if (b > 0) {
    const cx = WILD + sw, cy = SOIL - H
    x.save(); x.globalAlpha = ok; x.translate(cx, cy); x.rotate(t * 0.25); x.scale(b, b)
    for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -46, 26, 40, 0, 0, 7); x.fill(); x.fillStyle = i % 2 ? '#ff8fb1' : '#ffb3cc'; x.beginPath(); x.ellipse(0, -46, 20, 34, 0, 0, 7); x.fill(); x.restore() }
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 30, 0, 7); x.fill(); x.fillStyle = '#f7c948'; x.beginPath(); x.arc(0, 0, 24, 0, 7); x.fill()
    x.restore()
  }
}

function signMood(i, t) {
  if (t < T.gust) return { mood: i === 1 ? 'squint' : 'happy', look: [0, 1], blink: i === 1 ? false : undefined }
  if (t < T.bloom) return { mood: 'wide', look: [i === 2 ? -1 : 1, t < T.land ? -1 : 1] }
  if (t < T.love) return { mood: 'sparkle', look: [i === 2 ? -1 : 1, -1] }
  return { mood: 'heart' }
}

const film = guideFilm({
  duration: 30, sign: null, n: null, seed: 3, accent: ACC, cps: CPS,
  chip: { label: 'STAR GUIDE · EARTH SIGNS · PEP TALK' },
  hook: '*Earth* signs, | gather round.',
  lines: [
    { t: T.l1, text: 'you build love like a garden. *slowly.*' },
    { t: T.l2, text: "but don't plan *every seed.*" },
    { t: T.l3, text: 'let one *surprise* grow.' },
  ],
  T, fact: 'THE EARTH SIGNS: TAURUS,|VIRGO, CAPRICORN', factY: 1360,
  last: 'Plant it. Then | *let it grow.*', lastLate: 0, lastSize: 116, lastAccent: 156, lastTop: 160,
  hero: GUIDE, mood: t => (t < T.gust ? { mood: 'happy' } : t < T.bloom ? { mood: 'wide', look: [1, 1] } : { mood: 'sparkle', look: [1, 1] }),
  guide: t => ({ glow: 1 + 0.6 * Math.exp(-Math.max(0, t - T.hop) * 3) * (t > T.hop ? 1 : 0) }),
  hops: [T.land + 0.1, T.bloom + 0.1, T.hop],
  back(x, t, S) {
    const ok = S.ok
    soil(x, ok)
    cloud(x, GUIDE.x, GUIDE.y + 135, t, ok)
    // sprouts (some already up at frame 0, the rest come up row by row)
    ROWS.forEach((sx, i) => sprout(x, sx, i % 3 === 0 ? 1 : clamp(prog(t, T.grow + i * 0.25, T.grow + i * 0.25 + 0.8)), t, i, ok))
    ROWS.forEach((sx, i) => stake(x, sx, i, prog(t, T.stakes + i * 0.14, T.stakes + i * 0.14 + 0.3), ok))
    wildflower(x, t, ok)
  },
  front(x, t, S) {
    const ok = S.ok
    if (ok <= 0) return
    SIGNS3.forEach((s, i) => {
      const r = drawStarChar(x, s.x, s.y, 170, t, { color: s.color, glyph: s.glyph, ...signMood(i, t), seed: s.seed, glow: 0.8, pop: ok, hops: [T.stakes + i * 0.3, T.land + 0.05, T.love + i * 0.08, T.hop + i * 0.1] })
      if (i === 0) {     // Taurus pours (drops falling) until the gust
        const pour = t < T.gust ? 1 : 0
        drawBits(x, CAN, CAN_C, r.x + 95, r.y - 55, 7, { rot: pour ? 0.45 : 0, alpha: ok })
        if (pour) for (let k = 0; k < 5; k++) { const ph = (t * 1.6 + k / 5) % 1; x.save(); x.globalAlpha = ok * (1 - ph); x.fillStyle = '#7fd0ff'; x.fillRect(r.x + 150 + ph * 20, r.y - 30 + ph * 120, 8, 12); x.restore() }
      }
      if (i === 1) drawBits(x, CLIP, CLIP_C, r.x - 95, r.y - 10 - (t > T.l2 && t < T.gust ? 30 : 0), 13, { rot: -0.1, alpha: ok })
      if (i === 2) drawBits(x, RULER, RULER_C, r.x - 120, r.y + 40 + Math.sin(t * 2) * 6, 10, { rot: t > T.stakes && t < T.gust ? -0.05 : 0.3, alpha: ok })
    })
    // hearts at the bloom
    if (t > T.love) for (let i = 0; i < 9; i++) {
      const born = T.love + i * 0.3, p = (t - born) / 1.5
      if (p < 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, [170, 425, 915][i % 3] + ((i * 37) % 5 - 2) * 20, 1010 - p * 200, 7, { alpha: Math.sin(Math.PI * p) * ok })
    }
    // the gust
    if (t > T.gust - 0.1 && t < T.land + 0.3) {
      x.save(); x.globalAlpha = 0.7 * ok * Math.sin(Math.PI * prog(t, T.gust - 0.1, T.land + 0.3)); x.strokeStyle = '#efe6d6'; x.lineWidth = 6; x.lineCap = 'round'
      for (let k = 0; k < 3; k++) { const y = 780 + k * 70, x0 = 1100 - prog(t, T.gust - 0.1, T.land + 0.3) * 700 - k * 60; x.beginPath(); x.moveTo(x0, y); x.lineTo(x0 + 180, y); x.stroke() }
      x.restore()
    }
    // tonight's deck
    const dp = easeOutBack(prog(t, T.deal, T.deal + 0.5), 1.5), da = 1 - prog(t, T.close - 0.1, T.close + 0.15)
    if (dp > 0 && da > 0) {
      drawTalkCard(x, 860, lerp(-300, 600, dp), 250, { rot: lerp(0.6, 0.07, dp) + 0.02 * Math.sin(t * 2), kicker: "TONIGHT'S DECK", text: "someone you didn't plan for", foot: 'FACE: LATER', color: '#3fae6a', alpha: da })
      x.save(); x.globalAlpha = clamp(dp * 2) * da; x.fillStyle = '#efe6d6'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText('CARD FIRST. FACE LAST.', 540, 400); x.restore()
    }
    // the butterfly at the end
    const fl = prog(t, T.fly, T.fly + 1.6)
    if (fl > 0) {
      const bx = lerp(-60, WILD + 20, ease.outCubic(fl)) + Math.sin(t * 3) * 20 * (1 - fl), by = lerp(820, SOIL - 300, ease.outCubic(fl)) + Math.sin(t * 5) * 14
      x.save(); x.translate(bx, by); x.scale(Math.max(0.2, Math.abs(Math.sin(t * 14))), 1); drawBits(x, FLY, { P: '#c9b8f0', K: INK }, 0, 0, 9, { alpha: ok }); x.restore()
    }
  },
  cues: [
    ['pluck', 0.3, 1174.66, 0.035, 0.5, 0], ['pluck', 0.7, 1318.51, 0.03, 0.5, 0],
    ...ROWS.map((_, i) => ['pop', +(T.grow + i * 0.25 + 0.5).toFixed(2), [587.33, 659.25, 739.99, 880][i % 4], 0.025, ((i % 3) - 1) * 0.3]),
    ...ROWS.map((_, i) => ['tick', +(T.stakes + i * 0.14).toFixed(2), 0.025]),
    ['whoosh', T.gust - 0.1, 0.9, 0.04], ['tick', T.land, 0.04], ['pluck', T.land + 0.05, 440, 0.035, 0.5, 0.2],
    ['whoosh', T.sprout, 0.6, 0.03], ['bell', T.bloom, 1760, 0.04, 1.4, 0.2], ['glitter', T.bloom, T.bloom + 1.0], ['pop', T.love, 1174.66, 0.04, 0],
    ['whoosh', T.deal, 0.4, 0.035], ['pop', T.deal + 0.45, 880, 0.035, 0.3],
    ['glitter', T.fly + 1.2, T.fly + 1.8], ['pop', T.hop, 987.77, 0.04, 0], ['bell', T.hop + 0.05, 2093, 0.025, 1.2, 0],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
