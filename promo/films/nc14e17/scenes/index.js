// nc14e17: CUFFING SEASON, "Who texts first when it's freezing" (32 s vertical, promo/films/next30/b02.md, music: chiptune · B)
// Story 0–27.6, then the shared end card. The season look lives in ../../nc14e13/cuffkit.js.
//   0.0–6.0    "It's freezing. | Who texts *first?*"  Frame 0: a split screen, ♏ Scorpio (left) and ♉ Taurus (right) under
//              blankets, each glaring at a phone; a "9:02 PM" stamp. Drafts typed and deleted: "u up" / "hey".
//   6.0–13.2   "Hour *two.*"  10:15 PM, 11:40 PM. SCORPIO: "if i text first, i *lose.*"  TAURUS: "if i text first, i'm
//              *too much.*"  Pisces in the gap between the screens: "both of you, PLEASE!!"  (the ghost, 10.6)
//  13.2        card cut.
//  13.3–20.6   "Texting first is | *caring out loud.*"  THE STARS: "texting first isn't losing. it's *caring out loud.*" →
//              "and someone's waiting to *hear it.*"  Both send at the same second (19.2): "are you warm?" / "you warm?"
//  20.6–27.1   Both screens light up; both laugh; "now i am." Last line: "Freezing is a great | excuse to *go first.*"
import { makeEp, star, phone, blanket, windowFrame, room, bubble, hearts, sparkles, label, R, glow,
  pop01, outK, prog, lerp, clamp, ease, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, INK, BONE, MONO, r3 } from '../../nc14e13/cuffkit.js'

const SP = 'THE STARS', SCO = '♏︎ SCORPIO', TAU = '♉︎ TAURUS', SC = '#ff8fa8', TC = '#ffd27a'
const L2 = [
  { t: 6.5, speaker: SCO, color: SC, text: 'if i text first, i *lose.*' },
  { t: 9.2, speaker: TAU, color: TC, text: "if i text first, i'm *too much.*" },
]
const L3 = [
  { t: 13.6, speaker: SP, text: "texting first isn't losing. it's *caring out loud.*" },
  { t: 16.7, speaker: SP, text: "and someone's waiting to *hear it.*" },
]
const T = { b2: 6.0, cut: 13.2, b3: 13.3, send: 19.2, fin: 20.6, now: 21.6 }
const CLOCK = [[0, '9:02 PM'], [6.0, '10:15 PM'], [9.8, '11:40 PM'], [T.send, '11:41 PM']]
const SCO_P = {
  msgs: [{ at: T.send, side: 'R', text: 'are you warm?', col: '#c42a4f' }, { at: T.send + 0.1, side: 'L', text: 'you warm?' }, { at: T.now + 0.4, side: 'L', text: 'now i am.' }],
  draft: [{ at: 0.6, text: 'u up', del: 2.4 }, { at: 7.0, text: 'thinking about u', del: 8.6 }, { at: 17.8, text: 'are you warm?', sent: T.send }],
}
const TAU_P = {
  msgs: [{ at: T.send, side: 'R', text: 'you warm?', col: '#b07a1e' }, { at: T.send + 0.1, side: 'L', text: 'are you warm?' }, { at: T.now, side: 'R', text: 'now i am.', col: '#b07a1e' }],
  draft: [{ at: 1.4, text: 'hey', del: 3.0 }, { at: 10.4, text: 'are you warm', del: 11.8 }, { at: 18.2, text: 'you warm?', sent: T.send }],
}
const SCO_HOPS = [0.3, 2.4, ...talkHops(L2, SCO, { cps: 30 }), T.send, T.send + 0.5, 22.2, 24.0]
const TAU_HOPS = [0.4, 3.0, ...talkHops(L2, TAU, { cps: 30 }), T.send + 0.05, T.now, 22.4, 24.2]

function side(x, t, cx, id, P, col, mood, title, hops, wall, wall2, blCol) {
  x.save(); x.beginPath(); x.rect(cx - 270, 400, 540, 990); x.clip()
  room(x, { wall, wall2, floorY: 1290, floor: '#2f2430' })
  windowFrame(x, t, cx - 230, 470, 460, 380, { frost: 1 })
  const lit = t > T.send ? 1 : 0.25
  glow(x, cx, 1000, 300, lit, '170,200,255')
  star(x, t, id, { x: cx, y: 1075, s: 270, mood, look: [0, -1], hops, seed: id.length + 2, hat: col })
  blanket(x, t, cx, 1160, 440, 130, blCol, BONE)
  phone(x, t, { cx, top: 470, w: 400, h: 400, title, ...P })
  x.restore()
}

function scene(x, t, K) {
  const ok = K.ok
  x.globalAlpha = 1
  const scoMood = t < T.b3 ? 'squint' : t < T.send ? 'neutral' : t < T.send + 0.4 ? 'wide' : 'happy'
  const tauMood = t < T.b2 ? 'squint' : t < T.b3 ? 'wide' : t < T.send ? 'neutral' : t < T.send + 0.4 ? 'wide' : 'heart'
  side(x, t, 268, 'scorpio', SCO_P, '#e23d66', scoMood, '♉︎ Taurus', SCO_HOPS, '#2a1838', '#331d44', '#5a2a6a')
  side(x, t, 812, 'taurus', TAU_P, '#e9b24a', tauMood, '♏︎ Scorpio', TAU_HOPS, '#1f2440', '#262c4e', '#2a6a5a')
  // the divider between the two screens
  R(x, INK, 530, 400, 20, 990); R(x, ICE, 536, 400, 8, 990)
  // the time stamp, top centre of the split
  let clk = CLOCK[0][1]; for (const [a, s] of CLOCK) if (t >= a) clk = s
  const jump = CLOCK.reduce((m, [a]) => (t > a && t < a + 0.3 && a > 0 ? 1 - (t - a) / 0.3 : m), 0)
  x.save(); x.translate(540, 422); x.scale(1 + 0.25 * jump, 1 + 0.25 * jump)
  x.font = `700 40px ${MONO}`; const w = x.measureText(clk).width + 40
  R(x, INK, -w / 2 - 6, -30, w + 12, 66); R(x, '#14102a', -w / 2, -24, w, 54)
  x.fillStyle = ICE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(clk, 0, 4)
  x.restore()
  // Pisces in the gap, crying for both of them
  const pp = pop01(t, 11.8, 0.35, 2.2) * outK(t, [T.b3 - 0.2, T.b3]) + (t > T.fin ? pop01(t, T.fin + 0.2, 0.35, 2) * ok : 0)
  if (pp > 0.01) star(x, t, 'pisces', { x: 540, y: 1290, s: 160, pop: pp, mood: t > T.fin ? 'heart' : 'wide', look: [0, -1], tears: 3, seed: 6, hops: [11.9, 12.4, T.fin + 0.3, 23.0] })
  else star(x, t, 'pisces', { x: 540, y: 1360, s: 110, mood: 'sparkle', look: [0, -1], tears: 2, seed: 6, pop: 0.8 * ok })
  bubble(x, t, 540, 1190, 11.9, 13.1, 'both of you, PLEASE!!', { size: 34, col: '#e2deff' })
  // THE STARS over the divider
  const stk = pop01(t, T.b3, 0.4, 2) * outK(t, [T.fin - 0.2, T.fin])
  if (stk > 0.01) star(x, t, 'stars', { x: 540, y: 920, s: 150, pop: stk, mood: t > T.send ? 'sparkle' : 'happy', hops: [T.b3 + 0.2, ...talkHops(L3, SP, { cps: 30 })], seed: 2 })
  // the same-second send
  sparkles(x, t, 268, 700, T.send, 10, 170, 1, [SC, GOLD, BONE]); sparkles(x, t, 812, 700, T.send, 10, 170, 2, [TC, GOLD, BONE])
  if (t > T.send && t < T.send + 1.4) { const k = pop01(t, T.send + 0.1, 0.3, 2.6) * outK(t, [T.send + 1.1, T.send + 1.4]); label(x, 'SAME SECOND!', 540, 1250, { size: 46 * k, col: GOLD, font: "Inter, sans-serif", weight: 800, rot: -0.06 }) }
  hearts(x, t, T.fin + 0.2, 268, 960, { n: 5, cell: 7 }); hearts(x, t, T.fin + 0.3, 812, 960, { n: 5, cell: 7 })
}

const EP = makeEp({
  id: 'nc14e17', ep: 17, duration: 32, key: 'B',
  heads: [
    { text: "It's freezing. | Who texts *first?*", at: -1.2, out: [5.8, 6.0], accentColor: ICE, size: 100, accentSize: 140, top: 150 },
    { text: 'Hour *two.*', at: T.b2 + 0.1, out: [13.0, 13.2], accentColor: SC, size: 112, accentSize: 150, top: 170 },
    { text: 'Texting first is | *caring out loud.*', at: T.b3 + 0.05, out: [20.4, 20.6], accentColor: GOLD, size: 96, accentSize: 128, top: 150 },
    { text: 'Freezing is a great | excuse to *go first.*', at: T.fin + 0.1, late: 2, lateAt: 21.6, wobble: true, out: [27.0, 27.3], accentColor: TC, size: 90, accentSize: 128, top: 150 },
  ],
  boxes: [
    { lines: L2, open: 6.3, close: 13.0 },
    { lines: L3, open: 13.4, close: 20.4 },
  ],
  ghost: { at: 10.6, x: 548, y: 760, from: 'left', cell: 3 },
  cuts: [6.0, { t: T.cut, kind: 'shuffle' }, 20.6],
  snow: 0, ground: false,
  scene,
  cues: [
    ...[0.6, 1.4, 7.0, 10.4, 17.8, 18.2].flatMap(a => Array.from({ length: 6 }, (_, i) => ['tick', r3(a + i * 0.12), 0.012])),
    ...[2.4, 3.0, 8.6, 11.8].map(a => ['pluck', a, 440, 0.025, 0.4, 0]),
    ...[6.0, 9.8].map(a => ['pop', a, 1567.98, 0.045, 0]), ['whoosh', 6.0, 0.3, 0.03], ['whoosh', 9.8, 0.3, 0.03],
    ['pop', 11.9, 1318.51, 0.04, 0], ['pop', T.b3 + 0.2, 987.77, 0.04, 0], ['glitter', T.b3, T.b3 + 0.4],
    ['pop', T.send, 1318.51, 0.05, -0.4], ['pop', T.send, 1318.51, 0.05, 0.4], ['bell', T.send + 0.1, 1760, 0.035, 1.2, 0], ['glitter', T.send, T.send + 0.6],
    ['pop', T.now, 1174.66, 0.04, 0.4], ['pop', T.now + 0.4, 1174.66, 0.04, -0.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [SNOW, PINK, RED, MINT, clamp, lerp, ease, prog]
