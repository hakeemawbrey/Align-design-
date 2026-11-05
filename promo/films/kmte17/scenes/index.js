// kmte17: MIRROR TALK No. 17 (long), "The night before meeting their friends." (70 s vertical, star_advice post, funk · A).
// Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut. Chapter stickers (hookkit).
//   0.00   frame 0: Leo mid-rehearsal, crown on, mic up, a spotlight rig mid-crash onto the floor. Hook "Meeting their friends |
//          *tomorrow.* Panic."  0.35: CRASH (flash + shake).  2.7 the promise: "The *last* tip is the one that works."
//   5.0    1 · THE SHOW   jokes into the mic; the applause meter flatlines; PISCES: "I'd laugh!"; "you're auditioning. it's a *dinner*."
//   17.0   2 · THE NAMES  five flash cards (Sam hikes · Jo is the funny one · Ria hates small talk · Max got a puppy · Dee has
//          known them forever); "those are *questions*, not a test."
//   30.0   3 · THE FEAR   "what if they don't *like* me?" · loading bar "calculating likeability…" → can't be calculated ·
//          "they love someone who likes you. that's a *head start*."
//   43.0   4 · THE SWAP   "stop performing. start *asking*." · the crown goes on the shelf, the mic becomes a question mark ·
//          "no crown? who *am* I?" · "the one who's *curious*. that's charming."
//   55.0   5 · THE TIP    three questions on a card · "and then I… listen?" · "and then you *listen*. that's the whole tip." ·
//          Pisces holds up GOOD LUCK · "okay. no show. just *me*."
//   68.2   last line "Their friends want *you,* | not a show."  Hard cut at 70.
import { makeMirror, drawNote, bubble, hearts, sparkles, confetti, spotlight, crownCells, inSprite, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, RED, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const CH = [5.0, 17.0, 30.0, 43.0, 55.0]
const T = {
  crash: 0.35, promise: 2.7,
  s1: 5.4, s2: 7.4, meter: [9.4, 10.6], p1: 11.0, m1: 13.0,
  cards: [17.6, 19.0, 20.4, 21.8, 23.2], s3: 25.0, m2: 27.4,
  s4: 30.4, bar: 32.4, m3: 36.0, s5: 39.4, p2: 41.2,
  m4: 43.4, crown: [45.0, 45.7], qmark: 46.2, s6: 47.4, m5: 49.6, hop: 52.4,
  q: [55.6, 56.6, 57.6], s7: 59.6, m6: 61.8, sign: 64.2, s8: 65.2, last: 68.2,
}
const CARDS = [['SAM', 'loves hiking'], ['JO', 'the funny one'], ['RIA', 'hates small talk'], ['MAX', 'just got a puppy'], ['DEE', 'known them forever']]
const MIC = (x, cx, cy, rot, k = 1) => { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); R(x, INK, -12, 0, 24, 110); R(x, '#5a5470', -7, 4, 14, 102); R(x, INK, -30, -56, 60, 64); R(x, '#cfc6e6', -24, -50, 48, 52); R(x, '#8f86a8', -24, -30, 48, 6); R(x, '#8f86a8', -24, -16, 48, 6); x.restore() }
const QM = ['.QQQ.', 'Q...Q', '....Q', '...Q.', '..Q..', '.....', '..Q..']

function meter(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -150, -100, 300, 150, '#1c1530', { b: 6 })
  x.font = `700 20px ${MONO}`; x.fillStyle = '#cfc6e6'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('APPLAUSE', 0, -76)
  for (let i = 0; i < 9; i++) { const a = Math.PI + i * Math.PI / 8; x.fillStyle = i < 3 ? RED : i < 6 ? GOLD : '#5fd38a'; x.fillRect(Math.cos(a) * 100 - 6, 30 + Math.sin(a) * 100 - 6, 12, 12) }
  const up = t < T.meter[0] ? prog(t, T.s2, T.s2 + 1.2) * 0.6 : 0.6 * (1 - ease.inCubic(prog(t, ...T.meter)))
  const a = Math.PI + up * Math.PI + (t > T.meter[1] ? 0.02 * Math.sin(t * 30) : 0)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 30); x.lineTo(Math.cos(a) * 86, 30 + Math.sin(a) * 86); x.stroke()
  x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 30); x.lineTo(Math.cos(a) * 84, 30 + Math.sin(a) * 84); x.stroke()
  x.restore()
}
function flashCard(x, t, i, cx, cy) {
  const t0 = T.cards[i], k = easeOutBack(prog(t, t0, t0 + 0.3), 1.6) * outK(t, [t0 + 1.25, t0 + 1.4])
  if (k <= 0.01 || (i < 4 && t > t0 + 1.4)) return
  const kk = i === 4 ? easeOutBack(prog(t, t0, t0 + 0.3), 1.6) * outK(t, [CH[2] - 0.3, CH[2]]) : k
  if (kk <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate((i % 2 ? 0.05 : -0.05)); x.scale(kk, kk)
  R(x, 'rgba(6,4,18,0.45)', -170 + 12, -110 + 14, 340, 220); box(x, -170, -110, 340, 220, '#fff4dc', { b: 6 }); R(x, ['#ff8fb1', '#7fd0ff', '#ffe27a', '#9fe6b0', '#c9a6ff'][i], -170, -110, 340, 50)
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${i + 1}/5`, 120, -84)
  x.font = `800 60px ${INTER}`; x.fillText(CARDS[i][0], 0, -10); x.font = `600 32px ${INTER}`; x.fillStyle = '#3a2a5a'; x.fillText(CARDS[i][1], 0, 54)
  x.restore()
}

const F = makeMirror({
  id: 'kmte17', sign: 'leo', dur: 70,
  hook: { text: 'Meeting their friends | *tomorrow.* Panic.', accentColor: '#f39a3a', size: 92, out: [2.45, 2.65] },
  chapters: [
    { at: CH[0], text: 'THE SHOW' }, { at: CH[1], text: 'THE NAMES' }, { at: CH[2], text: 'THE FEAR' }, { at: CH[3], text: 'THE SWAP' }, { at: CH[4], text: 'THE TIP', out: [67.9, 68.15] },
  ],
  fx: [
    { k: 'screenShake', at: T.crash, amp: 32, len: 0.6 },
    { k: 'whipZoom', at: CH[0] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.meter[1], amp: 8, len: 0.3 }, { k: 'whipZoom', at: T.m1 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[1] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.m2 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[2] - 0.06, from: 1.3 }, { k: 'loadingBar', at: T.bar, len: 3.2, label: 'calculating likeability…', stallAt: 99, error: 'Error: can’t be calculated', y: 900 },
    { k: 'screenShake', at: T.s5, amp: 10, len: 0.35 },
    { k: 'whipZoom', at: CH[3] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.crown[1], amp: 10, len: 0.3 }, { k: 'whipZoom', at: T.m5 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[4] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.sign - 0.06, from: 1.2 },
  ],
  flashes: [[T.crash, '#ffffff', 0.2], [T.s5, '#ffe6b0', 0.15]],
  caps: [
    { at: T.promise, out: [4.7, 4.95], text: 'The *last* tip is | the one that works.', accent: '#ffd36b', size: 86, accentSize: 112 },
    { at: CH[0] + 0.3, out: [16.7, 16.95], text: 'Rehearsing *bits.*', accent: '#f39a3a', top: 240, size: 76, accentSize: 100 },
    { at: CH[1] + 0.3, out: [29.7, 29.95], text: 'Five friends. *Five* facts.', accent: '#7fd0ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[2] + 0.3, out: [42.7, 42.95], text: 'You have a *head start.*', accent: '#7dffb0', top: 240, size: 76, accentSize: 100 },
    { at: CH[3] + 0.3, out: [54.7, 54.95], text: 'Curious is *charming.*', accent: '#ff8fb1', top: 240, size: 76, accentSize: 100 },
    { at: CH[4] + 0.3, out: [67.9, 68.15], text: 'Ask. Then *listen.*', accent: '#8fe9ff', top: 240, size: 76, accentSize: 100 },
    { at: T.last, out: [99, 100], text: 'Their friends want *you,* | not a show.', accent: '#ffd36b', gap: 0.1, size: 90, accentSize: 118 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'okay. opening joke. *ahem*.' },
    { t: T.s2, who: 'S', text: "what do you call a star who's late? a *shooting*… no wait." },
    { t: T.p1, who: 'P', text: "I'd *laugh*!" },
    { t: T.m1, who: 'M', text: "you're auditioning. it's a *dinner*." },
    { t: T.s3, who: 'S', text: "Sam hikes. Jo's funny. Max has a… *puppy*?" },
    { t: T.m2, who: 'M', text: 'great. those are *questions*, not a test.' },
    { t: T.s4, who: 'S', text: "what if they don't *like* me?" },
    { t: T.m3, who: 'M', text: "they love someone who likes you. that's a *head start*." },
    { t: T.s5, who: 'S', text: "…oh. that's *true*." },
    { t: T.p2, who: 'P', text: '*head start*!!' },
    { t: T.m4, who: 'M', text: 'stop performing. start *asking*.' },
    { t: T.s6, who: 'S', text: 'no crown? who *am* I?' },
    { t: T.m5, who: 'M', text: "the one who's *curious*. that's charming." },
    { t: T.s7, who: 'S', text: 'and then I… *listen*?' },
    { t: T.m6, who: 'M', text: "and then you *listen*. that's the whole tip." },
    { t: T.s8, who: 'S', text: 'okay. no show. just *me*.' },
  ],
  boxes: [[5.2, 16.7], [24.8, 29.7], [30.2, 42.7], [43.2, 54.6], [59.4, 67.6]],
  pose(t) {
    const b = ease.outCubic(prog(t, 0.6, 1.2))
    const p = { x: lerp(380, 300, b), y: lerp(1140, 1225, b), s: lerp(300, 280, b), mood: 'wide', look: [0, -1], blink: t < 1 ? false : undefined }
    if (t > T.s1) { p.mood = 'sparkle'; p.look = [0, 0] }
    if (t > T.meter[1]) { p.mood = 'wide'; p.look = [1, -0.6] }
    if (t > T.m1) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > CH[1]) { p.mood = 'squint'; p.look = [1, -0.6] }
    if (t > T.m2) { p.mood = 'happy'; p.look = undefined }
    if (t > T.s4) { p.mood = 'wide'; p.look = [1, -0.4] }
    if (t > T.m3) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.s5) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.crown[0]) { p.mood = 'wide'; p.look = [1, -0.4] }
    if (t > T.m5) { p.mood = 'happy'; p.look = undefined }
    if (t > T.s7) { p.mood = 'neutral'; p.look = [1, -0.6] }
    if (t > T.m6 + 1) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s8) { p.mood = 'heart'; p.look = undefined }
    p.draw = (x, tt, Fr) => {
      if (tt < T.crown[0]) inSprite(x, Fr, () => crownCells(x))
      const mk = tt < T.qmark ? 1 : 0
      if (mk && tt < CH[2]) MIC(x, Fr.ox + Fr.S * 0.42, Fr.cy - Fr.S * 0.1, 0.35, tt < CH[1] ? 1 : 1 - prog(tt, CH[1], CH[1] + 0.3))
      if (tt > T.qmark && tt < T.last) drawBits(x, QM, { Q: GOLD }, Fr.ox + Fr.S * 0.48, Fr.cy - Fr.S * 0.25, 10 * pop01(tt, T.qmark, 0.3, 2.4))
    }
    return p
  },
  signHops: [T.hop, T.hop + 0.4, T.s8 + 0.8],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t < 1) p.mood = 'wide'
    if (t > T.meter[1] && t < T.m1) p.mood = 'squint'
    if (t > T.m1) p.mood = 'happy'
    if (t > CH[1] && t < T.m2) { p.x = 690; p.y = 1010; p.s = 180 }
    if (t > T.m3) p.mood = 'sparkle'
    if (t > T.m4) p.mood = 'happy'
    if (t > T.s8) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.p1 - 0.2 && t < T.m1) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.s5) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.sign) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  pisHops: [T.p1, T.p2, T.sign],
  tissuePulls: [T.p1, T.p2, T.p2 + 0.4, T.sign + 0.3],
  back(x, t) {
    // the spotlight beam (chapter 1 rehearsal); it dies at the swap
    const a = (t < CH[3] ? 1 : 1 - prog(t, CH[3], CH[3] + 0.4)) * (t > T.s5 && t < T.s5 + 0.3 ? 0.2 : 1)
    if (t > 0.4) spotlight(x, 300, 0, 300, 1340, 480, a * (0.8 + 0.2 * Math.sin(t * 2)))
  },
  glass(x, t) {
    meter(x, t, 600, 700, easeOutBack(prog(t, T.s2 - 0.4, T.s2), 1.6) * outK(t, [CH[1] - 0.3, CH[1]]))
    for (let i = 0; i < 5; i++) flashCard(x, t, i, 560, 760)
  },
  front(x, t, K) {
    // frame 0: the spotlight rig crashing down
    if (t < 1.2) {
      const f = ease.inCubic(prog(t, -0.5, T.crash)), y = lerp(300, 1290, f), rot = t < T.crash ? 0.5 : 0.95
      x.save(); x.translate(560, y); x.rotate(rot); box(x, -60, -40, 120, 80, '#3a3450', { b: 6 }); R(x, '#fff2c0', 40, -26, 24, 52); x.restore()
      if (t > T.crash) { sparkles(x, t, 560, 1300, T.crash, 12, 160, 1, ['#fff', GOLD, '#ffd0a0']) }
    }
    // the crown flies to the shelf, and sits there
    if (t > T.crown[0]) {
      const p = ease.inOutCubic(prog(t, ...T.crown))
      const cx = lerp(300, 520, p), cy = lerp(1100, K.SHELF.y - 20, p) - Math.sin(Math.PI * p) * 180
      drawBits(x, ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG'], { G: GOLD, R: RED }, cx, cy, 11, { rot: (1 - p) * 4 })
    }
    // the three questions
    const qk = easeOutBack(prog(t, T.q[0] - 0.4, T.q[0]), 1.6) * outK(t, [T.last - 0.15, T.last + 0.2])
    drawNote(x, t, { cx: 620, cy: 770, w: 460, h: 330, rot: 0.03, k: qk, size: 28, lineGap: 58, title: 'tomorrow, ask:', lines: [
      { text: 'how did you all meet?', at: T.q[0] }, { text: 'what do you love about them?', at: T.q[1] }, { text: 'what are you into lately?', at: T.q[2] },
    ] })
    // Pisces' GOOD LUCK sign
    if (t > T.sign) {
      const k = pop01(t, T.sign, 0.3, 2.4) * outK(t, [T.last - 0.15, T.last + 0.2])
      x.save(); x.translate(K.PIS_AT.x - 10, K.PIS_AT.y - 130); x.rotate(-0.08 + 0.05 * Math.sin(t * 6)); x.scale(k, k)
      R(x, INK, -6, 40, 12, 80); R(x, INK, -110, -44, 220, 88); R(x, '#ffe27a', -104, -38, 208, 76)
      x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GOOD LUCK', 0, 2); x.restore()
    }
    sparkles(x, t, 300, 1100, T.hop + 0.1, 12, 170, 2)
    hearts(x, t, T.s8 + 0.6, 300, 1060, { n: 6, cell: 7, spread: 160 })
    confetti(x, t, T.sign, 800, 900)
  },
  cues: [
    ['whoosh', 0.0, 0.35, 0.05], ['boom', T.crash, 0.3], ['tom', T.crash, 80, { gain: 0.3, decay: 0.3 }], ['tick', T.crash + 0.02, 0.08],
    ['pop', T.s1, 880, 0.03, 0], ['riser', T.s2, T.meter[0], 0.02],
    ['pluck', T.meter[1], 2637, 0.012, 0.1, 0.3], ['pluck', T.meter[1] + 0.09, 2637, 0.012, 0.1, 0.3], ['pluck', T.meter[1] + 0.35, 2637, 0.012, 0.1, 0.3],
    ...T.cards.flatMap((c, i) => [['whoosh', c, 0.3, 0.03], ['pop', r3(c + 0.05), [880, 987.77, 1108.73, 1174.66, 1318.51][i], 0.045, (i % 2 ? 0.3 : -0.3)]]),
    ['pluck', T.s5, 1108.73, 0.04, 0.6, 0], ['glitter', T.s5, T.s5 + 0.5],
    ['whoosh', T.crown[0], 0.5, 0.035], ['tick', T.crown[1], 0.06], ['pop', T.qmark, 1318.51, 0.045, 0.2],
    ['pop', T.hop, 987.77, 0.035, -0.2], ['glitter', T.hop, T.hop + 0.4],
    ...T.q.flatMap(q => Array.from({ length: 6 }, (_, i) => ['tick', r3(q + i * 0.08), 0.015])),
    ['pop', T.sign, 1174.66, 0.05, 0.3], ['glitter', T.sign, T.sign + 0.6],
    ['bell', T.last + 0.5, 1760, 0.03, 1.2, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
