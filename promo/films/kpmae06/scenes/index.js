// kpmae06: PLANET TALK: MARS, Ep 6 · ♍ Virgo · "The spreadsheet can't ask" (28 s vertical, star_advice, jazzy · F).
// Loops back to frame 0. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-burst through a giant floating spreadsheet, cells flying; ♍ Virgo mid-click on "PROS".
//        Hook: "VIRGO. A spreadsheet can't ask them."   0.17 shake.   1.0 Mars: "How long have you been making this?"
//   3.4  Virgo: "only three weeks. it has tabs."   6.0 the sheet rebuilds and fills: replies fast +2 · likes dogs +3 ·
//        said 'lol' once ? (caught circle) · laughs at my jokes +5 · TOTAL: ERROR.
//  10.2  Mars: "You will NEVER have all the data."   12.8 "Ask one small, clear question. Their answer IS the data."
//  16.2  Virgo: "would you like to get dinner with me?"   18.8 the reply drops in: "I'd love that."  TOTAL → YES.
//  20.0  ♓ Pisces cries onto the keyboard (a cell fills with "aaaaaaaa").   22.8 Mars: "Data received. Feelings confirmed."
//  25.0  the line slams: "Ask first. Then analyse."   27.6 → 28.0 loop back into frame 0.
import {
  makeEpisode, drawSign, drawSpace, entrance, drawEntranceFx, entranceCues, pisces, dust, flash, hearts, rr,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues, notification, notificationCues, caught, caughtCues } from '../../hookkit.js'

const D = 28
const IN = { at: -0.38, x: 540, y: 760, size: 420 }
const T = { land: 0.17, move: [5.7, 6.3], rows: 6.4, rowGap: 0.75, err: 9.5, ask: 16.2, reply: 18.8, pis: 20.0, aaa: 20.6 }
const ROWS = [['replies fast', '+2'], ['likes dogs', '+3'], ['said ‘lol’ once', '?'], ['laughs at my jokes', '+5']]
const BUB = [
  { t0: 1.0, t1: 3.2, x: 540, y: 1220, who: 'mars', text: 'How long have you been making *this?*', tail: 0, tailUp: true },
  { t0: 3.4, t1: 5.6, x: 560, y: 1300, who: 'virgo', text: 'only three weeks. it has *tabs.*', tail: -220, tailUp: false },
  { t0: 10.2, t1: 12.6, x: 520, y: 1300, who: 'mars', text: 'You will *NEVER* have all the data.', tail: 260, tailUp: true },
  { t0: 12.8, t1: 16.0, x: 520, y: 1300, who: 'mars', text: 'Ask one small, clear question. Their answer *IS* the data.', tail: 260, tailUp: true, maxW: 760, size: 44 },
  { t0: 16.2, t1: 18.6, x: 560, y: 1300, who: 'virgo', text: 'would you like to get *dinner* with me?', tail: -220, tailUp: false },
  { t0: 20.2, t1: 22.6, x: 520, y: 1300, who: 'pisces', text: 'I’m crying on the *keyboard.*', tail: 260, tailUp: false },
  { t0: 22.8, t1: 24.8, x: 520, y: 1300, who: 'mars', text: 'Data received. *Feelings* confirmed.', tail: 260, tailUp: true },
]
const SHAKE = { at: T.land, len: 0.45, amp: 26 }
const NOTE = { at: T.reply, out: [21.6, 21.9], title: 'messages', body: 'them: I’d *love* that.', glyph: '♡', y: 120 }
const rowY = i => 640 + i * 92
const CAUGHT = { at: T.rows + 2 * T.rowGap + 0.3, x: 770, y: rowY(2) + 18, r: 70, out: [9.3, 9.5], label: 'WHAT DOES IT MEAN', arrow: 'bl', rec: false }

// the grid at frame 0, bursting apart
function burstGrid(x, t) {
  const p = clamp((t + 0.15) / 1.6)
  if (p >= 1) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(p)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 12; j++) {
    const cx = 120 + i * 120, cy = 300 + j * 100, dx = cx - 540, dy = cy - 760, d = Math.hypot(dx, dy) + 1
    const push = (380 * ease.outCubic(p)) * (300 / (d + 120))
    const X = cx + dx / d * push * 3, Y = cy + dy / d * push * 3
    x.save(); x.translate(X, Y); x.rotate(push * 0.004 * ((i + j) % 2 ? 1 : -1))
    x.fillStyle = (i === 1 && j === 9) ? '#9fe6b0' : j === 0 ? '#2e7d5b' : '#f4faf5'; x.strokeStyle = '#7fb89a'; x.lineWidth = 3
    x.fillRect(-58, -48, 116, 96); x.strokeRect(-58, -48, 116, 96)
    if (j === 0) { x.fillStyle = '#fff'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ABCDEFGH'[i], 0, 2) }
    if (i === 1 && j === 9) { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PROS', 0, 2) }
    x.restore()
  }
  x.restore()
}
function sheet(x, t) {
  if (t < T.move[0]) return
  const k = pop01(t, T.move[0], 0.4, 1.8)
  x.save(); x.translate(470, 780); x.scale(k, k); x.translate(-470, -780)
  x.fillStyle = INK; rr(x, 70, 520, 800, 520, 24); x.fill()
  x.fillStyle = '#2e7d5b'; rr(x, 80, 530, 780, 70, 18); x.fill()
  x.fillStyle = '#fff'; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('crush_analysis_FINAL_v9', 110, 566)
  const n = ROWS.length + 1
  for (let i = 0; i < n; i++) {
    const y = rowY(i) + 18, on = t > T.rows + i * T.rowGap
    x.fillStyle = i === n - 1 ? '#e8f4ec' : '#f4faf5'; x.fillRect(80, y - 42, 780, 88)
    x.strokeStyle = '#9cc7ae'; x.lineWidth = 3; x.strokeRect(80, y - 42, 780, 88); x.beginPath(); x.moveTo(680, y - 42); x.lineTo(680, y + 46); x.stroke()
    if (!on) continue
    const pk = pop01(t, T.rows + i * T.rowGap, 0.25, 2)
    x.save(); x.globalAlpha = clamp(pk)
    x.fillStyle = INK; x.font = `700 38px ${INTER}`; x.textAlign = 'left'
    if (i < ROWS.length) {
      const aaa = i === 2 && t > T.aaa ? 'a'.repeat(clamp(Math.floor((t - T.aaa) * 14), 0, 14)) : ''
      x.fillText(aaa ? aaa : ROWS[i][0], 110, y + 2)
      x.textAlign = 'center'; x.fillStyle = ROWS[i][1] === '?' ? RED : '#2e7d5b'; x.font = `800 44px ${INTER}`; x.fillText(ROWS[i][1], 770, y + 2)
    } else {
      x.font = `800 40px ${INTER}`; x.fillText('TOTAL', 110, y + 2)
      const yes = t > T.reply + 0.3, err = t > T.err
      x.textAlign = 'center'; x.font = `800 ${yes ? 48 : 36}px ${yes ? INTER : MONO}`
      x.fillStyle = yes ? '#2e7d5b' : err ? RED : '#9a8fb0'
      x.fillText(yes ? 'YES' : err ? 'ERROR' : '…', 770, y + 2)
      if (err && !yes && Math.sin(t * 20) > 0) { x.strokeStyle = RED; x.lineWidth = 5; x.strokeRect(684, y - 38, 172, 80) }
    }
    x.restore()
  }
  x.restore()
}

function draw(x, t, K) {
  drawSpace(x, t, { planet: 'mars', tint: '#3a8f6a', seed: 6 })
  burstGrid(x, t)
  sheet(x, t)
  // Mars: bursts through, then hops up to the top-right corner of the sheet
  const P = entrance('burst', t, IN)
  drawEntranceFx(x, 'mars', 'burst', t, IN)
  dust(x, t, T.land - 0.2, 540, 820, { R: 460, seed: 11 })
  const mv = ease.inOutCubic(prog(t, ...T.move))
  const mx = lerp(P.x, 870, mv), my = lerp(P.y, 400, mv) - Math.sin(mv * Math.PI) * 120, ms = lerp(P.size, 300, mv)
  const mm = t < 3.4 ? 'angry' : t < 6 ? 'wide' : t < 10 ? 'sly' : t < 16 ? 'happy' : t < T.reply ? 'wide' : t < 22.8 ? 'love' : 'proud'
  K.mars(mx, my, ms, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: t < 6 ? [-1, 1] : [-1, 0.6], hops: [1.1, 1.7, 2.4, 10.3, 10.9, 13.0, 13.6, 14.3, 15.0, 22.9, 23.5] })
  // Virgo, clicking away
  const vm = t < 1 ? 'wide' : t < 6 ? 'happy' : t < 10.2 ? 'squint' : t < 16 ? 'neutral' : t < T.reply ? 'wide' : 'heart'
  drawSign(x, 'virgo', 280, 1600, 290, t, { mood: vm, look: t < 6 ? [1, -1] : [1, -0.5], hops: [3.5, 4.0, 4.6, 16.3, 16.8, 17.4, T.reply + 0.2, T.reply + 0.6], sweat: t > T.err && t < 12.6, shadow: true })
  hearts(x, t, T.reply + 0.1, 280, 1500, { n: 12, col: '#9fe6b0' })
  // Pisces at a keyboard
  if (t > T.pis) {
    const k = pop01(t, T.pis, 0.35, 2) * outK(t, [26.6, 27.1])
    x.save(); x.globalAlpha = clamp(k); x.translate(820, 1730); x.rotate(-0.05)
    x.fillStyle = INK; rr(x, -200, -40, 400, 90, 16); x.fill()
    x.fillStyle = '#d8d0e8'; for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) { const hit = (Math.floor(t * 12) + i * 3 + j) % 7 === 0; rr(x, -186 + i * 31, -28 + j * 38 + (hit ? 4 : 0), 26, 30, 5); x.fill() }
    x.restore()
    pisces(x, t, 820, 1560, 220, { pop: k, look: [0, 1], hops: [20.3, 20.6, 20.9, 21.2, 21.6, 22.0], squash: 0.05 * Math.sin(t * 22) })
  }
}
function over(x, t) { flash(x, t, T.land, { col: '#ffffff', d: 0.2, a: 0.5 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae06', duration: D, end: 'loop',
  hook: { at: -1, text: 'VIRGO. A spreadsheet | can’t *ask them.*', out: [3.2, 3.4], size: 98 },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE), caught(CAUGHT), notification(NOTE)],
  last: { at: 25.0, text: 'Ask first. | *Then* analyse.', top: 240 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('burst', IN), ['crash', 0.0, 0.05],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.05 + i * 0.05).toFixed(2), 0.03]),
    ['whoosh', T.move[0], 0.5, 0.04], popCue(T.move[0] + 0.3, 880, 0.04, 0),
    ...[0, 1, 2, 3, 4].map(i => popCue(T.rows + i * T.rowGap, 659.25 + i * 90, 0.035, 0.2)), ...caughtCues(CAUGHT),
    ['chip', T.err, 220, 0.2, { wave: 'square', gain: 0.03 }], ['chip', T.err + 0.15, 165, 0.3, { wave: 'square', gain: 0.03 }],
    ...notificationCues(NOTE), ['glitter', T.reply + 0.3, T.reply + 1.0], ['bell', T.reply + 0.3, 1760, 0.035, 1.0, 0],
    popCue(T.pis, 987.77, 0.04, 0.4), ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.aaa + i / 14).toFixed(2), 0.02]), ...sobCues(20.3, 4), ...sobCues(21.6, 3),
  ],
})
