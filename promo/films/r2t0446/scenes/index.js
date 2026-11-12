// r2t0446: star_talk, ROLLCALL, "The signs | at a *magic show.*" (~61 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order at a magic show, each the most extreme version of itself. Ending: lesson.
//   0.0–3.6    hook
//   3.6–49.2   ♈ volunteered before the doors opened · ♉ made the snacks vanish · ♊ picked a card, then eleven more
//              · ♋ adopted the rabbit · ♌ took the magician's bow · ♍ sent the magician notes · ♎ missed it, loved the cape
//              · ♏ found the secret door, kept it · ♐ joined the tour mid-show · ♑ franchised the trick
//              · ♒ vanished, liked it there · ♓ sobbed when the dove came back
//  49.2        "Nobody watched | *the magician.*"
//  52.4        LESSON: "Stay a little | *amazed.*"  WONDER: ON
//  58.3        "Pisces is | *still crying.*" (doves)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, spot, BM, RED, CREAM, ORANGE, WOOD, GREEN } from './props.js'

const BUCKET = ['RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.', '.RWRWRW.', '..RWRW..']
const BUCKET_C = { R: RED, W: CREAM }
const CRUMB = ['YY', 'YY']

/** a fan of playing cards, n of them, spread around (cx, cy) */
function fan(x, cx, cy, n, k) {
  for (let i = 0; i < n; i++) {
    const a = (i - (n - 1) / 2) * 0.16
    x.save(); x.translate(cx, cy + 90); x.rotate(a); x.translate(0, -90)
    drawBits(x, BM.CARD, BM.CARD_C, 0, 0, 13 * k)
    x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Volunteered before | the *doors opened.*', mood: 'sparkle', star: { x: -160 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'PICK ME!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 54, col: GOLD, tail: 'bl' })
      label(x, 780, 880, 'DOORS: 8 P.M.', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 780, 990, 'NOW: 5:12 P.M.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Best trick of the night: | the *snacks vanished.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, BUCKET, BUCKET_C, 790, 960, 26 * k)
      // popcorn in the bucket, eaten away
      const left = Math.max(0, 6 - Math.floor(lt * 3.2))
      for (let i = 0; i < left; i++) drawBits(x, CRUMB, { Y: '#fff1a8' }, 720 + i * 28, 880 - (i % 2) * 18, 13 * k)
      label(x, 790, 700, lt > 1.6 ? '✦ TA-DA ✦' : 'POPCORN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: lt > 1.6 ? GOLD : BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Picked a card. | Then *eleven more.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(prog(lt, 0.3, 1.8) * 11))
      fan(x, 790, 840, n, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1100, 'and this one!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Adopted | the *rabbit.*', mood: 'heart', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, BM.TOPHAT, BM.TOPHAT_C, 790, 1010, 22 * k)
      const up = ease.outBack ? ease.outCubic(prog(lt, 0.4, 0.9)) : prog(lt, 0.4, 0.9)
      if (lt > 0.4) drawBits(x, BM.BUNNY, BM.BUNNY_C, 790, lerp(990, 870, up), 18)
      if (lt > 1.1) drawBits(x, BM.BLANKET, BM.BLANKET_C, 790, 930, 13 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 790, 680, 'HE LIVES WITH ME NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'The trick ended. | Leo *took the bow.*', mood: 'sparkle', star: { x: -60 }, hops: [1.2], squash: lt => lt > 1.1 && lt < 1.8 ? 0.08 : 0,
    back(x, t, lt, P) { spot(x, 480, 470, 1200, 520, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'thank you, | thank you!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      if (lt > 1.2) for (let i = 0; i < 4; i++) { const p = prog(lt, 1.2 + i * 0.15, 2.2 + i * 0.15); if (p > 0 && p < 1) drawBits(x, BM.STAR5, BM.STAR5_C, 260 + i * 160, lerp(500, 1150, p), 7) }
      sparkles(x, t, 480, 820, P.t0 + 1.2, 8, 220, 0.3)
    } },
  { sign: 'virgo', cap: 'Saw how it worked. | *Sent notes.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 350, h: 380, head: 'NOTES: ACT 1', headCol: MINT, size: 28, rows: [
        ['sleeve: visible', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['card: bent', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['rabbit: unpaid?', RED, pop01(t, P.t0 + 1.1, 0.2, 2)], ['overall: 6/10', INK, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Missed the trick. | Loved *the cape.*', mood: 'heart', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      // a swishy red cape on a hanger
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k); x.rotate(0.05 * Math.sin(t * 2.5))
        x.fillStyle = INK; x.fillRect(-10, -190, 20, 30); x.fillRect(-110, -165, 220, 14)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-108, -160); x.lineTo(108, -160); x.lineTo(150, 150); x.lineTo(-150, 150); x.closePath(); x.fill()
        x.fillStyle = RED; x.beginPath(); x.moveTo(-100, -152); x.lineTo(100, -152); x.lineTo(140, 142); x.lineTo(-140, 142); x.closePath(); x.fill()
        x.fillStyle = '#ff6b7a'; x.fillRect(-60, -140, 16, 270); x.fillRect(30, -140, 16, 270)
        x.restore()
      }
      label(x, 790, 1110, 'CAPE: 10/10', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Found the secret door. | *Kept it.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -180, 240, 360)
        x.fillStyle = '#6b3a5a'; x.fillRect(-108, -168, 216, 336)
        x.fillStyle = '#4a2440'; x.fillRect(-90, -150, 80, 130); x.fillRect(10, -150, 80, 130); x.fillRect(-90, 0, 80, 150); x.fillRect(10, 0, 80, 150)
        x.restore()
      }
      drawBits(x, BM.LOCK, BM.LOCK_C, 840, 880, 13 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1110, 'PRIVATE: SCORPIO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Joined the tour. | *Mid-show.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      sheet(x, 320, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'TOUR: 40 CITIES', headCol: ORANGE, size: 28, headSize: 26, rows: [] })
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.6) {
        const p = prog(lt, 0.5, 1.8)
        x.save(); x.fillStyle = RED
        for (let i = 0; i < 9; i++) if (i / 9 < p) x.fillRect(200 + i * 30, 880 - Math.sin(i * 0.9) * 50, 14, 14)
        x.restore()
      }
      bubble(x, 320, 1080, 'back in june!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Learned the trick. | *Started a franchise.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, BM.TOPHAT, BM.TOPHAT_C, 220 + (i % 3) * 120, 760 + Math.floor(i / 3) * 140, 13 * pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2.2))
      label(x, 340, 1070, 'CAPRICORN MAGIC CO.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Got made to vanish. | *Liked it there.*', hideStar: true, star: { x: -160 },
    front(x, t, lt, P, F) {
      const a = 1 - 0.85 * ease.inOutCubic(prog(lt, 0.4, 1.1))
      signChar(x, t, 'aquarius', 380, 880, 300, { mood: lt > 1.1 ? 'sparkle' : 'wide', pop: P.k, alpha: a, seed: 14, hops: [P.t0 + 0.1] })
      sparkles(x, t, 380, 860, P.t0 + 0.8, 8, 160, 0.6, [SKYB, BONE, LAV])
      bubble(x, 780, 760, "it's nice | in here.", pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The dove came back. | Pisces *sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.3, 1.1))
      if (lt > 0.3) drawBits(x, BM.DOVE, BM.DOVE_C, lerp(1000, 790, p), lerp(560, 800, p) + 8 * Math.sin(t * 9), 17, { sx: -1 })
      drawBits(x, BM.TOPHAT, BM.TOPHAT_C, 790, 920, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1080, "HE'S HOME", pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0446', key: 'C', accent: '#c97bff', ending: 'lesson',
  title: 'The signs | at a *magic show.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody watched | *the magician.*' },
  lesson: { text: 'Stay a little | *amazed.*', chip: 'WONDER: ON' },
  last: {
    text: 'Pisces is | *still crying.*',
    draw(x, t, lt) { for (let i = 0; i < 3; i++) { const p = ((lt * 0.35 + i / 3) % 1); drawBits(x, BM.DOVE, BM.DOVE_C, lerp(-60, 1140, p), 1150 + i * 70 + 10 * Math.sin(t * 8 + i), 15) } },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
