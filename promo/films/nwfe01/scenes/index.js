// nwfe01: WAIT FOR IT, "Your side first." (18 s vertical trial reel, Wait for It Vol. 2 ep 1, music: screwed · Cm)
// Story 0–15.6, then the short end card (2.4 s). No Align card transition (owner change, 4 Nov). The format look and timing live in ./wait.js (the Vol. 2 kit, imported by all 12).
//   0.0–3.8   "Virgo is scraping | *the windshield.*" + "wait for it…". ♍ Virgo, mid-scrape with a long snow brush, works
//             at a frosted car windshield; ♉ Taurus shivers beside the car ("brrr"). Snow falls.
//   3.95–9.3  "It's taking | *forever…*"  The cleared patch grows painfully slowly. Stickers: "one *tiny* square" ·
//             "ten minutes: *still one side*" · "…it's not even *the driver's side?!*". The bar stalls at 99%.
//   9.45      card cut.
//   9.5–13.4  "Whose side? | *Yours.*"  On the drop the whole passenger half wipes clear, a heart scraped into the frost on
//             the other half; Taurus's side glows. ♍ VIRGO: "your side first. you get *cold* faster."
//   13.45–15.5 "*Your* side first."  Hearts float up, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, HEART, drawBits, pop01, outK, popOut, r3, plate, snowfall, snowBank } from './wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

// the car (front view) and its windshield: a trapezoid, split down the middle
const CX = 540
const WS = { top: 760, bot: 960, tl: 385, tr: 695, bl: 330, br: 750 }
const halfX = CX
const xAt = (y, side) => { const v = (y - WS.top) / (WS.bot - WS.top); return side < 0 ? lerp(WS.tl, WS.bl, v) : lerp(WS.tr, WS.br, v) }
// the slow patch on the right half (Taurus's side): centre + size over the hook and build
const PATCH = { x: 640, y: 860 }
const patchSize = (t, T) => t < T.reveal ? 34 + 40 * ease.inOutQuad(prog(t, 0, T.stall)) : 74
const WIPE = [9.52, 10.05]

function windshieldPath(x) { x.beginPath(); x.moveTo(WS.tl, WS.top); x.lineTo(WS.tr, WS.top); x.lineTo(WS.br, WS.bot); x.lineTo(WS.bl, WS.bot); x.closePath() }

function car(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  // roof + pillars
  x.fillStyle = INK; x.beginPath(); x.moveTo(WS.tl - 22, WS.top - 22); x.lineTo(WS.tr + 22, WS.top - 22); x.lineTo(WS.br + 30, WS.bot + 8); x.lineTo(WS.bl - 30, WS.bot + 8); x.closePath(); x.fill()
  x.fillStyle = '#c94f6d'; x.beginPath(); x.moveTo(WS.tl - 14, WS.top - 14); x.lineTo(WS.tr + 14, WS.top - 14); x.lineTo(WS.br + 22, WS.bot + 2); x.lineTo(WS.bl - 22, WS.bot + 2); x.closePath(); x.fill()
  // snow on the roof
  R(x, INK, WS.tl - 26, WS.top - 44, WS.tr - WS.tl + 52, 26); R(x, '#eef6ff', WS.tl - 22, WS.top - 40, WS.tr - WS.tl + 44, 18)
  // the body
  R(x, INK, 250, 952, 580, 236); R(x, '#d65f7c', 256, 958, 568, 224); R(x, '#e87f98', 256, 958, 568, 20)
  // grille + headlights + plate
  R(x, INK, 430, 1060, 220, 60); R(x, '#5a3a66', 436, 1066, 208, 48)
  for (let i = 0; i < 5; i++) R(x, '#3a2448', 446 + i * 40, 1070, 26, 40)
  for (const hx of [300, 690]) { R(x, INK, hx - 6, 1010, 102, 56); R(x, '#fff3c4', hx, 1016, 90, 44); R(x, '#ffffff', hx + 8, 1022, 24, 12) }
  R(x, INK, 486, 1132, 108, 40); R(x, BONE, 492, 1138, 96, 28)
  x.font = "700 20px 'Space Mono', monospace"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BRRR', 540, 1153)
  // wheels
  for (const wx of [300, 720]) { R(x, INK, wx - 10, 1180, 80, 56); R(x, '#2a1f3a', wx - 4, 1186, 68, 44) }
  // mirrors
  R(x, INK, 230, 900, 60, 46); R(x, '#d65f7c', 236, 906, 48, 34)
  R(x, INK, 790, 900, 60, 46); R(x, '#d65f7c', 796, 906, 48, 34)
  x.restore()
}

function windshield(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  windshieldPath(x); x.clip()
  // glass
  R(x, '#24305e', WS.bl, WS.top, WS.br - WS.bl, WS.bot - WS.top)
  const glass = (gx, gy, w, h) => { R(x, '#24305e', gx, gy, w, h); x.save(); x.beginPath(); x.rect(gx, gy, w, h); x.clip(); for (let i = 0; i < 3; i++) { x.save(); x.translate(gx + 20 + i * 70, gy); x.rotate(0.5); R(x, 'rgba(160,190,255,0.22)', 0, -40, 18, 400); x.restore() } x.restore() }
  // frost (both halves), speckled
  R(x, '#e4f0ff', WS.bl, WS.top, WS.br - WS.bl, WS.bot - WS.top)
  for (let i = 0; i < 70; i++) { const fx = WS.bl + (i * 53) % (WS.br - WS.bl), fy = WS.top + (i * 37) % (WS.bot - WS.top); R(x, i % 2 ? '#ffffff' : '#c9dcf5', fx, fy, 8, 8) }
  // the split line down the middle
  R(x, 'rgba(27,18,54,0.35)', halfX - 2, WS.top, 4, WS.bot - WS.top)
  // the slow patch, then the full wipe of the right half
  const wp = ease.inOutCubic(prog(t, ...WIPE))
  if (wp > 0) {
    const yy = lerp(WS.top, WS.bot, wp)
    glass(halfX + 2, WS.top, WS.br - halfX, yy - WS.top)
    // the brush's wet edge
    if (wp < 1) R(x, '#ffffff', halfX + 2, yy - 6, WS.br - halfX, 8)
  }
  const s = patchSize(t, T)
  if (wp < 1) glass(PATCH.x - s / 2, PATCH.y - s / 2, s, s)
  // the heart scraped into the frost of the other half, after the wipe
  const hk = pop01(t, WIPE[1] + 0.1, 0.35, 2.4)
  if (hk > 0.01) drawBits(x, HEART, { H: '#24305e' }, 450, 860, 12 * hk, { outline: '#ffffff' })
  x.restore()
  // the half labels
  const lk = clamp(prog(t, 4.6, 4.9)) * outK(t, [T.reveal, T.reveal + 0.2])
  if (lk > 0.01) plate(x, 'THEIRS', 640, 745, { size: 22, bg: BONE, alpha: lk * k })
  const yk = pop01(t, WIPE[1], 0.3, 2.4) * outK(t, T.out)
  if (yk > 0.01) plate(x, 'YOUR SIDE', 642, 742, { size: 26, bg: GOLD, alpha: yk, scale: 0.8 + 0.2 * yk })
}

// the long snow brush, from Virgo's hand to the patch (scrubbing), then lowered on the reveal
function brush(x, t, T, ctx) {
  if (!ctx.hero) return
  const k = clamp(popOut(t, T.out))
  const H = ctx.hero, hx = H.x + 105, hy = H.F.cy + 20
  const away = ease.inOutCubic(prog(t, WIPE[1], WIPE[1] + 0.4))
  const wiping = prog(t, ...WIPE)
  let px = PATCH.x + 16 * Math.sin(t * 8.5), py = PATCH.y + 10 * Math.cos(t * 6.1)
  if (wiping > 0 && wiping < 1) { px = 640 + 90 * Math.sin(t * 22); py = lerp(WS.top, WS.bot, ease.inOutCubic(wiping)) }
  px = lerp(px, H.x + 160, away); py = lerp(py, hy + 120, away)
  x.save(); x.globalAlpha = k
  x.lineCap = 'butt'; x.strokeStyle = INK; x.lineWidth = 20; x.beginPath(); x.moveTo(hx, hy); x.lineTo(px, py); x.stroke()
  x.strokeStyle = '#4fb3d9'; x.lineWidth = 10; x.beginPath(); x.moveTo(hx, hy); x.lineTo(px, py); x.stroke()
  // the brush head
  const a = Math.atan2(py - hy, px - hx)
  x.translate(px, py); x.rotate(a + Math.PI / 2)
  R(x, INK, -34, -14, 68, 30); R(x, '#ffd23a', -30, -10, 60, 22)
  for (let i = 0; i < 6; i++) R(x, '#fff3c4', -28 + i * 10, -18, 6, 8)
  x.restore()
  // frost flakes flying off the patch
  if (t < T.reveal || (wiping > 0 && wiping < 1)) for (let i = 0; i < 4; i++) { const ph = (t * 2.4 + i / 4) % 1; x.save(); x.globalAlpha = k * (1 - ph); R(x, '#ffffff', px + 30 + ph * 60 * (i % 2 ? 1 : -1), py - 10 + ph * 40, 7, 7); x.restore() }
}

const EP = makeEpisode({
  id: 'nwfe01', key: 'Cm', seed: 4701,
  hero: { sign: 'virgo', lineColor: '#b8e3a0' },
  date: { sign: 'taurus' },
  pos: { hero: { x: 205, y: 1075, s: 240 }, date: { x: 905, y: 1090, s: 200 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Virgo is scraping | *the windshield.*', h0Accent: '#b8e3a0',
  h1: "It's taking | *forever…*",
  h2: 'Whose side? | *Yours.*', h2Accent: PINK,
  last: '*Your* side first.', lastAccent: GOLD,
  stickers: ['one *tiny* square', 'ten minutes: *still one side*', '…not even *the driver’s side?!*'],
  line: { who: 'hero', text: 'your side first. you get *cold* faster.' },
  focus: { x: 600, y: 900 },
  glow: { x: 640, y: 860 },
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'squint', look: [1, -0.6] }
    if (ph === 'build') return { mood: 'squint', look: [1, -0.8] }
    if (ph === 'reveal' && t < T.reveal + 0.9) return { mood: 'happy', look: [1, 0] }
    return null
  },
  dateMoods(ph, t, T) {
    const shiver = 0.035 * Math.sin(t * 38)
    if (ph === 'hook') return { mood: 'squint', look: [-1, 0], squash: shiver }
    if (ph === 'build') return { mood: t > T.stk[1] ? 'wide' : 'squint', look: [-1, -0.4], squash: shiver * 1.2 }
    return null
  },
  back(x, t, T) {
    snowBank(x, t, T, 935)
    snowfall(x, t, { n: 30, seed: 3, alpha: 0.55 * clamp(popOut(t, T.out)), y1: 1300, speed: 0.8 })
  },
  mid(x, t, T, ctx) {
    car(x, t, T)
    windshield(x, t, T)
    // Taurus's breath puffs + a "brrr" while it waits in the cold
    const D = ctx.P.date
    const cold = outK(t, [WIPE[1], WIPE[1] + 0.4])
    if (cold > 0.01) {
      for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; x.save(); x.globalAlpha = cold * 0.7 * Math.sin(Math.PI * ph); R(x, '#ffffff', D.x - 70 - ph * 50, D.y - 10 - ph * 70, 18 + ph * 20, 14 + ph * 14); x.restore() }
      plate(x, 'brrr', D.x + 10, D.y - 175, { size: 24, bg: '#cfe9ff', alpha: cold * clamp(popOut(t, T.out)), rot: 0.06 + 0.03 * Math.sin(t * 30) })
    }
  },
  front(x, t, T, ctx) {
    brush(x, t, T, ctx)
    snowfall(x, t, { n: 22, seed: 9, alpha: 0.8 * clamp(popOut(t, T.out)), speed: 1.2 })
    // the passenger side glows warm for Taurus after the reveal
    const g = clamp(prog(t, WIPE[1], WIPE[1] + 0.5)) * outK(t, T.out)
    if (g > 0.01 && ctx.date) drawBits(x, HEART, { H: '#ff5d8f' }, ctx.date.x - 12, ctx.date.y - 185, 8 * pop01(t, T.lastLand, 0.3, 2.6) * outK(t, T.out))
  },
  cues: T => [
    ...Array.from({ length: 14 }, (_, i) => ['tick', r3(0.2 + i * 0.6), 0.012]),
    ['whoosh', WIPE[0], 0.5, 0.04], ['pop', r3(WIPE[1] + 0.1), 1318.51, 0.035, -0.2], ['pop', r3(WIPE[1] + 0.2), 1567.98, 0.03, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [BONE, lerp]
