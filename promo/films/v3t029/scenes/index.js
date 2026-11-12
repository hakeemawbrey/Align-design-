// v3t029: THE SIGNS AS… v3, "The signs on | a rainy Sunday." (~62 s vertical, signs3kit social cut, music: lofi · F)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs on | a *rainy Sunday.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one rainy Sunday per sign (3.8 s each), pushed to the extreme:
//              ♈ went for a run, in the storm · ♉ became one with the blanket · ♊ five new hobbies by noon
//              · ♋ baked for their match, batch six · ♌ danced in the rain, crowd: zero · ♍ cleaned the windows (it's raining)
//              · ♎ picking a film, hour two · ♏ brooded at the window, iconically · ♐ built a fort, called it an expedition
//              · ♑ prepped all of Monday · ♒ named every raindrop · ♓ saw a wet pigeon, wept
//  49.2        "Nobody | *got dressed.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Slow days count. | *Rest* is allowed."  SUNDAY: SAVED
//  58.3        "Taurus got up. | For *the cookies.*" over the match card: Taurus + Cancer (the blanket and batch six, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const COOKIE = pad(['.BBBB.', 'BBKBBB', 'BBBBKB', 'BKBBBB', '.BBBB.'])
const UMB = pad(['....PPPPP....', '..PPPPPPPPP..', '.PPPPPPPPPPP.', 'PPPPPPPPPPPPP', 'P..P..P..P..P', '......K......', '......K......', '......K......', '......K......', '.....KK......'])
const PIGEON = pad(['..GG.....', '.GGKG....', 'YGGGG....', '..GGGGGG.', '..GGGGGGG', '...GGGGG.', '....Y.Y..'])
const BOX = pad(['KKKKKKKK', 'KGGGGGGK', 'KGWGGRGK', 'KGGGGGGK', 'KKKKKKKK'])

/** rain streaks over a region */
function rain(x, t, l, tp, w, h, { n = 26, alpha = 0.6, seed = 0 } = {}) {
  x.save(); x.globalAlpha = alpha; x.fillStyle = SKYB
  for (let i = 0; i < n; i++) {
    const ph = ((t * 1.6 + i * 0.137 + seed) % 1 + 1) % 1
    x.fillRect(l + ((i * 97 + seed * 31) % w), tp + ph * h, 4, 22)
  }
  x.restore()
}
function windowFrame(x, cx, cy, k, w = 260, h = 300) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24); x.fillStyle = '#9aa5c4'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a3a6a'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#9aa5c4'; x.fillRect(-4, -h / 2, 8, h); x.fillRect(-w / 2, -4, w, 8)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Went for a run. | *In the storm.*', mood: 'sparkle', star: { x: -40 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
    back(x, t, lt, P) { rain(x, t, 140, 480, 800, 720, { n: 40, alpha: 0.7 }) },
    front(x, t, lt, P) {
      label(x, 760, 650, 'KM 14', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 760, 1080, 'refreshing!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Became one | *with the blanket.*', mood: 'sleepy', star: { x: 0, y: 40 }, hideStar: false,
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.3, 0.9))
      if (k > 0.01) {
        x.save(); x.globalAlpha = 1; x.fillStyle = INK; x.beginPath(); x.ellipse(540, 1070, 250 * k + 8, 110 * k + 8, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#b7a6ff'; x.beginPath(); x.ellipse(540, 1070, 250 * k, 110 * k, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#8f7ae0'; for (let i = 0; i < 5; i++) x.fillRect(370 + i * 75, 1010 + (i % 2) * 20, 28 * k, 100 * k)
        x.restore()
      }
      label(x, 540, 660, 'STATUS: BURRITO', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Five new hobbies. | *By noon.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const H = ['knitting', 'ukulele', 'pottery', 'chess', 'calligraphy']
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.35))
      label(x, 790, 760, `HOBBY #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, H[n - 1], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1120, '11:58 A.M.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Baked for their match. | *Batch six.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 12))
      for (let i = 0; i < n; i++) drawBits(x, COOKIE, { B: '#d9a066', K: '#5b3a22' }, 690 + (i % 4) * 66, 860 + Math.floor(i / 4) * 70, 10, { rot: i * 0.4 })
      label(x, 790, 720, 'BATCH 6', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, '✦ FOR MY MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Danced in the rain. | *Crowd: zero.*', mood: 'sparkle', star: { x: -150 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { rain(x, t, 140, 480, 800, 720, { n: 34, alpha: 0.6, seed: 3 }) },
    front(x, t, lt, P, F) {
      drawBits(x, UMB, { P: ORANGE, K: INK }, F.x + 40, F.top - 60, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 * Math.sin(t * 4) })
      label(x, 790, 820, 'ENCORE!', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 44, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'thank you!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Cleaned the windows. | *It’s raining.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      windowFrame(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.3) { x.save(); x.beginPath(); x.rect(660, 700, 260, 300); x.clip(); rain(x, t, 660, 690, 260, 320, { n: 14, alpha: 0.8, seed: 2 }); x.restore() }
      sparkles(x, t, 790, 850, P.t0 + 0.6, 6, 130, 0.3, [BONE, SKYB])
      label(x, 790, 1080, 'STREAK-FREE (FOR NOW)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Picking a film. | *Hour two.*', mood: lt => lt > 1.5 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const F2 = ['the sad one?', 'the funny one?', 'the long one?', 'the sad one?']
      bubble(x, 790, 760, F2[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 990, '✦ MATCH: “just pick!”', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Stared at the rain. | *Brooding. Beautifully.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      windowFrame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.3) { x.save(); x.beginPath(); x.rect(660, 670, 260, 300); x.clip(); rain(x, t, 660, 660, 260, 320, { n: 16, alpha: 0.8, seed: 5 }); x.restore() }
      label(x, 790, 1060, 'MOOD: POETRY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Built a fort. | Called it *an expedition.*', mood: 'sparkle', star: { x: 150, y: 30 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(690, 1010); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-290, 120); x.lineTo(0, -240); x.lineTo(290, 120); x.closePath(); x.fill()
      x.fillStyle = '#ff9a4a'; x.beginPath(); x.moveTo(-270, 112); x.lineTo(0, -222); x.lineTo(270, 112); x.closePath(); x.fill()
      x.fillStyle = '#ffd23a'; for (let i = 0; i < 4; i++) x.fillRect(-200 + i * 110, 0, 50, 112)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 320, 680, 'BASE CAMP', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: GOLD, rot: -0.05 })
      bubble(x, 330, 960, 'day 1 of | the journey', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Sunday? | *Prepped all of Monday.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const D = ['MON', 'MON', 'MON', 'MON', 'MON', 'MON']
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.28))
      for (let i = 0; i < n; i++) {
        const cx = 700 + (i % 2) * 180, cy = 760 + Math.floor(i / 2) * 140
        drawBits(x, BOX, { K: INK, G: '#2fc79a', W: '#fff4e2', R: RED }, cx, cy, 16)
        label(x, cx, cy + 50, D[i], 1, { size: 22, bg: BONE, rot: 0, font: MONO, weight: 700 })
      }
      bubble(x, 520, 600, 'Monday: handled', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Named | *every raindrop.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) { rain(x, t, 560, 480, 400, 720, { n: 14, alpha: 0.7, seed: 7 }) },
    front(x, t, lt, P) {
      const N = ['Dave', 'Priya', 'Zed', 'Lou', 'Kiki', 'Bo']
      const n = Math.floor(Math.max(0, lt - 0.3) / 0.3)
      label(x, 790, 820, `DROP #${400 + n * 3}: ${N[n % N.length]}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1030, 'bye, Lou!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw a wet pigeon. | *Wept for it.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rain(x, t, 600, 480, 360, 720, { n: 14, alpha: 0.7, seed: 9 }) },
    front(x, t, lt, P) {
      drawBits(x, PIGEON, { G: '#9aa5c4', K: INK, Y: ORANGE }, 800, 970, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      label(x, 790, 740, 'HE’S SO BRAVE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: LAV, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t029', key: 'F', accent: SKYB, ending: 'card',
  title: 'The signs on | a *rainy Sunday.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Nobody | *got dressed.*' },
  lesson: { text: 'Slow days count. | *Rest* is allowed.', chip: 'SUNDAY: SAVED' },
  last: {
    text: 'Taurus got up. | For *the cookies.*',
    draw(x, t, lt) { for (let i = 0; i < 5; i++) drawBits(x, COOKIE, { B: '#d9a066', K: '#5b3a22' }, 340 + i * 100, 1420 - Math.sin(t * 2 + i) * 10, 12 * pop01(t, t - lt + 1.6 + i * 0.1, 0.3, 2), { rot: i }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
