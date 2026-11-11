// v3t106: THE SIGNS AS… v3, "New haircut | be like." (topic: after a new haircut) (~57 s vertical, signs3kit, lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself after a new haircut. Ending: callback.
//   aries cut it themself mid-sentence · taurus: same haircut since 2009 · gemini changed their mind mid-cut (two-tone)
//   · cancer kept the hair, for memories · leo held a press conference · virgo measured the fringe with a ruler
//   · libra brought forty reference photos · scorpio: new cut, new era · sagittarius asked for a trim abroad, got a
//   mohawk · capricorn booked the next twenty cuts · aquarius dyed it galaxy blue · pisces wept at "nice hair"
//  49.2 "New hair. | *New them.*"  ·  callback: "Gemini’s back. | Changing it *again.*" (the two-tone hair, flipping)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'

const HAIR = ['..HHHHHH..', '.HHHHHHHH.', 'HHHHHHHHHH', 'HH......HH']
const MOHAWK = ['..H..', '.HHH.', '.HHH.', '.HHH.', '.HHH.', '.HHH.']
const SCISSORS = [
  'S.....S',
  '.S...S.',
  '..S.S..',
  '...S...',
  '..S.S..',
  '.RR.RR.',
  'R..RR..R'.slice(0, 7),
  '.RR.RR.',
]
const SCISSORS_C = { S: '#d8dbe8', R: RED }
const JAR = ['.KKKKK.', '.KKKKK.', 'GGGGGGG', 'GHHGHHG', 'GHHHHGG', 'GGHHHHG', 'GGGGGGG']
const MIC = ['.GGG.', 'GgGgG', '.GGG.', '..K..', '..K..', '..K..', '..K..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const RULER = ['YYYYYYYYYYYYYYYYYY', 'Y.Y.Y.Y.Y.Y.Y.Y.Y.', 'YYYYYYYYYYYYYYYYYY']

// hair on a star: cells over the top of the sprite
function hair(x, F, cols, { k = 1, bm = HAIR, dy = 0, cell } = {}) {
  if (k <= 0.01) return
  const c = cell || F.S / 15
  drawBits(x, bm, typeof cols === 'string' ? { H: cols } : cols, F.x, F.top + c * 1.2 + dy, c * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cut it themself. | *Mid-sentence.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const snip = Math.sin(t * 22) * 0.25
      drawBits(x, SCISSORS, SCISSORS_C, F.x + 120, F.top + 20, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.6 + snip })
      hair(x, F, '#c94a2e', { k: lt < 1.2 ? 1 : 0.6, dy: lt < 1.2 ? 0 : 12 })
      bubble(x, 790, 660, 'so anyway I—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1100, 'DONE · 40 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Same haircut | *since 2009.*', mood: 'happy', star: { x: -180 },
    front(x, t, lt, P, F) {
      hair(x, F, BROWN)
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2)
        if (k <= 0.01) continue
        x.save(); x.translate(700 + i * 90, 760 + i * 110); x.rotate(-0.08 + i * 0.08); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-80, -70, 160, 140); x.fillStyle = '#fff4e2'; x.fillRect(-72, -62, 144, 124)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['2009', '2016', 'TODAY'][i], 0, 44)
        x.fillStyle = '#e9b24a'; x.fillRect(-30, -40, 60, 50); x.fillStyle = BROWN; x.fillRect(-34, -48, 68, 16)
        x.restore()
      }
      label(x, 760, 620, 'IF IT WORKS…', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Changed their mind | *mid-cut.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -60, s: 340 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const L = lt > 1.0 ? PINK : '#ffd23a', R = SKYB
      hair(x, F, { L, R }, { bm: ['..LLLRRR..', '.LLLLRRRR.', 'LLLLLRRRRR', 'LL......RR'] })
      bubble(x, 300, 640, 'wait, pink', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 800, 640, 'no, blue', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 540, 1140, 'BOTH. FINAL.', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Kept the cut hair. | *For memories.*', mood: 'heart', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P, F) {
      hair(x, F, '#6fc3ff', { k: 0.8 })
      drawBits(x, JAR, { K: '#c9c9d8', G: 'rgba(200,230,255,0.85)', H: '#6fc3ff' }, 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 660, 'MEMORIES ♡ 2026', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'New haircut. | Held *a press conference.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: 0, y: 40, s: 260 }, hops: [1.0],
    front(x, t, lt, P, F) {
      hair(x, F, ORANGE, { bm: ['.H.HH.HH.H.', 'HHHHHHHHHHH', 'HHHHHHHHHHH', 'HH.......HH'] })
      for (let i = 0; i < 5; i++) drawBits(x, MIC, MIC_C, 300 + i * 120, 1080 - Math.abs(i - 2) * 20, 12 * pop01(t, P.t0 + 0.4 + i * 0.12, 0.3, 2), { rot: (i - 2) * 0.25 })
      label(x, 540, 610, 'BREAKING: HAIR', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: -0.04 })
      if (Math.floor(t * 4) % 4 === 0 && lt > 0.8) { x.save(); x.globalAlpha = 0.3; x.fillStyle = '#fff'; x.fillRect(120, 470, 840, 760); x.restore() }
    } },
  { sign: 'virgo', cap: 'Measured the fringe. | *With a ruler.*', mood: 'squint', look: [1, 0], star: { x: -100, s: 320 },
    front(x, t, lt, P, F) {
      hair(x, F, '#8a4a6e')
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, RULER, { Y: '#ffd23a' }, F.x + 40, F.top + 30, 14 * k, { rot: 0.02 })
      label(x, 800, 660, '2.0 CM · EXACT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 820, 1100, 'one more snip', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Brought forty | *reference photos.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P, F) {
      hair(x, F, '#ff8fd0')
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 40)
      for (let i = 0; i < Math.min(n, 8); i++) {
        x.save(); x.translate(720 + (i % 3) * 70, 760 + Math.floor(i / 3) * 90); x.rotate(Math.sin(i * 2.1) * 0.2)
        x.fillStyle = INK; x.fillRect(-46, -56, 92, 112); x.fillStyle = '#fff4e2'; x.fillRect(-40, -50, 80, 100)
        x.fillStyle = ['#ff8fd0', '#ffd23a', SKYB, LAV][i % 4]; x.fillRect(-26, -36, 52, 40); x.restore()
      }
      label(x, 800, 1120, `PHOTO ${n}/40`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'New cut. | *Whole new person.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P, F) {
      hair(x, F, '#1b1236', { bm: ['HHHHHHH...', 'HHHHHHHH..', 'HHHHHHHHH.', 'HHHHH...HH', 'HHH.......'], k: pop01(t, P.t0 + 0.8, 0.3, 2) })
      label(x, 800, 760, 'NEW ERA', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 54, bg: '#c94a8a', color: '#fff4e2', rot: -0.05 })
      bubble(x, 800, 1020, 'don’t call me | by my old name', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Asked for a trim abroad. | Got *a mohawk.*', mood: 'sparkle', star: { x: -180 }, hops: [1.4, 1.8],
    front(x, t, lt, P, F) {
      if (lt > 1.2) hair(x, F, '#a35cf0', { bm: MOHAWK, dy: -10, k: pop01(t, P.t0 + 1.25 * 1.29, 0.3, 2) })
      else hair(x, F, '#a35cf0')
      bubble(x, 800, 660, '“a little trim?”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1100, 'LOVE IT. KEEPING IT.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Booked the next cut. | And *nineteen more.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      hair(x, F, '#3a3a50', { bm: ['..HHHHHH..', '.HHHHHHHH.', 'HHHHHHHHHH', 'H........H'] })
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 870); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#fff4e2'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = '#2fc79a'; x.fillRect(-142, -142, 284, 50)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HAIR PLAN', 0, -116)
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 20)
        for (let i = 0; i < n; i++) { x.fillStyle = '#2fc79a'; x.fillRect(-120 + (i % 5) * 50, -70 + Math.floor(i / 5) * 50, 36, 36) }
        x.restore()
      }
      label(x, 800, 1110, 'EVERY 6 WEEKS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Dyed it | *galaxy blue.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -100, s: 330 }, hops: [1.1],
    front(x, t, lt, P, F) {
      hair(x, F, { H: '#3a4ad8', S: '#fff4e2', P: '#c9a6ff' }, { bm: ['..HSHHPH..', '.HHHPHHSHH', 'HPHHHSHHPH', 'HH......HH'].map(r => r.slice(0, 10)) })
      label(x, 800, 650, 'SHADE: NEBULA', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.top, P.t0 + 0.8, 8, 140, 0.4, [SKYB, LAV, BONE])
    } },
  { sign: 'pisces', cap: 'Barber said “nice hair.” | Pisces *wept.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      hair(x, F, '#b89aff')
      bubble(x, 800, 720, 'nice hair!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1040, 'TISSUES: 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t106', key: 'C', accent: PINK, ending: 'callback',
  title: 'New haircut | *be like.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'New hair. | *New them.*' },
  last: {
    text: 'Gemini’s back. | Changing it *again.*',
    draw(x, t, lt) {
      const g = pop01(t, t - lt + 0.3, 0.4, 2)
      if (g <= 0.01) return
      const F = signChar(x, t, 'gemini', 540, 980, 300 * g, { mood: Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', seed: 61, hops: [t - lt + 1.2] })
      const cols = [[PINK, SKYB], [GOLD, MINT], [LAV, ORANGE], [SKYB, PINK]][Math.floor(lt * 2.5) % 4]
      hair(x, F, { L: cols[0], R: cols[1] }, { bm: ['..LLLRRR..', '.LLLLRRRR.', 'LLLLLRRRRR', 'LL......RR'] })
      label(x, 760, 1220, 'ROUND 7', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
