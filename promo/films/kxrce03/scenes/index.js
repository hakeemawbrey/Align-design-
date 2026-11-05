// kxrce03 · Remix Cities: Extended · "Washington, DC: The Fifth Seat" (60 s vertical, cinematic · D). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxrce01/rckit.js. No end card, no card cut.
//   0.00  HOOK: ♑ Capricorn mid-squeeze into a booth between two hand-holding couples, a breadstick flying. Slam title.
//         Record scratch + freeze at 0.9: "yep. that's me."
//   3.4   THE STARS: "one night in DC. four people in love." · promise "Wait for | *the monument.*"
//   8.0   1 DINNER (7:00)        ♉ Taurus + ♎ Libra share one plate; ♏ Scorpio + ♋ Cancer whisper; Cap reads the menu
//  17.0   2 THE MALL (8:30)      couples hold hands; Capricorn holds the map and tour-guides anyway (obelisk, the dome)
//  26.0   3 THE REFLECTING POOL (9:30)  every couple, two reflections; Capricorn, one… then ♓ Pisces' crying one joins
//  35.0   4 HALF-SMOKES (10:30)  the city's own late-night sausage; Capricorn finally laughs
//  44.0   5 THE MONUMENT (11:30) "you planned the best night of our year." A group hug under the lit obelisk.
//  58.2   last line "Single at the table. | *Centre* of the night." → cut at 60.
// Real touches: the tall white obelisk with its red lights, the domed building at the end of the Mall, the long
// reflecting pool, the half-smoke (DC's own sausage, chili on top).
import {
  cityFilm, nightSky, skyline, street, lamp, table, interior, stringLights, signBoard, R, walk, pop01, outK, inR, bump,
  speech, hearts, sparkles, drawBits, drawPixelStar, drawStarChar, signStar, rgba, mixHex, clamp, lerp, prog, ease, rng, GOLD, BONE, PINK, INK, INTER, MONO, TAU, W, H,
} from '../../kxrce01/rckit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const S = { hook: 0, dinner: 8.0, mall: 17.0, pool: 26.0, smoke: 35.0, mon: 44.0, last: 58.2 }
const T = { menu: 9.0, pisRef: 30.4, sauce: 38.6, laugh: 40.0, hug: [50.0, 51.2] }
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1500 }

function booth(x, t) {
  interior(x, t, { wall: '#4a2a3a', floor: '#2a1624', trim: '#1a0a14', winSky: '#10123a', seed: 31 })
  R(x, INK, 40, 900, 1000, 330); R(x, '#a8303a', 52, 912, 976, 310); for (let i = 0; i < 8; i++) R(x, '#c0404a', 70 + i * 122, 920, 60, 290)
  table(x, 540, 1300, 900, { top: '#f4e6c8', side: '#6a3a2a' })
}
function plate(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); R(x, INK, -60, -14, 120, 28); R(x, '#ffffff', -56, -10, 112, 20); R(x, '#e0703a', -30, -18, 60, 12); x.restore() }
function obelisk(x, cx, base, h, { lit = 1, t = 0 } = {}) {
  const wB = h * 0.1, wT = h * 0.068
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - wB / 2 - 5, base); x.lineTo(cx - wT / 2 - 5, base - h); x.lineTo(cx, base - h - h * 0.07 - 6); x.lineTo(cx + wT / 2 + 5, base - h); x.lineTo(cx + wB / 2 + 5, base); x.fill()
  const g = x.createLinearGradient(cx - wB / 2, 0, cx + wB / 2, 0); g.addColorStop(0, mixHex('#c8c4d8', '#fff8ea', lit)); g.addColorStop(1, mixHex('#8a86a0', '#e8e0d0', lit))
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - wB / 2, base); x.lineTo(cx - wT / 2, base - h); x.lineTo(cx, base - h - h * 0.07); x.lineTo(cx + wT / 2, base - h); x.lineTo(cx + wB / 2, base); x.fill()
  const blink = Math.sin(t * 3) > 0 ? 1 : 0.3
  x.fillStyle = `rgba(255,60,60,${blink})`; x.fillRect(cx - wT / 2 - 2, base - h + 10, 8, 8); x.fillRect(cx + wT / 2 - 6, base - h + 10, 8, 8)
  if (lit > 0.5) { x.save(); x.globalCompositeOperation = 'lighter'; const lg = x.createRadialGradient(cx, base - h * 0.4, 0, cx, base - h * 0.4, h * 0.7); lg.addColorStop(0, 'rgba(255,240,200,0.18)'); lg.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = lg; x.fillRect(cx - h, base - h * 1.2, h * 2, h * 1.2); x.restore() }
}
function dome(x, cx, base, w) {
  R(x, INK, cx - w / 2 - 6, base - w * 0.32, w + 12, w * 0.32 + 6); R(x, '#e8e0d0', cx - w / 2, base - w * 0.3, w, w * 0.3)
  for (let i = 0; i < 9; i++) R(x, '#b8b0a0', cx - w / 2 + 14 + i * (w - 28) / 8, base - w * 0.26, 6, w * 0.24)
  R(x, INK, cx - w * 0.22 - 5, base - w * 0.48, w * 0.44 + 10, w * 0.18); R(x, '#f0e8d8', cx - w * 0.22, base - w * 0.46, w * 0.44, w * 0.16)
  x.fillStyle = INK; x.beginPath(); x.arc(cx, base - w * 0.46, w * 0.2 + 5, Math.PI, TAU); x.fill(); x.fillStyle = '#f4ecdc'; x.beginPath(); x.arc(cx, base - w * 0.46, w * 0.2, Math.PI, TAU); x.fill()
  R(x, INK, cx - 7, base - w * 0.72, 14, w * 0.08)
}
function mall(x, t) {
  nightSky(x, t, { top: '#0a0c30', bot: '#2a2a62', stars: 40, moon: { x: 900, y: 360, r: 44 } })
  dome(x, 230, 1000, 300)
  obelisk(x, 640, 1000, 560, { t })
  R(x, '#1e3a2a', 0, 1000, W, 400); R(x, '#d8ccb0', 360, 1000, 360, 400)
  x.fillStyle = '#c8bca0'; x.beginPath(); x.moveTo(440, 1000); x.lineTo(640, 1000); x.lineTo(900, 1400); x.lineTo(180, 1400); x.fill()
  R(x, '#14281e', 0, 1400, W, 520)
  lamp(x, 120, 1400, 300); lamp(x, 960, 1400, 300)
}
function pool(x, t) {
  nightSky(x, t, { top: '#0a0c30', bot: '#2a2a62', stars: 40, h: 1000 })
  obelisk(x, 540, 900, 460, { t })
  R(x, '#1e3a2a', 0, 900, W, 140)
  // the pool with the obelisk reflected
  R(x, INK, 0, 1036, W, 8); R(x, '#16205a', 0, 1044, W, 320)
  x.save(); x.beginPath(); x.rect(0, 1044, W, 320); x.clip(); x.translate(0, 1044 * 2 - 140); x.scale(1, -1); x.globalAlpha = 0.35; obelisk(x, 540, 900 + 140, 460, { t }); x.restore()
  for (let i = 0; i < 12; i++) R(x, 'rgba(200,220,255,0.18)', (i * 113 + t * 20) % W, 1070 + (i % 5) * 60, 90, 3)
  R(x, '#d8ccb0', 0, 1364, W, 30); R(x, '#2a2a4a', 0, 1394, W, 526)
}
function smokeStand(x, t) {
  nightSky(x, t, { top: '#0c0e34', bot: '#2a2456', stars: 10 })
  skyline(x, t, { seed: 81, base: 1000, minH: 160, maxH: 380, col: '#1e1a48', edge: '#2c2662', maxW: 120 })
  R(x, INK, 220, 640, 640, 560); R(x, '#d8443a', 232, 652, 616, 120); R(x, '#f4e6c8', 232, 772, 616, 300)
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#d8443a' : '#f4f0e6', 232 + i * 77, 772, 77, 30)
  signBoard(x, 540, 712, 'HALF-SMOKES · LATE', { size: 40, col: '#fff3c8', bg: '#8a1a1a' })
  R(x, INK, 300, 880, 480, 160); R(x, '#ffe7a0', 306, 886, 468, 148); for (let i = 0; i < 4; i++) { R(x, INK, 340 + i * 110, 960, 84, 30); R(x, '#d86a2a', 344 + i * 110, 964, 76, 22) }
  street(x, 1200, {})
  lamp(x, 120, 1220, 300)
}
function monument(x, t) {
  nightSky(x, t, { top: '#07082a', bot: '#26285e', stars: 70, moon: { x: 220, y: 420, r: 54 }, seed: 9, glow: '#ffd98a' })
  obelisk(x, 540, 1200, 600, { t })
  R(x, '#1e3a2a', 0, 1200, W, 720); for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; R(x, INK, 540 + Math.cos(a) * 280 - 4, 1170 - Math.abs(Math.sin(a)) * 10, 8, 90); R(x, '#e04040', 540 + Math.cos(a) * 280 - 14, 1150, 28, 20) }
}
function hug(t) { return ease.inOutCubic(prog(t, ...T.hug)) }

function cast(t) {
  const o = [], P = (sign, x, y, s, mood, look, e = {}) => o.push({ sign, x, y, s, mood, look, ...e })
  if (t < S.mall) {
    const hook = t < S.dinner
    P('taurus', 150, 1150, 170, 'heart', [1, 0], { seed: 7 })
    P('libra', 300, 1140, 170, 'heart', [-1, 0], { seed: 8 })
    P('capricorn', 540, hook ? 1170 : 1150, 190, hook ? 'wide' : t < T.menu + 3 ? 'neutral' : 'squint', [0, hook ? -1 : 0.6], { seed: 2, squash: hook ? 0.16 : 0 })
    P('scorpio', 780, 1140, 170, 'wink', [1, 0], { seed: 5 })
    P('cancer', 930, 1150, 170, 'heart', [-1, 0], { seed: 4 })
    if (!hook) P('pisces', 960, 760, 100, 'sparkle', [-1, 0], { tears: 2, seed: 6 })
  } else if (t < S.pool) {
    const [cx] = walk(t, [[S.mall, 460, 0], [S.mall + 6, 520, 0]])
    P('capricorn', cx, 1330, 200, t > 22.5 ? 'happy' : 'neutral', [1, -1], { seed: 2, hops: [S.mall + 1, S.mall + 3.5] })
    P('taurus', 230, 1500, 150, 'heart', [1, 0], { seed: 7 }); P('libra', 350, 1500, 150, 'happy', [-1, 0], { seed: 8 })
    P('scorpio', 760, 1500, 150, 'happy', [1, 0], { seed: 5 }); P('cancer', 880, 1500, 150, 'heart', [-1, 0], { seed: 4 })
  } else if (t < S.smoke) {
    const pk = pop01(t, T.pisRef, 0.4, 2.2)
    const L = [['taurus', 120], ['libra', 230], ['scorpio', 740], ['cancer', 850], ['capricorn', 470]]
    for (const [sg, px] of L) P(sg, px, 1300, sg === 'capricorn' ? 170 : 140, sg === 'capricorn' ? (t > T.pisRef + 0.5 ? 'happy' : 'neutral') : 'heart', [0, 1], { seed: px % 9 })
    if (pk > 0.01) P('pisces', 600, 1300, 150, 'sparkle', [-1, 1], { tears: 3, seed: 6, pop: pk })
  } else if (t < S.mon) {
    P('capricorn', 470, 1360, 210, t > T.laugh ? 'happy' : t > T.sauce ? 'wide' : 'neutral', [1, -0.5], { seed: 2, hops: [T.laugh, T.laugh + 0.45, T.laugh + 0.9] })
    P('scorpio', 720, 1370, 180, 'wink', [-1, 0], { seed: 5 })
    P('cancer', 880, 1380, 160, 'happy', [-1, 0], { seed: 4 })
    P('taurus', 200, 1380, 160, 'sparkle', [1, 0], { seed: 7 }); P('libra', 330, 1390, 140, 'happy', [1, 0], { seed: 8 })
    P('pisces', 990, 1240, 110, 'happy', [-1, 0], { tears: 2, seed: 6 })
  } else {
    const h = hug(t)
    const L = [['taurus', 130, 330], ['libra', 260, 410], ['capricorn', 540, 540], ['scorpio', 820, 670], ['cancer', 950, 750]]
    for (const [sg, a, b] of L) P(sg, lerp(a, b, sg === 'capricorn' ? 0 : h * 0.55 + (sg === 'capricorn' ? 0 : 0)), 1380, sg === 'capricorn' ? 210 : 160, sg === 'capricorn' ? (t > 47 ? 'heart' : 'wide') : 'happy', [sg === 'capricorn' ? 0 : a < 540 ? 1 : -1, 0], { seed: a % 9, hops: [T.hug[1], T.hug[1] + 0.5] })
    P('pisces', 540, 1100, 120, 'sparkle', [0, 1], { tears: 3, seed: 6, hops: [T.hug[1] + 0.2] })
  }
  return o
}
function stars(t) {
  if (t < 3.3) return null
  const k = pop01(t, 3.35, 0.4, 2.1) * outK(t, [S.last - 0.3, S.last])
  return { x: 930, y: (t < S.dinner ? 560 : 470) + 10 * Math.sin(t * 1.3), s: t < S.dinner ? 170 : 110, mood: t > S.mon ? 'sparkle' : 'happy', look: [-1, 0.5], pop: k }
}
function front(x, t) {
  if (t < S.mall) {
    plate(x, 225, 1296, 1.1); plate(x, 855, 1296, 1.0)
    if (t < S.dinner) {
      // the breadstick, flying
      x.save(); x.translate(560 + 120 * Math.sin(t * 0.8), 860 - 30 * Math.sin(t * 1.4)); x.rotate(t * 5); R(x, INK, -60, -10, 120, 20); R(x, '#e8b870', -56, -6, 112, 12); x.restore()
      hearts(x, t, 225, 1000, -0.6, { n: 4, cell: 6, life: 2.2 }); hearts(x, t, 855, 1000, -0.4, { n: 4, cell: 6, life: 2.2 })
    } else {
      // the giant menu
      const k = pop01(t, T.menu, 0.4, 2)
      x.save(); x.translate(540, 1200); x.scale(k, k); R(x, INK, -110, -150, 220, 230); R(x, '#2a1a3a', -104, -144, 208, 218); x.font = `800 28px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('MENU', 0, -100); for (let i = 0; i < 5; i++) R(x, '#8a7aa8', -70, -70 + i * 30, 140 - (i % 2) * 30, 8); x.restore()
      if (t > 10.0) hearts(x, t, 225, 1000, 10.0, { n: 5, cell: 6 })
    }
  }
  if (inR(t, S.mall, S.pool)) {
    hearts(x, t, 290, 1380, S.mall + 0.6, { n: 5, cell: 6 }); hearts(x, t, 820, 1380, S.mall + 1.2, { n: 5, cell: 6 })
    // the map
    const [cx] = walk(t, [[S.mall, 460, 0], [S.mall + 6, 520, 0]])
    x.save(); x.translate(cx + 120, 1270); x.rotate(-0.1); R(x, INK, -70, -50, 140, 100); R(x, '#f4ecd8', -64, -44, 128, 88); R(x, '#5fbf6a', -50, -30, 50, 30); R(x, '#7fb0ff', 0, 0, 50, 20); x.restore()
  }
  if (inR(t, S.pool, S.smoke)) {
    // reflections in the water (upside down, faded)
    const pk = pop01(t, T.pisRef, 0.4, 2.2)
    const L = [['taurus', 120], ['libra', 230], ['scorpio', 740], ['cancer', 850], ['capricorn', 470]]
    x.save(); x.translate(0, 2 * 1250); x.scale(1, -1); x.globalAlpha = 0.35
    for (const [sg, px] of L) drawStarChar(x, px, 1300 - 120, sg === 'capricorn' ? 150 : 120, t, { ...signStar(sg), mood: 'happy', seed: 3 })
    if (pk > 0.01) drawStarChar(x, 600, 1180, 130 * pk, t, { ...signStar('pisces'), mood: 'sparkle', seed: 6 })
    x.restore()
  }
  if (inR(t, S.smoke, S.mon) && t > T.sauce) {
    const k = pop01(t, T.sauce, 0.3, 2.2)
    x.save(); x.translate(610, 1250); x.scale(k, k); x.rotate(-0.1); R(x, INK, -74, -22, 148, 44); R(x, '#f0c070', -68, -16, 136, 32); R(x, '#a0402a', -56, -24, 112, 14); R(x, '#d86a2a', -40, -28, 70, 8); x.restore()
    for (let i = 0; i < 5; i++) R(x, '#d86a2a', 470 + Math.cos(i * 1.3) * 60, 1260 + Math.sin(i * 2) * 40, 14, 14)
    if (t > T.laugh) hearts(x, t, 470, 1160, T.laugh, { n: 6, cell: 7 })
  }
  if (t > S.mon) sparkles(x, t, 540, 1200, T.hug[1], 14, 300, 1, [GOLD, PINK, BONE])
}
function over(x, t) {
  speech(x, t, 760, 890, S.mall + 0.6, 'TOUR GUIDE MODE', { size: 34, life: 3.0, col: '#fff3c8' })
}

const TISSUES = [S.dinner + 2, S.mall + 2.5, T.pisRef + 0.2, T.pisRef + 1.4, S.smoke + 3, T.hug[1], T.hug[1] + 1.0, T.hug[1] + 2.0]

export const { DURATION, SCENES, CUES, MUSIC } = cityFilm({
  id: 'kxrce03', city: 'Washington, DC', duration: 60, ending: 'cut', castScale: 1.15,
  hook: { text: 'Couples’ dinner. | Capricorn is the *fifth seat.*', out: [3.0, 3.25], size: 92 },
  freeze: [REC],
  route: { at: 3.4 },
  stops: [
    { at: S.hook, n: 0, name: '', time: '6:55', draw: booth },
    { at: S.dinner, n: 1, name: 'DINNER · 7:00', time: '7:00', draw: booth },
    { at: S.mall, n: 2, name: 'THE MALL · 8:30', time: '8:30', draw: mall },
    { at: S.pool, n: 3, name: 'THE POOL · 9:30', time: '9:30', draw: pool },
    { at: S.smoke, n: 4, name: 'HALF-SMOKES · 10:30', time: '10:30', draw: smokeStand },
    { at: S.mon, n: 5, name: 'THE MONUMENT · 11:30', time: '11:30', draw: monument },
  ],
  cast, stars, front, over,
  tissues: TISSUES,
  heads: [
    { text: 'Wait for | *the monument.*', at: 5.8, lateAt: 6.2, out: [7.6, 7.85], top: 430 },
    { text: 'Single at the table. | *Centre* of the night.', at: S.last, lateAt: S.last + 0.42, top: 380, size: 84, accentSize: 124, accentColor: GOLD },
  ],
  boxes: [
    { open: 3.5, close: 7.8, lines: [{ t: 3.7, who: 'stars', text: 'one night in DC. *four people in love.*' }] },
    { open: 8.4, close: 16.7, lines: [
      { t: 8.6, who: 'libra', text: 'we’re sharing *one* plate. cute, right?' },
      { t: 11.4, who: 'capricorn', text: 'I’ll read the menu. *thoroughly.*' },
      { t: 14.0, who: 'cancer', text: 'Cap, you can sit *closer!*' },
    ] },
    { open: 17.4, close: 25.7, lines: [
      { t: 17.6, who: 'capricorn', text: 'on your left: the *obelisk.*' },
      { t: 20.0, who: 'capricorn', text: 'at the end: the *dome.* very old. very big.' },
      { t: 22.9, who: 'taurus', text: 'aw, Cap is giving us a *tour!*' },
    ] },
    { open: 26.4, close: 34.7, lines: [
      { t: 26.6, who: 'stars', text: 'every couple gets *two* reflections.' },
      { t: 28.6, who: 'capricorn', text: 'and I get *one.*' },
      { t: 30.8, who: 'pisces', text: 'make that *two!* I’m crying!' },
    ] },
    { open: 35.4, close: 43.7, lines: [
      { t: 35.6, who: 'capricorn', text: 'what IS a *half-smoke?*' },
      { t: 37.4, who: 'scorpio', text: 'the city’s own sausage. *trust.*' },
      { t: 40.2, who: 'capricorn', text: 'okay. this is *incredible.*' },
    ] },
    { open: 44.4, close: 57.9, lines: [
      { t: 44.6, who: 'libra', text: 'Cap. *you* planned all of this.' },
      { t: 47.0, who: 'cancer', text: 'best night of our *whole year.*' },
      { t: 51.6, who: 'capricorn', text: 'I’m not crying. *Pisces* is.' },
      { t: 54.4, who: 'stars', text: 'the fifth seat held *the whole night.*' },
    ] },
  ],
  fx: [[screenShake, { at: T.laugh, len: 0.4, amp: 12 }, shakeCues]],
  music: { style: 'cinematic', key: 'D', seed: 4003, drop: S.dinner, breakdown: [S.pool], lift: [S.mon], hits: [T.hug[1], S.last + 0.42] },
  cues: [
    ['whoosh', 0.02, 0.6, 0.05], ['pop', T.menu, 659.25, 0.035, 0], ['pop', T.pisRef, 1318.51, 0.04, 0.2], ['glitter', T.pisRef, T.pisRef + 0.5],
    ['pop', T.sauce, 523.25, 0.04, 0], ['glitter', T.laugh, T.laugh + 0.6], ['whoosh', T.hug[0], 0.8, 0.03], ['bell', T.hug[1], 1567.98, 0.04, 1.4, 0],
  ],
})
