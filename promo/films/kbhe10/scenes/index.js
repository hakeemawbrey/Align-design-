// kbhe10: BRAIN VS HEART, Ep 10 "Love, 15 Minutes" (12 s vertical, star_talk post, music: lofi · Bb). Hard cut.
// Inside ♑ Capricorn's head. The window: the week's calendar, every slot booked; love gets one tiny pink slot.
//   0.00   frame 0: mid whip zoom; Brain mid-swipe across the calendar, Heart squashed flat under a grey MEETING block.
//          Title "Capricorn penciled in love: | *15 minutes.*"
//   1.20   BRAIN: "Tuesday, 7:15 to 7:30. *agenda attached.*"   2.80 HEART (popping out): "that's not a date. that's a *MEETING.*"
//   4.20   Heart shoves the grey blocks off the calendar; 5.50 the pink slot stretches to the whole evening.
//   6.60   DO NOT DISTURB: three notifications switch off, click, click, click.   8.00 blink → dinner, phone face down.
//   9.40   BRAIN: "No agenda. Just *dinner.*"
// Pisces cam: sniffles at the 15 minutes, happy tears at dinner. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'
import { makeBuild, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12
const SIGN = 'capricorn'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: 'Capricorn penciled in love: | *15 minutes.*', top: 168, size: 88 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const SHOVE = { at: 4.3, len: 0.5, amp: 22 }
const T = { pop: 2.7, shove: [4.3, 5.5], stretch: [5.5, 6.3], dnd: 6.6, dinner: 8.0, last: 9.4 }
const BUB = [
  { t0: 1.2, t1: 2.65, who: 'brain', x: 400, y: 1195, tail: -140, text: 'Tuesday, 7:15 to 7:30. *agenda attached.*', size: 42, maxW: 560 },
  { t0: 2.8, t1: 4.2, who: 'heart', x: 680, y: 1195, tail: 140, text: "that's not a date. that's a *MEETING.*", size: 44, maxW: 540 },
  { t0: T.last, t1: 99, who: 'brain', x: 420, y: 1200, tail: -160, text: 'No agenda. Just *dinner.*', size: 50 },
]
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const BLOCKS = [] // [day, start row, len, label]
;[[0, 0, 3, 'SYNC'], [0, 3, 2, 'REPORT'], [0, 5, 3, 'GYM'], [1, 0, 2, 'PLAN'], [1, 2, 2, 'CALLS'], [1, 6, 2, 'READ'], [2, 0, 4, 'REVIEW'], [2, 4, 4, 'ERRANDS'], [3, 0, 2, 'SYNC'], [3, 2, 3, 'BUDGET'], [3, 5, 3, 'TAXES'], [4, 0, 3, 'MEET'], [4, 3, 5, 'INBOX']].forEach(b => BLOCKS.push(b))

function calendar(x, t, Rw) {
  x.fillStyle = '#f4efe2'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  const gx = Rw.x + 30, gy = Rw.y + 70, cw = (Rw.w - 60) / 5, rh = (Rw.h - 100) / 8
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK
  DAYS.forEach((d, i) => x.fillText(d, gx + cw * i + cw / 2, Rw.y + 50))
  for (let i = 0; i <= 5; i++) R(x, '#d8cfb8', gx + cw * i, gy, 2, rh * 8)
  BLOCKS.forEach(([d, r, l, lb], i) => {
    if (d === 1 && r === 6) return
    const p = ease.inCubic(prog(t, T.shove[0] + i * 0.09, T.shove[0] + i * 0.09 + 0.35))
    if (p >= 1) return
    const bx = gx + cw * d + 6 + p * 900 * (d % 2 ? 1 : -1), by = gy + rh * r + 4 - p * 200
    x.save(); x.translate(bx + (cw - 12) / 2, by + (rh * l - 8) / 2); x.rotate(p * 2 * (d % 2 ? 1 : -1))
    R(x, INK, -(cw - 12) / 2 - 3, -(rh * l - 8) / 2 - 3, cw - 6, rh * l - 2); R(x, '#9aa0b8', -(cw - 12) / 2, -(rh * l - 8) / 2, cw - 12, rh * l - 8)
    x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText(lb, 0, 8)
    x.restore()
  })
  // love: one tiny slot on Tuesday evening → stretches over the whole evening
  const s = ease.outBack(prog(t, ...T.stretch))
  const ly = gy + rh * 6 + 4, lh = lerp(rh * 0.5, rh * 2 - 8, s), lx = gx + cw * 1 + 6, lw = lerp(cw - 12, cw * 3 - 12, s)
  R(x, INK, lx - 3, ly - 3, lw + 6, lh + 6); R(x, '#ff6f9a', lx, ly, lw, lh)
  x.fillStyle = INK; x.font = `800 ${s > 0.5 ? 34 : 17}px ${INTER}`; x.fillText(s > 0.5 ? '♥︎ DINNER · 7 PM → whenever' : '♥︎ 7:15–7:30', lx + lw / 2, ly + lh / 2 + 7)
  // do not disturb
  if (t > T.dnd) {
    const k = pop01(t, T.dnd, 0.3, 2.2)
    x.save(); x.translate(540, Rw.y + 250); x.scale(k, k)
    R(x, INK, -330, -150, 660, 300); R(x, '#231a48', -324, -144, 648, 288)
    x.fillStyle = GOLD; x.font = `800 34px ${INTER}`; x.fillText('DO NOT DISTURB', 0, -94)
    ;['work inbox', 'reminders', 'the group chat'].forEach((lb, i) => {
      const off = t > T.dnd + 0.35 + i * 0.3
      x.fillStyle = BONE; x.font = `700 30px ${INTER}`; x.textAlign = 'left'; x.fillText(lb, -280, -24 + i * 70); x.textAlign = 'center'
      R(x, INK, 150, -54 + i * 70, 120, 50); R(x, off ? '#4a4070' : '#5fd38a', 154, -50 + i * 70, 112, 42); R(x, BONE, off ? 158 : 222, -46 + i * 70, 40, 34)
    })
    x.restore()
  }
}
function dinner(x, t, Rw) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#3a1f4a'); g.addColorStop(1, '#6a2f3a'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  // string lights
  for (let i = 0; i < 14; i++) { const on = Math.sin(t * 3 + i) > -0.3; x.fillStyle = on ? '#ffd98a' : '#8a6a4a'; x.beginPath(); x.arc(Rw.x + 40 + i * 66, Rw.y + 60 + 18 * Math.sin(i * 0.9), 8, 0, 7); x.fill() }
  R(x, INK, Rw.x, Rw.y + 330, Rw.w, 240); R(x, '#f4e8cc', Rw.x, Rw.y + 336, Rw.w, 240)
  for (const cx of [380, 700]) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, Rw.y + 400, 110, 34, 0, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(cx, Rw.y + 398, 100, 28, 0, 0, 7); x.fill(); x.fillStyle = '#e9a05a'; x.beginPath(); x.ellipse(cx, Rw.y + 394, 56, 14, 0, 0, 7); x.fill() }
  // candle
  R(x, INK, 532, Rw.y + 250, 20, 86); R(x, '#fffbea', 536, Rw.y + 254, 12, 80)
  const fl = 1 + 0.1 * Math.sin(t * 17); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(542, Rw.y + 236, 9 * fl, 18 * fl, 0, 0, 7); x.fill()
  // the phone, face down
  R(x, INK, 820, Rw.y + 420, 120, 64); R(x, '#4a3a7a', 826, Rw.y + 426, 108, 52)
  x.fillStyle = BONE; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('face down', 880, Rw.y + 520)
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'open', arms: [0.4, 2.9], look: [1, -1] }],
    [1.2, { mood: 'neutral', mouth: 'flat', arms: [0.4, 1.8], look: [1, 0] }],
    [2.8, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }],
    [T.shove[0], { mood: 'wide', mouth: 'scream', arms: [2.8, 2.8], look: [0.5, -1] }],
    [T.stretch[1], { mood: 'sad', mouth: 'wobble', arms: [0.3, 0.3], look: [0.5, -1] }],
    [T.dinner, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4], look: [0.5, -1] }],
    [T.last, { mood: 'happy', mouth: 'smile', arms: [0.5, 2.2], look: [1, 0] }],
  ])
  return { ...P, x: 250, y: 1440, rot: t < 0.5 ? 0.15 : 0, hops: [1.2, T.shove[0], T.last], prop: t < T.dinner ? (x2, t2, o) => { const h = o.hr; R(x2, INK, h.x - 6, h.y - 40, 12, 46); R(x2, '#ffd23a', h.x - 3, h.y - 36, 6, 38); R(x2, '#ff8fa0', h.x - 3, h.y - 44, 6, 8) } : null }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'shut', mouth: 'flat', arms: [1.5, 1.5], look: [0, 0] }],
    [T.pop, { mood: 'angry', mouth: 'scream', arms: [2.6, 2.6], look: [-1, -1] }],
    [T.shove[0] - 0.1, { mood: 'angry', mouth: 'grin', arms: [2.2, 2.2], look: [0, -1] }],
    [T.stretch[1], { mood: 'love', mouth: 'grin', arms: [0.6, 0.6] }],
    [T.dinner, { mood: 'love', mouth: 'smile', arms: [0.4, 0.4], look: [-0.5, -1] }],
    [T.last, { mood: 'happy', mouth: 'grin', arms: [2.3, 0.5], look: [-1, 0] }],
  ])
  const sq = t < T.pop ? 0.42 : 0
  const yy = key(t, [[T.shove[0] - 0.3, 1440], [T.shove[0], 1220, ease.outQuad], [T.shove[1], 1220], [T.shove[1] + 0.3, 1440, ease.inQuad]])
  return { ...P, x: 830, y: yy, squash: sq, hops: [T.pop, T.pop + 0.4, T.stretch[1], T.last + 0.3], rot: t > T.shove[0] && t < T.shove[1] ? 0.3 * Math.sin(t * 12) : 0 }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.dinner],
  view: (x, t, Rw) => (t < T.dinner ? calendar(x, t, Rw) : dinner(x, t, Rw)),
  desk: t => ({ button: { label: 'BOOK IT', press: [], glow: 0.3, col: '#7a8aa8' }, score: { b: [[0, 0]], h: [[0, 0], [T.stretch[1], 1]] }, cam: { tears: [[0, 1], [T.dinner, 3]], mood: [[0, 'wide'], [T.dinner, 'happy']], look: [0, -1], hops: [T.dinner, T.dinner + 0.4] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > 2.8 && t < 4.2 ? 0.4 : 0),
  front: (x, t, B, H) => {
    // the grey MEETING block sitting on Heart until it pops out
    const p = ease.outCubic(prog(t, T.pop, T.pop + 0.5))
    if (p < 1) { x.save(); x.translate(830 + p * 500, 1330 - p * 300); x.rotate(p * 3); R(x, INK, -120, -50, 240, 100); R(x, '#9aa0b8', -114, -44, 228, 88); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('MEETING', 0, 10); x.restore() }
    sparkles(x, t, 540, 800, T.stretch[1], 12, 220, 1, [GOLD, BONE, '#ff6f9a'])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SHOVE), slamTitle(HOOK)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ['pop', T.pop, 1046.5, 0.05, 0.3], ['whoosh', T.pop, 0.4, 0.05],
  ...shakeCues(SHOVE), ...BLOCKS.map((b, i) => ['whoosh', +(T.shove[0] + i * 0.09).toFixed(2), 0.18, 0.025]),
  ['riser', T.stretch[0], T.stretch[1], 0.04], ['bell', T.stretch[1], 1864.66, 0.035, 1.0, 0], ['glitter', T.stretch[1], T.stretch[1] + 0.4],
  ['pop', T.dnd, 932.33, 0.04, 0], ...[0, 1, 2].map(i => ['tick', +(T.dnd + 0.35 + i * 0.3).toFixed(2), 0.07]),
  ['whoosh', T.dinner - 0.05, 0.2, 0.03], ['pluck', T.dinner + 0.1, 698.46, 0.04, 0.8, 0],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1396.91, 0.03, 1.4, 0],
]
