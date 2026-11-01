// trwrongdeal: WRONG ANSWERS ONLY, "Name a dealbreaker." (20 s vertical, Star Talk Trends §17, music: chiptune · D).
// Story 0–15.6, then the shared end card. The format look lives in ./wrongkit.js (identical in all five).
//   0.0–2.3    hook: the question card "Name a | *dealbreaker.*" pops, the tape slaps on, ♌ ♍ ♎ hop.
//   2.3–5.0    ♌ LEO "They’ve never *heard of me.*"  Leo glows under a spotlight; the date: "…who?"; Leo faints flat.
//   5.0–7.7    ♍ VIRGO "They fold towels | *in thirds.*"  The date folds a towel: once, twice, THRICE. A red alarm
//              light spins; Virgo: "I need a minute."
//   7.7        card cut.
//   7.7–10.6   ♎ LIBRA (the unhinged third) "Hmm. Can I get | *back to you?*"  Libra holds a balance: LOUD CHEWING vs
//              LATE REPLIES, tipping faster and faster; calendar pages fly off: "3 WEEKS LATER". Still deciding.
//   10.6       the turn: THE STARS: "ahem. the real one?"
//   11.75      THE STARS: "*Unkindness.* That’s it."  13.0 RIGHT ANSWER stamp. In the middle: a DEALBREAKERS card;
//              "towels in thirds" and "never heard of me" get crossed off (12.3, 12.62), "unkindness" stays and glows.
import { makeWrong, drawStarChar, R, box, bubble, label, shadow, sparkles, hearts, drawBits, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, RED, INTER, MONO, PAPER, T } from './wrongkit.js'

const mate = (SIGN, seed) => (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed, glow: 1, ...o })
const sag = mate(signStar('sagittarius'), 11), aqua = mate(signStar('aquarius'), 13)

function spot(x, cx, by, w, a) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, 380, 0, by); g.addColorStop(0, `rgba(255,236,180,${0.05 * a})`); g.addColorStop(1, `rgba(255,236,180,${0.28 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 30, 380); x.lineTo(cx + 30, 380); x.lineTo(cx + w / 2, by); x.lineTo(cx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(255,236,180,${0.3 * a})`; x.beginPath(); x.ellipse(cx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill(); x.restore()
}

// ── ANSWER 1: never heard of Leo
function ans1(x, t, S) {
  const { u, t0, t1, hero } = S
  const faint = ease.inCubic(prog(u, 1.85, 2.15))
  spot(x, 380, 1150, 360, 1 - faint * 0.6)
  x.save(); x.translate(380, 1140); x.rotate(-faint * Math.PI / 2); x.translate(-380, -1140)
  hero(x, t, { x: 380, y: 960 + faint * 40, s: 250, mood: u > 1.85 ? 'wide' : u > 0.4 ? 'sparkle' : 'happy', look: [1, -0.3], hops: [t0 + 0.3, t0 + 0.7], blink: u > 1.85 ? 0 : undefined })
  x.restore()
  if (faint >= 1) { x.save(); x.globalAlpha = 0.8; for (let i = 0; i < 3; i++) { const a = t * 3 + i * 2.1; drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: GOLD }, 300 + Math.cos(a) * 70, 1040 + Math.sin(a) * 20, 6) } x.restore() }
  bubble(x, t, 400, 720, t0 + 0.45, t0 + 1.8, 'hi, it’s me. LEO.', { size: 34, tail: 0, col: '#ffe27a' })
  shadow(x, 820, 1150, 180)
  sag(x, t, { x: 820, y: 990, s: 200, mood: 'neutral', look: [-1, 0], hops: [t0 + 1.3] })
  bubble(x, t, 800, 800, t0 + 1.3, t1, '…who?', { size: 36, tail: 0 })
}

// ── ANSWER 2: towels in thirds
function ans2(x, t, S) {
  const { u, t0, t1, hero } = S
  // the alarm light
  const al = u > 1.35
  box(x, 500, 440, 80, 30, '#5a5470', { b: 5 })
  drawBits(x, ['.RRRR.', 'RRWRRR', 'RRRRRR', 'RRRRRR'], { R: al ? '#ff3d55' : '#7a2a38', W: '#ffd0d6' }, 540, 410, 14)
  if (al) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const a = t * 9
    for (const d of [0, Math.PI]) { x.fillStyle = 'rgba(255,60,80,0.18)'; x.beginPath(); x.moveTo(540, 410); x.arc(540, 410, 700, a + d - 0.25, a + d + 0.25); x.closePath(); x.fill() }
    x.restore()
  }
  // the table + towel
  box(x, 560, 1060, 420, 24, '#8a5a3c', { b: 6, hi: '#a8714c' })
  const f1 = ease.inOutCubic(prog(u, 0.45, 0.75)), f2 = ease.inOutCubic(prog(u, 0.95, 1.25))
  const W = lerp(lerp(360, 240, f1), 120, f2)
  box(x, 770 - W / 2, 1010, W, 46, '#7fd0ff', { b: 5 })
  for (let i = 0; i < Math.floor(W / 40); i++) R(x, '#c9ecfb', 770 - W / 2 + 10 + i * 40, 1020, 20, 6)
  label(x, u < 0.75 ? '' : u < 1.25 ? 'ONCE…' : 'THRICE.', 770, 960, { size: 32, col: u > 1.25 ? '#ff8fa0' : BONE })
  sag(x, t, { x: 880, y: 900, s: 150, mood: 'happy', look: [-1, 1], hops: [t0 + 0.5, t0 + 1.0] })
  // Virgo, horrified
  shadow(x, 300, 1150, 210)
  hero(x, t, { x: 300, y: 960, s: 240, mood: al ? 'wide' : 'neutral', look: [1, 0.6], hops: [t0 + 0.3, t0 + 1.4], blink: al ? 0 : undefined })
  bubble(x, t, 330, 740, t0 + 1.8, t1, 'I need a minute.', { size: 34, tail: 0 })
}

// ── ANSWER 3: Libra, deciding
function ans3(x, t, S) {
  const { u, t0, t1, hero } = S
  shadow(x, 540, 1150, 220)
  hero(x, t, { x: 540, y: 1000, s: 220, mood: 'wide', look: [Math.sin(t * (2 + u * 3)) > 0 ? 1 : -1, -0.6], hops: [t0 + 0.3] })
  // the balance: tipping faster and faster
  const sp = 2 + u * u * 3
  const a = 0.28 * Math.sin(t0 + u * sp * 1.6)
  const C = { x: 540, y: 620 }
  box(x, C.x - 8, C.y, 16, 250, GOLD, { b: 5 })
  x.save(); x.translate(C.x, C.y); x.rotate(a); box(x, -300, -10, 600, 20, GOLD, { b: 5 }); x.restore()
  ;[['LOUD', 'CHEWING', -1], ['LATE', 'REPLIES', 1]].forEach(([l1, l2, d]) => {
    const px = C.x + Math.cos(a) * 280 * d, py = C.y + Math.sin(a) * 280 * d
    R(x, INK, px - 3, py, 6, 70)
    box(x, px - 110, py + 70, 220, 22, '#c9a64a', { b: 5 })
    box(x, px - 90, py + 0, 180, 66, PAPER, { b: 5 })
    x.save(); x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText(l1, px, py + 28); x.fillText(l2, px, py + 54); x.restore()
  })
  drawBits(x, ['.G.', 'GGG', '.G.'], { G: GOLD }, C.x, C.y - 6, 10)
  // calendar pages fly off
  for (let i = 0; i < 8; i++) {
    const at = 1.0 + i * 0.16, p = prog(u, at, at + 0.7)
    if (p <= 0 || p >= 1) continue
    x.save(); x.globalAlpha = 1 - p; x.translate(860 + p * 260, 460 - p * 120 + p * p * 260); x.rotate(p * 4)
    box(x, -40, -46, 80, 92, BONE, { b: 4 }); R(x, RED, -40, -46, 80, 20); x.restore()
  }
  const lk = pop01(t, t0 + 1.7, 0.3, 2.4)
  if (lk > 0.01) { x.save(); x.translate(540, 1215); x.scale(lk, lk); box(x, -210, -32, 420, 64, '#ffe27a', { b: 5 }); x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('3 WEEKS LATER', 0, 2); x.restore() }
  bubble(x, t, 760, 900, t0 + 2.05, t1, 'still thinking!', { size: 30, tail: -0.5 })
}

// ── the finale: the dealbreakers card
function finale(x, t, S) {
  const { ok } = S
  const k = pop01(t, T.undock[0] + 0.15, 0.4, 2.2) * ok
  if (k <= 0.01) return
  x.save(); x.translate(540, 1000); x.scale(1.12 * k, 1.12 * k); x.rotate(-0.03 + 0.012 * Math.sin(t * 2))
  if (t > T.right) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 40, 20, 0, 40, 330); g.addColorStop(0, 'rgba(255,226,122,0.22)'); g.addColorStop(1, 'rgba(255,226,122,0)'); x.fillStyle = g; x.fillRect(-330, -300, 660, 660); x.restore() }
  box(x, -230, -170, 460, 340, '#241a4c', { b: 7 })
  R(x, GOLD, -222, -162, 444, 8)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('MY DEALBREAKERS', 0, -110)
  const rows = [['towels in thirds', 12.3], ['never heard of me', 12.62], ['unkindness', null]]
  rows.forEach(([s, cross], i) => {
    const y = -40 + i * 80
    const keep = cross === null
    x.font = keep ? `italic 500 50px 'EB Garamond'` : `700 26px ${MONO}`; x.fillStyle = keep ? (t > T.right ? '#ffe27a' : BONE) : '#9b90c8'
    x.fillText(s, 0, y + (keep ? 14 : 0))
    if (!keep) { const p = ease.outCubic(prog(t, cross, cross + 0.25)); if (p > 0) { const w = x.measureText(s).width + 20; R(x, '#ff5a6e', -w / 2, y - 12, w * p, 6) } }
  })
  x.restore()
  hearts(x, t, T.right + 0.35, 540, 840, { n: 6, spread: 300 })
  sparkles(x, t, 540, 1060, T.right + 0.25, 12, 240, 2, [GOLD, PINK, BONE])
}

const EP = makeWrong({
  q: 'Name a | *dealbreaker.*', deep: '#b8326a',
  answers: [
    { sign: 'leo', text: '“They’ve never | *heard of me.*”', draw: ans1,
      cues: [['pluck', 0.4, 1174.66, 0.03, 0.5, -0.3], ['pop', 1.3, 587.33, 0.04, 0.4], ['whoosh', 1.85, 0.3, 0.03], ['tom', 2.15, 110, { gain: 0.2, decay: 0.2 }], ['tick', 2.15, 0.06]] },
    { sign: 'virgo', text: '“They fold towels | *in thirds.*”', draw: ans2,
      cues: [['whoosh', 0.45, 0.3, 0.02], ['tick', 0.75, 0.04], ['whoosh', 0.95, 0.3, 0.02], ['tick', 1.25, 0.05],
        ...[0, 1, 2, 3].map(i => ['chip', +(1.35 + i * 0.25).toFixed(3), i % 2 ? 660 : 880, 0.2, { wave: 'square', duty: 0.5, gain: 0.018, decay: 0.2, sustain: 0.7, dly: 0 }]), ['pop', 1.8, 659.25, 0.035, -0.3]] },
    { sign: 'libra', text: '“Hmm. Can I get | *back to you?*”', draw: ans3,
      cues: [...Array.from({ length: 10 }, (_, i) => ['tick', +(0.3 + 1.8 * Math.sqrt(i / 10)).toFixed(3), 0.025]), ...Array.from({ length: 8 }, (_, i) => ['whoosh', +(1.0 + i * 0.16).toFixed(3), 0.15, 0.012]), ['tick', 1.7, 0.06], ['pop', 2.05, 880, 0.035, 0.3]] },
  ],
  hookBubbles: ['ooh!', 'me! me!', 'hmm…'],
  speaker: 'THE STARS', ask: 'ahem. the real one?', askY: 760,
  last: '*Unkindness.* That’s it.',
  finale,
  finaleCues: [['pop', +(T.undock[0] + 0.2).toFixed(3), 1174.66, 0.035, 0], ['tick', 12.3, 0.04], ['pop', 12.32, 1318.51, 0.025, -0.2], ['tick', 12.62, 0.04], ['pop', 12.64, 1174.66, 0.025, -0.2],
    ['pluck', +(T.right + 0.25).toFixed(3), 1567.98, 0.035, 0.6, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, clamp, aqua, label]
