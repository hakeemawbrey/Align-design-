// yr2016us: THEN vs NOW, "Us in 2016 → 2026" (20 s vertical, STARTALK-THENNOW.md Block F #30, music: dreamy · Ab).
// The format's look lives in ./thennow.js (identical in all five Block F films).
//   0–7.0     THEN (2016, old phone video): one café, two strangers at two tables, back to back. ♒ Aquarius (side-swept
//             bangs, a selfie stick) and ♌ Leo (a book). NEAR MISS #1: both hum the same tune. #2: Aquarius' selfie
//             flashes, and Leo is in the background of it. #3: both laugh at their phones at the same second, facing
//             away. Then both leave through opposite sides. ♓ Pisces, the barista: "so close…" (sobbing).
//             THE STARS: "same café. same song. *zero* clue."   Sub: "same café. *strangers.*"
//   7.0       card cut; the year sticker flips to 2026.
//   7.0–12.5  NOW: the same café, the same two seats pushed together. They hum the tune together. Aquarius scrolls back:
//             "wait… look." The 2016 selfie fills the frame: Leo, circled, in the background. "that's ME." A hug;
//             "NOT A MISS." Pisces, still the barista, fountains.  THE STARS: "same seats. *together* now."
//             Sub: "same café. *us.*"
//   12.5–15.6 payoff: THE STARS "ten years later. *same* seats."  Last line: "We were *almost* us."
import {
  makeThenNow, drawStarChar, signStar, starFrame, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3, tag,
  bangs, hash, INK, BONE, GOLD, PINK, HEART, MONO, clamp, lerp, prog, ease, easeOutBack,
} from './thennow.js'

const AQU = signStar('aquarius'), LEO = signStar('leo')
const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']

function cafe(x, t, now) {
  R(x, now ? '#7a5446' : '#6e4a3e', 0, 0, 880, 620)
  for (let i = 0; i < 12; i++) R(x, now ? '#83594b' : '#775043', i * 80, 0, 36, 620)
  R(x, '#3b2a2a', 0, 620, 880, 260); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) R(x, (i + j) % 2 ? '#4a3434' : '#3b2a2a', i * 150, 640 + j * 60, 150, 60)
  R(x, INK, 0, 614, 880, 8)
  // chalkboard (squiggles only) + the counter at the back with ♓ Pisces as barista
  R(x, INK, 300, 50, 280, 170); R(x, '#26332c', 308, 58, 264, 154)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) R(x, '#d8e8d0', 330 + i * 80, 82 + j * 34, 50 - (i + j) % 3 * 10, 6)
  // pendant lights
  for (const lx of [200, 680]) { R(x, INK, lx - 2, 0, 4, 90); R(x, INK, lx - 34, 86, 68, 34); R(x, '#ffd98a', lx - 28, 92, 56, 22); const g = x.createRadialGradient(lx, 120, 0, lx, 120, 200); g.addColorStop(0, 'rgba(255,214,140,0.35)'); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(lx - 200, 0, 400, 400) }
}
function counterBack(x) { R(x, INK, 300, 330, 280, 70); R(x, '#9a6a4a', 306, 336, 268, 58); R(x, '#c9a07a', 300, 330, 280, 12); R(x, INK, 500, 290, 44, 44); R(x, '#c9c9d6', 504, 294, 36, 36) }
function table(x, cx) { R(x, INK, cx - 130, 590, 260, 26); R(x, '#d9b27a', cx - 126, 594, 252, 18); R(x, INK, cx - 10, 616, 20, 170); R(x, INK, cx - 60, 780, 120, 14) }
function cup(x, cx, cy) { R(x, INK, cx - 20, cy - 30, 40, 34); R(x, '#fffaf0', cx - 16, cy - 26, 32, 26); R(x, '#8a5a3a', cx - 16, cy - 26, 32, 6); R(x, INK, cx + 18, cy - 22, 10, 14) }
const notes = (x, t, cx, cy, t0, life, seed) => { for (let i = 0; i < 3; i++) { const tt = t - t0 - i * 0.25; if (tt < 0 || tt > life) continue; const p = tt / life; drawBits(x, NOTE, { X: BONE }, cx + Math.sin(tt * 5 + i + seed) * 22 + i * 14, cy - p * 120, 5, { alpha: 1 - p }) } }

/** the 2016 selfie: Aquarius big in front, Leo small in the background (reading) */
function selfiePic(x, t, cx, cy, w, { circle = 0, warm = true } = {}) {
  const h = w * 1.2
  x.save(); x.translate(cx, cy)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, '#fffaf0', -w / 2, -h / 2, w, h)
  x.save(); x.beginPath(); x.rect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 50); x.clip()
  R(x, warm ? '#9a6a54' : '#8a5e4c', -w / 2, -h / 2, w, h); R(x, '#775043', -w / 2, -h / 2 + h * 0.62, w, h)
  drawStarChar(x, w * 0.24, -h * 0.08, w * 0.3, t, { color: LEO.color, mood: 'neutral', look: [1, 1], seed: 7, glow: 0.6, bob: 0 })
  drawStarChar(x, -w * 0.12, h * 0.08, w * 0.62, t, { color: AQU.color, mood: 'wink', look: [0, 0], seed: 1, glow: 0.6, bob: 0 })
  bangs(x, t, starFrame(-w * 0.12, h * 0.08, w * 0.62, t, { seed: 1, bob: 0 }))
  if (warm) { x.fillStyle = 'rgba(255,150,60,0.18)'; x.fillRect(-w / 2, -h / 2, w, h) }
  x.restore()
  if (circle > 0) {
    x.strokeStyle = '#ff4f5e'; x.lineWidth = Math.max(4, w / 40); x.beginPath()
    const n = 40 * circle; for (let i = 0; i <= n; i++) { const a = -1.2 + (i / 40) * Math.PI * 2.15, rr = w * 0.16 * (1 + 0.06 * Math.sin(i)); const px = w * 0.24 + Math.cos(a) * rr * 1.1, py = -h * 0.08 + Math.sin(a) * rr; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  }
  x.font = `700 ${Math.round(w / 12)}px ${MONO}`; x.fillStyle = '#2a2350'; x.textAlign = 'center'; x.fillText('me!', 0, h / 2 - 16)
  x.restore()
}

// ── A: 2016, strangers
const A = { hum: 1.3, miss1: 1.55, selfie: 2.65, flash: 2.85, miss2: 3.0, ha: 4.25, miss3: 4.45, leave: [5.2, 6.1], close: 5.55 }
function sceneA(x, t) {
  cafe(x, t, false)
  pisces(x, t, 440, 270, 150, t > A.close ? 3 : t > A.miss2 ? 2 : 1, { mood: t > A.close ? 'wide' : 'sparkle', look: [0, 1], hops: [A.miss1 + 0.1, A.miss2 + 0.1, A.close] })
  counterBack(x)
  const lv = ease.inCubic(prog(t, ...A.leave))
  const ax = 220 - 420 * lv, lx = 660 + 420 * lv
  // Aquarius (left, facing left), selfie stick
  const am = t > A.ha ? 'happy' : t > A.flash ? 'wink' : t > A.hum ? 'happy' : 'neutral'
  const ao = { color: AQU.color, glyph: AQU.glyph, mood: am, look: [-1, 0], hops: [A.hum, A.flash, A.ha, A.leave[0]], seed: 1 }
  drawStarChar(x, ax, 500, 230, t, ao); bangs(x, t, starFrame(ax, 500, 230, t, ao))
  const st = pop01(t, A.selfie - 0.4, 0.3, 2) * outK(t, [A.miss2 + 0.6, A.miss2 + 0.9])
  if (st > 0.01) { x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(ax + 40, 520); x.lineTo(ax + 40 - 150 * st, 520 - 230 * st); x.stroke(); R(x, INK, ax + 40 - 150 * st - 24, 520 - 230 * st - 34, 48, 68); R(x, '#4a4e66', ax + 40 - 150 * st - 18, 520 - 230 * st - 28, 36, 56) }
  // Leo (right, facing right), a book
  const lm = t > A.ha ? 'happy' : 'neutral'
  drawStarChar(x, lx, 500, 230, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: [1, 1], hops: [A.hum + 0.05, A.ha, A.leave[0] + 0.05], seed: 7 })
  if (t < A.leave[0] + 0.2) { R(x, INK, lx + 20, 520, 110, 70); R(x, '#4fb3d9', lx + 26, 526, 46, 58); R(x, '#fffaf0', lx + 76, 526, 48, 58) }
  table(x, 220); table(x, 660); cup(x, 280, 594); cup(x, 600, 594)
  // the near misses
  if (t > A.hum) { notes(x, t, ax - 60, 380, A.hum, 1.3, 1); notes(x, t, lx + 70, 380, A.hum + 0.05, 1.3, 2) }
  if (t > A.flash && t < A.flash + 0.3) { x.fillStyle = `rgba(255,255,255,${0.9 * (1 - prog(t, A.flash, A.flash + 0.3))})`; x.fillRect(0, 0, 880, 880) }
  const sk = pop01(t, A.flash + 0.05, 0.3, 2.2) * outK(t, [A.miss2 + 1.15, A.miss2 + 1.35])
  if (sk > 0.01) { x.save(); x.translate(250, 250); x.rotate(-0.08); x.scale(sk, sk); selfiePic(x, t, 0, 0, 200); x.restore() }
  if (t > A.ha) { speech(x, t, ax - 20, 340, A.ha, 'ha!', { size: 40, tail: 0, life: 0.85 }); speech(x, t, lx + 20, 340, A.ha + 0.02, 'ha!', { size: 40, tail: 0, life: 0.85 }) }
  ;[A.miss1, A.miss2, A.miss3].forEach((m, i) => tag(x, t, 440, 470, m, `NEAR MISS #${i + 1}`, { size: 36, life: [A.selfie - 0.45, A.ha, A.leave[0]][i] - m, col: '#ff8fb1', rot: (i - 1) * 0.04 }))
  speech(x, t, 440, 150, A.close, 'so close…', { size: 40, tail: 0, life: 2 })
}

// ── B: 2026, us
const B = { hum: 7.4, wait: 8.25, pic: [8.75, 9.15], circle: [9.3, 9.75], me: 9.95, hug: [10.9, 11.15], hugAt: 11.15, not: 11.3 }
function sceneB(x, t) {
  cafe(x, t, true)
  pisces(x, t, 440, 270, 150, t > B.hugAt ? 3 : 2, { mood: t > B.hugAt ? 'happy' : t > B.me ? 'wide' : 'sparkle', look: [0, 1], hops: [B.me + 0.1, B.hugAt + 0.1] })
  counterBack(x)
  const hg = ease.inOutCubic(prog(t, ...B.hug))
  const ax = 330 + 30 * hg, lx = 550 - 30 * hg
  const am = t > B.hugAt ? 'heart' : t > B.me ? 'happy' : t > B.wait ? 'sparkle' : 'happy'
  const lm = t > B.hugAt ? 'heart' : t > B.me - 0.3 ? 'wide' : 'happy'
  drawStarChar(x, ax, 500, 230, t, { color: AQU.color, glyph: AQU.glyph, mood: am, look: [1, 0], hops: [B.hum, B.wait, B.hugAt], seed: 1, blush: 1 })
  drawStarChar(x, lx, 500, 230, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: [-1, 0], hops: [B.hum + 0.05, B.me, B.hugAt], seed: 7, blush: t > B.me ? 1 : undefined, squash: t > B.me && t < B.me + 0.25 ? -0.15 : 0 })
  // one table now (the two pushed together), two cups, one pastry
  R(x, INK, 170, 590, 540, 26); R(x, '#d9b27a', 174, 594, 532, 18); R(x, INK, 300, 616, 20, 170); R(x, INK, 560, 616, 20, 170)
  cup(x, 330, 594); cup(x, 560, 594)
  drawBits(x, ['..CCCC..', '.CCHCCC.', 'CCCCCCCC', '.DDDDDD.'], { C: '#e0a050', H: '#f6cf8a', D: '#a8662e' }, 445, 578, 8)
  if (t > B.hum) notes(x, t, 440, 400, B.hum, 1.4, 3)
  // the old selfie, blown up, Leo circled
  const pk = easeOutBack(prog(t, ...B.pic), 1.4) * outK(t, [B.hug[0] - 0.2, B.hug[0]])
  if (pk > 0.01) { x.save(); x.translate(440, lerp(700, 330, Math.min(1, pk))); x.rotate(0.04); x.scale(pk, pk); selfiePic(x, t, 0, 0, 330, { circle: prog(t, ...B.circle) }); x.restore() }
  speech(x, t, 300, 150, B.wait, 'wait… look.', { size: 38, tail: 0, life: 0.85 })
  speech(x, t, 700, 360, B.me, 'that’s ME.', { size: 44, tail: 0, life: 1.0, col: '#fffaf0' })
  if (t > B.hugAt) hearts(x, t, 440, 380, B.hugAt, { n: 8, life: 1.6, cell: 7, spread: 280 })
  sparkles(x, t, 440, 470, B.hugAt, 10, 190, 1, [HEART, GOLD, BONE], 24)
  tag(x, t, 440, 740, B.not, 'NOT A MISS.', { size: 40, col: GOLD, rot: -0.03 })
}

const EP = makeThenNow({
  id: 'yr2016us', accent: '#ff8fb1', thing: 'Us', year: '2016',
  A: { draw: sceneA, date: '09·03·2016', sub: 'same café. *strangers.*' },
  B: { draw: sceneB, sub: 'same café. *us.*' },
  lines: [{ t: 3.15, text: 'same café. same song. *zero* clue.' }, { t: 7.5, text: 'same seats. *together* now.' }, { t: 12.5, text: 'ten years later. *same* seats.' }],
  last: 'We were *almost* us.', late: 1,
  cues: () => [
    ['pluck', A.hum, 1046.5, 0.025, 0.4, -0.4], ['pluck', A.hum + 0.05, 1046.5, 0.025, 0.4, 0.4], ['pluck', A.hum + 0.3, 1174.66, 0.022, 0.4, 0], ['pluck', A.hum + 0.55, 1318.51, 0.022, 0.4, 0],
    ['pop', A.miss1, 659.25, 0.03, 0], ['whoosh', A.selfie - 0.4, 0.3, 0.025],
    ['tick', A.flash - 0.03, 0.06], ['pop', A.flash, 1864.66, 0.03, 0], ['pop', A.miss2, 659.25, 0.03, 0],
    ['pop', A.ha, 987.77, 0.035, -0.3], ['pop', A.ha + 0.02, 1174.66, 0.035, 0.3], ['pop', A.miss3, 659.25, 0.03, 0],
    ['whoosh', A.leave[0], 0.5, 0.035], ['pluck', A.close, 523.25, 0.03, 0.6, 0],
    ['pluck', B.hum, 1046.5, 0.025, 0.4, 0], ['pluck', B.hum + 0.3, 1174.66, 0.025, 0.4, 0], ['pluck', B.hum + 0.55, 1318.51, 0.025, 0.4, 0],
    ['pop', B.wait, 880, 0.03, -0.3], ['whoosh', B.pic[0], 0.35, 0.03], ['pluck', B.pic[1], 1318.51, 0.03, 0.4, 0],
    ['riser', B.circle[0], B.circle[1], 0.02], ['pop', B.me, 1174.66, 0.045, 0.3], ['pop', B.me + 0.07, 1567.98, 0.035, 0.3],
    ['whoosh', B.hug[0], 0.25, 0.025], ['pluck', B.hugAt, 1567.98, 0.045, 0.6, 0], ['glitter', B.hugAt, B.hugAt + 0.5], ['bell', B.not, 2093, 0.03, 1.0, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
