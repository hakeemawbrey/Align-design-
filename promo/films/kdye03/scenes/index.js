// kdye03: DATE YOURSELF, "Phone in the Drawer" (21.2 s vertical, star_advice post, chiptune · D, LOOP). Row: promo/films/month2/m16.md.
// Feeling: the 2 a.m. scroll, never alone with your thoughts. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♊ Gemini mid-throw, the phone mid-air over an open drawer. Whip zoom at 0.12 as the drawer slams.
//             Hook "Gemini vs one hour | *without* the phone." Stamp at 1.3.
//   3.0–8.2   STOP 1 the withdrawal: the drawer rattles, ghost texts float by, a notification drops… Gemini turns away.
//   8.2–13.4  STOP 2 the bookshop: a notebook filling up; Pisces sobs over a poem.
//  13.4–19.1  STOP 3 the hour's up: the timer hits 60:00, the drawer creaks open… "eh. later."
//  19.3–end   last line "Turns out you're | *decent company.*", then the last 0.42 s loops back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, MONO, INTER, R, box, room, book, phone, shadow, glow, drawBits, lampPost,
  sparkles, confetti, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.2
const S1 = [3.0, 8.2], S2 = [8.2, 13.4], S3 = [13.4, 19.1]
const GEM = '#ffd23a'

function desk(x, { drawerOpen = 0, rattle = 0, t = 0 }) {
  box(x, 140, 1080, 800, 36, '#6b4428', { b: 7, hi: '#8a5a3a' })
  box(x, 180, 1116, 720, 230, '#5a3a22', { b: 7 })
  const dx = rattle * 6 * Math.sin(t * 60)
  // the drawer slides out toward us (drawn taller)
  const o = clamp(drawerOpen)
  box(x, 330 + dx - o * 30, 1150 - o * 10, 420 + o * 60, 150 + o * 40, '#7a4c2c', { b: 7, hi: '#9a6640' })
  R(x, GOLD, 520 + dx, 1210 + o * 6, 40, 14)
}
function timerPlate(x, txt, k = 1, col = GOLD) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 520); x.scale(k, k)
  box(x, -260, -50, 520, 100, INK, { b: 6 }); x.restore()
  label(x, txt, 540, 522, { size: 44 * k, col })
}
function shelves(x) {
  room(x, { wall: '#3a2a52', wall2: '#33244a', floor: '#2a1f40', floorY: 1300, stripes: false })
  const cols = ['#e8628a', '#4f7cd8', GOLD, '#5fd38a', '#c9a6ff', '#ff8a6a', '#7fd0ff']
  for (let r = 0; r < 4; r++) {
    const y = 300 + r * 230
    R(x, INK, 40, y + 180, 1000, 20); R(x, '#6b4428', 40, y + 184, 1000, 12)
    for (let i = 0; i < 22; i++) { const h = 120 + ((i * 37 + r * 11) % 50), w = 30 + ((i * 13) % 16); box(x, 60 + i * 44, y + 180 - h, w, h, cols[(i + r * 3) % cols.length], { b: 3 }) }
  }
}

function opener(x, t, S) {
  room(x, { wall: '#2a2350', wall2: '#251f48', floor: '#1d1838', floorY: 1340, win: { x: 690, y: 330, w: 300, h: 300, sky: 'night' } })
  label(x, '2:07 AM', 840, 680, { size: 34, col: '#9fe6b0' })
  const slam = ease.inCubic(prog(t, 0.05, 0.14))
  desk(x, { drawerOpen: 1 - slam, t })
  // the phone mid-air, falling into the drawer
  const f = clamp(t / 0.12)
  if (t < 0.14) phone(x, lerp(560, 540, f), lerp(980, 1190, f * f), { rot: lerp(-0.6, -0.1, f), s: 0.9, screen: '#7fd0ff', draw: c => { for (let i = 0; i < 5; i++) { c.fillStyle = i % 2 ? '#ff8fb1' : BONE; c.fillRect(-46, -90 + i * 34, 80 - (i % 3) * 14, 22) } } })
  if (t > 0.12 && t < 0.6) label(x, 'CLUNK', 540, 1020, { size: 70, col: GOLD, font: INTER, weight: 800, rot: -0.08, alpha: 1 - prog(t, 0.3, 0.6) })
  shadow(x, 300, 1350, 240)
  S.hero(x, t, { x: 270, y: 950, s: 280, mood: t < 1.6 ? 'wide' : 'squint', look: [1, 0.6], squash: -0.06, hops: [0.14] })
  S.pis(x, t, { x: 930, y: 1500, s: 140, mood: 'wide', look: [-1, -0.6] }, 1)
}

function withdrawal(x, t, S) {
  const { u } = S
  room(x, { wall: '#2a2350', wall2: '#251f48', floor: '#1d1838', floorY: 1340, win: { x: 690, y: 330, w: 300, h: 300, sky: 'night' } })
  const rat = u > 0.6 && u < 2.6 ? 1 : 0
  desk(x, { rattle: rat * (Math.sin(t * 7) > 0 ? 1 : 0), t })
  if (rat && Math.sin(t * 7) > 0) label(x, 'bzzt', 760, 1170, { size: 30, col: '#c9a6ff' })
  // ghost texts floating up out of the drawer
  const ghosts = ['u up?', 'omg did u see', 'call me!!', 'ok wait', 'lol']
  ghosts.forEach((g, i) => {
    const b = S.a + 0.5 + i * 0.5, p = (t - b) / 1.8
    if (p < 0 || p > 1) return
    x.save(); x.globalAlpha = 0.75 * Math.sin(Math.PI * p); bubble(x, t, 380 + ((i * 173) % 340), 1100 - p * 380, b, b + 1.8, g, { size: 28, col: '#d8d0f0' }); x.restore()
  })
  const away = u > 2.8
  S.hero(x, t, { x: away ? 300 : 280, y: 960, s: 270, mood: away ? 'happy' : 'squint', look: away ? [-1, -0.5] : [1, 0.8], hops: away ? [S.a + 2.8] : [] })
  const secs = Math.floor(lerp(4, 12, prog(u, 0, 5)))
  timerPlate(x, `PHONE-FREE  00:${String(secs).padStart(2, '0')}`, pop01(t, S.a + 0.2, 0.3, 2))
}

function bookshop(x, t, S) {
  const { u } = S
  shelves(x)
  shadow(x, 400, 1310, 260)
  S.hero(x, t, { x: 380, y: 1100, s: 250, mood: u > 2.6 ? 'sparkle' : 'happy', look: [1, 0.4], hops: [S.a + 2.6] })
  // the notebook filling up
  x.save(); x.translate(700, 1150); x.rotate(-0.05)
  box(x, -150, -110, 300, 220, BONE, { b: 6 }); R(x, '#e8628a', -150, -110, 300, 14)
  const n = Math.floor(clamp(u / 4.6) * 7)
  for (let i = 0; i < n; i++) R(x, '#3b3a8a', -126, -76 + i * 26, 220 - ((i * 47) % 90), 7)
  x.restore()
  if (u > 2.6 && u < 4.2) label(x, 'ooh', 600, 940, { size: 40, col: GOLD, font: INTER, weight: 800, alpha: outK(t, [S.a + 3.9, S.a + 4.2]) })
  // Pisces with a poem book, sobbing
  book(x, 900, 1000, { open: 1, col: '#c9a6ff', s: 0.7 })
  S.pis(x, t, { x: 900, y: 880, s: 150, mood: 'sparkle', look: [0, 1] }, 3)
  bubble(x, t, 860, 700, S.a + 0.8, S.b - 0.15, 'it RHYMES', { size: 30, col: '#c9ecfb', tail: 0.3 })
}

function hourUp(x, t, S) {
  const { u } = S
  room(x, { wall: '#2a2350', wall2: '#251f48', floor: '#1d1838', floorY: 1340, win: { x: 690, y: 330, w: 300, h: 300, sky: 'dawn' } })
  const secs = u < 1.2 ? Math.floor(lerp(3540, 3600, prog(u, 0, 1.2))) : 3600
  const mm = Math.floor(secs / 60), ss = secs % 60
  const done = u > 1.2
  timerPlate(x, `PHONE-FREE  ${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, outK(t, [19.0, 19.25]), done ? '#5fd38a' : GOLD)
  if (done) { confetti(x, t, S.a + 1.2, 540, 520); sparkles(x, t, 540, 520, S.a + 1.2, 12, 260, 1) }
  const open = ease.inOutCubic(prog(u, 2.0, 2.8))
  desk(x, { drawerOpen: open, t })
  if (open > 0.5) phone(x, 560, 1180, { faceDown: true, s: 0.5, rot: 0.2 })
  // notebook on the desk, still writing
  x.save(); x.translate(780, 1040); x.rotate(0.06); box(x, -110, -40, 220, 80, BONE, { b: 5 }); for (let i = 0; i < 3; i++) R(x, '#3b3a8a', -92, -24 + i * 18, 160 - i * 30, 6); x.restore()
  S.hero(x, t, { x: 290, y: 940, s: 270, mood: u > 3.2 ? 'happy' : u > 2.4 ? 'neutral' : 'sparkle', look: u > 2.4 && u < 3.2 ? [1, 0.8] : [1, 0.2], hops: [S.a + 1.25, S.a + 3.3] })
  bubble(x, t, 330, 700, S.a + 3.3, S.b + 2, 'eh. later.', { size: 34, tail: -0.3 })
  S.pis(x, t, { x: 930, y: 900, s: 140, mood: 'happy', look: [-1, -0.6], hops: [S.a + 1.25] }, 3)
}

const EP = makeDate({
  id: 'kdye03', sign: 'gemini', name: 'Gemini', D, ending: 'loop',
  hook: 'Gemini vs one hour | *without* the phone.', hookSize: 104, hookAccent: GEM,
  fx: [
    { kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.45 } },
    { kind: 'notif', o: { at: 5.2, out: [6.9, 7.2], title: 'GROUP CHAT', body: 'someone posted a *picture*', glyph: '♊', time: 'now' } },
  ],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'the *withdrawal*', draw: withdrawal,
      cues: [...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.6 + i * 0.32), 0.05]), ...Array.from({ length: 5 }, (_, i) => ['pop', r3(0.5 + i * 0.5), 1318.51, 0.02, 0.3]), ['pop', 2.8, 659.25, 0.04, -0.3]] },
    { a: S2[0], b: S2[1], sticker: 'the *bookshop*', draw: bookshop,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(0.3 + i * 0.35), 0.015]), ['pluck', 2.6, 1174.66, 0.04, 0.5, -0.2], ['pluck', 0.8, 659.25, 0.03, 0.5, 0.5]] },
    { a: S3[0], b: S3[1], sticker: "the hour's *up*", draw: hourUp,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['bell', 1.2, 1760, 0.04, 1.2, 0], ['glitter', 1.2, 1.8], ['riser', 2.0, 2.8, 0.02], ['tick', 2.8, 0.05], ['pop', 3.3, 880, 0.04, -0.3]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: 'what if something *happened?*' },
    { t: 5.9, who: 'stars', text: 'something is happening. *you.*' },
    { t: 8.8, who: 'stars', text: 'one hour with *your* thoughts.' },
    { t: 11.0, who: 'hero', text: "they're actually… *kinda good?*" },
    { t: 14.1, who: 'hero', text: "oh. it's been an *hour?*" },
    { t: 16.4, who: 'stars', text: "and you didn't *miss* a thing." },
  ],
  boxes: [[3.4, 8.05, [0, 1]], [8.6, 13.25, [2, 3]], [13.9, 19.0, [4, 5]]],
  last: { t: 19.25, text: "Turns out you're | *decent company.*", top: 300, size: 96, accent: GEM },
  cues: [['tick', 0.12, 0.08], ['boom', 0.13, 0.16]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MONO, glow, drawBits, lampPost]
