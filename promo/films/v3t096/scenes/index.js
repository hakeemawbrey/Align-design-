// v3t096: THE SIGNS AS… v3, "The signs | at karaoke night." (~61 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs at one karaoke night, each the most extreme version of themself. Ending: 'lesson'.
//   0.0–3.6    "The signs | at *karaoke night.*"
//   3.6–49.2   ♈ signed up first, didn't know the song · ♉ one ballad, the room went silent · ♊ changed songs mid-chorus
//              · ♋ dedicated every song to the group · ♌ brought costume changes · ♍ corrected the lyrics on the screen
//              · ♎ only does duets, harmonises with every sign · ♏ refused to sing, then stole the night
//              · ♐ so loud the neighbours joined in · ♑ sat out, scored every singer · ♒ sang a song they wrote on the way
//              · ♓ cried at someone else's "happy birthday"
//  49.2        "Everyone sang. | Nobody *tuned.*"
//  52.4        LESSON: "Sing badly. | Sing *anyway.*"  MIC: SHARED
//  58.3        "Scorpio wants | *one more song.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const MIC = [
  '.GGGG.',
  'GgGGgG',
  'GGgGGG',
  'GgGGgG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
]
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const HANGER = [
  '....KK....',
  '...K..K...',
  '......K...',
  '.....K....',
  '..KKKKKK..',
  '.K......K.',
  'KKKKKKKKKK',
]

/** the karaoke screen: lyrics with an optional red correction */
function screen(x, cx, cy, k, lt, { line1 = '', line2 = '', fix = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -120, 380, 240)
  x.fillStyle = '#2a2350'; x.fillRect(-180, -110, 360, 220)
  x.fillStyle = '#0d0a24'; x.fillRect(-168, -98, 336, 196)
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 30px ${INTER}`
  x.fillStyle = SKYB; x.fillText(line1, 0, -40)
  x.fillStyle = BONE; x.fillText(line2, 0, 20)
  if (fix && lt > 0.9) {
    x.strokeStyle = '#ff4f86'; x.lineWidth = 6; x.beginPath(); x.moveTo(-70, 20); x.lineTo(70 * clamp((lt - 0.9) / 0.3) * 2 - 70, 20); x.stroke()
    if (lt > 1.3) { x.fillStyle = '#ff4f86'; x.font = `800 30px ${INTER}`; x.fillText('“whom”', 0, 70) }
  }
  x.restore()
}
/** a judge's scorecard, one row per sign */
function scorecard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const ROWS = [['♈︎', '6'], ['♉︎', '10'], ['♊︎', '7?'], ['♌︎', '9'], ['♓︎', '11']]
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360)
  x.fillStyle = '#fff4e2'; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SCORES', 0, -134)
  ROWS.forEach(([g, s], i) => {
    if (lt < 0.4 + i * 0.25) return
    x.font = `700 34px 'Segoe UI Symbol', 'Noto Sans Symbols', ${INTER}`; x.textAlign = 'left'; x.fillText(g, -100, -76 + i * 56)
    x.font = `800 34px ${INTER}`; x.textAlign = 'right'; x.fillText(s + '/10', 104, -76 + i * 56)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Signed up first. | *Didn’t know the song.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.3],
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 560, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      label(x, 790, 680, 'SINGER #1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 880, 'la la | LAAA?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Sang one ballad. | The room *went silent.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', star: { x: -150 },
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 560, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      notes(x, t, 400, 760, { n: 4, cell: 7, col: GOLD, alpha: clamp(lt) })
      label(x, 790, 760, 'GOOSEBUMPS: ALL', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 32, bg: LAV, rot: 0.05 })
      label(x, 790, 920, 'ENCORE?', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Changed songs | *mid-chorus.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const S = [['♪ oh baby, I—', 'SONG 1'], ['♪ ROCK AND—', 'SONG 2'], ['♪ under the sea—', 'SONG 3']]
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))
      screen(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { line1: S[n][1], line2: S[n][0] })
      label(x, 790, 980, 'DJ: CONFUSED', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Dedicated every song | to *the group.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'this one’s for | you guys', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 790, 900, 'DEDICATION #9', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 1040, P.t0 + 1.2, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Brought their own | *costume changes.*', mood: 'sparkle', star: { x: -150 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const COLS = [GOLD, PINK, SKYB, MINT]
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.4) / 0.45))
      for (let i = 0; i < 3; i++) drawBits(x, HANGER, { K: '#c9c9d8' }, 720 + i * 90, 700, 7 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      x.save(); x.fillStyle = COLS[n]; x.globalAlpha = 0.85 * pop01(t, P.t0 + 0.4, 0.3, 2); x.fillRect(250, 980, 280, 40); x.restore()
      label(x, 790, 900, `OUTFIT ${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: COLS[n], rot: 0.05 })
      sparkles(x, t, 390, 880, P.t0 + 0.4 + n * 0.45, 6, 160, n)
    } },
  { sign: 'virgo', cap: 'Corrected the lyrics | *on the screen.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { screen(x, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { line1: '♪ ♪ ♪', line2: 'to who it may—', fix: true }) } },
  { sign: 'libra', cap: 'Only does duets. | *With every sign.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 560, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      drawBits(x, MIC, MIC_C, 840, 960, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
      label(x, 790, 700, 'PARTNER #12', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: PINK, rot: 0.04 })
      notes(x, t, 700, 1080, { n: 4, cell: 7, col: PINK, alpha: clamp(lt - 0.5) })
    } },
  { sign: 'scorpio', cap: 'Refused to sing. | Then *stole the night.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: lt => lt > 1.0 ? [0, 0] : [1, 0], star: { x: -160 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'I don’t sing.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      if (lt > 1.0) { drawBits(x, MIC, MIC_C, 560, 960, 16, { rot: 0.3 }); notes(x, t, 400, 760, { n: 5, cell: 8, col: '#c97bff' }) }
      label(x, 790, 920, 'STANDING OVATION', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'So loud the neighbours | *joined in.*', mood: 'wide', star: { x: 150 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 520, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      notes(x, t, 690, 820, { n: 6, cell: 9, col: GOLD })
      bubble(x, 310, 680, '♪ WE’RE IN! ♪', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 310, 1000, 'VOLUME: STREET', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: '#ff6b5a', rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Didn’t sing. | Scored *every singer.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { scorecard(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Sang a song | they wrote *on the way.*', mood: 'sparkle', look: [1, -1], star: { x: -160 },
    front(x, t, lt, P) {
      screen(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { line1: 'NO LYRICS FOUND', line2: '(it’s new)' })
      bubble(x, 790, 990, '♪ ode to a | blue moth ♪', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at a stranger’s | *“happy birthday.”*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, '♪ happy birthday | dear Dave ♪', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 900, 'WHO’S DAVE?', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: PINK, rot: 0.05 })
      hearts(x, t, 790, 1040, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t096', key: 'C', accent: '#ff8fb1', ending: 'lesson',
  title: 'The signs | at *karaoke night.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone sang. | Nobody *tuned.*' },
  lesson: { text: 'Sing badly. | Sing *anyway.*', chip: 'MIC: SHARED' },
  last: { text: 'Scorpio wants | *one more song.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
