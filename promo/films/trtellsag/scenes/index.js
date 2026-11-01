// trtellsag: TELL ME WITHOUT TELLING ME, "Tell me you're a Sagittarius without telling me." (20 s vertical, Star Talk
// Trends §1, music: pop · F). Story 0–15.6, then the shared end card. The format look lives in ./tellkit.js (identical in all five).
//   0.0–2.1    hook: "Tell me you’re a *Sagittarius* | without telling me." ♐ Sag pops in and winks.
//   2.1–4.85   TELL 1 "a packed bag *by the door.*"  The door, a bulging backpack (bedroll, map, a READY tag). "always packed."
//   4.85–7.6   TELL 2 "“spontaneous *road trip?*”"  Sag jingles the keys; the date: "now?!"  Sag: "NOW."
//   7.6        card cut.
//   7.6–10.95  TELL 3 (the twist) "the trip? *the corner store.* with you."  A map: the route runs from HOME… one block to
//              the SNACKS shop (ETA 2 MIN). Below, the two walk back sharing a snack bag: "best trip ever."
//   11.35      THE STARS' stamp slams "…a SAGITTARIUS."  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Adventure, *party of two*."
import { makeTell, R, box, bubble, label, shadow, sparkles, hearts, pop01, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from './tellkit.js'

// ── TELL 1: the bag by the door
function backpack(x, t, cx, by, wig = 0) {
  x.save(); x.translate(cx, by); x.rotate(wig)
  // bedroll on top
  box(x, -110, -330, 220, 60, '#3fb08a', { b: 6, hi: '#5fd0a8' }); R(x, INK, -50, -330, 8, 60); R(x, INK, 42, -330, 8, 60)
  // body
  box(x, -120, -270, 240, 270, '#a35cf0', { b: 7, hi: '#c08aff' })
  box(x, -80, -150, 160, 110, '#8a46d6', { b: 6 })
  R(x, GOLD, -10, -150, 20, 20)
  // a map sticking out
  x.save(); x.translate(95, -280); x.rotate(0.35); box(x, -24, -60, 48, 90, '#f4e8cc', { b: 5 }); R(x, RED, -10, -40, 20, 6); x.restore()
  // tag
  x.save(); x.translate(-120, -190); x.rotate(-0.25); R(x, INK, -82, -22, 90, 44); R(x, '#fffbea', -78, -18, 82, 36)
  x.font = `700 20px ${MONO}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('READY', -37, 1); x.restore()
  x.restore()
  void t
}
function tell1(x, t, S) {
  const { u, hero } = S
  // the floor and the door
  R(x, '#1f1838', 0, 1170, 1080, 100); R(x, '#2a2148', 0, 1170, 1080, 8)
  box(x, 620, 640, 280, 530, '#7a4f30', { b: 8, hi: '#94643f' })
  box(x, 650, 680, 220, 190, '#6a4328', { b: 5 }); box(x, 650, 920, 220, 210, '#6a4328', { b: 5 })
  box(x, 840, 900, 26, 26, GOLD, { b: 5 })
  // a WELCOME mat
  box(x, 600, 1176, 320, 34, '#c0623a', { b: 5 })
  const wig = u > 1.5 && u < 1.9 ? 0.06 * Math.sin((u - 1.5) * 40) * (1 - (u - 1.5) / 0.4) : 0
  shadow(x, 520, 1176, 260)
  backpack(x, t, 510, 1172, wig)
  shadow(x, 220, 1180, 200)
  hero(x, t, { x: 220, y: 1070, s: 220, mood: u > 1.5 ? 'happy' : 'sparkle', look: [1, -0.3], hops: [S.t0 + 0.4, S.t0 + 1.5] })
  bubble(x, t, 330, 830, S.t0 + 1.0, S.t1, 'always packed.', { size: 36, tail: -0.5 })
}

// ── TELL 2: "spontaneous road trip?"
function keys(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.35 * Math.sin(t * 14)); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.stroke()
  for (const [a, col] of [[1.2, '#cfc8e8'], [1.9, GOLD]]) {
    x.save(); x.rotate(a); x.translate(0, 22)
    R(x, INK, -10, 0, 20, 70); R(x, col, -6, 4, 12, 62); R(x, INK, 6, 40, 14, 8); R(x, INK, 6, 54, 10, 8)
    box(x, -16, -8, 32, 22, col, { b: 4 })
    x.restore()
  }
  x.restore()
}
function tell2(x, t, S) {
  const { u, hero, date } = S
  // a stripe of motion lines (the road-trip energy)
  for (let i = 0; i < 6; i++) { const yy = 620 + i * 90, ph = ((t * 1.6 + i * 0.37) % 1); R(x, 'rgba(163,92,240,0.25)', 1080 - ph * 1400, yy, 260, 10) }
  shadow(x, 300, 1190, 230); shadow(x, 800, 1190, 210)
  const hops = [S.t0 + 0.4, S.t0 + 0.7, S.t0 + 1.0, S.t0 + 1.9, S.t0 + 2.15, S.t0 + 2.4]
  hero(x, t, { x: 300, y: 1070, s: 240, mood: u > 1.85 ? 'happy' : 'sparkle', look: [1, -0.2], hops, squash: 0 })
  keys(x, t, 450, 960, pop01(t, S.t0 + 0.35, 0.3, 2.6))
  const dm = u < 0.5 ? 'neutral' : u < 1.85 ? 'wide' : 'happy'
  date(x, t, { x: 800, y: 1080, s: 220, mood: dm, look: [-1, 0], hops: [S.t0 + 0.55, S.t0 + 1.4] })
  bubble(x, t, 460, 740, S.t0 + 0.35, S.t1, 'spontaneous road trip?', { size: 40, tail: -0.4 })
  bubble(x, t, 800, 880, S.t0 + 1.35, S.t1, 'now?!', { size: 38, tail: 0, col: '#fff1c8' })
  bubble(x, t, 260, 870, S.t0 + 1.85, S.t1, 'NOW.', { size: 44, tail: 0.2, col: '#e8d6ff' })
}

// ── TELL 3: the map, the corner store, the walk back
function map(x, t, u, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 690); x.scale(k, k)
  box(x, -380, -230, 760, 460, '#f4e8cc', { b: 8 })
  // blocks + streets
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) R(x, '#dccba0', -350 + i * 180, -200 + j * 150, 140, 110)
  R(x, '#9fd8f6', 230, -200, 120, 110)
  // HOME (left) and SNACKS (next block)
  const hx = -280, hy = 0, sx = -100, sy = 0
  box(x, hx - 40, hy - 20, 80, 60, '#ef5c94', { b: 5 }); x.fillStyle = INK; x.beginPath(); x.moveTo(hx - 52, hy - 18); x.lineTo(hx, hy - 64); x.lineTo(hx + 52, hy - 18); x.fill(); x.fillStyle = '#c23a72'; x.beginPath(); x.moveTo(hx - 42, hy - 22); x.lineTo(hx, hy - 56); x.lineTo(hx + 42, hy - 22); x.fill()
  box(x, sx - 50, sy - 30, 100, 70, '#3fb08a', { b: 5 }); for (let i = 0; i < 4; i++) R(x, i % 2 ? '#fff' : RED, sx - 50 + i * 25, sy - 30, 25, 18)
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText('HOME', hx, hy + 70); x.fillText('SNACKS', sx, sy + 70)
  // the dotted route: grows from HOME to SNACKS
  const f = ease.inOutQuad(clamp(prog(u, 0.75, 1.45)))
  const n = 9
  for (let i = 0; i < n; i++) if (i / (n - 1) <= f + 0.001) R(x, RED, lerp(hx + 50, sx - 60, i / (n - 1)) - 5, hy + 8 - 5, 10, 10)
  // a pin and the distance
  if (f >= 1) {
    const pk = pop01(t, 0, 0.01, 1)
    void pk
    x.fillStyle = INK; x.fillRect(sx - 16, sy - 112, 32, 46); x.fillStyle = RED; x.fillRect(sx - 12, sy - 108, 24, 38); x.fillStyle = '#fff'; x.fillRect(sx - 4, sy - 100, 8, 8)
    x.font = `800 40px ${INTER}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'center'; x.fillText('ETA: 2 MIN', 160, 150)
  }
  // the old ambitious route, crossed out (it ran off the map)
  x.restore()
}
function tell3(x, t, S) {
  const { u, hero, date } = S
  map(x, t, u, pop01(t, S.t0 + 0.45, 0.35, 2))
  // the walk back, sharing a snack bag
  const wk = pop01(t, S.t0 + 1.6, 0.3, 2.2)
  if (wk > 0.01) {
    const walk = ease.inOutQuad(clamp(prog(u, 1.6, 3.2)))
    const bx = lerp(640, 480, walk)
    shadow(x, bx - 140, 1210, 170 * wk); shadow(x, bx + 140, 1210, 170 * wk)
    const steps = Array.from({ length: 8 }, (_, i) => S.t0 + 1.7 + i * 0.2)
    hero(x, t, { x: bx - 140, y: 1110, s: 190, pop: wk, mood: 'happy', look: [1, 0], hops: steps })
    date(x, t, { x: bx + 140, y: 1110, s: 190, pop: wk, mood: u > 2.6 ? 'heart' : 'happy', look: [-1, 0], hops: steps.map(s => s + 0.1) })
    // the bag between them
    x.save(); x.translate(bx, 1150 + 6 * Math.sin(t * 10)); x.scale(wk, wk)
    box(x, -46, -50, 92, 100, '#d9b98a', { b: 6 }); R(x, INK, -46, -50, 92, 8)
    R(x, '#f2c75c', -30, -78, 16, 34); R(x, '#ef5c94', -6, -86, 16, 40); R(x, '#7fd0ff', 18, -74, 14, 30)
    x.restore()
    hearts(x, t, S.t0 + 2.65, bx + 200, 1040, { n: 4, spread: 60 })
  }
  bubble(x, t, 540, 985, S.t0 + 2.35, S.t1, 'best trip ever.', { size: 36, tail: 0 })
  sparkles(x, t, 440, 690, S.t0 + 1.45, 8, 120, 1, [RED, GOLD, BONE])
}

const EP = makeTell({
  id: 'trtellsag', sign: 'sagittarius', name: 'Sagittarius', date: 'taurus', deep: '#6a2bc0', accent: '#c08aff',
  hookMood: 'sparkle',
  tells: [
    { caption: 'a packed bag *by the door.*', draw: tell1,
      cues: [['pop', 0.4, 880, 0.035, -0.3], ['pop', 1.0, 987.77, 0.03, -0.3], ['tick', 1.5, 0.04], ['tick', 1.6, 0.035], ['tick', 1.7, 0.03]] },
    { caption: '“spontaneous *road trip?*”', draw: tell2,
      cues: [['whoosh', 0.1, 0.4, 0.03], ['pop', 0.37, 1174.66, 0.04, -0.3], ...[0.4, 0.5, 0.62, 0.72, 0.85].map(v => ['pluck', v, 2637, 0.012, 0.1, -0.2]), ['pop', 1.37, 1318.51, 0.04, 0.4], ['pop', 1.87, 739.99, 0.05, -0.3], ['boom', 1.87, 0.12]] },
    { caption: 'the trip? *the corner store.* with you.', draw: tell3,
      cues: [['whoosh', 0.45, 0.35, 0.03], ...Array.from({ length: 9 }, (_, i) => ['tick', +(0.75 + i * 0.08).toFixed(3), 0.025]), ['pop', 1.45, 1567.98, 0.045, 0], ['pop', 1.62, 880, 0.035, 0],
        ...Array.from({ length: 8 }, (_, i) => ['tick', +(1.7 + i * 0.2).toFixed(3), 0.02]), ['pop', 2.37, 1174.66, 0.03, 0], ['pluck', 2.67, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 400, y: 880, s: 260, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Adventure, *party of two*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, PINK]
