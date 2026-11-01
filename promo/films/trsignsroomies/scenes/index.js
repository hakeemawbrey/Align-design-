// trsignsroomies: THE SIGNS AS… roommates. (45 s vertical, Star Talk Trends §13.2, music: pop · D)
// Story 0–40.6, then the shared end card. The format look lives in ./signs.js (identical in all five trsigns films).
//   0.0–2.8    "The signs as | *roommates.*"  The twelve line up for roll call, then dive into the pip row.
//   2.8–31.7   the roll call, one stage card per sign:
//              ♈ builds the shelf without the instructions (three spare screws) · ♉ labels their snacks, shares anyway
//              · ♊ starts a group chat for the fridge · ♋ makes soup when anyone sneezes · ♌ shower concerts, nightly
//              · ♍ a chore chart, laminated · ♎ moves the couch every Sunday · ♏ knows who ate your leftovers
//              · ♐ never home, brings you souvenirs · ♑ pays rent three days early · ♒ built a robot to water the plants
//              · ♓ leaves you sticky notes, cries writing them
//  17.3        card cut (cameo 6 → 7).
//  31.7        "House meeting. | *Everyone* came."  The group photo under the bunting. FLASH.
//  33.4        LESSON UNLOCKED: "Little kindnesses | *add up.*"  +1 CLEAN SPOON
//  37.95       "Dishes are *romance.*"  Soap bubbles and a sparkling plate stack.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, inSprite, starFrame, pop01, outK,
  GOLD, BONE, PINK, INK, MINT, SKYB, INTER,
} from './signs.js'

// ── props
const SHELF = ['WWWWWWWWWWWW', 'W..........W', 'WWWWWWWWWWWW', 'W.........W.', 'WWWWWWWWWW..', 'W........W..', 'WWWWWWWWW...']
const SHELF_C = { W: '#c98a4a' }
const SCREW = ['GGG', '.G.', '.G.', '.G.']
const JAR = ['.KKKK.', 'GGGGGG', 'G.oo.G', 'GLLLLG', 'GLLLLG', 'G.o..G', 'GGGGGG']
const JAR_C = { K: '#c98a4a', G: '#bfe6ff', o: '#e9b24a', L: '#fff4e2' }
const COOKIE = ['.oo.', 'oCoo', 'ooCo', '.oo.']
const COOKIE_C = { o: '#e9b24a', C: '#6b3a1a' }
const PHONE = ['KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KKKKKKK']
const FRIDGE = ['WWWWWWW', 'W.....W', 'W....HW', 'WWWWWWW', 'W.....W', 'W....HW', 'W.....W', 'W.....W', 'WWWWWWW']
const FRIDGE_C = { W: '#dfe8f2', H: '#8a94a8' }
const POT = ['.KKKKKKKK.', 'KK......KK', '.RRRRRRRR.', '.RYYYYYYR.', '.RRRRRRRR.', '.RRRRRRRR.', '..RRRRRR..']
const POT_C = { K: '#8a94a8', R: '#e05a3a', Y: '#ffd98a' }
const SHOWER = ['..GGGG', '.G....', 'G.....', 'G.....', 'G.....']
const COUCH = ['.CCCCCCCCCC.', 'CCccCCCCccCC', 'CCccCCCCccCC', 'CCCCCCCCCCCC', 'CCCCCCCCCCCC', 'L..........L']
const COUCH_C = { C: '#e163d6', c: '#f09ae6', L: '#5a3a2a' }
const BOXL = ['WWWWWW', 'WRRRRW', 'WWWWWW', 'WWWWWW']
const BOXL_C = { W: '#f4e8cc', R: '#e23d4e' }
const SUIT = ['..KK..', '.K..K.', 'PPPPPP', 'PpPPpP', 'PPPPPP', 'PpPPpP', 'PPPPPP', '.K..K.']
const SUIT_C = { K: INK, P: '#a35cf0', p: '#c99aff' }
const CARD = ['WWWWWWW', 'WBBBGGW', 'WBBGGGW', 'WWWWWWW']
const CAL = ['RRRRRRR', 'WWWWWWW', 'W.W.W.W', 'WWWWWWW', 'W.W.W.W', 'WWWWWWW']
const CAL_C = { R: '#2fc79a', W: '#f4e8cc' }
const ROBOT = ['..A..', '.GGG.', 'GEGEG', 'GGGGG', '.GGG.', 'G.G.G', '.G.G.']
const ROBOT_C = { A: '#ff4f6d', G: '#c9c4d8', E: '#38c4ec' }
const PLANT = ['.L.L.', 'LLLLL', '.LLL.', '..L..', 'PPPPP', '.PPP.']
const PLANT_C = { L: '#5fd38a', P: '#c98a4a' }
const NOTE = ['YYYYYY', 'YHYYHY', 'YHHHHY', 'YYHHYY', 'YYYYYY']
const NOTE_C = { Y: '#ffe27a', H: '#ff4f86' }
const PLATE = ['..WWWW..', '.WSSSSW.', 'WSWWWWSW', 'WSWWWWSW', '.WSSSSW.', '..WWWW..']
const PLATE_C = { W: '#ffffff', S: '#bfe6ff' }

/** soap bubbles drifting up */
function soap(x, t, cx, cy, { n = 8, spread = 600, alpha = 1, seed = 0 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.35 + i / n + seed * 0.13) % 1 + 1) % 1
    const bx = cx + Math.sin(i * 2.9 + seed) * spread * 0.5 + Math.sin(ph * 6 + i) * 18, by = cy - ph * 420, r = 10 + (i % 3) * 8
    x.save(); x.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.9
    x.strokeStyle = '#d8f4ff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.stroke()
    x.fillStyle = '#ffffff'; x.fillRect(bx - r * 0.5, by - r * 0.5, 4, 4)
    x.restore()
  }
}
const at = (t0, d) => +(t0 + d).toFixed(3)

const CAMEOS = [
  { sign: 'aries', cap: 'Built the shelf | *without the instructions.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: lt => lt > 1.2 ? [0, 1] : undefined, star: { x: 140 }, hops: [0.3, 0.6, 0.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, SHELF, SHELF_C, 300, 900, 18 * k, { rot: 0.08 + 0.03 * Math.sin(lt * 9) })
      for (let i = 0; i < 3; i++) drawBits(x, SCREW, { G: '#c9c4d8' }, 560 + i * 50, 1110, 7 * pop01(t, P.t0 + 1.2 + i * 0.1, 0.25, 2.4), { rot: 1.4 })
      label(x, 610, 1040, '…extra?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 24, bg: BONE, rot: 0.08 })
    },
    cues: t0 => [0.3, 0.6, 0.9].map(d => ['tick', at(t0, d), 0.05]).concat([['pluck', at(t0, 1.2), 1318.51, 0.03, 0.4, 0.2], ['pluck', at(t0, 1.3), 1567.98, 0.03, 0.4, 0.2], ['pluck', at(t0, 1.4), 1760, 0.03, 0.4, 0.2]]) },
  { sign: 'taurus', cap: 'Labels their snacks. | *Shares anyway.*', mood: lt => lt > 1.0 ? 'happy' : 'squint', look: [1, 0], star: { x: -140 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, JAR, JAR_C, 760, 940, 26 * k)
      label(x, 760, 965, 'MINE', k, { size: 26, bg: '#e9b24a', rot: -0.04 })
    },
    front(x, t, lt, P, F) {
      const ph = ease.inOutCubic(prog(lt, 1.0, 1.5))
      if (lt > 1.0) drawBits(x, COOKIE, COOKIE_C, lerp(760, 940, ph), lerp(880, 1060, ph) - Math.sin(Math.PI * ph) * 100, 12)
      if (lt > 1.5) label(x, 900, 1140, 'for you', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 24, bg: PINK, rot: 0.06 })
    },
    cues: t0 => [['pop', at(t0, 1.5), 1174.66, 0.04, 0.3]] },
  { sign: 'gemini', beats: 5, cap: 'Started a group chat | for *the fridge.*', mood: lt => lt > 1.7 ? 'wink' : 'happy', star: { x: -170 }, hops: [0.6, 1.0, 1.4],
    back(x, t, lt, P) { drawBits(x, FRIDGE, FRIDGE_C, 820, 930, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const b = (s, d, cy, col) => bubble(x, 560, cy, s, pop01(t, P.t0 + d, 0.22, 2.2), { size: 34, col, tail: 'br' })
      b('who took the oat milk', 0.5, 600, BONE); b('also who bought 3 oat milks', 0.95, 690, BONE); b('nvm. it was me', 1.5, 780, '#ffe27a')
    },
    cues: t0 => [0.5, 0.95, 1.5].map((d, i) => ['pop', at(t0, d), [880, 987.77, 1174.66][i], 0.035, 0.2]) },
  { sign: 'cancer', cap: 'Makes soup when | *anyone* sneezes.', mood: 'sparkle', star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, POT, POT_C, 320, 1020, 22 * k)
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * k; x.fillStyle = BONE; for (let j = 0; j < 5; j++) x.fillRect(290 + i * 30 + Math.sin(ph * 8 + j) * 12, 930 - ph * 200 - j * 14, 10, 10); x.restore() }
      bubble(x, 300, 640, 'achoo!', pop01(t, P.t0 + 0.3, 0.2, 2.4) * outK(t, [P.t0 + 0.9, P.t0 + 1.0]), { size: 32, col: '#c9c4d8' })
      label(x, 320, 1150, 'SOUP. NOW.', pop01(t, P.t0 + 0.95, 0.25, 2.2), { size: 26, bg: '#3fb6f0', rot: -0.05 })
    },
    cues: t0 => [['pop', at(t0, 0.3), 659.25, 0.04, -0.3], ['pluck', at(t0, 0.95), 1174.66, 0.035, 0.5, -0.3]] },
  { sign: 'leo', cap: 'Shower concerts. | *Nightly.*', mood: lt => (Math.floor(lt * 2) % 2 ? 'happy' : 'sparkle'), squash: lt => 0.06 * Math.sin(lt * 6), hops: [0.5, 1.0, 1.5],
    back(x, t, lt) {
      drawBits(x, SHOWER, { G: '#c9c4d8' }, 470, 640, 18)
      for (let i = 0; i < 14; i++) { const ph = ((t * 1.6 + i / 14) % 1); x.fillStyle = SKYB; x.globalAlpha = 0.7; x.fillRect(420 + (i % 7) * 26 + ph * 20, 660 + ph * 420, 6, 16) }
      x.globalAlpha = 1
    },
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 60, F.top + 20, { n: 5, col: '#f39a3a', seed: 2 })
      label(x, 820, 1120, 'ENCORE?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 26, bg: '#f39a3a', rot: 0.06 })
    } },
  { sign: 'virgo', beats: 5, cap: 'A chore chart. | *Laminated.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 900); x.scale(k, k); x.rotate(-0.05)
      x.fillStyle = INK; x.fillRect(-160, -190, 320, 380); x.fillStyle = '#f4e8cc'; x.fillRect(-150, -180, 300, 360)
      const rows = ['DISHES', 'TRASH', 'PLANTS', 'VIBES']
      x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      rows.forEach((r, j) => {
        x.fillStyle = INK; x.fillText(r, -130, -120 + j * 80)
        for (let c = 0; c < 3; c++) { x.fillStyle = '#e8d9b8'; x.fillRect(10 + c * 44, -138 + j * 80, 34, 34); if (lt > 0.45 + (j * 3 + c) * 0.08) { x.fillStyle = '#ef5c94'; x.fillRect(18 + c * 44, -130 + j * 80, 18, 18) } }
      })
      // the lamination shine
      const sh = prog(lt, 1.5, 2.0)
      if (sh > 0 && sh < 1) { x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); const sx = -200 + sh * 400; x.moveTo(sx, -190); x.lineTo(sx + 50, -190); x.lineTo(sx - 30, 190); x.lineTo(sx - 80, 190); x.fill() }
      x.restore()
      sparkles(x, t, 320, 900, P.t0 + 1.6, 8, 200, 1, [BONE, '#ef5c94', GOLD])
    },
    cues: t0 => [['whoosh', at(t0, 1.5), 0.35, 0.03], ['bell', at(t0, 1.6), 1760, 0.03, 0.8, -0.3], ['glitter', at(t0, 1.6), at(t0, 1.9)]] },
  { sign: 'libra', cap: 'Moves the couch | *every Sunday.*', mood: 'sparkle', star: { y: -120, s: 260 }, look: lt => [Math.sin(lt * 3) > 0 ? 1 : -1, 1],
    back(x, t, lt, P) {
      const spots = [540, 300, 780, 540]
      const n = Math.min(3, Math.floor(lt / 0.5)), ph = ease.inOutCubic(prog(lt % 0.5, 0, 0.3))
      const cx = n >= 3 ? spots[3] : lerp(spots[n], spots[n + 1], ph)
      drawBits(x, COUCH, COUCH_C, cx, 1060, 22 * pop01(t, P.t0 + 0.05, 0.3, 2))
      label(x, 820, 620, n >= 3 ? 'perfect.' : 'hmm…', 1, { size: 28, bg: '#e163d6', color: BONE, rot: 0.06 })
    },
    cues: t0 => [0.5, 1.0, 1.5].map(d => ['whoosh', at(t0, d), 0.25, 0.025]) },
  { sign: 'scorpio', cap: 'Knows who ate | *your leftovers.*', mood: 'squint', look: [1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOXL, BOXL_C, 760, 1060, 26 * k)
      label(x, 760, 1000, 'EMPTY', k, { size: 22, bg: '#e23d66', color: BONE })
    },
    front(x, t, lt, P, F) {
      // a magnifying glass sweeps toward the camera…
      const ph = prog(lt, 0.4, 1.4), gx = lerp(560, 760, ph), gy = 760 + Math.sin(ph * 6) * 40
      x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(gx, gy, 52, 0, Math.PI * 2); x.stroke()
      x.strokeStyle = '#c9c4d8'; x.lineWidth = 9; x.beginPath(); x.arc(gx, gy, 52, 0, Math.PI * 2); x.stroke()
      x.fillStyle = INK; x.save(); x.translate(gx, gy); x.rotate(0.8); x.fillRect(48, -10, 70, 20); x.restore()
      bubble(x, 560, 560, 'I know. I’m not mad.', pop01(t, P.t0 + 1.35, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'sagittarius', beats: 5, cap: 'Never home. | *Brings you souvenirs.*', mood: 'sparkle', star: { x: 170 }, hops: [0.3, 1.2],
    back(x, t, lt, P) { drawBits(x, SUIT, SUIT_C, 820, 1060, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P, F) {
      for (let i = 0; i < 4; i++) {
        const ph = ease.outCubic(prog(lt, 0.5 + i * 0.25, 0.9 + i * 0.25))
        if (ph <= 0) continue
        drawBits(x, CARD, { W: '#f4e8cc', B: ['#5fb6ff', '#ff8fb1', '#ffd23a', '#5fd38a'][i], G: '#a35cf0' }, lerp(F.x, 260 + (i % 2) * 120, ph), lerp(F.cy, 720 + Math.floor(i / 2) * 140 + i * 18, ph), 14, { rot: (i - 1.5) * 0.25 * ph })
      }
      label(x, 320, 1080, 'a magnet. a rock. a hat.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 24, bg: '#a35cf0', color: BONE, rot: -0.04 })
    },
    cues: t0 => [0, 1, 2, 3].map(i => ['pop', at(t0, 0.5 + i * 0.25), [880, 987.77, 1174.66, 1318.51][i], 0.03, -0.3]) },
  { sign: 'capricorn', cap: 'Pays rent | *three days early.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, CAL, CAL_C, 330, 880, 30 * k)
      // the circle around today, three days before the due date
      if (lt > 0.6 && k > 0.5) { x.strokeStyle = '#ff4f6d'; x.lineWidth = 8; x.beginPath(); x.arc(330 - 60, 880 + 15, 34, 0, Math.PI * 2 * clamp((lt - 0.6) / 0.35)); x.stroke() }
      label(x, 330, 1060, 'DUE: FRIDAY', k, { size: 24, bg: '#f4e8cc' })
      label(x, 330, 1130, 'PAID: TUESDAY', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 24, bg: '#2fc79a', rot: 0.04 })
    },
    cues: t0 => [['tick', at(t0, 0.7), 0.04], ['bell', at(t0, 1.0), 1760, 0.03, 0.8, -0.3]] },
  { sign: 'aquarius', cap: 'Built a robot | to *water the plants.*', mood: 'sparkle', star: { x: -180 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 0; i < 3; i++) drawBits(x, PLANT, PLANT_C, 640 + i * 110, 1100, 14 * k)
      const rx = 640 + 110 * ((Math.floor(lt / 0.6)) % 3)
      drawBits(x, ROBOT, ROBOT_C, rx + 10 * Math.sin(lt * 10), 950 + 6 * Math.sin(lt * 14), 16 * pop01(t, P.t0 + 0.35, 0.3, 2))
      for (let j = 0; j < 4; j++) { x.fillStyle = SKYB; x.fillRect(rx - 6 + j * 4, 1010 + ((t * 300 + j * 20) % 50), 6, 10) }
    },
    front(x, t, lt, P) { label(x, 280, 620, 'beep. hydrated.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 26, bg: '#38c4ec', rot: -0.05 }) },
    cues: t0 => [['pop', at(t0, 0.35), 1318.51, 0.035, 0.3], ['pop', at(t0, 0.95), 1567.98, 0.03, 0.3], ['pop', at(t0, 1.55), 1567.98, 0.03, 0.3]] },
  { sign: 'pisces', beats: 5, cap: 'Leaves you sticky notes. | *Cries writing them.*', mood: 'sparkle', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -150 },
    back(x, t, lt, P) {
      const msgs = ['u got this', 'did u eat?', 'proud of u']
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2.2)
        if (k <= 0.01) continue
        x.save(); x.translate(760, 640 + i * 170); x.rotate((i - 1) * 0.1); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-112, -62, 224, 124); x.fillStyle = ['#ffe27a', '#ff9fc0', '#9fe6b0'][i]; x.fillRect(-106, -56, 212, 112)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(msgs[i], 0, 4)
        x.restore()
      }
    },
    cues: t0 => [0, 1, 2].map(i => ['pop', at(t0, 0.4 + i * 0.35), [987.77, 1174.66, 1318.51][i], 0.035, 0.3]) },
]

const F = makeFilm({
  id: 'trsignsroomies', key: 'D', accent: '#7fe0ff',
  title: 'The signs as | *roommates.*',
  cameos: CAMEOS,
  group: { cap: 'House meeting. | *Everyone* came.' },
  lesson: { text: 'Little kindnesses | *add up.*', chip: '+1 CLEAN SPOON' },
  last: {
    text: 'Dishes are | *romance.*',
    draw(x, t, lt) {
      soap(x, t, 540, 1560, { n: 12, spread: 900, alpha: clamp(lt * 2), seed: 1 })
      for (let i = 0; i < 4; i++) drawBits(x, PLATE, PLATE_C, 540, 1640 - i * 34, 22 * pop01(t, 37.95 + 0.4 + i * 0.08, 0.25, 2.2))
      sparkles(x, t, 540, 1560, 37.95 + 0.75, 10, 150, 2, [BONE, SKYB, GOLD])
    },
    cues: t0 => [0, 1, 2, 3].map(i => ['tick', at(t0, 0.4 + i * 0.08), 0.035]).concat([['bell', at(t0, 0.75), 2349.32, 0.025, 1, 0], ['glitter', at(t0, 0.75), at(t0, 1.1)]]),
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
