// nhve19: THEN vs NOW: HOLIDAYS, "The holiday text in 2016 / 2026" (20 s, b18 #19, music: lofi · F)
// Look and props: ../../nhve01/scenes/thennow.js + holkit.js.
//   0–6.71    2016 (old-phone grade, "12·25·2016"): a thumb hits SEND TO ALL at t = 0; 200 names whoosh out of
//             ♌ Leo's phone, "happy holidays!!" to everyone. Across town ♍ Virgo's phone buzzes: the same message,
//             "…oh. me too, I guess." ♓ Pisces gets one too and cries anyway.
//   6.71      the card cut; the year sticker flips to 2026.
//   6.71–12.8 2026: Leo types one message, just for Virgo: "thinking about our walk in the first snow." Virgo's
//             reply lands in a second: "me too. come over?" Leo spins. Pisces happy-sobs.
//   12.8–15.6 THE STARS: "one real message beats *a broadcast.*"  Last line: "Not everyone. *Just* you."
import {
  makeThenNow, drawStarChar, signStar, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, SW, SH, lerp, prog, ease, R, clamp,
} from '../../nhve01/scenes/thennow.js'
import { room, stringLights, sign, beanie, scarf, mark, phone, couch, tree, snowWindow, RED, GREEN, CREAM, INTER } from '../../nhve01/scenes/holkit.js'

const LEO = signStar('leo'), VIR = signStar('virgo')

function bigPhone(x, cx, cy, s, now, rows, { rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const w = now ? 440 : 380, h = now ? 560 : 470
  R(x, INK, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16); R(x, now ? '#2a2633' : '#4a4652', -w / 2, -h / 2, w, h)
  R(x, now ? '#f4f6ff' : '#9fd8ff', -w / 2 + 14, -h / 2 + 30, w - 28, h - (now ? 60 : 90))
  rows.forEach(({ text, me, k = 1 }, i) => {
    if (k <= 0.01) return
    x.save(); x.globalAlpha = Math.min(1, k)
    x.font = `800 32px ${INTER}`
    const lines = text.split('\n'), tw = Math.max(...lines.map(l => x.measureText(l).width)) + 28, th = lines.length * 26 + 18
    const bx = me ? w / 2 - 24 - tw : -w / 2 + 24, by = -h / 2 + 50 + i * 140
    R(x, me ? '#7a5cc0' : '#ffffff', bx, by, tw, th)
    x.fillStyle = me ? '#ffffff' : INK; x.textAlign = 'left'; x.textBaseline = 'top'
    lines.forEach((l, j) => x.fillText(l, bx + 14, by + 10 + j * 38))
    x.restore()
  })
  x.restore()
}

// ── THEN: 2016
const A = { send: 0.25, fly: [0.3, 2.2], buzz: 2.6, read: 3.3, metoo: 4.0, pis: 4.9 }
function sceneA(x, t) {
  room(x, t, { now: false })
  stringLights(x, t, 24, 18)
  // left: Leo + the phone with SEND TO ALL
  const lH = [A.send, 1.0]
  drawStarChar(x, 160, 760, 180, t, { color: LEO.color, glyph: LEO.glyph, mood: t < A.fly[1] ? 'sparkle' : 'happy', look: [1, 0], seed: 4, hops: lH })
  bangs(x, starFrame(160, 760, 180, t, { hops: lH, seed: 4 }))
  bigPhone(x, 380, 520, 0.85, false, [{ text: 'happy holidays!!\n:) :) :)', me: true }])
  // the SEND TO ALL button + thumb
  const pr = t > A.send && t < A.send + 0.2
  R(x, INK, 250, 690, 180, 60); R(x, pr ? '#c94a5a' : '#e05a6a', 256, 696 + (pr ? 4 : 0), 168, 48)
  x.fillStyle = '#ffffff'; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND TO ALL', 340, 721 + (pr ? 4 : 0))
  const th = Math.sin(Math.PI * prog(t, -0.2, 0.6)); if (th > 0) { R(x, INK, 300, 730 - 40 * th, 90, 110); R(x, '#f2a080', 306, 736 - 40 * th, 78, 100) }
  // names whooshing out
  for (let i = 0; i < 18; i++) { const p = prog(t, A.fly[0] + i * 0.08, A.fly[0] + i * 0.08 + 0.7); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 1 - p; R(x, '#fffaf0', 570 + p * 400 - 40, 480 - 300 * Math.sin(p * 2 + i) * 0.4 + i * 14 - 60, 80, 22); R(x, '#7a5cc0', 570 + p * 400 - 34, 487 - 300 * Math.sin(p * 2 + i) * 0.4 + i * 14 - 60, 50, 8); x.restore() } }
  if (t > A.fly[0]) sign(x, 360, 220, `SENT: ${Math.min(200, Math.floor(prog(t, ...A.fly) * 200))}`, { size: 32, col: '#fff3c8', rot: -0.05 })
  // right: Virgo's phone buzzes
  const bz = t > A.buzz && t < A.buzz + 0.6 ? 6 * Math.sin(t * 70) : 0
  bigPhone(x, 720 + bz, 560, 0.55, false, [{ text: 'happy holidays!!\n:) :) :)', k: pop01(t, A.buzz, 0.25) }])
  const vH = [A.buzz, A.metoo]
  drawStarChar(x, 720, 860, 170, t, { color: VIR.color, glyph: VIR.glyph, mood: t > A.metoo ? 'neutral' : t > A.read ? 'squint' : 'sparkle', look: [0, -1], seed: 8, hops: vH })
  pisces(x, t, 520, 900, 110, t > A.pis ? 3 : 1, { mood: t > A.pis ? 'wide' : 'neutral', look: [1, -1], seed: 6 })
  if (t > A.pis - 0.1) phone(x, 520, 1000, { s: 0.4, text: '', rot: 0.2 })
  speech(x, t, 720, 260, A.metoo, '…oh. me too,\nI guess.', { size: 34, tail: 0, life: 1.6, col: '#fffaf0' })
}

// ── NOW: 2026
const B = { type: [7.0, 8.6], send: 8.75, reply: 9.55, spin: 10.4, hug: 11.0 }
function sceneB(x, t) {
  room(x, t, { now: true })
  stringLights(x, t, 24, 18)
  snowWindow(x, t, 640, 110, 220, 210, { night: true })
  couch(x, 330, 1020, 520, { col: '#c06a8a' })
  const msg = 'thinking about our\nwalk in the first snow.'
  const n = Math.floor(prog(t, ...B.type) * msg.length)
  const rows = [{ text: t < B.send ? (msg.slice(0, n) || ' ') : msg, me: true, k: t < B.send ? 0.6 : 1 }]
  if (t > B.reply) rows.push({ text: 'me too.\ncome over?', k: pop01(t, B.reply, 0.25) })
  bigPhone(x, 590, 560, 0.95, true, rows, { rot: 0.03 })
  const spin = t > B.spin ? Math.sin(Math.PI * prog(t, B.spin, B.spin + 0.5)) : 0
  const lH = [B.send, B.reply + 0.05, B.spin, B.hug]
  drawStarChar(x, 230, 810, 230, t, { color: LEO.color, glyph: LEO.glyph, mood: t > B.reply ? 'heart' : t > B.send ? 'happy' : 'squint', look: t < B.reply ? [1, -1] : undefined, seed: 4, hops: lH, squash: -0.12 * spin })
  scarf(x, starFrame(230, 810, 230, t, { hops: lH, seed: 4, squash: -0.12 * spin }), RED)
  pisces(x, t, 800, 900, 100, t > B.reply ? 3 : 2, { mood: t > B.reply ? 'happy' : 'sparkle', look: [-1, -1], seed: 6 })
  sparkles(x, t, 600, 600, B.reply, 12, 260, 1, [GOLD, PINK, BONE], 24)
  if (t > B.spin) hearts(x, t, 230, 640, B.spin, { n: 7, life: 1.5, cell: 6, spread: 200 })
  if (t > B.send && t < B.send + 0.6) sign(x, 600, 950, 'SENT: 1', { size: 30, col: '#fff3c8', k: pop01(t, B.send, 0.25) * outK(t, [B.send + 0.45, B.send + 0.6]) })
}

const EP = makeThenNow({
  id: 'nhve19', thing: 'The holiday text in', then: '2016', stamp: '12·25·2016', accent: '#ffcf7a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: one text, *two hundred people.*' },
    { t: 9.9, text: '2026: one text. *one person.*' },
    { t: 12.92, text: 'one real message beats *a broadcast.*' },
  ],
  last: 'Not everyone. | *Just* you.',
  cues: () => [
    ['tick', A.send, 0.08], ['whoosh', A.fly[0], 1.6, 0.05], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(A.fly[0] + i * 0.2), 0.02]),
    ['tom', A.buzz, 80, { gain: 0.14, decay: 0.08 }], ['tom', r3(A.buzz + 0.15), 80, { gain: 0.14, decay: 0.08 }], ['pop', A.metoo, 523.25, 0.03, 0.4], ['pop', A.pis, 587.33, 0.025, 0],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(B.type[0] + i * 0.16), 0.02]), ['whoosh', B.send, 0.25, 0.03], ['pop', B.send, 1046.5, 0.035, 0.3],
    ['pop', B.reply, 1318.51, 0.045, 0.3], ['pop', r3(B.reply + 0.08), 1567.98, 0.04, 0.3], ['glitter', B.reply, r3(B.reply + 0.4)],
    ['whoosh', B.spin, 0.3, 0.03], ['pluck', B.hug, 1567.98, 0.045, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
