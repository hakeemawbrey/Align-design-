// nc14e21: CUFFING SEASON, "Defining it before the holidays" (45 s vertical, promo/films/next30/b02.md, music: synthwave · F#m)
// Story 0–40.6, then the shared end card. The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–7.0    "The holidays are coming. | So is *the talk.*"  Frame 0: ♉ Taurus mid-pace under a wall calendar whose pages
//              keep flipping; ♏ Scorpio mid-pose at a mirror. TAURUS: "family will ask *'who's that?'*" → "and i'll say…
//              *a friend??*"
//   7.0–15.0   "Scorpio | *rehearses.*"  Three openers at the mirror: intense ("we need to talk. *intensely.*"), casual ("so,
//              like, whatever… are we a *thing?*"), a slideshow ("slide one: *us.*"). Pisces holds a tiny WHO'S THAT? card,
//              crying.  (the ghost, 11.0)
//  15.0        card cut.
//  15.1–25.8   "One card. | *One* question."  THE STARS slide in a talk card: "What are we?"  THE STARS: "or skip the rehearsal.
//              *ask together.*"  TAURUS: "i don't want to say 'a friend' at *dinner.*"  SCORPIO: "then say *mine.* if you
//              want to."  TAURUS: "i *want* to."
//  26.0        ★ LESSON UNLOCKED "Clarity is a *gift* | you can give early."  chip "+1 answer ready for dinner"
//  31.0–40.1   Side by side on the couch with the card; the calendar page shows a heart; Pisces's card flips to ♡.
//              Last line: "Ask before your | *family* does."
import { makeEp, star, room, couch, mug, note, bubble, hearts, sparkles, shadow, R, box, glow, drawBits, HEART, label,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, INTER, MONO, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', SCO = '♏︎ SCORPIO', TAU = '♉︎ TAURUS', SC = '#ff8fa8', TC = '#ffd27a'
const L1 = [
  { t: 1.1, speaker: TAU, color: TC, text: "family will ask *'who's that?'*" },
  { t: 4.0, speaker: TAU, color: TC, text: "and i'll say… *a friend??*" },
]
const L2 = [
  { t: 7.4, speaker: SCO, color: SC, text: 'we need to talk. *intensely.*' },
  { t: 9.9, speaker: SCO, color: SC, text: 'so, like, whatever… are we a *thing?*' },
  { t: 12.5, speaker: SCO, color: SC, text: 'slide one: *us.*' },
]
const L3 = [
  { t: 15.5, speaker: SP, text: 'or skip the rehearsal. *ask together.*' },
  { t: 18.0, speaker: TAU, color: TC, text: "i don't want to say 'a friend' at *dinner.*" },
  { t: 20.8, speaker: SCO, color: SC, text: 'then say *mine.* if you want to.' },
  { t: 23.4, speaker: TAU, color: TC, text: 'i *want* to.' },
]
const T = { b2: 7.0, slide: 12.3, cut: 15.0, b3: 15.1, card: 15.3, turn: 17.8, yes: 23.4, lesson: 26.0, lessonOut: [30.6, 30.8], fin: 31.0 }
const TAU_HOPS = [0.0, 0.6, 1.2, 1.8, 2.4, 3.0, 4.1, 4.6, ...talkHops(L3, TAU, { cps: 30 }), T.yes + 0.6, 32.0, 34.4, 36.8]
const SCO_HOPS = [...talkHops(L2, SCO, { cps: 30 }), T.turn, ...talkHops(L3, SCO, { cps: 30 }), T.yes + 0.7, 32.1, 34.5, 36.9]

function calendar(x, t, cx, cy, fin) {
  box(x, cx - 110, cy - 130, 220, 260, BONE, { b: 6 })
  R(x, RED, cx - 110, cy - 130, 220, 60)
  for (let i = 0; i < 5; i++) R(x, INK, cx - 90 + i * 44, cy - 146, 10, 30)
  x.font = `800 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOLIDAYS IN', cx, cy - 100)
  if (fin > 0.5) drawBits(x, HEART, { H: '#ff5c8a' }, cx, cy + 40, 16)
  else {
    // the page flips every 0.9 s until the talk (the numbers count down, no dates)
    const n = Math.max(1, 9 - Math.floor((Math.min(t, T.b3) + 0.85) / 1.7))
    x.font = `800 110px ${INTER}`; x.fillStyle = INK; x.fillText(String(n), cx, cy + 30)
    x.font = `700 20px ${MONO}`; x.fillText('DAYS', cx, cy + 105)
    const ph = ((Math.min(t, T.b3) + 0.85) / 1.7) % 1
    if (t < T.b3 && ph < 0.25) { const p = ph / 0.25; x.save(); x.translate(cx, cy - 70); x.scale(1, 1 - p); R(x, '#e2d6c0', -110, 0, 220, 200); x.restore() }
  }
}
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  box(x, cx - 140, cy - 230, 280, 460, '#c99a4a', { b: 8 })
  const g = x.createLinearGradient(cx - 130, cy - 220, cx + 130, cy + 220); g.addColorStop(0, '#9fc4ec'); g.addColorStop(1, '#5a7ab8')
  x.fillStyle = g; x.fillRect(cx - 126, cy - 216, 252, 432)
  for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.35)', cx - 100 + i * 30, cy - 180 + i * 40, 14, 90)
  x.restore()
}
function projector(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -6, 60, 12, 160)
  box(x, -150, -110, 300, 180, BONE, { b: 6 })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('SLIDE 1: US', 0, -66)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5c8a' }, -60, 10, 9)
  R(x, '#e23d66', 10, -16, 90, 16); R(x, '#e9b24a', 10, 8, 70, 16); R(x, '#5a5470', 10, 32, 50, 16)
  x.restore()
}

function scene(x, t, K) {
  const ok = K.ok
  room(x, { wall: '#291d46', wall2: '#312354', floorY: 1290, floor: '#382a36' })
  glow(x, 540, 1000, 640, 0.6, '255,190,210')
  const fin = ease.inOutCubic(prog(t, T.fin - 0.2, T.fin + 0.6))
  calendar(x, t, 250, 640, fin)
  // the mirror (Scorpio's rehearsal), gone once they talk face to face
  mirror(x, t, 860, 960, outK(t, [T.b3 - 0.2, T.b3 + 0.3]))
  projector(x, t, 640, 760, pop01(t, T.slide, 0.35, 2.2) * outK(t, [T.b3 - 0.2, T.b3]))
  if (fin > 0.01) { x.save(); x.globalAlpha *= fin; couch(x, 540, 1290, 640, '#5a2a6a'); x.restore() }
  // Pisces, holding its tiny card
  box(x, 830, 700, 230, 18, '#8a5a36', { b: 5 })
  const pis = { x: 960, y: 610, s: 150, mood: t > T.yes ? 'heart' : 'wide', look: [-1, -0.3], tears: t > T.yes ? 3 : 2, seed: 6, pop: ok, hops: [T.yes + 0.1, 33.0] }
  const PF = star(x, t, 'pisces', pis)
  if (PF) note(x, 880, PF.cy + 40, 120, 64, t > T.yes ? '♡' : "WHO'S\nTHAT?", { size: t > T.yes ? 40 : 20, rot: -0.12, col: BONE, ink: RED })
  // Taurus paces (cold open), then turns to Scorpio
  const pace = t < T.b2 ? 300 + 90 * Math.sin(t * 1.9) : 300
  const tx = lerp(pace, 420, fin), sx = lerp(760, 660, fin)
  shadow(x, tx, 1290, 250 * ok); shadow(x, sx, 1290, 250 * ok)
  const tauMood = t < T.b2 ? 'wide' : t < T.b3 ? 'squint' : t < T.yes ? 'neutral' : 'heart'
  star(x, t, 'taurus', { x: tx, y: 1140, s: 260, mood: tauMood, look: t < T.b3 ? [Math.cos(t * 1.9) > 0 ? 1 : -1, 0] : [1, 0], hops: TAU_HOPS, blush: t > 20.8 ? 1 : 0, pop: ok, seed: 9 })
  const scoMood = t < T.b2 ? 'squint' : t < 9.9 ? 'squint' : t < 12.5 ? 'wink' : t < T.b3 ? 'sparkle' : t < 20.8 ? 'neutral' : 'happy'
  star(x, t, 'scorpio', { x: sx, y: 1140, s: 260, mood: scoMood, look: t < T.turn ? [1, 0] : [-1, 0], hops: SCO_HOPS, blush: t > T.yes ? 1 : 0, pop: ok, seed: 12 })
  // the talk card THE STARS slide in (a pixel talk card with the question)
  const ck = pop01(t, T.card, 0.4, 2.2) * outK(t, [T.lesson - 0.2, T.lesson]) + (t > T.fin ? pop01(t, T.fin + 0.2, 0.4, 2) * ok : 0)
  if (ck > 0.01) {
    const cy = t < T.fin ? 860 : 780
    x.save(); x.translate(540, cy); x.scale(ck * (t < T.fin ? 1 : 0.8), ck * (t < T.fin ? 1 : 0.8))
    box(x, -110, -150, 220, 300, '#2a1f55', { b: 7 }); R(x, GOLD, -100, -140, 200, 6); R(x, GOLD, -100, 134, 200, 6)
    x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -106)
    x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.fillText('What', 0, -24); x.fillText('are we?', 0, 26)
    drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.GGG.', '..G..'], { G: GOLD }, 0, 96, 6)
    x.restore()
  }
  // THE STARS
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.lesson - 0.2, T.lesson])
  if (stk > 0.01) star(x, t, 'stars', { x: 540, y: 560, s: 150, pop: stk, mood: t > T.yes ? 'sparkle' : 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  sparkles(x, t, 540, 860, T.card + 0.2, 10, 180, 1, [GOLD, BONE, SC])
  hearts(x, t, T.yes + 0.6, 540, 900, { n: 7, cell: 7 })
  hearts(x, t, T.fin + 0.5, 540, 820, { n: 6, cell: 6 })
}

const EP = makeEp({
  id: 'nc14e21', ep: 21, duration: 45, key: 'F#m',
  heads: [
    { text: 'The holidays are coming. | So is *the talk.*', at: -1.3, out: [6.8, 7.0], accentColor: SC, size: 84, accentSize: 132 },
    { text: 'Scorpio | *rehearses.*', at: T.b2 + 0.1, out: [14.8, 15.0], accentColor: SC, size: 108, accentSize: 148 },
    { text: 'One card. | *One* question.', at: T.b3 + 0.05, out: [25.7, 25.9], accentColor: GOLD, size: 104, accentSize: 140 },
    { text: 'Ask before your | *family* does.', at: T.fin + 0.2, late: 2, lateAt: 32.2, wobble: true, out: [40.0, 40.3], accentColor: TC, size: 100, accentSize: 140 },
  ],
  boxes: [
    { lines: L1, open: 0.9, close: 6.8 },
    { lines: L2, open: 7.2, close: 14.8 },
    { lines: L3, open: 15.3, close: 25.8 },
  ],
  lesson: { at: T.lesson, out: T.lessonOut, text: 'Clarity is a *gift* | you can give early.', chip: '+1 answer ready for dinner', color: TC },
  ghost: { at: 11.0, x: 730, y: 960, from: 'right', cell: 3 },
  cuts: [7.0, { t: T.cut, kind: 'flip' }, 30.9],
  snow: 0, ground: false,
  scene,
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(i * 1.7 + 0.87), 0.03]).filter(c => c[1] > 0.1 && c[1] < T.b3),
    ['pop', 7.5, 1318.51, 0.04, 0.3], ['pop', 10.0, 987.77, 0.035, 0.3], ['pop', T.slide, 1567.98, 0.045, 0.2], ['glitter', T.slide, T.slide + 0.4],
    ['whoosh', T.b3, 0.4, 0.04], ['whoosh', T.card, 0.4, 0.04], ['pluck', T.card + 0.4, 1174.66, 0.04, 0.6, 0],
    ['whoosh', T.turn, 0.25, 0.02], ['pop', T.yes + 0.6, 1318.51, 0.05, 0], ['pluck', T.yes + 0.6, 1567.98, 0.04, 0.6, 0], ['glitter', T.yes + 0.6, T.yes + 1.2],
    ['whoosh', T.fin, 0.4, 0.035], ['pop', T.fin + 0.3, 1174.66, 0.04, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [mug, bubble, label, SNOW, ICE, PINK, MINT, clamp]
