// r2t0298: star_talk, SOLO, "Pisces coworkers | *be like.*" (topic: Your Pisces coworker be like) (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way: nine office moments, each the most extreme Pisces version, and Pisces cries in every one.
// Ending: callback (the office fern from card two grows back).
//   0.0–3.6    "Your Pisces coworker | *be like.*"
//   3.6–37.8   nine cards: "great job" → cried in the supply closet · the office fern wilted, held a memorial
//              · sang happy birthday, cried at verse one · screensaver ocean, "working: on a beach"
//              · the spreadsheet broke, comforted the spreadsheet · seating chart by sign, everyone compatible
//              · two-minute standup, shared a dream for twenty · farewell card, fourteen pages · Friday 5 p.m. goodbyes
//  37.8        "Feels everything. | *Clocks in anyway.*"
//  41.2        CALLBACK: "Monday: the fern | *grew back.*"  the fern returns, Pisces sobbing with joy.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = LAV, RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#c98f5a'
const ST = { x: -200 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const FERN_DEAD = ['..b.b..', '.b...b.', 'b..b..b', '...b...', '...b...', '.KKKKK.', '.KRRRK.', '.KRRRK.', '..KKK..']
const FERN = ['G.G.G.G', '.GGGGG.', 'GGgGgGG', '.GgGgG.', 'G.GGG.G', '.KKKKK.', '.KRRRK.', '.KRRRK.', '..KKK..']
const FERN_C = { G: '#4ac77d', g: '#2f9a5a', b: '#a8742a', K: INK, R: '#c96a3a' }
const CANDLE = ['.Y.', 'YOY', '.W.', '.W.', '.W.', '.W.']
const CAKE = ['.Y.Y.Y.', '.W.W.W.', 'PPPPPPP', 'CCCCCCC', 'PPPPPPP', 'CCCCCCC']
const CAKE_C = { Y: GOLD, W: '#fff', P: PINK, C: CREAM }

function monitor(x, t, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -140, 360, 250); x.fillRect(-20, 110, 40, 50); x.fillRect(-80, 150, 160, 18)
  x.fillStyle = '#2a2350'; x.fillRect(-170, -130, 340, 230)
  x.save(); x.beginPath(); x.rect(-156, -116, 312, 202); x.clip(); fn(); x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: 'pisces', cap: 'Boss said “great job.” | *Sobbed* in the closet.', mood: 'wide', tears: 3, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -220, 240, 440); x.fillStyle = '#9aa5c4'; x.fillRect(-110, -210, 220, 420)
        x.fillStyle = GOLD; x.fillRect(64, 0, 22, 22)
        x.restore()
      }
      bubble(x, 790, 600, 'great job!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1120, 'CLOSET: OCCUPIED', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'The office fern wilted. | Held a *memorial.*', mood: 'neutral', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      drawBits(x, FERN_DEAD, FERN_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const kc = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, CANDLE, { Y: GOLD, O: '#ffb34a', W: BONE }, 650, 960, 14 * kc); drawBits(x, CANDLE, { Y: GOLD, O: '#ffb34a', W: BONE }, 930, 960, 14 * kc)
      L(x, 790, 1110, 'RIP FERN (2 WEEKS)', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Sang “happy birthday.” | *Cried at line one.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 0.9 ? 3 : 1, star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 680, 'happy birth—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 790, 1100, 'SONG: UNFINISHED', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Ocean screensaver. | *Mentally* on a beach.', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      monitor(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = '#8fe3ff'; x.fillRect(-160, -120, 320, 210)
        x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(80, -60, 30, 0, 7); x.fill()
        x.fillStyle = '#3d8fd8'; for (let i = 0; i < 3; i++) { x.beginPath(); for (let j = 0; j <= 16; j++) { const xx = -160 + j * 20, yy = 10 + i * 30 + Math.sin(t * 3 + j * 0.8 + i) * 8; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.lineTo(160, 100); x.lineTo(-160, 100); x.fill() }
      })
      L(x, 790, 1080, 'STATUS: ON A BEACH', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Spreadsheet broke. | Comforted *the spreadsheet.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      monitor(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = '#fff'; x.fillRect(-160, -120, 320, 210)
        x.strokeStyle = '#c9c9d8'; x.lineWidth = 2
        for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(-160 + i * 40, -120); x.lineTo(-160 + i * 40, 90); x.stroke() }
        for (let j = 0; j <= 6; j++) { x.beginPath(); x.moveTo(-160, -120 + j * 35); x.lineTo(160, -120 + j * 35); x.stroke() }
        x.fillStyle = RED; x.fillRect(-40, -50, 80, 35); x.fillStyle = '#fff'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('#ERR', 0, -32)
      })
      bubble(x, 790, 1060, 'it’s okay, B4.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Made the seating chart. | *By sign.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', tears: lt => lt > 1.4 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = CREAM; x.fillRect(-162, -162, 324, 324)
        const IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo']
        x.restore()
        for (let i = 0; i < 6; i++) { const kk = pop01(t, P.t0 + 0.4 + i * 0.12, 0.3, 2) * k; if (kk > 0.01) signChar(x, t, IDS[i], 790 + ((i % 3) - 1) * 100, 760 + Math.floor(i / 3) * 140, 90 * kk, { mood: 'happy', seed: 70 + i, glyph: false, glow: 0.5 }) }
      }
      L(x, 790, 1080, 'EVERYONE: COMPATIBLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Two-minute standup. | Shared *a dream.* Twenty.', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so then | the whale said…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      const m = Math.min(20, 2 + Math.floor(clamp((lt - 0.6) / 1.4) * 18))
      L(x, 790, 900, `STANDUP: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), m > 2 ? RED : BONE, 0.04, 34)
      L(x, 790, 1060, 'TEAM: ALSO CRYING', pop01(t, P.t0 + 1.7, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Signed the farewell card. | *Fourteen pages.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 13)
      for (let i = 0; i < Math.min(n, 8); i++) {
        x.save(); x.translate(790 + i * 4, 860 - i * 10); x.rotate(0.06 - i * 0.02)
        x.fillStyle = INK; x.fillRect(-130, -160, 260, 320); x.fillStyle = i % 2 ? CREAM : '#ffe0ea'; x.fillRect(-122, -152, 244, 304)
        x.fillStyle = '#9aa5c4'; for (let y = -120; y < 130; y += 30) x.fillRect(-100, y, 180 + ((y * 7) % 20), 6)
        x.restore()
      }
      L(x, 790, 1110, `PAGE ${n} OF 14`, 1, PINK, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Friday, 5 p.m. | Hugged *everyone* goodbye.', mood: 'heart', tears: 3, star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2); if (k > 0.01) signChar(x, t, ['capricorn', 'virgo', 'aries'][i], 660 + i * 140, 1000, 130 * k, { mood: i === 0 ? 'eyeroll' : 'happy', look: [-1, 0], seed: 80 + i, glyph: false }) }
      L(x, 790, 700, 'SEE YOU MONDAY (SOB)', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, 0.04, 28)
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0298', key: 'G', accent: ACC, solo: 'pisces', ending: 'callback',
  title: 'Pisces coworkers | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Feels everything. | *Clocks in anyway.*', mood: 'heart' },
  last: {
    text: 'Monday: the fern | *grew back.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 380, 1080, 280 * k, { mood: lt > 1.4 ? 'heart' : 'wide', seed: 7, tears: 3, hops: [t0 + 1.5] })
      const grown = lt > 1.2
      drawBits(x, grown ? FERN : FERN_DEAD, FERN_C, 720, 1060, 30 * pop01(t, t0 + (grown ? 1.2 : 0.4), 0.4, 2))
      if (grown) { sparkles(x, t, 720, 990, t0 + 1.2, 9, 200, 0.3); L(x, 720, 1300, 'FERN: THRIVING', pop01(t, t0 + 1.6, 0.3, 2.4), MINT, -0.04, 38) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
