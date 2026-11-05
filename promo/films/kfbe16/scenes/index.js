// kfbe16: FIRST DATE BINGO E16 (long), "The whole dinner: Taurus × Virgo" (vertical, star_talk post, music: jazzy · Eb).
// No end card, no card transition; hard cut on the last line. 4×4 card; five chapter stickers; a beat every few seconds.
//   0.0   frame 0: ♍ Virgo mid-trip on the restaurant step, a breadbasket flying, ♉ Taurus mid-catch of a roll; the
//         dauber mid-slam on TRIPPED ON THE WAY IN. Hook: "Full first date. | *Wait for the goodbye.*"
//   0.7   record scratch: "*one minute* in."
//   ① ARRIVAL 3.0   nervous laugh (4.5) · "I love your shoes." → COMPLIMENTS THE SHOES (8.5) · they sit
//   ② ORDERING 12   the menu takes forever (clock 8:05 → 8:19) → TAKES FOREVER TO ORDER (15) · "want to share a few
//                   things?" "yes. thank goodness." → ORDERS TO SHARE (20)
//   ③ THE EX QUESTION 24   "so… your last relationship?" a news ticker: THE EX HAS ENTERED THE CHAT → MENTIONS AN EX
//                   (27) · "a year ago. we wanted different things. I learned a lot." → HONEST ANSWER (32.5)
//   ④ DESSERT 38    one cake, one spoon → ONE SPOON, TWO PEOPLE (42) · "I practised this date in the mirror." a laughing
//                   fit → LAUGHS UNTIL IT HURTS (47) · the card: ONE SQUARE FROM BINGO
//   ⑤ THE GOODBYE 50   "I'll get the next one?" → SPLITS THE BILL KINDLY (52.5) · outside under the lamp: "can I see
//                   you again?" "yes. obviously." → ASKS FOR A DATE 2 (59) → BINGO (59.25)
//   61   "Best square on the card: | *“again?”*" · hard cut.
import { makeBingo, cafe, park, table, candle, star, label, shadow, hearts, dish, clockFace, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, PINK, RED, INTER, MONO, cellCenter } from '../../kfbe01/scenes/bingokit.js'

const D = 64.5
const C = [3.0, 12.0, 24.0, 38.0, 50.0]
const T = { rec: 0.7, laugh: 4.0, s1: 4.5, shoes: 6.5, s2: 8.5, sit: [10.0, 11.4], menu: 12.8, spin: [13.2, 14.8], s3: 15.0, share: 17.0, plates: 19.4, s4: 20.0,
  exq: 25.5, ticker: [26.4, 30.0], s5: 27.0, ans: 28.5, ans2: 30.6, s6: 32.5, mature: 34.0, mine: 36.0,
  cake: 39.0, spoon: [40.5, 44.0], s7: 42.0, mirror: 44.2, fit: [45.6, 47.8], s8: 47.0, one: 48.2, bill: 51.0, s9: 52.5, out: [53.8, 54.6], ask: 57.0, yes: 58.3, s10: 59.0, bingo: 59.25, last: 61.0 }
const CH = ['ARRIVAL', 'ORDERING', 'THE EX QUESTION', 'DESSERT', 'THE GOODBYE'].map((title, i) => ({ at: C[i], out: [(C[i + 1] || 58) - 0.5, (C[i + 1] || 58) - 0.2], n: i + 1, title, color: [GOLD, '#9fe6b0', '#ff9ac4', '#ffd6a0', '#a8d8ff'][i] }))
const REC = { at: T.rec, len: 1.5, caption: '*one minute* in.', sub: 'a whole first date, start to finish', top: 1000 }

const EP = makeBingo({
  id: 'kfbe16', D, n: 4, ink: '#3fa870', cardTag: '♉ × ♍',
  squares: [
    { text: 'NERVOUS LAUGH', at: T.s1 }, { text: 'TAKES FOREVER TO ORDER', at: T.s3 }, { text: 'SPILLS SOMETHING' }, { text: 'ONE SPOON, TWO PEOPLE', at: T.s7 },
    { text: 'PHONE ON THE TABLE' }, { text: 'COMPLIMENTS THE SHOES', at: T.s2 }, { text: 'ORDERS TO SHARE', at: T.s4 }, { text: 'SPLITS THE BILL KINDLY', at: T.s9 },
    { text: 'HONEST ANSWER', at: T.s6 }, { text: 'TALKS ABOUT THEIR PLANT' }, { text: 'CORRECTS THE WAITER' }, { text: 'SECOND DESSERT' },
    { text: 'TRIPPED ON THE WAY IN', at: -0.04 }, { text: 'MENTIONS AN EX', at: T.s5 }, { text: 'LAUGHS UNTIL IT HURTS', at: T.s8 }, { text: 'ASKS FOR A DATE 2', at: T.s10 },
  ],
  win: [12, 13, 14, 15], bingoAt: T.bingo,
  hostTears: t => t > T.bingo ? 3 : t > T.s5 ? 2 : 1,
  hook: { text: 'Full first date. | *Wait for the goodbye.*', out: [2.6, 2.85], accentColor: '#9fe6b0', size: 92 },
  rec: REC,
  heads: [{ text: 'Best square on the card: | *“again?”*', at: T.last, accent: '#9fe6b0', late: 1, lateAt: T.last + 0.5, wobble: true, size: 84 }],
  effects: [...CH.map(c => [HK.chapter, HK.chapterCues, c]), [HK.screenShake, HK.shakeCues, { at: T.fit[0], len: 0.5, amp: 14 }]],
  scene(x, t) {
    const outside = t > T.out[1]
    if (!outside) cafe(x, t, { wall: '#2a1d40' }); else park(x, t, { lamp: 860 })
    if (t > T.out[0] && t < T.out[1] + 0.3) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(t, T.out[0], T.out[1] + 0.3)); R(x, '#05040c', 0, 430, 1080, 760); x.restore() }
    if (!outside && t > C[1] && t < C[2]) { const m = t < T.spin[0] ? 5 : t < T.spin[1] ? lerp(5, 19, prog(t, ...T.spin)) : 19; clockFace(x, 180, 560, 56, 8, Math.round(m)) }
    // positions: ch1 standing at the door, then seated; outside under the lamp
    const sit = ease.inOutCubic(prog(t, ...T.sit))
    let vx = lerp(240, 290, sit), tx = lerp(700, 790, sit), vy = 880, ty = 890
    if (outside) { vx = 380; tx = 700; vy = 900; ty = 900 }
    // Virgo
    let vm = 'wide', vl = [1, 0], vt = 0, vsq = 0
    if (t > 1.0) { vm = 'happy'; vl = undefined }
    if (t > T.laugh && t < T.shoes) { vm = 'squint'; vsq = 0.04 * Math.sin(t * 25) }
    if (t > T.shoes && t < T.s2 + 1) { vm = 'sparkle'; vl = [1, 0] }
    if (t > T.menu && t < T.share) { vm = 'squint'; vl = [0.3, 1] }
    if (t > T.share) { vm = 'happy'; vl = undefined }
    if (t > T.exq && t < T.ans) { vm = 'wide'; vl = [1, 0] }
    if (t > T.ans && t < T.mature) { vm = 'neutral'; vl = [0.5, 0.5] }
    if (t > T.mature) { vm = 'happy'; vl = undefined }
    if (t > T.mirror && t < T.fit[0]) { vm = 'squint' }
    if (t > T.fit[0] && t < T.fit[1]) { vm = 'happy'; vsq = 0.06 * Math.sin(t * 30); vt = 1 }
    if (t > T.ask - 0.6 && t < T.yes) { vm = 'wide'; vl = [1, 0] }
    if (t > T.yes) { vm = 'heart'; vl = undefined }
    shadow(x, vx, 1150, 220)
    const trip = t < 1.0 ? 1 - inK(t, 0.6, 0.4) : 0
    x.save(); x.translate(vx, vy + 60); x.rotate(-0.55 * trip); x.translate(-vx, -vy - 60)
    if (trip > 0) for (let i = 0; i < 5; i++) R(x, 'rgba(255,214,160,0.8)', vx - 230 - i * 20, vy - 120 + i * 40, 150 * trip, 10)
    star(x, t, 'virgo', { x: vx, y: vy - 40 * trip, s: 240, mood: vm, look: vl, tears: vt, squash: vsq - 0.1 * trip, hops: [1.0, T.s1, T.s2, T.sit[1], T.share + 1.5, T.s4, T.mature, T.s7, T.fit[0] + 0.3, T.ask, T.yes + 0.2, T.bingo + 0.3], seed: 6 })
    x.restore()
    // Taurus
    let tm = 'neutral', tl = [-1, 0], tt = 0, tsq = 0
    if (t < 1.0) { tm = 'wide'; tl = [-1, -0.5] }
    if (t > T.shoes - 0.2) { tm = 'happy'; tl = undefined }
    if (t > T.menu && t < T.share) { tm = 'sleepy' }
    if (t > T.share) { tm = 'happy' }
    if (t > T.exq - 0.3 && t < T.mature) { tm = 'neutral'; tl = [-1, 0] }
    if (t > T.mature) { tm = 'sparkle'; tl = [-1, 0] }
    if (t > T.fit[0] && t < T.fit[1]) { tm = 'happy'; tsq = 0.06 * Math.sin(t * 28 + 1); tt = 1; tl = undefined }
    if (t > T.fit[1]) { tm = 'happy'; tl = undefined }
    if (t > T.ask && t < T.yes) { tm = 'wide'; tl = [-1, 0] }
    if (t > T.yes) tm = 'heart'
    shadow(x, tx, 1150, 210)
    star(x, t, 'taurus', { x: tx, y: ty, s: 230, mood: tm, look: tl, tears: tt, zzz: false, squash: tsq, hops: [0.15, T.shoes, T.share, T.exq, T.mature, T.mine, T.fit[0] + 0.2, T.yes, T.bingo + 0.4], seed: 4 })
    // ch1: the flying breadbasket and the caught roll
    if (t < 2.0) { const p = clamp01((t + 0.5) / 2.0), a = 1 - inK(t, 1.6, 0.4); x.save(); x.globalAlpha = a
      x.save(); x.translate(lerp(380, 520, p), 700 - 80 * Math.sin(p * 3)); x.rotate(-0.8 + p * 2); box(x, -80, -30, 160, 60, '#b07a4a', { b: 7, hi: '#d09a6a' }); x.restore()
      for (let i = 0; i < 3; i++) { x.save(); x.translate(lerp(420, 470 + i * 70, p), 600 - 140 * Math.sin(Math.PI * Math.min(1, p * 1.1)) - i * 40); x.rotate(p * 4 + i); dish(x, 0, 0, 'bread', 0.75); x.restore() }
      x.restore() }
    if (t < 3.0) dish(x, tx - 130, ty - 70, 'bread', 0.8)
    // the table (seated chapters)
    if (!outside && t > T.sit[0]) { x.save(); x.globalAlpha = sit; table(x, 540, 1010, 520); candle(x, t, 540, 1010); x.restore() }
    // ch2 menus, then shared plates
    if (t > T.menu && t < T.plates) { const k = pop01(t, T.menu, 0.3, 2) * outK(t, [T.plates - 0.3, T.plates]); for (const [mx, r] of [[390, -0.15], [690, 0.15]]) { x.save(); x.translate(mx, 930); x.rotate(r); x.scale(k, k); box(x, -60, -80, 120, 160, '#7a2a3a', { b: 5 }); R(x, GOLD, -36, -50, 72, 8); for (let i = 0; i < 4; i++) R(x, '#f2d0a0', -36, -26 + i * 20, 72, 6); x.restore() } }
    if (!outside && t > T.plates) { const k = inK(t, T.plates, 0.3); if (t < T.cake) { dish(x, 400, 1000 - 40 * (1 - k), 'pasta', 0.8); dish(x, 680, 1000 - 40 * (1 - k), 'soup', 0.8) } }
    // ch3 ticker
    if (t > T.ticker[0] && t < T.ticker[1]) { const k = win01(t, T.ticker[0], T.ticker[1], 0.2); x.save(); x.globalAlpha = k; R(x, '#c8283c', 0, 1090, 1080, 56); R(x, INK, 0, 1086, 1080, 6); box(x, 0, 1090, 200, 56, '#fff', { b: 0 }); x.font = `900 28px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#c8283c'; x.fillText('BREAKING', 20, 1119); x.fillStyle = '#fff'; x.font = `700 28px ${MONO}`; x.fillText('THE EX HAS ENTERED THE CHAT  ★  MORE AT ELEVEN  ★', 220 - ((t - T.ticker[0]) * 160) % 600, 1119); x.restore() }
    // ch4 cake + one spoon passing
    if (!outside && t > T.cake) {
      dish(x, 540, 1000, 'cake', 0.9 * inK(t, T.cake, 0.3))
      if (t > T.spoon[0]) { const side = Math.floor((t - T.spoon[0]) / 0.9) % 2, sx = side ? 700 : 380; x.save(); x.translate(sx, 930); x.rotate(side ? 0.5 : -0.5); R(x, INK, -6, -50, 12, 90); R(x, '#d8d4e8', -3, -48, 6, 86); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -60, 18, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8e4f8'; x.beginPath(); x.ellipse(0, -60, 13, 19, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 'ONE SPOON?', 540, 880, { size: 30, col: '#ffd6a0', alpha: win01(t, T.spoon[0], T.spoon[0] + 1.8), font: INTER, weight: 900 })
    }
    // ch5: the bill
    if (!outside && t > T.bill - 0.2 && t < T.out[0]) { const k = pop01(t, T.bill - 0.2, 0.3, 2.2); x.save(); x.translate(540, 960); x.rotate(0.05); x.scale(k, k); box(x, -60, -40, 120, 80, '#2a2148', { b: 5 }); R(x, BONE, -40, -24, 80, 10); x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.fillStyle = BONE; x.fillText('THE BILL', 0, 20); x.restore() }
    if (t > T.yes) hearts(x, t, T.yes, 540, 760, { n: 6 })
  },
  over(x, t) {
    // ONE SQUARE FROM BINGO: an arrow on the last square
    const k = win01(t, T.one, T.s10, 0.25)
    if (k > 0.01) { const c = cellCenter({ n: 4 }, 15); x.save(); x.globalAlpha = k; x.strokeStyle = '#ff3b55'; x.lineWidth = 8; x.setLineDash([16, 12]); x.lineDashOffset = -t * 40; x.strokeRect(c.x - c.w / 2 + 6, c.y - c.h / 2 + 6, c.w - 12, c.h - 12); x.setLineDash([]); x.restore(); label(x, 'ONE SQUARE FROM BINGO', 700, 1140, { size: 30, col: '#ff6177', alpha: k, font: INTER, weight: 900 }) }
  },
  cardY: 1170,
  bubbles: [
    { t0: 1.0, t1: 2.8, x: 700, y: 690, text: 'got it!', size: 40, tail: 0.2 },
    { t0: T.laugh, t1: T.shoes - 0.1, x: 300, y: 650, text: 'ha. haha. ha. hi.', size: 40, tail: -0.2 },
    { t0: T.shoes, t1: T.s2, x: 720, y: 690, text: 'I love your shoes.', size: 38, tail: 0.2 },
    { t0: T.s2 - 0.6, t1: T.sit[1], x: 320, y: 620, text: 'these?? they’re… thank you!', size: 32, tail: -0.2 },
    { t0: T.menu + 0.3, t1: T.s3, x: 330, y: 640, text: 'hmm. hmmm. hm.', size: 38, tail: -0.2 },
    { t0: T.share, t1: T.plates, x: 740, y: 690, text: 'want to share a few things?', size: 30, tail: 0.3 },
    { t0: T.share + 1.2, t1: T.plates + 1, x: 330, y: 610, text: 'yes. thank goodness.', size: 36, tail: -0.2 },
    { t0: T.plates + 1.4, t1: T.exq - 0.1, x: 540, y: 640, text: 'ok this soup is incredible', size: 34, tail: 0 },
    { t0: T.exq, t1: T.ans - 0.1, x: 720, y: 690, text: 'so… your last relationship?', size: 32, tail: 0.3 },
    { t0: T.ans, t1: T.ans2, x: 340, y: 620, text: 'a year ago. we wanted different things.', size: 28, tail: -0.2 },
    { t0: T.ans2, t1: T.mature - 0.1, x: 330, y: 620, text: 'I learned a lot, honestly.', size: 34, tail: -0.2 },
    { t0: T.mature, t1: T.mine - 0.1, x: 730, y: 690, text: 'that’s really mature.', size: 36, tail: 0.3 },
    { t0: T.mine, t1: C[3] - 0.2, x: 720, y: 690, text: 'mine moved away. we’re still friendly.', size: 28, tail: 0.3 },
    { t0: T.spoon[0] + 1.8, t1: T.mirror - 0.1, x: 730, y: 690, text: 'you first. no, YOU first.', size: 32, tail: 0.3 },
    { t0: T.mirror, t1: T.fit[0] + 0.3, x: 360, y: 620, text: 'I practised this date in the mirror.', size: 30, tail: -0.2 },
    { t0: T.fit[0], t1: T.one, x: 540, y: 650, text: 'HAHAHAHA', size: 52, tail: 0 },
    { t0: T.bill + 0.3, t1: T.out[0], x: 330, y: 620, text: 'I’ll get the next one?', size: 38, tail: -0.2 },
    { t0: T.s9 - 0.2, t1: T.out[0], x: 730, y: 700, text: 'deal.', size: 44, tail: 0.3 },
    { t0: T.ask, t1: T.last - 0.1, x: 400, y: 650, text: 'can I see you again?', size: 40, tail: -0.1 },
    { t0: T.yes, t1: D + 1, x: 700, y: 730, text: 'yes. obviously.', size: 42, tail: 0.2 },
    { t0: T.s5 + 0.3, t1: T.s5 + 2.6, x: 790, y: 448, text: 'THE EX?!', size: 34, tail: 0.5, col: '#cfe8ff' },
    { t0: T.s7 + 0.3, t1: T.s7 + 2.6, x: 790, y: 448, text: 'ONE SPOON!!', size: 34, tail: 0.5, col: '#cfe8ff' },
    { t0: T.bingo + 1.6, t1: D + 1, x: 790, y: 448, text: 'AGAIN!! THEY SAID AGAIN', size: 28, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['whoosh', 0, 0.4, 0.04], ['pop', 1.0, 1174.66, 0.04, 0.3], ...[0, 1, 2].map(i => ['pop', r3(T.laugh + i * 0.3), [880, 987.77, 1174.66][i], 0.03, -0.3]), ['pluck', T.shoes, 1318.51, 0.035, 0.5, 0.3],
    ['whoosh', T.sit[0], 0.4, 0.025], ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.spin[0] + i * 0.16), 0.03]), ['pluck', T.share, 1174.66, 0.035, 0.5, 0.3], ['tom', T.plates, 110, { gain: 0.18, decay: 0.15 }],
    ['pluck', T.exq, 587.33, 0.04, 0.6, 0.3], ['bell', T.ticker[0], 1318.51, 0.03, 0.8, 0], ['pluck', T.ans, 659.25, 0.03, 0.6, -0.3], ['pluck', T.mature, 1567.98, 0.035, 0.5, 0.3],
    ['tom', T.cake, 110, { gain: 0.18, decay: 0.15 }], ...[0, 1, 2, 3].map(i => ['tick', r3(T.spoon[0] + i * 0.9), 0.04]), ['pluck', T.mirror, 880, 0.035, 0.5, -0.3], ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.fit[0] + i * 0.2), [1318.51, 1567.98][i % 2], 0.025, 0]),
    ['riser', T.one, T.s10, 0.02], ['tom', T.bill, 100, { gain: 0.15, decay: 0.15 }], ['whoosh', T.out[0], 0.6, 0.03], ['pluck', T.ask, 1174.66, 0.04, 0.6, -0.2], ['pluck', T.yes, 1567.98, 0.045, 0.6, 0.2]],
})
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, PINK, RED]
