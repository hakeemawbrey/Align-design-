// trratefirst: RATING MY DATE, HONESTLY, "Rating my first date, honestly." (30 s vertical, Star Talk Trends §14,
// music: funk · Am). Story 0–25.5, then the shared end card. The format look lives in ./ratekit.js (identical in all five).
//   0.0–2.6    hook: "Rating my *first date,* | honestly." ♎ Libra, clipboard in hand at 11:48 PM: "ok. let’s be honest."
//              THE STARS take the judges' desk; Pisces takes the fourth seat (tissues, soggy heart card).
//   2.6–8.0    1 · The *hello.*  Outside the café: Libra goes in for a hug, ♐ Sagittarius for a handshake; they dodge
//              left, right, left… and land a HUG-SHAKE. Cards: 9 · 9.5 · NEW MOVE. Libra: "we invented a greeting.
//              it's ours now."
//   8.0–13.4   2 · The *laugh.*  At the table Libra tells the moon pun; Sagittarius SNORTS, sloshes the cocoa, snorts
//              again. Cards: 10 · 10 · SNORT +2.
//  13.4        card cut.
//  13.4–19.2   3 · The *goodbye.* (the twist)  Libra unrolls a whole speech, "so… would you maybe…"; Sagittarius asks
//              first: "same time next week?" The speech drops; Libra faints backwards. Cards: 11 · /10 · ILLEGAL.
//  19.2–25.5   Final *score.*  Drumroll, the judges huddle, the cards flip ∞ · ERROR · ∞, the meter overfills and
//              shatters, the stamp: "SCALE: *BROKEN*". THE STARS: "Scale: *broken*." Pisces fountains.
import { makeRate, R, box, room, nightWindow, shadow, bubble, label, sparkles, hearts, drawBits, starFrame, inSprite, clipboardCells,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, MINT, INTER, CLIP, FLOOR } from './ratekit.js'

const LIB = '#e163d6'
const GND = FLOOR + 40

// café front: a door with a warm window, a string of lights
function cafe(x, t) {
  room(x, '#3a2350', '#2a1a40', { stripe: '#5a3d8a' })
  box(x, 110, 560, 190, GND - 560, '#6b4a2f', { b: 8, hi: '#8a6440' })
  R(x, '#ffd98a', 140, 590, 130, 120); R(x, INK, 202, 590, 6, 120); R(x, INK, 140, 646, 130, 6)
  R(x, GOLD, 262, 760, 16, 16)
  box(x, 640, 560, 220, 170, '#ffcf7a', { b: 8 }); R(x, 'rgba(255,240,200,0.5)', 650, 570, 60, 150)
  for (let i = 0; i < 12; i++) {
    const lx = CLIP.x + 30 + i * 70, ly = 470 + 18 * Math.sin(i * 0.9)
    R(x, INK, lx - 2, ly - 30, 4, 30)
    R(x, INK, lx - 9, ly - 3, 18, 22); R(x, (Math.floor(t * 3 + i) % 3 === 0) ? '#fff1c8' : [GOLD, PINK, MINT][i % 3], lx - 6, ly, 12, 16)
  }
}

function hello(x, t, S) {
  const { u, t0, hero, date } = S
  cafe(x, t)
  const ap = ease.outCubic(prog(u, 0.05, 0.6))
  const dance = u > 0.75 && u < 2.15 ? Math.sin((u - 0.75) * Math.PI * 2.15) : 0
  let lx = lerp(150, 330, ap) + dance * 55, dx = lerp(980, 640, ap) + dance * 55
  const hug = easeOutBack(prog(u, 2.15, 2.4), 2)
  lx = lerp(lx, 420, hug); dx = lerp(dx, 560, hug)
  const lm = u < 0.75 ? 'happy' : u < 2.15 ? 'wide' : u < 2.6 ? 'squint' : 'heart'
  const dm = u < 0.75 ? 'happy' : u < 2.15 ? 'wide' : 'heart'
  shadow(x, lx, GND, 200); shadow(x, dx, GND, 200)
  hero(x, t, { x: lx, y: 860, s: 220, mood: lm, look: [1, 0], hops: [t0 + 0.6, t0 + 2.2, t0 + 3.05] })
  date(x, t, { x: dx, y: 860, s: 220, mood: dm, look: [-1, 0], hops: [t0 + 0.65, t0 + 2.25, t0 + 3.1] })
  // the hands: a handshake block between them while hugging
  if (u > 2.2) {
    const hk = pop01(t, t0 + 2.2, 0.25, 2.5)
    R(x, INK, 470, 850, 44 * hk, 30); R(x, LIB, 474, 854, 18 * hk, 22); R(x, '#a35cf0', 492, 854, 18 * hk, 22)
    sparkles(x, t, 490, 820, t0 + 2.3, 10, 150, 1, [GOLD, BONE, PINK])
    if (u > 2.35) label(x, 'HUG-SHAKE!', 490, 640, { size: 46 * pop01(t, t0 + 2.35, 0.3, 2.6), col: GOLD, font: INTER, weight: 800, rot: -0.06 })
  }
  bubble(x, t, 300, 640, t0 + 0.8, t0 + 1.35, 'hug?', { size: 34, tail: 0.2 })
  bubble(x, t, 680, 640, t0 + 1.05, t0 + 1.6, 'shake?', { size: 34, tail: -0.2 })
  bubble(x, t, 280, 600, t0 + 1.5, t0 + 2.1, 'shake?!', { size: 34, tail: 0.2 })
  bubble(x, t, 700, 600, t0 + 1.65, t0 + 2.1, 'hug?!', { size: 34, tail: -0.2 })
}

function laugh(x, t, S) {
  const { u, t0, hero, date } = S
  room(x, '#2e2a55', '#211c40', { stripe: '#463a7a' })
  nightWindow(x, 480, 560, 300, 190, t)
  // the stars sit behind the table
  const snort = [1.85, 2.15, 2.45].map(v => t0 + v)
  const dm = u < 1.2 ? 'happy' : u < 1.8 ? 'neutral' : u < 2.8 ? 'squint' : 'heart'
  const lm = u < 1.85 ? 'happy' : u < 2.6 ? 'wide' : 'heart'
  hero(x, t, { x: 260, y: 780, s: 230, mood: lm, look: [1, 0], hops: [t0 + 0.35, t0 + 1.0, t0 + 2.65] })
  date(x, t, { x: 700, y: 780, s: 230, mood: dm, look: u < 1.8 ? [-1, 0] : [0, -1], hops: snort })
  box(x, 120, 880, 720, 40, '#8a5a3a', { b: 8, hi: '#a87048' })
  R(x, INK, 180, 928, 24, 110); R(x, INK, 756, 928, 24, 110)
  // mugs (the date's sloshes on each snort)
  const slosh = Math.max(0, ...snort.map(s => (t > s && t < s + 0.3) ? 1 - (t - s) / 0.3 : 0))
  for (const [mx, col] of [[350, '#4f7cd8'], [600, '#e8344e']]) {
    box(x, mx - 30, 820, 60, 60, col, { b: 6, hi: 'rgba(255,255,255,0.25)' }); R(x, INK, mx + 30, 834, 18, 30); R(x, col, mx + 30, 840, 10, 18)
  }
  if (slosh > 0) for (let i = 0; i < 4; i++) R(x, '#8a5a3a', 590 + i * 10 - 10, 810 - slosh * (30 + i * 12), 10, 10)
  bubble(x, t, 330, 560, t0 + 0.3, t0 + 1.55, 'why’d the moon skip dinner?', { size: 32, tail: -0.5 })
  bubble(x, t, 330, 560, t0 + 1.0, t0 + 1.8, '…it was full.', { size: 38, tail: -0.5 })
  snort.forEach((s, i) => {
    const k = pop01(t, s, 0.2, 3) * outK(t, [s + 0.55, s + 0.75])
    if (k > 0.01) label(x, 'SNORT!', [720, 820, 640][i], [600, 660, 540][i], { size: 50 * k, col: GOLD, font: INTER, weight: 800, rot: [-0.15, 0.12, -0.05][i] })
  })
  if (u > 2.6) hearts(x, t, t0 + 2.6, 260, 640, { n: 4 })
}

function goodbye(x, t, S) {
  const { u, t0, hero, date } = S
  room(x, '#1d1840', '#171334', {})
  nightWindow(x, 720, 540, 200, 150, t)
  // a street lamp
  R(x, INK, 160, 500, 16, GND - 500); box(x, 132, 470, 72, 46, '#fff1c8', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(168, 520, 10, 168, 520, 260); g.addColorStop(0, 'rgba(255,236,180,0.25)'); g.addColorStop(1, 'rgba(255,236,180,0)'); x.fillStyle = g; x.fillRect(0, 300, 500, 700); x.restore()
  // the speech scroll unrolls, then drops
  const unroll = ease.outCubic(prog(u, 0.2, 0.7)), drop = ease.inCubic(prog(u, 1.45, 1.95))
  const lx = 330, dx = 650
  const fall = ease.inCubic(prog(u, 2.1, 2.45)) - 0.15 * Math.sin(Math.PI * prog(u, 2.45, 2.75))
  shadow(x, lx, GND, 200); shadow(x, dx, GND, 200)
  date(x, t, { x: dx, y: 860, s: 220, mood: u < 1.05 ? 'happy' : u < 2.4 ? 'sparkle' : 'wide', look: u < 2.4 ? [-1, 0] : [-1, 0.6], hops: [t0 + 1.05, t0 + 2.5] })
  // Libra, fainting backwards around its feet
  x.save(); x.translate(lx, GND - 20); x.rotate(-1.25 * fall); x.translate(-lx, -(GND - 20))
  hero(x, t, { x: lx, y: 860, s: 220, mood: u < 1.2 ? 'neutral' : u < 1.7 ? 'wide' : 'heart', look: [1, 0], hops: [t0 + 0.25, t0 + 1.25], blush: u > 1.2 ? 1 : undefined })
  x.restore()
  if (unroll > 0.01 && drop < 1) {
    const sx = 230, sy = 700 + drop * 300
    x.save(); x.translate(sx, sy); x.rotate(drop * 1.4)
    box(x, -50, -10, 100, 230 * unroll, BONE, { b: 5 })
    R(x, '#c9b48a', -56, -16, 112, 14)
    for (let j = 0; j < Math.floor(9 * unroll); j++) R(x, INK, -36, 12 + j * 22, j % 3 === 2 ? 40 : 70, 6)
    label(x, 'SPEECH', 0, -40, { size: 22, col: GOLD })
    x.restore()
  }
  bubble(x, t, 330, 600, t0 + 0.35, t0 + 1.2, 'so… would you maybe…', { size: 32, tail: 0 })
  bubble(x, t, 640, 600, t0 + 1.05, t0 + 2.9, 'same time next week?', { size: 36, col: '#ffe0ea', tail: 0.1 })
  if (u > 2.45) { sparkles(x, t, lx - 120, GND - 60, t0 + 2.45, 8, 90, 2, [GOLD, BONE]); label(x, 'thud.', lx - 150, GND - 130, { size: 34, col: BONE, alpha: outK(t, [t0 + 3.6, t0 + 3.9]) }) }
}

function finale(x, t, S) {
  const { hero, t0, ok } = S
  R(x, '#2b2150', CLIP.x, CLIP.y, CLIP.w, CLIP.h)
  nightWindow(x, 250, 600, 220, 180, t)
  R(x, '#3b2e66', CLIP.x, GND, CLIP.w, CLIP.h)
  const o = { x: 560, y: 820, s: 300, pop: ok, mood: t < 21.3 ? 'squint' : 'heart', look: [0, 0], hops: [t0 + 0.4, 21.32, 21.7, 23.6] }
  shadow(x, 560, GND, 260 * ok)
  hero(x, t, o)
  inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => clipboardCells(x, t * 3))
  hearts(x, t, 21.4, 560, 700, { n: 7, spread: 300 })
}

const EP = makeRate({
  id: 'trratefirst', hero: 'libra', heroName: 'LIBRA', date: 'sagittarius', accent: LIB, heroInk: '#f29ae9',
  title: 'Rating my *first date,* | honestly.',
  hookTime: '11:48 PM', hookSay: 'ok. let’s be honest.',
  moments: [
    { caption: 'The *hello.*', time: '7:02 PM', draw: hello, cards: ['9', '9.5', 'NEW|MOVE'], level: 9,
      line: 'we invented a greeting. it’s *ours* now.',
      cues: [['whoosh', 0.05, 0.35, 0.03], ['pop', 0.8, 880, 0.03, -0.3], ['pop', 1.05, 987.77, 0.03, 0.3], ['pop', 1.5, 1174.66, 0.03, -0.3], ['pop', 1.65, 1318.51, 0.03, 0.3],
        ['tom', 2.25, 120, { gain: 0.18, decay: 0.2 }], ['pop', 2.3, 1567.98, 0.04, 0], ['glitter', 2.3, 2.7]] },
    { caption: 'The *laugh.*', time: '7:41 PM', draw: laugh, cards: ['10', '10', 'SNORT|+2'], level: 10,
      line: 'they snort-laughed. at *my* pun. iconic.',
      cues: [['pop', 0.3, 880, 0.03, -0.3], ['pop', 1.0, 1174.66, 0.035, -0.3],
        ['tom', 1.85, 150, { gain: 0.2, decay: 0.18 }], ['tom', 2.15, 165, { gain: 0.18, decay: 0.16 }], ['tom', 2.45, 180, { gain: 0.2, decay: 0.18 }], ['pluck', 2.65, 1567.98, 0.03, 0.5, -0.3]] },
    { caption: 'The *goodbye.*', time: '10:15 PM', draw: goodbye, cards: ['11', '/10', 'ILLEGAL'], level: 11,
      line: 'they asked *first.* I had a whole speech.',
      cues: [['whoosh', 0.2, 0.4, 0.03], ['pop', 0.35, 739.99, 0.03, -0.2], ['pop', 1.05, 1318.51, 0.045, 0.3], ['pop', 1.12, 1760, 0.03, 0.3],
        ['whoosh', 1.45, 0.4, 0.025], ['whoosh', 2.1, 0.35, 0.03], ['tom', 2.45, 90, { gain: 0.26, decay: 0.3 }], ['tick', 2.45, 0.06]] },
  ],
  final: { caption: 'Final *score.*', time: '11:48 PM', draw: finale, cards: ['∞', 'ERROR', '∞'], stamp: 'SCALE: *BROKEN*' },
  last: 'Scale: *broken.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, RED, drawBits, clamp]
