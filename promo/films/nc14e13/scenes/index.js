// nc14e13: CUFFING SEASON, "Pisces cries at the first snow" (30 s vertical, promo/films/next30/b02.md, music: dreamy · Eb)
// Story 0–25.6, then the shared end card. The season look lives in ../cuffkit.js (shared by nc14e13–nc14e24).
//   0.0–6.0    "The first snow. | *Pisces* is not okay."  Frame 0: Pisces at a frosty window, mid-sob, a big flake stuck
//              to the glass. PISCES: "every single one is *different!!*"  A snowman rolls up outside: "he has a *scarf!!*"
//   6.0–13.6   "Then the | *real* feeling."  On the couch: Pisces types "it's snowing. thought of you" to ♈ Aries…
//              deletes it. PISCES: "is 'thought of you' too *much?*"  (the ghost peeks round the window frame, 11.0)
//  13.6        card cut.
//  13.7–20.5   "“Thought of you” is | never *too much.*"  THE STARS float in at the window. Pisces retypes, sends (18.6).
//              Reply: "come see it with me?"  Pisces fountains.
//  20.6–25.1   Outside in the snow, Pisces and Aries in bobble hats, catching flakes. Last line: "The snow can't text them.
//              | *You* can."
import { makeEp, star, room, windowFrame, couch, phone, snowman, bubble, hearts, sparkles, shadow, ground, drawBits, FLAKE,
  pop01, outK, popOut, prog, lerp, clamp, ease, win, talkHops, SNOW, ICE, PINK, GOLD, RED, MINT, r3 } from '../cuffkit.js'

const PSP = '♓︎ PISCES', SP = 'THE STARS', PC = '#b9b4ff'
const LINES1 = [
  { t: 1.0, speaker: PSP, color: PC, text: 'every single one is *different!!*' },
  { t: 3.7, speaker: PSP, color: PC, text: 'and he has a *scarf!!*' },
]
const LINES2 = [
  { t: 9.9, speaker: PSP, color: PC, text: "is 'thought of you' too *much?*" },
]
const LINES3 = [
  { t: 14.1, speaker: SP, text: "'this made me think of you' is never *too much.*" },
  { t: 17.0, speaker: SP, text: "it's not pressure. it's a *snowflake.*" },
]
const T = { s2: 6.0, cut: 13.6, s3: 13.7, send: 18.6, reply: 19.6, s4: 20.6 }
const MSGS = [
  { at: T.send, side: 'R', text: "it's snowing. thought of you", col: '#7c74f0' },
  { at: T.reply, side: 'L', text: 'come see it with me?' },
]
const DRAFT = [
  { at: 7.0, text: "it's snowing. thought of you", del: 9.0 },
  { at: 16.4, text: "it's snowing. thought of you", sent: T.send },
]
const PIS_HOPS = [0.4, 1.0, 1.6, 3.75, 4.3, ...talkHops(LINES2, PSP, { cps: 30 }), T.send + 0.05, T.reply + 0.1, T.reply + 0.5, T.s4 + 0.2, 22.0, 23.4]
const STAR_HOPS = [T.s3 + 0.2, ...talkHops(LINES3, SP, { cps: 30 })]

function scene(x, t, K) {
  const ok = K.ok
  if (t < T.s4) {
    room(x, { wall: '#271c48', wall2: '#2f2354', floorY: 1210, floor: '#3b2b34' })
    windowFrame(x, t, 170, 440, 740, 600)
    // the snowman rolls in outside (behind the glass, so drawn inside its clip)
    const sm = ease.outBack(prog(t, 3.3, 3.9))
    if (sm > 0 && t < T.s2) { x.save(); x.beginPath(); x.rect(170, 440, 740, 600); x.clip(); snowman(x, t, lerp(1050, 760, sm), 1030, 0.75); x.restore() }
  }
  // ── 0–6: at the window
  if (t < T.s2) {
    const fk = 1 - prog(t, 5.4, 5.8)
    drawBits(x, FLAKE, { W: SNOW }, 400, 640, 14, { alpha: fk, rot: 0.2 * Math.sin(t) })
    shadow(x, 540, 1215, 300)
    star(x, t, 'pisces', { x: 540, y: 1060, s: 330, mood: t < 3.6 ? 'wide' : 'sparkle', look: t < 3.6 ? [-1, -1] : [1, -0.4], tears: 3, hops: PIS_HOPS, seed: 6 })
    sparkles(x, t, 760, 900, 3.85, 8, 110, 1, [SNOW, ICE, GOLD])
    return
  }
  // ── 6–20.6: the couch and the phone
  if (t < T.s4) {
    couch(x, 330, 1240, 560, '#4a3d8e')
    const typing = t > 7.0 && t < 9.0 || t > 16.4 && t < T.send
    star(x, t, 'pisces', { x: 300, y: 1050, s: 250, mood: t < 9.0 ? 'happy' : t < T.s3 ? 'wide' : t < T.reply ? 'squint' : 'heart', look: [1, -0.6], tears: t > T.reply ? 3 : t > 9.0 ? 2 : 1, hops: PIS_HOPS, seed: 6, squash: typing ? 0.03 * Math.sin(t * 30) : 0 })
    const pin = ease.outBack(prog(t, T.s2, T.s2 + 0.4))
    phone(x, t, { cx: 760, top: lerp(1900, 560, pin), w: 460, h: 640, title: '♈︎ Aries', msgs: MSGS, draft: DRAFT, clock: '9:41 PM' })
    bubble(x, t, 330, 760, 9.05, 9.85, 'too much?', { thought: true, size: 34 })
    sparkles(x, t, 760, 900, T.send, 10, 160, 2, [PINK, GOLD, ICE])
    hearts(x, t, T.reply + 0.15, 300, 880, { n: 6 })
    // THE STARS float in at the window
    const sk = pop01(t, T.s3, 0.4, 2) * outK(t, [T.s4 - 0.3, T.s4])
    if (sk > 0.01) star(x, t, 'stars', { x: 300, y: 640, s: 180, pop: sk, mood: t > T.reply ? 'sparkle' : 'happy', hops: STAR_HOPS, seed: 2 })
    return
  }
  // ── 20.6–25.1: outside, together, catching snow
  ground(x, t, 1180)
  const ak = pop01(t, T.s4 + 0.1, 0.4, 2.2) * ok, pk = pop01(t, T.s4, 0.4, 2.2) * ok
  shadow(x, 360, 1190, 260 * ok); shadow(x, 720, 1190, 260 * ok)
  star(x, t, 'pisces', { x: 360, y: 1030, s: 280, pop: pk, mood: 'heart', look: [1, -0.6], tears: 3, hat: '#7c74f0', scarf: PINK, hops: PIS_HOPS, seed: 6 })
  star(x, t, 'aries', { x: 720, y: 1030, s: 280, pop: ak, mood: t > 22.6 ? 'happy' : 'sparkle', look: [-1, -0.6], hat: RED, scarf: GOLD, hops: [T.s4 + 0.3, 21.6, 23.0], seed: 3 })
  // one big flake drifts down between them, they both look up
  const fy = lerp(560, 860, ease.inOutCubic(prog(t, 21.0, 23.5)))
  drawBits(x, FLAKE, { W: SNOW }, 540 + 20 * Math.sin(t * 1.4), fy, 12, { alpha: ok })
  hearts(x, t, 23.6, 540, 860, { n: 5, cell: 7 })
  sparkles(x, t, 540, fy, 23.5, 8, 90, 3, [SNOW, ICE, MINT])
}

const EP = makeEp({
  id: 'nc14e13', ep: 13, duration: 30, key: 'Eb',
  heads: [
    { text: 'The first snow. | *Pisces* is not okay.', at: -1.2, out: [5.8, 6.0], accentColor: '#b9b4ff', size: 92, accentSize: 128 },
    { text: 'Then the | *real* feeling.', at: T.s2 + 0.1, out: [13.3, 13.5], accentColor: PINK, size: 104, accentSize: 140 },
    { text: '“Thought of you” is | never *too much.*', at: T.s3 + 0.05, out: [20.3, 20.5], accentColor: GOLD, size: 92, accentSize: 128 },
    { text: "The snow can't text them. | *You* can.", at: T.s4 + 0.25, late: 2, lateAt: 21.4, wobble: true, out: [25.0, 25.3], accentColor: ICE, size: 82, accentSize: 150 },
  ],
  boxes: [
    { lines: LINES1, open: 0.8, close: 5.8 },
    { lines: LINES2, open: 9.7, close: 13.4 },
    { lines: LINES3, open: 13.9, close: 20.4 },
  ],
  ghost: { at: 11.0, x: 170, y: 760, from: 'left', cell: 3 },
  cuts: [6.0, { t: T.cut, kind: 'flip' }, 20.6],
  snow: t => t < T.s4 - 0.05 ? 0 : 1,
  ground: false,
  scene,
  cues: [
    ['glitter', 0.2, 0.8], ['pluck', 1.6, 1174.66, 0.03, 0.5, -0.2], ['whoosh', 3.3, 0.4, 0.03], ['pop', 3.85, 880, 0.04, 0.4], ['glitter', 3.85, 4.3],
    ['whoosh', T.s2, 0.4, 0.035], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(7.0 + i * 0.16), 0.012]),
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(9.0 + i * 0.06), 0.01]), ['pluck', 9.1, 523.25, 0.03, 0.5, 0],
    ['pop', T.s3 + 0.1, 987.77, 0.04, -0.3], ['glitter', T.s3, T.s3 + 0.5],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(16.4 + i * 0.18), 0.012]),
    ['whoosh', T.send - 0.05, 0.3, 0.04], ['pop', T.send, 1318.51, 0.05, 0.2], ['bell', T.send + 0.05, 1760, 0.025, 1, 0.2],
    ['pop', T.reply, 659.25, 0.05, -0.2], ['pluck', T.reply + 0.1, 1174.66, 0.04, 0.5, -0.2], ['pluck', T.reply + 0.22, 1567.98, 0.035, 0.5, -0.2],
    ['whoosh', T.s4, 0.45, 0.04], ['pop', T.s4 + 0.1, 880, 0.04, -0.3], ['pop', T.s4 + 0.2, 1174.66, 0.04, 0.3],
    ['bell', 23.5, 2349.32, 0.025, 1.2, 0], ['glitter', 23.5, 24.1],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, win, popOut]
