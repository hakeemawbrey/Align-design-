// nc14e11: CUFFING SEASON, "Capricorn schedules a feelings meeting" (45 s vertical, Season 14 ep 11, music: chiptune · G).
// Story 0–40.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–8.6    "Capricorn scheduled | a *feelings meeting.*"  Frame 0: Capricorn at its desk, mid-click on a calendar invite:
//              FEELINGS · 15 MIN · AGENDA ATTACHED, to ♉ TAURUS. SEND. Taurus's phone buzzes: MEETING INVITE. Taurus:
//              "…accept?"
//   8.6–17.4   "The | *agenda.*"  A meeting room, a slide screen. 1. I like you · 2. Winter is long · 3. Proposal: cocoa
//              Thursdays. Taurus is touched. Slide 4 is blank: Capricorn freezes. Crickets. Pisces cries in the back row.
//  17.4        card cut.
//  17.4–26.6   "Slide four, | *no slides.*"  THE STARS: "the agenda is *cute*." → "now say slide four *without slides*."
//              The screen clicks off. CAPRICORN: "I get nervous. I like you *a lot*."  Taurus: "meeting accepted."
//  26.6–31.9   ★ LESSON UNLOCKED "Plans are love too. | So is *saying it.*"  chip "+1 AGENDA ITEM: FEELINGS"
//  31.9–40.6   "Any other | *business?*"  A talk card on the meeting table ("Cook at home or try somewhere new?"); the two
//              lean in. THE STARS: "Any other business? *Just you.*"
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, phone, talkCard, mug,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [8.4, 8.6], lines: [-0.6, -0.2, 0.9, 1.5], send: 3.3, buzz: 4.4, accept: 5.4,
  b2: 8.6, h1: 8.75, h1Out: [17.2, 17.4], slides: [9.2, 11.0, 12.8, 14.6], freeze: 14.7,
  cut: 17.4, h2: 17.55, h2Out: [26.4, 26.6], off: 21.9, accepted: 24.4,
  lesson: 26.7, lessonOut: [31.6, 31.9],
  b4: 31.9, h3: 32.05, card: [32.3, 32.9], last: 33.2,
}
const SP = 'THE STARS', CP = '♑︎ CAPRICORN'
const B2 = [
  { t: 17.8, speaker: SP, text: 'the agenda is *cute*.' },
  { t: 19.4, speaker: SP, text: 'now say slide four *without slides*.' },
  { t: 22.3, speaker: CP, color: '#7fe8c4', text: 'I get nervous. I like you *a lot*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'Any other business? *Just you.*' }]
const CAP = signStar('capricorn'), TAU = signStar('taurus')
const SLIDES = ['1. I like you', '2. Winter is long', '3. Proposal:|cocoa Thursdays', '4.']

function office(x) {
  R(x, '#1f2340', 0, 520, 1080, 900)
  for (let i = 0; i < 6; i++) R(x, '#252a4c', 0, 560 + i * 140, 1080, 4)
  R(x, '#2b2b3e', 0, 1400, 1080, 520); R(x, '#3a3a52', 0, 1400, 1080, 12)
}
function invite(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -300, -170, 600, 340, BONE, { b: 8 })
  R(x, CAP.color, -300, -170, 600, 56); label(x, 'NEW MEETING', -150, -142, { size: 28, col: INK, font: 'Inter, sans-serif', weight: 800 })
  const L = [['TITLE', 'FEELINGS'], ['LENGTH', '15 MIN'], ['TO', '♉︎ TAURUS'], ['NOTES', 'agenda attached']]
  L.forEach(([k, v], i) => { const a = clamp(prog(t, T.lines[i], T.lines[i] + 0.15)); label(x, k, -270, -80 + i * 52, { size: 22, col: '#7a7490', align: 'left', alpha: a }); label(x, v, -110, -80 + i * 52, { size: 30, col: INK, align: 'left', font: 'Inter, sans-serif', weight: 800, alpha: a }) })
  const pressed = t > T.send && t < T.send + 0.15
  box(x, 140, 110, 130, 46, pressed ? '#1f8f6e' : CAP.color, { b: 5 }); label(x, 'SEND', 205, 134, { size: 26, col: INK, font: 'Inter, sans-serif', weight: 800 })
  x.restore()
}
function screen(x, t, on) {
  box(x, 180, 560, 720, 440, '#14102a', { b: 10 }); R(x, INK, 530, 1000, 20, 80)
  if (!on) return
  R(x, '#f4f0e6', 196, 576, 688, 408)
  const i = T.slides.filter(s => t > s).length - 1
  if (i < 0) return
  const k = easeOutBack(prog(t, T.slides[i], T.slides[i] + 0.3), 1.6)
  x.save(); x.translate(540, 780); x.scale(k, k)
  SLIDES[i].split('|').forEach((ln, j) => label(x, ln, 0, -20 + j * 66 - (SLIDES[i].includes('|') ? 30 : 0), { size: 58, col: INK, font: 'Inter, sans-serif', weight: 800 }))
  if (i === 0) { R(x, '#ff4f86', -40, 70, 80, 14) }
  if (i === 3) { R(x, INK, -20, 0, 260, 8); label(x, '(blank)', 0, 110, { size: 28, col: '#9a94b0' }) }
  x.restore()
  label(x, `${i + 1}/4`, 840, 960, { size: 22, col: '#9a94b0' })
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  office(x)
  if (t < T.b2) {
    const ok1 = outK(t, [T.b2 - 0.15, T.b2])
    invite(x, t, 410, 820, 0.95 * ok1)
    // the cursor clicks SEND
    const cp = ease.inOutCubic(prog(t, T.lines[3] + 0.3, T.send))
    const cx = lerp(500, 605, cp), cy = lerp(800, 945, cp)
    if (t < T.send + 0.4) { x.save(); x.translate(cx, cy); x.fillStyle = INK; x.beginPath(); x.moveTo(-4, -4); x.lineTo(40, 30); x.lineTo(14, 32); x.lineTo(0, 54); x.closePath(); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(2, 4); x.lineTo(30, 26); x.lineTo(10, 27); x.lineTo(2, 42); x.closePath(); x.fill(); x.restore() }
    if (t > T.send) { const p = ease.inCubic(prog(t, T.send + 0.1, T.send + 0.6)); if (p < 1) { x.save(); x.translate(lerp(600, 1100, p), lerp(950, 700, p)); x.rotate(p); box(x, -30, -20, 60, 40, BONE, { b: 4 }); x.restore() } }
    box(x, 120, 1300, 620, 30, '#a07850', { b: 6 })
    K.star(x, t, 'capricorn', { x: 330, y: 1190, s: 230, pop: ok1, mood: t < T.send ? 'neutral' : 'squint', look: [1, -0.6], hops: [-0.1, ...T.lines, T.send], seed: 11, scarf: '#5a5470' })
    // Taurus gets the invite
    const tk = pop01(t, T.buzz - 0.5, 0.3, 2) * ok1
    K.star(x, t, 'taurus', { x: 880, y: 1250, s: 220, pop: tk, mood: t > T.buzz ? 'wide' : 'happy', look: [0, -1], hops: [T.buzz, T.accept], seed: 5, scarf: '#7a4a2e' })
    if (t > T.buzz) { phone(x, t + 4 * Math.sin(t * 60) * 0, 880 + (t < T.buzz + 0.6 ? 4 * Math.sin(t * 70) : 0), 860, 220, 270, { title: 'INVITE', size: 24, msgs: [{ at: T.buzz, side: 'L', text: 'MEETING: FEELINGS', col: '#3a2f66' }] }) }
    bubble(x, t, 860, 820, T.accept, T.b2 - 0.1, '…accept?', { size: 34 })
    K.pisces(x, t, { x: 150, y: 1610, s: 130, pop: pop01(t, 2.4, 0.3, 2) * ok1, scarf: ICE }, 1, 'wide', [1, -0.6])
    return
  }
  const on = !(t > T.off)
  screen(x, t, on)
  if (t > T.off && t < T.off + 0.15) R(x, BONE, 196, 776, 688, 8)
  // the table + chairs
  box(x, 120, 1300, 840, 40, '#7b5634', { b: 7, hi: '#98704a' }); R(x, INK, 200, 1340, 24, 200); R(x, INK, 856, 1340, 24, 200)
  const frz = t > T.freeze && t < T.cut + 0.3
  const capMood = t < T.slides[0] ? 'neutral' : frz ? 'wide' : t < T.off ? 'neutral' : t < 22.3 ? 'squint' : 'happy'
  const capHops = [...T.slides.slice(0, 3).map(s => s - 0.05), ...K.hopsFor(CP), T.accepted + 0.3]
  if (t < T.lesson || t > T.lessonOut[0]) {
    K.star(x, t, 'capricorn', { x: 300, y: 1180, s: 230, pop: ok, mood: t > T.b4 ? 'sparkle' : capMood, look: frz ? [0, 0] : [1, -0.3], blink: frz ? false : undefined, squash: frz ? 0.06 : 0, hops: capHops, seed: 11, scarf: '#5a5470' })
    K.star(x, t, 'taurus', { x: 780, y: 1190, s: 220, pop: ok, mood: t > T.accepted ? 'heart' : t > T.slides[0] + 0.3 ? 'sparkle' : 'neutral', look: [-1, -0.3], hops: [T.slides[0] + 0.3, T.slides[2] + 0.3, T.accepted, T.accepted + 0.4], seed: 5, scarf: '#7a4a2e' })
  }
  if (frz) for (let i = 0; i < 2; i++) label(x, '*chirp*', [180, 900][i], [1060, 1100][i] - 8 * Math.sin(t * 9 + i), { size: 28, col: MINT, alpha: clamp(prog(t, T.freeze + 0.6 + i * 0.4, T.freeze + 0.8 + i * 0.4)) })
  bubble(x, t, 780, 950, T.accepted, T.lesson - 0.1, 'meeting accepted.', { size: 34, col: '#fff0c8' })
  hearts(x, t, T.accepted + 0.1, 780, 1060, { n: 6 })
  if (t > T.cut && t < T.lesson) K.stars(x, t, { x: 540, y: 1110, s: 150, pop: pop01(t, T.cut + 0.15, 0.4, 2) * outK(t, [T.lesson - 0.2, T.lesson]), mood: t > T.accepted ? 'happy' : 'neutral', look: [0, 0], hops: K.hopsFor(SP) })
  // Pisces cries in the back row
  if (t < T.b4) K.pisces(x, t, { x: 960, y: 1640, s: 130, pop: pop01(t, T.b2 + 0.4, 0.3, 2) * (t > T.cut && t < T.lesson ? 0 : 1), scarf: ICE }, t > T.slides[2] ? 3 : 2, 'sparkle', [-1, -0.6])
  if (t > T.cut && t < T.lesson) K.pisces(x, t, { x: 980, y: 1080, s: 120, scarf: ICE }, 3, 'sparkle', [-1, 0.4])
  // the talk card on the table
  if (t > T.b4) {
    const c = ease.outCubic(prog(t, ...T.card))
    talkCard(x, K.img.talk, 540, lerp(500, 1150, c), 220 * ok, lerp(0.6, -0.04, c))
    sparkles(x, t, 540, 1150, T.card[1], 10, 160, 2)
    mug(x, t, 420, 1280, 0.55, { col: CAP.color }); mug(x, t, 660, 1280, 0.55, { col: TAU.color })
    K.pisces(x, t, { x: 960, y: 900, s: 130, pop: pop01(t, T.b4 + 0.5, 0.3, 2) * ok, scarf: ICE }, 3, 'sparkle', [-1, 0.4])
  }
}

const EP = makeCuff({
  id: 'nc14e11', duration: 45, ep: 11,
  images: { talk: 'card-talk-4.png' },
  heads: [
    { text: 'Capricorn scheduled | a *feelings meeting.*', at: -1.2, out: T.h0Out, size: 88, accent: '#7fe8c4' },
    { text: 'The | *agenda.*', at: T.h1, out: T.h1Out, size: 108, accent: GOLD },
    { text: 'Slide four, | *no slides.*', at: T.h2, out: T.h2Out, size: 100, accent: PINK },
    { text: 'Any other | *business?*', at: T.h3, out: [40.0, 40.3], size: 104, accent: '#7fe8c4' },
  ],
  boxes: [
    { lines: B2, open: 17.6, close: 26.2, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 39.9, y: 1540 },
  ],
  lesson: { at: T.lesson, out: T.lessonOut, text: 'Plans are love too. | So is *saying it.*', chip: '+1 AGENDA ITEM: FEELINGS', accentColor: '#7fe8c4' },
  snow: 0.2,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2],
  ghost: { x: 900, y: 560, at: 13.6, from: 'above', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ...T.lines.filter(c => c > 0).map((c, i) => ['tick', c, 0.04]), ...Array.from({ length: 10 }, (_, i) => ['tick', +(0.3 + i * 0.2).toFixed(3), 0.015]),
    ['tick', T.send, 0.08], ['pop', T.send + 0.02, 1318.51, 0.045, 0], ['whoosh', T.send + 0.1, 0.5, 0.04],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.buzz + i * 0.1).toFixed(3), 0.03]), ['pop', T.accept, 739.99, 0.035, 0.4],
    ...T.slides.map((s, i) => ['pop', s, [880, 987.77, 1174.66, 587.33][i], 0.045, 0]), ['tick', T.slides[3] - 0.05, 0.05],
    ['pluck', T.freeze + 0.6, 2637, 0.012, 0.1, -0.4], ['pluck', T.freeze + 0.7, 2637, 0.012, 0.1, -0.4], ['pluck', T.freeze + 1.0, 2637, 0.012, 0.1, 0.4], ['pluck', T.freeze + 1.1, 2637, 0.012, 0.1, 0.4],
    ['tick', T.off, 0.08], ['whoosh', T.off, 0.3, 0.03],
    ['pluck', T.accepted, 1174.66, 0.045, 0.5, 0.3], ['pluck', T.accepted + 0.12, 1567.98, 0.04, 0.5, 0.3], ['glitter', T.accepted, T.accepted + 0.4],
    ['whoosh', T.card[0], 0.4, 0.035], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0], ['glitter', T.card[1], T.card[1] + 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, glow, RED]
