// trsignswedding: THE SIGNS AS… wedding guests. (45 s vertical, Star Talk Trends §13.1, music: pop · C)
// Story 0–40.6, then the shared end card. The format look lives in ./signs.js (identical in all five trsigns films).
//   0.0–2.8    "The signs as | *wedding guests.*"  The twelve line up for roll call (Pisces already misty), then dive
//              into the pip row at the bottom.
//   2.8–31.7   the roll call, one stage card per sign (~2.2–2.8 s each):
//              ♈ first on the dance floor. Only one. · ♉ here for the cake. Respectfully. · ♊ gave two toasts, wasn't
//              asked to · ♋ brought tissues for everyone · ♌ asked the photographer for solo shots · ♍ quietly fixed the
//              seating chart · ♎ a new outfit for every course · ♏ knows every secret, tells none · ♐ caught the
//              bouquet from the back row · ♑ home by 9, thank-you card by 10 · ♒ danced all night with the grandmas
//              · ♓ cried at the vows. And the napkins.
//  17.3        card cut (cameo 6 → 7).
//  31.7        "Everyone *showed up.*"  The twelve fly up into a group photo under the bunting. FLASH.
//  33.4        LESSON UNLOCKED: "Showing up | *is the gift.*"  +1 RSVP: YES
//  37.95       "*Plus-one* energy."  Hearts rise off the photo.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, inSprite, starFrame, signChar, pop01, outK,
  GOLD, BONE, PINK, INK, MINT, SKYB, INTER,
} from './signs.js'

// ── props
const CAKE = [
  '.....RR.....',
  '....WWWW....',
  '....WPPW....',
  '...WWWWWW...',
  '...WWPPWW...',
  '..WWWWWWWW..',
  '..WPWWWWPW..',
  '.WWWWWWWWWW.',
  '.WWPPWWPPWW.',
  'WWWWWWWWWWWW',
  'SSSSSSSSSSSS',
]
const CAKE_C = { W: '#fff4e2', P: '#ffb3c8', R: '#ff4f6d', S: '#c9b48a' }
const MIC = ['.GG.', 'GgGG', 'GGGG', '.GG.', '.DD.', '.DD.', '.DD.', '.DD.']
const MIC_C = { G: '#c9c4d8', g: '#ffffff', D: '#3a2d74' }
const BOX = ['....WW....', '...WWWW...', 'BBBBBBBBBB', 'BLLLLLLLLB', 'BLPLLPLLLB', 'BLLLLLLPLB', 'BLLPLLLLLB', 'BBBBBBBBBB']
const BOX_C = { W: '#ffffff', B: '#4fa6d8', L: '#bfe6ff', P: '#ff9fc0' }
const TISSUE = ['WWW', 'WWW', '.W.']
const CROWN = ['G...G...G', 'GG.GGG.GG', 'GGGGGGGGG', 'GRGGBGGRG', 'GGGGGGGGG']
const CROWN_C = { G: GOLD, R: '#ff4f6d', B: '#5fb6ff' }
const CAMERA = ['..KKK...', 'KKKKKKKK', 'KGGKKGGK', 'KGWWWWGK', 'KGWBBWGK', 'KGWWWWGK', 'KKKKKKKK']
const CAMERA_C = { K: '#2a2350', G: '#6b62a8', W: '#c9c4d8', B: '#101030' }
const BOWTIE = ['B....B', 'BB..BB', 'BBKKBB', 'BB..BB', 'B....B']
const BOUQUET = ['.R.P.R.', 'RPRPRPR', '.PRYRP.', '..GGG..', '...G...', '...G...', '..WWW..']
const BOUQ_C = { R: '#ff4f6d', P: '#ffb3c8', Y: '#ffe27a', G: '#5fd38a', W: '#fff4e2' }
const ENV = ['WWWWWWWWWW', 'WPWWWWWWPW', 'WWPWWWWPWW', 'WWWPRRPWWW', 'WWWWPPWWWW', 'WWWWWWWWWW']
const ENV_C = { W: '#f4e8cc', P: '#c9b48a', R: '#c8283c' }
const SWAN = ['.WW.....', 'WWWW....', '.OW.....', '..W.....', '..W..WW.', '..WWWWWW', '.WWWWWWW', '..WWWWW.']
const SWAN_C = { W: '#ffffff', O: '#ffb34a' }

const FLOOR = ['#ff4f86', '#ffd23a', '#5fd38a', '#5fb6ff', '#c97bff']
const ARIES_HOPS = Array.from({ length: 9 }, (_, i) => 0.3 + i * 0.2778)

const CAMEOS = [
  { sign: 'aries', cap: 'First on the dance floor. | *Only one.*', mood: 'sparkle', hops: ARIES_HOPS,
    back(x, t, lt) {
      for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) {
        const on = (Math.floor(lt * 3.6) + i + j * 2) % 3 === 0
        x.fillStyle = on ? FLOOR[(i + j) % 5] : '#2a1f55'; x.globalAlpha = on ? 0.85 : 0.6
        x.fillRect(255 + i * 95, 1060 + j * 50, 90, 46)
      }
      x.globalAlpha = 1
      // the empty chairs, all the other guests still seated
      for (const cx of [190, 890]) drawBits(x, ['BBB', 'B..', 'BBB', 'B.B'], { B: '#6b62a8' }, cx, 1030, 14)
      notes(x, t, 540, 760, { n: 4, col: '#ff4f86', seed: 1 })
    },
    cues: t0 => [0.3, 0.86, 1.41].map(d => ['tick', +(t0 + d).toFixed(3), 0.03]) },
  { sign: 'taurus', cap: 'Here for the *cake.* | Respectfully.', mood: 'heart', look: [1, 0], star: { x: -140 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAKE, CAKE_C, 760, 980, 22 * k)
      sparkles(x, t, 760, 900, P.t0 + 0.5, 8, 140, 1, [GOLD, BONE, PINK])
    } },
  { sign: 'gemini', beats: 5, cap: 'Gave *two* toasts. | Wasn’t asked to.', mood: lt => lt > 1.4 ? 'wink' : 'happy', hops: [0.5, 0.75, 1.4, 1.6, 2.0], star: { x: -60 },
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy + 30, 13, { rot: -0.4 })
      bubble(x, 650, 610, 'and ANOTHER thing—', pop01(t, P.t0 + 0.45, 0.25, 2.2) * outK(t, [P.t0 + 1.3, P.t0 + 1.45]), { size: 38, tail: 'bl' })
      bubble(x, 650, 610, 'ok, LAST thing', pop01(t, P.t0 + 1.45, 0.25, 2.2), { size: 38, tail: 'bl', col: '#ffe27a' })
    },
    cues: t0 => [['pop', +(t0 + 0.45).toFixed(3), 880, 0.035, 0.3], ['pop', +(t0 + 1.45).toFixed(3), 1046.5, 0.035, 0.3]] },
  { sign: 'cancer', cap: 'Brought tissues | for *everyone.*', mood: 'sparkle', tears: 1, star: { x: 110 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 300, 1070, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      for (let i = 0; i < 6; i++) {
        const ph = prog(lt, 0.4 + i * 0.25, 1.1 + i * 0.25)
        if (ph <= 0 || ph >= 1) continue
        const dir = i % 2 ? 1 : -1
        drawBits(x, TISSUE, { W: '#ffffff' }, 300 + dir * ph * (260 + i * 30), 1000 - Math.sin(Math.PI * ph) * 300 + ph * 80, 12, { rot: ph * 6 * dir })
      }
    } },
  { sign: 'leo', cap: 'Asked the photographer | for *solo shots.*', mood: lt => (Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle'), squash: lt => 0.05 * Math.sin(lt * 5),
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 22, 12)
      drawBits(x, CAMERA, CAMERA_C, 230, 640, 14, { rot: 0.15 })
      drawBits(x, CAMERA, CAMERA_C, 850, 660, 14, { rot: -0.15, sx: -1 })
      for (const [fx, fy, d] of [[230, 640, 0.5], [850, 660, 1.0], [230, 640, 1.5], [850, 660, 1.9]]) {
        const q = lt - d
        if (q > 0 && q < 0.25) { x.save(); x.globalAlpha = 1 - q / 0.25; x.fillStyle = '#fffbea'; x.beginPath(); x.arc(fx, fy, 60 + q * 300, 0, Math.PI * 2); x.fill(); x.restore() }
      }
    },
    cues: t0 => [0.5, 1.0, 1.5, 1.9].map(d => ['tick', +(t0 + d).toFixed(3), 0.06]) },
  { sign: 'virgo', beats: 5, cap: 'Quietly fixed the | *seating chart.*', mood: lt => lt > 1.9 ? 'happy' : 'squint', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(330, 900); x.scale(k, k); x.rotate(-0.06)
      x.fillStyle = INK; x.fillRect(-150, -200, 300, 400)
      x.fillStyle = '#a0784a'; x.fillRect(-142, -192, 284, 384)
      x.fillStyle = '#f4e8cc'; x.fillRect(-122, -160, 244, 336)
      x.fillStyle = '#c9c4d8'; x.fillRect(-50, -214, 100, 40)
      // tables: circles of seat dots, a red tick appears on each
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
        const tx = -60 + c * 120, ty = -100 + r * 100, n = r * 2 + c
        x.fillStyle = '#c9b48a'; x.fillRect(tx - 22, ty - 22, 44, 44)
        x.fillStyle = '#7c74f0'; for (let s = 0; s < 6; s++) { const a = s / 6 * Math.PI * 2; x.fillRect(tx + Math.cos(a) * 36 - 5, ty + Math.sin(a) * 36 - 5, 10, 10) }
        if (lt > 0.5 + n * 0.22) drawBits(x, ['....R', '...R.', 'R.R..', '.R...'], { R: '#e23d4e' }, tx + 6, ty - 4, 7, { outline: null })
      }
      x.restore()
    },
    cues: t0 => Array.from({ length: 6 }, (_, n) => ['tick', +(t0 + 0.5 + n * 0.22).toFixed(3), 0.03]) },
  { sign: 'libra', cap: 'A new outfit | for *every* course.', mood: 'sparkle',
    front(x, t, lt, P, F) {
      const OUT = [['#ff4f86', 'Q'], ['#5fb6ff', 'Q'], ['#ffd23a', 'Q'], ['#5fd38a', 'Q'], ['#c97bff', 'Q']]
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))
      drawBits(x, BOWTIE, { B: OUT[n][0], K: INK }, F.x, F.cy + F.S * 0.3, 14)
      const q = (lt - 0.3) % 0.38
      if (lt > 0.68 && lt < 0.3 + 0.38 * 5 && q < 0.15) sparkles(x, t, F.x, F.cy, t - q, 8, 150, n, [OUT[n][0], BONE])
      label(x, 790, 600, `COURSE ${n + 1}`, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: OUT[n][0], rot: 0.06 })
    },
    cues: t0 => [0.68, 1.06, 1.44, 1.82].map(d => ['pop', +(t0 + d).toFixed(3), 1318.51, 0.03, 0.2]) },
  { sign: 'scorpio', cap: 'Knows every *secret.* | Tells none.', mood: 'neutral', look: [1, 0],
    front(x, t, lt, P, F) {
      inSprite(x, F, () => {
        x.fillStyle = '#100a24'; x.fillRect(9.4, 16.6, 8, 5.4); x.fillRect(18.6, 16.6, 8, 5.4); x.fillRect(17.2, 17.4, 1.6, 1.2)
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(10.4, 17.4, 2, 1); x.fillRect(19.6, 17.4, 2, 1)
      })
      const b = (s, d, cx, cy) => bubble(x, cx, cy, s, pop01(t, P.t0 + d, 0.25, 2.2), { size: 30, col: '#c9c4d8' })
      b('psst… the DJ…', 0.4, 270, 620); b('wait, the cousin…', 0.75, 800, 580)
      bubble(x, F.x + 180, F.top - 30, '…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'sagittarius', beats: 5, cap: 'Caught the bouquet. | From *the back row.*', star: { x: 230, s: 270 },
    mood: lt => lt < 1.15 ? 'wide' : 'sparkle', look: lt => lt < 1.15 ? [-1, -1] : undefined, hops: [1.15, 1.45],
    back(x, t, lt) {
      for (let i = 0; i < 4; i++) drawBits(x, ['BBB', 'B..', 'BBB', 'B.B'], { B: '#6b62a8' }, 190 + i * 70, 1080 - i * 10, 10, { alpha: 0.7 })
    },
    front(x, t, lt, P, F) {
      const ph = prog(lt, 0.3, 1.15)
      const bx = ph < 1 ? lerp(160, F.x + 70, ph) : F.x + 70, by = ph < 1 ? lerp(640, F.cy - 40, ph) - Math.sin(Math.PI * ph) * 260 : F.cy - 40
      drawBits(x, BOUQUET, BOUQ_C, bx, by, 13, { rot: ph < 1 ? ph * 9 : -0.3 })
      sparkles(x, t, F.x + 70, F.cy - 40, P.t0 + 1.15, 10, 150, 2, [PINK, GOLD, BONE])
      label(x, 250, 600, 'ROW Z', pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#c97bff', color: BONE, rot: -0.08 })
    },
    cues: t0 => [['whoosh', +(t0 + 0.3).toFixed(3), 0.6, 0.04], ['pop', +(t0 + 1.15).toFixed(3), 1174.66, 0.05, 0.3], ['glitter', +(t0 + 1.15).toFixed(3), +(t0 + 1.5).toFixed(3)]] },
  { sign: 'capricorn', cap: 'Home by 9. | *Thank-you card* by 10.', mood: lt => lt < 1.1 ? 'sleepy' : 'happy', star: { x: 150 },
    back(x, t, lt, P) {
      // the clock: ticks from 9 to 10
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(300, 730); x.scale(k, k)
      for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d < 6.5) { x.fillStyle = d > 5.4 ? INK : '#f4e8cc'; x.fillRect(i * 14 - 7, j * 14 - 7, 14, 14) } }
      const h = lerp(9, 10, ease.inOutCubic(prog(lt, 0.4, 1.3)))
      const ha = (h / 12) * Math.PI * 2 - Math.PI / 2, ma = (h % 1) * Math.PI * 2 - Math.PI / 2
      x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'square'
      x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 40, Math.sin(ha) * 40); x.stroke()
      x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 62, Math.sin(ma) * 62); x.stroke()
      x.restore()
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 1.2, 0.3, 2.2)
      drawBits(x, ENV, ENV_C, 330, 1020, 18 * k, { rot: -0.1 })
      label(x, 330, 1110, 'THANK YOU!', k, { size: 26, bg: '#2fc79a', rot: -0.06 })
    },
    cues: t0 => [['tick', +(t0 + 0.5).toFixed(3), 0.03], ['tick', +(t0 + 0.9).toFixed(3), 0.03], ['bell', +(t0 + 1.2).toFixed(3), 1760, 0.03, 0.8, -0.3]] },
  { sign: 'aquarius', cap: 'Danced all night | with *the grandmas.*', mood: 'happy', star: { x: -160, s: 280 }, hops: [0.4, 0.95, 1.5] },
  { sign: 'pisces', beats: 5, cap: 'Cried at the vows. | And *the napkins.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide', tears: lt => lt < 1.2 ? 2 : 3, star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.1, 0.35, 2.2)
      drawBits(x, SWAN, SWAN_C, 790, 1010, 16 * k)
      label(x, 790, 1120, 'it’s a SWAN', k, { size: 26, bg: '#7c74f0', color: BONE, rot: 0.05 })
      bubble(x, 540, 600, 'they said “I do”', pop01(t, P.t0 + 0.3, 0.25, 2.2) * outK(t, [P.t0 + 1.05, P.t0 + 1.15]), { size: 34, tail: 'bc' })
    },
    cues: t0 => [['pluck', +(t0 + 1.1).toFixed(3), 1318.51, 0.04, 0.6, 0.3], ['pop', +(t0 + 1.2).toFixed(3), 1567.98, 0.04, 0.3]] },
]

// the grandparents: two silver stars with round pixel glasses, hopping in time
const GRAN = [[700, 0.68, 41], [880, 0.4, 42]]
const granOpts = (t, P, d, sd) => ({ color: '#b9b4cc', mood: 'happy', pop: pop01(t, P.t0 + 0.15, 0.32, 2), seed: sd, hops: [d, d + 0.55, d + 1.1].map(v => P.t0 + v), glow: 0.6 })
CAMEOS[10].back = function (x, t, lt, P) {
  for (const [gx, d, sd] of GRAN) {
    const o = granOpts(t, P, d, sd)
    drawStarChar(x, gx, 980, 190, t, o)
    if (o.pop > 0.5) inSprite(x, starFrame(gx, 980, 190, t, o), () => {
      x.fillStyle = INK
      for (const ex of [13.4, 22.6]) { x.fillRect(ex - 3.6, 16, 7.2, 1); x.fillRect(ex - 3.6, 22, 7.2, 1); x.fillRect(ex - 3.6, 16, 1, 7); x.fillRect(ex + 2.6, 16, 1, 7) }
      x.fillRect(16.8, 17.5, 2.4, 0.9)
    })
  }
}
CAMEOS[10].front = function (x, t, lt) { notes(x, t, 790, 720, { n: 3, col: SKYB, seed: 4, alpha: clamp(lt * 2) }) }

const F = makeFilm({
  id: 'trsignswedding', key: 'C', accent: '#ff8fb1',
  title: 'The signs as | *wedding guests.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *showed up.*' },
  lesson: { text: 'Showing up | is *the gift.*', chip: '+1 RSVP: YES' },
  last: {
    text: '*Plus-one* energy.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, 37.95 + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
