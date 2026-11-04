// nmue12: THE MAKE-UP TALK, Ep 12 "Plan the next one calm." (28 s vertical, promo/films/next30/b31.md, music: cinematic · D)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
//   0.0–3.0    "How do *you* like | to make up?"  ♏ Scorpio and ♌ Leo, calm now, share a blanket on the rug, mid-hop;
//              the cracked heart from the last fight still floats between them.
//   3.0–9.6    "Last time: | *two styles.*"  A sepia flashback (LAST TIME): Scorpio goes quiet (a zipped mouth, "…"),
//              Leo goes loud ("TALK TO ME!!"); question marks pop over both. Neither knew the other's way.
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Plan it on | a *calm* day."  THE STARS: "ask it on a *calm* day." → "pick a pause word. agree how you
//              *come back.*"  A card writes itself: OUR MAKE-UP PLAN · pause word: pineapple · 20 minutes · then a walk.
//   17.2–22.4  "Practice *run.*"  LEO: "pineapple?"  SCORPIO: "*pineapple.* 20 minutes."  They step apart… and come
//              back, giggling. The heart mends, brightest yet (21.0). A talk card slides in between them.
//   22.4–25.5  "Make up *before* | the fight."
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, MONO, r3 } from '../../nmue01/scenes/mukit.js'

// a cosy blanket draped over the two (in front of their lower halves)
function blanket(x, t, cx, cy, w, k = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  const C = 14, rows = 8
  for (let j = 0; j < rows; j++) {
    const half = w / 2 - Math.max(0, 3 - j) * 10
    for (let i = -Math.floor(half / C); i < Math.floor(half / C); i++) {
      const wav = Math.round(Math.sin(i * 0.5 + t) * 2)
      x.fillStyle = j === 0 || j === rows - 1 ? INK : ((Math.floor(i / 2) + j) % 2 ? '#c94f6e' : '#e8a0b0')
      x.fillRect(cx + i * C, cy + j * C + wav, C, C)
    }
  }
  x.restore()
}
function sepia(x, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = 0.28 * a; x.fillStyle = '#c99a5a'; x.fillRect(0, 0, 1080, 1920)
  x.globalAlpha = 0.5 * a; const g = x.createRadialGradient(540, 900, 300, 540, 900, 1000); g.addColorStop(0, 'rgba(20,10,4,0)'); g.addColorStop(1, 'rgba(20,10,4,1)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue12', ep: 12, A: 'scorpio', B: 'leo', accent: '#ffb38a',
  images: { card: 'card-talk-5.png' },
  pis: { move: { x: 960, y: 1290, s: 120 } },
  heads: {
    hook: 'How do *you* like | to make up?',
    trap: 'Last time: | *two styles.*',
    move: 'Plan it on | a *calm* day.',
    try: 'Practice *run.*',
    last: 'Make up *before* | the fight.',
  },
  heart: { hook: { x: 540, y: 560, cell: 14 } },
  lines: [
    { t: 10.25, who: 'S', text: 'ask it on a *calm* day.' },
    { t: 12.3, who: 'S', text: 'pick a pause word. agree how you *come back.*' },
    { t: 17.6, who: 'B', text: 'pineapple?' },
    { t: 18.6, who: 'A', text: '*pineapple.* 20 minutes.' },
  ],
  hook(x, t, S) {
    room(x, t)
    shadow(x, 540, 1150, 520)
    S.A(x, t, { x: 420, y: 1010, s: 230, mood: 'sparkle', look: [1, -0.2], hops: [-0.12, 1.5] })
    S.B(x, t, { x: 660, y: 1010, s: 230, mood: 'happy', look: [-1, -0.2], hops: [-0.05, 2.1] })
    blanket(x, t, 540, 1050, 520)
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    shadow(x, 260, 1150, 220); shadow(x, 820, 1150, 220)
    S.A(x, t, { x: 260, y: 1020, s: 240, mood: 'squint', look: [-1, 0.5], hops: [S.t0 + 0.4] })
    S.B(x, t, { x: 820, y: 1020, s: 240, mood: 'wide', look: [-1, 0], hops: [S.t0 + 0.8, S.t0 + 1.6, S.t0 + 2.4, S.t0 + 3.2], squash: 0.04 * Math.sin(t * 18) })
    // Scorpio's zipped mouth
    const zk = pop01(t, S.t0 + 0.6, 0.25, 2.6)
    if (zk > 0.01) { x.save(); x.translate(260, 1045); x.scale(zk, zk); R(x, INK, -44, -8, 88, 16); for (let i = 0; i < 7; i++) R(x, '#d8dce8', -38 + i * 12, -5, 6, 10); R(x, '#f2c75c', 36, -12, 14, 24); x.restore() }
    bubble(x, t, 280, 820, S.t0 + 1.2, S.t1 - 0.1, '…', { size: 44 })
    bubble(x, t, 790, 800, S.t0 + 0.8, S.t1 - 0.1, 'TALK TO ME!!', { size: 40, tail: 0.2, col: '#ffe1a6' })
    sepia(x, outK(t, [S.t1 - 0.25, S.t1]) * clamp(prog(t, S.t0, S.t0 + 0.2)))
    if (u > 3.2) { label(x, '?', 260, 700 - 6 * Math.sin(t * 5), { size: 90, col: '#ffe27a', font: INTER, weight: 800 }); label(x, '?', 820, 650 - 6 * Math.sin(t * 5 + 1), { size: 90, col: '#ffe27a', font: INTER, weight: 800 }) }
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    const nk = easeOutBack(prog(t, 12.4, 12.8), 1.6) * ok
    if (nk > 0.01) {
      note(x, 540, 800, 620, 420, [''], { k: nk, rot: -0.02, col: '#fff6e4' })
      x.save(); x.translate(540, 800); x.scale(nk, nk); x.rotate(-0.02)
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `800 40px ${INTER}`; x.fillStyle = '#c4544a'; x.fillText('OUR MAKE-UP PLAN', 0, -140)
      R(x, '#e8c9b0', -240, -110, 480, 4)
      const rows = [['pause word:', 'pineapple', 13.4], ['', '20 minutes', 14.2], ['then:', 'a walk', 15.0]]
      rows.forEach(([a, b, at], i) => {
        const w = clamp(prog(t, at, at + 0.4))
        if (w <= 0) return
        x.globalAlpha = w
        x.font = `700 34px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'
        x.fillText(`${i + 1}. ${a}`, -240, -50 + i * 80)
        x.font = `italic 600 46px 'EB Garamond', Georgia, serif`; x.fillStyle = '#2f6b8f'; x.textAlign = 'right'; x.fillText(b, 240, -50 + i * 80)
        x.globalAlpha = 1
      })
      x.restore()
      for (const at of [13.4, 14.2, 15.0]) sparkles(x, t, 760, 750 + (at - 13.4) * 100, at + 0.4, 6, 60, 1, [GOLD, BONE])
    }
    S.A(x, t, { x: 360, y: 1210, s: 150, pop: k, mood: u > 4 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 780, y: 1210, s: 150, pop: k, mood: u > 4 ? 'happy' : 'neutral', look: [-1, -1], talk: false })
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const apart = ease.inOutCubic(prog(t, 19.3, 19.8)) * (1 - ease.inOutCubic(prog(t, 20.2, 20.7)))
    const ax = lerp(400, 170, apart), bx = lerp(680, 910, apart)
    shadow(x, ax, 1140, 210 * ok); shadow(x, bx, 1140, 210 * ok)
    const back = t > 20.6
    S.A(x, t, { x: ax, y: 1020, s: 220, pop: ok, mood: back ? 'happy' : 'neutral', look: [1, 0], hops: [19.3, 20.2, 20.75, T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: bx, y: 1020, s: 220, pop: ok, mood: back ? 'happy' : 'sparkle', look: [-1, 0], hops: [17.65, 19.35, 20.25, 20.8, T.mend + 0.12, T.h4Land + 0.15] })
    if (apart > 0.9) label(x, '20:00', 540, 980, { size: 40, col: '#9fe6b0', font: MONO })
    if (back && t < 21.4) label(x, 'hee hee', 540, 900, { size: 34, col: '#ffe27a', font: INTER, weight: 800, alpha: outK(t, [21.1, 21.4]) })
    // the talk card slides in between them (a light tie-in)
    const img = S.img.card
    const ck = easeOutBack(prog(t, 21.5, 21.9), 1.5) * ok
    if (img && ck > 0.01) {
      const w = 150, h = w * img.height / img.width
      x.save(); x.translate(lerp(1300, 540, ck), 1080); x.rotate(lerp(0.8, -0.05, ck))
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
      x.drawImage(img, -w / 2, -h / 2, w, h)
      x.restore()
    }
  },
  top(tx, t) {
    // the LAST TIME stamp over the sepia flashback
    if (t < T.trap[0] || t > T.trap[1]) return
    const k = pop01(t, T.trap[0] + 0.2, 0.3, 2.6) * outK(t, [T.trap[1] - 0.25, T.trap[1]])
    if (k > 0.01) { tx.save(); tx.translate(540, 560); tx.rotate(-0.08); tx.scale(k, k); tx.strokeStyle = '#ffe1a6'; tx.lineWidth = 8; tx.strokeRect(-150, -44, 300, 88); tx.font = `800 52px ${INTER}`; tx.textAlign = 'center'; tx.textBaseline = 'middle'; tx.fillStyle = '#ffe1a6'; tx.fillText('LAST TIME', 0, 4); tx.restore() }
  },
  cues: [
    ['whoosh', 3.05, 0.5, 0.04], ['tom', 3.2, 90, { gain: 0.2, decay: 0.3 }], ['tick', 3.6, 0.05], ['pluck', 3.6, 1567.98, 0.025, 0.5, -0.3],
    ['pop', 3.8, 1174.66, 0.04, 0.3], ['pop', 4.2, 659.25, 0.035, -0.3], ['pop', 6.2, 880, 0.04, -0.3], ['pop', 6.25, 880, 0.04, 0.3],
    ['whoosh', 12.4, 0.4, 0.035], ['pop', 12.7, 987.77, 0.04, 0], ...[13.4, 14.2, 15.0].flatMap(a => [['tick', a, 0.03], ['pop', r3(a + 0.4), 1174.66, 0.03, 0.2]]),
    ['whoosh', 19.3, 0.4, 0.03], ['bell', 19.9, 1760, 0.02, 0.8, 0], ['whoosh', 20.2, 0.4, 0.03], ['pop', 20.75, 987.77, 0.035, -0.2], ['pop', 20.85, 1174.66, 0.035, 0.2],
    ['whoosh', 21.5, 0.4, 0.035], ['pluck', 21.9, 1318.51, 0.035, 0.6, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, GOLD]
