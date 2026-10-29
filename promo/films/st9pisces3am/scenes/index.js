// st9pisces3am (35 s vertical, Star Talk season 9 "A Day in the Life", S9 E60 · Pisces 5/5 3 AM · THE SEASON FINALE)
// · story 0–30.6, end card.
//   HOOK   "A Pisces at 3 AM, crying at a *dog* commercial."  Frame 0: the dark bedroom, Pisces sobbing at the laptop, the
//          ad playing on it (a dog waiting at a door), tears flying, the cats staring.
//   4.0    the ad, full screen: a dog waits by the door… the door opens… the jump. "3:04 AM — it’s a *dog food* ad."
//   9.0    the big ugly cry, then the cats climb in. PISCES: "i’m fine. i just feel *everything.*"
//   13.6   a glass of water, socks on, feet on the floor. ★ ASTROLOGY SAYS: in traditional astrology, Pisces rules the
//          feet. PISCES: "okay. feet on the floor. *breathe.*"
//   18.2   asleep, the cats curled up beside it.
//   21.6   THE FINALE: the camera pulls out through Pisces's window to the whole building at 3 AM. One by one, Aries →
//          Pisces, all twelve homes light up, one window each (each window is that sign's own season-9 bedroom, drawn by
//          its st9<sign>home.js; a sign whose home isn't on the branch gets a plain lit window in its colours).
//          "3:33 AM — everyone’s up *somewhere.*"  Last line: "Feet on the ground. Heart in the *sky.*"
//   The rhyme: frame 0 is Pisces's window from the inside, crying; the last shot is the same window from the outside,
//   asleep and lit. Rewatch bait: the dog in the ad has the grey cat's markings… it's a cat-dog. The ghost sits on the
//   building's roof ledge in the finale.
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawPiscesHome, drawPiscesCats } from '../../st9pisceshome.js'

export const DURATION = 35
const SIGN = 'pisces', EPI = 4, NUMERAL = 'S9 E60', KEY = 'Db'
const HOME = (x, t, o) => { if (o.room !== 'exterior') drawPiscesHome(x, t, o) }
const GOLD = '#f2c75c', PC = '#b9b3ff'
const BATTERY = [0.14, 0.08]
const PIN = '♓ PISCES'
const PITCH = { [PIN]: 880 }

const FIN = 21.6                               // the finale pull-out
const HOOK = { text: 'A Pisces at 3 AM, crying at a *dog* commercial.', out: 3.8, color: PC }
const HOURS = [[0, 3], [30.6, 3.6]]
// the building: 3 columns × 4 rows of windows, Aries → Pisces in reading order; Pisces is bottom right
const WIN = { x0: 130, y0: 560, w: 230, h: 260, gx: 300, gy: 330 }
const winRect = i => ({ x: WIN.x0 + (i % 3) * WIN.gx, y: WIN.y0 + Math.floor(i / 3) * WIN.gy, w: WIN.w, h: WIN.h })
const PW = winRect(11)
const finCam = t => {
  const p = ease.inOutCubic(prog(t, FIN, FIN + 1.8))
  return [lerp(4.2, 1, p), lerp(PW.x + PW.w / 2, 540, p), lerp(PW.y + PW.h / 2, 980, p)]
}
const SHOTS = [
  { at: 0, room: 'bedroom', cam: [1.15, 600, 1040], dark: 1, home: { cats: false } },
  { at: 4.0, room: 'bedroom', cam: [1.4, 640, 1080], dark: 1, home: { cats: false } },
  { at: 9.0, room: 'bedroom', cam: [1.3, 600, 1080], dark: 1, home: { cats: false } },
  { at: 13.6, room: 'bedroom', cam: [1.25, 600, 1120], dark: 0.9, home: { cats: false } },
  { at: 18.2, room: 'bedroom', cam: [1.15, 600, 1040], dark: 1, home: { cats: false } },
  { at: FIN, room: 'exterior', cam: finCam, push: 0.03 },
]
const PUNCH = [
  { at: 1.9, dur: 1.4, z: 0.12, x: 560, y: 1080 },
  { at: 10.2, dur: 1.4, z: 0.3, x: 640, y: 1100 },
  { at: 15.3, dur: 1.3, z: 0.3, x: 640, y: 1300 },
]
const CLOCK = [
  { from: '3:02', to: '3:02', at: -2, dur: 1 },
  { from: '3:02', to: '3:04', at: 4.0, dur: 0.3 },
  { from: '3:04', to: '3:15', at: 9.0, dur: 0.5 },
  { from: '3:15', to: '3:22', at: 13.6, dur: 0.4 },
  { from: '3:22', to: '3:30', at: 18.2, dur: 0.4 },
  { from: '3:30', to: '3:33', at: FIN, dur: 0.4 },
]
const STAMPS = [
  { at: 0.8, out: 3.75, time: '3:02 AM', text: 'one more video. *one.*', accentColor: PC },
  { at: 4.4, out: 8.8, time: '3:04 AM', text: 'it’s a *dog food* ad.', accentColor: PC },
  { at: 18.6, out: 21.4, time: '3:30 AM', text: 'cried it out. *sleepy* now.', accentColor: PC },
  { at: 22.4, out: 25.4, time: '3:33 AM', text: 'everyone’s up *somewhere.*', accentColor: PC, top: 1820 },
]
const LINES = [
  { t: 9.6, speaker: PIN, text: 'i’m fine. i just feel *everything.*', color: PC },
  { t: 14.2, speaker: PIN, text: 'okay. feet on the floor. *breathe.*', color: PC },
]
const BOX = [{ open: 9.4, close: 13.4, from: 0, to: 1 }, { open: 14.0, close: 18.0, from: 1, to: 2 }]
const FACTS = [{ text: 'In traditional astrology, Pisces rules the feet.', at: 15.4, dur: 2.6, y: 318, label: '★ ASTROLOGY SAYS', color: PC }]
const LAST = { at: 25.8, text: 'Feet on the ground. Heart in the *sky.*', color: PC, size: 100, accentSize: 160 }
export const GHOST = { room: 'exterior', at: 27.0, x: 40, y: 1380, from: 'left', where: 'leaning out from behind the building’s left edge, between the third and fourth floors, in the finale' }
const CUTS = [{ t: 9.0, kind: 'flip' }, { t: 18.2, kind: 'deal' }]

// ── the ad (screen space, 4.0–8.8)
const AD = [4.05, 8.8]
// ── the twelve windows light up
const LIT_AT = i => i === 11 ? FIN - 0.4 : FIN + 1.7 + i * 0.3     // Pisces's window is on already: the camera comes out of it
const EXTRA_CUES = [
  ...[0.3, 1.1, 2.0, 2.8, 3.5].map((t, i) => ['pop', t, [587.33, 554.37, 523.25, 493.88, 466.16][i], 0.025, 0]),        // sniffles
  ['pop', AD[0], 880, 0.035, 0], ['tick', 6.4, 0.06], ['whoosh', 6.45, 0.4, 0.03], ['glitter', 6.6, 7.4], ['bell', 6.7, 1567.98, 0.03, 1.4, 0],
  ['whoosh', AD[1] - 0.1, 0.25, 0.02],
  ['pop', 11.6, 659.25, 0.03, -0.4], ['pop', 11.9, 783.99, 0.03, -0.3],
  ['bell', 18.3, 1046.5, 0.02, 1.8, 0],
  ['whoosh', FIN, 1.6, 0.03], ['riser', FIN + 0.2, FIN + 1.6, 0.04],
  ...SIGNS.slice(0, 11).map((_, i) => ['pluck', +LIT_AT(i).toFixed(2), [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5, 1174.66, 1318.51, 1396.91, 1567.98][i], 0.03, 0.9, ((i % 3) - 1) * 0.5]),
  ['glitter', FIN + 5.0, FIN + 6.2], ['bell', FIN + 5.05, 2093, 0.025, 1.6, 0],
]

// ── the cast
const PS = signStar('pisces')
const HOPS = [0.4, 1.2, 2.1, 2.9, 6.5, ...talkHops(LINES, PIN, { cps: 28 }), 13.7]
const pisces = (x, t, X, Y, o = {}) => drawStarChar(x, X, Y, o.size ?? 290, t, { color: PS.color, glyph: PS.glyph, seed: 12, hops: HOPS, glow: 1, ...o })
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
function tears(x, t, r, k = 1, big = false) {
  if (k <= 0) return
  const s = r.size, n = big ? 5 : 2
  for (const sd of [-1, 1]) for (let i = 0; i < n; i++) {
    const p = (t * (big ? 2.2 : 1.4) + i / n + (sd > 0 ? 0.3 : 0)) % 1
    const X = r.x + sd * (s * 0.14 + p * s * (big ? 0.5 : 0.22)), Y = r.y - s * 0.05 + p * s * 0.4 - (big ? Math.sin(Math.PI * p) * s * 0.3 : 0)
    x.save(); x.globalAlpha = k * (1 - p * 0.6); rect(x, X - 9, Y - 2, 18, 26, '#120c26'); rect(x, X - 6, Y, 12, 22, '#8fd8ff'); x.restore()
  }
}
// the laptop on the duvet, its screen glow
function laptop(x, t, X, Y, on = 1) {
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(X, Y - 60, 0, X, Y - 60, 300); g.addColorStop(0, `rgba(150,190,255,${0.35 * on})`); g.addColorStop(1, 'rgba(150,190,255,0)'); x.fillStyle = g; x.fillRect(X - 300, Y - 360, 600, 600); x.restore()
  rect(x, X - 120, Y - 150, 240, 150, '#120c26'); rect(x, X - 110, Y - 140, 220, 128, on > 0.5 ? '#f3d9a8' : '#1c1840')
  if (on > 0.5) { rect(x, X - 110, Y - 50, 220, 38, '#c98a5a'); rect(x, X + 30, Y - 128, 60, 100, '#7a4a2a'); dogBits(x, X - 50, Y - 70, 5) }
  rect(x, X - 150, Y, 300, 18, '#120c26'); rect(x, X - 144, Y + 2, 288, 12, '#8a82a8')
}
// the dog (grey, with the grey cat's markings…)
const DOG = ['GG....GG.', 'GGGGGGG..', 'GeGGeGG..', 'GGGnGGGG.', '.GGGGGGG.', '.GGGGGGGG', '.GG.GG.GT', '.GG.GG...']
function dogBits(x, X, Y, c, flip = false) { drawBits(x, DOG, { G: '#8a82a8', e: '#120c26', n: '#ff8fb1', T: '#8a82a8' }, X, Y, c, { flip }) }
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  if (i === 5) return building(x, t)
  const sleepy = i === 4
  drawPiscesCats(x, t, i >= 2 ? 520 : 330, 1330, { cell: 13, sleepy, gap: i >= 2 ? 420 : 190 })
  if (i <= 1) {
    laptop(x, t, 330, 1180, 1)
    const r = pisces(x, t, 690, 1180, { mood: 'squint', look: [-1, 0.2], squash: 0.04 * Math.sin(t * 9) })
    tears(x, t, r, 1, i === 1 && t > 6.4)
  } else if (i === 2) {
    laptop(x, t, 330, 1180, 0)
    const r = pisces(x, t, 640, 1180, { mood: t < 11.6 ? 'squint' : 'sparkle', look: [0, 0.4] })
    tears(x, t, r, 1 - prog(t, 11.6, 13.0), t < 11.6)
  } else if (i === 3) {
    const r = pisces(x, t, 640, 1150, { mood: 'happy', look: [0, 1] })
    // the fish socks, feet on the floor
    for (const sd of [-1, 1]) { const fx = r.x + sd * 70, fy = 1310; rect(x, fx - 34, fy - 30, 68, 50, '#120c26'); rect(x, fx - 30, fy - 26, 60, 42, '#5fd6c4'); rect(x, fx - 30, fy - 26, 60, 10, '#efe6d6'); drawBits(x, ['.OO..O', 'OOOOOO', '.OO..O'], { O: '#ff9fb8' }, fx, fy, 4, { outline: null }) }
    // the glass of water
    const gx = r.x + 190, gy = r.y + 20
    rect(x, gx - 30, gy - 46, 60, 92, '#120c26'); rect(x, gx - 24, gy - 40, 48, 80, 'rgba(200,230,255,0.5)'); rect(x, gx - 24, gy - 8, 48, 48, '#7fc8ff')
  } else {
    pisces(x, t, 640, 1180, { mood: 'sleepy', zzz: true, look: [0, 0.4], squash: 0.05 })
  }
}

// ── the building and the twelve windows
let HOMES = null, OFF = null, OX = null
const DK = 0.4
const HOME_CALL = {
  aries: m => (x, t) => m.drawAriesHome(x, t, { room: 'bedroom', ep: 5, dark: DK }),
  taurus: m => (x, t) => m.drawTaurusHome(x, t, { room: 'bedroom', ep: '3am', dark: DK }),
  gemini: m => (x, t) => m.drawGeminiHome(x, t, { room: 'bedroom', ep: '3am', dark: DK, hour: 3 }),
  cancer: m => (x, t) => m.drawCancerHome(x, t, { room: 'bedroom', ep: '3am', dark: DK, hour: 3 }),
  leo: m => (x, t) => m.drawLeoHome(x, t, { room: 'bedroom', ep: '3am', dark: DK }),
  virgo: m => (x, t) => m.drawVirgoHome(x, t, { room: 'bedroom', ep: '3am', dark: DK }),
  libra: m => (x, t) => m.drawLibraHome(x, t, { room: 'bedroom', ep: '3am', dark: DK, hour: 3 }),
  scorpio: m => (x, t) => m.drawScorpioHome(x, t, { room: 'bedroom', ep: '3am', dark: DK, hour: 3 }),
  sagittarius: m => (x, t) => m.drawSagHome(x, t, { room: 'bed', ep: '3am', dark: DK, lamp: 1 }),
  capricorn: m => (x, t) => m.drawCapHome(x, t, { room: 'bed', ep: '3am', dark: DK, lamp: 1 }),
  aquarius: m => (x, t) => m.drawAquaHome(x, t, { room: 'bedroom', ep: 4, dark: DK }),
  pisces: m => (x, t) => m.drawPiscesHome(x, t, { room: 'bedroom', ep: 4, dark: DK }),
}
const FILE = { sagittarius: 'sag', capricorn: 'cap', aquarius: 'aqua' }
/** load whichever sign homes are on the branch (browser only; a missing one falls back to a plain lit window) */
async function PRELOAD() {
  HOMES = {}
  await Promise.all(SIGNS.map(async s => {
    try { const m = await import(`../../st9${FILE[s.id] || s.id}home.js`); const fn = HOME_CALL[s.id](m); HOMES[s.id] = fn } catch (_) { /* not on the branch: fallback window */ }
  }))
}
function nightFill(x, s, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a0830'); g.addColorStop(1, '#1b1450')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillRect((k * 263) % 1080, (k * 151) % 1100, 4, 4) }
  void s; void t
}
/** one sign's window: its own home's bedroom (cropped), dark until it lights */
function signWindow(x, t, i, s) {
  const { x: X, y: Y, w, h } = winRect(i)
  const lit = ease.outCubic(prog(t, LIT_AT(i), LIT_AT(i) + 0.4))
  rect(x, X - 12, Y - 12, w + 24, h + 24, '#0a0816')
  rect(x, X - 6, Y - 6, w + 12, h + 12, '#4a3f6a')
  rect(x, X, Y, w, h, '#05040c')
  if (lit > 0) {
    const fn = HOMES && HOMES[s.id]
    let ok = false
    if (fn) {
      try {
        if (!OFF) { OFF = document.createElement('canvas'); OFF.width = 1080; OFF.height = 1920; OX = OFF.getContext('2d') }
        OX.save(); OX.setTransform(1, 0, 0, 1, 0, 0); OX.globalAlpha = 1; OX.globalCompositeOperation = 'source-over'
        nightFill(OX, s, t); fn(OX, t); OX.restore()
        x.save(); x.globalAlpha = lit
        x.imageSmoothingEnabled = true
        x.drawImage(OFF, 170, 640, 740, 840, X, Y, w, h)
        if (i === 11) drawStarChar(x, X + w * 0.66, Y + h * 0.6, h * 0.36, t, { color: PS.color, mood: 'sleepy', zzz: true, glow: 0.5, bob: 1, seed: 12 })
        x.restore()
        ok = true
      } catch (_) { ok = false }
    }
    if (!ok) {
      // the fallback: a lit window in the sign's colours (a lamp glow and a little star)
      x.save(); x.globalAlpha = lit
      const g = x.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#2a2050'); g.addColorStop(1, s.color)
      x.fillStyle = g; x.fillRect(R(X), R(Y), R(w), R(h))
      drawStarChar(x, X + w / 2, Y + h * 0.62, h * 0.5, t, { color: s.color, mood: 'sleepy', zzz: false, glow: 0.6, bob: 2, seed: i })
      x.restore()
    }
    // the warm 3 AM lamp wash + glow spilling out
    x.save(); x.globalAlpha = 0.28 * lit; x.globalCompositeOperation = 'soft-light'; x.fillStyle = '#ffd9a0'; x.fillRect(R(X), R(Y), R(w), R(h)); x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'
    const gg = x.createRadialGradient(X + w / 2, Y + h / 2, 0, X + w / 2, Y + h / 2, w * 0.95)
    gg.addColorStop(0, `rgba(255,214,150,${0.16 * lit})`); gg.addColorStop(1, 'rgba(255,214,150,0)')
    x.fillStyle = gg; x.fillRect(X - w, Y - h, 3 * w, 3 * h); x.restore()
  }
  if (i === 11) { const pu = prog(t, FIN + 1.7 + 11 * 0.3, FIN + 1.7 + 11 * 0.3 + 0.8); if (pu > 0 && pu < 1) { x.save(); x.strokeStyle = `rgba(185,179,255,${1 - pu})`; x.lineWidth = 8; x.strokeRect(X - 16 - pu * 30, Y - 16 - pu * 30, w + 32 + pu * 60, h + 32 + pu * 60); x.restore() } }
  // mullions + sill + the sign's little plaque
  rect(x, X + w / 2 - 3, Y, 6, h, '#0a0816'); rect(x, X, Y + h * 0.42 - 3, w, 6, '#0a0816')
  rect(x, X - 20, Y + h + 12, w + 40, 14, '#0a0816'); rect(x, X - 16, Y + h + 12, w + 32, 8, '#5a4f80')
  drawPixelStar(x, X + w / 2, Y + h + 46, 18, 1, s.color)
}
function building(x, t) {
  // the facade
  rect(x, 40, 400, 1000, 1600, '#120c26'); rect(x, 50, 410, 980, 1590, '#231a40')
  for (let j = 430; j < 1920; j += 40) for (let k = (j / 40) % 2 ? 50 : 90; k < 1030; k += 80) rect(x, k, j, 2, 20, '#1b1436')
  for (let j = 450; j < 1920; j += 40) rect(x, 50, j, 980, 2, '#1b1436')
  // roof ledge + water tower + antenna
  rect(x, 20, 380, 1040, 40, '#0a0816'); rect(x, 26, 386, 1028, 22, '#3a2f5a')
  rect(x, 760, 280, 120, 100, '#0a0816'); rect(x, 768, 288, 104, 84, '#2a2048'); rect(x, 760, 270, 120, 16, '#0a0816')
  rect(x, 230, 230, 6, 150, '#0a0816'); rect(x, 214, 256, 38, 4, '#0a0816'); rect(x, 222, 226, 22, 6, '#ff3d6e')
    SIGNS.forEach((s, i) => signWindow(x, t, i, s))
  // Pisces's window: the camera starts inside it, so before the pull-out it shows the sleeping room
  // (the window's own content is the home crop above; as the pull-out finishes, Pisces's light is the last to come on)
  // the street lamp + sidewalk at the very bottom
  rect(x, 0, 1860, 1080, 60, '#0a0816')
  drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 3 })
}
function overlay(x, t) {
  if (t < AD[0] || t > AD[1]) return
  const k = easeOutBack(prog(t, AD[0], AD[0] + 0.35), 1.8) * (1 - ease.inCubic(prog(t, AD[1] - 0.3, AD[1])))
  x.save(); x.translate(540, 700); x.scale(k, k)
  rect(x, -420, -260, 840, 520, '#120c26'); rect(x, -408, -248, 816, 496, '#f3d9a8')
  // the hallway: floor, a door, the dog waiting (or jumping)
  rect(x, -408, 120, 816, 128, '#c98a5a'); for (let j = -380; j < 400; j += 90) rect(x, j, 120, 4, 128, '#a86a3a')
  const open = ease.outCubic(prog(t, 6.3, 6.7))
  rect(x, 100, -170, 200, 300, '#120c26'); rect(x, 110, -160, 180, 280, '#fff4d8')                  // the light behind the door
  rect(x, 110 + open * 150, -160, 180 * (1 - open * 0.8), 280, '#7a4a2a'); rect(x, 250 - open * 10, -20, 14, 14, '#f2c75c')
  if (open > 0.5) drawStarChar(x, 200, 0, 170, t, { color: '#f2a65a', mood: 'happy', glow: 0.6, bob: 0, seed: 3 })
  const jump = t > 6.5 ? Math.abs(Math.sin((t - 6.5) * 6)) * 80 : 0
  dogBits(x, t > 6.5 ? -20 + (t - 6.5) * 60 : -140, 70 - jump, 16, false)
  // the ad's caption + the "AD" bug
  x.font = "italic 500 44px 'EB Garamond', serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#3a2a1a'
  x.fillText(t < 6.3 ? '…he waited every day.' : 'home is who waits for you.', -60, -200)
  rect(x, -400, -240, 60, 30, 'rgba(6,4,18,0.6)'); x.font = "700 18px 'Space Mono', monospace"; x.fillStyle = '#efe6d6'; x.fillText('AD', -370, -224)
  x.restore()
}

// ═══════════════════════════════════════ the vlog engine (the same block in all ten Aquarius + Pisces episodes)
// Reads the episode's tables above: SIGN, HOME, EPI, NUMERAL, KEY, HOOK, HOURS, SHOTS, PUNCH, CLOCK, STAMPS, LINES, BOX,
// FACTS, LAST, GHOST, CUTS, EXTRA_CUES, and its scene(x, t, shot) / overlay(x, t, shot) painters.
const STORY_END = DURATION - ENDCARD_LEN
const CPS = 28
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
/** piecewise ease between [t, v] keys */
function pw(keys, t) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return lerp(va, vb, ease.inOutQuad(prog(t, a, b))) }
  return keys[keys.length - 1][1]
}
const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
const nextAt = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : STORY_END }
/** the shot's camera ([zoom, cx, cy] + a slow push-in) times any punch-ins */
function applyCam(x, t, sh) {
  let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : sh.cam
  z *= 1 + (sh.push ?? 0.04) * prog(t, sh.at, nextAt(sh))
  for (const p of PUNCH) {
    const k = ease.outCubic(prog(t, p.at, p.at + 0.16)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
    if (k <= 0) continue
    const sh2 = Math.sin((t - p.at) * 70) * 5 * (1 - prog(t, p.at, p.at + 0.25))
    z *= 1 + p.z * k; cx = lerp(cx, p.x, k) + sh2; cy = lerp(cy, p.y, k)
  }
  x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
}
const clockAt = t => { let c = CLOCK[0]; for (const s of CLOCK) if (t >= s.at - 0.6) c = s; return c }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "italic 500 176px 'EB Garamond'", "700 52px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  if (typeof PRELOAD === 'function') await PRELOAD()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: HOOK.text, at: 0, out: HOOK.out, top: HOOK.top ?? 262, size: HOOK.size ?? 92, accentSize: HOOK.accentSize ?? 132, accentColor: HOOK.color ?? GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, s))
  const boxes = (Array.isArray(BOX) ? BOX : [{ ...BOX, from: 0, to: LINES.length }]).filter(b => b.to > b.from).map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1440, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
  const last = popText(root, LAST.text, { top: LAST.top ?? 300, size: LAST.size ?? 112, accentSize: LAST.accentSize ?? 176, at: LAST.at, gap: 0.08, accentColor: LAST.color ?? GOLD, wobble: true, late: 1, lateAt: LAST.at + 0.4, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sh = shotAt(t)
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: pw(HOURS, t) })
      x.save(); applyCam(x, t, sh)
      HOME(x, t, { room: sh.room, ep: EPI, dark: sh.dark ?? 0, warm: sh.warm ?? 0, ...(typeof sh.home === 'function' ? sh.home(t) : sh.home || {}) })
      if (GHOST.room === sh.room) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
      scene(x, t, sh)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.42 })
      overlay(x, t, sh)
      // the cut: a quick white blink + a horizontal smear
      const cp = prog(t, sh.at, sh.at + 0.14)
      if (sh.at > 0 && cp < 1) { x.save(); x.globalAlpha = 0.28 * (1 - cp); x.fillStyle = '#fff8ee'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawRecFrame(x, t, { battery: lerp(BATTERY[0], BATTERY[1], prog(t, 0, STORY_END)), time: '00:' + String(Math.floor(t)).padStart(2, '0') })
      const c = clockAt(t)
      drawClock(x, t, { ...c, sign: SIGN, alpha: 1 - prog(t, STORY_END - 0.3, STORY_END) })
      for (const f of FACTS) factChip(x, t, f)
      hook.update(t)
      for (const s of stamps) s.update(t)
      for (const b of boxes) b.update(t)
      last.update(t, outK(t, [STORY_END - 0.35, STORY_END]))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, fadeIn: 0 }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SHOTS.filter(s => s.at > 0).flatMap(s => [['whoosh', r3(s.at - 0.06), 0.24, 0.026], ['tick', r3(s.at), 0.03]]),
  ...PUNCH.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.18, 0.02], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
  ...CLOCK.filter(c => c.dur > 0.2 && c.at > 0).flatMap(c => clockCues(c.at, c.dur)),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...FACTS.flatMap(f => factChipCues(f.at, { dur: f.dur })),
  ...(Array.isArray(BOX) ? BOX : [BOX]).map(b => ['pop', r3(b.open ?? LINES[0].t - 0.22), 739.99, 0.035, 0]), ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: PITCH }) : []),
  ...wordPops(LAST.at, 3, 0.08, 2), ['pop', r3(LAST.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(LAST.at + 0.42), 1567.98, 0.025, 1.2, 0],
  ['tick', r3(GHOST.at + 0.05), 0.015],
  ...EXTRA_CUES,
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
