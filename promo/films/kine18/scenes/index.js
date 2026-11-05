// kine18: IS THIS NORMAL? (long), "Never been in a relationship" (63.6 s vertical, star_advice post, music: lofi · Bb).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Never dated. | Everyone else *has.*" landed; ♈ Aries mid-cringe as the group chat lights up.
//              Whip zoom.  2.4: promise sticker "the last chapter, *though.*"
//   CH 1 · THE QUESTION (2.6)
//     2.6   "Everyone has a story. | I have *none.*"  The group chat fills with date stories; 6.0 "wait, you've NEVER
//           dated?"; 6.2 record scratch: "the group chat *went quiet.*"  9.6 "Am I… | *behind?*" A game HUD: LEVEL ??,
//           an empty XP bar. ♓ Pisces in the chat: "I'm crying reading this".
//   CH 2 · THE MYTHS (16.0)  THE STARS: "let's check a few *myths.*" Myth cards get stamped FALSE: "You're behind."
//           "Something's wrong with you." "It'll never happen."
//   CH 3 · THE TRUTH (30.5)
//    31.0   "everyone's timeline is *different.*"  Timelines with first-date dots all over the place.
//    37.4   "you've been building a *life.*"  Trophies pop: friends, a skill, a trip, knowing yourself.
//    43.8   "when it's right, it won't feel *late.*"  A clock with no hands; stars where the numbers were.
//   CH 4 · THE LAST CHAPTER (50.5)
//    51.0   NORMAL-O-METER: SO NORMAL.  56.0 Aries at a party, laughing with a ♎ Libra over a talk card. No pressure.
//    57.0   "no countdown. no rush. just *you,* out there."  Pisces fountains.
//    62.0   last line: "No timer. No rush. | Just your *life.*"  Hard cut at 63.6.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, sparkles, hearts, confetti, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 63.6, FLOOR = 1480
const LIB = signStar('libra')
const CH = [2.6, 16.0, 30.5, 50.5]
const T = {
  h0Out: [2.4, 2.6], promise: 2.4,
  h1: 2.6, h1Out: [9.4, 9.6], chat: [3.4, 4.2, 5.0], never: 6.0, rec: 6.25, h2: 9.6, h2Out: [15.6, 15.8], hud: 10.4, pisMsg: 12.4,
  myths: [17.0, 21.5, 26.0], falseAt: [18.6, 23.1, 27.6],
  truth: [31.0, 37.4, 43.8],
  meter: 51.0, mOut: [55.6, 55.9], party: 56.0, laugh: 58.4, last: 62.0,
}
const REC = { at: T.rec, len: 1.4, caption: 'the group chat *went quiet.*', top: 1640 }
const MYTHS = ['You’re behind.', 'Something’s wrong with you.', 'It’ll never happen.']

function room2(x, t, warm = 0) {
  room(x, { y: FLOOR, wall: warm ? '#3a2448' : '#1e1a40', floor: '#2a2450' })
  if (warm) { for (let i = 0; i < 12; i++) { const lx = 60 + i * 88, ly = 470 + 22 * Math.sin(i); glowAt(x, lx, ly, 40, '255,214,150', 0.5); R(x, i % 2 ? GOLD : PINK, lx - 8, ly - 6, 16, 16) } }
}
function chatPanel(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 880); x.scale(1.4 * k, 1.4 * k)
  box(x, -300, -300, 600, 560, '#120c2a', { b: 9 }); R(x, '#1f1747', -300, -300, 600, 70)
  x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('the group chat (6)', 0, -264)
  const msgs = [
    [T.chat[0], 'L', '♉', 'my first date was mini golf lol'],
    [T.chat[1], 'L', '♊', 'mine cried at the movie (it was me)'],
    [T.chat[2], 'L', '♌', 'ok but remember my ex and the karaoke'],
    [T.never, 'L', '♏', "wait. aries, you've NEVER dated?"],
    [T.pisMsg, 'L', '♓', "I'm crying reading this"],
  ].filter(m => t >= m[0] || (t < CH[0] && m[0] === T.never))
  const show = msgs.slice(-4)
  show.forEach((m, i) => {
    const kk = t < CH[0] ? 1 : pop01(t, m[0], 0.22, 2.4), y = -170 + i * 110
    x.save(); x.translate(-270, y); x.scale(kk, kk)
    x.font = `600 26px ${INTER}`
    const w = x.measureText(m[3]).width + 40
    R(x, m[2] === '♏' ? '#7a2a4a' : '#3b3466', 50, -32, w, 64)
    x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(m[3], 70, 2)
    x.font = `800 30px ${INTER}`; x.fillText(m[2] + '︎', 0, 2)
    x.restore()
  })
  x.restore()
}
function hud(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  box(x, 90, 520, 900, 120, '#0b0716', { b: 6 })
  x.font = `700 30px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('PLAYER: ARIES', 120, 556); x.fillText('LEVEL: ??', 700, 556)
  x.fillText('XP', 120, 606); box(x, 190, 590, 760, 32, '#1a1238', { b: 4 })
  const blink = Math.floor(t * 3) % 2 ? 'rgba(125,255,176,0.25)' : 'rgba(125,255,176,0.05)'
  R(x, blink, 194, 594, 20, 24)
  x.restore()
}
function mythCard(x, t, i, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.rotate([-0.04, 0.03, -0.02][i]); x.scale(k, k)
  box(x, -380, -170, 760, 340, BONE, { b: 8 })
  x.font = `700 26px ${MONO}`; x.fillStyle = '#8a2b4e'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`MYTH #${i + 1}`, 0, -110)
  x.font = `800 ${i === 1 ? 44 : 56}px ${INTER}`; x.fillStyle = INK; x.fillText(MYTHS[i], 0, 0)
  const fa = T.falseAt[i]
  if (t > fa - 0.02) {
    const p = prog(t, fa - 0.02, fa + 0.08), sc = lerp(1.7, 1, ease.outCubic(p))
    x.save(); x.translate(120, 80); x.rotate(-0.15); x.scale(sc, sc); x.globalAlpha = clamp(p * 2)
    x.strokeStyle = RED; x.lineWidth = 10; x.strokeRect(-160, -54, 320, 108); x.font = `800 84px ${INTER}`; x.fillStyle = RED; x.fillText('FALSE', 0, 6)
    x.restore()
  }
  x.restore()
}
function timelines(x, t, k, a) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  const rows = [['♉', 0.2], ['♊', 0.75], ['♈', 0.5], ['♍', 0.9], ['♒', 0.35]]
  rows.forEach(([g, at], i) => {
    const y = 660 + i * 120, p = ease.inOutCubic(prog(t, a + 0.3 + i * 0.25, a + 2.0 + i * 0.25))
    x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g + '︎', 120, y)
    R(x, 'rgba(239,230,214,0.25)', 180, y - 3, 800, 6); R(x, i === 2 ? MINT : GOLD, 180, y - 3, 800 * p, 6)
    if (p > at) { const dx = 180 + 800 * at; drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i === 2 ? MINT : PINK }, dx, y, 6) }
  })
  label(x, 'first-date dots: all over the place.', 540, 1290, { size: 26, col: BONE, alpha: prog(t, a + 2.5, a + 3) })
  x.restore()
}
const TROPHIES = [['FRIENDS', '#ff8fb1'], ['A SKILL', '#7fd0ff'], ['A BIG TRIP', '#9fe6b0'], ['KNOWING ME', GOLD]]
function trophies(x, t, k, a) {
  if (k <= 0.01) return
  TROPHIES.forEach(([cap, col], i) => {
    const kk = pop01(t, a + 0.8 + i * 0.9, 0.3, 2.6) * k
    if (kk <= 0.01) return
    const cx = 220 + (i % 2) * 640, cy = 700 + Math.floor(i / 2) * 330
    x.save(); x.translate(cx, cy); x.scale(kk, kk)
    drawBits(x, ['TTTTTTT', 'TTTTTTT', '.TTTTT.', '..TTT..', '...T...', '..TTT..', '.BBBBB.'], { T: col, B: '#8a6440' }, 0, 0, 22)
    x.restore()
    label(x, cap, cx, cy + 130, { size: 28, col, font: INTER, weight: 800, alpha: kk })
    sparkles(x, t, cx, cy, a + 0.8 + i * 0.9, 8, 120, i, [col, BONE])
  })
}
function starClock(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 840); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 250, 0, Math.PI * 2); x.fill(); x.fillStyle = '#20184a'; x.beginPath(); x.arc(0, 0, 236, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; drawBits(x, ['.S.', 'SSS', '.S.'], { S: GOLD }, Math.cos(a) * 190, Math.sin(a) * 190, 8 + 3 * Math.sin(t * 3 + i), { outline: null }) }
  label(x, 'no hands.', 0, 0, { size: 36, col: BONE, font: INTER, weight: 800 })
  x.restore()
}

const EP = makeNormal({
  id: 'kine18', D, ending: 'cut', hero: 'aries',
  hook: { text: 'Never dated. | Everyone else *has.*', out: T.h0Out, accentColor: '#ff8b9b' },
  promise: { text: 'the last chapter, *though.*', at: T.promise, out: [5.6, 5.9], top: 1640 },
  rec: REC,
  chapters: [
    { at: CH[0], out: [CH[0] + 3.0, CH[0] + 3.3], n: 1, title: 'the question', y: 450 },
    { at: CH[1], out: [CH[1] + 3.0, CH[1] + 3.3], n: 2, title: 'the myths', y: 450, color: CYAN },
    { at: CH[2], out: [CH[2] + 3.0, CH[2] + 3.3], n: 3, title: 'the truth', y: 450, color: MINT },
    { at: CH[3], out: [CH[3] + 3.0, CH[3] + 3.3], n: 4, title: 'the last chapter', y: 450, color: PINK },
  ],
  heads: [
    { text: 'Everyone has a story. | I have *none.*', at: T.h1, out: T.h1Out, size: 92, accent: '#ff8b9b', late: 1, lateAt: T.h1 + 0.6 },
    { text: 'Am I… | *behind?*', at: T.h2, out: T.h2Out, size: 104, accent: '#ff8b9b', late: 1, lateAt: T.h2 + 0.5 },
  ],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  boxes: [
    { lines: [{ t: 16.5, text: "let's check a few *myths.*" }], close: 29.8, y: 1460 },
    { lines: [{ t: 31.0, text: "everyone's timeline is *different.*" }, { t: 37.4, text: "you've been building a *life.* that counts." }, { t: 43.8, text: "when it's right, it won't feel *late.*" }], close: 49.9, y: 1460 },
    { lines: [{ t: 57.0, text: 'no countdown. no rush. just *you,* out there.' }], close: 61.7, y: 1460 },
  ],
  stars: { in: 16.2 },
  last: { text: 'No timer. No rush. | Just your *life.*', at: T.last, lateAt: T.last + 0.55, accent: GOLD, size: 96 },
  punches: [CH[0], ...T.chat, T.never, T.h2, T.hud, CH[1], ...T.falseAt, CH[2], ...T.truth, CH[3], T.meter + 1.75, T.party, T.laugh],
  shakes: [{ t: 0, a: 14 }, { t: T.never, a: 14 }, ...T.falseAt.map(f => ({ t: f, a: 14 }))],
  scene(x, t, S) {
    const pis = o => S.pis(x, t, o)
    if (t < CH[1]) {
      room2(x, t)
      const cringe = t < 0.8 || (t > T.never && t < T.h2)
      if (t < T.h2) chatPanel(x, t, t < CH[0] ? 1 : 1)
      else hud(x, t, pop01(t, T.hud, 0.3, 2.2))
      S.hero(x, t, { x: 250, y: 1330, s: t < T.h2 ? 320 : 380, mood: cringe ? 'wide' : t > T.h2 ? 'squint' : 'neutral', look: [1, -1], squash: cringe ? 0.1 + 0.03 * Math.sin(t * 20) : 0, hops: [...T.chat, T.never, T.h2] })
      pis({ x: 870, y: 1350, s: 220, tears: t > T.pisMsg ? 3 : 2, mood: 'sparkle', look: [-1, -0.8], tissues: 'left' })
      return
    }
    if (t < CH[2]) {
      room2(x, t)
      const i = t < T.myths[1] ? 0 : t < T.myths[2] ? 1 : 2
      const a = T.myths[i], b = i < 2 ? T.myths[i + 1] : CH[2] - 0.3
      mythCard(x, t, i, pop01(t, a, 0.35, 2.3) * outK(t, [b - 0.3, b]))
      S.hero(x, t, { x: 230, y: 1300, s: 220, mood: t > T.falseAt[i] ? 'happy' : 'neutral', look: [1, -1], hops: [T.falseAt[i] + 0.1] })
      pis({ x: 860, y: 1300, s: 210, tears: 3, mood: t > T.falseAt[i] ? 'happy' : 'wide', look: [-1, -1], hops: [T.falseAt[i] + 0.2], tissues: 'left' })
      S.stars(x, t, { x: 140, y: 620, s: 120, pop: pop01(t, 16.2, 0.35, 2.1), mood: 'happy', look: [1, 0.4] })
      return
    }
    if (t < CH[3]) {
      room2(x, t)
      const i = t < T.truth[1] ? 0 : t < T.truth[2] ? 1 : 2
      const a = T.truth[i], b = i < 2 ? T.truth[i + 1] : CH[3] - 0.3, k = pop01(t, a, 0.35, 2.2) * outK(t, [b - 0.3, b])
      if (i === 0) timelines(x, t, k, a)
      else if (i === 1) trophies(x, t, k, a)
      else starClock(x, t, k)
      S.hero(x, t, { x: 220, y: 1340, s: 200, mood: 'happy', look: [1, -1], hops: [a + 1, a + 3, a + 5] })
      pis({ x: 880, y: 1340, s: 190, tears: i === 2 ? 3 : 2, mood: 'sparkle', look: [-1, -1], hops: [a + 2, a + 4] })
      S.stars(x, t, { x: 960, y: 620, s: 110, mood: 'happy', look: [-1, 0.4] })
      return
    }
    // CH4
    room2(x, t, t > T.party ? 1 : 0)
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut) * pop01(t, CH[3] + 0.2, 0.3, 2), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 180, mood: t > land ? 'sparkle' : 'wide', look: [1, -1], pop: k, hops: [land] })
      pis({ x: 850, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      const k = pop01(t, T.party, 0.35, 2.1)
      // the party: a little table with a talk card between them
      box(x, 330, 1220, 420, 28, '#8a6440', { b: 7 }); R(x, INK, 528, 1248, 24, FLOOR - 1248)
      if (t > T.party + 0.6) { x.save(); x.translate(540, 1180); x.rotate(-0.05); x.scale(pop01(t, T.party + 0.6, 0.3, 2.4), pop01(t, T.party + 0.6, 0.3, 2.4)); box(x, -100, -60, 200, 120, '#2a1f55', { b: 6 }); x.font = `700 18px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('TALK CARD', 0, -30); x.font = `800 22px ${INTER}`; x.fillStyle = BONE; x.fillText('best snack ever?', 0, 10); x.restore() }
      S.hero(x, t, { x: 280, y: 1100, s: 300, pop: k, mood: t > T.laugh ? 'happy' : 'sparkle', look: [1, 0], hops: [T.party + 0.3, T.laugh, T.laugh + 0.35, T.laugh + 0.7] })
      drawStarChar(x, 800, 1100, 290, t, { color: LIB.color, glyph: LIB.glyph, mood: t > T.laugh ? 'happy' : 'sparkle', look: [-1, 0], seed: 8, pop: k, hops: [T.laugh, T.laugh + 0.4] })
      bubble(x, t, 330, 840, T.party + 1.2, T.laugh + 1.2, 'cold pizza. fight me.', { size: 32, tail: -0.4 })
      bubble(x, t, 760, 840, T.laugh, D, 'okay you’re FUNNY', { size: 32, col: '#c9ecfb', tail: 0.4 })
      if (t > T.laugh) { label(x, 'HA', 220, 860, { size: 44, col: GOLD, font: INTER, weight: 800, alpha: outK(t, [T.laugh + 0.8, T.laugh + 1.0]) }); confetti(x, t, T.laugh, 540, 900) }
      pis({ x: 540, y: 700, s: 170, pop: k, tears: 3, mood: 'happy', look: [0, 1], hops: [T.laugh + 0.2, T.last + 0.5] })
      S.stars(x, t, { x: 960, y: 620, s: 110, mood: 'happy', look: [-1, 0.4] })
    }
  },
  cues: [
    ['pop', 0.04, 587.33, 0.04, 0], ['tick', 0.0, 0.06],
    ...T.chat.map((c, i) => ['pop', c, [880, 987.77, 1174.66][i], 0.04, -0.3]), ['pop', T.never, 523.25, 0.05, 0], ['pop', T.never + 0.08, 493.88, 0.045, 0],
    ['pop', T.hud, 1760, 0.035, 0], ['tick', T.hud + 0.1, 0.06], ['pop', T.pisMsg, 987.77, 0.04, 0.4],
    ...T.myths.map(m => ['whoosh', r3(m - 0.05), 0.3, 0.04]), ...T.falseAt.flatMap(f => [['boom', f, 0.25], ['tom', f, 92, { gain: 0.24, decay: 0.25 }]]),
    ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.truth[0] + 1.9 + i * 0.25), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.03, 0]),
    ...[0, 1, 2, 3].map(i => ['pop', r3(T.truth[1] + 0.8 + i * 0.9), [987.77, 1174.66, 1318.51, 1567.98][i], 0.045, (i % 2 ? 0.3 : -0.3)]), ['glitter', T.truth[1] + 0.8, T.truth[1] + 3.8],
    ['bell', T.truth[2] + 0.4, 1760, 0.03, 1.5, 0], ['glitter', T.truth[2] + 0.4, T.truth[2] + 1.0],
    ['whoosh', T.party, 0.4, 0.04], ['pop', T.party + 0.6, 1174.66, 0.04, 0], ['pop', T.party + 1.2, 880, 0.04, -0.3],
    ['pop', T.laugh, 1318.51, 0.05, 0.3], ['glitter', T.laugh, T.laugh + 0.6], ['pluck', T.laugh + 0.3, 1567.98, 0.04, 0.5, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hook, LAV, hearts, shadow]
