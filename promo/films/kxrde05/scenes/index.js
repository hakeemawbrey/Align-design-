// kxrde05: RATE MY DATE IDEA: EXTENDED, "Aquarius plans a laundromat date" (75 s vertical, star_talk post, lofi · Db).
// The format lives in ../../kxrde01/rdkit.js. No end card, no card transition: hard cut on the last line.
// ♒ Aquarius's idea: laundry night, together, at the laundromat, with talk cards while it spins. ♉ Taurus comes along.
// The talk cards are a real app feature, shown only as an object (no brand, no pitch).
//   0.0–3.0    HOOK: a dryer door bursts open, socks raining, Aquarius mid-flight, Taurus mid-dodge.
//   3–13 THE PLAN · 13–23 WASH (card one: "what small thing makes your day?") · 23–33 RINSE (the answers get real) ·
//   33–43 BUT… (the red jumper: everything is pink; record scratch) · 43–53 THE SAVE (Taurus loves pink, actually) ·
//   53–63 THE MOMENT (folding together) · 63–75 RATING 8/10 *everything's pink now* · Pisces 10/10 · THE STARS ·
//   one more pink sock · "Small plans make | *big* talks."
import { makeRD, R, box, shadow, glow, hearts, sparkles, floor, scrawl, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, INTER } from '../../kxrde01/rdkit.js'

const GROUND = 1300
let PINKED = false
function machines(x, t, { pink = false, spin = 1 } = {}) {
  R(x, '#2e4a5a', 0, 300, 1080, 1000); R(x, '#23394a', 0, 300, 1080, 60)
  for (let i = 0; i < 4; i++) { const mx = 40 + i * 260
    box(x, mx, 560, 220, 300, '#e8eef4', { b: 7 }); R(x, '#c9d4de', mx, 560, 220, 40); R(x, '#7fd0ff', mx + 170, 572, 20, 14)
    x.fillStyle = INK; x.beginPath(); x.arc(mx + 110, 730, 82, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#1a2a56'; x.beginPath(); x.arc(mx + 110, 730, 72, 0, Math.PI * 2); x.fill()
    x.save(); x.beginPath(); x.arc(mx + 110, 730, 70, 0, Math.PI * 2); x.clip()
    for (let k = 0; k < 5; k++) { const a = t * 5 * spin + k * 1.3 + i, cx = mx + 110 + Math.cos(a) * 34, cy = 740 + Math.sin(a) * 34
      R(x, pink && i < 2 ? PINK : ['#efe6d6', '#7fd0ff', '#f2c75c', '#ffffff'][(k + i) % 4], cx - 20, cy - 14, 40, 28) }
    x.restore()
    R(x, 'rgba(255,255,255,0.25)', mx + 64, 680, 14, 30) }
  floor(x, 1000, '#d9d4c8', '#c9c2b4'); for (let i = 0; i < 10; i++) R(x, (i % 2) ? '#c9c2b4' : '#e4dfd3', i * 108, 1000, 108, 900)
  box(x, 120, 1150, 840, 50, '#8a5a3a', { b: 6 })               // the folding bench
}
function sock(x, cx, cy, rot, col = BONE) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -14, -34, 28, 60); R(x, INK, -14, 14, 46, 24); R(x, col, -10, -30, 20, 52); R(x, col, -10, 18, 38, 16); R(x, '#c9bba4', -10, -30, 20, 8); x.restore() }
/** a talk card: face-down (back with a small star), flipping to the question */
function talkCard(x, t, cx, cy, flipAt, q, s = 1) {
  const f = ease.inOutCubic(prog(t, flipAt, flipAt + 0.5)), w = Math.abs(Math.cos(Math.PI * f))
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(s * Math.max(0.04, w), s)
  if (f < 0.5) { box(x, -150, -200, 300, 400, '#2b2160', { b: 7 }); R(x, GOLD, -120, -170, 240, 6); R(x, GOLD, -120, 164, 240, 6); x.fillStyle = GOLD; x.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 22 : 54; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill() }
  else {
    box(x, -150, -200, 300, 400, BONE, { b: 7 }); R(x, '#2b2160', -150, -200, 300, 50)
    x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -175)
    x.font = `800 36px ${INTER}`; x.fillStyle = INK
    q.split('\n').forEach((ln, i, a) => x.fillText(ln, 0, (i - (a.length - 1) / 2) * 46 + 20))
  }
  x.restore()
}
void PINKED

const EP = makeRD({
  id: 'kxrde05', sign: 'aquarius', date: 'taurus', accent: GOLD, deep: '#c0282e',
  idea: 'Laundry night. *At the laundromat.*',
  hook(x, t, S) {
    machines(x, t, { spin: 3 })
    // dryer 2's door flung open, socks flying out
    x.save(); x.translate(300 + 110, 730); x.rotate(-1.2 + 0.1 * Math.sin(t * 9)); box(x, -10, -80, 20, 160, '#c9d4de', { b: 4 }); x.restore()
    for (let i = 0; i < 9; i++) { const p = ((t + 0.4) * 0.6 + i / 9) % 1, a = -2.4 + i * 0.35; sock(x, 410 + Math.cos(a) * 600 * p, 730 + Math.sin(a) * 500 * p + 600 * p * p, p * 8 + i, [BONE, PINK, '#7fd0ff', GOLD][i % 4]) }
    S.hero(x, t, { x: 560, y: 940 - 60 * Math.sin((t + 0.4) * 2), s: 250, mood: 'wide', look: [-1, -1], rot: -0.4 })
    S.date(x, t, { x: 840, y: 1100, s: 220, mood: 'wide', look: [-1, -1], squash: 0.12 })
    S.pisces(x, t, { x: 140, y: 1080, s: 130, tears: 2, mood: 'sparkle', look: [1, -1] })
  },
  chapters: [
    { title: 'THE PLAN', caption: 'One machine each. *Talk cards* while it spins.',
      draw(x, t, S) {
        machines(x, t)
        shadow(x, 330, 1110, 200); shadow(x, 720, 1110, 200)
        S.hero(x, t, { x: 330, y: 1060, s: 230, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 1.0, S.t0 + 5.0] })
        S.date(x, t, { x: 720, y: 1070, s: 210, mood: S.u > 3 && S.u < 5 ? 'squint' : 'happy', look: [-1, 0], hops: [S.t0 + 3.2] })
        if (S.u > 5) { const k = pop01(t, S.t0 + 5.0, 0.3, 2.4); x.save(); x.translate(540, 1150); x.scale(k, k); for (let i = 0; i < 4; i++) box(x, -60 + i * 4, -60 - i * 6, 120, 80, '#2b2160', { b: 5 }); x.restore() }
      },
      bubbles: [[1.0, 3.0, 'laundry night. together.', { x: 360, y: 800 }], [3.2, 5.0, 'at… the laundromat?', { x: 700, y: 820 }], [5.4, 8.0, 'with these. while it spins.', { x: 360, y: 800 }]],
      pis: { x: 940, y: 1080, s: 130 },
      cues: [['pop', 5.0, 1174.66, 0.035, 0]] },
    { title: 'WASH', caption: 'Card one: *a small thing* that makes your day.', cuts: [4.4],
      draw(x, t, S) {
        machines(x, t)
        S.hero(x, t, { x: 200, y: 1060, s: 200, mood: S.u > 4.4 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 4.6, S.t0 + 5.0] })
        S.date(x, t, { x: 880, y: 1070, s: 190, mood: 'happy', look: [-1, 0], hops: [S.t0 + 7.6] })
        talkCard(x, t, 540, 840, S.t0 + 1.2, 'What small thing\nmakes your day?', 1)
      },
      bubbles: [[4.6, 7.2, 'when the machine finishes the second i look', { x: 300, y: 1180 }], [7.6, 9.4, 'that’s so specific. i love it.', { x: 760, y: 1180 }]],
      pis: { x: 940, y: 1250, s: 120 },
      cues: [['whoosh', 1.2, 0.5, 0.03], ['pop', 1.5, 1318.51, 0.04, 0], ['glitter', 1.5, 1.9]] },
    { title: 'RINSE', caption: 'The answers *get real.*', cuts: [4.0],
      draw(x, t, S) {
        machines(x, t)
        shadow(x, 330, 1110, 200); shadow(x, 720, 1110, 200)
        S.hero(x, t, { x: 330, y: 1060, s: 230, mood: S.u > 4.0 ? 'sparkle' : 'happy', look: [1, 0], blush: S.u > 4 ? 0.8 : 0 })
        S.date(x, t, { x: 720, y: 1070, s: 210, mood: 'happy', look: S.u < 3 ? [0, 1] : [-1, 0], blush: 0.6, hops: [S.t0 + 1.0, S.t0 + 4.2] })
        talkCard(x, t, 540, 1150, -9, 'What small thing\nmakes your day?', 0.35)
        hearts(x, t, S.t0 + 6.2, 530, 860, { n: 5, rise: 200 })
      },
      bubbles: [[1.0, 3.8, 'this, honestly. quiet nights like this.', { x: 700, y: 800 }], [4.2, 6.2, 'yeah?', { x: 360, y: 800 }], [6.4, 8.8, 'yeah. you’re easy to talk to.', { x: 700, y: 800 }]],
      pis: { x: 940, y: 1250, s: 120, tears: 2 },
      cues: [['pluck', 1.0, 1174.66, 0.03, 0.6, 0.2]] },
    { title: 'BUT…', tag: 'BUT…', caption: 'The red jumper. *Everything’s pink.*', cuts: [5.0],
      draw(x, t, S) {
        machines(x, t, { pink: true })
        S.hero(x, t, { x: 260, y: 1060, s: 220, mood: 'wide', look: [1, 0] })
        const lift = ease.outBack(prog(S.u, 0.4, 1.2))
        S.date(x, t, { x: 740, y: 1070, s: 210, mood: S.u > 1 ? 'wide' : 'neutral', look: [0, -1] })
        x.save(); x.translate(740, lerp(1150, 860, lift)); box(x, -100, -70, 200, 140, PINK, { b: 6 }); R(x, PINK, -150, -70, 60, 70); R(x, PINK, 90, -70, 60, 70); R(x, INK, -150, -76, 300, 6); x.restore()
        if (S.u > 5) for (let i = 0; i < 6; i++) sock(x, 200 + i * 130, 1180, i * 0.4, PINK)
      },
      bubbles: [[5.2, 7.4, 'ah. my red jumper.', { x: 300, y: 820 }]],
      pis: { x: 940, y: 1250, s: 120, tears: 2, mood: 'wide' },
      cues: [['whoosh', 0.4, 0.6, 0.03]] },
    { title: 'THE SAVE', caption: 'Taurus *loves* pink, actually.', cuts: [4.4],
      draw(x, t, S) {
        machines(x, t, { pink: true })
        S.hero(x, t, { x: 280, y: 1060, s: 220, mood: S.u > 3 ? 'happy' : 'squint', look: [1, 0], hops: [S.t0 + 3.2] })
        S.date(x, t, { x: 720, y: 1070, s: 220, mood: S.u > 1.4 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.4, S.t0 + 1.8, S.t0 + 4.6], extra: (q) => { R(q, PINK, 8, 26, 20, 7) } })
        if (S.u > 4.4) sparkles(x, t, 720, 960, S.t0 + 4.5, 12, 160, 1, [PINK, GOLD, BONE])
      },
      bubbles: [[1.4, 3.6, 'wait. i’ve always wanted a pink shirt.', { x: 680, y: 800 }], [4.6, 6.8, 'it’s officially our colour now.', { x: 700, y: 800 }]],
      pis: { x: 940, y: 1250, s: 120, tears: 3 },
      cues: [['pop', 1.4, 880, 0.035, 0.3], ['glitter', 4.5, 5.0]] },
    { title: 'THE MOMENT', caption: 'Folding together. *The dryer hums.*', cuts: [5.0],
      draw(x, t, S) {
        machines(x, t, { pink: true, spin: 0.5 })
        S.hero(x, t, { x: 330, y: 1060, s: 220, mood: 'happy', look: [1, 1] })
        S.date(x, t, { x: 720, y: 1070, s: 210, mood: S.u > 5 ? 'heart' : 'happy', look: [-1, 1], hops: [S.t0 + 5.2] })
        // the folding pile grows on the bench
        const n = Math.min(6, Math.floor(S.u * 0.8))
        for (let i = 0; i < n; i++) box(x, 470, 1130 - i * 22, 140, 18, i % 2 ? PINK : '#ffd0e0', { b: 3 })
        hearts(x, t, S.t0 + 5.4, 540, 880, { n: 6, rise: 220 })
      },
      bubbles: [[1.2, 3.6, 'same laundry night next week?', { x: 700, y: 800 }], [5.4, 7.6, 'bring the pink socks.', { x: 360, y: 800 }]],
      pis: { x: 940, y: 1250, s: 120, tears: 3 },
      cues: [['tick', 1.0, 0.03], ['tick', 2.2, 0.03], ['tick', 3.5, 0.03], ['tick', 4.7, 0.03], ['tick', 6.0, 0.03]] },
  ],
  recs: [{ at: 36.0, len: 1.4, caption: 'the red jumper *got in.*', sub: 'everything is pink now' }],
  ratingBg(x, t) { machines(x, t, { pink: true, spin: 0.5 }) },
  epilogue(x, t) {
    if (t < 69.5) return
    const p = clamp((t - 69.5) / 0.9)
    if (p < 1) sock(x, lerp(160, 400, p), 760 - 300 * Math.sin(Math.PI * p) + 200 * p, p * 9, PINK)
  },
  finale(x, t, S) {
    shadow(x, 400, 1110, 220); shadow(x, 690, 1120, 200)
    S.hero(x, t, { x: 400, y: 1040, s: 240, mood: t > 70.4 ? 'wide' : 'happy', look: [1, 0], hops: [63.84, 70.45], extra: t > 70.4 ? (q) => { R(q, INK, 10, -1, 18, 9); R(q, PINK, 11, 0, 16, 7) } : null })
    S.date(x, t, { x: 690, y: 1050, s: 220, mood: t > 70.6 ? 'happy' : 'heart', look: [-1, 0], hops: [63.9, 70.7, 71.0], extra: (q) => { R(q, PINK, 8, 26, 20, 7) } })
  },
  score: '8/10', word: 'everything’s pink now',
  starsLine: 'small plan. *big* talk. pink socks.',
  last: 'Small plans make | *big* talks.',
  hookCues: [['boom', 0.05, 0.18], ['whoosh', 0.0, 0.8, 0.04]],
  extraCues: [['whoosh', 69.5, 0.8, 0.03], ['pop', 70.4, 659.25, 0.04, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [scrawl, glow, outK, RED, CREAM]
