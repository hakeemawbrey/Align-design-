// st9scorpiocrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E39) · story 0–20.6, then the shared end card.
//   THE CREW. "A Scorpio's friendship is a *lifetime* contract."  Saturday, 2 PM, Scorpio's desk (st9scorpiohome, ep
//   'crew': the corkboard is all friend photos, string in a heart). Its water-sign crew, Cancer and Pisces, arrive;
//   Scorpio unrolls a scroll with a quill.
//   3.0   SCORPIO: "before we hang out. *sign* here."   5.0 punch: the clauses roll past (BIRTHDAYS: REMEMBERED · YOUR EX:
//         HANDLED, POLITELY · YOUR SECRETS: SAFE · TERM: FOREVER) and the scroll keeps unrolling across the floor.
//   8.6   CANCER: "…it's *forty* feet long."  PISCES, happy-crying: "i already signed it. *twice.*"
//   12.0  the wax seal slams down: ♏.   13.0 the window at dusk: Scorpius rising, Orion setting. Fact chip: Scorpius
//         rises as Orion sets; one Greek story says they're kept apart. "orion and i never share a *sky.*" → CANCER:
//         "then share *ours.*"
//   17.4  frame 0's framing: Cancer and Pisces hand Scorpio their contract: a sticky note, "SAME ♡".
//   17.8  last line: "Loyal for *life*."
//   Rewatch bait: the scroll's last clause, if you pause, reads "§9: SNACKS ARE SHARED"; the pink sock is on the floor by
//   the desk (it never leaves). The ghost leans out from behind the lava lamp at 10.0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawScorpioHome, drawPinkSock, SCORPIO } from '../../st9scorpiohome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 25
const T = { hookOut: 2.8, l1: 3.0, scroll: 5.0, roll: 5.2, wide: 8.6, l2: 8.8, ghost: 10.0, l3: 10.4, seal: 12.0, win: 13.0, fact: 13.2, l4: 14.2, l5: 16.6, rhyme: 17.4, note: 17.5, last: 17.8 }
const SCO = tag('scorpio'), CAN = tag('cancer'), PIS = tag('pisces')
const LINES = [
  { t: T.l1, speaker: SCO, text: 'before we hang out. *sign* here.', color: SCORPIO.redHi },
  { t: T.l2, speaker: CAN, text: '…it’s *forty* feet long.', color: '#7fd4ff' },
  { t: T.l3, speaker: PIS, text: 'i already signed it. *twice.*', color: '#b5aefc' },
  { t: T.l4, speaker: SCO, text: 'orion and i never share a *sky.*', color: SCORPIO.redHi },
  { t: T.l5, speaker: CAN, text: 'then share *ours.*', color: '#7fd4ff' },
]
const INK = '#0c0710', BONE = '#efe6d6', PARCH = '#f1e2bc', PARCH_LO = '#d8c28c'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
function label(x, text, cx, cy, size, col, font = "700 SIZEpx 'Space Mono', monospace", align = 'center') {
  x.save(); x.font = font.replace('SIZE', size); x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
}
const CLAUSES = ['§1 BIRTHDAYS: REMEMBERED', '§2 YOUR EX: HANDLED, POLITELY', '§3 YOUR SECRETS: SAFE', '§4 3 AM CALLS: ANSWERED', '§5 I WILL BRING SOUP', '§6 NO SPOILERS. EVER.', '§7 I KNOW YOUR ORDER', '§8 TERM: FOREVER', '§9 SNACKS ARE SHARED']

/** the scroll: a parchment strip from Scorpio's hand down to the floor, then unrolling across it */
function scroll(x, t) {
  if (t > T.rhyme) return                                          // already out at frame 0
  const x0 = 400, x1 = 690, top = 1040
  const len = lerp(320, 820, ease.inOutQuad(prog(t, T.roll, T.wide + 1)))
  R(x, INK, x0 - 6, top - 6, x1 - x0 + 12, len + 12); R(x, PARCH, x0, top, x1 - x0, len)
  R(x, PARCH_LO, x0, top, 10, len); R(x, PARCH_LO, x1 - 10, top, 10, len)
  // the top roll
  R(x, INK, x0 - 20, top - 30, x1 - x0 + 40, 40); R(x, '#c9a46a', x0 - 14, top - 24, x1 - x0 + 28, 28)
  label(x, 'FRIENDSHIP CONTRACT', (x0 + x1) / 2, top + 30, 19, SCORPIO.trim)
  // the clauses scroll up as it unrolls
  const off = prog(t, T.roll, T.wide + 1) * 200
  x.save(); x.beginPath(); x.rect(x0, top + 54, x1 - x0, len - 60); x.clip()
  CLAUSES.forEach((c, i) => label(x, c, x0 + 14, top + 84 + i * 40 - off, 14, '#4a2a14', undefined, 'left'))
  // signatures (after the friends sign)
  if (t > T.l3) { x.strokeStyle = '#3f7cf0'; x.lineWidth = 4; x.beginPath(); for (let i = 0; i < 12; i++) x.lineTo(x0 + 40 + i * 10, top + len - 90 + Math.sin(i * 1.7) * 10); x.stroke() }
  if (t > T.l3 + 0.4) { x.strokeStyle = '#7c74f0'; x.lineWidth = 4; for (const dy of [0, 30]) { x.beginPath(); for (let i = 0; i < 12; i++) x.lineTo(x0 + 190 + i * 10, top + len - 100 + dy + Math.cos(i * 1.3) * 10); x.stroke() } }
  x.restore()
  // the floor roll at the bottom, still rolling
  R(x, INK, x0 - 20, top + len - 6, x1 - x0 + 40, 40); R(x, '#c9a46a', x0 - 14, top + len, x1 - x0 + 28, 28)
  // the wax seal
  const sk = t > T.seal ? Math.min(1.4 - 0.4 * ease.outCubic(prog(t, T.seal, T.seal + 0.25)), 1.4) : 0
  if (sk > 0) {
    const cx = x1 - 60, cy = top + 300
    x.save(); x.translate(cx, cy); x.scale(sk, sk)
    R(x, INK, -40, -40, 80, 80); R(x, '#b0122e', -34, -34, 68, 68); R(x, '#e23d66', -26, -26, 52, 52)
    label(x, '♏', 0, 3, 40, '#6a0a1e', "700 SIZEpx 'EB Garamond', serif"); x.restore()
  }
}
/** the window sky at dusk: Scorpius rising (bottom left, climbing), Orion setting (top right, sinking) */
function sky2(x, t, win) {
  const k = prog(t, T.win + 0.2, T.win + 0.8), p = prog(t, T.win, T.rhyme)
  if (k <= 0) return
  const W = win.x1 - win.x0, H = win.y1 - win.y0
  x.save(); x.globalAlpha = k
  const sc = [[0, 0], [30, 40], [50, 90], [40, 150], [10, 190], [-30, 200], [-50, 180]].map(([u, v]) => [win.x0 + W * 0.18 + u, win.y0 + H * 0.55 - p * 120 + v])
  const or = [[0, 0], [120, 10], [30, 80], [60, 82], [90, 84], [10, 170], [130, 160]].map(([u, v]) => [win.x0 + W * 0.62 + u, win.y0 + H * 0.08 + p * 140 + v])
  x.strokeStyle = 'rgba(255,138,122,0.55)'; x.lineWidth = 3; x.beginPath(); sc.forEach((q, i) => i ? x.lineTo(...q) : x.moveTo(...q)); x.stroke()
  x.strokeStyle = 'rgba(159,196,255,0.55)'; x.beginPath(); x.moveTo(...or[0]); x.lineTo(...or[2]); x.lineTo(...or[5]); x.moveTo(...or[1]); x.lineTo(...or[4]); x.lineTo(...or[6]); x.moveTo(...or[2]); x.lineTo(...or[4]); x.stroke()
  for (const q of [...sc, ...or]) R(x, '#fff6dc', q[0] - 4, q[1] - 4, 8, 8)
  R(x, '#ff5a3c', sc[1][0] - 7, sc[1][1] - 7, 14, 14)
  label(x, '↑ SCORPIUS', sc[0][0] + 20, sc[4][1] + 46, 20, '#ff9a8a'); label(x, 'ORION ↓', or[1][0] - 40, or[0][1] - 30, 20, '#9fc4ff')
  x.restore()
}
function note(x, t, cx, cy) {
  const k = pop01(t, T.note, 0.35, 2.2)
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.rotate(0.08); x.scale(k, k)
  R(x, INK, -66, -46, 132, 92); R(x, '#fff3a8', -62, -42, 124, 84); label(x, 'SAME ♡', 0, 0, 26, SCORPIO.trim, "800 SIZEpx Inter"); x.restore()
}
function scoState(t) {
  if (t < T.scroll) return { mood: 'squint', look: [1, 0] }
  if (t < T.wide) return { mood: 'neutral', look: [1, 1] }
  if (t < T.seal) return { mood: 'squint', look: [1, 0] }
  if (t < T.win) return { mood: 'happy' }
  if (t < T.l5) return { mood: 'neutral', look: [0, -1] }
  if (t < T.note + 0.6) return { mood: 'wide', look: [1, 0], blink: false }
  return { mood: 'heart' }
}

const EP = makeDay({
  numeral: 'S9 E39', sign: 'scorpio', ep: 'crew', home: drawScorpioHome, duration: DUR, key: 'Am',
  hook: { text: 'A Scorpio’s friendship is a *lifetime* contract.', out: [T.hookOut - 0.2, T.hookOut], accentColor: SCORPIO.redHi, size: 88, accentSize: 118 },
  shots: [
    { at: 0, room: 'desk', hour: 14, zoom: { x: 540, y: 1000, s: 1.12 } },
    { at: T.scroll, room: 'desk', hour: 14.2, zoom: { x: 550, y: 1300, s: 1.55 } },
    { at: T.wide, room: 'desk', hour: 14.4, zoom: { x: 760, y: 1080, s: 1.3 } },
    { at: T.seal, room: 'desk', hour: 14.5, zoom: { x: 600, y: 1300, s: 1.6 } },
    { at: T.win, room: 'window', hour: 19.6, zoom: { x: 540, y: 960, s: 1.05 } },
    { at: T.rhyme, room: 'desk', hour: 20, zoom: { x: 540, y: 1000, s: 1.12 } },
  ],
  clock: [{ at: 0, from: '2:00', ampm: 'PM' }, { at: T.seal, dur: 0.5, from: '2:00', to: '2:31', ampm: 'PM' }, { at: T.win, dur: 0.7, from: '2:31', to: '7:36', ampm: 'PM' }],
  stamps: [
    { at: 0.5, out: T.scroll - 0.1, time: '2:00 PM', text: 'the crew’s *here*', top: 1250 },
    { at: T.seal + 0.3, out: T.win - 0.05, time: '2:31 PM', text: 'legally *besties*', top: 1250 },
  ],
  lines: LINES, box: { close: 19.4 },
  fact: { at: T.fact, dur: 3.9, label: '★ REAL SKY', text: 'As Scorpius rises, Orion sets. One Greek story says they’re kept apart.', color: '#ff8a7a' },
  ghost: { room: 'desk', at: T.ghost, x: 925, y: 990, from: 'left' },
  battery: 0.55,
  pitch: { [SCO]: 523.25, [CAN]: 784, [PIS]: 987.77 },
  cuts: [{ t: T.win, kind: 'deal' }],
  draw(x, t, a, sh) {
    if (sh.room === 'desk') {
      drawPinkSock(x, 160, 1310, 5, { rot: 0.2 })
      star(x, 'cancer', 800, 1150, 200, t, { mood: t < T.l2 ? 'wide' : t < T.seal ? 'squint' : 'happy', look: [-1, 0], seed: 4, hops: [T.l2, T.note] })
      star(x, 'pisces', 970, 1160, 190, t, { mood: t < T.l3 ? 'sparkle' : 'heart', look: [-1, 0], seed: 8, hops: [T.l3, T.l3 + 0.4, T.note] })
      const r = star(x, 'scorpio', 270, 1130, 250, t, { ...scoState(t), seed: 6, hops: [T.l1, T.seal, T.note + 0.5] })
      scroll(x, t)
      // the quill
      if (t < T.seal) { R(x, INK, r.x + 90, r.y - 80, 10, 120); R(x, '#efe6d6', r.x + 80, r.y - 120, 30, 60) }
      if (t > T.rhyme) note(x, t, r.x + 150, r.y)
    } else {
      sky2(x, t, a.win)
      star(x, 'cancer', 330, 1190, 200, t, { mood: t < T.l5 ? 'neutral' : 'happy', look: [1, -1], seed: 4, hops: [T.l5] })
      star(x, 'scorpio', 540, 1180, 220, t, { ...scoState(t), seed: 6, hops: [T.l4] })
      star(x, 'pisces', 750, 1190, 200, t, { mood: 'sparkle', look: [-1, -1], seed: 8 })
    }
  },
  last: { at: T.last, text: 'Loyal for *life.*', accentColor: SCORPIO.redHi, size: 120, accentSize: 170 },
  cues: [
    ['whoosh', T.roll, 1.2, 0.03], ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.roll + 0.3 + i * 0.5).toFixed(3), 0.03]),
    ['pluck', T.l3, 1318.51, 0.04, 0.6, 0.4], ['pluck', T.l3 + 0.4, 1567.98, 0.04, 0.6, 0.4],
    ['whoosh', T.seal - 0.15, 0.2, 0.04], ['boom', T.seal, 0.2], ['tom', T.seal + 0.02, 0.1], ['crash', T.seal + 0.02, { gain: 0.04, len: 1.4 }],
    ['riser', T.win, T.win + 0.8, 0.03],
    ['pop', T.note, 1318.51, 0.05, 0.3], ['bell', T.note + 0.1, 1760, 0.02, 1.2, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
