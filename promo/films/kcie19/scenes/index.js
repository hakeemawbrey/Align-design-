// kcie19: CAUGHT IN 4K, "Scorpio, five catches in one day" (long, loop, music: screwed · Em). Rows: m02.md #19
//   CATCH 1 · 10:00 AM  sunglasses indoors "to be mysterious": BONK into the café's glass door, then peering over the menu (= frame 0).
//   CATCH 2 · 12:30 PM  a long heartfelt paragraph… select all, delete… sends "k".
//   CATCH 3 · 3:00 PM   "never heard this song." Mouthing every single word.
//   CATCH 4 · 6:30 PM   a TRUST CHART for a new friend (columns, colour codes)… tears it up, texts "dinner?" instead.
//   CATCH 5 · 11:00 PM  movie night under one blanket with Pisces. Both crying. Scorpio puts the sunglasses back on.
//   Last line in the final freeze: "Mysterious. Also crying." Then the rewind straight back into frame 0.
import {
  makeCaught, room, furn, windowFrame, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts, confetti, typed,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const S = [0, 100, 200, 300, 400]
const LEN = [10.4, 10.6, 10.0, 10.4, 10.2]
const CLOCKS = ['10:00', '12:30', '15:00', '18:30', '23:00']
const band = w => { let i = 0; for (let k = 0; k < 5; k++) if (w >= S[k] - 1) i = k; return { i, u: w - S[i] } }
const SCO = { x: 380, y: 1250, s: 300 }
const PARA = 'honestly today was a lot and I kept thinking about what you said and I think you were right and I really appreciate you'

function c1(x, w, u) {
  room(x, 'cafe', { fy: 1440 })
  // the glass door (right) and the counter with the barista (Gemini)
  box(x, 760, 620, 260, 820, 'rgba(180,220,255,0.25)', { b: 6 }); R(x, 'rgba(255,255,255,0.4)', 790, 660, 20, 300)
  label(x, 'PULL', 890, 1000, { size: 30, col: BONE })
  box(x, 60, 980, 380, 40, '#6b4a2f', { b: 6 }); star(x, w, 'gemini', { x: 250, y: 900, s: 170, mood: u > 3.5 && u < 5 ? 'wide' : 'happy', look: [1, 0], hops: [3.6], seed: 4, glyph: false, shadow: false }); box(x, 60, 1020, 380, 420, '#8a5a32', { b: 6 })
  // Scorpio: walks in from the right… BONK… sits with the menu
  let pos = { x: 600, y: 1250 }, mood = 'neutral', look = [1, 0]
  if (u < 3.5) { pos.x = lerp(560, 760, prog(u, 1.0, 3.5)); look = [1, 0] }
  if (u > 3.5 && u < 5.0) { pos.x = 700; mood = 'wide'; look = [0, 0] }
  if (u > 5.0) { const p = ease.inOutCubic(prog(u, 5.0, 6.4)); pos.x = lerp(700, 560, p); pos.y = lerp(1250, 1110, p); mood = 'squint'; look = [-1, -0.2] }
  furn.table(x, 560, 1300, 360, '#6b4a2f')
  star(x, w, 'scorpio', { ...pos, s: 290, mood, look, shades: u < 3.5 || u > 6 ? 0 : 1, hops: [1.2, 1.8, 2.4, 3.0, 3.55, 5.1, 6.4], seed: 13, squash: u > 3.5 && u < 3.8 ? 0.2 : 0 })
  if (u > 3.5 && u < 4.6) { label(x, 'BONK', 760, 920, { size: 70, col: GOLD, font: INTER, weight: 800, rot: 0.1, alpha: pop01(w, S[0] + 3.5, 0.15, 3) }); sparkles(x, w, 740, 1100, S[0] + 3.5, 10, 120, 1, [GOLD, BONE]) }
  if (u > 6.4) { const k = pop01(w, S[0] + 6.4, 0.3, 2); x.save(); x.translate(560, 1310); x.scale(k, k); box(x, -150, -110, 300, 180, '#fff8ea', { b: 5 }); label(x, 'MENU', 0, -70, { size: 32, col: INK, shadow: false, font: INTER, weight: 800 }); for (let i = 0; i < 3; i++) R(x, '#c9bfa8', -110, -30 + i * 30, 220, 12); x.restore() }
  bubble(x, w, 580, 880, S[0] + 0.6, S[0] + 3.3, 'mysterious. unbothered.', { size: 36 })
  pisces(x, w, { x: 930, y: 1560, s: 150, mood: 'wide', look: [-1, -1], tears: 1, hops: [S[0] + 3.6] })
}
function c2(x, w, u) {
  room(x, 'bedroom', { fy: 1440 })
  furn.bed(x, 40, 1400, 640, '#3a2a6e')
  star(x, w, 'scorpio', { ...SCO, x: 300, y: 1260, mood: u < 6 ? 'sparkle' : u < 8 ? 'squint' : 'neutral', look: [1, -0.6], hops: [0.4, 6.1, 8.2, 9.6], seed: 13 })
  const shown = u < 6.4 ? typed(PARA, u, 0.5, 22) : u < 7.2 ? PARA : ''
  phone(x, w, { cx: 760, cy: 920, w: 420, h: 760, rot: 0.04, screen: (x, ww, { sx, sy, sw, sh }) => {
    R(x, '#1d1640', sx, sy, sw, 84); label(x, '♡ them', sx + sw / 2, sy + 44, { size: 30, col: BONE, font: INTER, weight: 800, shadow: false })
    box(x, sx + 20, sy + 110, 220, 60, '#efe6d6', { b: 4 }); label(x, 'how are you?', sx + 130, sy + 140, { size: 26, col: INK, shadow: false, font: INTER, weight: 700 })
    if (u > 9.4) { box(x, sx + sw - 90, sy + 200, 70, 60, '#3d7cf0', { b: 4 }); label(x, 'k', sx + sw - 55, sy + 230, { size: 32, col: '#fff', shadow: false, font: INTER, weight: 700 }) }
    // the draft box grows with the paragraph
    x.font = `700 24px ${INTER}`; const words = shown.split(' '); const lines = []; let cur = ''
    for (const wd of words) { const tt = cur ? cur + ' ' + wd : wd; if (x.measureText(tt).width > sw - 60 && cur) { lines.push(cur); cur = wd } else cur = tt }
    if (cur) lines.push(cur)
    const draft = u > 8.4 && u < 9.4 ? 'k' : null
    const L = draft ? ['k'] : lines, bh = Math.max(56, L.length * 32 + 24)
    const sel = u > 6.4 && u < 7.2
    box(x, sx + 12, sy + sh - bh - 14, sw - 24, bh, sel ? '#9fc7ff' : '#f6f3ea', { b: 3 })
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; L.forEach((l, j) => x.fillText(l, sx + 26, sy + sh - bh + 8 + j * 32))
  } })
  if (u > 6.4 && u < 7.2) label(x, 'SELECT ALL', 760, 470, { size: 40, col: GOLD })
  if (u > 7.2 && u < 8.4) label(x, 'DELETE', 760, 470, { size: 40, col: RED })
  sticker(x, w, 400, 640, S[1] + 1.0, S[1] + 5.8, 'the *paragraph*', { size: 46, col: GOLD })
  pisces(x, w, { x: 930, y: 1570, s: 150, mood: 'sparkle', look: [-1, -1], tears: u > 6.4 ? 3 : 2, hops: [S[1] + 7.3] })
  bubble(x, w, 880, 1380, S[1] + 7.3, S[1] + 11, 'it was SO|beautiful', { size: 28, col: '#bfe9ff', tail: 0.4 })
}
function c3(x, w, u) {
  room(x, 'living', { fy: 1440 })
  furn.couch(x, 100, 1400, 880, '#5a8ad0')
  // a speaker playing; notes float out
  box(x, 860, 900, 140, 200, INK, { b: 4 }); for (const [cy, r] of [[960, 40], [1050, 28]]) { x.fillStyle = '#3a3060'; x.beginPath(); x.arc(930, cy, r, 0, Math.PI * 2); x.fill() }
  for (let i = 0; i < 6; i++) { const ph = (u * 0.5 + i / 6) % 1; label(x, i % 2 ? '♪' : '♫', 930 - ph * 600, 900 - ph * 300 + 30 * Math.sin(ph * 9), { size: 54, col: [GOLD, PINK, MINT][i % 3], alpha: 1 - ph }) }
  star(x, w, 'aquarius', { x: 700, y: 1240, s: 240, mood: u > 6 ? 'squint' : 'happy', look: [-1, 0], hops: [0.6, 3.0, 6.1], seed: 7 })
  const mouth = u > 4.0 ? Math.abs(Math.sin(u * 9)) : 0
  star(x, w, 'scorpio', { ...SCO, x: 330, y: 1230, mood: u > 4 ? (mouth > 0.5 ? 'wide' : 'squint') : 'neutral', look: [0, -0.4], squash: 0.08 * mouth, hops: Array.from({ length: 10 }, (_, i) => S[2] + 4 + i * 0.6), seed: 13 })
  bubble(x, w, 700, 900, S[2] + 0.6, S[2] + 2.4, 'you know this one?', { size: 36, tail: 0.2 })
  bubble(x, w, 330, 900, S[2] + 2.5, S[2] + 4.0, 'never heard it.', { size: 40 })
  if (u > 4.0) label(x, '*mouthing every word*', 330, 860, { size: 34, col: BONE, font: INTER, weight: 800 })
  if (u > 6.0) label(x, 'including the ad-libs', 330, 920, { size: 30, col: GOLD })
  pisces(x, w, { x: 520, y: 1560, s: 150, mood: 'happy', look: [-1, -1], tears: 2, hops: Array.from({ length: 6 }, (_, i) => S[2] + 5 + i * 0.8) })
}
function c4(x, w, u) {
  room(x, 'office', { fy: 1440 })
  // the TRUST CHART on an easel
  const tear = clamp(prog(u, 7.0, 7.6))
  const halves = d => { x.save(); x.translate(540 + d * 240 * tear, 840 + 300 * tear * tear); x.rotate(d * 0.4 * tear)
    box(x, d < 0 ? -320 : 0, -240, 320, 480, '#fff8ea', { b: 5 })
    if (d < 0) { label(x, 'TRUST CHART', -160, -200, { size: 32, col: RED, shadow: false, font: INTER, weight: 800 }); ['laughed at my joke', 'remembered my name', 'replied in < 1 hr'].forEach((t, i) => label(x, t, -300, -120 + i * 70, { size: 24, col: INK, shadow: false, align: 'left', font: INTER, weight: 700, alpha: u > 1.2 + i * 0.8 ? 1 : 0 })) }
    else ['✓', '✓', '?'].forEach((t, i) => label(x, t, 160, -120 + i * 70, { size: 40, col: i === 2 ? GOLD : MINT, shadow: false, alpha: u > 1.6 + i * 0.8 ? 1 : 0 }))
    x.restore() }
  if (u < 8.5) { halves(-1); halves(1) }
  if (u > 4.0 && u < 7.0) { label(x, 'COLOUR CODE: ON', 540, 1040, { size: 32, col: GOLD }) }
  star(x, w, 'scorpio', { ...SCO, x: 300, y: 1260, mood: u < 6.6 ? 'squint' : u < 8.2 ? 'wide' : 'happy', look: [1, -0.6], hops: [0.5, 1.3, 2.1, 2.9, 7.05, 8.3], seed: 13 })
  if (u > 8.2) phone(x, w, { cx: 760, cy: 1000, w: 360, h: 460, rot: 0.06, title: '♐ new friend', fs: 30, msgs: [{ w: S[3] + 8.4, side: 'R', text: 'dinner?' }, { w: S[3] + 9.4, side: 'L', text: 'YES' }] })
  if (u > 7.0 && u < 7.8) label(x, '*RRRIP*', 540, 600, { size: 70, col: RED, font: INTER, weight: 800, rot: -0.1 })
  pisces(x, w, { x: 940, y: 1580, s: 150, mood: 'sparkle', look: [-1, -1], tears: u > 7 ? 3 : 1, hops: [S[3] + 7.1, S[3] + 9.5] })
}
function c5(x, w, u) {
  room(x, 'living', { fy: 1440 })
  // the TV glow
  box(x, 260, 420, 560, 340, INK, { b: 6 }); const g = x.createLinearGradient(0, 430, 0, 750); g.addColorStop(0, '#2a4a7a'); g.addColorStop(1, '#ff8fb1'); x.fillStyle = g; x.fillRect(276, 436, 528, 308)
  label(x, u > 5 ? 'THE END' : '♥', 540, 590, { size: u > 5 ? 56 : 90, col: BONE })
  furn.couch(x, 140, 1420, 800, '#9a7be0')
  const cry = u > 3.5
  star(x, w, 'scorpio', { x: 400, y: 1170, s: 280, mood: cry ? 'sparkle' : 'neutral', look: [0, -1], tears: cry ? 3 : 0, shades: u > 7.8 ? 0 : null, hops: [0.4, 3.6, 7.9], seed: 13 })
  pisces(x, w, { x: 680, y: 1170, s: 260, mood: 'sparkle', look: [0, -1], tears: u > 1.5 ? 3 : 2, hops: [1.6, 3.6, 5.2] })
  box(x, 200, 1320, 680, 110, '#ffb3d1', { b: 6, hi: '#ffd6e6' })       // one blanket for two
  bubble(x, w, 680, 960, S[4] + 4.0, S[4] + 6.5, 'they KISSED in the RAIN', { size: 34, col: '#bfe9ff', tail: 0.2 })
  bubble(x, w, 400, 960, S[4] + 6.6, S[4] + 7.7, 'I’m not crying.', { size: 38 })
  if (u > 7.8) label(x, '*sunglasses back on*', 400, 1560, { size: 34, col: BONE, font: INTER, weight: 800 })
}

function world(x, w) { const { i, u } = band(w); [c1, c2, c3, c4, c5][i](x, w, u) }
const AT = [() => ({ x: 560, y: 1130 }), () => ({ x: 300, y: 1260 }), () => ({ x: 330, y: 1230 }), () => ({ x: 300, y: 1260 }), () => ({ x: 400, y: 1170 })]
const TITLES = ['10:00 AM · MYSTERIOUS', '12:30 PM · THE PARAGRAPH', '3:00 PM · “NEVER HEARD IT”', '6:30 PM · THE TRUST CHART', '11:00 PM · MOVIE NIGHT']

const EP = makeCaught({
  id: 'kcie19', sign: 'scorpio', name: 'Scorpio',
  hook: 'Caught five times. | *Number five,* though.', hookColor: '#ff6b7f',
  earlier: null,
  clockAt: w => { const { i, u } = band(w); const [h, m] = CLOCKS[i].split(':').map(Number); const s = Math.floor(u * 6); return `${String(h).padStart(2, '0')}:${String(m + Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` },
  catches: S.map((s, i) => ({ s, c: s + LEN[i], sticker: TITLES[i], hold: 1.2, circle: w => { const p = AT[i](w - s); return { x: p.x, y: p.y - 10, rx: 190, ry: 195, lx: 60, ly: p.y + 250, labelSide: 1 } } })),
  ending: 'loop', loopHold: 2.4,
  last: 'Mysterious. | *Also crying.*', lastColor: '#ff6b7f',
  world,
  cues: [
    ...[1.2, 1.8, 2.4, 3.0].map(t => ['tick', t, 0.04]), ['tom', 3.5, 80, { gain: 0.35, decay: 0.3 }], ['boom', 3.5, 0.18], ['pop', 3.6, 1567.98, 0.04, 0.3], ['whoosh', 6.4, 0.25, 0.03],
    ...Array.from({ length: 40 }, (_, i) => ['tick', +(S[1] + 0.5 + i * 0.14).toFixed(2), 0.018]), ['pop', S[1] + 6.4, 880, 0.04, 0], ['whoosh', S[1] + 7.2, 0.3, 0.05], ['tick', S[1] + 8.4, 0.05], ['pop', S[1] + 9.4, 1174.66, 0.05, 0.3],
    ['pop', S[2] + 0.6, 880, 0.04, 0.3], ['pop', S[2] + 2.5, 523.25, 0.04, -0.3], ...Array.from({ length: 10 }, (_, i) => ['pop', +(S[2] + 4 + i * 0.6).toFixed(2), [659.25, 783.99, 880, 987.77][i % 4], 0.02, -0.3]),
    ...[1.2, 2.0, 2.8].map(t => ['tick', S[3] + t, 0.04]), ...[1.6, 2.4, 3.2].map((t, i) => ['pop', S[3] + t, 1174.66 + i * 100, 0.03, 0.3]), ['whoosh', S[3] + 7.0, 0.5, 0.06], ['tick', S[3] + 7.1, 0.08], ['pop', S[3] + 8.4, 1174.66, 0.05, 0.3], ['pop', S[3] + 9.4, 1567.98, 0.05, 0.3], ['glitter', S[3] + 9.4, S[3] + 9.9],
    ['pluck', S[4] + 1.6, 1318.51, 0.035, 0.8, 0.3], ['pluck', S[4] + 3.6, 1174.66, 0.035, 0.8, -0.3], ['pop', S[4] + 4.0, 987.77, 0.04, 0.3], ['pop', S[4] + 6.6, 523.25, 0.04, -0.3], ['tick', S[4] + 7.8, 0.06], ['bell', S[4] + 7.9, 1760, 0.03, 1.0, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, SKYB, windowFrame, hearts, confetti, outK]
