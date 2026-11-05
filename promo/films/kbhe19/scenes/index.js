// kbhe19: BRAIN VS HEART, Ep 19 "The Wedding, Alone" (85.6 s vertical, LONG, star_talk post, music: jazzy · Bb). Hard cut.
// ♑ Capricorn at a wedding with no plus one, in five rounds refereed by THE STARS.
//   0.00   frame 0: mid whip zoom; Brain mid-panic over a giant seating chart, a "+1: NONE" card spinning into frame,
//          ref mid-whistle. Title "Capricorn at a wedding. | Plus one: *none.*"  3.4 promise: "Wait for the boss level: | *the table plan.*"
//   7.0    R1 THE RSVP: Heart ticks "just me" proudly. (Heart)
//  22.0    R2 THE ENTRANCE: Brain's route to the snack table vs "say hi to people" → one hi. (both)
//  37.0    R3 THE TABLE PLAN (boss level, health bar): "table 9: the singles table" → "or… the fun table". (Heart)
//  52.0    R4 THE SLOW SONG: Brain: bathroom, now. Heart: the flower girl wants to dance. She wins. (Heart)
//  67.0    R5 THE LAST SONG: all of table 9 dances together. (both)
//  82.0    BRAIN + HEART: "Table 9 was the *best* table."
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'
import { key, clamp, lerp, prog, ease, pop01, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar, sparkles } from '../../kbhe01/bhkit.js'
import { makeLong } from '../../kbhe16/longkit.js'

export const DURATION = 85.6
const SIGN = 'capricorn', CAP = signStar('capricorn')
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: 'Capricorn at a wedding. | Plus one: *none.*', top: 168, size: 90, out: [3.1, 3.35] }
const PROMISE = { at: 3.4, text: 'Wait for the boss level: | *the table plan.*', top: 180, size: 84, out: [6.6, 6.9] }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const R1 = 7, R2 = 22, R3 = 37, R4 = 52, R5 = 67, OUT = 82
const SHAKES = [{ at: R3 + 1.2, len: 0.6, amp: 26 }, { at: R3 + 9.0, len: 0.4, amp: 18 }]
const GUESTS = ['#ff8fa0', '#7fd0ff', '#ffd23a', '#9fe6b0', '#c9a6ff']

function ballroomBg(x, Rw, dim = 0) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#3a2a5a'); g.addColorStop(1, '#2a1a3a'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  for (let i = 0; i < 16; i++) { x.fillStyle = ['#ffd98a', '#fff1c8'][i % 2]; x.beginPath(); x.arc(Rw.x + 30 + i * 60, Rw.y + 36 + 16 * Math.sin(i * 0.8), 7, 0, 7); x.fill() }
  if (dim) { x.fillStyle = `rgba(8,4,20,${dim})`; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h) }
}
function chart(x, t, Rw, u) {
  x.fillStyle = '#f4ecd8'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillText('SEATING CHART', 540, Rw.y + 56)
  for (let i = 0; i < 10; i++) { const cx = Rw.x + 110 + (i % 5) * 180, cy = Rw.y + 170 + Math.floor(i / 5) * 200; x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, 60, 0, 7); x.stroke(); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(String(i + 1), cx, cy + 10); for (let s = 0; s < 6; s++) { const a = s / 6 * 6.28; x.fillStyle = i === 8 ? '#ff5c7a' : '#9a90c8'; x.beginPath(); x.arc(cx + Math.cos(a) * 80, cy + Math.sin(a) * 80, 12, 0, 7); x.fill() } }
}
function rsvp(x, t, Rw, u) {
  x.fillStyle = '#2a1c48'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  R(x, INK, 230, Rw.y + 40, 620, 480); R(x, '#fffbea', 238, Rw.y + 48, 604, 464); R(x, GOLD, 258, Rw.y + 68, 564, 6)
  x.fillStyle = INK; x.textAlign = 'center'; x.font = `italic 600 52px 'EB Garamond', serif`; x.fillText('You are invited', 540, Rw.y + 140)
  x.font = `700 30px ${INTER}`; x.textAlign = 'left'; x.fillText('Guest: Capricorn', 300, Rw.y + 230); x.fillText('Plus one:', 300, Rw.y + 300)
  const opts = [['bringing someone', 360], ['just me', 430]]
  opts.forEach(([s, y]) => { R(x, INK, 320, Rw.y + y - 30, 40, 40); R(x, '#fffbea', 325, Rw.y + y - 25, 30, 30); x.fillStyle = INK; x.fillText(s, 380, Rw.y + y) })
  if (u > 5.0) { const k = pop01(u, 5.0, 0.25, 3); x.save(); x.translate(340, Rw.y + 418); x.scale(k, k); x.strokeStyle = '#2a8a4a'; x.lineWidth = 10; x.beginPath(); x.moveTo(-14, 0); x.lineTo(-2, 14); x.lineTo(24, -20); x.stroke(); x.restore(); x.fillStyle = '#2a8a4a'; x.font = `italic 600 40px 'EB Garamond', serif`; x.fillText('(proudly)', 540, Rw.y + 432) }
}
function entrance(x, t, Rw, u) {
  ballroomBg(x, Rw)
  const pts = [[160, 470], [320, 300], [560, 380], [740, 220], [800, 130]]
  const labels = [[320, 300, 'the ex’s cousin'], [560, 380, 'dance floor'], [800, 130, 'SNACK TABLE']]
  const p = prog(u, 1.0, 4.0)
  x.strokeStyle = '#ffd23a'; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath()
  pts.forEach(([a, b], i) => { if (i / (pts.length - 1) > p + 0.01) return; i ? x.lineTo(Rw.x + a, Rw.y + b) : x.moveTo(Rw.x + a, Rw.y + b) }); x.stroke(); x.setLineDash([])
  labels.forEach(([a, b, s], i) => { if (p < (i + 1) / 4) return; x.font = `800 26px ${INTER}`; const w = x.measureText(s).width + 30; R(x, INK, Rw.x + a - w / 2, Rw.y + b - 60, w, 44); R(x, i === 2 ? '#9fe6b0' : '#ff8fa0', Rw.x + a - w / 2 + 4, Rw.y + b - 56, w - 8, 36); x.fillStyle = INK; x.textAlign = 'center'; x.fillText(s, Rw.x + a, Rw.y + b - 30) })
  if (u > 7.0) { drawStarChar(x, 440, Rw.y + 420, 130, t, { color: '#7fd0ff', mood: 'happy', seed: 3 }); drawStarChar(x, 300, Rw.y + 430, 130, t, { color: CAP.color, glyph: CAP.glyph, mood: 'happy', seed: 4, hops: [R2 + 7.2, R2 + 7.8] }); x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('"hi!"', 300, Rw.y + 320) }
}
function boss(x, t, Rw, u) {
  chart(x, t, Rw, u)
  const zoom = ease.inOutCubic(prog(u, 3.0, 4.0))
  if (zoom > 0) {
    x.fillStyle = `rgba(20,12,40,${0.88 * zoom})`; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
    const funny = u > 7.0
    x.globalAlpha = zoom; x.fillStyle = funny ? '#9fe6b0' : '#ff5c7a'; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.fillText(funny ? 'TABLE 9: THE FUN TABLE' : 'TABLE 9: THE SINGLES TABLE', 540, Rw.y + 160)
    GUESTS.forEach((c, i) => drawStarChar(x, 260 + i * 140, Rw.y + 380, 120, t, { color: c, mood: funny ? 'happy' : 'neutral', seed: i + 5, glow: 0.4, hops: funny ? [R3 + 7.2 + i * 0.1, R3 + 8 + i * 0.1] : null }))
    if (funny) for (let i = 0; i < 5; i++) { const ph = (t * 0.7 + i / 5) % 1; x.fillStyle = GUESTS[i]; x.fillRect(260 + i * 140 - 6, Rw.y + 300 - ph * 120, 12, 12) }
    x.globalAlpha = 1
  }
  // boss HUD
  const hp = u < 7.0 ? 1 : 1 - ease.outCubic(prog(u, 7.0, 9.0))
  R(x, INK, Rw.x + 30, Rw.y + Rw.h - 80, Rw.w - 60, 56); R(x, '#2a0a14', Rw.x + 36, Rw.y + Rw.h - 74, Rw.w - 72, 44); R(x, '#ff3b5c', Rw.x + 36, Rw.y + Rw.h - 74, (Rw.w - 72) * hp, 44)
  x.fillStyle = '#fff'; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.fillText('BOSS: THE TABLE PLAN', Rw.x + 52, Rw.y + Rw.h - 42)
}
function slowSong(x, t, Rw, u) {
  ballroomBg(x, Rw, 0.35)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, Rw.y + 300, 20, 540, Rw.y + 300, 420); g.addColorStop(0, 'rgba(255,170,220,0.3)'); g.addColorStop(1, 'rgba(255,170,220,0)'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h); x.restore()
  ;[[250, '#ff8fa0', '#7fd0ff'], [800, '#ffd23a', '#c9a6ff']].forEach(([cx, a, b], i) => { const sw = Math.sin(t * 1.5 + i) * 12; drawStarChar(x, cx - 50 + sw, Rw.y + 380, 140, t, { color: a, mood: 'heart', seed: 10 + i, glow: 0.3 }); drawStarChar(x, cx + 50 + sw, Rw.y + 380, 140, t, { color: b, mood: 'heart', seed: 12 + i, glow: 0.3 }) })
  // the flower girl, hand out
  const fx = key(u, [[0, 640], [4.0, 640], [5.0, 520]])
  drawStarChar(x, fx, Rw.y + 430, 100, t, { color: '#ffb3c6', mood: 'sparkle', seed: 20, hops: [R4 + 4.2, R4 + 4.6, R4 + 8, R4 + 8.4, R4 + 8.8] })
  R(x, '#ff5c7a', fx - 20, Rw.y + 360, 40, 14)
  if (u > 8.0) drawStarChar(x, fx + 100, Rw.y + 410, 150, t, { color: CAP.color, glyph: CAP.glyph, mood: 'happy', seed: 4, hops: [R4 + 8.2, R4 + 8.6, R4 + 9.0, R4 + 9.4] })
  x.fillStyle = BONE; x.font = `italic 600 34px 'EB Garamond', serif`; x.textAlign = 'center'; x.fillText('♪ the slow song ♪', 540, Rw.y + 110)
}
function lastSong(x, t, Rw, u) {
  ballroomBg(x, Rw)
  for (let i = 0; i < 30; i++) { const ph = (t * 0.4 + i * 0.13) % 1; x.fillStyle = GUESTS[i % 5]; x.fillRect(Rw.x + (i * 131) % Rw.w, Rw.y + ph * Rw.h, 12, 12) }
  const all = [...GUESTS, CAP.color]
  all.forEach((c, i) => { const a = t * 1.2 + i / all.length * 6.28; drawStarChar(x, 540 + Math.cos(a) * 280, Rw.y + 330 + Math.sin(a) * 90, 130, t, { color: c, glyph: i === 5 ? CAP.glyph : null, mood: 'happy', seed: i + 5, glow: 0.4, hops: [R5 + i * 0.2, R5 + 1 + i * 0.2, R5 + 2 + i * 0.2, R5 + 3 + i * 0.2, R5 + 4 + i * 0.2, R5 + 5 + i * 0.2, R5 + 6 + i * 0.2, R5 + 7 + i * 0.2, R5 + 8 + i * 0.2, R5 + 9 + i * 0.2, R5 + 10 + i * 0.2] }) })
  x.fillStyle = BONE; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.fillText('TABLE 9 ON THE DANCE FLOOR', 540, Rw.y + 110)
}

const L = makeLong({
  sign: SIGN, duration: DURATION, buttonLabel: 'LEAVE EARLY', buttonCol: '#7a8aa8',
  cam: { tears: [[0, 1], [R4 + 8, 2], [R5, 3]], mood: [[0, 'wide'], [R3 + 7, 'sparkle'], [R5, 'happy']], look: [0, -1], hops: [R5 + 0.5, R5 + 1, R5 + 1.5] },
  intro: {
    at: 0, len: 7, view: chart,
    lines: [{ dt: 1.3, who: 'brain', text: 'a *seating chart.* with *no* plus one.', size: 42, t1: 3.3 }, { dt: 4.3, who: 'heart', text: "it's a *party!* we love parties!", size: 44, t1: 6.8 }],
    brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.7, 2.7], look: [1, -1] }], [1.3, { mood: 'sad', mouth: 'wobble', arms: [2.2, 2.2], sweat: 1 }], [4.3, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4], sweat: 0 }]],
    heart: [[0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], look: [-1, -1] }], [4.3, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6] }]],
    props: (x, t, u) => { // the "+1: NONE" card spinning in
      const p = prog(u, -0.5, 1.6); if (p >= 1) return
      x.save(); x.translate(lerp(700, 1300, p), lerp(1180, 860, p)); x.rotate(-0.3 + p * 6)
      R(x, INK, -110, -60, 220, 120); R(x, '#fffbea', -104, -54, 208, 108); x.fillStyle = '#ff3b5c'; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+1: NONE', 0, 2)
      x.restore()
    },
  },
  rounds: [
    { at: R1, len: 15, n: 1, title: 'THE RSVP', view: rsvp, point: 'heart', call: 'ROUND 1: *HEART.*',
      lines: [{ dt: 1.0, who: 'brain', text: 'we could… bring a *spreadsheet?*', size: 44 }, { dt: 4.4, who: 'heart', text: '*just me.* proudly.', size: 52 }, { dt: 8.0, who: 'brain', text: '…*proudly.* okay.', size: 50 }],
      brain: [[0, { mood: 'sly', mouth: 'smile', arms: [0.4, 2.2] }], [4.4, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [8.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }]],
      heart: [[0, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [4.4, { mood: 'love', mouth: 'grin', arms: [0.4, 2.8] }], [8.0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6] }]] },
    { at: R2, len: 15, n: 2, title: 'THE ENTRANCE', view: entrance, point: 'both', call: 'ROUND 2: *BOTH!*',
      lines: [{ dt: 1.0, who: 'brain', text: 'route planned. *snack table,* then wall.', size: 42 }, { dt: 4.6, who: 'heart', text: 'or we say *hi* to people?' }, { dt: 7.0, who: 'brain', text: '…fine. *one* hi.', size: 50 }],
      brain: [[0, { mood: 'angry', mouth: 'open', arms: [0.4, 2.6] }], [4.6, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [7.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.0] }]],
      heart: [[0, { mood: 'neutral', mouth: 'smile', arms: [0.4, 0.4] }], [4.6, { mood: 'love', mouth: 'grin', arms: [2.4, 0.4] }], [7.0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6] }]] },
    { at: R3, len: 15, n: 3, title: 'BOSS LEVEL: THE TABLE PLAN', view: boss, point: 'heart', call: 'ROUND 3: *HEART.* boss defeated.', alarm: [1.2, 6.8],
      lines: [{ dt: 1.2, who: 'brain', text: 'table 9. the *singles* table.', size: 46, shake: 2 }, { dt: 4.8, who: 'heart', text: 'or… the *fun* table.', size: 50 }, { dt: 9.0, who: 'brain', text: "that's not how it… *oh.*", size: 46 }],
      brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.8, 2.8], sweat: 1 }], [4.8, { mood: 'sad', mouth: 'wobble', arms: [0.4, 0.4] }], [9.0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], sweat: 0 }]],
      heart: [[0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [4.8, { mood: 'sly', mouth: 'grin', arms: [0.4, 2.6] }], [7.0, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }]] },
    { at: R4, len: 15, n: 4, title: 'THE SLOW SONG', view: slowSong, point: 'heart', call: 'ROUND 4: *HEART.*',
      lines: [{ dt: 1.0, who: 'brain', text: 'bathroom. *now.*', size: 54 }, { dt: 4.2, who: 'heart', text: 'the flower girl wants to *dance!*', size: 44 }, { dt: 9.0, who: 'brain', text: "…she's *very* persuasive.", size: 46 }],
      brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.7, 2.7], fn: (t, u) => ({ x: key(u, [[0.8, 250], [2.0, 120], [4.4, 120], [5.2, 250]]), walk: u > 0.8 && u < 2 ? t * 4 : null }) }], [4.2, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [9.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.0] }]],
      heart: [[0, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [4.2, { mood: 'love', mouth: 'grin', arms: [2.6, 0.4] }], [8.0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6], fn: (t) => ({ rot: 0.15 * Math.sin(t * 4) }) }]] },
    { at: R5, len: 15, n: 5, title: 'THE LAST SONG', view: lastSong, point: 'both', call: 'ROUND 5: *BOTH!*',
      lines: [{ dt: 1.0, who: 'heart', text: 'table 9, *ASSEMBLE.*', size: 52 }, { dt: 5.4, who: 'brain', text: '…this is *actually* fun.', size: 48 }],
      brain: [[0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6], fn: (t) => ({ rot: 0.15 * Math.sin(t * 5) }) }], [5.4, { mood: 'happy', mouth: 'grin', arms: [2.8, 2.2], tears: 1, fn: (t) => ({ rot: 0.15 * Math.sin(t * 5) }) }]],
      heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8], fn: (t) => ({ rot: -0.15 * Math.sin(t * 5) }) }]] },
  ],
  outro: {
    at: OUT, len: DURATION - OUT, view: lastSong,
    lines: [{ dt: 0.5, who: 'both', text: 'Table 9 was the *best* table.', size: 50, t1: 99 }],
    brain: [[0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6], fn: (t) => ({ rot: 0.1 * Math.sin(t * 5) }) }]],
    heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6], fn: (t) => ({ rot: -0.1 * Math.sin(t * 5) }) }]],
  },
})

export const SCENES = [L.build, whipZoom(WHIP), screenShake(SHAKE), ...SHAKES.map(screenShake), slamTitle(HOOK), slamTitle(PROMISE), ...L.chapters]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...SHAKES.flatMap(shakeCues), ...slamTitleCues(HOOK), ...slamTitleCues(PROMISE),
  ['whoosh', 0.0, 0.8, 0.05],
  ['pop', R1 + 5.0, 1174.66, 0.05, 0], ['tick', R1 + 5.0, 0.08],
  ...[0, 1, 2].map(i => ['pop', +(R2 + 1.75 + i * 0.75).toFixed(2), 932.33, 0.035, 0]), ['pop', R2 + 7.2, 1396.91, 0.04, -0.3],
  ['riser', R3, R3 + 1.2, 0.05], ['boom', R3 + 4.0, 0.2], ['riser', R3 + 7.0, R3 + 9.0, 0.05], ['bell', R3 + 9.0, 1864.66, 0.04, 1.2, 0], ['glitter', R3 + 9.0, R3 + 9.6],
  ['pluck', R4 + 4.2, 1396.91, 0.04, 0.6, 0.2], ['glitter', R4 + 8.0, R4 + 8.5],
  ...Array.from({ length: 10 }, (_, i) => ['tom', +(R5 + i).toFixed(2), 90, { gain: 0.12, decay: 0.15 }]),
  ['bell', OUT + 0.55, 1174.66, 0.03, 1.6, 0],
  ...L.cues,
]
