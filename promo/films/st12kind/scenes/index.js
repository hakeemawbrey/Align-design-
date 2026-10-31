// st12kind (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E14) · story 0–15.6, then the end card.
//   🔥 HOT TAKE: "Being kind on the apps is *rare*. Be rare." (heat 3). ★ THE STARS (pro) vs a tired swiper, a dim
//   blue-grey star with a phone ("why bother"). Behind them a stack of profile cards keeps flicking away; the swiper
//   sends one kind message instead, and at the last line a heart reply pops back. THE STARS RULE: one kind message
//   beats ten ignored ones. Last line (The Stars): "Kind is the *hottest* take."
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import { STAR } from '../../startalk.js'
import { drawPixelHeart } from './props.js'
import { makeEpisode, R, INK, BONE, GOLD, pop01, r3 } from './hotkit.js'

const SWIPER = '#8b9bc4'
const CARD_COLS = ['#ff8fb1', '#9cf08a', '#c9a6ff', '#7fe0ff', '#f2c75c', '#ff9c6b']

function card(x, cx, cy, rot, col, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -116, -150, 232, 300); R(x, '#fffaf0', -108, -142, 216, 284)
  R(x, col, -96, -130, 192, 180)
  R(x, 'rgba(27,18,54,0.75)', -24, -100, 48, 48); R(x, 'rgba(27,18,54,0.75)', -52, -44, 104, 80)   // a little silhouette
  R(x, 'rgba(27,18,54,0.35)', -96, 66, 140, 14); R(x, 'rgba(27,18,54,0.2)', -96, 94, 100, 12)
  x.restore()
}
function apps(x, t, T) {
  const cx = 540, cy = 800
  const sent = T.lines[2].t + 0.2
  // swipe, swipe, swipe: a card flies off every 0.55 s until the swiper stops to write
  const stopAt = sent - 0.6
  const tt = Math.min(t, stopAt), n = Math.floor(tt / 0.55), f = (tt % 0.55) / 0.55
  card(x, cx + 10, cy + 10, 0.04, CARD_COLS[(n + 2) % CARD_COLS.length], 0.6)
  card(x, cx, cy, 0, CARD_COLS[(n + 1) % CARD_COLS.length])
  if (t < stopAt) {
    const e = ease.inQuad(clamp(f / 0.7))
    card(x, lerp(cx, cx - 720, e), cy + e * 60, -e * 0.5, CARD_COLS[n % CARD_COLS.length], 1 - e * 0.4)
  }
  // the kind message, then the reply heart
  const p = pop01(t, sent, 0.32, 2.4)
  if (p > 0) {
    x.save(); x.translate(cx + 96, cy + 128); x.scale(p, p)
    x.font = "700 28px Inter, 'Helvetica Neue', Arial, sans-serif"
    const text = 'hey, loved your dog pic :)', w = Math.ceil(x.measureText(text).width) + 40
    R(x, INK, -w - 6, -36, w + 12, 72); R(x, '#4f8dff', -w, -30, w, 60); R(x, '#4f8dff', -14, 30, 14, 12)
    x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, -w + 20, 2)
    x.restore()
  }
  const h = pop01(t, T.last - 0.2, 0.35, 3)
  if (h > 0) {
    x.save(); x.translate(cx - 150, cy + 210); x.scale(h, h)
    R(x, INK, -70, -40, 140, 80); R(x, '#fffaf0', -64, -34, 128, 68); R(x, '#fffaf0', 0, 34, 14, 12)
    drawPixelHeart(x, 0, 0, 7); x.restore()
  }
}
function phone(x, r, t, T) {
  if (t >= T.lines[2].t + 0.6) return
  x.save(); x.translate(r.x + 126, r.y + 30); x.rotate(0.16)
  R(x, INK, -32, -56, 64, 112); R(x, '#3b2f63', -28, -52, 56, 104); R(x, '#9fd8ff', -22, -42, 44, 80)
  const sw = Math.floor(t / 0.55) % 2
  R(x, sw ? '#ff8fb1' : '#9cf08a', -16, -34, 32, 40)
  x.restore()
}

const EP = makeEpisode({
  id: 'st12kind', numeral: 'S12 E14', duration: 20, key: 'Bb',
  take: 'Being kind on the apps is *rare*. Be rare.', takeAccent: GOLD, heat: 3,
  pro: { tag: '★ THE STARS', color: STAR.sky, accent: GOLD, pitch: 784 },
  con: { tag: '✦ A TIRED SWIPER', color: SWIPER, accent: '#c8d4ff', pitch: 349, prop: phone },
  lines: [
    ['con', 'why *bother?* nobody replies.'],
    ['pro', 'so be the one who *does.*'],
    ['con', '“hey, loved your dog pic”… *sent.*'],
  ],
  verdict: 'one kind message beats ten ignored ones.',
  last: 'Kind is the *hottest* take.', lastWho: 'pro',
  moods(ph, t, T) {
    if (ph === 'take') return [{ mood: 'wink', look: [1, -1] }, {}]
    if (ph === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'sleepy', look: [0, 1] }]
    if (ph === 1) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }]
    if (ph === 2) return [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }]
    return [{ mood: 'happy', look: [1, 0] }, { mood: t >= T.last ? 'heart' : 'wide', look: [-1, 0] }]
  },
  set: (x, t, T) => apps(x, t, T),
  cues: T => [
    ...Array.from({ length: Math.floor((T.lines[2].t - 0.4) / 0.55) }, (_, i) => ['whoosh', r3(i * 0.55 + 0.05), 0.22, 0.012]),
    ['pop', r3(T.lines[2].t + 0.2), 1174.66, 0.05, 0.3],
    ['bell', r3(T.last - 0.2), 1567.98, 0.035, 1.6, -0.3],
  ],
})
void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
